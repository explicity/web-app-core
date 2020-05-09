import { EntityRepository } from 'typeorm';

import Annotation from '../entities/Annotation';
import BaseRepository from './base.repository';

@EntityRepository(Annotation)
export default class AnnotationRepository extends BaseRepository<Annotation> {
  public async getByTitle(title: string): Promise<Annotation> {
    return await this.findOne({
      where: {
        title
      }
    });
  }
}
