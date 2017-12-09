exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('founders')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('founders').insert([
        {
          founder_id: 1,
          company_id: 1,
          first_name: 'Olivia',
          last_name: 'Burgener',
          phone_number: '3036531652'
        },
        {
          founder_id: 2,
          company_id: 2,
          first_name: 'Tracey',
          last_name: 'Dolsen',
          phone_number: '3035793384'
        },
        {
          founder_id: 3,
          company_id: 3,
          first_name: 'Neal',
          last_name: 'Balaoing',
          phone_number: '3123755525'
        },
        {
          founder_id: 4,
          company_id: 4,
          first_name: 'Scott',
          last_name: 'Rushford',
          phone_number: '8582312588'
        }
      ])
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('founders_founder_id_seq', (SELECT MAX(founder_id) FROM founders));"
      )
    })
}
