exports.up = function (knex) {
  return knex.schema.createTable("repositories", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.text("description");
    table.timestamp("latest_release");
    table.timestamp("release_date");
    table.boolean("unseen_updates").defaultTo(true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("repositories");
};
