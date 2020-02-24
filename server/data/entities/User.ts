import { Column, Entity, OneToMany, Index } from 'typeorm';

import { AbstractEntity } from '../abstract/AbstractEntity';
import Article from './Article';

@Entity('users')
export default class User extends AbstractEntity {
  @Index({ unique: true })
  @Column('text')
  first_name: string;

  @Column('text')
  last_name: string;

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
}
