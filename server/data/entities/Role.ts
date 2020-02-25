import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
  JoinTable
} from 'typeorm';

import { RoleEnum } from '../../common/enums';

import Permission from './Permission';

@Entity('roles')
export default class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: RoleEnum
  })
  role: RoleEnum;

  @ManyToMany(
    () => Permission,
    permission => permission.roles
  )
  @JoinTable({
    name: 'permissions_to_roles'
  })
  permissions: Promise<Permission[]>;
}
