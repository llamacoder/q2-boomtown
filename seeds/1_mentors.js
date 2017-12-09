exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('mentors')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('mentors').insert([
        { mentor_id: 1, first_name: 'Teddi', last_name: 'Maull' },
        { mentor_id: 2, first_name: 'Sean', last_name: 'Halvey' },
        { mentor_id: 3, first_name: 'Jodie', last_name: 'Rigali' }
      ])
    })
    .then(function() {
      return knex.raw("SELECT setval('mentors_mentor_id_seq', (SELECT MAX(mentor_id) FROM mentors));")
    })
}
