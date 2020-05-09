import Newspaper from '../entities/Newspaper';
import User from '../entities/User';

import { newspapers } from '../seed-data/newspapers';
import { users } from '../seed-data/users';

export class NewspapersSeeder {
  public static async execute() {
    newspapers.forEach(async (data) => {
      const newspaper = Object.assign(new Newspaper(), data);

      newspaper.users = users.map((user) => Object.assign(new User(), user));

      await newspaper.save();
    });
  }
}
