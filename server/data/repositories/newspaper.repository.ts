import { EntityRepository } from 'typeorm';

import Newspaper from '../entities/Newspaper';
import BaseRepository from './base.repository';

@EntityRepository(Newspaper)
export default class NewspaperRepository extends BaseRepository<Newspaper> {
  public async getAllNewspapers(): Promise<Newspaper[]> {
    return await this.find();
  }

  public async findByTitle(title: string): Promise<Newspaper> {
    return await this.findOne({
      where: { title }
    });
  }

  public async findById(newspaperId: string): Promise<Newspaper> {
    return await this.createQueryBuilder('newspapers')
      .leftJoinAndSelect('newspapers.users', 'users')
      .where('newspapers.id = :newspaperId', { newspaperId })
      .getOne();
  }

  // TODO fix likes and comment counters
  public async getNewspaperArticles(newspaperId: string): Promise<Newspaper> {
    return await this.createQueryBuilder('newspapers')
      .select([
        'newspapers.id',
        'newspapers.title',
        'articles.id',
        'articles.title',
        'articles.subtitle',
        'articles.genre',
        'articles.imageLink',
        'articles.publicationDate',
        'articles.likeCount',
        'articles.commentCount',
        'annotation.id',
        'annotation.title',
        'annotation.body',
        'authors.id',
        'authors.firstName',
        'authors.lastName',
        'authors.avatarImageLink',
        'tags.id',
        'tags.keyword'
      ])
      .leftJoin('newspapers.articles', 'articles')
      .leftJoin('articles.annotation', 'annotation')
      .leftJoin('articles.authors', 'authors')
      .leftJoin('articles.tags', 'tags')
      .where('newspapers.id = :newspaperId', { newspaperId })
      .getOne();
  }
}
