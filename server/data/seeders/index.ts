import { createConnection } from 'typeorm';

createConnection()
  .then(async () => {})
  .catch(e => {
    console.error(e);
  });
