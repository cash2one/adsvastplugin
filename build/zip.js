var zip = require('bestzip');
 
zip('./plugin.zip', ['build/', 'src/', '.babelrc', '.eslintignore', '.eslintrc', 'Gruntfile.js', 'package.json', 'README.md'], function(err) {
    if  (err) {
        console.error(err.stack);
        process.exit(1);
    } else {
        console.log('all done!');
    }
});