import { EntityRepository } from 'typeorm';

import Comment from '../entities/Comment';
import BaseRepository from './base.repository';

@EntityRepository(Comment)
export default class CommentRepository extends BaseRepository<Comment> {
  getByUserIdAndArticleId(userId: string, articleId: string) {
    return this.createQueryBuilder('comments')
      .select(['comment.id as id', 'comment.body as "comment"'])
      .leftJoin('comment.article', 'article')
      .leftJoin('comment.user', 'user')
      .where('user.id = :userId AND article.id = :articleId', {
        userId,
        articleId
      })
      .getRawOne();
  }
}
