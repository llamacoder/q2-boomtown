const knex = require('../knex')


function getAll(req, res, next) {
  return knex('workshops').select('workshop_id', 'name', 'date', 'start_time', 'end_time')
              .orderByRaw('date, start_time')
              .then(results => {
                res.status(200).json(results)
        })
}



module.exports = {
  getAll
  // getAll, getOne, create, updateOne, deleteOne
}
