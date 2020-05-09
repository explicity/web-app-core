import { EntityRepository } from 'typeorm';

import BaseRepository from './base.repository';
import User from '../entities/User';

@EntityRepository(User)
export default class UserRepository extends BaseRepository<User> {
  public async getAllUsers(): Promise<User[]> {
    return await this.createQueryBuilder('users')
      .select([
        'users.id',
        'users.username',
        'users.firstName',
        'users.lastName',
        'users.email'
      ])
      .leftJoin('users.roles', 'role')
      .addSelect(['role.id', 'role.role'])
      .leftJoin('users.newspapers', 'newspaper')
      .addSelect(['newspaper.id', 'newspaper.name'])
      .getMany();
  }

  public async findById(id: string): Promise<User> {
    return await this.createQueryBuilder('users')
      .where('users.id = :id', {
        id
      })
      .leftJoin('users.roles', 'role')
      .addSelect(['role.id', 'role.role'])
      .leftJoin('users.newspapers', 'newspaper')
      .addSelect(['newspaper.id', 'newspaper.name'])
      .getOne();
  }

  public async findByEmail(email: string): Promise<User> {
    return await this.createQueryBuilder('users')
      .where('users.email = :email', {
        email
      })
      .leftJoin('users.roles', 'role')
      .addSelect(['role.id', 'role.role'])
      .leftJoin('users.newspapers', 'newspaper')
      .addSelect(['newspaper.id', 'newspaper.name'])
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
        username
      })
      .leftJoin('users.roles', 'role')
      .addSelect(['role.id', 'role.role'])
      .leftJoin('users.newspapers', 'newspaper')
      .addSelect(['newspaper.id', 'newspaper.name'])
      .getOne();
  }

  public async createAndSave(user: any) {
    return await this.save(user);
  }
}
