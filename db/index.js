const { development, production } = require('../knexfile');

const knexConfig = process.env.NODE_ENV === 'production' ? production : development;
const db = require('knex')(knexConfig);

module.exports = db;
