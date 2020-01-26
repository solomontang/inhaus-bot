import { Command } from 'discord.js-commando';
import { SettingsController } from '../../controllers';

class Gather extends Command {
  constructor(client) {
    super(client, {
      name: 'gather',
      group: 'gather',
      memberName: 'gather',
      description: 'Gather all players from all managed channels into the lobby',
      guildOnly: true,
    });
  }

  async run(msg) {
    try {
      const { guild } = msg;

      const { lobby, ...teamChannels } = await SettingsController.getSettings(guild);

      const allMovedPlayers = [];
      Object.values(teamChannels).forEach((channel) => {
        const { members } = channel;
        if (members && members.size) {
          members.tap((member) => {
            allMovedPlayers.push(member.setVoiceChannel(lobby));
          });
        }
      });
    } catch (error) {
      console.error(error);
      msg.reply('An error occured when attempting to gather all players to the lobby.');
    }
  }
}

export default Gather;
