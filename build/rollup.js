import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import filesize from 'rollup-plugin-filesize';
import progress from 'rollup-plugin-progress';
import uglify from 'rollup-plugin-uglify';
import minimist from 'minimist';
import sass from 'rollup-plugin-sass';

import _ from 'lodash';
import pkg from '../package.json';

const args = minimist(process.argv.slice(2), {
    boolean: ['progress'],
    default: {
        progress: true,
        player: 'vcplayer'
    },
    alias: {
        p: 'progress'
    }
});

let {player} = args;
player = player || 'vcplayer';
let pluginName = pkg.name;

const primedResolve = resolve({
    jsnext: true,
    main: true,
    browser: true,
    extensions:  ['.js', '.jsx']
});

const primedCjs = commonjs({
    sourceMap: false
});

const primedBabel = babel({
    babelrc: false,
    runtimeHelpers: true,
    exclude: 'node_modules/**',
    presets: [
        ['es2015', {
            modules: false
        }],
        'react',
        'stage-0'
    ],
    plugins: [
        'external-helpers',
        'transform-decorators-legacy',
        'transform-runtime'
    ]
});

const replaceValue = replace({
    values: {
        'process.env.PLAYER': JSON.stringify(player),
        'process.env.NODE_ENV': JSON.stringify('production')
    }
});

const umd = {
    options: {
        input: 'src/js/index.js',
        plugins: [
            replaceValue,
            primedResolve,
            primedBabel,
            primedCjs,
            args.progress ? progress() : {},
            filesize()
        ],
        external: [
            'playercore',
            'react'
        ]
    },
    output: {
        globals: {
            playercore: `${player}Core`,
            react: 'React'
        }
    },
    format: 'umd',
    file: `dist/${player}/${pluginName}.js`
};

const minifiedUmd = Object.assign({}, _.cloneDeep(umd), {
    file: `dist/${player}/${pluginName}.min.js`
});

minifiedUmd.options.plugins.splice(4, 0, uglify({
    mangle: true,
    compress: {
        /* eslint-disable camelcase */
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: true
        /* eslint-enable camelcase */
    }
}));

const sassOptions = { 
    output: `dist/${player}/${pluginName}.min.css`,
    options: {
        outputStyle: 'compressed',
        data: `$player: ${JSON.stringify(player)};`
    }
};

const css = {
    options: {
        input: 'src/css/index.js',
        plugins: [
            sass(sassOptions)
        ]
    },
    format: 'umd',
    file: `dist/${player}/temp.js`
};

function runRollup({options, format, file, banner, output = {}}) {
    rollup(options)
        .then(function(bundle) {
            bundle.write({
                ...output,
                format,
                file,
                banner,
                sourcemap: false
            });
        }, function(err) {
        // eslint-disable-next-line no-console
            console.error(err);
        });
}

runRollup(umd);
runRollup(minifiedUmd);

if (pkg.style) {
    runRollup(css);
}
