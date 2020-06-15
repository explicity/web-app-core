import { EntityRepository } from 'typeorm';

import ArticleReaction from '../entities/ArticleReaction';
import BaseRepository from './base.repository';

@EntityRepository(ArticleReaction)
export default class ArticleReactionRepository extends BaseRepository<
  ArticleReaction
> {
  public async getByUserIdAndArticleId({
    userId,
    articleId
  }: {
    userId: string;
    articleId: string;
  }): Promise<ArticleReaction> {
    // const articleReaction = await this.createQueryBuilder('articleReactions')
    //   .select([
    //     'articleReactions.id as id',
    //     'articleReactions.isLiked as "isLiked"'
    //   ])
    //   .leftJoinAndSelect('articleReactions.articles', 'article')
    //   .leftJoinAndSelect('articleReactions.users', 'user')
    //   .where('user.id = :userId AND article.id = :articleId', {
    //     userId,
    //     articleId
    //   })
    //   .getRawOne();

    const articleReaction = await this.findOne({
      where: { userId, articleId }
    });

    console.log('articleReaction', articleReaction);

    return articleReaction;
  }
}
