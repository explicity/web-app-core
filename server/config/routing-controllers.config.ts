import { RoutingControllersOptions } from 'routing-controllers';

import { RoleMiddleware } from '../api/middlewares/role.middleware';
import { env } from '../env';

export const routingControllersOptions: RoutingControllersOptions = {
  routePrefix: '/api',
  classTransformer: true,
  controllers: env.app.dirs.controllers,
  middlewares: env.app.dirs.middlewares,
  authorizationChecker: RoleMiddleware,
  cors: true,
  development: true,
  validation: false,
  defaultErrorHandler: true,
  defaults: {
    nullResultCode: 404,
    undefinedResultCode: 204,
    paramOptions: {
      required: true,
    },
  },
};
