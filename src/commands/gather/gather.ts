import { Command, CommandoClient, CommandMessage } from 'discord.js-commando';
import { SettingsController } from '../../controllers';
import { VoiceChannel } from 'discord.js';

class Gather extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'gather',
      group: 'gather',
      memberName: 'gather',
      description: 'Gather all players from all managed channels into the lobby',
      guildOnly: true,
    });
  }

  // @ts-ignore Outdated type def does not allow undefined returns
  async run(msg: CommandMessage) {
    try {
      const { guild } = msg;

      const { lobby, ...teamChannels } = await SettingsController.getSettings(guild);

      const allMovedPlayers = [];
      Object.values(teamChannels).forEach((channel: VoiceChannel) => {
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
