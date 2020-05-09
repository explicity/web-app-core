import cryptoHelper from '../../common/utils/crypto.helper';

import User from '../entities/User';

const hash = (password: string) => cryptoHelper.encryptSync(password);

export const users = [
  {
    id: '451a3906-cb0c-4edf-af17-4880f2eebe08',
    firstName: 'Admin',
    lastName: 'Admin',
    username: 'Admin',
    email: 'admin@gmail.com',
    password: hash('admin')
  },
  {
    id: 'ba651e90-05c8-4198-896b-ca4fcde187e1',
    firstName: 'User',
    lastName: 'User',
    username: 'User',
    email: 'user@gmail.com',
    password: hash('user')
  },
  {
    id: 'f2ad2e70-3b73-4d8c-a6e8-d36a1f1f38ec',
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    email: 'johndoe@gmail.com',
    password: hash('johndoe')
  },
  {
    id: '1dd7c883-aee5-4659-8d1d-3c72b4793786',
    firstName: 'Guest',
    lastName: 'Guest',
    username: 'Guest',
    email: 'guest@gmail.com',
    password: hash('guest')
  }
] as User[];
