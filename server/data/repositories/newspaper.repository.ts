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

  public async getNewspaperArticles(id: string): Promise<Newspaper> {
    return await this.createQueryBuilder('newspapers')
      .where('newspapers.id = :id', { id })
      .leftJoinAndSelect('newspapers.articles', 'article')
      .getOne();
  }
}
