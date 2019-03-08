// https://github.com/christian-fei/Simple-Jekyll-Search

//https://stackoverflow.com/questions/9703117/variable-in-json-path

//https://github.com/facebook/react-native/issues/6391

var Data = require('../_data/archive/year/month/18-day.json'),
    Helper = require('./globals/modules/Helper');

(function () {
  var link = document.querySelectorAll(".article-link"),
      content = document.querySelector('div.archive');;

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
      // console.log(this.getAttribute('data-id'));
      checkArchives(this.getAttribute('data-id'));
    }

  }

  // check the archive directories to see if the data id produces a match.
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
  function checkArchives(index) {
    //console.log(index);
    // console.log(typeof index);
    // console.log(Data);
    if ((Data.hasOwnProperty("id")) == true) {
      if (Data.id == index) {
        console.log(Data.id);
        console.log("great success");
        
        displayArchive();
        
      } else {
        console.log('you clicked this: ' + index);
        //location.reload(true);
        //console.log(false);
      }
    }
  }

  function displayArchive() {
    window.location.href = "/standto/"; 
  }

  // link.onclick = function (link) {
  //   if(this.href) {
  //     link.preventDefault();
  //     return false;
  //   } else {
  //     var newLink = this.getAttribute('href');
  //     newLink.setAttribute('href', linkId);
  //     console.log(newLink);
  //   }
  // }
  // link.onclick = function () {
  //   var e = this.getAttribute('href');
  //   e
  //   //window.location = ""
  //   window.location.href = 'http://stackoverflow.com';
  //redirectUrl(e);
  // jekyll dynamic sites:
  // --https://medium.com/tmw-interactive/creating-dynamic-layouts-with-jekyll-3bbb7fc57d1f
  //    --https://dev.to/mrmartineau/creating-dynamic-layouts-with-jekyll

  //alert(e);

  // };

  // function redirectUrl(e) {
  //   alert(e);
  // }

})();
