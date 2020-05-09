import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import UserRepository from '../data/repositories/user.repository';
import User from '../data/entities/User';

@Service()
export default class UserService {
  constructor(@OrmRepository() private userRepository: UserRepository) {}

  public async getAll(): Promise<User[]> {
    return await this.userRepository.getAllUsers();
  }

  public async deleteUser(id: string) {
    return await this.userRepository.deleteById(id);
  }

  public async findById(id: string): Promise<User> {
    return await this.userRepository.findById(id);
  }

  public async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findByEmail(email);
  }

  public async findByEmailWithPassword(email: string): Promise<User> {
    return await this.userRepository.findByEmailWithPassword(email);
  }

  public async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findByUsername(username);
  }
}
