import {
  Column,
  Entity,
  Index,
  ManyToMany
} from 'typeorm';

import { AbstractEntity } from '../abstract/AbstractEntity';

import Role from './Role';

@Entity('permissions')
export default class Permission extends AbstractEntity {
  @Index({ unique: true })
  @Column('text', { nullable: false, unique: true })
  name: string;

  @ManyToMany(
    () => Role,
    role => role.permissions
  )
  roles: Promise<Permission[]>;
}
