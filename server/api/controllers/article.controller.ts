import { JsonController, Get } from 'routing-controllers';

import ArticleService from '../../services/article.service';

@JsonController('/articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get('/')
  public getArticles() {
    return this.articleService.getArticles();
  }
}
