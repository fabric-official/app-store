# SuperNet User Forge Suite (Complete)

This bundle contains:
- **services/supernet-server** — Node/Express server with messaging, contacts, bridges, DTN queue, plugin install, and WebSocket signaling.
- **plugins/user-forge** — Production-grade encrypted client (X3DH + Double Ratchet) with chat/email/meet/bridges/devices/contacts.

## Quick start

### 1) Server
```bash
cd services/supernet-server
npm i
npm run dev   # or npm run build && npm start
# Server at http://localhost:8080
```

### 2) Client plugin (User Forge)
Copy the plugin into your Forge host, or use it directly if your environment loads from `plugins/user-forge`.
Make sure your host exposes the routes or run a dev shell that can render the routes.

Set env in your host:
```
VITE_SUPERNET_API=http://localhost:8080
```

### 3) Open the UI
Open `/uf` in your host app. Try **Messages**, **Email**, **Meet**, **Bridges**, **Devices**, **Contacts**.

**No stubs:** crypto is implemented in the client; server persists data and supports DTN queue + WebSocket signaling.
