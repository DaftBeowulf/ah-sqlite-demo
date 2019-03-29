exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("monsters")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("monsters").insert([
        { name: "Freddy Kreuger" }, //1
        { name: "Bigfoot" }, //2
        { name: "student debt" }, //3
        { name: "Elmo" }, //4
        { name: "PHP" }, //5
        { name: "chained createTables" } //6
      ]);
    });
};
