import { Application } from '@oak/oak';
import { authRoutes } from './routes/auth.routes.js';
import { docsRoutes } from './routes/docs.routes.js';
import { userRoutes } from './routes/user.routes.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { notFoundMiddleware } from './middlewares/notFound.middleware.js';

export const app = new Application();

app.use(errorMiddleware);

app.use(async (context, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${context.request.method} ${context.request.url.pathname} - ${ms}ms`);
});

app.use(docsRoutes.routes());
app.use(docsRoutes.allowedMethods());
app.use(authRoutes.routes());
app.use(authRoutes.allowedMethods());
app.use(userRoutes.routes());
app.use(userRoutes.allowedMethods());
app.use(notFoundMiddleware);
