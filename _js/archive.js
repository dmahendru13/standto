var Helper = require('./globals/modules/Helper');

(function () {
    // Filter out previous Stand-tos older than X number of weeks
    !function (a) {
        a.fn.dateFilter = function (b) {
            var c = a.extend({ cutoff: new Date, buffer: -35}, b); c.cutoff.setDate(c.cutoff.getDate() + c.buffer); var d = this.parent(); return this.each(function () { new Date(a(this).data("date-filter")).getTime() < c.cutoff.getTime() && this.remove() }), 0 == d.prop("childElementCount"), this
        }
    }(jQuery);

    $('.headlines ul#archive-results li').dateFilter();

    $(function() {
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

