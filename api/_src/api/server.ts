import * as config from './AppConfig';
import 'reflect-metadata';

import { createConnection } from 'typeorm';
import { databaseConfig } from './AppConfig';
import { Temperature } from './model/Temperature';
import { Humidity } from './model/Humidity';
import { app } from './app';

createConnection({
  type: 'mysql',
  ...databaseConfig,
  entities: [Temperature, Humidity],
  logging: true,
})
  .then(() => console.log('Database connection successful'))
  .catch((error: Error) => {
    console.log(`Could not connect to database: ${error.message}`);
  });

app.listen(config.port, () =>
  console.log(`Listening at http://localhost:${config.port}`)
);
