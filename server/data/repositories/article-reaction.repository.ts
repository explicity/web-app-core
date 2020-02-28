import { EntityRepository } from 'typeorm';

import ArticleReaction from '../entities/ArticleReaction';
import BaseRepository from './base.repository';

@EntityRepository(ArticleReaction)
export default class ArticleReactionRepository extends BaseRepository<
  ArticleReaction
> {
  getByUserIdAndArticleId(userId: string, articleId: string) {
    return this.createQueryBuilder('articleReactions')
      .select([
        'articleReaction.id as id',
        'articleReaction.isLiked as "isLiked"'
      ])
      .leftJoin('articleReaction.article', 'article')
      .leftJoin('articleReaction.user', 'user')
      .where('user.id = :userId AND article.id = :articleId', {
        userId,
        articleId
      })
      .getRawOne();
  }
}
