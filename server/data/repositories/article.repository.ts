import { EntityRepository } from 'typeorm';
import * as util from 'util';

import BaseRepository from './base.repository';
import Article from '../entities/Article';
import { GenreEnum } from '../../common/enums';
import { IArticleNew } from '../../common/models/article';

@EntityRepository(Article)
export default class ArticleRepository extends BaseRepository<Article> {
  async getArticles(): Promise<Article[]> {
    return await this.find({
      relations: ['tags']
    });
  }

  async getAuthorByUserId(id: string): Promise<Article> {
    return await this.createQueryBuilder('articles')
      .leftJoin('article.user', 'user')
      .where('article."userId" = :id', { id })
      .andWhere('article.deletedAt is NULL')
      .getOne();
  }

  async createAndSave(article: IArticleNew): Promise<string> {
    const entity = Object.assign(new Article(), article);
    entity.publicationDate = new Date();
    await this.save(entity);

    return entity.id;
  }

  async getArticleById(id: string): Promise<Article> {
    const article = await this.findOne({
      where: { id }
    });

    if (!ArticleRepository.isArticle(article)) {
      throw new Error(
        `Article id ${util.inspect(id)} did not retrieve an Article`
      );
    }

    return article;
  }

  async deleteArticle(article: string | Article) {
    if (typeof article !== 'string' && !ArticleRepository.isArticle(article)) {
      throw new Error('Supplied article object not an Article');
    }
    await this.manager.delete(
      Article,
      typeof article === 'string' ? article : article.id
    );
  }

  static isArticle(article: any): article is Article {
    return (
      typeof article === 'object' &&
      typeof article.title === 'string' &&
      typeof article.body === 'string' &&
      ArticleRepository.isGenre(article.genre)
    );
  }

  static isGenre(genre: any): genre is GenreEnum {
    return (
      typeof genre === 'string' &&
      (genre === 'Beauty' || genre === 'School' || genre === 'Science')
    );
  }
}
