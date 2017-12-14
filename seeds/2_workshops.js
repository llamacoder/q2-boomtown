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
            start_time: '09:00AM',
            end_time: '10:00AM'
          },
          {
            workshop_id: 2,
            name: 'Consulting',
            date: '12/17/17',
            start_time: '01:00PM',
            end_time: '03:00PM'
          },
          {
            workshop_id: 3,
            name: 'Running a SAAS Business',
            date: '12/19/17',
            start_time: '01:00PM',
            end_time: '03:00PM'
          },
          {
            workshop_id: 4,
            name: 'Green Company Logistics',
            date: '12/20/17',
            start_time: '01:00PM',
            end_time: '03:00PM'
          },
          {
            workshop_id: 5,
            name: 'Branding',
            date: '1/17/18',
            start_time: '01:00PM',
            end_time: '03:00PM'
          },
          {
            workshop_id: 6,
            name: 'Websites for New Businesses',
            date: '1/7/18',
            start_time: '01:00PM',
            end_time: '03:00PM'
          },
          {
            workshop_id: 7,
            name: 'IT for New Businesses',
            date: '11/17/17',
            start_time: '01:00PM',
            end_time: '03:00PM'
          },
          {
            workshop_id: 8,
            name: 'Production Cycles',
            date: '11/24/17',
            start_time: '01:00PM',
            end_time: '03:00PM'
          },
          {
            workshop_id: 9,
            name: 'How to Write a Business Plan',
            date: '1/5/18',
            start_time: '01:00PM',
            end_time: '03:00PM'
          },
          {
            workshop_id: 10,
            name: 'Financial Analysis',
            date: '12/8/17',
            start_time: '10:00AM',
            end_time: '11:00AM'
          }
        ])
        .then(() => {
          return knex.raw(
            `SELECT setval('workshops_workshop_id_seq', (SELECT MAX(workshop_id) FROM workshops))`
          )
        })
    })
  }
