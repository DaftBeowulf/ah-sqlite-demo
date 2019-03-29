exports.up = function(knex, Promise) {
  return knex.schema.createTable("monsters", tbl => {
    //primary
    tbl.increments();
    tbl
      .string("name", 100)
      .unique()
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("monsters");
};
