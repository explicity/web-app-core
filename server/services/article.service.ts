import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import ArticleRepository from '../data/repositories/article.repository';

@Service()
export default class ArticleService {
  constructor(@OrmRepository() private articleRepository: ArticleRepository) {}

 getArticles() {
    return this.articleRepository.getArticles();
  }
}
