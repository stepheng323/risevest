import { Request, Response, NextFunction } from 'express'

export const respondWithSuccess = (res: Response, statusCode = 200, message: string, additionalFields: any) => res.status(statusCode).send({
  success: true,
  message,
  data: additionalFields,
});

export const respondWithWarning = (res: Response, statusCode = 500, message: string, additionalFields: any) => res.status(statusCode).send({
  success: false,
  message,
  data: additionalFields,
});


export const catchAsync = (func: any) => (req: Request, res: Response, next: NextFunction) => {
  return func(req, res, next).catch(next);
};
