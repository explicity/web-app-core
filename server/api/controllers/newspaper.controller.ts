import { JsonController, Get, Param } from 'routing-controllers';

import NewspaperService from '../../services/newspaper.service';

import Newspaper from '../../data/entities/Newspaper';

@JsonController('/newspapers')
export class NewspaperController {
  constructor(private newspaperService: NewspaperService) {}

  @Get('/')
  public async getAllNewspapers(): Promise<Newspaper[]> {
    return await this.newspaperService.getAll();
  }

  @Get('/:id')
  public async getNewspaperById(@Param('id') id: string): Promise<Newspaper> {
    return await this.newspaperService.findById(id);
  }

  @Get('/:id/articles')
  public async getNewspaperArticles(
    @Param('id') id: string
  ): Promise<Newspaper> {
    return await this.newspaperService.getNewspaperArticles(id);
  }
}
