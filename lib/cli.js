var fs = require('fs'),
    capsule = require('./index');

exports.run = function run() {
    var input = process.argv[2],
        output = process.argv[3],
        source = fs.readFileSync(input, 'utf8'),
        css = capsule.process(source);

    fs.writeFileSync(output, css, 'utf8');

};
