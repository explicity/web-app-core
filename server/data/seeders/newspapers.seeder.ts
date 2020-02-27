import Newspaper from '../entities/Newspaper';
import Article from '../entities/Article';
import User from '../entities/User';

import { newspapers } from '../seed-data/newspapers';
import { users } from '../seed-data/users';

export class NewspapersSeeder {
  public static async execute() {
    newspapers.forEach(async ({ articles, ...data }) => {
      const newspaper = Object.assign(new Newspaper(), data);

      const usersEntity = users.map(user => {
        return Object.assign(new User(), user);
      });

      newspaper.users = Promise.resolve(usersEntity);
      await newspaper.save();

      articles.forEach(async article => {
        await Object.assign(new Article(), article).save();
      });
    });
  }
}
