import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import uuidv4 from 'uuid/v4';

import UserRepository from '../data/repositories/user.repository';
import RoleRepository from '../data/repositories/role.repository';
import { IShortUser, IUserRegistration } from '../common/models/user';
import { RoleEnum } from '../common/enums';

import cryptoHelper from '../common/utils/crypto.helper';
import tokenHelper from '../common/utils/token.helper';
@Service()
export default class AuthService {
  constructor(
    @OrmRepository() private userRepository: UserRepository,
    @OrmRepository() private roleRepository: RoleRepository
  ) {}

  public async login(user: IShortUser) {
    return {
      token: tokenHelper.createToken({
        userId: user.id,
        username: user.username,
      }),
      user: await this.userRepository.findById(user.id),
    };
  }

  public async register({ password, ...userData }: IUserRegistration) {
    const defaultRole = await this.roleRepository.findByRole(RoleEnum.user);
    const newUser = await this.userRepository.addUser({
      id: uuidv4(),
      ...userData,
      password: await cryptoHelper.encrypt(password),
      roles: [defaultRole],
    });
    return this.login(newUser);
  }
}
