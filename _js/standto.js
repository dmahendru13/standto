var SocialBar = require('./globals/modules/SocialBar'),
    //SubNav = require('./globals/modules/SubNav'),
    Helper = require('./globals/modules/Helper'),
    //Configs = require('./production'),
    Client = require('node-rest-client').Client;

(function () {
    $(function () {
        if ($('.sub-box')[0]) {
            (function () {
                // TAKEN FROM subscribe.js
                'use strict';
                var subnav = document.getElementsByTagName('nav')[0],
                    hash = window.location.hash,
                    unsubDiv = document.getElementsByClassName('unsubscribe-div')[0],
                    h3Ele = document.getElementsByTagName('h3'),
                    subscribeLink = document.getElementsByClassName('sub-link'),
                    //searchForm = document.getElementById('standto_search_form'),
                    //archiveDates = document.querySelectorAll('.results-archive .date'),
                    socialbarwaypoint = document.getElementsByTagName('footer')[0],
                    i;

                SocialBar.initWaypoint(socialbarwaypoint);

                if (subnav) {
                    if (unsubDiv && hash === '#unsubscribe') {
                        Helper.removeClass(unsubDiv, 'hidden');
                        Helper.addClass(unsub, 'hidden');
                    }
                }

                //Add special classes to markup headings
                // for (i = 0; i < h3Ele.length; i++) {
                //     if (h3Ele[i].innerHTML.toLowerCase() == 'resources:' ||
                //         h3Ele[i].innerHTML.toLowerCase() == 'related video:' ||
                //         h3Ele[i].innerHTML.toLowerCase() == 'related documents:') {
                //         h3Ele[i].setAttribute('class', 'body-header');
                //     }
                // }

                // ----------------------------------------------------------------------
                // Subscribe/Unsubscribe
                // ----------------------------------------------------------------------
                // add click to sub/unsub buttons
                for (i = 0; i < subscribeLink.length; i++) {
                    subscribeLink[i].setAttribute('data-email', i);
                    subscribeLink[i].onclick = function () {
                        var unsub = (this.value.toLowerCase() === 'unsubscribe');
                        getEmailValue(this.getAttribute('data-email'), unsub);
                    };
                }

                /**
                 * gets email input that cooresponds to subscribe button,
                 * then sends the email value to be processed
                 * @param {int} index
                 * @param {bool} unsub
                 */
                function getEmailValue(index, unsub) {
                    var emailInput = document.getElementsByClassName('email-input');

                    if (emailInput.length > index) {
                        setResultText(index, '...');
                        getSubResponse(index, emailInput[index].value, unsub);
                    }
                }

                /**
                 * send email value to client, and process result data
                 * @param {str} emailAdd
                 * @param {bool} unsub
                 */
                function getSubResponse(index, emailAdd, unsub) {
                    var client, subText, Configs, apiPath;
                    client = new Client(),
                        subText = (unsub) ? 'unsubscribe' : 'subscribe',
                        Configs = window.Configs || {};

                    // This returns the following error:
                    // Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at https://api.army.mil/api/v1/subscribe?email=ji. (Reason: CORS header ‘Access-Control-Allow-Origin’ does not match ‘https://www.army.mil’).
                    Configs.API_DOMAIN = 'https://api.army.mil';
                    window.Configs = Configs;
                    // This returns the following error:
                    // Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at https://api.army.mil/api/v1/subscribe?email=ji. (Reason: CORS header ‘Access-Control-Allow-Origin’ does not match ‘https://www.army.mil’).

                    apiPath = Configs.API_DOMAIN + '/api/v1/' + subText + '?email=' + emailAdd;

                    console.log(apiPath);

                    if (emailAdd === '') {
                        setResultText(index, 'Please enter a valid email.');
                    } else {
                        client.get(
                            apiPath,
                            function (data, response) {
                                processResultData(index, data, subText);
                            }
                        );
                    }
                }

                /**
                 * Receives data from request and generates appropriate response
                 * @param {obj} data
                 * @param {str} subText ('subscribe'/'unsubscribe')
                 */
                function processResultData(index, data, subText) {
                    var good = false,
                        resultText = '';

                    if (typeof data.error != 'undefined') {
                        resultText = 'You were unable to ' +
                            subText + '. Invalid email provided.';
                    } else if (data.success === true) {
                        resultText = 'Your ' + subText + ' request has been received.' + ' Please check your email for confirmation.';

                        if (subText == 'unsubscribe') {
                            resultText = "You have been unsubscribed from receiving the Army's daily focus in <a href='https://www.army.mil/standto'>STAND-TO!</a>.";
                        }

                        good = true;
                    } else {
                        resultText = 'You were unable to ' +
                            subText + '. Please try again.';
                    }

                    setResultText(index, resultText, good);
                }

                /**
                 * sets the result text of the subscribe request
                 * @param {str} result
                 * @param {bool} good
                 */
                function setResultText(index, result, good) {
                    var i, subResults = document.getElementsByClassName('sub-results');

                    for (i = 0; i < subResults.length; i++) {
                        if (index) {
                            if (i == index) {
                                subResults[i].innerHTML = result;
                                if (good) {
                                    Helper.addClass(subResults[i], 'good');
                                } else {
                                    Helper.removeClass(subResults[i], 'good');
                                }
                            }
                        } else {
                            subResults[i].innerHTML = result;
                            Helper.removeClass(subResults[i], 'good');
                        }
                    }
                }

            })();

            if ($('.sub-box')[0] && $('body').hasClass('archived-standto-body')) {
                moveByline();
            }
        } else if ($('body').hasClass('archive-body')) {
            (function () {
                // TAKEN FROM ORIGINAL archive.js
                // Filter out previous Stand-tos older than X number of weeks
                !function (a) {
                    a.fn.dateFilter = function (b) {
                        var c = a.extend({ cutoff: new Date, buffer: -35 }, b); c.cutoff.setDate(c.cutoff.getDate() + c.buffer); var d = this.parent(); return this.each(function () { new Date(a(this).data("date-filter")).getTime() < c.cutoff.getTime() && this.remove() }), 0 == d.prop("childElementCount"), this
                    }
                }(jQuery);

                $('.headlines ul#archive-results li').dateFilter();

                $(function () {
                    if ($('.headlines ul#archive-results li').length == -1) {

                        var results = document.getElementById('results-text'),
                            noResults = document.getElementById('no-results-text');

                        Helper.removeClass(noResults, 'hidden');
                        Helper.addClass(results, 'hidden');

                    }
                });

            })();


            (function () {
                'use strict';
                var searchForm = document.getElementById('standto_search_form');
                if (window.location.pathname == '/archive/' || window.location.pathname == '/standto/archive/') {

                    //-----------------
                    //  Search
                    //--------------------------

                    //  Function that searches the on page content and displays results based off of what
                    //  the user has entered into the input.

                    searchForm.onkeyup = function () {
                        var input = document.getElementById('archive-search-input'),
                            filter = input.value.toUpperCase(),
                            ul = document.getElementById('archive-results'),
                            li = ul.getElementsByTagName('li'),
                            i = 0;

                        for (i = 0; i < li.length; i++) {
                            var a = li[i].getElementsByTagName('a')[0],
                                txtValue = a.textContent || a.innerText;

                            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                                Helper.removeClass(li[i], 'hidden');
                            } else {
                                Helper.addClass(li[i], 'hidden');
                            }
                        }
                        results(li);
                    };

                    //----------------------
                    //
                    // Displays "No Results found"
                    // 
                    //----------------------

                    // if the input search produces no results
                    // Alternatively, if the user has searched for something that has produced no results,
                    // then

                    function results(li) {
                        var results = document.getElementById('results-text'),
                            noResults = document.getElementById('no-results-text'),
                            listItems = document.querySelectorAll('li.hidden');

                        if (listItems.length == li.length) {
                            Helper.removeClass(noResults, 'hidden');
                            Helper.addClass(results, 'hidden');
                        } else {
                            Helper.addClass(noResults, 'hidden');
                            Helper.removeClass(results, 'hidden');
                        }
                    }


                    //--------------------------
                    // GovSearch StandTo Search
                    //--------------------------
                    searchForm.onsubmit = function (e) {
                        if (this.query.value === '') {
                            e.preventDefault();
                            return false;
                        } else {
                            this.query.value = 'stand to ' + this.query.value;
                            return true;
                        }
                    };
                }
            })();
        }
    });
    // TAKEN FROM archived-standto.js
    function moveByline() {
        var byline = document.querySelector('.byline');
        var stByline = '<span class="st-byline">' + byline.textContent + '</span>';

        //remove links and byline from standto body, as extracted from json data file
        //archivedLinks.parentNode.removeChild(archivedLinks);
        byline.parentNode.removeChild(byline);

        $(stByline).prependTo('.small');
    }

})();