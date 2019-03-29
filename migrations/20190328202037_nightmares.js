exports.up = function(knex, Promise) {
  return knex.schema.createTable("nightmares", tbl => {
    //primary
    tbl.increments();
    tbl
      .string("type", 100)
      .unique()
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("nightmares");
};
