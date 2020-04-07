import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import UserRepository from '../data/repositories/user.repository';
import { IShortUser } from '../common/models/user';
import User from '../data/entities/User';

@Service()
export default class UserService {
  constructor(@OrmRepository() private userRepository: UserRepository) {}

  async getAll(): Promise<User[]> {
    return await this.userRepository.getAllUsers();
  }

  save({ id, email, username }: IShortUser) {
    return this.userRepository.save({
      id,
      email,
      username
    });
  }

  async deleteUser(id: string) {
    return await this.userRepository.deleteById(id);
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.getById(id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findByEmail(email);
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findByUsername(username);
  }
}
