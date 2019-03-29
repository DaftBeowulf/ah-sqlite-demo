exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("nightmares_monsters")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("nightmares_monsters").insert([
        { monster_id: 1, nightmare_id: 1 },
        { monster_id: 6, nightmare_id: 2 },
        { monster_id: 5, nightmare_id: 5 },
        { monster_id: 3, nightmare_id: 4 },
        { monster_id: 2, nightmare_id: 3 },
        { monster_id: 4, nightmare_id: 3 },
        { monster_id: 4, nightmare_id: 2 }
      ]);
    });
};
