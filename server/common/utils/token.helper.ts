import jwt from 'jsonwebtoken';

import { secret, expiresIn } from '../../config/jwt.config';

export default {
  createToken: (data: string | object | Buffer): string =>
    jwt.sign({ data }, secret, { expiresIn }),
  verifyToken: (token: string): string | object => jwt.verify(token, secret),
};
