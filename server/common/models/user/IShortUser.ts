import Newspaper from '../../../data/entities/Newspaper';
import Role from '../../../data/entities/Role';

export interface IShortUser {
  id?: string;
  email: string;
  username: string;
  newspapers?: Newspaper[];
  roles: Role[];
}
