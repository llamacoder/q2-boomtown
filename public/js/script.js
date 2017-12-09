$( document ).ready(function() {
  function getWorkshops(){
    const collection_container = $(".collection")
      // axios.get('/')
      //   .then(result => {
          for(let i = 0; i < result.length; i++){
            let wsName = result[i].name
            let wsDate = result[i].date
            let htmlString = `<a href = '#modal1' class = 'collection-item black-text'>${wsName} ${wsDate}</a>`
            collection_container.append(htmlString)
//create modal for clickable list link

          }
        // });
  }
  getWorkshops();
});
