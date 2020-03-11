import { UpdateResult } from 'typeorm';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import ArticleRepository from '../data/repositories/article.repository';
import Article from '../data/entities/Article';
import { IArticleNew } from '../common/models/article';

@Service()
export default class ArticleService {
  constructor(@OrmRepository() private articleRepository: ArticleRepository) {}

  async getArticles(): Promise<Article[]> {
    return await this.articleRepository.getArticles();
  }

  async getArticleById(id: string): Promise<Article> {
    return await this.articleRepository.getArticleById(id);
  }

  async saveArticle(data: IArticleNew): Promise<string> {
    return await this.articleRepository.createAndSave(data);
  }

  async updateArticle(data: Article): Promise<UpdateResult> {
    return await this.articleRepository.updateById(data.id, data);
  }

  async deleteArticle(data: string | Article) {
    return await this.articleRepository.deleteArticle(data);
  }
}
