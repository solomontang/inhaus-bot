/* eslint-disable no-console */
const { CommandoClient, FriendlyError, SQLiteProvider } = require('discord.js-commando');
const sqlite = require('sqlite');
const path = require('path');
const oneLine = require('common-tags').oneLine;

const client = new CommandoClient({
  owner: '131209725646733312',
  commandPrefix: '!inhaus',
  unknownCommandResponse: false
});

client
  .on('error', console.error)
  .on('warn', console.warn)
  .on('debug', console.log)
  .on('ready', () => {
    console.log(
      `Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`
    );
  })
  .on('disconnect', () => {
    console.warn('Disconnected!');
  })
  .on('reconnecting', () => {
    console.warn('Reconnecting...');
  })
  .on('commandError', (cmd, err) => {
    if (err instanceof FriendlyError) return;
    console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
  })
  .on('commandBlocked', (msg, reason) => {
    console.log(oneLine`
      Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
      blocked; ${reason}
    `);
  })
  .on('commandPrefixChange', (guild, prefix) => {
    console.log(oneLine`
      Prefix ${prefix === '' ? 'removed' : `changed to ${prefix || 'the default'}`}
      ${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
    `);
  })
  .on('commandStatusChange', (guild, command, enabled) => {
    console.log(oneLine`
      Command ${command.groupID}:${command.memberName}
      ${enabled ? 'enabled' : 'disabled'}
      ${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
    `);
  })
  .on('groupStatusChange', (guild, group, enabled) => {
    console.log(oneLine`
      Group ${group.id}
      ${enabled ? 'enabled' : 'disabled'}
      ${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
    `);
  });
client.registry
  .registerDefaults()
  .registerGroups([
    ['setup', 'Setup'],
    ['channels', 'Channels']
  ])
  .registerCommandsIn(path.join(__dirname, 'commands'));

sqlite.open(path.join(__dirname, 'settings.sqlite3')).then(db => {
  client.setProvider(new SQLiteProvider(db));
});

client.login(process.env.BOT_TOKEN);
