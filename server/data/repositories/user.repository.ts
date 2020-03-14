import { EntityRepository } from 'typeorm';

import BaseRepository from './base.repository';
import User from '../entities/User';

@EntityRepository(User)
export default class UserRepository extends BaseRepository<User> {
  getAllUsers(): Promise<User[]> {
    return this.createQueryBuilder('users')
      .select([
        'users.id',
        'users.firstName',
        'users.lastName',
        'users.login',
        'users.email'
      ])
      .getMany();
  }
}
