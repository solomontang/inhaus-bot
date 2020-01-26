const util = require('util');
const knex = require('../db');

const upsertSettings = async (guild, settings) => {
  const insert = knex('settings')
    .insert({ guild: guild.id, settings })
    .toString();

  const update = knex('settings')
    .update({ settings })
    .whereRaw('settings.guild = ?', [guild.id]);

  const query = util.format(
    '%s ON CONFLICT (guild) DO UPDATE SET %s',
    insert.toString(),
    update.toString().replace(/^update\s.*\sset\s/i, '')
  );

  return knex.raw(query);
};

const getSettings = async (guild) => {
  const [payload = { settings: {} }] = await knex
    .select('settings')
    .from('settings')
    .where({ guild: guild.id });

  return Object.fromEntries(
    Object.entries(payload.settings).map(([channelKey, channelId]) => [channelKey, guild.channels.get(channelId)])
  );
};

module.exports = {
  getSettings,
  upsertSettings,
};
