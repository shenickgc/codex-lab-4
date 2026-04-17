# Backend API

Backend API built with Deno, Oak and MongoDB for authentication and user management.

## Stack

- Deno 2
- Oak
- MongoDB driver
- bcryptjs
- jsonwebtoken

## What it does

- Registers users with `client` or `provider` role
- Authenticates with JWT
- Generates password reset tokens
- Exposes protected CRUD endpoints for users
- Publishes OpenAPI documentation and Swagger UI

## Run locally

### Requirements

- Deno 2.x
- MongoDB Atlas or a local MongoDB server

### Environment

Expected variables:

- `PORT`
- `MONGODB_URI`
- `MONGODB_DB_NAME`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `RESET_TOKEN_EXPIRES_MINUTES`

The app tries to load:

1. `.env`
2. `.env.example`

This means `.env.example` can work as a fallback during local setup.

### Start the server

```bash
deno task dev
```

Production-like run:

```bash
deno task start
```

## API routes

### Public auth routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`

### Protected user routes

- `POST /api/users`
- `GET /api/users`
- `GET /api/users/:id`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`

### Documentation routes

- `GET /docs`
- `GET /docs/openapi.json`

## Auth contract

Protected endpoints require a bearer token:

```http
Authorization: Bearer <token>
```

The token is created after `register` and `login`.

## Example payloads

### Register

```json
{
  "name": "Ash Ketchum",
  "email": "ash@example.com",
  "password": "Secret123",
  "phone": "5551234567",
  "userType": "client"
}
```

### Login

```json
{
  "email": "ash@example.com",
  "password": "Secret123"
}
```

### Forgot password

```json
{
  "email": "ash@example.com"
}
```

## Internal flow

- `src/server.js`: boots the app and database connection
- `src/app.js`: mounts middleware and routes
- `src/config/`: environment and MongoDB setup
- `src/controllers/`: request handling
- `src/services/`: business rules and validation
- `src/repositories/`: MongoDB operations
- `src/middlewares/`: auth, error and not found handlers
- `src/utils/`: token generation, serializer and error helper

## Database notes

At startup the app:

- connects to MongoDB
- selects `env.MONGODB_DB_NAME`
- creates a unique index on `users.email`
- creates a sparse index on `users.resetPasswordToken`

## OpenAPI

- Swagger UI: `GET /docs`
- OpenAPI JSON: `GET /docs/openapi.json`

## Related files

- Architecture notes: [ARCHITECTURE.md](c:/Users/shenick.guzman/Documents/GitHub/codex-back/back/ARCHITECTURE.md)
- Root guide: [../README.md](c:/Users/shenick.guzman/Documents/GitHub/codex-back/README.md)
