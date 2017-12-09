exports.up = knex => {
  return knex.schema.createTable('founders', table => {
    table.increments('founder_id')
    table.integer('company_id').notNullable()
    table.foreign('company_id')
      .references('companies.company_id')
      .onDelete('CASCADE')
    table.string('first_name')
      .notNullable()
      .defaultsTo('')
    table.string('last_name')
      .notNullable()
      .defaultsTo('')
    table.string('phone_number').notNullable().defaultsTo('')
  })
}

exports.down = knex => {
  return knex.schema.dropTable('founders')
}
