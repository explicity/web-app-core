import { Column, Entity, Index, ManyToOne, Unique, JoinColumn } from 'typeorm';

import { AbstractEntity } from '../abstract/AbstractEntity';

import Article from './Article';
import User from './User';

@Entity('article_reactions')
@Unique(['userId', 'articleId'])
export default class ArticleReaction extends AbstractEntity {
  @Index({ unique: true })
  @Column('boolean', { default: false, nullable: false })
  isLiked: boolean;

  @Column()
  articleId: string;

  @Column()
  userId: string;

  @ManyToOne(
    () => Article,
    article => article.articleReaction,
    { cascade: true }
  )
  @JoinColumn({
    name: 'articleId'
  })
  article: Article;

  @ManyToOne(
    () => User,
    user => user.articleReaction,
    { cascade: true }
  )
  @JoinColumn({
    name: 'userId'
  })
  user: User;
}
