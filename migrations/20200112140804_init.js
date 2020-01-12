exports.up = function(knex) {
  return knex.schema.hasTable('settings').then(exists => {
    if (!exists) {
      return schema.createTable(t => {
        t.increments('id')
          .unsigned()
          .primary();
        t.bigint('guild').unique();
        t.jsonb('settings');
        t.timestamps(true, true);
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('settings');
};
