exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('settings')
    .del()
    .then(function() {
      return knex('settings').insert([
        {
          guild: 175852179297402890,
          settings: {
            lobby: '663348972597018664',
            team1: '663346581600337940',
            team2: '663346609685528586',
            team3: '663353650889883659',
            team4: '663353751419224064'
          }
        }
      ]);
    });
};
