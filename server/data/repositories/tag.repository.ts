import { EntityRepository } from 'typeorm';

import Tag from '../entities/Tag';
import BaseRepository from './base.repository';
import { ITagSearch } from '../../common/models/tag';

@EntityRepository(Tag)
export default class TagRepository extends BaseRepository<Tag> {
  getByFilter({ from, count, keyword }: ITagSearch) {
    const tags = this.createQueryBuilder('tags')
      .select('tags.id')
      .addSelect('tags.keyword');

    if (keyword) {
      tags.where('LOWER(tags.keyword) LIKE LOWER(:keyword)', {
        keyword: `%${keyword}%`
      });
    }

    return tags
      .skip(from)
      .take(count)
      .orderBy({
        'tags.keyword': 'ASC'
      })
      .getMany();
  }

  getByKeyword({ keyword }: { keyword: string }) {
    return this.findOne({
      where: {
        keyword
      }
    });
  }
}
