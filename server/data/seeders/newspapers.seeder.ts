import Newspaper from '../entities/Newspaper';
import User from '../entities/User';
import Article from '../entities/Article';

import { newspapers } from '../seed-data/newspapers';
import { users } from '../seed-data/users';
import { articles } from '../seed-data/articles';

export class NewspapersSeeder {
  public static async execute() {
    newspapers.forEach(async data => {
      const newspaper = Object.assign(new Newspaper(), data);

      newspaper.users = users.map(user => Object.assign(new User(), user));
      newspaper.articles = articles.map(article =>
        Object.assign(new Article(), article)
      );

      await newspaper.save();
    });
  }
}
