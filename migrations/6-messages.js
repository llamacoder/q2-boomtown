exports.up = knex => {
  return knex.schema.createTable('messages', table => {
    table.increments('message_id')
    table.integer('workshop_id').notNullable()
    table.foreign('workshop_id').references('workshops.workshop_id')
    table.string('workshop_name').notNullable().defaultsTo('')
    table.string('phone_number').notNullable().defaultsTo('')
    table.string('message_out').defaultsTo('')
    table.string('message_in').defaultsTo('')
    table.integer('feedback').defaultsTo(-1)
    table.timestamp('log_time').notNullable('').defaultTo('now()')
  })
}

exports.down = knex => {
  return knex.schema.dropTable('messages')
}
