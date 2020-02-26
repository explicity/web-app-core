import {
  Column,
  Entity,
  OneToMany,
  Index,
  ManyToMany,
  JoinTable
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

  @Column('text', { unique: true })
  login: string;

  @Column('text')
  email: string;

  @Column('boolean', { default: false })
  emailConfirmed: boolean;

  @Column('text')
  password: string;

  @OneToMany(
    () => Article,
    article => article.author,
    { nullable: true }
  )
  articles: Article[];

  @ManyToMany(
    () => Newspaper,
    newspaper => newspaper.users,
    { nullable: true }
  )
  newspapers: Promise<Newspaper[]>;

  @OneToMany(
    () => ArticleReaction,
    articleReaction => articleReaction.user,
    { nullable: true, cascade: true }
  )
  articleReaction: ArticleReaction[];

  @ManyToMany(
    () => Role,
    role => role.users,
    { nullable: false }
  )
  @JoinTable({
    name: 'roles_to_users'
  })
  roles: Promise<Role[]>;
}
