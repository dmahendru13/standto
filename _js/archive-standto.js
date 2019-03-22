//https://alligator.io/js/string-replace/

var showdown = require('showdown');

//
// The purpose of this file is to format the archived standtos in a way that is consistent.
//
(function () {
    'use strict';
    $(function () {
        if ($('body').hasClass('archived-standto-body')) {

            var archivedStandto, archivedLinks, byline, converter, i, stByline, text;

                archivedLinks   = document.querySelector('.archived-standto .hidden .links');
                byline          = document.querySelector('.byline');
                converter       = new showdown.Converter({disableForced4SpacesIndentedSublists: true});

            function getByline() {

                archivedStandto = document.querySelector('.left-column.archived-standto .hidden').textContent,
                stByline        = '<span class="st-byline">' + byline.textContent + '</span>';

                //remove links and byline from standto body, as extracted from json data file
                archivedLinks.parentNode.removeChild(archivedLinks);
                byline.parentNode.removeChild(byline);

                $(stByline).prependTo('.small');

                convertBodyHtml();
                convertLinksHtml();
            }

            function convertBodyHtml() {
                var antioch, ignatius, newIgnatius, para, removeAntioch, updatedAntioch;

                para = document.querySelectorAll('.archived-standto .hidden > p');
                
                if (para) {
                    var content = '';
                    for (i = 0; i < para.length; i++) {
                        var newPara,
                            pio = '';

                        if (para.length > 0) {
                            // this checks to see if there are paragraphs and if so converts them individually to HTML
                            newPara = para[i].textContent;
                            text = converter.makeHtml(newPara);

                            pio = text;
                            
                            if (pio.indexOf('*') > -1) {
                                // this checks to see if there are any astericks in the text after having been converted to HTML and if so, replaces the asterick with the designated text below:
                                
                                // Extract the list from the paragraph && store in variable
                                antioch         = pio.substring(pio.indexOf(": ") +1, pio.length -4);
                                // Remove the list (by virtue of variable name) from the paragraph
                                removeAntioch   = pio.replace(antioch, "");
                                // format list as such
                                updatedAntioch      = antioch.replace(/\*/g, "</li><li>");
                                ignatius        = "<ul><li>" + updatedAntioch + "</li></ul>";
                                newIgnatius     = ignatius.replace("<li> </li>", "");
                                // add the list back into the paragraph.
                                //in the future, this might need to change, depending on where exactly the list resides within the paragraph.
                                // One work around could be replacing the list with '</p> <p>' to format the surrounding text properly and simply using the list as it's own element.
                                pio             = removeAntioch + newIgnatius;
                            }
                            pio = pio;
                        }
                        content += pio;
                    }

                    replaceBodyText(content);
                }
            }

            function replaceBodyText(content) {
                var newText;

                archivedStandto = document.querySelector('.left-column.archived-standto');

                if (content != "") {
                    newText = '<div class="left-column archived-standto">' + content + '</div>';

                    $(archivedStandto).replaceWith(newText);
                } else {
                    console.log("content cannot be found");
                }

            }

            function convertLinksHtml() {
                var longinus, anselm, frank, augustine, athanasius;

                if (archivedLinks) {

                    longinus = archivedLinks.textContent;
                    anselm = converter.makeHtml(longinus);
                    
                    if (anselm) {
                        
                        if (anselm.indexOf(" * ") > -1) {

                            //Format each category of link
                            frank = anselm.replace(/<\/?p>/g, "").replace(/<strong>/g, "<p><strong>").replace(/<\/strong>/g, "<\/strong><\/p>");
                            //format links into lists
                            augustine = frank.replace(/<\/p> \*/g, "<ul><li>").replace(/<\/a><p>/g, "<\/a><\/li><\/ul><p>").replace(/\*/g, "</li><li>").replace(/<\/a>([^<\/a>]*)$/, "<\a></li></ul>");

                            anselm = augustine;

                        }
                    } else {
                        console.log("not available");
                    }

                    //Take formatted list and add it to the page.
                    athanasius = "<div class='links'>" + anselm + "</div>";
                    $(athanasius).appendTo('.left-column.archived-standto');

                } else {
                    console.log('There are no available links');
                }

            }

            getByline();
        } else {
            console.log("not archive page");
        }
    });
})();