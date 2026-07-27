#!/usr/bin/env python3
"""Parity check: every indexable inventory URL must appear in pages.json paths."""
from __future__ import annotations

import json
import sys
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parents[1]
LOCALES = {"el", "fr", "es", "it", "de", "nl", "sv", "pt", "ru", "tr"}


def norm(path: str) -> str:
    path = unquote(path or "/")
    if not path.startswith("/"):
        path = "/" + path
    if path != "/" and not path.endswith("/"):
        path += "/"
    return path


def main() -> int:
    inv = json.loads((ROOT / "content" / "url-inventory.json").read_text())
    pages = json.loads((ROOT / "content" / "pages.json").read_text())["pages"]
    covered = set()
    for p in pages:
        for path in p["paths"].values():
            covered.add(norm(path))

    missing = []
    for row in inv["urls"]:
        if not row.get("indexable"):
            continue
        if "?" in row["url"]:
            continue
        path = norm(urlparse(row["url"]).path)
        if path not in covered:
            missing.append(row["url"])

    print(f"indexable={sum(1 for u in inv['urls'] if u.get('indexable'))}")
    print(f"covered_paths={len(covered)}")
    print(f"missing={len(missing)}")
    for u in missing[:40]:
        print("  MISSING", u)

    # Optional live check against local Next
    base = None
    if len(sys.argv) > 1:
        base = sys.argv[1].rstrip("/")
    if base:
        import urllib.request

        fails = []
        for row in inv["urls"]:
            if not row.get("indexable"):
                continue
            if "?" in row["url"]:
                continue
            path = norm(urlparse(row["url"]).path)
            url = base + ("" if path == "/" else path.rstrip("/")) + "/"
            try:
                req = urllib.request.Request(url, method="GET")
                with urllib.request.urlopen(req, timeout=20) as resp:
                    if resp.status >= 400:
                        fails.append((url, resp.status))
            except Exception as e:
                fails.append((url, str(e)))
        print(f"live_fails={len(fails)}")
        for u, err in fails[:30]:
            print("  FAIL", u, err)
        return 1 if missing or fails else 0

    return 1 if missing else 0


if __name__ == "__main__":
    raise SystemExit(main())
