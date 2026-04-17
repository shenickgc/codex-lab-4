import { openApiDocument } from '../docs/openapi.js';

export function getOpenApiController(context) {
  context.response.status = 200;
  context.response.headers.set('Content-Type', 'application/json; charset=utf-8');
  context.response.body = openApiDocument;
}

export function getSwaggerUiController(context) {
  context.response.status = 200;
  context.response.headers.set('Content-Type', 'text/html; charset=utf-8');
  context.response.body = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>User System API Docs</title>
    <link
      rel="stylesheet"
      href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css"
    />
    <style>
      body {
        margin: 0;
        background: #f4f7fb;
      }
    </style>
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
    <script>
      window.onload = () => {
        window.ui = SwaggerUIBundle({
          url: '/docs/openapi.json',
          dom_id: '#swagger-ui',
          deepLinking: true,
          presets: [SwaggerUIBundle.presets.apis],
        });
      };
    </script>
  </body>
</html>`;
}
