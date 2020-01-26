import knex from 'knex';
import { development, production } from '../knexfile';

const knexConfig = process.env.NODE_ENV === 'production' ? production : development;
const db = knex(knexConfig);

export default db;
