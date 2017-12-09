exports.up = knex => {
  return knex.schema.createTable('mentors', table => {
    table.increments('mentor_id')
    table.string('first_name')
      .notNullable()
      .defaultsTo('')
    table.string('last_name')
      .notNullable()
      .defaultsTo('')
  })
}
exports.down = knex => {
  return knex.schema.dropTable('mentors')
}
