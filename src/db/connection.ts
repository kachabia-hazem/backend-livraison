import pg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';


// Use destructuring to get Pool
const { Pool } = pg;

// Create the PostgreSQL pool
const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "livraison",
  user: "hazem",
  password: "hazem123",
});

// Initialize Drizzle ORM
const db = drizzle(pool);
const checkDbConnection = async () => {
  try{
    const client=await pool.connect();
    console.log('DaTabase connected successfully');
    client.release();
  }catch(err){
    console.error('Failed to connect to the database:',err);
    process.exit(1);
  }
};
export { db, checkDbConnection };
