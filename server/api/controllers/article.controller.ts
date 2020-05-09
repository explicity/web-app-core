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
  public getArticles() {
    return this.articleService.getArticles();
  }

  @Get('/:id')
  public getArticle(@Param('id') id: string) {
    return this.articleService.getArticleById(id);
  }

  @Post('/')
  public saveArticle(@Body() data: IArticleNew) {
    return this.articleService.saveArticle(data);
  }

  @Put('/')
  public updateArticle(@Body() data: Article) {
    return this.articleService.updateArticle(data);
  }

  @Delete('/:id')
  public deleteArticle(@Body() data: Article) {
    return this.articleService.deleteArticle(data);
  }
}
