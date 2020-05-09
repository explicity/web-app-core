import { JsonController, Get, QueryParams } from 'routing-controllers';

import TagService from '../../services/tag.service';
import { ITagSearch } from '../../common/models/tag';

import Tag from '../../data/entities/Tag';

@JsonController('/tags')
export class TagController {
  constructor(private tagService: TagService) {}

  @Get('/')
  public async getTags(@QueryParams() params: ITagSearch): Promise<Tag[]> {
    return await this.tagService.getTagsByFilter(params);
  }
}
