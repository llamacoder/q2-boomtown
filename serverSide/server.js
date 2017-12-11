const knex = require('../knex');

const notifications = require('./notifications')

//  Return all workshops ordered by date then start time
function getAllWorkshops(req, res, next) {
  return knex('workshops')
              .orderByRaw('date, start_time')
              .then(results => {
                res.status(200).json(results)
        })
}

//  Return all mentors ordered by date then start time
function getAllMentors(req, res, next) {
  return knex('mentors')
              .then(results => {
                res.status(200).json(results)
        })
}


//  Get new workshop data from request and create a new workshop.
function createWorkshop(req, res, next) {
  //  Get all the data fields
  const { name, start_time, end_time, date, mentors } = req.body.receivedInfo
  console.log(req.body.receivedInfo);

  //  Input validation
  if (!name || !start_time || !end_time || !date || !mentors ||
    !Array.isArray(mentors) || mentors.length === 0) {
       res.status(400).json({error: {status: 400, message: "Input not valid"}})
  }

  return knex('workshops')
              .insert({"name": name, "start_time": start_time,
                      "end_time": end_time, "date": date})
              .returning('*')
              .then(results => {
                //  results should be an array with one object, which is the
                //  newly created workshop
                let ws = results[0]

                //  now create a record in the mentors-workshops table for each
                //  of the mentors passed in
                let promises = mentors.map(mentorId => {
                  return knex('mentors_workshops').insert({"mentor_id":mentorId,
                                                           "workshop_id":ws.workshop_id})
                })
                Promise.all(promises).then(result => {
                  //  set up the push notifications
                  notifications.setupNotifications(ws)
                  res.sendStatus(201)
                })
        })
}



function getOneWorkshop(req, res, next) {
  // return knex('books').select('id', 'title', 'author', 'genre', 'description',
  //             'cover_url as coverUrl', 'created_at as createdAt',
              // 'updated_at as updatedAt').where('id', id)
}

function updateOneWorkshop(req, res, next) {
  // console.log("Updating... " + id + title + author);
  // return knex('books').where('id', id)
  //   .update({'title': title, 'author': author,
  //                              'genre': genre, 'description':description,
  //                              'cover_url': coverUrl})
  //   .returning(['id', 'title', 'author', 'genre', 'description',
  //               'cover_url as coverUrl', 'created_at as createdAt',
  //               'updated_at as updatedAt'])
}

function deleteOneWorkshop(req, res, next) {
  // return knex('books').where('id', id)
  //   .del()
  //   .returning(['title', 'author', 'genre', 'description',
  //               'cover_url as coverUrl', 'created_at as createdAt',
  //               'updated_at as updatedAt'])
}

function handleResponse(req, res, next) {
  // return knex('books').where('id', id)
  //   .del()
  //   .returning(['title', 'author', 'genre', 'description',
  //               'cover_url as coverUrl', 'created_at as createdAt',
  //               'updated_at as updatedAt'])
}



module.exports = {
  getAllWorkshops, getAllMentors, getOneWorkshop, createWorkshop,
  updateOneWorkshop, deleteOneWorkshop, handleResponse
}
