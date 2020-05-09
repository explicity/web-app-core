import * as dotenv from 'dotenv';
import { getOsEnv, getOsPaths } from './common/utils/path.helper';

dotenv.config();

export const env = {
  app: {
    port: getOsEnv('APP_PORT'),
    dirs: {
      controllers: getOsPaths('APP_CONTROLLERS'),
      middlewares: getOsPaths('APP_MIDDLEWARES'),
    },
  },
};
