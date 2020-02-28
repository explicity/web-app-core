import Permission from '../entities/Permission';

import { permissions } from '../seed-data/permissions';

export class PermissionsSeeder {
  public static async execute() {
    permissions.forEach(async permission => {
      await Object.assign(new Permission(), permission).save();
    });
  }
}
