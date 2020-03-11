import { EntityRepository } from 'typeorm';

import Tag from '../entities/Tag';
import BaseRepository from './base.repository';
import { ITagSearch } from '../../common/models/tag';

@EntityRepository(Tag)
export default class TagRepository extends BaseRepository<Tag> {
  async getByFilter({ from, count, keyword }: ITagSearch): Promise<Tag[]> {
    const tags = this.createQueryBuilder('tags')
      .select('tags.id')
      .addSelect('tags.keyword');

    if (keyword) {
      tags.where('LOWER(tags.keyword) LIKE LOWER(:keyword)', {
        keyword: `%${keyword}%`
      });
    }

    return await tags
      .skip(from)
      .take(count)
      .orderBy({
        'tags.keyword': 'ASC'
      })
      .getMany();
  }

  async getByKeyword({ keyword }: { keyword: string }): Promise<Tag> {
    return await this.findOne({
      where: {
        keyword
      }
    });
  }
}
