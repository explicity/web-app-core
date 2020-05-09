import {
  Column,
  Entity,
  OneToMany,
  Index,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { AbstractEntity } from '../abstract/AbstractEntity';

import Article from './Article';
import ArticleReaction from './ArticleReaction';
import Newspaper from './Newspaper';
import Role from './Role';

@Entity('users')
export default class User extends AbstractEntity {
  @Index({ unique: true })
  @Column('text', { nullable: true })
  firstName: string;

  @Column('text', { nullable: true })
  lastName: string;

  @Column('text', { unique: true, nullable: false })
  username: string;

  @Column('text', { unique: true, nullable: false })
  email: string;

  @Column('boolean', { default: false })
  emailConfirmed: boolean;

  @Column('text', { select: false })
  password: string;

  @Column('text', { nullable: true, default: null })
  avatarImageLink: string;

  @ManyToMany(() => Article, (article) => article.authors, { nullable: true })
  articles: Article[];

  @ManyToMany(() => Newspaper, (newspaper) => newspaper.users, {
    nullable: true,
  })
  newspapers: Newspaper[];

  @OneToMany(() => ArticleReaction, (articleReaction) => articleReaction.user, {
    nullable: true,
    cascade: true,
  })
  articleReaction: ArticleReaction[];

  @ManyToMany(() => Role, (role) => role.users, { nullable: false })
  @JoinTable({
    name: 'roles_to_users',
  })
  roles: Role[];
}
