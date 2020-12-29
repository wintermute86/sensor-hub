import { databaseConfig } from '../api/AppConfig';
import { Connection, createConnection, getConnection } from 'typeorm';

export const establishDbConnection = async (
  entities: any[]
): Promise<Connection> => {
  return createConnection({
    type: 'mysql',
    ...databaseConfig,
    entities: [...entities],
  });
};

export const closeConnection = async (): Promise<void> => {
  const connection = getConnection();
  await connection.close();
};

export const clearTable = async (entity: any): Promise<void> => {
  await getConnection().createQueryBuilder().delete().from(entity).execute();
};
