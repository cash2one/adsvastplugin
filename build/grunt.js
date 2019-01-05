import minimist from 'minimist';
import pkg from '../package.json';

const args = minimist(process.argv.slice(2), {
    boolean: ['progress'],
    default: {
        progress: false,
        player: 'vcplayer'
    },
    alias: {
        p: 'progress'
    }
});

let {player} = args;
player = player || 'vcplayer';
let pluginName = pkg.name;

module.exports = function(grunt) {
    require('time-grunt')(grunt);

    let banner = '/**\n * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("HH:MM:ss dd-mm-yyyy") %>\n' +
        ' * Author: <%= pkg.author %>\n */\n';
    let verParts = pkg.version.split('.');
    let version = {
        full: pkg.version,
        major: verParts[0],
        minor: verParts[1],
        patch: verParts[2]
    };

    version.majorMinor = `${version.major}.${version.minor}`;
    grunt.vjsVersion = version;

    // Project configuration.
    grunt.initConfig({
        pkg,
        banner,
        wrap: {
            basic: {
                src: `dist/${player}/${pluginName}.js`,
                dest: `dist/${player}/${pluginName}.js`,
                options: {
                    //wrapper: ['define(function (require, exports, module) {\n', '\n});']
                    wrapper: ['(function () { var define = undefined; \n','\n })();']
                }
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>',
                compress: {
                    drop_console: true
                }
            },
            dist: {
                src: '<%= wrap.basic.dest %>',
                dest: `dist/${player}/${pluginName}.min.js`
            }
        }
    });

    // load all the npm grunt tasks
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('chg');

    const buildProduction = [
        'wrap:basic',
        'uglify'
    ];

    grunt.registerTask('build', buildProduction);
};
