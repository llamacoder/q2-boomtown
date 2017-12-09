exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('mentors_workshops')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('mentors_workshops').insert([
        { mentor_id: 1, workshop_id: 1 },
        { mentor_id: 2, workshop_id: 1 },
        { mentor_id: 3, workshop_id: 2 }
      ])
    })
}
