var SocialBar = require('./globals/modules/SocialBar'),
    SubNav = require('./globals/modules/SubNav'),
    Helper = require('./globals/modules/Helper'),
    Client = require('node-rest-client').Client;

(function () {
    'use strict';
    var hash = window.location.hash,
        subnav = document.getElementsByTagName('nav')[0],
        byline = document.querySelector('.byline'),
        subBox = document.querySelector('.sub-box'),
        standto = document.querySelector('.stand-to .main'),
        pathName = window.location.pathname,
        unsubDiv = document.getElementsByClassName('unsubscribe-div')[0],
        subHeader = document.querySelector('.results .sjs-results > h5'),
        oldArchive = document.querySelector('.stand-to.oldarchive'),
        ar_results = document.querySelector('.stand-to .ar-results'),
        sjs_results = document.querySelector('.stand-to .sjs-results'),
        archivesBody = document.querySelector('.stand-to .archive'),
        subscribeLink = document.getElementsByClassName('sub-link'),
        archiveSearch = document.querySelector('.stand-to .archive-search-input'),
        socialbarwaypoint = document.getElementsByTagName('footer')[0],
        i;

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

        var hide = function (func) {
            var inputSearch = false;
            var veritas = '';
            if (archiveSearch.value === '') {
                inputSearch = true;
                if (inputSearch) {
                    veritas = true;
                    func(veritas);
                }
            } else {
                veritas = false;
                func(veritas);
            }
        }

        // Hide archive page results when using SJS
        var hideSearchResults = function () {
            var baseVeritas = function (veritas) {

                if (!veritas) {
                    $(ar_results).addClass('hidden');
                    $(sjs_results).removeClass('hidden');
                } else {
                    $(ar_results).removeAttr('class', 'hidden').addClass('ar-results');
                    $(sjs_results).attr('class', 'sjs-results hidden');
                }
            }
            hide(baseVeritas);
        }

        // Formats text for search results "XX results For 'F'"
        var displaySearchValue = function () {
            var count, text, searchArchives, result, no_results, archiveResultsLength;

            text = document.getElementById('search-text');
            count = document.getElementById('results-count');
            result = document.getElementById('results');
            no_results = document.querySelector('#results-container > .no-results');
            searchArchives = document.querySelector('.archive-search .search-box .archive-search-input').value;
            archiveResultsLength = document.querySelectorAll('#results-container .archive-st');

            if (!no_results) {
                text.textContent = searchArchives;
                count.textContent = archiveResultsLength.length;

                if (archiveResultsLength.length == 1) {
                    result.textContent = 'RESULT';
                } else {
                    result.textContent = 'RESULTS';
                }
            } else {
                $('.sjs-results > h5').addClass('hidden');
                $('.sjs-results > h2').addClass('hidden');
            }

            expandSearchResults(archiveResultsLength);
        }

        // Adds button && then functionality to the button that then shows additional search results.
        var expandSearchResults = function (len) {
            var resultsBtn = document.querySelector('.sjs-results .headlines .btn.refine-btn');
            var addResults = '';

            addResults += "<div class='btn refine-btn'><div><div><span></span><span></span><span></span><span></span><span></span><span></span></div><input class='view-more' type='button' value='View More'></div></div>";

            // addResults += "<div class='btn refine-btn'>";
            // addResults += "<div>";
            // addResults += "<div>";
            // addResults += "<span></span>";
            // addResults += "<span></span>";
            // addResults += "<span></span>";
            // addResults += "<span></span>";
            // addResults += "<span></span>";
            // addResults += "<span></span>";
            // addResults += "</div>";
            // addResults += "<input class='view-more' type='button' value='View More'>";
            // addResults += "</div>";
            // addResults += "</div>";

            $('.archive-st:gt(9)').hide().last();

            if (len.length > 10) {
                if (resultsBtn !== null ) {
                    return
                } else {
                    $(addResults).insertAfter('.headlines #results-container').on('click', function(){
                        var a = this;
                        // $('.archive-st:not(:visible):lt(10)').fadeIn(500, function(){
                        //     if ($('.archive-st:not(:visible)').length == 0) $(a).fadeOut(400, 'linear', function() {
                        //         this.remove();
                        //     });
                        // }); return false;
                        $('.archive-st:not(:visible):lt(10)').each(function(i){
                            console.log($(this).text());
                            console.log(i);
                            $(this).delay(100*i).fadeIn('fast', function () {
                                if ($('.archive-st:not(:visible)').length == 0) $(a).addClass('hidden').remove();
                            });
                        }); return false;
                    });
                }
            } else {
                $(resultsBtn).remove();
            }
        }

        $(document).ready(function () {
            sjs;

            // Watches for keyup and subsecuently hides/shows archive search && results text
            $(archiveSearch).on('keyup', function (e) {
                hideSearchResults();
                if (!(e.keyCode === 13)) {
                    if ($('.sjs-results > h5').hasClass('hidden')) {
                        $('.sjs-results > h5').removeClass('hidden');
                    }
                    if ($('.sjs-results > h2').hasClass('hidden')) {
                        $('.sjs-results > h2').removeClass('hidden');
                    }
                }
            });

            // Watching for DOM manipulation
            var target = document.querySelector('#results-container');

            var config = {
                childList: true
            };

            var archive = function () {
                displaySearchValue();
            }

            var observer = new MutationObserver(archive);

            observer.observe(target, config);
            // Watching for DOM manipulation
        });

        // format url path for sjs below.
        var searchPath = function () {
            if (pathName === '/' || pathName === '/standto/') {
                console.log(pathName);
                return './';
            } else {
                console.log(pathName);
                return '../';
            }
        }

        // format url path for sjs links below.
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

        // Declaring Search function
        var sjs = new SimpleJekyllSearch({
            searchInput: document.getElementById('search-input'),
            resultsContainer: document.getElementById('results-container'),
            json: searchPath() + 'search.json',
            searchResultTemplate: '<li class="archive-st"><span class="date">{date}</span><a class="article-link" href="' + urlPath() + '{url}">{title}</a></li>',
            noResultsText: '<div class="no-results"><h2>No Results</h2><p>Sorry, We couldn&#39;t find anything that matches your search. Please try again.</p></div>',
            limit: 50,
            fuzzy: false
        });

        // Calling search function
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
    var shareLinks = function () {
        if (standto) {
            var tw, fb, rdt, ln, emailLink, route, siteHref, pageTitle, socialArr;

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
                    emailLink = document.querySelector('.alt-social-bar .email-button a');

                    socialArr = [tw, fb, rdt, ln];
                } else if (document.body.clientWidth <= 768) {
                    tw = document.querySelector('.social-bar .twitter-button a');
                    fb = document.querySelector('.social-bar .facebook-button a');
                    rdt = document.querySelector('.social-bar .reddit-button a');
                    ln = document.querySelector('.social-bar .linkedin-button a');
                    emailLink = document.querySelector('.social-bar .email-button a');

                    socialArr = [tw, fb, rdt, ln];
                }
                changeSocialLinks(socialArr);
                email(emailLink, siteHref);
            }

            // this function takes the a tag from getSocial() function and adds the link specific content
            function changeSocialLinks(arr) {
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

            function email(param1, param2) {
              route = param1.getAttribute('href');
              route += param2;
              param1.setAttribute('href', route);
            }        
        }
    }
    shareLinks();
})();