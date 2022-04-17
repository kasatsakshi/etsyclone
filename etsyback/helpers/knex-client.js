import knex from 'knex';
import dbConfig from '../knexfile';

let cachedConnection;

export const getKnexClient = () => {
  if (cachedConnection) {
    return cachedConnection;
  }
  const configByEnvironment = dbConfig[process.env.NODE_ENV || 'development'];

  if (!configByEnvironment) {
    throw new Error(
      `Failed to get knex configuration for env:${process.env.NODE_ENV}`,
    );
  }
  const connection = knex(configByEnvironment);
  cachedConnection = connection;
  return connection;
};
