$(document).ready(function() {
var WORKSHOP_ID = null
  function getWorkshops() {
    const collection_container = $('.collection')
    axios.get('/workshops').then(result => {
      for (let i = 0; i < result.data.length; i++) {
        const wsId = result.data[i].workshop_id
        const wsStartTime = result.data[i].start_time
        const wsEndTime = result.data[i].end_time
        const wsName = result.data[i].name
        const wsDate = new Date(result.data[i].date)
        const wsMentors = JSON.stringify(result.data[i].mentors)

        const officialDate = `${wsDate
          .getMonth()
          .toString()}-${wsDate
          .getDate()
          .toString()}-${wsDate.getFullYear().toString()}`
        const htmlString = `<a href = '#modal1' id = 'workshop_listing' class = 'collection-item black-text modal-trigger' data-id=${wsId} data-name=${wsName} data-date=${officialDate} data-start_time=${wsStartTime} data-end_time=${wsEndTime} data-mentors=${wsMentors}>${wsName} : ${officialDate}</a>`
        collection_container.append(htmlString)
      }
      setWSClickListener()

      $('.modal').modal()

            $('#delete_button').on('click', function() {
              const workshop_box = $('#workshop_listing')
              console.log($('.collection').getChildren);

              axios.delete(`/workshop/${WORKSHOP_ID}`)
                .then(result => {
                  WORKSHOP_ID = null
                })
              window.location.reload(true);
            })


    })
  }
  getWorkshops()




  $("#create_button").on("click", function() {
    WORKSHOP_ID = null
    $("#workshop_name").val("")
    $("#mentor_container").empty();
    $("#workshop_date").val("");
    $("#workshop_start").val("");
    $("#workshop_end").val("");
    // Delete button disappears when create button is clicked
    let divObj = document.getElementById('delete_button')
    divObj.style.display = 'none'

    const mentor_container = $('#mentor_container')
    axios.get('/mentors').then(result => {
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

  function setWSClickListener (){
  let listingsArray = document.querySelectorAll('#workshop_listing')
  for (let i = 0; i < listingsArray.length; i++) {
    listingsArray[i].onclick = function(event) {
        $("#workshop_name").val("")
        $("#mentor_container").empty();
        $("#workshop_date").val("");
        $("#workshop_start").val("");
        $("#workshop_end").val("");
        $("#workshop_name").val(event.target.dataset.name)
        $("#workshop_date").val(event.target.dataset.date)
        $("#workshop_start").val(event.target.dataset.start_time)
        $("#workshop_end").val(event.target.dataset.end_time)
        WORKSHOP_ID = Number(event.target.dataset.id)
        Materialize.updateTextFields()   // to prevent overlap of value and label
        // $("#mentor_container").val(event.target.dataset.mentors)

        const mentor_container = $('#mentor_container')
        axios.get('/mentors').then(result => {
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
      }
  }
}


  $("#save_button").on("click", function() {

    const workshopName = $("#workshop_name").val()
    const workshopDate = $("#workshop_date").val()
    const workshopStartTime = $("#workshop_start").val()
    const workshopEndTime = $("#workshop_end").val()

    const mentorsSelected = $("#mentor_container")[0].selectedOptions
    let selectedMentorsArray = []
    for (let i = 0; i < mentorsSelected.length - 1; i++) {
      selectedMentorsArray.push(Number(mentorsSelected[i].value))
    }

    if(workshopName === "" || workshopDate === "" || workshopStartTime === "" || workshopEndTime === "" || selectedMentorsArray === []) {
      Materialize.toast("All fields are required!", 4000)
    }
    if(new Date(workshopDate) < new Date()) {
      Materialize.toast("Must select a future date!", 4000)
    }

    const receivedInfo = {
      name: workshopName,
      mentors: selectedMentorsArray,
      date: workshopDate,
      start_time: workshopStartTime,
      end_time: workshopEndTime
    }

    if(WORKSHOP_ID === null){
      axios.post('/workshops', {receivedInfo})
      .then(function (response){
        console.log(response);
      })
    }else{
      console.log(workshopDate);
      axios.put(`/workshop/${WORKSHOP_ID}`, {receivedInfo})
      .then(function (response){
        console.log(response)
      })
    }

    window.location.reload(true);
  })

//end of document ready
})
