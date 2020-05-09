import { Column, Entity, Index, ManyToMany, JoinTable } from 'typeorm';

import { AbstractEntity } from '../abstract/AbstractEntity';
import { RoleEnum } from '../../common/enums';

import Permission from './Permission';
import User from './User';

@Entity('roles')
export default class Role extends AbstractEntity {
  @Index({ unique: true })
  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.guest,
  })
  role: RoleEnum;

  @Column('text', { nullable: true })
  description: string;

  @ManyToMany(() => Permission, (permission) => permission.roles, {
    nullable: true,
  })
  @JoinTable({
    name: 'permissions_to_roles',
  })
  permissions: Promise<Permission[]>;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
