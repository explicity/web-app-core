import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import uuidv4 from 'uuid/v4';

import UserRepository from '../data/repositories/user.repository';
import { IShortUser, IUserRegistration } from '../common/models/user';

import cryptoHelper from '../common/utils/crypto.helper';
import tokenHelper from '../common/utils/token.helper';
@Service()
export default class AuthService {
  constructor(@OrmRepository() private userRepository: UserRepository) {}

  public async login(user: IShortUser) {
    console.log('user', user);
    return {
      token: tokenHelper.createToken(user),
      user: await this.userRepository.findById(user.id),
    };
  }

  public async register({ password, ...userData }: IUserRegistration) {
    const newUser = await this.userRepository.addUser({
      id: uuidv4(),
      ...userData,
      password: await cryptoHelper.encrypt(password),
    });
    return this.login(newUser);
  }
}
