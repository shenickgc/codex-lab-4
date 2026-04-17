import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function generateAuthToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      userType: user.userType
    },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN }
  );
}
