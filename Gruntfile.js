module.exports = function (grunt) {

    var configs = '_js/globals/configs/production.js',
        i = 0,
        len = grunt.cli.tasks.length;

    //SET GLOBAL CONFIGS BASED ON ENVIROMENT OR TASK
    for (i; i < len; i++) {
        if (grunt.cli.tasks[i] === 'dev') {
            configs = '_js/globals/configs/development.js';
        }
    }

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        critical: {
            standto: {
                options: {
                    inline: true,
                    minify: true,
                    base: './',
                    css: [
                        '_site/e2/css/rv7/standto/style.css'
                    ],
                    dimensions: [{
                        height: 768,
                        width: 1366
                    }, {
                        height: 640,
                        width: 360
                    }, {
                        height: 568,
                        width: 320
                    }]
                },
                src: './_site/index.html',
                dest: './_site/index.html'
            },
            about: {
                options: {
                    inline: true,
                    minify: true,
                    base: './',
                    css: [
                        '_site/e2/css/rv7/standto/style.css'
                    ],
                    dimensions: [{
                        height: 768,
                        width: 1366
                    }, {
                        height: 640,
                        width: 360
                    }, {
                        height: 568,
                        width: 320
                    }]
                },
                src: './_site/about/index.html',
                dest: './_site/about/index.html'
            },
            archive: {
                options: {
                    inline: true,
                    minify: true,
                    base: './',
                    css: [
                        '_site/e2/css/rv7/standto/style.css'
                    ],
                    dimensions: [{
                        height: 768,
                        width: 1366
                    }, {
                        height: 640,
                        width: 360
                    }, {
                        height: 568,
                        width: 320
                    }]
                },
                src: './_site/archive/index.html',
                dest: './_site/archive/index.html'
            }
        },
        browserify: {
            libs: {
                files: {
                    '_js/bundled/header.js': ['_js/globals/header.js']
                },
                options: {
                    transform: ['babelify']
                }
            },
            social: {
                files: {
                    '_js/bundled/standto.js': [configs, '_js/standto.js', '_js/globals/modules/SocialBar.js', '_js/globals/modules/SubNav.js', '_js/globals/modules/Helper.js']
                },
                options: {
                    transform: ['babelify'],
                    alias: [
                        './_js/globals/modules/Helper.js:Helper',
                        './_js/globals/navs.js:Nav'//,
                        //'./node_modules/waypoints/src/waypoint.js:Waypoints'
                    ]
                }
            }
        },
        uglify: {
            options: {
                mangle: false,
                compress: true,
                beautify: true
            },
            build: {
                files: [
                    {
                        src: [
                            '_js/bundled/header.js',
                            '_js/bundled/standto.js'
                        ],
                        dest: 'e2/js/rv7/standto/<%= pkg.name %>.min.js'
                    }
                ]
            }
        },
        usebanner: {
            dist: {
                options: {
                    position: 'top',
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %> */\n'
                },
                files: {
                    src: ['_site/e2/js/**/*.js', '_site/e2/css/**/*.css']
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'e2/css/rv7/standto/style.css': '_scss/_style.scss'
                }
            }
        }


    });

    grunt.loadNpmTasks('grunt-critical');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-banner');

    grunt.registerTask('production', ['browserify', 'uglify', 'sass']);
    // grunt.registerTask('production', ['uglify', 'sass']);

    grunt.registerTask('post-production', ['usebanner', 'critical']);

};
