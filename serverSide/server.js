const knex = require('../knex');
var JOBS = []

const notifications = require('./schedule-server')

//  Return all messages
function getAllMessages(req, res, next) {
  return knex('messages')
              .then(results => {
                res.status(200).json(results)
        })
}


//  Return all workshops ordered by date
function getAllWorkshops(req, res, next) {
  return knex('workshops')
              .orderByRaw('date')
              .then(workshops => {
                let promises =  workshops.map(workshop => {
                  return knex('mentors')
                      .select('mentors.mentor_id', 'mentors.first_name', 'mentors.last_name')
                      .join('mentors_workshops','mentors.mentor_id',
                      'mentors_workshops.mentor_id')
                      .where('mentors_workshops.workshop_id', workshop.workshop_id)
                      .then(mentors => {
                        workshop.mentors = mentors
                        return workshop
                      })
                })
                Promise.all(promises).then(results => {
                  res.status(200).json(results)
                })
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
  const { name, start_time, end_time, date, mentors } = req.body.receivedInfo

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
                      let msg = `Please rate the content of the ${ws.name} workshop by responding with: \n\t5 (awesome) \n\t4 (good) \n\t3 (ok) \n\t2 (not helpful) \n\t1 (waste of time) \n\t0 (did not attend)`
                      let jobs = founders.map(founder =>
                      notifications.setupNotification(ws, founder.phone_number, msg))

                      //  save the jobs in the global array (just stored in a
                      //  global array because they must be restarted if the
                      //  server goes down
                      JOBS = [...JOBS, ...jobs]

                      //  save the message, phone number, and workshop name
                      //  in the message table
                      let logTime = new Date()
                      let promises2 = founders.map(founder => {
                        return knex('messages').insert({ 'workshop_id': ws.workshop_id,
                                                         'workshop_name': ws.name,
                                                         'phone_number': founder.phone_number,
                                                         'message_out': msg,
                                                          'log_time': logTime })
                                                .returning()
                      })
                      Promise.all(promises2).then(result => {
                          console.log("logged the messages")
                          res.sendStatus(201)
                      })
                    })
                })    // end of promises looping through mentors
              })
}


function getOneWorkshop(req, res, next) {
  return knex('workshops')
      .where('workshop_id', req.params.id)
      .then(results => {
        if (!results || results.length === 0 ) { res.sendStatus(404) }
        else {
          let ws = results[0]
          //  get the mentors for this workshops
          return knex('mentors')
                  .select('mentors.mentor_id', 'mentors.first_name', 'mentors.last_name')
                  .join('mentors_workshops','mentors.mentor_id',
                        'mentors_workshops.mentor_id')
                  .where('mentors_workshops.workshop_id', ws.workshop_id)
                  .then(mentors => {
                    ws.mentors = mentors
                    res.status(200).json(ws)
                  })
                  .catch(function(error) {
                    console.error(error);
                  })        }
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

  // check if 'mentors_workshops' table has a queried id
  return knex('mentors_workshops').where('workshop_id', req.params.id).then(
      (results) => {

  // if 'mentors_workshops' table does not have a queried id, then send status code 400
        if (!results){
          console.log('line 118')
          res.sendStatus(400).json({error:{status:400, message: 'error, no queried id in mentors_workshops'}});
        } else {

  // if 'mentors_workshops' table has queried id, then delete item w/ queried id
          knex('mentors_workshops').where('workshop_id', req.params.id).del()

  // check if 'messages' table has queried id
              .then((results) => knex('messages').where('workshop_id', req.params.id).then(
                  (results) => {

  // if 'messages' table does not have a queried id, then send status code 400
                    if (!results){
                        console.log('line131')
                        res.sendStatus(400).json({error:{status:400, message: 'error, no queried id in messages'}});
                    } else {

  // if 'messages' table has queried id, then delete item w/ queried id
                    knex('messages').where('workshop_id', req.params.id).del()

  // check if 'workshops' table has queried id
                        .then((results) => knex('workshops').where('workshop_id', req.params.id).then(
                          (results) => {

  // if 'workshops' table does not have a queried id, then send status code 400
                            if(!results){
                              console.log('line144')
                              res.sendStatus(400).json({error:{status:400, message: 'error, no queried id in workshops'}});
                            } else {

  // if 'workshops' table has queried id, then delete item w/ queried id
                            knex('workshops').where('workshop_id', req.params.id).del().then()
                            && res.sendStatus(200);

                            }}))}}))}})

  // catch all
  .catch(function(error) {
        res.sendStatus(400);
    });
}

//  Return the most recent message to a founder
function getLastMessageByNumber(phone_number) {
  return knex('messages')
              .where('phone_number', phone_number)
              .orderBy('phone_number')
              .limit(1)
}

function handleResponse(req, res, next) {
  console.log("inside handleResponse");
  console.log(req);
}



module.exports = {
  getAllWorkshops, getAllMentors, getOneWorkshop, createWorkshop,
  updateOneWorkshop, deleteOneWorkshop, handleResponse, getAllMessages
}
