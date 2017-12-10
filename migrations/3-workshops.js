exports.up = knex => {
  return knex.schema.createTable('workshops', table => {
    table.increments('workshop_id')
    table.string('name')
      .notNullable()
      .defaultsTo('')
    table.date('date')
      .notNullable()
      .defaultsTo('now()')
    table.date('start_time').notNullable().defaultsTo('now()')
    table.date('end_time').notNullable().defaultsTo('now()')
  })
}
exports.down = knex => {
  return knex.schema.dropTable('workshops')
}
