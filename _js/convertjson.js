
// https://github.com/christian-fei/Simple-Jekyll-Search

//https://stackoverflow.com/questions/9703117/variable-in-json-path

//https://github.com/facebook/react-native/issues/6391

var Data = require('../_data/archive/year/month/18-day.json'),
  Helper = require('./globals/modules/Helper');

function selectFunction() {
  if (window.location.href === 'http://localhost:4000/standto/') {
    standto(Data);
} else if (window.location.href === 'http://localhost:4000/archive/') {
    archive();
    
    console.log(window.location.href);

  } else {
    console.log(window.location.href + " failure");
  }
}

selectFunction();

function archive() {
  var link = document.querySelectorAll(".article-link"),
    content = document.querySelector('div.archive');

  // create variable to pull in different data files
  //  Add this back to the global variables when done testing.
  // Data = require('url')
  // (function printUrl() {
  //   var urlBase = './_data/archive/',
  //     base = '-date.json',
  //     year = ['year'],
  //     month = ['month'],
  //     num = 1,
  //     i = 1;

  //   for (i = 1; i <= 31; i++) {
  //     //var num = 1;
  //     if (base) {
  //       var url = num + base;
  //     }
  //     num++;
  //     url = urlBase + year[0] + "/" + month[0] + "/" + url;
  //     // use to test path to DATA FILES console.log(url);
  //   }
  //   return url;
  // })();

  //Verify that I'm pulling in the data files
  //console.log(Data);

  // Get the Data Id to pass into the function.
  for (var i = 0; i < link.length; i++) {
    link[i].getAttribute('data-id');
    link[i].onclick = function () {

      checkArchives(this.getAttribute('data-id'));
    }

  }

  // check the _data/archive directories to see if the data id produces a match.
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
  function checkArchives(index) {

    if ((Data.hasOwnProperty("id")) == true) {

      if (Data.id == index) {
        console.log(Data);
        alert(Data.id);
        //alert(Data.id);

        return Data;

      } else {
        console.log('you clicked this: ' + index);
      }
    }
  }

  // function printData(Data) {
  //   //console.log(Data);
  //   console.log(window.location.href);
  //   var archiveContent = Data;

  //   var print = document.getElementById("archive-content");
  //   print.innerHTML = archiveContent.title;

  //   console.log(archiveContent.title);
  // }

}

function standto(Data) {
    console.log(Data);

    var print = document.getElementById("archive-content");

    print.innerHTML = Data.title;
    // if (window.location.href == 'http://localhost:4000/standto/') {
    //   console.log(window.location.href)
    // } else {
    //   console.log(window.location.href);
    // }
}



