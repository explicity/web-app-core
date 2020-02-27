import Permission from '../entities/Permission';

export const permissions = [
  {
    id: 'b9928e3c-ed53-41af-862b-3e0ba89cc6e0',
    name: 'can_delete_newspaper',
    roles: 'admin'
  },
  {
    id: 'e78bbdc5-c90d-459d-8289-5f522a1f1b0b',
    name: 'can_update_newspaper'
  },
  {
    id: 'baab891a-ea0c-438e-8cf3-2c153ae9eda3',
    name: 'can_delete_article'
  },
  {
    id: '3c8589c1-3afa-4a79-90da-f6307d810b46',
    name: 'can_update_article'
  },
  {
    id: '0f10a12a-e841-4bba-b823-06893dbe16d8',
    name: 'can_add_article'
  }
] as Permission[];
