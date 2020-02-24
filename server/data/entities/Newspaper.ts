import { Column, Entity, OneToMany, Index } from 'typeorm';

import { AbstractEntity } from '../abstract/AbstractEntity';
import Article from './Article';

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
}
