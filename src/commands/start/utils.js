const VALID_TEAM_REGEX = /^(([1-8])v){1,3}[1-8]$/i;
const validateTeamSizes = (teamSizes) => VALID_TEAM_REGEX.test(teamSizes);

const pr = new Intl.PluralRules('en-US');
const playerSuffixes = new Map([
  ['one', 'player'],
  ['other', 'players'],
]);
const isAre = new Map([
  ['one', 'is'],
  ['other', 'are'],
]);

const formatAdditionalPlayers = (count) => {
  const rule = pr.select(count);
  const suffix = playerSuffixes.get(rule);
  return `${count} additional ${suffix}`;
};

const formatNounPlurality = (count) => {
  const rule = pr.select(count);
  return isAre.get(rule);
};

const parseTeamSizes = (teamSizes) =>
  teamSizes
    .toLowerCase()
    .split('v')
    .map((value) => parseInt(value, 10));

module.exports = {
  formatAdditionalPlayers,
  formatNounPlurality,
  parseTeamSizes,
  validateTeamSizes,
};
