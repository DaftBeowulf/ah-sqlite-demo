exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("nightmares")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("nightmares").insert([
        { type: "horror movie" }, //1
        { type: "coding nightmares" }, //2
        { type: "somebody pushing you off a cliff" }, //3
        { type: "Five minutes left in Sprint Challenge" }, //4
        { type: "whiteboarding for an interview... in PHP" } //5
      ]);
    });
};
