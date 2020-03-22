import { EntityRepository } from 'typeorm';

import BaseRepository from './base.repository';
import Article from '../entities/Article';

@EntityRepository(Article)
export default class ArticleRepository extends BaseRepository<Article> {
  getArticles(): Promise<Article[]> {
    return this.find({
      relations: ['tags']
    });
  }

  getAuthorByUserId(id: string): Promise<Article> {
    return this.createQueryBuilder('articles')
      .leftJoin('okrs.user', 'user')
      .where('okrs."userId" = :id', { id })
      .andWhere('okrs.deletedAt is NULL')
      .getOne();
  }
}
