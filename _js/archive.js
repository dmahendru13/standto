//alert('archive-js is connected and live');

var Helper = require('./globals/modules/Helper'),
    Archive = require('../_data/networks/2-archive.json');

(function () {
    'use strict';
    var searchForm = document.getElementById('standto_search_form');
    if (window.location.pathname == '/archive/' || window.location.pathname == '/standto/archive/') {

        //----------------------------------------------------------------------
        //  Search
        //----------------------------------------------------------------------

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

        //----------------------------------------------------------------------
        //
        // Displays "No Results found"
        // 
        //----------------------------------------------------------------------

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


        //----------------------------------------------------------------------
        // GovSearch StandTo Search
        //----------------------------------------------------------------------
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

