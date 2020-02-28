import Article from '../entities/Article';

import { articles } from '../seed-data/articles';

export class ArticlesSeeder {
  public static async execute() {
    articles.forEach(async article => {
      await Object.assign(new Article(), article).save();
    });
  }
}
