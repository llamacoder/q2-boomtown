$(document).ready(function() {

  let feedback = getFeedback()

  // var messages = [{workshop_name: "Consulting", avgFeedback: 4},
  //             {workshop_name: "Marketing", avgFeedback: 5},
  //             {workshop_name: "Financial Analysis", avgFeedback: 3.2},
  //             {workshop_name: "Funding", avgFeedback: 4.4},
  //             {workshop_name: "Branding", avgFeedback: 4.8},
  //             {workshop_name: "Networking", avgFeedback: 3}]

  // console.log(messages);
  // updateUI(messages)

  //  fetch the messages for the bar chart
  function getFeedback() {
    const feedback = []
    axios.get('/feedback').then(result => {

      for (let i = 0; i < result.data.length; i++) {
        let newObj = {};
        newObj.workshop_name = result.data[i].workshop_name
        newObj.avg = result.data[i].avg

        // now do something with this data that is meaningful to you
        feedback.push(newObj)
      }
      console.log(feedback)
      updateUI(feedback)
    })
    return feedback
  }


  function updateUI (newArray){
    // use canvas id
    let labelArray = newArray.map(ws => ws.workshop_name)
    let dataArray = newArray.map(ws => ws.avg)

      var ctx = document.getElementById("myChart").getContext('2d');  //canvas
      var myChart = new Chart(ctx,
      {
        type: 'horizontalBar',
        data:
        {
          labels: labelArray,
          datasets: [{
            label: 'Ave Feedback', // this can go away if we want
            data: dataArray, // needs to be attached with data

            backgroundColor: [ // graph bar color
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],

            borderColor: [ // border of graph bar
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          legend: {
            display: false
          }, // This legend is "Number of Votes Label"
          title: {
            display: true,
            text: 'BoomTown Feedback Analytics For Mentor Led Workshops',
            fontSize: 25
          },
          scales: {
            yAxes: [{
              ticks: {
                fontSize: 30
              }
            }],
            xAxes: [{
              beginAtZero: true,
              max:5,
              min:0,
              ticks: {
                beginAtZero:true,
                mirror:false,
                suggestedMin: 0,
                suggestedMax: 5,
                fontSize: 22
              },
              afterBuildTicks: function(chart) {

              }
            }]
          }
        }
      });

  }

  $('#refresh_button').on("click", function() {
    getFeedback();
  })

  //end of document ready
})
