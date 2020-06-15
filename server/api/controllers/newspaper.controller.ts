import { JsonController, Get, Param, Post, Body } from 'routing-controllers';

import NewspaperService from '../../services/newspaper.service';
import ArticleService from '../../services/article.service';

import Newspaper from '../../data/entities/Newspaper';
import Article from '../../data/entities/Article';

@JsonController('/newspapers')
export class NewspaperController {
  constructor(
    private newspaperService: NewspaperService,
    private articleService: ArticleService
  ) {}

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

  @Get('/:newspaperId/articles/:articleId')
  public async getNewspaperExtendedArticle(
    @Param('newspaperId') newspaperId: string,
    @Param('articleId') articleId: string
  ): Promise<Article> {
    return await this.newspaperService.getNewspaperExtendedArticle({
      newspaperId,
      articleId
    });
  }

  @Post('/:newspaperId/articles/:articleId/react')
  public async handleUserArticleReaction(@Body() data: any) {
    return await this.articleService.handleUserArticleReaction(data);
  }
}
