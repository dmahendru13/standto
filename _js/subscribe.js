// https://stackoverflow.com/questions/51906675/pure-js-json-parsing-with-many-objects-from-local-json-file

//https://stackoverflow.com/questions/4295386/how-can-i-check-if-a-value-is-a-json-object

var SocialBar = require('./globals/modules/SocialBar'),
    //SubNav = require('./globals/modules/SubNav'),
    Helper = require('./globals/modules/Helper'),
    //Client = require('node-rest-client').Client,
    Emails = require('../_data/email-dummy-data/emails.json');

(function () {

    'use strict';
    var subscribeLink = document.getElementsByClassName('sub-link'),
        href = window.location.href,
        unsubDiv = document.getElementsByClassName('unsubscribe-div')[0],
        subnav = document.getElementsByTagName('nav')[0],
        socialbarwaypoint = document.getElementsByTagName('footer')[0],
        i;

    SocialBar.initWaypoint(socialbarwaypoint);

    //Display Unsubscribe box:
    // if (subnav) {
    //     if (unsubDiv && href === '#unsubscribe') {
    //         Helper.removeClass(unsubDiv, 'hidden');
    //         new SubNav(subnav,
    //             function () {
    //                 Helper.addClass(unsubDiv, 'hidden');
    //                 setResultText(false, '');
    //             },
    //             { initializeEmpty: true }
    //         );
    //     } else {
    //         new SubNav(subnav);
    //     }
    // }

    // ----------------------------------------------------------------------
    // Subscribe/Unsubscribe
    // ----------------------------------------------------------------------
    // add click to sub/unsub buttons
    for (i = 0; i < subscribeLink.length; i++) {
        subscribeLink[i].setAttribute('data-email', i);
        subscribeLink[i].onclick = function() {
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
    * Send email value to client, and process result data
    * @param {str} emailAdd
    * @param {bool} unsub
    */
    function getSubResponse(index, emailAdd) {
        var response = Emails;
        //https://stackoverflow.com/questions/6384421/check-whether-a-value-exists-in-json-object
        if (emailAdd === '') {
            setResultText(index, 'Please enter a valid email.');
        } else {
            var hasMatch = false;
            for (var i = 0; i < response.length; ++i) {
                var data = response[i];
                if (data.email == emailAdd) {
                    hasMatch = true;
                    // subSuccess(emailAdd);
                    // setResultText(index, '');
                    processResultData(index, hasMatch, emailAdd);
                    break;
                } else {
                    // subFail(emailAdd);
                    // setResultText(index, '');
                    processResultData(index, hasMatch, emailAdd);
                    console.log("failure");
                }
            }
        }
    }

    /*
    * Success msg to display if the email has already been added to the subscribe list.
    */
    // function subSuccess(emailAdd) {
    //     var success = document.getElementById('sub-results');
    //     success.innerHTML = '<span class="success">The email you submitted:<br />' + '<span class="email-span">' + emailAdd + '</span>' + '<br /> is already subscribed to receive the Stand-To! email.</span>';
    //     //alert(success);
    // }

    // function subFail() {
    //     var fail = document.getElementById('sub-results');
    //     fail.innerHTML = '<span class="fail">You were unable to subscribe. Please try again.</span>';
    // }

    function processResultData(index, hasMatch, emailAdd) {
        var good = false,
            resultText = '';
        if (emailAdd == '' || hasMatch == false) {
            resultText = 'Please enter a valid email.';
        } else if (emailAdd != '' || hasMatch == true) {
            resultText = 'The email you submitted:<br />' + '<span class="email-span">' + emailAdd + '</span>' + '<br /> is already subscribed to receive the Stand-To! email.';
            good = true;
        } else {
            resultText = '<span class="fail">You were unable to subscribe. Please try again.</span>';
        }
        setResultText(index, resultText, good);
    }

    function setResultText(index, result, good) {
        var i,
            subResults = document.getElementsByClassName('sub-results');

        for (i = 0; i < subResults.length; i++) {
            if (index) {
                if (i == index) {
                    subResults[i].innerHTML = result;
                    if (good) {
                        Helper.addClass(subResults[i], 'good');
                    } else {
                        Helper.removeClass(subResults[i], 'good');
                    }
                } else {
                    subResults[i].innerHTML = result;
                    Helper.removeClass(subResults[i], 'good');
                }
            }
        }
    }

    /**
    * Receives data from request and generates appropriate response
    * @param {obj} data
    * @param {str} subText ('subscribe'/'unsubscribe')
    */
    // function processResultData(index, data, subText) {
    //     var good = false,
    //         resultText = '';
    //     if (typeof data.error != 'undefined') {
    //         resultText = 'You were unable to ' + subText + '. Invalid email provided.';
    //     } else if (data.success === true) {
    //         resultText = 'Your ' + subText + ' request has been received.' + ' Please check your email for confirmation.';
    //         if (subText == 'unsubscribe') {
    //             resultText = 'You have been unsubscribed from receiving the Army\'s daily focus in <a href="https://www.army.mil/standto">STAND-TO!</a>';
    //         }
    //         good = true;
    //     } else {
    //         resultText = 'You were unable to ' + subText + '. Please try again.';
    //     }
    //     setResultText(index, resultText, good);
    // }

    /**
     * sets the result text of the subscribe request
     * @param {str} result
     * @param {bool} good
     */
    // function setResultText(index, result, good) {
    //     var i, subResults = document.getElementsByClassName('sub-results');

    //     for (i = 0; i < subResults.length; i++) {
    //         if (index) {
    //             if (i == index) {
    //                 subResults[i].innerHTML = result;
    //                 if (good) {
    //                     Helper.addClass(subResults[i], 'good');
    //                 } else {
    //                     Helper.removeClass(subResults[i], 'good');
    //                 }
    //             }
    //         } else {
    //             subResults[i].innerHTML = results;
    //             Helper.removeClass(subResults[i], 'good');
    //         }
    //     }
    // }

    // //----------------------------------------------------------------------
    // // GovSearch StandTo Search
    // //----------------------------------------------------------------------
    // searchForm.onsubmit = function (e) {
    //     if (this.query.value === '') {
    //         e.preventDefault();
    //         return false;
    //     } else {
    //         this.query.value = 'stand to ' + this.query.value;
    //         return true;
    //     }
    // };
    
})();