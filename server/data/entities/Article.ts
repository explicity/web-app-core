import {
  Column,
  Entity,
  ManyToOne,
  Index,
  OneToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
  OneToMany
} from 'typeorm';

import { AbstractEntity } from '../abstract/AbstractEntity';
import { GenreEnum } from '../../common/enums';

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
  content: string;

  @Column('date')
  publicationDate: Date;

  @Column({
    type: 'enum',
    enum: GenreEnum
  })
  genre: GenreEnum;

  @Column('text', { nullable: true, default: null })
  imageLink: string;

  @Column('int', { default: 0 })
  likeCount: number;

  @Column('int', { default: 0 })
  commentCount: number;

  @ManyToMany(
    () => User,
    user => user.articles,
    { nullable: false }
  )
  @JoinTable({
    name: 'article_authors'
  })
  authors: User[];

  @OneToOne(
    () => Annotation,
    annotation => annotation.article,
    { cascade: true }
  )
  @JoinColumn()
  annotation: Annotation;

  @ManyToOne(
    () => Newspaper,
    newspaper => newspaper.articles,
    { nullable: false }
  )
  newspaper: Newspaper;

  @ManyToMany(
    () => Tag,
    tag => tag.articles,
    { nullable: true }
  )
  @JoinTable({
    name: 'tags_to_articles'
  })
  tags: Promise<Tag[]>;

  @OneToMany(
    () => ArticleReaction,
    articleReaction => articleReaction.article,
    { nullable: true }
  )
  articleReaction: ArticleReaction[];
}
