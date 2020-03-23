import { EntityRepository } from 'typeorm';

import BaseRepository from './base.repository';
import User from '../entities/User';

@EntityRepository(User)
export default class UserRepository extends BaseRepository<User> {
  async getAllUsers(): Promise<User[]> {
    return await this.createQueryBuilder('users')
      .select([
        'users.id',
        'users.firstName',
        'users.lastName',
        'users.login',
        'users.email'
      ])
      .getMany();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.findOne({
      where: { email }
    });
  }

  async findByUsername(username: string): Promise<User> {
    return await this.findOne({
      where: { username }
    })
  }
}
