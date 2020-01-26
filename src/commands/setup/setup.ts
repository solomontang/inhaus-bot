import { Command, CommandoClient, CommandMessage } from 'discord.js-commando';
import { SettingsController } from '../../controllers';
import { VoiceChannel } from 'discord.js';

type SetupArguments = {
  lobby: VoiceChannel;
  team1: VoiceChannel;
  team2: VoiceChannel;
  team3: VoiceChannel;
  team4: VoiceChannel;
};

class Setup extends Command {
  constructor(client: CommandoClient) {
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
      // @ts-ignore
      userPermissions: ['MANAGE_CHANNELS'],
    });
  }
  // @ts-ignore Outdated type def does not allow null returns
  run(msg: CommandMessage, args: SetupArguments) {
    try {
      const { guild } = msg;
      const settings = JSON.stringify(
        Object.keys(args).reduce((acc, key) => {
          const { id }: VoiceChannel = args[key];
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
}

export default Setup;
