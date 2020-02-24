import { Column, Entity, ManyToOne, Index, OneToMany, OneToOne } from 'typeorm';

import { AbstractEntity } from '../abstract/AbstractEntity';
import { Genre } from '../../common/enums';
import Newspaper from './Newspaper';
import User from './User';
import Annotation from './Annotation';

@Entity('articles')
export default class Article extends AbstractEntity {
  @Index({ unique: true })
  @Column('text')
  title: string;

  @Column('text', { nullable: true })
  subtitle: string;

  @Column('text')
  body: string;

  @Column('date')
  publication_date: Date;

  @Column({
    type: 'enum',
    enum: Genre
  })
  genre: Genre;

  @ManyToOne(
    () => User,
    user => user.article
  )
  author: User;

  @OneToOne(
    () => Annotation,
    annotation => annotation.article
  )
  annotation: Annotation;

  @OneToMany(
    () => Newspaper,
    newspaper => newspaper.articles
  )
  newspaper: Newspaper;
}
