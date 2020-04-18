import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import UserRepository from '../data/repositories/user.repository';
import { IShortUser, IUserRegistration } from '../common/models/user';

import cryptoHelper from '../common/utils/crypto.helper';
import tokenHelper from '../common/utils/token.helper';
@Service()
export default class AuthService {
  constructor(@OrmRepository() private userRepository: UserRepository) {}

  public async login({ id }: IShortUser) {
    return {
      token: tokenHelper.createToken({ id }),
      user: await this.userRepository.findById(id),
    };
  }
}
