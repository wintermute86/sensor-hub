import { config as configure, DotenvConfigOutput } from 'dotenv';
import { ConnectionOptions } from 'mysql2/promise';

let env: DotenvConfigOutput;
if (!env) {
  env = configure();
  if (env.error) throw env.error;
}

const isTestEnv: boolean = process.env.NODE_ENV === 'test';

export const port: string = process.env.PORT;
export const databaseConfig: any = isTestEnv
  ? {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME_TEST,
      username: process.env.DB_USER_TEST,
      password: process.env.DB_PASSWORD_TEST,
      port: process.env.DB_PORT_TEST,
    }
  : {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    };
