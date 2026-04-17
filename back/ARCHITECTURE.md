# Arquitectura Recomendada

## Objetivo

Mantener una base de codigo facil de extender, probar y proteger a medida que aparezcan nuevos modulos como productos, ordenes, pagos o reportes.

## Propuesta

Usar una arquitectura modular por dominio con capas internas:

```text
src/
  app.js
  server.js
  config/
  middlewares/
  shared/
  modules/
    auth/
      auth.controller.js
      auth.routes.js
      auth.service.js
      auth.schemas.js
    users/
      user.controller.js
      user.routes.js
      user.service.js
      user.repository.js
      user.schemas.js
      user.serializer.js
    docs/
      docs.controller.js
      docs.routes.js
      openapi.js
```

## Capas

- `routes`: define endpoints y middlewares por recurso
- `controllers`: traduce HTTP a llamadas de negocio
- `services`: contiene reglas del dominio
- `repositories`: acceso a MongoDB
- `schemas`: validacion de entradas
- `serializers`: controlan la respuesta expuesta al cliente
- `middlewares`: autenticacion, manejo de errores, auditoria, rate limit
- `config`: variables de entorno, base de datos, logger

## Proteccion con JWT

Servicios publicos:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `GET /docs`
- `GET /docs/openapi.json`

Servicios protegidos con JWT:

- `POST /api/users`
- `GET /api/users`
- `GET /api/users/:id`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`

## Mejores practicas sugeridas

- Agregar validacion formal con esquemas por endpoint
- Separar roles y permisos cuando exista un usuario `admin`
- No devolver token de recuperacion en produccion; enviarlo por email
- Agregar pruebas unitarias y de integracion
- Versionar la API con prefijos como `/api/v1`
- Incorporar logger estructurado y trazabilidad
- Usar DTOs o serializers para no exponer campos sensibles
