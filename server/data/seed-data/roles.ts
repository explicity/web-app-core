import Role from '../entities/Role';

import { RoleEnum } from '../../common/enums';

export const roles = [
  {
    id: '7c8073af-99b3-4e5d-8c95-283a80463c07',
    role: RoleEnum.admin
  },
  {
    id: '51254fa0-e087-4388-a481-ad87f7b63d69',
    role: RoleEnum.guest
  },
  {
    id: 'e036855b-0c8a-4e31-a4a1-11dd9fd7abde',
    role: RoleEnum.user
  }
] as Role[];
