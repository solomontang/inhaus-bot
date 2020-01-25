const { Command } = require('discord.js-commando');
const { SettingsController } = require('../../controllers');
const { formatAdditionalPlayers, formatNounPlurality, parseTeamSizes, validateTeamSizes } = require('./utils');
const { RANDOM, RANKED, UNRANKED } = require('./constants');

module.exports = class InhausCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'start',
      group: 'start',
      memberName: 'start',
      description: 'Start a match',
      args: [
        {
          key: 'teamSizes',
          prompt: 'Team sizes (4v4, 2v2v2v2):',
          type: 'string',
          validate: validateTeamSizes,
          parse: parseTeamSizes,
          error: 'Team sizes are invalid.',
        },
        {
          key: 'matchmakingType',
          prompt: 'Matchmaking type (ranked, unranked, random):',
          type: 'string',
          oneOf: [RANDOM, RANKED, UNRANKED],
        },
      ],
      argsCount: 2,
      guildOnly: true,
    });
  }

  async randomMatchmaking(msg, args, targetChannels) {
    const { lobby } = targetChannels;
    const { teamSizes } = args;
    const teamChannels = Object.values(targetChannels).slice(1, teamSizes.length + 1);
    const playerPool = lobby.members.clone();
    try {
      const teams = await Promise.all(
        teamSizes.map(async (teamSize, idx) => {
          const team = [];
          for (let i = 0; i < teamSize; i += 1) {
            const playerKey = playerPool.randomKey();
            const player = playerPool.get(playerKey);
            if (player) {
              team.push(player.setVoiceChannel(teamChannels[idx]));
              playerPool.delete(playerKey);
            }
          }
          return Promise.all(team);
        })
      );
      console.log(teams);
    } catch (error) {
      console.error(error);
      msg.reply('An error occurred during random team assignments.');
    }
  }

  rankedMatchmaking(msg, args, targetChannels) {
    msg.reply('Ranked matchmaking is not available yet. Falling back to random matching.');
    this.randomMatchmaking(msg, args, targetChannels);
  }

  unrankedMatchmaking(msg, args, targetChannels) {
    msg.reply('Unranked matchmaking is not available yet. Falling back to random matching.');
    this.randomMatchmaking(msg, args, targetChannels);
  }

  async run(msg, args) {
    try {
      const { teamSizes, matchmakingType } = args;
      const { guild } = msg.channel;
      const totalPlayers = teamSizes.reduce((total, members) => total + members);

      const channels = await SettingsController.getSettings(guild);
      const currentPlayers = channels.lobby.members.size;
      if (currentPlayers < totalPlayers) {
        const missingPlayers = totalPlayers - currentPlayers;
        const additionalPlayers = formatAdditionalPlayers(missingPlayers);
        const isAre = formatNounPlurality(missingPlayers);
        msg.reply(`${additionalPlayers} in ${channels.lobby} ${isAre} required to start the match.`);
        return;
      }

      if (matchmakingType === RANDOM) this.randomMatchmaking(msg, args, channels);
      if (matchmakingType === RANKED) this.rankedMatchmaking(msg, args, channels);
      if (matchmakingType === UNRANKED) this.unrankedMatchmaking(msg, args, channels);
    } catch (error) {
      console.error(error);
      msg.reply(`Game could not be started.`);
    }
  }
};
