function createNode(element) {
    return document.createElement(element);
}

function createTextNode(text){
  return document.createTextNode(text);
}

function append(parent, element) {
  return parent.appendChild(element);
}

function requestArtDatabase(){
  return fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=hasImages=true`)
}

function requestIsHighlightArtDatabase(){
  return fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q=hasImages=true`)
}

// function requestDepartmentArtDatabase(){
//   return fetch(`https://collectionapi.metmuseum.org/public/collection/v1/departments`)
// }

function requestObjectIDInformation(id){
  return fetch(id)
}

const gallery = document.querySelector('#art-gallery-container')
var modal = document.querySelector(".modal");
var modal_content = document.querySelector(".modal-content");

window.onload = event => {
  requestArtDatabase().then(response => {
    if(!response.ok){
      throw new Error(response.statusText)
    }
    
    return response.json()
  })
    
    .then(response => {
    document.querySelector('#art-gallery-container').innerHTML = ''
    let config_url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';
    var artworkCounter = 0;

    for( var i = 0; i < 100; i++ ) {
      let artworkURL = config_url + response.objectIDs[i];
      requestObjectIDInformation(artworkURL).then(IDResponse => {
        if(!IDResponse.ok){
          throw new Error(IDResponse.statusText)
        }
        
        return IDResponse.json()
      })

      .then(IDResponse => {
        if(artworkCounter !== 10 && IDResponse.title !== '' && IDResponse.medium !== '' && IDResponse.artistDisplayName !== '' && IDResponse.artistDisplayBio !== '') {
          makeGallery(IDResponse);
          artworkCounter++;
      }

      })
      .catch(function(error) {
        console.log(error);
      });
    }

  })
    
    .catch(function(error) {
      console.log(error);
    });
  }

 var span = document.querySelector(".close");

 span.onclick = function() {
   modal_content.innerHTML = '';
   
   let close = createNode('span');
   close.className = "close";
   close.innerHTML = "&times;";
   append(modal_content, span);

   modal.style.display = "none";
 }

 window.onclick = function(event) {
   if (event.target == modal) {
     modal_content.innerHTML = '';

     let close = createNode('span');
     close.className = "close";
     close.innerHTML = "&times;";
     append(modal_content, span);

     modal.style.display = "none";
   }
 }

function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("hamburger").style.display = "none";
}
function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("hamburger").style.display = "block";
}

function makeGallery(IDResponse) {
  let item_container = createNode('div');
          let img = createNode('img');
          let title = createNode('h2');
          let medium = createNode('p');
          let artistDisplayName = createNode('p');
          let artistDisplayBio = createNode('p');

          item_container.className = "gallery";
          item_container.id = "gallery";
          img.className = "image";
          title.className = "title";
          medium.className = "other-details";
          artistDisplayName.className = "other-details";
          artistDisplayBio.className = "other-details";
          
          img.src = IDResponse.primaryImage;
          title.innerHTML = IDResponse.title;
          medium.innerHTML = IDResponse.medium;
          artistDisplayName.innerHTML = IDResponse.artistDisplayName;
          artistDisplayBio.innerHTML = IDResponse.artistDisplayBio;

          item_container.addEventListener("click", function(event){
              modal.style.display = "block";

              let modal_img = createNode('img');
              let modal_title = createNode('h2');
              let modal_medium = createNode('p');
              let modal_artistDisplayName = createNode('p');
              let modal_artistDisplayBio = createNode('p');

              modal_img.src = event.target.closest('.gallery').children[0].src;
              modal_title.innerHTML = event.target.closest('.gallery').children[1].innerHTML;
              modal_medium.innerHTML = event.target.closest('.gallery').children[2].innerHTML;
              modal_artistDisplayName.innerHTML = event.target.closest('.gallery').children[3].innerHTML;
              modal_artistDisplayBio.innerHTML = event.target.closest('.gallery').children[4].innerHTML;

              append(modal_content, modal_img);
              append(modal_content, modal_title);
              append(modal_content, modal_medium);
              append(modal_content, modal_artistDisplayName);
              append(modal_content, modal_artistDisplayBio);
          });
          
          append(item_container, img);
          append(item_container, title);
          append(item_container, medium);
          append(item_container, artistDisplayName);
          append(item_container, artistDisplayBio);
          append(gallery, item_container);
}

