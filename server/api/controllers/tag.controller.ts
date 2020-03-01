import { JsonController, Get, QueryParams } from 'routing-controllers';

import TagService from '../../services/tag.service';
import { ITagSearch } from '../../common/models/tag';

@JsonController('/tags')
export class TagController {
  constructor(private tagService: TagService) {}

  @Get('/')
  public getTags(@QueryParams() params: ITagSearch) {
    return this.tagService.getTagsByFilter(params);
  }
}
