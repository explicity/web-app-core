import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import NewspaperRepository from '../data/repositories/newspaper.repository';
import Newspaper from '../data/entities/Newspaper';

@Service()
export default class NewspaperService {
  constructor(
    @OrmRepository() private newspaperRepository: NewspaperRepository
  ) {}

  public async findByName(name: string): Promise<Newspaper> {
    return await this.newspaperRepository.findByName(name);
  }
}
