const schedule = require('node-schedule');
const twilio = require('twilio');
const accountSid = 'AC1c91a6495d887c64e89d6b44e040c6d6'; // Your Account SID from www.twilio.com/console
const authToken = '84252d06d9e17b1be0a4841dd3d61843';   // Your Auth Token from www.twilio.com/console
const client = new twilio(accountSid, authToken);


//creating function that creates new node scheduler Job to start notifications
function setupNotifications(ws, phoneNumber){
  //  format the date field properly for the notification scheduler
  let hours = parseInt(ws.end_time.substring(0,2))
  if (ws.end_time.substring(5) === "PM") hours += 12
  let minutes = parseInt(ws.end_time.substring(3,5))
  let seconds = 0
  // let date = new Date(ws.date.getFullYear(), ws.date.getMonth(), ws.date.getDate(), hours, minutes, seconds)


  var schedule = require('node-schedule');
  var date = new Date(2017, 11, 21, 5, 30, 0);
  console.log(date);

  var j = schedule.scheduleJob(date, function(){
    console.log('The world is going to end today.');
  });

  // let date = new Date(2017, 11, 11, 10, 12, 00)
  // console.log("phone number: " + phoneNumber + " date is: " + date);

  //  Now make schedule the notification
  // return schedule.scheduleJob(date, function(){
  //   console.log("scheduling notification to " + phoneNumber);
  //   client.messages.create({
  //       body: `Please rate the content of the ${ws.name} workshop by responding with: \n\t5 (awesome) \n\t4 (good) \n\t3 (ok) \n\t2 (not helpful) \n\t1 (waste of time) \n\t0 (did not attend)`,
  //       to: '+1' + phoneNumber,  // must be a confirmed friendly number within Twilio
  //       from: '+17205730412' // From a valid Twilio number
  //     })
  //     .then((message) => {
  //       console.log("did message " + phoneNumber + " SID is: " + message.sid);
  //     })
  // });
}


module.exports = {
  setupNotifications
}
