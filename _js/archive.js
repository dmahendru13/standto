//alert('archive-js is connected and live');

var Helper = require('./globals/modules/Helper'),
    Archive = require('../_data/networks/2-archive.json');

(function () {
    'use strict';
    var searchForm = document.getElementById('standto_search_form');
    if (window.location.pathname == '/archive/') {
        //----------------------------------------------------------------------
        // Filter Stand-To! Articles on the Archive page
        //----------------------------------------------------------------------
        function populateArchive() {
            //https://stackoverflow.com/questions/28256271/populate-ul-in-html-with-json-data
            var archive = Archive,
                list = document.getElementById('archive-results');

            for (var i = 0; i < archive.length; i++) {

                var li = document.createElement('li');
                li.innerHTML = '<span class="date archive-date">' + archive[i].date + '</span';
                li.innerHTML += '<a class="archive-link" href="' + archive[i].networks[0].link + '" target="">' + archive[i].title + '</a>';
                list.appendChild(li);
            }

        };

        populateArchive();

        searchForm.onkeyup = function () {
            var input = document.getElementById('archive-search-input'),
                filter = input.value.toUpperCase(),
                ul = document.getElementById('archive-results'),
                li = ul.getElementsByTagName('li');

            for (var i = 0; i < li.length; i++) {
                var a = li[i].getElementsByTagName('a')[0],
                    txtValue = a.textContent || a.innerText;

                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    li[i].style.display = "";
                } else {
                    li[i].style.display = "none";
                }
            }
        };



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

