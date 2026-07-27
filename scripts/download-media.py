#!/usr/bin/env python3
"""Download wp-content/uploads images referenced in scraped content into public/media."""
from __future__ import annotations

import hashlib
import json
import re
import time
import urllib.error
import urllib.request
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "content" / "raw"
MEDIA = ROOT / "public" / "media"
MAP_FILE = ROOT / "content" / "media-map.json"

UA = "Mozilla/5.0 (compatible; AGGELOS-rebuild/1.0)"
IMG_RE = re.compile(
    r"https?://(?:www\.)?antiparosrentacar\.com/wp-content/uploads/[^\s\"'\)<>]+",
    re.I,
)


def local_name(url: str) -> str:
    path = unquote(urlparse(url).path)
    # keep uploads/... structure under public/media/
    rel = path.split("/wp-content/uploads/", 1)[-1]
    rel = rel.lstrip("/")
    if not rel or ".." in rel:
        h = hashlib.sha1(url.encode()).hexdigest()[:12]
        ext = Path(path).suffix or ".bin"
        return f"misc/{h}{ext}"
    return rel


def download(url: str, dest: Path) -> bool:
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists() and dest.stat().st_size > 0:
        return True
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            dest.write_bytes(resp.read())
        return True
    except Exception as e:
        print(f"  FAIL {url}: {e}")
        return False


def rewrite_file(path: Path, mapping: dict[str, str]) -> None:
    text = path.read_text(encoding="utf-8", errors="replace")
    orig = text
    for remote, local in mapping.items():
        text = text.replace(remote, local)
        # also without querystrings variants already keyed
    if text != orig:
        path.write_text(text, encoding="utf-8")


def main() -> None:
    urls: set[str] = set()
    for p in RAW.rglob("*"):
        if p.suffix not in {".md", ".json", ".html"}:
            continue
        try:
            text = p.read_text(encoding="utf-8", errors="replace")
        except Exception:
            continue
        for m in IMG_RE.findall(text):
            clean = m.rstrip(").,]")
            urls.add(clean.split("?")[0])

    print(f"found {len(urls)} media urls")
    mapping: dict[str, str] = {}
    if MAP_FILE.exists():
        mapping = json.loads(MAP_FILE.read_text(encoding="utf-8"))

    ok = 0
    for i, url in enumerate(sorted(urls)):
        rel = local_name(url)
        dest = MEDIA / rel
        local_url = "/media/" + rel.replace("\\", "/")
        if download(url, dest):
            mapping[url] = local_url
            ok += 1
        if (i + 1) % 25 == 0:
            print(f"  … {i+1}/{len(urls)}")
            MAP_FILE.write_text(json.dumps(mapping, indent=2), encoding="utf-8")
            time.sleep(0.05)

    MAP_FILE.write_text(json.dumps(mapping, indent=2), encoding="utf-8")
    print(f"downloaded ok={ok}/{len(urls)}")

    # rewrite content (markdown only — rewriting JSON breaks escapes)
    for p in RAW.rglob("*.md"):
        rewrite_file(p, mapping)
    print("rewrote content URLs")


if __name__ == "__main__":
    main()
