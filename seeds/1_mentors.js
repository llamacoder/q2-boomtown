exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('mentors')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('mentors').insert([
        { mentor_id: 1, first_name: 'Teddi', last_name: 'Maull' },
        { mentor_id: 2, first_name: 'Sean', last_name: 'Helvey' },
        { mentor_id: 3, first_name: 'Jodie', last_name: 'Rigali' },
        { mentor_id: 4, first_name: 'Mark', last_name: 'Oswald' },
        { mentor_id: 5, first_name: 'Kevin', last_name: 'Cosner' },
        { mentor_id: 6, first_name: 'Bob', last_name: 'Barker' },
        { mentor_id: 7, first_name: 'Lucy', last_name: 'Lu' },
        { mentor_id: 8, first_name: 'Alice', last_name: 'Cooper' },
        { mentor_id: 9, first_name: 'Marcia', last_name: 'Gray' },
        { mentor_id: 10, first_name: 'John', last_name: 'Paul' }
      ])
    })
    .then(function() {
      return knex.raw("SELECT setval('mentors_mentor_id_seq', (SELECT MAX(mentor_id) FROM mentors));")
    })
}
