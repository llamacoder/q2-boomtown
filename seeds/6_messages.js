exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('messages')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('messages').insert([
        {
          message_id: 1,
          workshop_id: 1,
          phone_number: '303-653-1652',
          text: '5',
          message_out: 'Please rate the content of this workshop by responding with: \n\t5 (awesome) \n\t4 (good) \n\t3 (ok) \n\t2 (not helpful) \n\t1 (waste of time) \n\t0 (did not attend)',
          message_in: 'this is the message in for #1',
          log_time: '12/8/17 1:00pm'
        },
        {
          message_id: 2,
          workshop_id: 2,
          phone_number: '303-579-3384',
          text: '1',
          message_out: 'Please rate the content of this workshop by responding with: \n\t5 (awesome) \n\t4 (good) \n\t3 (ok) \n\t2 (not helpful) \n\t1 (waste of time) \n\t0 (did not attend)',
          message_in: 'this is the message in for #2',
          log_time: '12/8/17 2:00pm'
        },
        {
          message_id: 3,
          workshop_id: 3,
          phone_number: '312-375-5525',
          text: '3',
          message_out: 'Please rate the content of this workshop by responding with: \n\t5 (awesome) \n\t4 (good) \n\t3 (ok) \n\t2 (not helpful) \n\t1 (waste of time) \n\t0 (did not attend)',
          message_in: 'this is the message in for #3',
          log_time: '12/8/17 3:00pm'
        },
        {
          message_id: 4,
          workshop_id: 3,
          phone_number: '858-231-2588',
          text: '2',
          message_out: 'Please rate the content of this workshop by responding with: \n\t5 (awesome) \n\t4 (good) \n\t3 (ok) \n\t2 (not helpful) \n\t1 (waste of time) \n\t0 (did not attend)',
          message_in: '4',
          log_time: '12/8/17 4:00pm'
        }
      ])
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('messages_message_id_seq', (SELECT MAX(message_id) FROM messages));"
      )
    })
}
