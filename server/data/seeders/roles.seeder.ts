import Role from '../entities/Role';
import Permission from '../entities/Permission';

import { roles } from '../seed-data/roles';
import { permissions } from '../seed-data/permissions';

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

    roles.forEach(async role => {
      await Object.assign(new Role(), role).save();
    });
  }
}
