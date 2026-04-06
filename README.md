# React Runtime Env Boilerplate

A React boilerplate with **runtime environment injection** support — no need to rebuild the Docker image when changing environment variables. Ideal for multi-environment deployments (dev, staging, production) using a single image.

---

## Pre-requirements

| Tool | Minimum Version | Notes |
|------|----------------|-------|
| Node.js | 22+ | Required for local development |
| pnpm | 10.8.0+ | Mandatory package manager (do not use npm/yarn) |
| Docker | 24+ | For building and deploying via container |
| Docker Compose | v2+ | For running with `docker compose` |

---

## Stack & Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| React | 19 | UI library |
| Zustand | 5 | Global state management |
| TanStack Query | 5 | Server state & data fetching |
| Vite | 6 | Build tool & dev server |

---

## Installation (Local Development)

```bash
# 1. Clone the repository
git clone <repo-url>
cd react-env-runtime

# 2. Install dependencies
pnpm install

# 3. Create a .env file
cp .env.example .env  # or create manually
```

Fill in the `.env` file for local development:

```env
VITE_APP_NAME=React App
VITE_USER=YourName
VITE_AUTH_EMAIL=admin@example.com
VITE_AUTH_PASSWORD=admin123
VITE_API_URL=http://localhost:3000/api
VITE_ENABLE_AUTH=true
```

> All environment variables **must** be prefixed with `VITE_`.

---

## Running the App

### Development

```bash
pnpm dev
```

App runs at `http://localhost:5173`

### Production Build

```bash
pnpm build
```

Build output is in the `dist/` folder.

### Preview Build

```bash
pnpm preview
```

---

## Running via Docker

### Using Docker Compose (Recommended)

```bash
# Build and run
docker compose up --build

# Run in background
docker compose up --build -d
```

App runs at `http://localhost:3000`

To change environment variables, edit the `environment` section in `docker-compose.yml`:

```yaml
services:
  app:
    build: .
    ports:
      - "3000:80"
    environment:
      - VITE_APP_NAME=My App
      - VITE_API_URL=https://api.production.com
      - VITE_USER=Admin
```

Then restart the container — **no image rebuild needed**:

```bash
docker compose down && docker compose up -d
```

### Using Docker CLI

```bash
# Build image
docker build -t react-env-runtime .

# Run container with env vars
docker run -p 3000:80 \
  -e VITE_API_URL=https://api.production.com \
  -e VITE_USER=Admin \
  react-env-runtime
```

---

## How Runtime Env Injection Works

```
Container starts
     │
     ▼
env.sh runs (via /docker-entrypoint.d/)
     │
     ▼
Reads all env vars prefixed with VITE_
     │
     ▼
Writes to /usr/share/nginx/html/env-config.js
     │  window.__ENV = { VITE_API_URL: "...", ... }
     ▼
Nginx serves static files + env-config.js
     │
     ▼
Browser loads app → src/config/env.js reads window.__ENV
```

All env variable access in the app **must** go through `src/config/env.js`:

```js
// CORRECT
import { env } from '@/config/env'
const apiUrl = env.API_URL

// WRONG — do not read import.meta.env directly in components
const apiUrl = import.meta.env.VITE_API_URL
```

Env reading priority:

```
window.__ENV (runtime Docker)  →  import.meta.env (build-time)  →  default value
```

### Adding a New Env Variable

1. Add it to `src/config/env.js` with all three layers:
   ```js
   export const env = {
     NEW_VAR: window.__ENV?.VITE_NEW_VAR || import.meta.env.VITE_NEW_VAR || 'default',
   }
   ```
2. Add it to `.env` for local development
3. Inject via `docker run -e VITE_NEW_VAR=value` or `docker-compose.yml` when deploying

---

## Project Structure

```
src/
├── features/          ← Application features (self-contained modules)
│   ├── auth/
│   ├── users/
│   ├── products/
│   ├── cart/
│   ├── characters/
│   └── home/
├── shared/            ← Reusable across the entire app
│   ├── components/
│   │   ├── ui/        ← Button, Input, Modal, Skeleton
│   │   └── layout/    ← PublicLayout, PrivateLayout, Header, Sidebar
│   ├── hooks/
│   ├── lib/           ← apiClient, graphqlClient
│   └── utils/
├── store/             ← Global state (Zustand)
│   └── authStore.js
├── app/               ← Entry point, routing, providers
│   ├── App.jsx
│   ├── routes.jsx
│   └── providers.jsx
└── config/
    └── env.js         ← Single source of truth for env variables
```

Dependency rules between layers:

- `features/X` may import from `shared/`
- `features/X` **must not** import from `features/Y`
- `shared/` **must not** import from `features/`
- `app/` may import from `features/` and `shared/`

See [docs/rules.md](docs/rules.md) for the full ruleset and [docs/Arsitektur.md](docs/Arsitektur.md) for architecture details.

---

## Adding a New Feature

1. Create a folder at `src/features/{feature-name}/` with this structure:
   ```
   src/features/{feature-name}/
   ├── components/
   ├── hooks/
   ├── services/
   ├── types/
   └── index.js    ← required (barrel file / public API)
   ```
2. Register a new route in `src/app/routes.jsx`
3. Wrap with `<AuthGuard>` if the page requires authentication

---

## State Management

| Use Case | Solution | Location |
|----------|----------|----------|
| Global state across features (auth, user session) | Zustand | `src/store/` |
| Local state within a single feature (cart, form wizard) | Context + useReducer | `src/features/{feature}/store/` |

---

## Rules

See [docs/rules.md](docs/rules.md) for the complete list. Key prohibitions:

1. **Forbidden** — cross-feature imports (`features/A` → `features/B`)
2. **Forbidden** — reading `import.meta.env` directly outside `src/config/env.js`
3. **Forbidden** — creating new HTTP wrappers outside `apiClient`
4. **Forbidden** — using raw `<button>` / `<input>` HTML in feature components — use `Button` and `Input` from `shared/`
5. **Forbidden** — protected pages without `AuthGuard`
