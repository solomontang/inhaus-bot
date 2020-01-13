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
    connectionString: process.env.DATABASE_URL,
    ssl: true,
    pool: {
      min: 1,
      max: 20
    }
  }
};
