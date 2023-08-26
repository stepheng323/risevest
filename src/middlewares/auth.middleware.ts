import { NextFunction, Request, Response } from "express";
import { respondWithWarning } from "../utils";
import { verifyToken } from "../lib";
import { findUserById } from "../services";


export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization;
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  if (!token) {
    return respondWithWarning(res, 401, 'No token provided', null);
  }
  try {
    req.user = verifyToken(token) as any;
    const user = await findUserById(req.user.id);
    if (!user) return respondWithWarning(res, 404, 'no user found', null);
    req.user = user;
    return next();
  } catch (error: any) {
    if (error.message === 'JsonWebTokenError') return respondWithWarning(res, 401, 'invalid token', null);
    return respondWithWarning(res, 401, error.message, null);
  }
};