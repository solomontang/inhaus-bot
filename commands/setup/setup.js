const { Command } = require('discord.js-commando');

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
          type: 'channel'
        },
        {
          key: 'team1',
          prompt: 'Team 1:',
          type: 'channel'
        },
        {
          key: 'team2',
          prompt: 'Team 2:',
          type: 'channel'
        },
        {
          key: 'team3',
          prompt: 'Team 3:',
          type: 'channel'
        },
        {
          key: 'team4',
          prompt: 'Team 4:',
          type: 'channel'
        }
      ],
      argsCount: 5,
      guildOnly: true
    });
    this.state = {};
  }

  run(_, args) {
    const { provider } = this.client;
    Object.keys(args).forEach(key => {
      const { id, guild } = args[key];
      provider.set(guild, key, id);
    });
  }
};
