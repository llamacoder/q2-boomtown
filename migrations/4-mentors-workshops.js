exports.up = knex => {
  return knex.schema.createTable('mentors_workshops', table => {
    table.integer('mentor_id').notNullable()
    table.integer('workshop_id').notNullable()
    table.foreign('mentor_id')
      .references('mentors.mentor_id')
      .onDelete('CASCADE')
    table.foreign('workshop_id')
      .references('workshops.workshop_id')
      .onDelete('CASCADE')
    table.string('name')
      .notNullable()
      .defaultsTo('')
  })
}

exports.down = knex => {
  return knex.schema.dropTable('mentors_workshops')
}
