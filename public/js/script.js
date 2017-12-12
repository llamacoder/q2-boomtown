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




   $("#create_button").on("click", function() {

    $("#workshop_name").val("")
    $("#mentor_container").empty();
    $("#workshop_date").val("");
    $("#workshop_start").val("");
    $("#workshop_end").val("");
    // Delete button disappears when create button is clicked
    let divObj = document.getElementById('delete_button')
    divObj.style.display = 'none'

    const mentor_container = $('#mentor_container')
    axios.get('http://localhost:8000/mentors').then(result => {
      for (let i = 0; i < result.data.length; i++) {
        const firstName = result.data[i].first_name
        const lastName = result.data[i].last_name
        const mentorID = result.data[i].mentor_id

        const optionHTML = `<option value = ${mentorID}>${firstName}  ${lastName}</option>`

        mentor_container.append(optionHTML);

        $('select').material_select()
      }
      const placeholder = '<option class= "mentor_container" value="" disabled selected >Please Select Mentor(s)</option>'
      mentor_container.append(placeholder)
      $('select').material_select()

    })


  })





$("#save_button").on("click", function() {

  const workshopName = $("#workshop_name").val()
  const workshopDate = $("#workshop_date").val()
  const workshopStartTime = $("#workshop_start").val()
  const workshopEndTime = $("#workshop_end").val()

  if(workshopName === "" || workshopDate === "" || workshopStartTime === "" || workshopEndTime === "" || mentorsSelected === []) {
    Materialize.toast("All fields are required!", 4000)
  }
  if(new Date(workshopDate) < new Date()) {
    Materialize.toast("Must select a future date!", 4000)
  }


  const mentorsSelected = $("#mentor_container")[0].selectedOptions
  let selectedMentorsArray = []
  for (let i = 0; i < mentorsSelected.length - 1; i++) {
    selectedMentorsArray.push(Number(mentorsSelected[i].value))
  }

  const receivedInfo = {
    name: workshopName,
    mentors: selectedMentorsArray,
    date: workshopDate,
    start_time: workshopStartTime,
    end_time: workshopEndTime
  }
  axios.post('http://localhost:8000/', {receivedInfo})
  .then(function (response){
    console.log(response);
  })
})


//end of document ready
})
