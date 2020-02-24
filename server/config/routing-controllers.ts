import { RoutingControllersOptions } from 'routing-controllers';

export const routingControllersOptions: RoutingControllersOptions = {
  classTransformer: true,
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
