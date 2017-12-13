const twilio = require('twilio');
const accountSid = 'AC1c91a6495d887c64e89d6b44e040c6d6'; // Your Account SID from www.twilio.com/console
const authToken = '84252d06d9e17b1be0a4841dd3d61843';   // Your Auth Token from www.twilio.com/console
const client = new twilio(accountSid, authToken);
const schedule = require('node-schedule');

function setupNotification(ws, phoneNumber, msg) {
  //  format the date field properly for the notification scheduler
  let hours = parseInt(ws.end_time.substring(0,2))
  if (ws.end_time.substring(5) === "PM") hours += 12
  let minutes = parseInt(ws.end_time.substring(3,5))
  let seconds = 0
  let notifDate = new Date(ws.date.getFullYear(), ws.date.getMonth(), ws.date.getDate(), hours, minutes, seconds)
  console.log(notifDate);

  //
  // var date = new Date(2017, 11, 12, 08, 51, 0);
  //
  // console.log(date);
  let notifNum = `+1${phoneNumber}`
  console.log(notifNum);
  var j = schedule.scheduleJob(notifDate, function(){
    client.messages.create({
      body: msg,
        to: notifNum, // Text this number
        from: '+17205730412' // From a valid Twilio number
      })
      .then((message) => console.log(message.sid));
  });
}

module.exports = { setupNotification }
