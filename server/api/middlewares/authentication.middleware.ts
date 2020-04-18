import { Request, Response, NextFunction } from 'express';

import tokenHelper from '../../common/utils/token.helper';

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
  let jwtPayload;

  try {
    jwtPayload = tokenHelper.verifyToken(token);
    console.log('jwtPayload');
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    res
      .status(401)
      .send({ response: 'You should be logged in to access this url' });
    return;
  }

  //We refresh the token on every request by setting another 1h
  // const {
  //   data: { userId, username, role },
  // } = jwtPayload;
  // const newToken = jwt.sign(
  //   { data: { userId, username, role } },
  //   config.jwtSecret,
  //   {
  //     expiresIn: '1h',
  //   }
  // );
  // res.setHeader('Authorization', 'Bearer ' + newToken);

  next();
};
