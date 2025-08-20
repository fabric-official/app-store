# DevForge Power Pack — COMPLETE

**Everything** a developer needs to work with Fabric:
- Multi-file editor (Monaco) with file CRUD and search
- Build + Test (Vitest) + Cosign + Verify + Stage + Install (pre-push) + Push + PR
- Templates: agent, bridge adapter, UI plugin, worker
- Permissions editor, Secrets (encrypted), SDK typings
- Server exposes file ops, build/test pipeline, cosign, registry, git, PR

## Run Server
```bash
cd services/supernet-server
npm i
# export COSIGN_KEY=... COSIGN_PUB=... DEVFORGE_SECRETS_KEY=... GITHUB_TOKEN=... GITHUB_OWNER=... GITHUB_REPO=...
npm run dev
```
## Host Env
```
VITE_SUPERNET_API=http://localhost:8080
```
Open `/dev` → Editor/Tests/Pipeline/Permissions/Secrets.
