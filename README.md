# User Admin Monorepo

This repository contains two applications:

- `back`: a Deno + Oak + MongoDB API for authentication and user management
- `front`: a React + Vite + MUI admin client that consumes the backend API

## Project structure

```text
.
|-- back/
|   |-- src/
|   |-- deno.json
|   |-- README.md
|   `-- ARCHITECTURE.md
`-- front/
    |-- src/
    |-- package.json
    |-- vite.config.js
    `-- README.md
```

## Main features

- User registration
- JWT login
- Password reset token generation
- Protected CRUD for users
- React admin with login, register and protected routes
- Session persistence in the browser

## Backend overview

The backend exposes:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `GET /api/users`
- `POST /api/users`
- `GET /api/users/:id`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`
- `GET /docs`
- `GET /docs/openapi.json`

Protected routes require:

```http
Authorization: Bearer <token>
```

## Frontend overview

The frontend includes:

- public routes: `/login`, `/register`
- protected route: `/users`
- auth state stored in `localStorage`
- automatic token injection for protected API requests
- admin forms for create, edit and delete user flows

## Local development

### 1. Start the backend

From `back/`:

```bash
deno task dev
```

### 2. Start the frontend

From `front/`:

```bash
yarn install
yarn dev
```

The Vite dev server proxies `/api` to `http://localhost:8000`.

## Environment files

The backend loads:

1. `.env`
2. `.env.example`

If `.env` does not exist, `.env.example` is used as a fallback for missing variables.

## Documentation index

- Backend guide: [back/README.md](c:/Users/shenick.guzman/Documents/GitHub/codex-back/back/README.md)
- Frontend guide: [front/README.md](c:/Users/shenick.guzman/Documents/GitHub/codex-back/front/README.md)
- Suggested backend architecture: [back/ARCHITECTURE.md](c:/Users/shenick.guzman/Documents/GitHub/codex-back/back/ARCHITECTURE.md)
