import { EntityRepository } from 'typeorm';

import BaseRepository from './base.repository';
import Article from '../entities/Article';

@EntityRepository(Article)
export default class ArticleRepository extends BaseRepository<Article> {
  getArticles() {
    return this.find({
      relations: ['tags']
    });
  }
}
