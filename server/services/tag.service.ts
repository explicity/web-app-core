import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import TagRepository from '../data/repositories/tag.repository';
import { ITagSearch } from '../common/models/tag';
import Tag from '../data/entities/Tag';

@Service()
export default class TagService {
  constructor(@OrmRepository() private tagRepository: TagRepository) {}

  async getTagsByFilter(filter: ITagSearch): Promise<Tag[]> {
    return await this.tagRepository.getByFilter(filter);
  }
}
