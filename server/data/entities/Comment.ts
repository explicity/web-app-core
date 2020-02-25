import {
  Column,
  Index,
  Entity,
  JoinColumn,
  ManyToOne
} from 'typeorm';

import { AbstractEntity } from '../abstract/AbstractEntity';

import Article from './Article';
import User from './User';

@Entity('comments')
export default class Comment extends AbstractEntity {
  @Index({ unique: true })
  @Column()
  article_id: string;

  @Column()
  user_id: string;

  @Column('text', { nullable: false })
  body: string;

  @ManyToOne(
    () => Article,
    article => article,
    { cascade: true }
  )
  @JoinColumn({
    name: 'article_id'
  })
  article: Article;

  @ManyToOne(
    () => User,
    user => user,
    { cascade: true }
  )
  @JoinColumn({
    name: 'user_id'
  })
  user: User;
}
