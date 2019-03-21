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

            var stByline, archivedStandto, paraSt, para, text, converter, i,
                archivedLinks = document.querySelector('.archived-standto .hidden .links'),
                byline = document.querySelector('.byline');

            function getByline() {
                archivedStandto = document.querySelector('.left-column.archived-standto .hidden').textContent,
                    stByline = '<span class="st-byline">' + byline.textContent + '</span>';

                archivedLinks.parentNode.removeChild(archivedLinks);
                byline.parentNode.removeChild(byline);

                $(stByline).prependTo('.small');

                convertBodyHtml();
            }

            function convertBodyHtml() {
                para = document.querySelectorAll('.archived-standto .hidden > p'),
                    converter = new showdown.Converter({disableForced4SpacesIndentedSublists: true});
                console.log(para);
                if (para) {
                    var bummy = '';
                    for (i = 0; i < para.length; i++) {
                        var newPara,
                            pio = '';

                        if (para.length > 0) {
                            // this checks to see if there are paragraphs and if so converts them individually to HTML
                            newPara = para[i].textContent;
                            text = converter.makeHtml(newPara);

                            pio = text;
                            
                            if (pio.indexOf('*') > -1) {
                                console.log("else if statement success")
                                // this checks to see if there are any astericks in the text after having been converted to HTML and if so, replaces the asterick with the designated text below:
                                var antioch = pio.substring(pio.indexOf(": ") +1, pio.length -4);

                                var removeAntioch = pio.replace(antioch, "");

                                var newAntioch = antioch.replace(/\*/g, "</li><li>");

                                var ignatius = "<ul><li>" + newAntioch + "</li></ul>";

                                var newIgnatius = ignatius.replace("<li> </li>", "");

                                console.log(newIgnatius);

                                pio = removeAntioch + newIgnatius;

                                console.log(pio);
                            }

                            pio = pio;
                        }
                        bummy += pio;
                    }

                    replaceText(bummy);
                }
            }

            function replaceText(bummy) {
                var newText;
                archivedStandto = document.querySelector('.left-column.archived-standto');
//https://alligator.io/js/string-replace/
                if (bummy != "") {
                    newText = '<div class="left-column archived-standto">' + bummy + '</div>';
                    //var testing = newText.textContent;
                    
                    $(archivedStandto).replaceWith(newText);
                } else {
                    console.log("bummy cannot be found");
                }

            }


            getByline();
        } else {
            console.log("not archive page");
        }
    });
})();


// for all intents and purposes, this function "works" but not 100% yet.
// function convertBodyHtml() {
//     para = document.querySelectorAll('.archived-standto .hidden > p'),
//         converter = new showdown.Converter({disableForced4SpacesIndentedSublists: true});
//     console.log(para);
//     if (para) {
//         var bummy = '';
//         for (i = 0; i < para.length; i++) {
//             var newPara,
//                 pio = '';

//             if (para.length > 0) {
//                 // this checks to see if there are paragraphs and if so converts them individually to HTML
//                 newPara = para[i].textContent;
//                 text = converter.makeHtml(newPara);

//                 pio = text;
                
//                 if (pio.indexOf('*') > -1) {
//                     // this checks to see if there are any astericks in the text after having been converted to HTML and if so, replaces the asterick with the designated text below:
//                     console.log('looking for asterick');
//                     var result = pio.replace(/\*/g, "<br> • ");
//                     var newResult = converter.makeHtml(result);
//                     console.log(pio);
//                     pio = newResult;
//                     console.log(pio);
//                 }
//                 console.log(result);
//                 pio = pio;
//             }
//             bummy += pio;
//         }

//         replaceText(bummy);
//     }
// }
