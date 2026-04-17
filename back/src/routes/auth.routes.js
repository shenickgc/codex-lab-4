import { Router } from '@oak/oak';
import {
  forgotPasswordController,
  loginController,
  registerController,
  resetPasswordController
} from '../controllers/auth.controller.js';

export const authRoutes = new Router({ prefix: '/api/auth' });

authRoutes.post('/register', registerController);
authRoutes.post('/login', loginController);
authRoutes.post('/forgot-password', forgotPasswordController);
authRoutes.post('/reset-password', resetPasswordController);
