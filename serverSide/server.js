const knex = require('../knex');
var JOBS = []

const notifications = require('./notifications')

//  Return all messages
function getAllMessages(req, res, next) {
  console.log("inside getAllMessages");
  return knex('messages')
              .then(results => {
                res.status(200).json(results)
        })
}

//  Return all feedback (messages with message-in value)
function getAllMessagesIn(req, res, next) {
  return knex('messages')
              .whereNotNull('message_in')
              .orderBy('workshop_id')
              .then(results => {
                res.status(200).json(results)
        })
}

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
              .orderBy('first_name')
              .then(results => {
                res.status(200).json(results)
        })
}


//  Get new workshop data from request and create a new workshop.
function createWorkshop(req, res, next) {
  //  Get all the data fields
  const { name, start_time, end_time, date, mentors } = req.body

  //  Input validation
  if (!name || !start_time || !end_time || !date || !mentors ||
    !Array.isArray(mentors) || mentors.length === 0) {
       res.status(400).json({error: {status: 400, message: "Input not valid"}})
  }

  //  now insert the new workshop
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
                  //  set up the push notifications for all the founders
                  return knex('founders')
                    .then(founders => {
                      let jobs = founders.map(founder =>
                      notifications.setupNotifications(ws, founder.phone_number))

                      //  save the jobs in the global array (just stored in a
                      //  global array because they must be restarted if the
                      //  server goes down
                      JOBS = [...JOBS, ...jobs]
                      res.sendStatus(201)
                    })
                })
        })
}



function getOneWorkshop(req, res, next) {
  return knex('workshops')
      .where('workshop_id', req.params.id)
      .then(results => {
        results && results.length > 0 ? res.status(200).json(results[0]) :
          res.sendStatus(404)
      })
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

//  Return the most recent message to a founder
function getLastMessageByNumber(phone_number) {
  return knex('messages')
              .where('phone_number', phone_number)
              .orderBy('phone_number')
              .limit(1)
}

function handleResponse(req, res, next) {
  // return knex('books').where('id', id)
  //   .del()
  //   .returning(['title', 'author', 'genre', 'description',
  //               'cover_url as coverUrl', 'created_at as createdAt',
  //               'updated_at as updatedAt'])
}

//  Return the average feedback for all workshops
function getAveFeedbackByWS(req, res, next) {
  // return knex('messages').select('name', 'message_in')
  //             .whereNotNull('message_in')
  //             .join('workshops')
  //             .orderBy('workshop_id')
  //             .then(results => {
  //               //  munge this date and shove it into an array of objects
  //
  //               res.status(200).json([{workshop_id: 3, ave_feedback: 4},
  //                                     {workshop_id: 4, ave_feedback: 5}])
  //       })
}




module.exports = {
  getAllWorkshops, getAllMentors, getOneWorkshop, createWorkshop,
  updateOneWorkshop, deleteOneWorkshop, handleResponse, getAllMessages,
  getAllMessagesIn, getAveFeedbackByWS
}
