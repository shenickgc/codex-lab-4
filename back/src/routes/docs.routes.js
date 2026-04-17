import { Router } from '@oak/oak';
import {
  getOpenApiController,
  getSwaggerUiController
} from '../controllers/docs.controller.js';

export const docsRoutes = new Router();

docsRoutes.get('/docs', getSwaggerUiController);
docsRoutes.get('/docs/openapi.json', getOpenApiController);
