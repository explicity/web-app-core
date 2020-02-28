import Role from '../entities/Role';
import Permission from '../entities/Permission';

import { RoleEnum } from '../../common/enums';

import { roles } from '../seed-data/roles';
import * as rolePermissions from '../seed-data/permissions';

const userPermissions = [
  'can_delete_article',
  'can_add_article',
  'can_update_article'
];
export class RolesSeeder {
  public static async execute() {

    roles.forEach(async ({ permissions, ...data }) => {
      const entity = Object.assign(new Role(), data);

      let permissionsEntity: Permission[] = [];
      switch (data.role) {
        case RoleEnum.admin:
          permissionsEntity = rolePermissions.permissions.map(
            (item: Permission) => Object.assign(new Permission(), item)
          );
          break;
        case RoleEnum.user:
          permissionsEntity = rolePermissions.permissions
            .filter((item: Permission) => userPermissions.includes(item.name))
            .map((item: Permission) => Object.assign(new Permission(), item));
          break;
        default:
          break;
      }

      entity.permissions = Promise.resolve(permissionsEntity);
      await entity.save();
    });
  }
}
