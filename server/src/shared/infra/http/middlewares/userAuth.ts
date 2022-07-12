import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface ITokenPayload {
  id: number;
  iat: number;
  exp: number;
}
export default function userAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Login is required' });
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET as string);

    const { id } = data as ITokenPayload;

    req.userId = id;

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Login is required' });
  }
}
