import { EntityRepository } from 'typeorm';

import Role from '../entities/Role';
import BaseRepository from './base.repository';

import { RoleEnum } from '../../common/enums';

@EntityRepository(Role)
export default class RoleRepository extends BaseRepository<Role> {
  public async getRolePermissions(roleId: string): Promise<Role> {
    return await this.createQueryBuilder('roles')
      .select(['role.id as id', 'role.role as "role"'])
      .leftJoin('role.permissions', 'permission')
      .where('role.id = :roleId', { roleId })
      .getOne();
  }

  public async findByRole(role: RoleEnum): Promise<Role> {
    return await this.findOne({
      where: { role },
    });
  }
}
