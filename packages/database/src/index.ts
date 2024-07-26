import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const DATABASE_URL:string = (process.env.DATABASE_URL || `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`)

const queryClient = postgres(DATABASE_URL);
export const db = drizzle(queryClient);

export const migrateDB = async (url: string) => {
    const migrationClient = postgres(DATABASE_URL, { max: 1 });
    await migrate(drizzle(migrationClient), { migrationsFolder: "./migrations" })
}

