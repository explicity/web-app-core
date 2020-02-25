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
import User from './User';

@Entity('newspapers')
export default class Newspaper extends AbstractEntity {
  @Index({ unique: true })
  @Column('text')
  name: string;

  @OneToMany(
    () => Article,
    article => article.newspaper
  )
  articles: Article[];

  @ManyToMany(
    () => User,
    user => user.newspapers
  )
  @JoinTable({
    name: 'users_to_newspapers'
  })
  users: Promise<User[]>;
}
