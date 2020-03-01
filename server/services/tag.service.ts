import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import TagRepository from '../data/repositories/tag.repository';
import { ITagSearch } from '../common/models/tag';

@Service()
export default class TagService {
  constructor(@OrmRepository() private tagRepository: TagRepository) {}

  getTagsByFilter(filter: ITagSearch) {
    return this.tagRepository.getByFilter(filter);
  }
}
