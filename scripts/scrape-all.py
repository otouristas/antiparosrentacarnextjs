#!/usr/bin/env python3
"""Batch-scrape all indexable inventory URLs via Firecrawl with checkpoint resume."""
from __future__ import annotations

import json
import os
import re
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parents[1]
INVENTORY = ROOT / "content" / "url-inventory.json"
RAW_DIR = ROOT / "content" / "raw"
CHECKPOINT = ROOT / "content" / "scrape-checkpoint.json"
API = "https://api.firecrawl.dev/v1"
API_KEY = os.environ.get("FIRECRAWL_API_KEY", "")
BATCH_SIZE = 25
LOCALES = {"el", "fr", "es", "it", "de", "nl", "sv", "pt", "ru", "tr"}


def api(method: str, path: str, body: dict | None = None) -> dict:
    data = None if body is None else json.dumps(body).encode("utf-8")
    req = urllib.request.Request(
        f"{API}{path}",
        data=data,
        method=method,
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=180) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        err = e.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"HTTP {e.code}: {err}") from e


def locale_and_slug(url: str) -> tuple[str, str]:
    path = unquote(urlparse(url).path or "/")
    parts = [p for p in path.strip("/").split("/") if p]
    if not parts:
        return "en", "__home__"
    if parts[0] in LOCALES:
        loc = parts[0]
        rest = parts[1:]
        return loc, "__home__" if not rest else "/".join(rest)
    return "en", "/".join(parts)


def out_paths(url: str) -> tuple[Path, Path]:
    loc, slug = locale_and_slug(url)
    safe = slug.replace("/", "__")
    base = RAW_DIR / loc
    return base / f"{safe}.md", base / f"{safe}.json"


def load_checkpoint() -> dict:
    if CHECKPOINT.exists():
        return json.loads(CHECKPOINT.read_text(encoding="utf-8"))
    return {"done": {}, "failed": {}}


def save_checkpoint(cp: dict) -> None:
    CHECKPOINT.write_text(json.dumps(cp, ensure_ascii=False, indent=2), encoding="utf-8")


def extract_meta(html: str | None, metadata: dict) -> dict:
    meta = {
        "title": metadata.get("title") or metadata.get("og:title"),
        "description": metadata.get("description") or metadata.get("ogDescription") or metadata.get("og:description"),
        "ogImage": metadata.get("ogImage") or metadata.get("og:image"),
        "sourceURL": metadata.get("sourceURL") or metadata.get("url"),
        "statusCode": metadata.get("statusCode"),
    }
    h1 = None
    if html:
        m = re.search(r"<h1[^>]*>(.*?)</h1>", html, re.I | re.S)
        if m:
            h1 = re.sub(r"<[^>]+>", "", m.group(1)).strip()
        if not meta["description"]:
            m = re.search(
                r'<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']+)["\']',
                html,
                re.I,
            ) or re.search(
                r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+name=["\']description["\']',
                html,
                re.I,
            )
            if m:
                meta["description"] = m.group(1)
    meta["h1"] = h1
    return meta


def persist_doc(url: str, doc: dict) -> None:
    md_path, json_path = out_paths(url)
    md_path.parent.mkdir(parents=True, exist_ok=True)
    markdown = doc.get("markdown") or ""
    html = doc.get("html")
    links = doc.get("links") or []
    metadata = doc.get("metadata") or {}
    meta = extract_meta(html, metadata)
    meta["url"] = url
    meta["links"] = links
    md_path.write_text(markdown, encoding="utf-8")
    json_path.write_text(
        json.dumps(
            {
                "url": url,
                "meta": meta,
                "markdown": markdown,
                "html": html,
                "links": links,
                "metadata": metadata,
            },
            ensure_ascii=False,
        ),
        encoding="utf-8",
    )


def wait_batch(job_id: str, timeout_s: int = 900) -> dict:
    start = time.time()
    while True:
        st = api("GET", f"/batch/scrape/{job_id}")
        status = st.get("status")
        if status in ("completed", "failed"):
            return st
        if time.time() - start > timeout_s:
            raise TimeoutError(f"Batch {job_id} timed out after {timeout_s}s (status={status})")
        done = st.get("completed", 0)
        total = st.get("total", 0)
        print(f"  … {status} {done}/{total}", flush=True)
        time.sleep(4)


def main() -> int:
    if not API_KEY:
        print("FIRECRAWL_API_KEY missing", file=sys.stderr)
        return 1

    inv = json.loads(INVENTORY.read_text(encoding="utf-8"))
    urls = [u["url"] for u in inv["urls"] if u.get("indexable")]
    cp = load_checkpoint()
    pending = [u for u in urls if u not in cp["done"]]
    print(f"indexable={len(urls)} pending={len(pending)} done={len(cp['done'])}")

    for i in range(0, len(pending), BATCH_SIZE):
        batch = pending[i : i + BATCH_SIZE]
        print(f"\nBatch {i // BATCH_SIZE + 1}: {len(batch)} urls", flush=True)
        try:
            created = api(
                "POST",
                "/batch/scrape",
                {
                    "urls": batch,
                    "formats": ["markdown", "html", "links"],
                    "onlyMainContent": True,
                    "ignoreInvalidURLs": True,
                },
            )
        except Exception as e:
            print(f"  create failed: {e}", flush=True)
            for u in batch:
                cp["failed"][u] = str(e)
            save_checkpoint(cp)
            time.sleep(5)
            continue

        job_id = created.get("id")
        if not job_id:
            print(f"  no job id: {created}", flush=True)
            continue

        try:
            result = wait_batch(job_id)
        except Exception as e:
            print(f"  wait failed: {e}", flush=True)
            for u in batch:
                cp["failed"][u] = str(e)
            save_checkpoint(cp)
            continue

        data = result.get("data") or []
        by_source: dict[str, dict] = {}
        for doc in data:
            meta = doc.get("metadata") or {}
            src = meta.get("sourceURL") or meta.get("url")
            if src:
                by_source[src.rstrip("/") + ("/" if "?" not in src else "")] = doc
                by_source[src] = doc
                by_source[src.rstrip("/")] = doc

        for u in batch:
            doc = by_source.get(u) or by_source.get(u.rstrip("/")) or by_source.get(u.rstrip("/") + "/")
            if not doc:
                # fuzzy: match path
                path = urlparse(u).path
                for k, v in by_source.items():
                    if urlparse(k).path.rstrip("/") == path.rstrip("/"):
                        doc = v
                        break
            if not doc:
                cp["failed"][u] = "missing from batch result"
                print(f"  FAIL missing {u}", flush=True)
                continue
            try:
                persist_doc(u, doc)
                cp["done"][u] = {
                    "md": str(out_paths(u)[0].relative_to(ROOT)),
                    "at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
                }
                cp["failed"].pop(u, None)
                print(f"  OK {u}", flush=True)
            except Exception as e:
                cp["failed"][u] = str(e)
                print(f"  FAIL {u}: {e}", flush=True)
        save_checkpoint(cp)

    print(
        f"\nDone. success={len(cp['done'])} failed={len(cp['failed'])}",
        flush=True,
    )
    if cp["failed"]:
        print("Failed URLs:", flush=True)
        for u, err in list(cp["failed"].items())[:30]:
            print(f"  - {u}: {err}", flush=True)
    return 0 if not cp["failed"] else 2


if __name__ == "__main__":
    raise SystemExit(main())
