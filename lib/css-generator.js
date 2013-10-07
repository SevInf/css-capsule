exports.generate = function(tree) {
    return tree.rules.map(generateRule).join('\n');
};

function generateRule(rule) {
    if (rule.type === "group") {
        return generateGroup(rule);
    } else {
        return generateCssRule(rule);
    }
}

function generateGroup(group) {
    return group.rules.map(generateCssRule).join('\n');
}

function generateCssRule(rule) {
    return [rule.cssClass +" {"]
        .concat(rule.declarations.map(generateDecl), "}")
        .join('\n');
}

function generateDecl(decl) {
    return decl.name + ": " + decl.value + ";";
}
