import { createConnection, getConnectionOptions } from 'typeorm';
import * as http from 'http';

import { env } from './env';
import app from './api/app';

const server: http.Server = http.createServer(app);

server.listen(env.app.port || 3000, async () => {
  try {
    const connection = await createConnection(await getConnectionOptions());
    await connection.synchronize();

    console.log(`Server is running at ${env.app.port}.`);
  } catch (error) {
    console.log('Server started with error:', error);
  }
});

export default server;