function isHighlight() {
  var checkBox = document.getElementById("isHighlight");
  // ------------------------------------------------ CHECKED ------------------------------------------------ 
  if (checkBox.checked == true){
    //console.log("isHighlight has been checked");
    requestIsHighlightArtDatabase().then(response => {
      if(!response.ok){
        throw new Error(response.statusText)
      }
      
      return response.json()
    })
      
      .then(response => {
      document.querySelector('#art-gallery-container').innerHTML = ''
      let config_url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';
      var artworkCounter = 0;
  
      for( var i = 0; i < 100; i++ ) {
        let artworkURL = config_url + response.objectIDs[i];
        requestObjectIDInformation(artworkURL).then(IDResponse => {
          if(!IDResponse.ok){
            throw new Error(IDResponse.statusText)
          }
          
          console.log("CHECKED: " + artworkURL);
          return IDResponse.json()
        })
  
        .then(IDResponse => {
          if(artworkCounter !== 10 && IDResponse.title !== '' && IDResponse.medium !== '' && IDResponse.artistDisplayName !== '' && IDResponse.artistDisplayBio !== '') {
            makeGallery(IDResponse);
            artworkCounter++;
        }
  
        })
        .catch(function(error) {
          console.log(error);
        });
      }
  
    })
      
      .catch(function(error) {
        console.log(error);
      });
  } 
  // ------------------------------------------------ UNCHECKED ------------------------------------------------ 
  else {
    //console.log("isHighlight has been UNchecked");
    requestArtDatabase().then(response => {
      if(!response.ok){
        throw new Error(response.statusText)
      }
      
      return response.json()
    })
      
      .then(response => {
      document.querySelector('#art-gallery-container').innerHTML = ''
      let config_url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';
      var artworkCounter = 0;
  
      for( var i = 0; i < 100; i++ ) {
        let artworkURL = config_url + response.objectIDs[i];
        requestObjectIDInformation(artworkURL).then(IDResponse => {
          if(!IDResponse.ok){
            throw new Error(IDResponse.statusText)
          }
          console.log("UNCHECKED: " + artworkURL);
          return IDResponse.json()
        })
  
        .then(IDResponse => {
          if(artworkCounter !== 10 && IDResponse.title !== '' && IDResponse.medium !== '' && IDResponse.artistDisplayName !== '' && IDResponse.artistDisplayBio !== '') {
            makeGallery(IDResponse);
            artworkCounter++;
        }
  
        })
        .catch(function(error) {
          console.log(error);
        });
      }
  
    })
      
      .catch(function(error) {
        console.log(error);
      });
  }
}

