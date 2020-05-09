import { createConnection } from 'typeorm';

import { PermissionsSeeder } from './permissions.seeder';
import { RolesSeeder } from './roles.seeder';
import { UsersSeeder } from './users.seeder';
import { AnnotationsSeeder } from './annotations.seeder';
import { NewspapersSeeder } from './newspapers.seeder';
import { ArticlesSeeder } from './articles.seeder';

// TODO resolve seeding data issue
createConnection()
  .then(async () => {
    await PermissionsSeeder.execute();
    await RolesSeeder.execute();
    await UsersSeeder.execute();
    await AnnotationsSeeder.execute();
    await NewspapersSeeder.execute();
    await ArticlesSeeder.execute();
  })
  .catch(e => {
    console.error(e);
  });
