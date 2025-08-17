# Fabric Supernet — Open-Source Plugin App Store

This repository is the **public, open-source registry of Supernet plugins**. The Supernet dashboard reads this repo **directly from GitHub** — no servers are involved. Plugins are free; value flows via **agent royalties + XP**, not plugin purchases.

## What’s here
- `registry/index.json` — **signed** catalog of plugins.
- `plugins/<publisher>.<name>/` — each plugin’s manifest, signed bundle, SBOM, docs.
- `schemas/` — JSON Schemas for validation.
- `scripts/` — CI utilities to validate, sign, and update the registry.
- `.github/workflows/` — PR + publish pipelines.

## Quick start (maintainers)
1. Create/update a plugin under `plugins/<publisher>.<name>/`.
2. Commit the built **ESM bundle**, its **detached signature**, and **SBOM**.
3. Open a PR. CI will validate and update `registry/index.json`, then sign `registry/index.json.sig`.
4. On merge, Supernet dashboards can immediately install the plugin via GitHub Raw links.

See **CONTRIBUTING.md** for rules and **SECURITY.md** for the trust model.
