exports.up = knex => {
  return knex.schema.createTable('workshops', table => {
    table.increments('workshop_id')
    table.string('name')
      .notNullable()
      .defaultsTo('')
    table.date('date')
      .notNullable()
      .defaultsTo('now()')
    table.string('start_time').notNullable().defaultsTo('')
    table.string('end_time').notNullable().defaultsTo('')
  })
}
exports.down = knex => {
  return knex.schema.dropTable('workshops')
}
