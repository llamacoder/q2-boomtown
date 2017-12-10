exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('companies')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('companies').insert([
        { company_id: 1,
          cohort: "1",
          company_name: 'Google' },
        { company_id: 2,
          cohort: "2", company_name: 'Twillo' },
        { company_id: 3,
          cohort: "3", company_name: 'World Star Hip Hop' },
        { company_id: 4,
          cohort: "4", company_name: 'Sleepin on the Couch Inc' }
      ])
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('companies_company_id_seq', (SELECT MAX(company_id) FROM companies));"
      )
    })
}
