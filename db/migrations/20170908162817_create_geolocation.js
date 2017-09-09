
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('geolocations', function(table) {
    table.increments('id').unsigned().primary();
    table.string('latitude', 20).notNullable();
    table.string('longitude', 20).notNullable();
    table.dateTime('timestamp').notNullable();
    table.integer('accuracy').notNullable();
    table.integer('walk_id').notNullable();
    table.foreign('walk_id').references('walks.id').onDelete('CASCADE'); //foreign key
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('geolocations');
};
