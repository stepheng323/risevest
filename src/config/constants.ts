import dotenv from 'dotenv';

dotenv.config();

const {
  PORT,
  NODE_ENV,
  SALT_ROUND,
  TOKEN_SECRET_KEY,
  TOKEN_EXPIRATION,
} = process.env;

export {
  PORT,
  NODE_ENV,
  SALT_ROUND,
  TOKEN_SECRET_KEY,
  TOKEN_EXPIRATION,

};
