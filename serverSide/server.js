const knex = require('../knex');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const twilio = require('twilio');
const accountSid = 'AC1c91a6495d887c64e89d6b44e040c6d6'; // Twilio Account SID from www.twilio.com/console
const authToken = '84252d06d9e17b1be0a4841dd3d61843';   // Twilio Auth Token from www.twilio.com/console
const client = new twilio(accountSid, authToken);
const schedule = require('node-schedule');

var JOBS = []


function setupNotification(ws, phoneNumber, msg) {
   // format the date field properly for the notification scheduler
  let hours = parseInt(ws.end_time.substring(0,2))
  if (ws.end_time.substring(5) === "PM") hours += 12
  let minutes = parseInt(ws.end_time.substring(3,5))
  let seconds = 0
  let notifDate = new Date(ws.date.getFullYear(), ws.date.getMonth(),
        ws.date.getDate(), hours, minutes, seconds)
  console.log(notifDate);

  let notifNum = `+1${phoneNumber}`
  console.log(notifNum);
  var j = schedule.scheduleJob(notifDate, function(){
    //  first create and send the text message
    client.messages.create({
      body: msg,
        to: notifNum, // Text this number
        from: '+17205730412' // From a valid Twilio number
      })
      .then((message) => {
        console.log(message.sid)
        //  then save the message, phone number, and workshop name
        //  in the message table
        let logTime = new Date()
        return knex('messages').insert({ 'workshop_id': ws.workshop_id,
                                           'workshop_name': ws.name,
                                           'phone_number': phoneNumber,
                                           'message_out': msg,
                                            'log_time': logTime })
                                .returning()
                                .then(result => {
                                    console.log("logged the messages")
                                    res.sendStatus(201)
                                  })
      })
    })
}

//  Return average feedback by workshop names
function getFeedback(req, res, next) {
  return knex.raw('select avg(feedback), workshop_name from messages where feedback != -1 group by workshop_name')
              .then(results => {
                res.status(200).json(results.rows)
        })
}


//  Return all workshops ordered by date
function getAllWorkshops(req, res, next) {
  return knex('workshops')
              .orderByRaw('date desc')
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
                      setupNotification(ws, founder.phone_number, msg))

                      //  save the jobs in the global array (just stored in a
                      //  global array because they must be restarted if the
                      //  server goes down
                      JOBS = [...JOBS, ...jobs]
                      res.sendStatus(201)

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
    console.log('line 93')
    //  Get all the data fields
    const { name, start_time, end_time, date, mentors } = req.body.receivedInfo
    console.log("Updating workshop:" + req.params.id);

    // update workshops table with name, start_time, end_time, and date
    return knex('workshops')
      .where('workshop_id', req.params.id)
      .update('name', name)
      .update('start_time', start_time)
      .update('end_time', end_time)
      .update('date', date)
      .returning('*')
      .then( (results) => {

        // delete all items in 'mentors_workshops' table that match workshop_id
          return knex('mentors_workshops')
            .where('workshop_id', parseInt(req.params.id))
            .del()

        // insert 'workshop_id' and 'mentor_id' for each workshop_id
            .then( (results) => {
              let promises = mentors.map(mentorId => {
                return knex('mentors_workshops').insert({"mentor_id":mentorId, "workshop_id": parseInt(req.params.id)})
              })
              Promise.all(promises).then(results => res.sendStatus(200))
          })
      })
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


function updateFeedback(msg, phone) {
  return knex.raw(`select message_id from messages where phone_number = ${phone} and feedback = -1 order by log_time asc limit 1`)
    .then(([msgId]) => {
      // got the message id to update
      if (!msgId ) {
        res.sendStatus(404)
      } else {
        // create the sql stmt to add the message text.  If the
        // text is 0-5, turn it into a number and store it as feedback
        let sql = `update messages set message_in = ${msg}`
        var feedback;
        if (msg.length === 1 && '012345'.includes(msg)) {
          feedback = parseInt(msg)
          sql += `, feedback = ${feedback}`
        }
        sql += ` where message_id = ${msgId} `
        return knex.raw(sql)
          .then(results => {
            res.sendStatus(201)
        })
      }
  })

}

function handleResponse(req, res) {
  const body = req.body.Body
  const phone = req.body.From
  updateFeedback(body, phone)
  res.set('Content-Type', 'text/plain')
  res.send(`Thanks for the feedback!`)
}



module.exports = {
  getAllWorkshops, getAllMentors, getOneWorkshop, createWorkshop,
  updateOneWorkshop, deleteOneWorkshop, handleResponse, getFeedback
}
