import {
  getAllUsers,
  getUserById,
  registerUser,
  removeUser,
  updateUser
} from '../services/user.service.js';

export async function createUserController(context) {
  const body = await context.request.body.json();
  const result = await registerUser(body);

  context.response.status = 201;
  context.response.body = {
    success: true,
    message: 'User created successfully',
    data: result
  };
}

export async function listUsersController(context) {
  const users = await getAllUsers(Object.fromEntries(context.request.url.searchParams.entries()));

  context.response.status = 200;
  context.response.body = {
    success: true,
    data: users
  };
}

export async function getUserController(context) {
  const user = await getUserById(context.params.id);

  context.response.status = 200;
  context.response.body = {
    success: true,
    data: user
  };
}

export async function updateUserController(context) {
  const body = await context.request.body.json();
  const user = await updateUser(context.params.id, body);

  context.response.status = 200;
  context.response.body = {
    success: true,
    message: 'User updated successfully',
    data: user
  };
}

export async function deleteUserController(context) {
  const user = await removeUser(context.params.id);

  context.response.status = 200;
  context.response.body = {
    success: true,
    message: 'User deleted successfully',
    data: user
  };
}
