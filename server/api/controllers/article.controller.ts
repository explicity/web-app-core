import { UpdateResult } from 'typeorm';
import {
  JsonController,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete
} from 'routing-controllers';

import ArticleService from '../../services/article.service';
import { IArticleNew } from '../../common/models/article';
import Article from '../../data/entities/Article';

@JsonController('/articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get('/')
  public async getArticles(): Promise<Article[]> {
    return await this.articleService.getAll();
  }

  @Get('/:id')
  public async getArticle(@Param('id') id: string): Promise<Article> {
    return await this.articleService.findById(id);
  }

  @Post('/')
  public async saveArticle(@Body() data: IArticleNew): Promise<string> {
    return await this.articleService.saveArticle(data);
  }

  @Put('/')
  public async updateArticle(@Body() data: Article): Promise<UpdateResult> {
    return await this.articleService.updateArticle(data);
  }

  @Delete('/:id')
  public async deleteArticle(@Body() data: Article): Promise<void> {
    return await this.articleService.deleteArticle(data);
  }
}
