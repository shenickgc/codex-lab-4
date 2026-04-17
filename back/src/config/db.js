import { MongoClient } from 'mongodb';
import { env } from './env.js';

const client = new MongoClient(env.MONGODB_URI);

export let db;

export async function connectDB() {
  await client.connect();
  db = client.db(env.MONGODB_DB_NAME);

  await db.collection('users').createIndex({ email: 1 }, { unique: true });
  await db.collection('users').createIndex({ resetPasswordToken: 1 }, { sparse: true });

  console.log(`MongoDB connected to ${env.MONGODB_DB_NAME}`);
  return db;
}
