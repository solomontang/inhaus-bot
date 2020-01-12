const { Command } = require('discord.js-commando');

const getChannelFromGuild = (guild, channelId) => {
  if (!channelId) {
    return {
      name: 'Channel not set.'
    };
  }

  return guild.channels.get(channelId);
};

module.exports = class InhausCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'channels',
      group: 'channels',
      memberName: 'channels',
      description: 'List the lobby and team channels.',
      guildOnly: true
    });
  }

  run(msg) {
    const { provider } = this.client;
    const { guild } = msg.channel;

    const lobby = getChannelFromGuild(guild, provider.get(guild, 'lobby'));
    const team1 = getChannelFromGuild(guild, provider.get(guild, 'team1'));
    const team2 = getChannelFromGuild(guild, provider.get(guild, 'team2'));
    const team3 = getChannelFromGuild(guild, provider.get(guild, 'team3'));
    const team4 = getChannelFromGuild(guild, provider.get(guild, 'team4'));

    msg.channel.send(`
      > **Inhaus Channels**
      > Channels that are managed by the Inhaus bot.
      > Use \`!inhaus setup\` to make changes.
      > 
      > **Lobby**: ${lobby.name}
      > **Team 1**: ${team1.name}
      > **Team 2**: ${team2.name}
      > **Team 3**: ${team3.name}
      > **Team 4**: ${team4.name}
    `);
  }
};
