exports.validate = function(tree) {
    var decls = {},
        groups = {};

    tree.rules.forEach(function (rule) {
        if (rule.type === 'group') {
            validateGroup(rule);
        } else if (rule.type === 'rule') {
            validateRule(rule);
        }
    });
    
    function validateRule(rule) {
        var prevDecls = decls[rule.cssClass] || (decls[rule.cssClass] = {}),
            currentDecls = rule.declarations;

        currentDecls.forEach(function(decl) {
            var prevDecl = prevDecls[decl.name];
            if (prevDecl && prevDecl.access !== 'public') {
                throw new Error(rule.cssClass + ' overrides non-public property ' + decl.name);
            }

            addDecl(rule.cssClass, decl);
        });
    }

    function validateGroup(group) {
        var groupDecls = groups[group.name] || (groups[group.name] = {});

        group.rules.forEach(function(rule) {
            rule.declarations.forEach(function(decl) {
                var prevDecl = groupDecls[decl.name];
                if (prevDecl && prevDecl.access === 'private') {
                    throw new Error(rule.cssClass + ' overrides private property ' + decl.name);
                }
                groupDecls[decl.name] = decl;
                addDecl(rule.cssClass, decl);
            });
        });
    }

    function addDecl(cssClass, decl) {
        decl.access = getAccessModifier(cssClass, decl);
        decls[cssClass] = decls[cssClass] || {};
        decls[cssClass][decl.name] = decl;
    }

    function getAccessModifier(cssClass, decl) {
        var prevDecl = decls[cssClass] ? decls[cssClass][decl.name] : null;

        if (decl.access === '') {
            if (prevDecl) {
                return prevDecl.access;
            } else {
                return "group";
            }
        }
        return decl.access;
    }
};


