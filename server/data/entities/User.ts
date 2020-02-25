import {
  Column,
  Entity,
  OneToMany,
  Index,
  ManyToMany,
  OneToOne,
  JoinColumn
} from 'typeorm';

import { AbstractEntity } from '../abstract/AbstractEntity';

import Article from './Article';
import ArticleReaction from './ArticleReaction';
import Newspaper from './Newspaper';
import Role from './Role';

@Entity('users')
export default class User extends AbstractEntity {
  @Index({ unique: true })
  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column('text')
  login: string;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @OneToMany(
    () => Article,
    article => article.author
  )
  article: Article[];

  @ManyToMany(
    () => Newspaper,
    newspaper => newspaper.users
  )
  newspapers: Promise<Newspaper[]>;

  @OneToMany(
    () => ArticleReaction,
    articleReaction => articleReaction.user
  )
  articleReaction: ArticleReaction[];

  @OneToOne(() => Role)
  @JoinColumn()
  role: Role;
}
