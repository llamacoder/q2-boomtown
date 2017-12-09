exports.up = knex => {
  return knex.schema.createTable('companies', table => {
    table.increments('company_id')
    table.string('cohort')
      .notNullable()
      .defaultsTo('')
    table.string('company_name')
      .notNullable()
      .defaultsTo('')
  })
}

exports.down = knex => {
  return knex.schema.dropTable('companies')
}
