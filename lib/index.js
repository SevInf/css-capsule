var parser = require('./parser'),
    validator = require('./validator'),
    generator = require('./css-generator');

exports.process = function process(text) {
    var tree = parser.parse(text);
    validator.validate(tree);

    return generator.generate(tree);
};
