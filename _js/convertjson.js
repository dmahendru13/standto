// https://github.com/christian-fei/Simple-Jekyll-Search

//https://stackoverflow.com/questions/9703117/variable-in-json-path

//https://github.com/facebook/react-native/issues/6391

var Data = require('url');

(function () {
  var link = document.querySelector(".article-link");

  // create variable to pull in different data files
  (function printUrl() {
    var urlBase = './_data/archive/',
      base = '-date.json',
      year = ['year'],
      month = ['month'],
      num = 1,
      i = 1;

    for (i = 1; i <= 31; i++) {
      //var num = 1;
      if (base) {
        var url = num + base;
      }
      num++;
      url = urlBase + year[0] + "/" + month[0] + "/" + url;
      console.log(url);
    }
    return url;
  })();

  console.log(Data);

  // LEFT OFF HERE 
  // LEFT OFF HERE 
  // LEFT OFF HERE 
  // LEFT OFF HERE 
  for (var i = 0; i < link.length; i++) {
    var dataId = link[i].getAttribute('data-id');
    link.onclick = function () {
      alert(dataId);
    };
  }
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
