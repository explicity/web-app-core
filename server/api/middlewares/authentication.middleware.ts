import { Request, Response, NextFunction } from 'express';

import tokenHelper from '../../common/utils/token.helper';
// @ts-ignore
const extractTokenFromHeader = (req: Request) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1];
  }
};

export const JWTMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = extractTokenFromHeader(req);
  let jwtPayload: object | string;

  try {
    jwtPayload = tokenHelper.verifyToken(token);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    res
      .status(401)
      .send({ response: 'You should be logged in to access this url' });
    return;
  }

  const newToken = tokenHelper.createToken(jwtPayload);
  res.setHeader('Authorization', 'Bearer ' + newToken);

  next();
};
