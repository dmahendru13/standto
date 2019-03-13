// Google search: jekyll generate pages from data

//// https://stackoverflow.com/questions/41772360/create-a-page-for-every-data-file












// check the _data/archive directories to see if the data id produces a match.
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty

// GLOBAL VARIABLES
var data, dataId, index, 
  newObj = {},
  Modules = require("./archive-Modules");
// GLOBAL VARIABLES

// LAST WORKING CONFIGURATION
// LAST WORKING CONFIGURATION
// LAST WORKING CONFIGURATION
// LAST WORKING CONFIGURATION
// LAST WORKING CONFIGURATION
// LAST WORKING CONFIGURATION
// LAST WORKING CONFIGURATION
// LAST WORKING CONFIGURATION
// LAST WORKING CONFIGURATION
// LAST WORKING CONFIGURATION
// LAST WORKING CONFIGURATION

(function () {
  function archive() {
    var link = document.querySelectorAll(".article-link");

    // Get the Data Id to pass into the function.
    for (var i = 0; i < link.length; i++) {
      link[i].getAttribute('data-id');
      link[i].onclick = function () {
        // This \/ line is for testing -- not sure if still relevant 13-03-2019
        //e.preventDefault();

        dataId = this.getAttribute('data-id');

        // Store the id of the clicked article in localStorage so that it can be accessed in /standto/
        localStorage.setItem("data-id", dataId);

      }

    }


  }

  archive();
})();

// this function takes the data-id of the selected article and populates the /standto/page with it.
(function () {

  if (window.location.pathname === "/standto/") {
    // Verify that the page is pulling in the article id from localStorage
    document.onload = console.log(localStorage.getItem("data-id"));
    // assign the id to a variable to be used on /standto/
    index = localStorage.getItem("data-id");
    function standto(index) {
      history.pushState(index, "page 2", index);
      data = checkArchives(index);

      var archiveTitle = document.querySelector(".archive-content h1");
      var archiveDate = document.querySelector(".archive-content .small .date");
      var archiveBody = document.querySelector(".archive-content .archive-body");

      archiveTitle.innerHTML = data.title;
      archiveDate.innerHTML = data.date;
      archiveBody.innerHTML = data.body;
    }



    function checkArchives(index) {
      // --Object.keys explanations:
      // //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
      // // How do I loop through or enumerate a JavaScript object?https://stackoverflow.com/questions/684672/how-do-i-loop-through-or-enumerate-a-javascript-object

      Object.keys(Modules).forEach(function (key) {

        newObj = Modules[key];
        if (newObj.hasOwnProperty("id") == true) {

          if (newObj.id == index) {
            data = newObj;

          }

        }

      });

      return data;

    }
    standto(index);
  } else {
    console.log(window.location.href);
  }

})();
