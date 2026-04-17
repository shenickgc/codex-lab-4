# Backend Deno + MongoDB

API backend en Deno con JavaScript para autenticacion y gestion de usuarios tipo `client` y `provider`.

## Funcionalidades

- Registro de usuarios
- Login con JWT
- Recuperacion de contrasena por token
- CRUD de usuarios
- Persistencia en MongoDB
- Swagger UI para documentacion

## Requisitos

- Deno 2.x
- MongoDB disponible local o remoto

## Configuración

1. Copia `.env.example` a `.env`
2. Ajusta las variables de entorno
3. Ejecuta:

```bash
deno task dev
```

## Variables de entorno

- `PORT`: puerto del servidor
- `MONGODB_URI`: cadena de conexion de MongoDB
- `MONGODB_DB_NAME`: nombre de la base de datos
- `JWT_SECRET`: secreto para firmar tokens
- `JWT_EXPIRES_IN`: duración del JWT
- `RESET_TOKEN_EXPIRES_MINUTES`: minutos de vigencia del token de recuperacion

## Seguridad

Rutas publicas:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `GET /docs`
- `GET /docs/openapi.json`

Rutas protegidas con JWT:

- `POST /api/users`
- `GET /api/users`
- `GET /api/users/:id`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`

Para usar las rutas protegidas debes enviar:

```http
Authorization: Bearer <token>
```

## Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`

### Users

- `POST /api/users`
- `GET /api/users`
- `GET /api/users/:id`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`

## Ejemplos de payload

### Registro

```json
{
  "name": "Juan Perez",
  "email": "juan@example.com",
  "password": "Secret123",
  "phone": "5551234567",
  "userType": "client"
}
```

### Login

```json
{
  "email": "juan@example.com",
  "password": "Secret123"
}
```

### Recuperar contraseña

```json
{
  "email": "juan@example.com"
}
```

La respuesta entrega el token temporal de recuperacion. En produccion conviene enviarlo por correo.

## Swagger

- UI: `GET /docs`
- JSON OpenAPI: `GET /docs/openapi.json`

## Arquitectura sugerida

La propuesta de arquitectura para mejores practicas esta documentada en [ARCHITECTURE.md](c:\Users\shenick.guzman\Documents\GitHub\codex-back\back\ARCHITECTURE.md).
