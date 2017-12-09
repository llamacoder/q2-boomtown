exports.up = knex => {
  return knex.schema.createTable('workshops', table => {
    table.increments('workshop_id')
    table.string('name')
      .notNullable()
      .defaultsTo('')
    table.date('date')
      .notNullable()
      .defaultsTo('12/6/2017')
    table.time('start_time').notNullable()
    table.time('end_time').notNullable()
  })
}
exports.down = knex => {
  return knex.schema.dropTable('workshops')
}
