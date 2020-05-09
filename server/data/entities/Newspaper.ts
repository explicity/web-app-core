import {
  Column,
  Entity,
  Index,
  ManyToMany,
  JoinTable
} from 'typeorm';

import { AbstractEntity } from '../abstract/AbstractEntity';

import Article from './Article';
import User from './User';

@Entity('newspapers')
export default class Newspaper extends AbstractEntity {
  @Index({ unique: true })
  @Column('text')
  title: string;

  @ManyToMany(
    () => Article,
    article => article.newspapers,
    { nullable: true }
  )
  @JoinTable({
    name: 'newspaper_articles'
  })
  articles: Article[];

  @ManyToMany(
    () => User,
    user => user.newspapers,
    { nullable: true }
  )
  @JoinTable({
    name: 'newspaper_followers'
  })
  users: User[];
}
