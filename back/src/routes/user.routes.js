import { Router } from '@oak/oak';
import {
  createUserController,
  deleteUserController,
  getUserController,
  listUsersController,
  updateUserController
} from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

export const userRoutes = new Router({ prefix: '/api/users' });

userRoutes.use(authMiddleware);
userRoutes.post('/', createUserController);
userRoutes.get('/', listUsersController);
userRoutes.get('/:id', getUserController);
userRoutes.put('/:id', updateUserController);
userRoutes.delete('/:id', deleteUserController);
