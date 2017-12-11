$(document).ready(function() {
  function getWorkshops() {
    const collection_container = $('.collection')
    axios.get('http://localhost:8000/').then(result => {
      for (let i = 0; i < result.data.length; i++) {
        const wsName = result.data[i].name
        const wsDate = new Date(result.data[i].date)
        const officialDate = `${wsDate
          .getMonth()
          .toString()}-${wsDate
          .getDate()
          .toString()}-${wsDate.getFullYear().toString()}`
        const htmlString = `<a href = '#modal1' class = 'collection-item black-text'>${wsName} : ${officialDate}</a>`
        collection_container.append(htmlString)
      //create modal for clickable list link
      }

      $('.modal').modal()
      $('select').material_select()

      $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year,
        today: 'Today',
        clear: 'Clear',
        close: 'Ok',
        closeOnSelect: false // Close upon selecting a date,
      })

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
        aftershow: function() {} //Function for after opening timepicker
      })
    })
  }
  getWorkshops()
})




  let userInput = () => {
  const receivedInput = {}

  // name of workshop_
  const inputWorkshop = document.getElementById('workshop_name')
  // mentor

  const mentorsSelected = $('#mentor_name').val()
  // for (let i = 0; i < mentor_name.length; i++){
  //   if (mentor_name[i] === "checked"){
  //     // put the value into an object...
  //    mentorsSelected[instr] = {}
  //   }
  // }

  // date
  const inputDate = document.getElementById('workshop_date')
  // start time
  const startTime = document.getElementById('workshop_start')
  // end time
  const endTime = document.getElementById('workshop_end')

  receivedInput.work_shop = inputWorkshop
  receivedInput.mentors = mentorsSelected
  receivedInput.mentor = mentorsSelected
  receivedInput.date = inputDate
  receivedInput.start = startTime
  receivedInput.end = endTime

  console.log(receivedInput)
}

let clickCreate = () => {

  // Delete button disappears when create button is clicked
  let divObj = document.getElementById('delete_button')
  divObj.style.display = 'none'

  const mentor_container = $('.mentor_container')
  // console.log(mentor_container)
  axios.get('http://localhost:8000/mentors').then(result => {
    console.log(mentor_container);
    let line;
    for (let i = 0; i < result.data.length; i++) {
      // console.log(result.data.length, result.data, result)
      // let mentor_container = $('#mentor_container')

      const count = i
      let firstName = result.data[i].first_name
      let lastName = result.data[i].last_name
      let fullName = `${firstName} ${lastName}`
      line += "<option>";
      line += fullName;
      line += "</option>";

      // var para = document.createElement("option");
      // var node = document.createNode(fullName);
      // para.appendChild(node);
      // var element = document.getElementById("option");
      // element.appendChild(para);

      mentor_container.append(line);

      // mentor_container.append($('<option>',{
      //   value: result.data,
      //   text: fullName
      // }));

    //create modal for clickable list link




    // $.each(items, function (i, item) {
    //     $('#mySelect').append($('<option>', {
    //         value: item.value,
    //         text : item.text
    //     }));
    // });
    }
  })
}
