// (function () {
//     'use strict';

//  var lightbox = {
//         init: function () {
//             var lb = $('<div>').prop({
//                     'id': 'lightbox',
//                     'class': 'video'
//                 }),
//                 outer_container = $('<div>').prop({
//                     'class': 'container'
//                 }),
//                 inner_container_wrap = $('<div>').prop({
//                     'class': 'lightbox-outer-video-wrap'
//                 }),
//                 inner_container = $('<div>').prop({
//                     'class': 'lightbox-video-wrap'
//                 }),
//                 margin = 0;

//             outer_container.append(
//                 inner_container_wrap.append(
//                     inner_container
//                 )
//             );

//             lb.click(function () {
//                 lightbox.destroy();
//             });

//             margin = $(window).width() > 768 ? 15 : 0;
//             $('#menu, .hamburger, body').css({
//                 'margin-right': margin,
//                 'overflow': 'hidden'
//             });
//             $('body').append(lb.append(outer_container));

//             lightbox.video();
//         },
//         destroy: function () {
//             $('#lightbox').remove();
//             $('#menu, .hamburger, body').css({
//                 'margin-right': '',
//                 'overflow': 'auto'
//             });
//         },
//         video: function () {
//             var h, w = $('#lightbox .container').width();

//             h = Math.floor(w * 9 / 16);

//             var iframe = '<iframe width="' + w + '" height="' + h +
//                 '" src="https://www.youtube.com/embed/videoseries?list=PLX7fWuSKiPwic93tI72slYm1IgpZVd1HL' +
//                 '&autoplay=1&fs=1&rel=0&hd=1&wmode=opaque&enablejsapi=1"' +
//                 ' frameborder="0" allowfullscreen></iframe>';
//             $('#lightbox .lightbox-video-wrap').append(
//                 iframe
//             );
//         }
//     };

//     $('#battle_video').on('click', 'a', function (e) {
//         e.preventDefault();
//         lightbox.init();
//     });

//     }());