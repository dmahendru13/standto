var SocialBar = require('./globals/modules/SocialBar'),
    SubNav = require('./globals/modules/SubNav'),
    Helper = require('./globals/modules/Helper'),
    Client = require('node-rest-client').Client;

(function () {
    'use strict';
    var subnav = document.getElementsByTagName('nav')[0],
        hash = window.location.hash,
        pathName = window.location.pathname,
        unsubDiv = document.getElementsByClassName('unsubscribe-div')[0],
        standto = document.querySelector('.main .stand-to'),
        unsub = document.querySelectorAll('.focus.subnav-selectable.subnav-selected'),
        subscribeLink = document.getElementsByClassName('sub-link'),
        subBox = document.querySelector('.sub-box'),
        byline = document.querySelector('.byline'),
        archivesBody = document.querySelector('.stand-to .archive'),
        socialbarwaypoint = document.getElementsByTagName('footer')[0],
        oldArchive = document.querySelector('.stand-to.oldarchive'),
        archiveSearch = document.querySelector('.stand-to .archive-search-input'),
        ar_results = document.querySelector('.stand-to .ar-results'),
        sjs_results = document.querySelector('.stand-to .sjs-results'),
        subHeader = document.querySelector('.results .sjs-results > h5'),
        i;

    var urlPath = function () {
        var hostName, path, origin;

        origin = window.location.origin;
        hostName = window.location.hostname;

        if (hostName === 'localhost' || hostName === '127.0.0.1') {
            path = '';
            return path;
        } else if (hostName === 'static.ardev.us') {
            path = origin + '/standto';
            return path;
        } else if (hostName === 'www.army.mil') {
            path = origin + '/standto';
            return path;
        } else {
            path = '';
            return path;
        }
    }

    SocialBar.initWaypoint(socialbarwaypoint);

    if (subnav) {
        if (unsubDiv && hash === '#unsubscribe') {
            Helper.removeClass(unsubDiv, 'hidden');
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

        //--------------------------
        //  Search
        //--------------------------



        // Hide archive page results when using SJS
        var hideSearchResults = function () {
            var baseVeritas = function (veritas) {

                if (!veritas) {
                    $(ar_results).addClass('hidden');
                    $(sjs_results).removeClass('hidden');
                }
            }
            var hide = function () {
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
            hide();

        }
        var displaySearchValue = function () {
            var text, searchArchives, resultsList, results, ar;

            results = document.querySelector('#results-container > .no-results');
            ar = document.querySelector('.ar-results.hidden');
            text = document.getElementById('search-text');
            searchArchives = document.querySelector('.archive-search .search-box .archive-search-input').value;
            resultsList = document.querySelectorAll('#results-container li').length;

            if (ar && !results) {
                text.innerHTML = searchArchives;
            } else if (ar && results) {
                console.log('fiddle sticks');
                // subHeader.innerHTML = '';
                text.innerHTML = searchArchives;
            } else {
                console.log('reafdafda');
            }
        }

        $(archiveSearch).on('keyup', function (e) {

            if (e.keyCode === 8 || e.keyCode === 46) {
                //subHeader.innerHTML = e.keyCode;
                $(ar_results).removeAttr('class', 'hidden').addClass('ar-results');
                $(sjs_results).attr('class', 'sjs-results hidden');
                this.value = '';
                subHeader.innerHTML = '<h5>RESULTS FOR "<span id="search-text">placeholder</span>"</h5>'

            } else if (!(e.keyCode === 8 || e.keyCode === 46)) {
                if (this.value.length < 1) return;

                hideSearchResults();
                displaySearchValue();
            }
        });

        var searchPath = function () {
            if (pathName === '/') {
                return './';
            } else if (pathName === '/standto/') {
                return './';
            } else {
                return '../';
            }
        }

        // Declaring Search function
        var sjs = new SimpleJekyllSearch({
            searchInput: document.getElementById('search-input'),
            resultsContainer: document.getElementById('results-container'),
            json: searchPath() + 'search.json',
            searchResultTemplate: '<li class="archive-st"><p><span class="date archive-date">{date}</span><a class="article-link" href="' + urlPath() + '{url}">{title}</a></p></li>',
            noResultsText: '<div class="no-results"><h3>No Results</h3><p>Sorry, We couldn&#39;t find anything that matches your search. Please try again</p></div>',
            limit: 35,
            fuzzy: false,
        });

        // Calling search function
        sjs;

    }

    if (oldArchive) {
        var archivedStandto = document.querySelectorAll('.archived-standto > p'),
            searchText = 'Resources:',
            victoria;

        function formatBullets() {
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
                        console.log('No resources found');
                    }
                }
            }
        }
        formatBullets();
    }

    // this function is meant to account for different link paths between local, dev, and prod environments.
    var socialMediaLinks = function () {
        var socialMedia = document.querySelector('.alt-social-bar');

        if (standto) {
            var tw, fb, rdt, ln, siteHref, pageTitle, socialArr;

            siteHref = window.location.href;
            pageTitle = document.querySelector('.stand-to .focus .container div > h1').textContent;
            socialArr = [];

            $(window).on('load resize', function () {
                getSocial();
            });

            // this function gets the a tag for the social media links on both mobile and desktop
            function getSocial() {
                if (document.body.clientWidth >= 769) {
                    tw = document.querySelector('.alt-social-bar .twitter-button a');
                    fb = document.querySelector('.alt-social-bar .facebook-button a');
                    rdt = document.querySelector('.alt-social-bar .reddit-button a');
                    ln = document.querySelector('.alt-social-bar .linkedin-button a');

                    socialArr = [tw, fb, rdt, ln];
                } else if (document.body.clientWidth <= 768) {
                    tw = document.querySelector('.social-bar .twitter-button a');
                    fb = document.querySelector('.social-bar .facebook-button a');
                    rdt = document.querySelector('.social-bar .reddit-button a');
                    ln = document.querySelector('.social-bar .linkedin-button a');

                    socialArr = [tw, fb, rdt, ln];
                }
                changeUrl(socialArr);
            }

            // this function takes the a tag from getSocial() function and adds the link specific content
            function changeUrl(arr) {
                var newSocialArr = [];

                for (var i = 0; i < arr.length; i++) {

                    newSocialArr.push(new URL(arr[i].getAttribute('href')));

                    var thisUrl = newSocialArr[i].origin + newSocialArr[i].pathname;

                    if (newSocialArr[i].hostname == 'twitter.com') {

                        thisUrl += '?url=';
                        thisUrl += siteHref;
                        thisUrl += '&amp;text=';
                        thisUrl += pageTitle;

                        tw.setAttribute('href', thisUrl);

                    } else if (newSocialArr[i].hostname == 'www.facebook.com') {

                        thisUrl += '?app_id=1466422700342708&amp;';
                        thisUrl += 'display=popup&amp;link=';
                        thisUrl += siteHref;
                        thisUrl += '&amp;description=Check%20out%20today%27s%20STAND-TO%21';
                        thisUrl += pageTitle;
                        thisUrl += '&amp;picture=&amp;redirect_uri=http%3A%2F%2Fwww.army.mil%2Fstandto';

                        fb.setAttribute('href', thisUrl);

                    } else {
                        if (newSocialArr[i].hostname == 'www.reddit.com') {

                            thisUrl += '?url=';
                            thisUrl += siteHref;

                            rdt.setAttribute('href', thisUrl);

                        } else {

                            thisUrl += '?url=';
                            thisUrl += siteHref;

                            ln.setAttribute('href', thisUrl);
                        }
                    }
                }
            }
        }
    }

    socialMediaLinks();

})();