import User from '../entities/User';

import { users } from '../seed-data/users';
import { roles } from '../seed-data/roles';
import Role from '../entities/Role';

export class UsersSeeder {
  public static async execute() {
    users.forEach(async (data, index) => {
      const role = Object.assign(new Role(), roles[index])
      const user = Object.assign(new User(), data);

      user.roles = Promise.resolve([role]);
      await user.save();
    });
  }
}
