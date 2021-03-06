import { getCustomRepository } from 'typeorm';
import { Action } from 'routing-controllers';

import User from '../../data/entities/User';
import UserRepository from '../../data/repositories/user.repository';

export const RoleMiddleware = async (action: Action, roles: string[]) => {
  let res = action.response;
  const id = res.locals.jwtPayload.userId;

  const userRepository = getCustomRepository(UserRepository);
  let user: User;
  try {
    user = await userRepository.findById(id);
  } catch (id) {
    return false;
  }

  if (user && !roles.length) return true;
  // if (roles.indexOf(user.roles) > -1) return true;
  else return false;
};
