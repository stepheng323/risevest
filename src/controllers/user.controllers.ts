import { Request, Response } from 'express'
import { catchAsync, respondWithSuccess, respondWithWarning } from "../utils";
import { findUserByEmail, saveUser, getUsers } from '../services';
import { LoginPayload, SignupPayload } from '../types/user.types';
import { compareHash, generateTokenAndExpiry, hashPassword } from '../lib';

export const signup = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.validatedData as SignupPayload
  const userExist = await findUserByEmail(email)
  if (userExist) return respondWithWarning(res, 409, 'Email in use, please try again with another email', {})

  const hashedPassword = await hashPassword(password);
  const user = await saveUser({ ...req.validatedData, password: hashedPassword });
  const { password: _password, created_at, updated_at, ...tokenPayload } = user;
  const token = await generateTokenAndExpiry(tokenPayload, null);
  return respondWithSuccess(res, 201, 'User created successfully', { ...user, token, password: undefined })
})

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.validatedData as LoginPayload;
  const user = await findUserByEmail(email);

  if (!user) return respondWithWarning(res, 401, 'invalid email and password combination', {});
  const passwordMatch = await compareHash(password, user.password);

  if (!passwordMatch) return respondWithWarning(res, 401, 'invalid email and password combination', {});

  const { password: _password, created_at, updated_at, ...tokenPayload } = user;
  const token = await generateTokenAndExpiry(tokenPayload, null);
  return respondWithSuccess(res, 200, 'User logged in successfully', {
    ...user,
    token,
  });
})


export const fetchUsers = catchAsync(async (req: Request, res: Response) => {
  // this should be paginated
  const users = await getUsers();
  return respondWithSuccess(res, 200, 'Users fetched successfully', users)
})