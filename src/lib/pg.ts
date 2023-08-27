import { Pool } from 'pg'
import { DB_USER, DB_HOST, DB_NAME, DB_PORT, DB_PASSWORD } from '../config/constants'

export const pool = new Pool({
  user: DB_USER ?? 'risevest',
  host: DB_HOST ?? 'db',
  database: DB_NAME ?? 'risevest',
  password: DB_PASSWORD ?? 'risevest',
  port: Number(DB_PORT) ?? 5432,
});

