import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { joiValidator } from '../lib';
import { respondWithWarning } from '../utils';
import { LoginPayload, SignupPayload } from '../types/user.types';

export const validateCreateUser = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object<SignupPayload>({
    email: Joi.string().email().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    confirm_password: Joi.ref('password'),
  });
  const result = joiValidator(req.body, schema);
  if (!result.errorMessage) {
    req.validatedData = result.value;
    return next();
  }
  return respondWithWarning(res, 400, result.errorMessage, {});
};

export const vaidateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object<LoginPayload>({
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

  });
  const result = joiValidator(req.body, schema);
  if (!result.errorMessage) {
    req.validatedData = result.value;
    return next();
  }
  return respondWithWarning(res, 400, result.errorMessage, {});
};

