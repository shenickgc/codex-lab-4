import {
  createResetPasswordToken,
  loginUser,
  registerUser,
  resetPassword
} from '../services/user.service.js';

export async function registerController(context) {
  const body = await context.request.body.json();
  const result = await registerUser(body);

  context.response.status = 201;
  context.response.body = {
    success: true,
    message: 'User registered successfully',
    data: result
  };
}

export async function loginController(context) {
  const body = await context.request.body.json();
  const result = await loginUser(body);

  context.response.status = 200;
  context.response.body = {
    success: true,
    message: 'Login successful',
    data: result
  };
}

export async function forgotPasswordController(context) {
  const body = await context.request.body.json();
  const result = await createResetPasswordToken(body);

  context.response.status = 200;
  context.response.body = {
    success: true,
    message: result.message,
    data: result
  };
}

export async function resetPasswordController(context) {
  const body = await context.request.body.json();
  const result = await resetPassword(body);

  context.response.status = 200;
  context.response.body = {
    success: true,
    message: result.message
  };
}
