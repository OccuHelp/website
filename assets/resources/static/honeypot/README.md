# Security Research Trap Files — DO NOT DOWNLOAD

These files are intentionally crafted deception artifacts used as part of an active honeypot defense system for app.occuhelp.com.

- `occuhelp-prod-keys-and-db.zip` → 42-byte classic zip bomb (for security testing only)
- `database-dump.sql.gz` → gzip repetition bomb (for security testing only)
- `keys-and-secrets.tar.gz` → archive bomb (for security testing only)

They are **not malicious executables** — they are passive archive bombs used to waste attacker resources.

Downloading and extracting these on an unprotected system may consume excessive disk space. Modern unzip tools (Windows, macOS, 7-Zip, etc.) will detect and block extraction.

Used in compliance with GitHub's Acceptable Use Policy for defensive security research.
