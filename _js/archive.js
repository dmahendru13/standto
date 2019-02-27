//alert('archive-js is connected and live');

(function () {
    'use strict';
    var searchForm = document.getElementById('standto_search_form');
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
})();

