var SocialBar = require('./globals/modules/SocialBar'),
    SubNav = require('./globals/modules/SubNav'),
    Helper = require('./globals/modules/Helper'),
    //Configs = require('./production'),
    Client = require('node-rest-client').Client;

(function () {
    'use strict';

    var subnav = document.getElementsByTagName('nav')[0],
        hash = window.location.hash,
        pathName = window.location.pathname,
        unsubDiv = document.getElementsByClassName('unsubscribe-div')[0],
        unsub = document.querySelectorAll('.focus.subnav-selectable.subnav-selected'),
        subscribeLink = document.getElementsByClassName('sub-link'),
        subBox = document.querySelector('.sub-box'),
        byline = document.querySelector('.byline'),
        archivesBody = document.querySelector('.stand-to .archive'),
        socialbarwaypoint = document.getElementsByTagName('footer')[0],
        oldArchive = document.querySelector('.stand-to.oldarchive'),
        // archiveNav = document.querySelector('.ar-nav-item'),
        // tfBody = document.querySelector('.stand-to .focus.subnav-selectable'),
        // tFocusNav = document.querySelector('.tf-nav-item'),
        // h3Ele = document.getElementsByTagName('h3'),
        //searchForm = document.getElementById('standto_search_form'),
        //archiveDates = document.querySelectorAll('.results-archive .date'),
        i;

    if (subBox) {
        SocialBar.initWaypoint(socialbarwaypoint);

        if (subnav) {
            if (unsubDiv && hash === '#unsubscribe') {
                Helper.removeClass(unsubDiv, 'hidden');
                Helper.addClass(unsub, 'hidden');
                new SubNav(subnav,
                    function () {
                        Helper.addClass(unsubDiv, 'hidden');
                        setResultText(false, '');
                    }, {
                        initializeEmpty: true
                    }
                );
            } else {
                new SubNav(subnav);
            }

        }

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

        /*
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

        /*
         * send email value to client, and process result data
         * @param {str} emailAdd
         * @param {bool} unsub
         */
        function getSubResponse(index, emailAdd, unsub) {
            var client = new Client(),
                subText = (unsub) ? 'unsubscribe' : 'subscribe',
                apiPath = Configs.API_DOMAIN + '/api/v1/' + subText +
                '?email=' + emailAdd;

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

        /*
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

        /*
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
        if (subBox && byline) {
            function moveByline() {
                var stByline = '<span class="st-byline">' + byline.textContent + '</span>';

                //remove links and byline from standto body, as extracted from json data file
                //archivedLinks.parentNode.removeChild(archivedLinks);
                byline.parentNode.removeChild(byline);

                $(stByline).prependTo('.small');
            }
            moveByline();
        }
    }

    if (archivesBody) {
        // TAKEN FROM ORIGINAL archive.js
        // Filter out previous Stand-tos older than X number of weeks
        ! function (a) {
            a.fn.dateFilter = function (b) {
                var c = a.extend({
                    cutoff: new Date,
                    buffer: -40
                }, b);
                c.cutoff.setDate(c.cutoff.getDate() + c.buffer);
                var d = this.parent();
                return this.each(function () {
                    new Date(a(this).data("date-filter")).getTime() < c.cutoff.getTime() && this.remove()
                }), 0 == d.prop("childElementCount"), this
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

        //-----------------
        //  Search
        //--------------------------

        //  Function that searches the on page content and displays results based off of what
        //  the user has entered into the input.

        var searchForm = document.getElementById('standto_search_form');

        searchForm.onkeyup = function () {
            var input = document.querySelector('.archive-search-input'),
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
        };

        //----------------------
        //
        // Displays "No Results found"
        // 
        //----------------------
        // $(document).ready(function () {
        var archiveSearch, base;

        archiveSearch = document.querySelector('.stand-to .archive-search-input');
        base = document.querySelector('.stand-to #archive-results');


        // Hides || shows most recent archives results when using search feature.
        $(archiveSearch).on('keyup', function (e) {
            var baseVeritas = function (veritas) {
                if (!veritas) {
                    $(base).addClass('hidden')
                } else {
                    $(base).removeClass('hidden')
                }
            }

            if (!e) {
                e = window.event;
            }
            
            // Hide archive page results when using SJS
            var hideArchiveResults = function () {
                var inputSearch = false;
                var veritas = '';
                if (archiveSearch.value === '') {
                    inputSearch = true;
                    if (inputSearch) {
                        veritas = true;
                        baseVeritas(veritas);
                    }
                } else {
                    veritas = false;
                    baseVeritas(veritas);
                }
            }   

            hideArchiveResults();

        });
        //});

        // Determines file path based off of hostname.
        var urlPath = function () {
            var hostName, path;

            hostName = window.location.hostname;

            if (hostName === 'localhost' || hostName === '127.0.0.1') {
                path = '';
                return path;
            } else if (hostName === 'static.ardev.us') {
                //if (window.location.pathname === '/standto/') {
                    path = window.location.origin + '/standto';
                    return path;
                //} else 
            } else if (hostName === 'www.army.mil') {
                path = window.location.origin + '/standto';
                return path;
            } else {
                path = '';
                return path;
            }
        }

        var searchPath = function () {
            if (pathName === '/') {
                console.log(pathName);
                return './';
            } else if (pathName === '/standto/') {
                console.log(pathName);
                return './';
            } else {
                console.log(pathName);
                return '../';
            }
        }

        // Declaring Search function
        var sjs = new SimpleJekyllSearch({
            searchInput: document.getElementById('search-input'),
            resultsContainer: document.getElementById('results-container'),
            json: searchPath() + 'search.json',
            searchResultTemplate: '<li><span class="date">{date}</span><a class="article-link" href="' + urlPath() +
                '{url}">{title}</a></li>',
            noResultsText: "<h4>No Results</h4>",
            limit: 20,
            fuzzy: false
        });
        
        // Calling search function
        sjs;
    }

    if (oldArchive) {
        var archivedStandto = document.querySelectorAll('.archived-standto > p'),
            searchText = 'Resources:',
            victoria;

        function balderdash() {
            function isInPage(node) {
                return (node === document.body) ? false : document.body.contains(node);
            }
            if (isInPage(oldArchive)) {

                for (var i = 0; i < archivedStandto.length; i++) {
                    if (archivedStandto[i].textContent === searchText || 'Resources') {
                        victoria = archivedStandto[i];
                        Helper.addClass(victoria, 'body-header');
                        break;
                    } else {
                        console.log('')
                    }
                }
            }

        }

        balderdash();

    }

})();