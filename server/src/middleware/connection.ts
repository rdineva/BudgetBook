import { Request, Response } from 'express-serve-static-core';
import { getConnection } from 'typeorm';

export default (req: Request, res: Response, next: () => void): void => {
  const connection = getConnection();
  res.locals.connection = connection;
  next();
};
