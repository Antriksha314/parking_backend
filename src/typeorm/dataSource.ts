import 'reflect-metadata';
import { DataSource } from 'typeorm';
require('dotenv').config();

export const CXN = new DataSource({
  type: 'postgres',
  host: process.env.PGHOST,
  port: 5829,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  synchronize: true,
  logging: false,
  entities: [`${__dirname}/entity/*.{js,ts}`],
  subscribers: [],
  migrations: [`${__dirname}/migration/*.{js,ts}`],
});
