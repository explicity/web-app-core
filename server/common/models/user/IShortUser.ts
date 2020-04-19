import Role from '../../../data/entities/Role';

export interface IShortUser {
  id?: string;
  email: string;
  username: string;
  roles: Role[]
}