function departmentFilter(deptID) {
  var checkBox = document.getElementById("isHighlight");
  var currentActive = document.getElementsByClassName("dept active");
  if (currentActive.length === 0){
    console.log("current Active is nothing");
  }
  else {
    console.log("current active is " + currentActive[0].innerHTML);
  }
  //console.log("Current Active is " + currentActive[0].innerHTML);
  //console.log("You clicked on department " + deptID);
  // ------------------------------------------------ CHECKED ------------------------------------------------ 
  if (checkBox.checked == true){
    //console.log("isHighlight has been checked");
    requestIsHighlightArtDatabase().then(response => {
      if(!response.ok){
        throw new Error(response.statusText)
      }
      
      return response.json()
    })
      
      .then(response => {
      document.querySelector('#art-gallery-container').innerHTML = ''
      let config_url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';
      var artworkCounter = 0;
  
      for( var i = 0; i < 1000; i++ ) {
        let artworkURL = config_url + response.objectIDs[i];
        requestObjectIDInformation(artworkURL).then(IDResponse => {
          if(!IDResponse.ok){
            throw new Error(IDResponse.statusText)
          }
          
          console.log("CHECKED: " + artworkURL);
          return IDResponse.json()
        })
  
        .then(IDResponse => {
          console.log("ID Dept is " + IDResponse.department);
          
          if(artworkCounter !== 10 && IDResponse.title !== '' && IDResponse.medium !== '' && IDResponse.department  == deptID) { // artist name and bio are optional for departments because ancient artworks like Egyptian ones won't appear because there are no records of the actual artist and their bios
            console.log("MATCH FOUND");

            makeGallery(IDResponse);
            artworkCounter++;
        }
  
        })
        .catch(function(error) {
          console.log(error);
        });
      }
  
    })
      
      .catch(function(error) {
        console.log(error);
      });
  } 
  // ------------------------------------------------ UNCHECKED ------------------------------------------------ 
  else {
    //console.log("isHighlight has been UNchecked");
    requestArtDatabase().then(response => {
      if(!response.ok){
        throw new Error(response.statusText)
      }
      
      return response.json()
    })
      
      .then(response => {
      document.querySelector('#art-gallery-container').innerHTML = ''
      let config_url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';
      var artworkCounter = 0;
  
      for( var i = 0; i < 1000; i++ ) {
        let artworkURL = config_url + response.objectIDs[i];
        requestObjectIDInformation(artworkURL).then(IDResponse => {
          if(!IDResponse.ok){
            throw new Error(IDResponse.statusText)
          }
          console.log("UNCHECKED: " + artworkURL);
          return IDResponse.json()
        })
  
        .then(IDResponse => {
          console.log("ID Dept is " + IDResponse.department);

          if(artworkCounter !== 10 && IDResponse.title !== '' && IDResponse.medium !== '' && IDResponse.department  == deptID) { // artist name and bio are optional for departments because ancient artworks like Egyptian ones won't appear because there are no records of the actual artist and their bios
            console.log("MATCH FOUND");
            
            makeGallery(IDResponse);
            artworkCounter++;
        }
  
        })
        .catch(function(error) {
          console.log(error);
        });
      }
  
    })
      
      .catch(function(error) {
        console.log(error);
      });
  }
}

// Department Sidebar Buttons
var buttonContainer = document.getElementById("deptChoices");
var deptBars = buttonContainer.getElementsByClassName("dept")
var prevActive = -1;

for (var i = 0; i < deptBars.length; i++) {
  deptBars[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active"); 

    if (current.length > 0) {
      current[0].className = current[0].className.replace(" active", "");
    }

    this.className += " active";

    if(this.id == prevActive) {
      prevActive = this.id; 
      console.log("Prev and Current MATCH");
      this.className = this.className.replace(" active", "");
    }
    else {
      prevActive = this.id;
    } 

  });
}

  // This is a very buggy implementation of B+ but sir I tried my best haha 
  // Problem arises when you press Highlights Only after picking a department among other things for example

  // Also in the initial gallery (without pressing any of the departments yet) it should show all of the artworks
  // with complete details. However, when you press a department, due to to some departments being ancient like 
  // Egyptian art, the artist name and bio aren't recorded so I opted to make the results when filtered by departments
  // into just presenting their Image, title, and medium.

  // So far there's no proper implementation of deactivating the active states AND applying that to what's supposed to show
  // but you can see a very early and VISUALLY working sample of it in the code and website itself

  // Also sir please wait a while because I'm going through 1000 searches every chosen department so it'll take a while each time
  // Also fun fact: Everything is responsive or as responsive as it needs to be

  // Sources:
  // https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data
  // https://www.w3schools.com/howto/howto_css_modals.asp
  // well w3schools for many things 
  // https://www.w3schools.com/howto/howto_js_active_element.asp
  // help from EJ Tiongco and Mik Fuentes
  // https://css-tricks.com/the-checkbox-hack/
