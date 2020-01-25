const { Command } = require('discord.js-commando');
const { SettingsController } = require('../../controllers');

const getChannelFromGuild = (guild, channelId) => {
  if (!channelId) {
    return {
      name: 'Channel not set.',
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
      guildOnly: true,
    });
  }

  async run(msg) {
    try {
      const { guild } = msg.channel;
      const [payload] = await SettingsController.getSettings(guild);
      const { lobby, team1, team2, team3, team4 } = payload.settings;
      const lobbyChannel = getChannelFromGuild(guild, lobby);
      const team1Channel = getChannelFromGuild(guild, team1);
      const team2Channel = getChannelFromGuild(guild, team2);
      const team3Channel = getChannelFromGuild(guild, team3);
      const team4Channel = getChannelFromGuild(guild, team4);

      msg.channel.send(`
        > **Inhaus Channels**
        > Channels that are managed by the Inhaus bot.
        > Use \`!inhaus setup\` to make changes.
        > 
        > **Pre/Post-Game Lobby**: ${lobbyChannel.name}
        > **Team 1**: ${team1Channel.name}
        > **Team 2**: ${team2Channel.name}
        > **Team 3**: ${team3Channel.name}
        > **Team 4**: ${team4Channel.name}
      `);
    } catch (error) {
      msg.reply('Something went wrong. Please try again');
    }
  }
};
