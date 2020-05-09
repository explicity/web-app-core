import User from '../entities/User';

import { users } from '../seed-data/users';
import { roles } from '../seed-data/roles';
import Role from '../entities/Role';

export class UsersSeeder {
  public static async execute() {
    users.forEach(async data => {
      const userRole: Role =
        roles.find(item => item.role === data.username) || roles[0];

      const role = Object.assign(new Role(), userRole);
      const user = Object.assign(new User(), data);

      user.roles = [role];
      await user.save();
    });
  }
}
