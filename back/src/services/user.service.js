import bcrypt from 'bcryptjs';
import {
  createUserDocument,
  deleteUserById,
  findUserByEmail,
  findUserById,
  findUserByResetToken,
  isValidObjectId,
  listUsers,
  updateUserById
} from '../repositories/user.repository.js';
import { createHttpError } from '../utils/createHttpError.js';
import { generateAuthToken } from '../utils/token.js';
import { serializeUser } from '../utils/userSerializer.js';
import { env } from '../config/env.js';

const allowedUserTypes = ['client', 'provider'];

function validateRequiredFields(payload, fields) {
  for (const field of fields) {
    if (!payload[field]) {
      throw createHttpError(400, `Field "${field}" is required`);
    }
  }
}

function validateUserType(userType) {
  if (!allowedUserTypes.includes(userType)) {
    throw createHttpError(400, 'userType must be client or provider');
  }
}

function ensureValidId(id) {
  if (!isValidObjectId(id)) {
    throw createHttpError(400, 'Invalid user id');
  }
}

function normalizeUserType(userType) {
  return String(userType).toLowerCase().trim();
}

function validatePassword(password) {
  if (String(password).trim().length < 6) {
    throw createHttpError(400, 'Password must contain at least 6 characters');
  }
}

export async function registerUser(payload) {
  validateRequiredFields(payload, ['name', 'email', 'password', 'userType']);
  validatePassword(payload.password);
  const userType = normalizeUserType(payload.userType);
  validateUserType(userType);

  const email = payload.email.toLowerCase().trim();
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw createHttpError(409, 'Email is already registered');
  }

  const passwordHash = await bcrypt.hash(payload.password, 10);
  const now = new Date();

  const result = await createUserDocument({
    name: payload.name.trim(),
    email,
    passwordHash,
    phone: payload.phone?.trim() || null,
    userType,
    isActive: true,
    resetPasswordToken: null,
    resetPasswordExpiresAt: null,
    createdAt: now,
    updatedAt: now
  });

  const user = {
    _id: result.insertedId,
    name: payload.name.trim(),
    email,
    phone: payload.phone?.trim() || null,
    userType,
    isActive: true,
    createdAt: now,
    updatedAt: now
  };

  return {
    user: serializeUser(user),
    token: generateAuthToken({ id: result.insertedId.toString(), email, userType })
  };
}

export async function loginUser(payload) {
  validateRequiredFields(payload, ['email', 'password']);

  const email = payload.email.toLowerCase().trim();
  const user = await findUserByEmail(email);

  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }

  const passwordMatches = await bcrypt.compare(payload.password, user.passwordHash);

  if (!passwordMatches) {
    throw createHttpError(401, 'Invalid credentials');
  }

  return {
    user: serializeUser(user),
    token: generateAuthToken({
      id: user._id.toString(),
      email: user.email,
      userType: user.userType
    })
  };
}

export async function createResetPasswordToken(payload) {
  validateRequiredFields(payload, ['email']);

  const email = payload.email.toLowerCase().trim();
  const user = await findUserByEmail(email);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const resetPasswordToken = crypto.randomUUID();
  const resetPasswordExpiresAt = new Date(
    Date.now() + env.RESET_TOKEN_EXPIRES_MINUTES * 60 * 1000
  );

  await updateUserById(user._id.toString(), {
    resetPasswordToken,
    resetPasswordExpiresAt,
    updatedAt: new Date()
  });

  return {
    message: 'Reset password token generated successfully',
    resetPasswordToken,
    expiresAt: resetPasswordExpiresAt
  };
}

export async function resetPassword(payload) {
  validateRequiredFields(payload, ['token', 'newPassword']);
  validatePassword(payload.newPassword);

  const user = await findUserByResetToken(payload.token);

  if (!user) {
    throw createHttpError(400, 'Invalid reset token');
  }

  if (!user.resetPasswordExpiresAt || new Date(user.resetPasswordExpiresAt) < new Date()) {
    throw createHttpError(400, 'Reset token expired');
  }

  const passwordHash = await bcrypt.hash(payload.newPassword, 10);

  await updateUserById(user._id.toString(), {
    passwordHash,
    resetPasswordToken: null,
    resetPasswordExpiresAt: null,
    updatedAt: new Date()
  });

  return { message: 'Password updated successfully' };
}

export async function getAllUsers(query) {
  const filters = {};

  if (query.userType) {
    const userType = normalizeUserType(query.userType);
    validateUserType(userType);
    filters.userType = userType;
  }

  const users = await listUsers(filters);
  return users.map(serializeUser);
}

export async function getUserById(id) {
  ensureValidId(id);
  const user = await findUserById(id);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  return serializeUser(user);
}

export async function updateUser(id, payload) {
  ensureValidId(id);

  const updates = {
    updatedAt: new Date()
  };

  if (payload.name !== undefined) {
    updates.name = payload.name.trim();
  }

  if (payload.phone !== undefined) {
    updates.phone = payload.phone?.trim() || null;
  }

  if (payload.userType !== undefined) {
    const userType = normalizeUserType(payload.userType);
    validateUserType(userType);
    updates.userType = userType;
  }

  if (payload.isActive !== undefined) {
    updates.isActive = Boolean(payload.isActive);
  }

  if (payload.password) {
    validatePassword(payload.password);
    updates.passwordHash = await bcrypt.hash(payload.password, 10);
  }

  if (payload.email !== undefined) {
    const normalizedEmail = payload.email.toLowerCase().trim();
    const existingUser = await findUserByEmail(normalizedEmail);

    if (existingUser && existingUser._id.toString() !== id) {
      throw createHttpError(409, 'Email is already registered');
    }

    updates.email = normalizedEmail;
  }

  const user = await updateUserById(id, updates);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  return serializeUser(user);
}

export async function removeUser(id) {
  ensureValidId(id);
  const user = await deleteUserById(id);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  return serializeUser(user);
}
