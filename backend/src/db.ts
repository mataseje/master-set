import dotenv from 'dotenv';
import { Pool } from 'pg';

// Adds env variables to process.env
dotenv.config(); 

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT? Number(process.env.DB_PORT): undefined,
  database: process.env.DB_DATABASE
});

export default pool;