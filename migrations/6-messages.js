exports.up = knex => {
  return knex.schema.createTable('messages', table => {
    table.increments('message_id')
    table.integer('workshop_id').notNullable()
    table.foreign('workshop_id').references('workshops.workshop_id')
    table.string('phone_number').notNullable().defaultsTo('')
    table.string('text').notNullable().defaultsTo('')
    table.string('message_out').notNullable().defaultsTo('')
    table.string('message_in').notNullable().defaultsTo('')
    table.timestamp('log_time').notNullable('').defaultTo(knex.raw('now()'))
  })
}

exports.down = knex => {
  return knex.schema.dropTable('messages')
}
