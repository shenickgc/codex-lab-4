import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { createHttpError } from '../utils/createHttpError.js';

export async function authMiddleware(context, next) {
  const authHeader = context.request.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createHttpError(401, 'Authorization token is required');
  }

  const token = authHeader.replace('Bearer ', '').trim();

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    context.state.user = payload;
    await next();
  } catch {
    throw createHttpError(401, 'Invalid or expired token');
  }
}
