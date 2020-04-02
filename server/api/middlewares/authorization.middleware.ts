import jwtMiddleware from './jwt.middleware';
// @ts-ignore
export default (routesWhiteList = []) => (req, res, next) =>
  routesWhiteList.some(route => route === req.path)
    ? next()
    : jwtMiddleware(req, res, next);
