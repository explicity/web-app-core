import cryptoHelper from '../../common/utils/crypto.helper';

import User from '../entities/User';

const hash = (password: string) => cryptoHelper.encryptSync(password);

export const users = [
  {
    id: '451a3906-cb0c-4edf-af17-4880f2eebe08',
    firstName: 'Admin',
    lastName: 'Admin',
    login: 'Admin',
    email: 'admin@gmail.com',
    password: hash('admin')
  },
  {
    id: 'ba651e90-05c8-4198-896b-ca4fcde187e1',
    firstName: 'User',
    lastName: 'User',
    login: 'User',
    email: 'user@gmail.com',
    password: hash('user')
  },
  {
    id: 'f2ad2e70-3b73-4d8c-a6e8-d36a1f1f38ec',
    firstName: 'Guest',
    lastName: 'Guest',
    login: 'Guest',
    email: 'guest@gmail.com',
    password: hash('guest')
  }
] as User[];
