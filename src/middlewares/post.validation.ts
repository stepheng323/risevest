import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { joiValidator } from '../lib';
import { respondWithWarning } from '../utils';
import { CreatPostPayload, PostCommetPayload } from '../types';

export const validateCreatePost = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object<CreatPostPayload>({
    title: Joi.string().required(),
    content: Joi.string().required(),
  });
  const result = joiValidator(req.body, schema);
  if (!result.errorMessage) {
    req.validatedData = result.value;
    return next();
  }
  return respondWithWarning(res, 400, result.errorMessage, {});
};

export const validatePostComment = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object<PostCommetPayload>({
    content: Joi.string().required(),
  });
  const result = joiValidator(req.body, schema);
  if (!result.errorMessage) {
    req.validatedData = result.value;
    return next();
  }
  return respondWithWarning(res, 400, result.errorMessage, {});
};
