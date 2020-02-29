import { Column, Entity, Index, OneToOne } from 'typeorm';

import { AbstractEntity } from '../abstract/AbstractEntity';
import Article from './Article';

@Entity('annotations')
export default class Annotation extends AbstractEntity {
  @Index({ unique: true })
  @Column('text')
  title: string;

  @Column('text', { nullable: true })
  body: string;

  @OneToOne(
    () => Article,
    article => article.annotation
  )
  article: Article;
}
