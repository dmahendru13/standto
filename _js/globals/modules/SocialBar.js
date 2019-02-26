/*jshint -W032 */ /* ignore unnecessary semicolon */
//For Mobile devices
var Waypoint = require('./commonjs.waypoints.js'),
    Helper = require('./Helper');

//console.log('test 1 of 6 SocialBar');
class SocialBar {
    static initWaypoint(waypointElement) {
        var socialBar = document.getElementsByClassName('social-bar')[0];
        console.log('test 2 of 6 SocialBar');
        if (typeof waypointElement === "object") {
            console.log('test 3 of 6 SocialBar');
            new Waypoint({
                element: waypointElement,
                handler: function(direction) {
                    if (direction === 'up') {
                        Helper.removeClass(socialBar, 'scrolled-down');
                        //console.log('test 4 of 6 SocialBar');
                    }
                    else if (direction === 'down') {
                        Helper.addClass(socialBar, 'scrolled-down');
                        //console.log('test 5 of 6 SocialBar');
                    }
                },
                offset: '100%'
            });
        }
    }
};
//console.log('test 6 of 6 SocialBar');

export default SocialBar;
