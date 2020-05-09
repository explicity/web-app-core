import Tag from '../entities/Tag';

import { tags } from '../seed-data/tags';

export class TagsSeeder {
  public static async execute() {
    tags.forEach(async tag => {
      await Object.assign(new Tag(), tag).save();
    });
  }
}
