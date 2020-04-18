import { EntityRepository } from 'typeorm';

import BaseRepository from './base.repository';
import User from '../entities/User';
import { IUserRegistration } from '../../common/models/user';

@EntityRepository(User)
export default class UserRepository extends BaseRepository<User> {
  public async getAllUsers(): Promise<User[]> {
    return await this.createQueryBuilder('users')
      .select([
        'users.id',
        'users.username',
        'users.firstName',
        'users.lastName',
        'users.email',
      ])
      .leftJoin('users.roles', 'role')
      .addSelect(['role.id', 'role.role'])
      .getMany();
  }

  public async findByEmail(email: string): Promise<User> {
    return await this.findOne({
      where: { email },
    });
  }

  public async findByUsername(username: string): Promise<User> {
    return await this.findOne({
      where: { username },
    });
  }

  public async addUser(user: IUserRegistration) {
    return await this.save(user);
  }
}
