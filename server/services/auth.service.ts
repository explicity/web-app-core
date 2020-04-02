import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import UserRepository from '../data/repositories/user.repository';
import { IShortUser, IUserRegistration } from '../common/models/user';

@Service()
export default class AuthService {
  constructor(@OrmRepository() private userRepository: UserRepository) {}

  async login(data: IShortUser) {
    console.log('login', data);
  }

  register(data: IUserRegistration) {
    console.log('register', data);
  }
}
