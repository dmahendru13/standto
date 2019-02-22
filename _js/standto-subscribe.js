//console.log("jelly");

// var ev = document.getElementById('sub-link');

// ev.addEventListener('click', myFunction);

// function myFunction() {
//     //alert("great success");
//     var body = document.getElementsByTagName('body');
//     body.addClass('hidden');
// }

var Helper = require('./globals/modules/Helper'),
    Client = require('node-rest-client').Client,
    Emails = JSON.parse('../_data/email-dummy-data/emails.json');

(function () {

    'use strict';
    var 
        subscribeLink = document.getElementsByClassName('sub-link'),
        i;

    // ----------------------------------------------------------------------
    // Subscribe/Unsubscribe
    // ----------------------------------------------------------------------
    // add click to sub/unsub buttons
    for (i = 0; i < aubscribeLink.length; i++) {
        subscribeLink[i].setAttribute('data-email', i);
        subscribeLink[i].onclick = function() {
            var unsub = (this.value.toLowerCase() === 'unsubscribe');
            getEmailValue(this.getAttribute('data-email'), unsub);
        }
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
    function getResponse(index, emailAdd, unsub) {
        var client = new Client(),
            subtext = (unsub) ? 'unsubscribe' : "subscribe",
            apiPath = Configs.API_DOMAIN + '/api/v1/' + subText + '?email=' + emailAdd;

        if (emailAdd === '') {
            setResultText(index, 'Please enter a valid email.');
        } else {
            client.get(
                apiPath,
                function (data, response) {
                    processResultData(index, data, subText);
                }
            )
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
            resultText = 'You were unable to ' + subText + '. Invalid email provided.';
        } else if (data.success === true) {
            resultText = 'Your ' + subText + ' request has been received.' + ' Please check your email for confirmation.';
            if (subText == 'unsubscribe') {
                resultText = 'You have been unsubscribed from receiving the Army\'s daily focus in <a href="https://www.army.mil/standto">STAND-TO!</a>';
            }
            good = true;
        } else {
            resultText = 'You were unable to ' + subText + '. Please try again.';
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
                subResults[i].innerHTML = results;
                Helper.removeClass(subResults[i], 'good');
            }
        }
    }

    //----------------------------------------------------------------------
    // GovSearch StandTo Search
    //----------------------------------------------------------------------
    // searchForm.onsubmit = function (e) {
    //     if (this.query.value === '') {
    //         e.preventDefault();
    //         return false;
    //     } else {
    //         this.query.value = 'stand to ' + this.query.value;
    //         return true;
    //     }
    // };
    //console.log('test-10 of 10 standto-subscribejs');

})();