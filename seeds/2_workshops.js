exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('workshops')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('workshops')
        .insert([
          {
            workshop_id: 1,
            name: 'Marketing',
            date: '12/15/17',
            start_time: '09:00am',
            end_time: '10:00am'
          },
          {
            workshop_id: 2,
            name: 'Consulting',
            date: '12/17/17',
            start_time: '12:00pm',
            end_time: '1:00pm'
          },
          {
            workshop_id: 3,
            name: 'Financial Analysis',
            date: '12/19/17',
            start_time: '10:00am',
            end_time: '11:00am'
          }
        ])
        .then(() => {
          return knex.raw(
            `SELECT setval('workshops_workshop_id_seq', (SELECT MAX(workshop_id) FROM workshops))`
          )
        })
    })
  }
