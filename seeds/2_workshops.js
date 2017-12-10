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
            start_time: '12/15/2017 09:00:00.00 PST',
            end_time: '12/15/2017 10:00:00.00 PST'
          },
          {
            workshop_id: 2,
            name: 'Consulting',
            date: '12/17/17',
            start_time: '12/17/2017 10:00:00.00 PST',
            end_time: '12/17/2017 11:00:00.00 PST'
          },
          {
            workshop_id: 3,
            name: 'Financial Analysis',
            date: '12/19/17',
            start_time: '12/19/2017 11:00:00.00 PST',
            end_time: '12/19/2017 12:00:00.00 PST'
          }
        ])
        .then(() => {
          return knex.raw(
            `SELECT setval('workshops_workshop_id_seq', (SELECT MAX(workshop_id) FROM workshops))`
          )
        })
    })
  }
