// /*global document,require*/

// var Helper = require('./globals/modules/Helper');

// (function () {
//   'use strict';
//   var sidenavs = document.querySelectorAll('.sidenav-container li a'),
//     i;
  
//   if(sidenavs.length > 0) {
//     new Waypoint({
//       element: document.getElementById('nav-bar'),
//       handler: function (direction) {
//         if (direction === 'down') {
//           Helper.addClass(document.getElementById('sidenav'), 'show');
//         } else {
//           Helper.removeClass(document.getElementById('sidenav'), 'show');
//         }
//       },
//       offset: 265
//     });

//     for (i = 0; i < sidenavs.length; i++) {
//       // IE 9 COMPATIBLE WAY TO RETRIEVE TEXT
//       var parentId = sidenavs[i].getElementsByClassName('title')[0].innerText.toLowerCase();
      
//       waypointSet(parentId, sidenavs[i]);
//     }
//   }

//   function waypointSet(parentId, navElem) {
//     var waypoints = new Waypoint({
//       element: document.getElementById(parentId),
//       handler: function (direction) {
//         clearActive();
//         Helper.addClass(navElem, 'active');
//       },
//       offset: 'bottom-in-view'
//     });
    
//     new Waypoint({
//       element: document.getElementById(parentId),
//       handler: function (direction) {
//         clearActive();
//         Helper.addClass(navElem, 'active');
//       },
//       offset: 68
//     });
//   }

//   function clearActive() {
//     for (i = 0; i < sidenavs.length; i++) {
//       Helper.removeClass(sidenavs[i], 'active');
//     }
//   }

//   $('a[href*=#]:not([href=#])').click(function () {
//     if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') ||
//       location.hostname == this.hostname) {

//       var target = $(this.hash);
//       target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
//       if (target.length) {
//         $('html,body').animate({
//           scrollTop: target.offset().top
//         }, 1000);
//         return false;
//       }
//     }
//   });

// })();