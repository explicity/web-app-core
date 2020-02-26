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
import User from './User';

@Entity('roles')
export default class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.guest
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

  @ManyToMany(
    () => User,
    user => user.roles
  )
  users: Promise<User[]>;
}
