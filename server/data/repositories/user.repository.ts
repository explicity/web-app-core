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

  public async findById(id: string): Promise<User> {
    return await this.createQueryBuilder('users')
      .where('users.id = :id', {
        id,
      })
      .leftJoin('users.roles', 'role')
      .addSelect(['role.id', 'role.role'])
      .getOne();
  }

  public async findByEmail(email: string): Promise<User> {
    return await this.createQueryBuilder('users')
      .where('users.email = :email', {
        email,
      })
      .leftJoin('users.roles', 'role')
      .addSelect(['role.id', 'role.role'])
      .getOne();
  }

  public async findByEmailWithPassword(email: string): Promise<User> {
    return this.createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email = :email', { email })
      .getOne();
  }

  public async findByUsername(username: string): Promise<User> {
    return await this.createQueryBuilder('users')
      .where('users.username = :username', {
        username,
      })
      .leftJoin('users.roles', 'role')
      .addSelect(['role.id', 'role.role'])
      .getOne();
  }

  public async addUser(user: IUserRegistration) {
    return await this.save(user);
  }
}
