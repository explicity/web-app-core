import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany
} from 'typeorm';

import Role from './Role';

@Entity('permissions')
export default class Permission extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: false, unique: true })
  name: string;

  @ManyToMany(
    () => Role,
    role => role.permissions
  )
  roles: Promise<Permission[]>;
}
