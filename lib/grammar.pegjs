stylesheet
    = S* rules:((rule / group) S*)* {
        return {
            rules: rules.map(function(rule) {
                return rule[0];
            })
        };
    }


group "group"
    = "@group" S* name:ident S* "{" S* rules:rulelist S* "}" {
        return {
            type: "group",
            name: name,
            rules: rules 
        }
    }

rulelist
    = rules:(rule S*)* {
        return rules.map(function(rule) {
            return rule[0];
        });
    }



rule "css rule"
    = cssClass:class S* "{" S* decls: decllist S* "}" {
        return {
            type: "rule",
            cssClass: cssClass,
            declarations: decls
        };
    }

class "class"
    = dot:"." ident:ident {
        return dot + ident;
    }

decllist
    = head:decl? tail:(";" S* decl?)* {
        var decls = [head];
        for (var i=0; i<tail.length; i++) {
            if (tail[i][2] !== '') {
                decls.push(tail[i][2]);
            }
        }
        return decls;
    }

decl "declaration"
    = access:access? S* property: property  S* ":" S* expression: propval {
        return {
            name: property,
            value: expression,
            access: access
        };
    }

access "access modifier"
    = "public"/"private"/"group"

property "property"
    = ident:ident S* {
        return ident;
    }

propval "property value"
    = components:(component S*)+ {
        return components.map(function(component) {
            return component[0];
        }).join(' ');
    }

component
 = chars:[^ ;}]+ {return chars.join(''); }

ident "identifier"
    = dash:"-"? nmstart:nmstart nmchar:nmchar* {
        return dash + nmstart + nmchar.join('');
    }

nmstart
    = [_a-z]i

nmchar
    = [_a-z0-9-]i

S "whitespace"
    = [ \n\r]
