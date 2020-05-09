import { UpdateResult } from 'typeorm';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import ArticleRepository from '../data/repositories/article.repository';
import Article from '../data/entities/Article';
import { IArticleNew } from '../common/models/article';

@Service()
export default class ArticleService {
  constructor(@OrmRepository() private articleRepository: ArticleRepository) {}

  public async getAll(): Promise<Article[]> {
    return await this.articleRepository.getAllArticles();
  }

  public async findById(id: string): Promise<Article> {
    return await this.articleRepository.findById(id);
  }

  public async saveArticle(data: IArticleNew): Promise<string> {
    return await this.articleRepository.createAndSave(data);
  }

  public async updateArticle(data: Article): Promise<UpdateResult> {
    return await this.articleRepository.updateById(data.id, data);
  }

  public async deleteArticle(data: string | Article) {
    return await this.articleRepository.deleteArticle(data);
  }
}
