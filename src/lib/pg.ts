import { Pool } from 'pg'

export const pool = new Pool({
  user: 'risevest',
  host: 'db',
  database: 'risevest',
  password: 'risevest',
  port: 5432,
});

