import pg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
// Use destructuring to get Pool
const { Pool } = pg;
// Create the PostgreSQL pool
const pool = new Pool({
    host: "localhost",
    port: 5432,
    database: "livraison",
    user: "moutia",
    password: "123",
});
// Initialize Drizzle ORM
const db = drizzle(pool);
export { db };
