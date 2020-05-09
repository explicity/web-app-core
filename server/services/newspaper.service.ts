import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import NewspaperRepository from '../data/repositories/newspaper.repository';
import Newspaper from '../data/entities/Newspaper';

@Service()
export default class NewspaperService {
  constructor(
    @OrmRepository() private newspaperRepository: NewspaperRepository
  ) {}

  public async getAll(): Promise<Newspaper[]> {
    return await this.newspaperRepository.getAllNewspapers();
  }

  public async findByTitle(title: string): Promise<Newspaper> {
    return await this.newspaperRepository.findByTitle(title);
  }

  public async findById(id: string): Promise<Newspaper> {
    return await this.newspaperRepository.findById(id);
  }

  public async getNewspaperArticles(id: string): Promise<Newspaper> {
    return await this.newspaperRepository.getNewspaperArticles(id);
  }
}
