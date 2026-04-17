import { app } from './app.js';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';

await connectDB();

console.log(`Server running on http://localhost:${env.PORT}`);
await app.listen({ port: env.PORT });
