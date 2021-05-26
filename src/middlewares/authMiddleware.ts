import { Request, Response, NextFunction } from 'express';
var jwt = require('jsonwebtoken');

interface ITokenPauload {
  id: string;
  iat: number;
  expt: number;
}

export default function authMiddleware(request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers

  if (!authorization) {
    return response.sendStatus(401);
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const data = jwt.verify(token, 'secret');

    const { id } = data as ITokenPauload;

    request.userId = id;

    return next();

  } catch {
    return response.sendStatus(401);
  }
}