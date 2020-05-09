import { EntityRepository } from 'typeorm';
import * as util from 'util';

import BaseRepository from './base.repository';
import Article from '../entities/Article';
import { GenreEnum } from '../../common/enums';
import { IArticleNew } from '../../common/models/article';

@EntityRepository(Article)
export default class ArticleRepository extends BaseRepository<Article> {
  public async getAllArticles(): Promise<Article[]> {
    return await this.find({
      relations: ['tags']
    });
  }

  public async findByNewspaperId(newspaperId: string): Promise<Article[]> {
    return await this.createQueryBuilder('articles')
      .leftJoin('articles.newspapers', 'newspaper')
      .where('articles."newspaperId" = :newspaperId', { newspaperId })
      .getMany();
  }

  public async findByNewspaperIdAndArticleId({
    newspaperId,
    articleId
  }: {
    newspaperId: string;
    articleId: string;
  }): Promise<Article> {
    return await this.createQueryBuilder('articles')
      .leftJoin('articles.newspapers', 'newspaper')
      .leftJoinAndSelect('articles.annotation', 'annotation')
      .leftJoinAndSelect('articles.authors', 'authors')
      .leftJoinAndSelect('articles.articleReaction', 'articleReaction')
      .leftJoinAndSelect('articles.comments', 'comments')
      .leftJoinAndSelect('articles.tags', 'tags')
      .where('articles.id = :articleId AND newspaper.id = :newspaperId', {
        articleId,
        newspaperId
      })
      .getOne();
  }

  public async createAndSave(article: IArticleNew): Promise<string> {
    const entity = Object.assign(new Article(), article);
    entity.publicationDate = new Date();
    await this.save(entity);

    return entity.id;
  }

  public async findById(id: string): Promise<Article> {
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

  public async deleteArticle(article: string | Article) {
    if (typeof article !== 'string' && !ArticleRepository.isArticle(article)) {
      throw new Error('Supplied article object not an Article');
    }
    await this.manager.delete(
      Article,
      typeof article === 'string' ? article : article.id
    );
  }

  private static isArticle(article: any): article is Article {
    return (
      typeof article === 'object' &&
      typeof article.title === 'string' &&
      typeof article.content === 'string' &&
      ArticleRepository.isGenre(article.genre)
    );
  }

  private static isGenre(genre: any): genre is GenreEnum {
    return (
      typeof genre === 'string' &&
      (genre === 'Beauty' || genre === 'School' || genre === 'Science')
    );
  }
}
