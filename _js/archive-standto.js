//var Helper = require('./globals/modules/Helper');
// var showdown  = require('showdown'),
//     converter = new showdown.Converter(),
//     text      = '# hello, markdown!',
//     html      = converter.makeHtml(text);
//     console.log(html);
var showdown = require('showdown');

//
// The purpose of this file is to format the archived standtos in a way that is consistent.
//
(function () {
    'use strict';
    $(function () {
        if ($('body').hasClass('archived-standto-body')) {

            var archivedStandto = document.querySelector('.left-column.archived-standto').textContent,
                byline = document.querySelector('.byline'),
                stByline,
                newBodyText;

            function getByline() {
                stByline = '<span class="st-byline">' + byline.textContent + '</span>';

                byline.parentNode.removeChild(byline);

                $(stByline).prependTo('.small');

                getListItems();
            }

            function getListItems() {
                archivedStandto = document.querySelector('.left-column.archived-standto');
                console.log(archivedStandto)
            }

            getByline();
        } else {
            console.log("not archive page");
        }
    });
})();