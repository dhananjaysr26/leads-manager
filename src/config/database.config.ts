import { DataSource, DataSourceOptions } from 'typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';

const env = process.env.NODE_ENV || 'dev';

const dotenv_path = path.resolve(process.cwd(), `.${env}.env`);
const result = dotenv.config({ path: dotenv_path });

if (result.error) {
  console.error('Error:while accessing the env', result.error);
}

export const DatabaseConfig: DataSourceOptions = {
  type: 'postgres' as any,
  database: process.env.POSTGRES_DATABASE,
  port: parseInt(process.env.POSTGRES_PORT) || 5342,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  synchronize: false,
  entities: ['dist/entity-store/entities/**/*{.ts,.js}'],
  migrations: ['dist/entity-store/migrations/**/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  //logging: true,
  // cache: true,
};

const dataSource = new DataSource(DatabaseConfig);

export default dataSource;
