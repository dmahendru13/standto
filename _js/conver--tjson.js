/**
 * this file not actually used on page
 * only used as a script to format the json from https://api.army.mil/api/v1/social/networks
 * into a readable format
 * which will then be split into separate files based on groupings
 * 
 * to use it, you'll need to include the script in the html and in Gruntfile.js
 */

/*global $*/

// http://stackoverflow.com/a/21776652/6071953
function groupBy(collection, property) {
    var i = 0, val, index,
        values = [], result = [];
    for (; i < collection.length; i++) {
        val = collection[i][property];
        index = values.indexOf(val);
        if (index > -1)
            result[index].push(collection[i]);
        else {
            values.push(val);
            result.push([collection[i]]);
        }
    }
    return result;
}

var data = []; // global data array

/**
 * for this part you'll need a json file called social.json
 * in the main folder of the project
 * that contains data from https://api.army.mil/api/v1/social/networks
 */
$.ajax({
    url: 'http://127.0.0.1:4000/social.json',
    type: 'get',
    dataType: 'json',
    success: function(res) {
        // group by category first - "Leaders", "Installations" etc.
        var results = groupBy(res, "category");

        // then sort, group by title and add objects to data array
        for (var i = 0; i < results.length; i++) {
            results[i] = sortData(results[i]);
            data.push(groupBy(results[i], "title"));
        }
    },
    error: function() {},
    complete: function() {
        convert();
    }
});

function sortData(arr) {
    var sortable = [];

    for (var key in arr) {
        if (arr.hasOwnProperty(key)) sortable.push(arr[key]);
    }

    sortable.sort(function(a,b) {
        var x=a.title.toLowerCase(),
            y=b.title.toLowerCase();
        return x<y ? -1 : x>y ? 1 : 0;
    });

    return sortable;
}

function convert() {
    var newObj = {};

    // loops :dizzy:
    for (var i = 0; i < data.length; i++) {

        newObj[i] = [];

        for (var j = 0; j < data[i].length; j++) {

            newObj[i].push({
                'title': data[i][j][0].title,
                'networks': []
            });

            for (var k = 0; k < data[i][j].length; k++) {
                newObj[i][j].networks.push({
                    'name': data[i][j][k].network,
                    'link': data[i][j][k].link
                });
            }

        }

        // JSON stringify everything to console so we can copy/paste to new files in data folder
        console.log('****************************************************************');
        console.log(JSON.stringify(newObj[i]));
        console.log('****************************************************************');
    }

    // console.log('****************************************************************');
    // console.log(newObj);
    // console.log('****************************************************************');
}


