const publicationlist = document.querySelector('#publication-list');

//all publications
const publications = [{
    "title": "Spring Freezes!",
    "firstname": "Author",
    "lastname": "Salisbury",
    "snippet": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam faucibus luctus ligula ac condimentum. Aenean pulvinar leo ipsum, in consequat mi elementum at.",
    "date": "2016",
    "link": "./interior.html",
    "category":"agriculture",
    "img":"./img/farm.jpg"
  },

  {
    "title": "Hopperburn",
    "firstname": "Brian",
    "lastname": "Daley",
    "snippet": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam faucibus luctus ligula ac condimentum. Aenean pulvinar leo ipsum, in consequat mi elementum at.",
    "date": "2017",
    "link": "./interior.html",
    "category":"agriculture",
    "img":"./img/farm.jpg"
  },

  {
    "title": "New Pesticides for Vegetable Production",
    "firstname": "Jane",
    "lastname": "Doe",
    "snippet": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam faucibus luctus ligula ac condimentum. Aenean pulvinar leo ipsum, in consequat mi elementum at.",
    "date": "2018",
    "link": "./interior.html",
    "category":"agriculture",
    "img":"./img/farm.jpg"
  },

  {
    "title": "Another Example",
    "firstname": "Michael",
    "lastname": "Vertefeuille",
    "snippet": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam faucibus luctus ligula ac condimentum. Aenean pulvinar leo ipsum, in consequat mi elementum at.",
    "date": "2019",
    "link": "./interior.html",
    "category":"health",
    "img":"./img/farm.jpg"
  },
  
  {
    "title": "Example",
    "firstname": "John",
    "lastname": "Doe",
    "snippet": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam faucibus luctus ligula ac condimentum. Aenean pulvinar leo ipsum, in consequat mi elementum at.",
    "date": "2020",
    "link": "./interior.html",
    "category":"climate",
    "img":"./img/land.jpg"
  }]

  //alphabetically sort publications by title
publications.sort(function(a,b){
    if (a.title < b.title) {return -1;}
    if (a.title > b.title) {return 1;}
    return 0
})

//display publications
const renderList = publications => {
    publicationlist.innerHTML = '';
    publications.forEach(element => {
        var resourcelabel = document.createElement("p")
        resourcelabel.classList.add("publication-label")
        var resourcelabelspan = document.createElement("span")
        if (element["category"] === "climate"){
          resourcelabelspan.innerHTML = "Climate Adaptation and Resilience"
        }
        if (element["category"] === "health"){
          resourcelabelspan.innerHTML = "Health and Well-being"
        }
        if (element["category"] === "agriculture"){
          resourcelabelspan.innerHTML = "Agriculture and Food"
        }
        resourcelabel.appendChild(resourcelabelspan)
        var resourcelinklink = document.createElement("a")
        resourcelinklink.href = element["link"]
        var resourcetitle = document.createElement("h2")
        resourcetitle.innerHTML = element["title"]
        //var resourcename = document.createElement("h4")
        //resourcename.innerHTML = element["firstname"]+" "+element["lastname"]
        var resourcesnippet = document.createElement("p")
        resourcesnippet.innerHTML = element["snippet"]
        //var resourcedate = document.createElement("p")
        //resourcedate.innerHTML = element["date"]
        var listresource = document.createElement("li")
        var resourceimage = document.createElement("img")
        resourceimage.src = element["img"]
        resourcelinklink.appendChild(resourceimage)
        resourcelinklink.appendChild(resourcelabel)
        resourcelinklink.appendChild(resourcetitle)
        //listresource.appendChild(resourcename)
        //listresource.appendChild(resourcedate)
        resourcelinklink.appendChild(resourcesnippet)
        listresource.appendChild(resourcelinklink)
        listresource.classList.add("publication-block")
        document.querySelector('#publication-list').appendChild(listresource)
    })
  }

  //filtered array of publications
  var filteredArray = []

  //array of filters to apply
  var filtersArray = []

  //how categories are filtered using .filter
  var filtercode = {'category':'filtersArray["category"].includes(element.category)',
                    'date':'element.date === filtersArray["date"]'}

  //filter categories
  let choices = [];
  let yearoption = "";
  const categories = document.querySelectorAll('.category');
  const red = '(filtersArray["category"].includes(element.category)) && element.date === filtersArray["date"]'

  //place the categories into an array within filtersArray
  categories.forEach(category => {
    category.addEventListener('change', () => {
        category.checked ? 
        choices.push(category.value)
        : choices.splice(choices.indexOf(category.value), 1 );
      //console.log(choices)
      //console.log(filteredArray)
      if (choices.length > 0){
        filtersArray["category"] = choices
      }
      else{
        delete filtersArray["category"]
      }
      filterPublications()
    })
  
//place the year into filtersArray
  var yearoption = document.getElementById('year')
  yearoption.onchange = yearfilter
  function yearfilter(){
        if (yearoption.value == 'all'){
            delete filtersArray["date"]
        }
        else{
            filtersArray["date"] = yearoption.value
        }
        filterPublications()
    }


    //using filtersarray, filter the publications and put into filtereedarray
    //take the first filter from filtercode then add additional features with && to hand to the .filter function
    function filterPublications(){
        if (Object.keys(filtersArray).length>0){
            var combinedfilter = filtercode[Object.keys(filtersArray)[0]]
            for (var i=1; i < Object.keys(filtersArray).length; i++){
                combinedfilter += '&&'+filtercode[Object.keys(filtersArray)[i]]
            }
            filteredArray = publications.filter(element => 
                eval(combinedfilter))
        }
        else{
            filteredArray = publications
        }    
        renderList(filteredArray)
    }   
    
    //this really is not a great long term set up if we have a lot of filters
    // function filterPublications(){
    //     if ("category" in filtersArray && "date" in filtersArray){
    //         filteredArray = publications.filter(element => 
    //             (filtersArray["category"].includes(element.category)) && element.date === filtersArray["date"]
    //         )
    //     }
    //     else if ("category" in filtersArray){
    //         filteredArray = publications.filter(element => 
    //             (filtersArray["category"].includes(element.category))
    //         )
    //     }
    //     else if ("date" in filtersArray){
    //         filteredArray = publications.filter(element => 
    //             element.date === filtersArray["date"]
    //         )
    //     }
    //     else {
    //         filteredArray = publications
    //     }
    //     renderList(filteredArray)
    // }

//show all publications on load
renderList(publications)

  })


