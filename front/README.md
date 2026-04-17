# Frontend Admin

React admin client for authentication and user management.

## Stack

- React 19
- Vite
- Material UI
- React Router
- Axios
- Yarn 4

## Available screens

- `/login`
- `/register`
- `/users`

## Main behavior

- login consumes `POST /api/auth/login`
- register consumes `POST /api/auth/register`
- user CRUD consumes protected `/api/users` endpoints
- JWT session is stored in `localStorage`
- requests automatically attach `Authorization: Bearer <token>`
- `/users` is protected with `ProtectedRoute`

## Run locally

### Install dependencies

```bash
yarn install
```

### Start dev server

```bash
yarn dev
```

### Build

```bash
yarn build
```

## Proxy

`vite.config.js` proxies:

```text
/api -> http://localhost:8000
```

So the backend must be running locally on port `8000` during development unless you change the Vite config.

## Frontend architecture

- `src/main.jsx`: app bootstrap, theme provider, router and auth provider
- `src/App.jsx`: route table
- `src/context/AuthContext.jsx`: auth session state and actions
- `src/router/ProtectedRoute.jsx`: redirects unauthenticated users to `/login`
- `src/services/api.js`: Axios instance and API helpers
- `src/pages/`: login, register and users pages
- `src/components/`: auth shell, dialogs and reusable UI parts
- `src/theme.js`: MUI theme customization
- `src/styles.css`: global background and base styles

## Session flow

1. User logs in or registers
2. Backend returns `{ user, token }`
3. Frontend stores the session in `localStorage`
4. Protected requests add the bearer token automatically
5. If `/users` receives `401`, the app logs out and redirects to `/login`

## Notes

- This frontend assumes the backend response format uses `response.data.data`
- The admin design is themed like a Pokemon-inspired management console
- The frontend uses Yarn; prefer `yarn` commands over `npm`

## Related files

- Root guide: [../README.md](c:/Users/shenick.guzman/Documents/GitHub/codex-back/README.md)
- Backend guide: [../back/README.md](c:/Users/shenick.guzman/Documents/GitHub/codex-back/back/README.md)
