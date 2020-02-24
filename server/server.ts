import { createConnection, getConnectionOptions } from 'typeorm';
import * as http from 'http';
import dotenv from 'dotenv';

import app from './api/app';

dotenv.config();

const server: http.Server = http.createServer(app);

server.listen(process.env.APP_PORT || 3000, async () => {
  try {
    const connection = await createConnection(await getConnectionOptions());
    await connection.synchronize();

    console.log(`Server is running at ${process.env.APP_PORT}.`);
  } catch (error) {
    console.log('Server started with error:', error);
  }
});

export default server;
