import Role from '../entities/Role';
import Permission from '../entities/Permission';

import { RoleEnum } from '../../common/enums';

import { roles } from '../seed-data/roles';
import { permissions } from '../seed-data/permissions';

const userPermissions = [
  'can_delete_article',
  'can_add_article',
  'can_update_article'
];

export class PermissionsSeeder {
  public static async execute() {
    permissions.forEach(async permission => {
      await Object.assign(new Permission(), permission).save();
    });
  }
}

export class RolesSeeder {
  public static async execute() {
    await PermissionsSeeder.execute();

    roles.forEach(async data => {
      const entity = Object.assign(new Role(), data);

      let permissionsEntity: Permission[];
      switch (entity.role) {
        case RoleEnum.admin:
          permissionsEntity = permissions.map(item =>
            Object.assign(new Permission(), item)
          );
          break;
        case RoleEnum.user:
          permissionsEntity = permissions.map(
            item =>
              userPermissions.includes(item.name) &&
              Object.assign(new Permission(), item)
          );
          break;
        default:
          break;
      }

      entity.permissions = Promise.resolve(permissionsEntity);
      await entity.save();
    });
  }
}
