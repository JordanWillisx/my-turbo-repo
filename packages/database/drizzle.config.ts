import { defineConfig } from "drizzle-kit";
import { config } from 'dotenv';

if(!process.env.DATABASE_URL){
  config({ path: '.env' });
}

export default defineConfig({
  dialect: "postgresql",
  schema: "schema.ts",
  out: "./migrations",
  dbCredentials: process.env.DATABASE_URL
    ? { url: process.env.DATABASE_URL as string }
    : {
        host: process.env.POSTGRES_HOST || "localhost",
        port: Number(process.env.POSTGRES_PORT) || 5432,
        user: process.env.POSTGRES_USER || "myuser",
        password: process.env.POSTGRES_PASSWORD || "mypassword",
        database: process.env.POSTGRES_DB || "mydatabase",
      }
});
