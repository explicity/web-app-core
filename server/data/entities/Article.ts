import {
  Column,
  Entity,
  ManyToOne,
  Index,
  OneToOne,
  ManyToMany,
  JoinTable,
  OneToMany
} from 'typeorm';

import { AbstractEntity } from '../abstract/AbstractEntity';
import { Genre } from '../../common/enums';

import Newspaper from './Newspaper';
import User from './User';
import Annotation from './Annotation';
import Tag from './Tag';
import ArticleReaction from './ArticleReaction';

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

  @Column('text', { nullable: true })
  imageLink: string;

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

  @ManyToOne(
    () => Newspaper,
    newspaper => newspaper.articles
  )
  newspaper: Newspaper;

  @ManyToMany(
    () => Tag,
    tag => tag.articles
  )
  @JoinTable({
    name: 'tags_to_article'
  })
  tags: Promise<Tag[]>;

  @OneToMany(
    () => ArticleReaction,
    articleReaction => articleReaction.article
  )
  articleReaction: ArticleReaction[];
}
