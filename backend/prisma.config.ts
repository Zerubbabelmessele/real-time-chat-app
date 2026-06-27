// prisma.config.ts
import 'dotenv/config'; // Required to load .env variables
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  datasource: {
    url: env('DATABASE_URL'), // Your connection string from .env
  },
});
