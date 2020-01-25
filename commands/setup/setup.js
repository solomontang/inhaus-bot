const { Command } = require('discord.js-commando');
const { SettingsController } = require('../../controllers');

module.exports = class InhausCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'setup',
      group: 'setup',
      memberName: 'setup',
      description: 'Setup a lobby and team channels.',
      args: [
        {
          key: 'lobby',
          prompt: 'Lobby channel:',
          type: 'channel',
        },
        {
          key: 'team1',
          prompt: 'Team 1:',
          type: 'channel',
        },
        {
          key: 'team2',
          prompt: 'Team 2:',
          type: 'channel',
        },
        {
          key: 'team3',
          prompt: 'Team 3:',
          type: 'channel',
        },
        {
          key: 'team4',
          prompt: 'Team 4:',
          type: 'channel',
        },
      ],
      argsCount: 5,
      guarded: true,
      guildOnly: true,
      userPermissions: ['MANAGE_CHANNELS'],
    });
  }

  run(msg, args) {
    try {
      const { guild } = msg;
      const settings = JSON.stringify(
        Object.keys(args).reduce((acc, key) => {
          const { id } = args[key];
          acc[key] = id;
          return acc;
        }, {})
      );

      SettingsController.upsertSettings(guild, settings);
    } catch (error) {
      console.error(error);
      msg.reply('Settings could not be saved. Please try again');
    }
  }
};
