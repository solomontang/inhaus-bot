const VALID_TEAM_REGEX = /^(([1-8])v){1,3}[1-8]$/i;
const validateTeamSizes = teamSizes => VALID_TEAM_REGEX.test(teamSizes);

const pr = new Intl.PluralRules('en-US');
const playerSuffixes = new Map([
  ['one', 'player'],
  ['other', 'players']
]);
const formatAdditionalPlayers = count => {
  const rule = pr.select(count);
  const suffix = playerSuffixes.get(rule);
  return `${count} additional ${suffix}`;
};

const parseTeamSizes = teamSizes =>
  teamSizes
    .toLowerCase()
    .split('v')
    .map(value => parseInt(value));

module.exports = { formatAdditionalPlayers, parseTeamSizes, validateTeamSizes };
