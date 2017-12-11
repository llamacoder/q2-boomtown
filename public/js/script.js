$(document).ready(function() {
  function getWorkshops() {
    const collection_container = $('.collection')
    axios.get('http://localhost:3000/').then(result => {
      for (let i = 0; i < result.data.length; i++) {
        let wsName = result.data[i].name
        let wsDate = new Date(result.data[i].date)
        let officialDate = `${wsDate
          .getMonth()
          .toString()}-${wsDate
          .getDate()
          .toString()}-${wsDate.getFullYear().toString()}`
        let htmlString = `<a href = '#modal1' class = 'collection-item black-text'>${wsName} : ${officialDate}</a>`
        collection_container.append(htmlString)
        //create modal for clickable list link
      }

      $('.modal').modal();
      $('select').material_select();

      $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15, // Creates a dropdown of 15 years to control year,
            today: 'Today',
            clear: 'Clear',
            close: 'Ok',
            closeOnSelect: false // Close upon selecting a date,
          });

          $('.timepicker').pickatime({
            default: 'now', // Set default time: 'now', '1:30AM', '16:30'
            fromnow: 0, // set default time to * milliseconds from now (using with default = 'now')
            twelvehour: true, // Use AM/PM or 24-hour format
            donetext: 'OK', // text for done-button
            cleartext: 'Clear', // text for clear-button
            canceltext: 'Cancel', // Text for cancel-button
            autoclose: false, // automatic close timepicker
            ampmclickable: true, // make AM PM clickable
            vibrate: true, // vibrate the device when dragging clock hand
            aftershow: function() {}//Function for after opening timepicker
          });




    })

  }
  getWorkshops()
})


let userInput = () => {
let receivedInput = {};

 // name of workshop_
let inputWorkshop =  document.getElementById("workshop_name")
 // mentor


let mentorsSelected = $('#mentor_name').val();
// for (let i = 0; i < mentor_name.length; i++){
//   if (mentor_name[i] === "checked"){
//     // put the value into an object...
//    mentorsSelected[instr] = {}
//   }
// }


 // date
let inputDate = document.getElementById("workshop_date")
 // start time
let startTime = document.getElementById("workshop_start")
 // end time
let endTime = document.getElementById("workshop_end")

receivedInput.work_shop= inputWorkshop;
//receivedInput[mentors]= mentorsSelected;
receivedInput.mentor= mentorsSelected;
receivedInput.date= inputDate;
receivedInput.start= startTime;
receivedInput.end= endTime;

console.log(receivedInput);




}




let clickCreate = () => {
let divObj = document.getElementById("delete_button");
divObj.style.display = 'none';

const collection_container = $('.collection')
axios.get('http://localhost:3000/mentors/').then(result => {
  for (let i = 0; i < result.data.length; i++) {
    let wsName = result.data[i].name
    let wsDate = new Date(result.data[i].date)
    let officialDate = `${wsDate
      .getMonth()
      .toString()}-${wsDate
      .getDate()
      .toString()}-${wsDate.getFullYear().toString()}`
    let htmlString = `<a href = '#modal1' class = 'collection-item black-text'>${wsName} : ${officialDate}</a>`
    collection_container.append(htmlString)
    //create modal for clickable list link
  }
})

}
