import dotenv from 'dotenv';

dotenv.config();

const {
  PORT,
  NODE_ENV,
  SALT_ROUND,
  TOKEN_SECRET_KEY,
  TOKEN_EXPIRATION,
  DB_USER,
  DB_HOST,
  DB_NAME,
  DB_PORT,
  DB_PASSWORD
} = process.env;

export {
  PORT,
  NODE_ENV,
  SALT_ROUND,
  TOKEN_SECRET_KEY,
  TOKEN_EXPIRATION,
  DB_USER,
  DB_HOST,
  DB_NAME,
  DB_PORT,
  DB_PASSWORD

};
