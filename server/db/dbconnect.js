import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const string = process.env.NODE_ENV === 'test'
  ? ''
  : process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: string,
});
export default (text, params) => pool.query(text, params);
