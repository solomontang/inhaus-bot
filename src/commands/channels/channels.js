import { Command } from 'discord.js-commando';
import { SettingsController } from '../../controllers';

class Channels extends Command {
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
      const { lobby, team1, team2, team3, team4 } = await SettingsController.getSettings(guild);

      msg.channel.send(`
        > **Inhaus Channels**
        > Channels that are managed by the Inhaus bot.
        > Use \`!inhaus setup\` to make changes.
        > 
        > **Pre/Post-Game Lobby**: ${lobby.name}
        > **Team 1**: ${team1.name}
        > **Team 2**: ${team2.name}
        > **Team 3**: ${team3.name}
        > **Team 4**: ${team4.name}
      `);
    } catch (error) {
      console.error(error);
      msg.reply('Something went wrong. Please try again');
    }
  }
}

export default Channels;
