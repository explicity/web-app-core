import { RoleEnum } from '../../enums';
import { IPermission } from '../permission';

export interface IRole {
  id?: string;
  role: RoleEnum;
  description?: string;
  permissions: IPermission[];
}
