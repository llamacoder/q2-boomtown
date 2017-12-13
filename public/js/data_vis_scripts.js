$(document).ready(function() {
  function getMessages() {
    const messageArray = []
    axios.get('http://localhost:8000/messages').then(result => {

      for (let i = 0; i < result.data.length; i++) {
        let newObj = {};
        newObj.msgId = result.data[i].message_id
        newObj.wkshpId = result.data[i].workshop_id
        newObj.wkshpName = result.data[i].workshop_name
        newObj.phNum = result.data[i].phone_number
        newObj.msgOut = result.data[i].message_out
        newObj.fdbk = parseInt(result.data[i].feedback)
        // will fdbk be coming in as a string or as a number

        // now do something with this data that is meaningful to you
       messageArray.push(newObj)

      }
      console.log(messageArray)

  })
  return messageArray
}

// This will be needed every time the Analytics file is loaded

// Would this be better as a KNEX QUERY (using AVG?)?
    function calcAvg(array){
      let newArray;
      for (let i = 0; i < array.length; i++){
        newArray += array[i];
      }
      newArray = newArray / array.length;
      return newArray// array of items to be dispersed to bars
}

      function updateUI (newArray){
        // use canvas id
        $('#myChart').on("click", function() {

          // from the previous section ...
          label = newObj.wkshpName.val("")
          data = newObj.fdbk

          window.location.reload();

          // calculated average of each item
          //calcAvg(array)...call the function here to cycle through all of them and populate the list?

        // munge

        // setup chart

      })
    }

// currently this is not created or wired...
      function buttonForRefresh (event){
        // use canvas id
        $('#myChart').on("click", function() {
      window.location.reload();
})
}
getMessages()
calcAvg(array)

  //end of document ready
})
