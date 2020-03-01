import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import UserRepository from '../data/repositories/user.repository';
import { IShortUser } from '../common/models/user';

@Service()
export default class UserService {
  constructor(@OrmRepository() private userRepository: UserRepository) {}

  getAll() {
    return this.userRepository.getAllUsers();
  }

  save({ id, email, firstName, lastName, login }: IShortUser) {
    return this.userRepository.save({
      id,
      email,
      firstName,
      lastName,
      login
    });
  }

  deleteUser(id: string) {
    return this.userRepository.deleteById(id);
  }
}
