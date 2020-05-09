import { EntityRepository } from 'typeorm';

import Annotation from '../entities/Annotation';
import BaseRepository from './base.repository';

@EntityRepository(Annotation)
export default class AnnotationRepository extends BaseRepository<Annotation> {
  getByTitle(title: string): Promise<Annotation> {
    return this.findOne({
      where: {
        title
      }
    });
  }
}
