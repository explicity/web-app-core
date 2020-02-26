import { Column, Entity, Index, ManyToMany, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../abstract/AbstractEntity';

import Article from './Article';

@Entity('tags')
export default class Tag extends AbstractEntity {
  @Index({ unique: true })
  @Column('text', { nullable: false })
  keyword: string;

  @ManyToMany(
    () => Article,
    article => article.tags
  )
  articles: Promise<Article[]>;

  @ManyToOne(
    () => Tag,
    tag => tag
  )
  @Column({ type: 'uuid', nullable: true, name: 'parentId' })
  parent: Tag;
}
