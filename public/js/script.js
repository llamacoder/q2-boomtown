$( document ).ready(function() {
  function getWorkshops(){
    const collection_container = $(".collection")
      axios.get('http://localhost:3000/')
        .then(result => {
          for(let i = 0; i < result.data.length; i++){
            let wsName = result.data[i].name
            let wsDate = new Date (result.data[i].date)
            let officialDate = `${wsDate.getMonth().toString()}-${wsDate.getDate().toString()}-${wsDate.getFullYear().toString()}`
            let htmlString = `<a href = '#modal1' class = 'collection-item black-text'>${wsName} : ${officialDate}</a>`
            collection_container.append(htmlString)
//create modal for clickable list link

          }
        });
  }
  getWorkshops();
});
