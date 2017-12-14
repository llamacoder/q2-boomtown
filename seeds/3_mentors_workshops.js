exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('mentors_workshops')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('mentors_workshops').insert([
        { mentor_id: 1, workshop_id: 1 },
        { mentor_id: 5, workshop_id: 1 },
        { mentor_id: 2, workshop_id: 2 },
        { mentor_id: 8, workshop_id: 3 },
        { mentor_id: 8, workshop_id: 4 },
        { mentor_id: 8, workshop_id: 5 },
        { mentor_id: 3, workshop_id: 6 },
        { mentor_id: 6, workshop_id: 7 },
        { mentor_id: 4, workshop_id: 8 },
        { mentor_id: 4, workshop_id: 9 },
        { mentor_id: 3, workshop_id: 10 },
        { mentor_id: 1, workshop_id: 10 },
      ])
    })
}
