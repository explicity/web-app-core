import { createConnection } from 'typeorm';

import { UsersSeeder } from './users.seeder';
import { RolesSeeder } from './roles.seeder';
import { NewspapersSeeder } from './newspapers.seeder';

createConnection()
  .then(async () => {
    await RolesSeeder.execute();
    await UsersSeeder.execute();
    await NewspapersSeeder.execute();
  })
  .catch(e => {
    console.error(e);
  });
