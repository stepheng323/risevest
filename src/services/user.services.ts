import { UserModel } from '../types';
import { pool } from '../lib'
import { QueryResult } from 'pg'

export const findUserByEmail = async (email: string): Promise<UserModel | null> => {
  const query = 'SELECT * FROM users WHERE email = $1 LIMIT 1';
  const values = [email];
  const result: QueryResult<UserModel> = await pool.query(query, values);
  return result.rows[0];
}

export const saveUser = async (userData: UserModel): Promise<UserModel> => {
  const { email, firstname, lastname, password } = userData
  const query = `
  INSERT INTO users (email, firstname, lastname, password, created_at, updated_at)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *;`;

  const values = [email, firstname, lastname, password, new Date(), new Date()];
  const result: QueryResult<UserModel> = await pool.query(query, values);
  return result.rows[0]

}

export const findUserById = async (userId: string): Promise<UserModel | null> => {
  const query = 'SELECT * FROM users WHERE id = $1';
  const values = [userId];
  const result: QueryResult<UserModel> = await pool.query(query, values);
  return result.rows[0];
}



export const getUsers = async (): Promise<UserModel[]> => {
  const query = 'SELECT * FROM users';

  const result: QueryResult<UserModel> = await pool.query(query);
  return result.rows;
}