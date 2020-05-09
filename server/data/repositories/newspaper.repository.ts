import { EntityRepository } from 'typeorm';

import Newspaper from '../entities/Newspaper';
import BaseRepository from './base.repository';

@EntityRepository(Newspaper)
export default class NewspaperRepository extends BaseRepository<Newspaper> {
  public async findByName(name: string): Promise<Newspaper> {
    return await this.findOne({
      where: { name },
    });
  }
}
