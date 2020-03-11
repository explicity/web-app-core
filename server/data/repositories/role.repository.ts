import { EntityRepository } from 'typeorm';

import Role from '../entities/Role';
import BaseRepository from './base.repository';

@EntityRepository(Role)
export default class RoleRepository extends BaseRepository<Role> {
  async getRolePermissions(roleId: string): Promise<Role[]> {
    return await this.createQueryBuilder('roles')
      .select(['role.id as id', 'role.role as "role"'])
      .leftJoin('role.permissions', 'permission')
      .where('role.id = :roleId', { roleId })
      .getMany();
  }
}
