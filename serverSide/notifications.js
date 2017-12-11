const schedule = require('node-schedule');
const twilio = require('twilio');
const accountSid = 'AC1c91a6495d887c64e89d6b44e040c6d6'; // Your Account SID from www.twilio.com/console
const authToken = '84252d06d9e17b1be0a4841dd3d61843';   // Your Auth Token from www.twilio.com/console
const client = new twilio(accountSid, authToken);


//creating function that creates new node scheduler Job to start notifications
function setupNotifications(ws){
  let hours = parseInt(ws.end_time.substring(0,2))
  let minutes = parseInt(ws.end_time.substring(3,5))
  let seconds = parseInt(ws.end_time.substring(6))
  let date = new Date(ws.date.getFullYear(), ws.date.getMonth(), ws.date.getDate(), hours, minutes, seconds)

  console.log(date);

  var j = schedule.scheduleJob(date, function(){
    client.messages.create({
        body: 'Please rate the content of this workshop by responding with: \n\t5 (awesome) \n\t4 (good) \n\t3 (ok) \n\t2 (not helpful) \n\t1 (waste of time) \n\t0 (did not attend)',
        to: '+13035793384', // Text this number
        from: '+17205730412' // From a valid Twilio number
      })
      .then((message) => console.log(message.sid));
  });
}


module.exports = {
  setupNotifications
}
