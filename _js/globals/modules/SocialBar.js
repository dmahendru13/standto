/*jshint -W032 */ /* ignore unnecessary semicolon */
//For Mobile devices
var Waypoint = require('./commonjs.waypoints.js'),
    Helper = require('./Helper');

class SocialBar {
    static initWaypoint(waypointElement) {
        var socialBar = document.getElementsByClassName('social-bar')[0];
        
        if (typeof waypointElement === "object") {
            new Waypoint({
                element: waypointElement,
                handler: function(direction) {
                    if (direction === 'up') {
                        Helper.removeClass(socialBar, 'scrolled-down');
                    }
                    else if (direction === 'down') {
                        Helper.addClass(socialBar, 'scrolled-down');
                    }
                },
                offset: '100%'
            });
        }
    }
};

export default SocialBar;
