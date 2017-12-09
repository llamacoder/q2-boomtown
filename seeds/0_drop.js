
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('messages')
    .del()
    .then(() => {
      knex('founders').del()
    })
    .then(() => {
      knex('companies').del()
    })
    .then(() => {
      knex('mentors_workshops').del()
    })
    .then(() => {
      knex('workshops').del()
    })
    .then(() => {
      knex('mentors').del()
    })
}
