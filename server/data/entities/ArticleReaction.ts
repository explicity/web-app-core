import {
  Column,
  Entity,
  Index,
  ManyToOne,
  Unique,
  JoinColumn
} from 'typeorm';

import { AbstractEntity } from '../abstract/AbstractEntity';

import Article from './Article';
import User from './User';

@Entity('article_reactions')
@Unique(['user_id', 'article_id'])
export default class ArticleReaction extends AbstractEntity {
  @Index({ unique: true })
  @Column('boolean', { default: false, nullable: false })
  isLiked: boolean;

  @Column()
  article_id: string;

  @Column()
  user_id: string;

  @ManyToOne(
    () => Article,
    article => article.articleReaction,
    { cascade: true }
  )
  @JoinColumn({
    name: 'article_id'
  })
  article: Article;

  @ManyToOne(
    () => User,
    user => user.articleReaction,
    { cascade: true }
  )
  @JoinColumn({
    name: 'user_id'
  })
  user: User;
}
