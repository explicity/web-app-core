import { RoutingControllersOptions } from 'routing-controllers';
import { env } from '../env';

export const routingControllersOptions: RoutingControllersOptions = {
  classTransformer: true,
  controllers: env.app.dirs.controllers,
  cors: true,
  development: true,
  validation: false,
  defaultErrorHandler: false,
  defaults: {
    nullResultCode: 404,
    undefinedResultCode: 204,
    paramOptions: {
      required: true
    }
  }
};
