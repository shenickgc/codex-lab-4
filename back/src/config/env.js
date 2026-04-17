import { load } from '@std/dotenv';

async function loadEnvFile(envPath) {
  try {
    await load({ export: true, envPath });
  } catch (error) {
    if (!(error instanceof Deno.errors.NotFound)) {
      throw error;
    }
  }
}

// Load local overrides first, then complete missing values from .env.example.
await loadEnvFile('.env');
await loadEnvFile('.env.example');

function getRequiredEnv(name, fallback) {
  const value = Deno.env.get(name) ?? fallback;

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export const env = {
  PORT: Number(Deno.env.get('PORT') ?? '8000'),
  MONGODB_URI: getRequiredEnv('MONGODB_URI', 'mongodb://127.0.0.1:27017'),
  MONGODB_DB_NAME: getRequiredEnv('MONGODB_DB_NAME', 'user_system'),
  JWT_SECRET: getRequiredEnv('JWT_SECRET', 'change_this_secret'),
  JWT_EXPIRES_IN: getRequiredEnv('JWT_EXPIRES_IN', '1d'),
  RESET_TOKEN_EXPIRES_MINUTES: Number(Deno.env.get('RESET_TOKEN_EXPIRES_MINUTES') ?? '30')
};
