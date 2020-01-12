module.exports = {
  development: {
    client: 'pg',
    connection: { database: 'inhaus' },
    pool: {
      min: 1,
      max: 20
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  },
  pool: {
    min: 1,
    max: 20
  }
};
