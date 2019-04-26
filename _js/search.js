// (function () {
//     if (window.location.search != '') {
//         function getUrlVars() {
//             var vars = {};
//             var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
//                 vars[key] = value;
//             });

//             return vars.query;

//         }

//         getUrlVars();

//         $(window).load(function () {
//             var i = setInterval(function () {
//                 var input = document.querySelector('.ais-search-box--input');

//                 if (input) {
//                     clearInterval(i);

//                     let unfilteredUrl = getUrlVars();

//                     var filteredUrl = unfilteredUrl.replace(/\+/gi, ' ');

//                     let searchBox = document.querySelector('.ais-search-box--input');

//                     searchBox.value = filteredUrl;

//                 }
//             }, 100);
//         });
//     }

// })();