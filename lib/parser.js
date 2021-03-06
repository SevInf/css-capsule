module.exports = (function(){
  /*
   * Generated by PEG.js 0.7.0.
   *
   * http://pegjs.majda.cz/
   */
  
  function quote(s) {
    /*
     * ECMA-262, 5th ed., 7.8.4: All characters may appear literally in a
     * string literal except for the closing quote character, backslash,
     * carriage return, line separator, paragraph separator, and line feed.
     * Any character may appear in the form of an escape sequence.
     *
     * For portability, we also escape escape all control and non-ASCII
     * characters. Note that "\0" and "\v" escape sequences are not used
     * because JSHint does not like the first and IE the second.
     */
     return '"' + s
      .replace(/\\/g, '\\\\')  // backslash
      .replace(/"/g, '\\"')    // closing quote character
      .replace(/\x08/g, '\\b') // backspace
      .replace(/\t/g, '\\t')   // horizontal tab
      .replace(/\n/g, '\\n')   // line feed
      .replace(/\f/g, '\\f')   // form feed
      .replace(/\r/g, '\\r')   // carriage return
      .replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g, escape)
      + '"';
  }
  
  var result = {
    /*
     * Parses the input with a generated parser. If the parsing is successfull,
     * returns a value explicitly or implicitly specified by the grammar from
     * which the parser was generated (see |PEG.buildParser|). If the parsing is
     * unsuccessful, throws |PEG.parser.SyntaxError| describing the error.
     */
    parse: function(input, startRule) {
      var parseFunctions = {
        "stylesheet": parse_stylesheet,
        "group": parse_group,
        "rulelist": parse_rulelist,
        "rule": parse_rule,
        "class": parse_class,
        "decllist": parse_decllist,
        "decl": parse_decl,
        "access": parse_access,
        "property": parse_property,
        "propval": parse_propval,
        "component": parse_component,
        "ident": parse_ident,
        "nmstart": parse_nmstart,
        "nmchar": parse_nmchar,
        "S": parse_S
      };
      
      if (startRule !== undefined) {
        if (parseFunctions[startRule] === undefined) {
          throw new Error("Invalid rule name: " + quote(startRule) + ".");
        }
      } else {
        startRule = "stylesheet";
      }
      
      var pos = 0;
      var reportFailures = 0;
      var rightmostFailuresPos = 0;
      var rightmostFailuresExpected = [];
      
      function padLeft(input, padding, length) {
        var result = input;
        
        var padLength = length - input.length;
        for (var i = 0; i < padLength; i++) {
          result = padding + result;
        }
        
        return result;
      }
      
      function escape(ch) {
        var charCode = ch.charCodeAt(0);
        var escapeChar;
        var length;
        
        if (charCode <= 0xFF) {
          escapeChar = 'x';
          length = 2;
        } else {
          escapeChar = 'u';
          length = 4;
        }
        
        return '\\' + escapeChar + padLeft(charCode.toString(16).toUpperCase(), '0', length);
      }
      
      function matchFailed(failure) {
        if (pos < rightmostFailuresPos) {
          return;
        }
        
        if (pos > rightmostFailuresPos) {
          rightmostFailuresPos = pos;
          rightmostFailuresExpected = [];
        }
        
        rightmostFailuresExpected.push(failure);
      }
      
      function parse_stylesheet() {
        var result0, result1, result2, result3, result4;
        var pos0, pos1, pos2;
        
        pos0 = pos;
        pos1 = pos;
        result0 = [];
        result1 = parse_S();
        while (result1 !== null) {
          result0.push(result1);
          result1 = parse_S();
        }
        if (result0 !== null) {
          result1 = [];
          pos2 = pos;
          result2 = parse_rule();
          if (result2 === null) {
            result2 = parse_group();
          }
          if (result2 !== null) {
            result3 = [];
            result4 = parse_S();
            while (result4 !== null) {
              result3.push(result4);
              result4 = parse_S();
            }
            if (result3 !== null) {
              result2 = [result2, result3];
            } else {
              result2 = null;
              pos = pos2;
            }
          } else {
            result2 = null;
            pos = pos2;
          }
          while (result2 !== null) {
            result1.push(result2);
            pos2 = pos;
            result2 = parse_rule();
            if (result2 === null) {
              result2 = parse_group();
            }
            if (result2 !== null) {
              result3 = [];
              result4 = parse_S();
              while (result4 !== null) {
                result3.push(result4);
                result4 = parse_S();
              }
              if (result3 !== null) {
                result2 = [result2, result3];
              } else {
                result2 = null;
                pos = pos2;
              }
            } else {
              result2 = null;
              pos = pos2;
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, rules) {
                return {
                    rules: rules.map(function(rule) {
                        return rule[0];
                    })
                };
            })(pos0, result0[1]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_group() {
        var result0, result1, result2, result3, result4, result5, result6, result7, result8, result9;
        var pos0, pos1;
        
        reportFailures++;
        pos0 = pos;
        pos1 = pos;
        result0 = [];
        result1 = parse_S();
        while (result1 !== null) {
          result0.push(result1);
          result1 = parse_S();
        }
        if (result0 !== null) {
          if (input.substr(pos, 6) === "@group") {
            result1 = "@group";
            pos += 6;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\"@group\"");
            }
          }
          if (result1 !== null) {
            result2 = [];
            result3 = parse_S();
            while (result3 !== null) {
              result2.push(result3);
              result3 = parse_S();
            }
            if (result2 !== null) {
              result3 = parse_ident();
              if (result3 !== null) {
                result4 = [];
                result5 = parse_S();
                while (result5 !== null) {
                  result4.push(result5);
                  result5 = parse_S();
                }
                if (result4 !== null) {
                  if (input.charCodeAt(pos) === 123) {
                    result5 = "{";
                    pos++;
                  } else {
                    result5 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"{\"");
                    }
                  }
                  if (result5 !== null) {
                    result6 = [];
                    result7 = parse_S();
                    while (result7 !== null) {
                      result6.push(result7);
                      result7 = parse_S();
                    }
                    if (result6 !== null) {
                      result7 = parse_rulelist();
                      if (result7 !== null) {
                        result8 = [];
                        result9 = parse_S();
                        while (result9 !== null) {
                          result8.push(result9);
                          result9 = parse_S();
                        }
                        if (result8 !== null) {
                          if (input.charCodeAt(pos) === 125) {
                            result9 = "}";
                            pos++;
                          } else {
                            result9 = null;
                            if (reportFailures === 0) {
                              matchFailed("\"}\"");
                            }
                          }
                          if (result9 !== null) {
                            result0 = [result0, result1, result2, result3, result4, result5, result6, result7, result8, result9];
                          } else {
                            result0 = null;
                            pos = pos1;
                          }
                        } else {
                          result0 = null;
                          pos = pos1;
                        }
                      } else {
                        result0 = null;
                        pos = pos1;
                      }
                    } else {
                      result0 = null;
                      pos = pos1;
                    }
                  } else {
                    result0 = null;
                    pos = pos1;
                  }
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, name, rules) {
                return {
                    type: "group",
                    name: name,
                    rules: rules 
                }
            })(pos0, result0[3], result0[7]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("group");
        }
        return result0;
      }
      
      function parse_rulelist() {
        var result0, result1, result2, result3;
        var pos0, pos1;
        
        pos0 = pos;
        result0 = [];
        pos1 = pos;
        result1 = parse_rule();
        if (result1 !== null) {
          result2 = [];
          result3 = parse_S();
          while (result3 !== null) {
            result2.push(result3);
            result3 = parse_S();
          }
          if (result2 !== null) {
            result1 = [result1, result2];
          } else {
            result1 = null;
            pos = pos1;
          }
        } else {
          result1 = null;
          pos = pos1;
        }
        while (result1 !== null) {
          result0.push(result1);
          pos1 = pos;
          result1 = parse_rule();
          if (result1 !== null) {
            result2 = [];
            result3 = parse_S();
            while (result3 !== null) {
              result2.push(result3);
              result3 = parse_S();
            }
            if (result2 !== null) {
              result1 = [result1, result2];
            } else {
              result1 = null;
              pos = pos1;
            }
          } else {
            result1 = null;
            pos = pos1;
          }
        }
        if (result0 !== null) {
          result0 = (function(offset, rules) {
                return rules.map(function(rule) {
                    return rule[0];
                });
            })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_rule() {
        var result0, result1, result2, result3, result4, result5, result6;
        var pos0, pos1;
        
        reportFailures++;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_class();
        if (result0 !== null) {
          result1 = [];
          result2 = parse_S();
          while (result2 !== null) {
            result1.push(result2);
            result2 = parse_S();
          }
          if (result1 !== null) {
            if (input.charCodeAt(pos) === 123) {
              result2 = "{";
              pos++;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("\"{\"");
              }
            }
            if (result2 !== null) {
              result3 = [];
              result4 = parse_S();
              while (result4 !== null) {
                result3.push(result4);
                result4 = parse_S();
              }
              if (result3 !== null) {
                result4 = parse_decllist();
                if (result4 !== null) {
                  result5 = [];
                  result6 = parse_S();
                  while (result6 !== null) {
                    result5.push(result6);
                    result6 = parse_S();
                  }
                  if (result5 !== null) {
                    if (input.charCodeAt(pos) === 125) {
                      result6 = "}";
                      pos++;
                    } else {
                      result6 = null;
                      if (reportFailures === 0) {
                        matchFailed("\"}\"");
                      }
                    }
                    if (result6 !== null) {
                      result0 = [result0, result1, result2, result3, result4, result5, result6];
                    } else {
                      result0 = null;
                      pos = pos1;
                    }
                  } else {
                    result0 = null;
                    pos = pos1;
                  }
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, cssClass, decls) {
                return {
                    type: "rule",
                    cssClass: cssClass,
                    declarations: decls
                };
            })(pos0, result0[0], result0[4]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("css rule");
        }
        return result0;
      }
      
      function parse_class() {
        var result0, result1;
        var pos0, pos1;
        
        reportFailures++;
        pos0 = pos;
        pos1 = pos;
        if (input.charCodeAt(pos) === 46) {
          result0 = ".";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\".\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_ident();
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, dot, ident) {
                return dot + ident;
            })(pos0, result0[0], result0[1]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("class");
        }
        return result0;
      }
      
      function parse_decllist() {
        var result0, result1, result2, result3, result4;
        var pos0, pos1, pos2;
        
        pos0 = pos;
        pos1 = pos;
        result0 = parse_decl();
        result0 = result0 !== null ? result0 : "";
        if (result0 !== null) {
          result1 = [];
          pos2 = pos;
          if (input.charCodeAt(pos) === 59) {
            result2 = ";";
            pos++;
          } else {
            result2 = null;
            if (reportFailures === 0) {
              matchFailed("\";\"");
            }
          }
          if (result2 !== null) {
            result3 = [];
            result4 = parse_S();
            while (result4 !== null) {
              result3.push(result4);
              result4 = parse_S();
            }
            if (result3 !== null) {
              result4 = parse_decl();
              result4 = result4 !== null ? result4 : "";
              if (result4 !== null) {
                result2 = [result2, result3, result4];
              } else {
                result2 = null;
                pos = pos2;
              }
            } else {
              result2 = null;
              pos = pos2;
            }
          } else {
            result2 = null;
            pos = pos2;
          }
          while (result2 !== null) {
            result1.push(result2);
            pos2 = pos;
            if (input.charCodeAt(pos) === 59) {
              result2 = ";";
              pos++;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("\";\"");
              }
            }
            if (result2 !== null) {
              result3 = [];
              result4 = parse_S();
              while (result4 !== null) {
                result3.push(result4);
                result4 = parse_S();
              }
              if (result3 !== null) {
                result4 = parse_decl();
                result4 = result4 !== null ? result4 : "";
                if (result4 !== null) {
                  result2 = [result2, result3, result4];
                } else {
                  result2 = null;
                  pos = pos2;
                }
              } else {
                result2 = null;
                pos = pos2;
              }
            } else {
              result2 = null;
              pos = pos2;
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, head, tail) {
                var decls = [head];
                for (var i=0; i<tail.length; i++) {
                    if (tail[i][2] !== '') {
                        decls.push(tail[i][2]);
                    }
                }
                return decls;
            })(pos0, result0[0], result0[1]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_decl() {
        var result0, result1, result2, result3, result4, result5, result6;
        var pos0, pos1;
        
        reportFailures++;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_access();
        result0 = result0 !== null ? result0 : "";
        if (result0 !== null) {
          result1 = [];
          result2 = parse_S();
          while (result2 !== null) {
            result1.push(result2);
            result2 = parse_S();
          }
          if (result1 !== null) {
            result2 = parse_property();
            if (result2 !== null) {
              result3 = [];
              result4 = parse_S();
              while (result4 !== null) {
                result3.push(result4);
                result4 = parse_S();
              }
              if (result3 !== null) {
                if (input.charCodeAt(pos) === 58) {
                  result4 = ":";
                  pos++;
                } else {
                  result4 = null;
                  if (reportFailures === 0) {
                    matchFailed("\":\"");
                  }
                }
                if (result4 !== null) {
                  result5 = [];
                  result6 = parse_S();
                  while (result6 !== null) {
                    result5.push(result6);
                    result6 = parse_S();
                  }
                  if (result5 !== null) {
                    result6 = parse_propval();
                    if (result6 !== null) {
                      result0 = [result0, result1, result2, result3, result4, result5, result6];
                    } else {
                      result0 = null;
                      pos = pos1;
                    }
                  } else {
                    result0 = null;
                    pos = pos1;
                  }
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, access, property, expression) {
                return {
                    name: property,
                    value: expression,
                    access: access
                };
            })(pos0, result0[0], result0[2], result0[6]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("declaration");
        }
        return result0;
      }
      
      function parse_access() {
        var result0;
        
        reportFailures++;
        if (input.substr(pos, 6) === "public") {
          result0 = "public";
          pos += 6;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"public\"");
          }
        }
        if (result0 === null) {
          if (input.substr(pos, 7) === "private") {
            result0 = "private";
            pos += 7;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"private\"");
            }
          }
          if (result0 === null) {
            if (input.substr(pos, 5) === "group") {
              result0 = "group";
              pos += 5;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\"group\"");
              }
            }
          }
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("access modifier");
        }
        return result0;
      }
      
      function parse_property() {
        var result0, result1, result2;
        var pos0, pos1;
        
        reportFailures++;
        pos0 = pos;
        pos1 = pos;
        result0 = parse_ident();
        if (result0 !== null) {
          result1 = [];
          result2 = parse_S();
          while (result2 !== null) {
            result1.push(result2);
            result2 = parse_S();
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, ident) {
                return ident;
            })(pos0, result0[0]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("property");
        }
        return result0;
      }
      
      function parse_propval() {
        var result0, result1, result2, result3;
        var pos0, pos1;
        
        reportFailures++;
        pos0 = pos;
        pos1 = pos;
        result1 = parse_component();
        if (result1 !== null) {
          result2 = [];
          result3 = parse_S();
          while (result3 !== null) {
            result2.push(result3);
            result3 = parse_S();
          }
          if (result2 !== null) {
            result1 = [result1, result2];
          } else {
            result1 = null;
            pos = pos1;
          }
        } else {
          result1 = null;
          pos = pos1;
        }
        if (result1 !== null) {
          result0 = [];
          while (result1 !== null) {
            result0.push(result1);
            pos1 = pos;
            result1 = parse_component();
            if (result1 !== null) {
              result2 = [];
              result3 = parse_S();
              while (result3 !== null) {
                result2.push(result3);
                result3 = parse_S();
              }
              if (result2 !== null) {
                result1 = [result1, result2];
              } else {
                result1 = null;
                pos = pos1;
              }
            } else {
              result1 = null;
              pos = pos1;
            }
          }
        } else {
          result0 = null;
        }
        if (result0 !== null) {
          result0 = (function(offset, components) {
                return components.map(function(component) {
                    return component[0];
                }).join(' ');
            })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("property value");
        }
        return result0;
      }
      
      function parse_component() {
        var result0, result1;
        var pos0;
        
        pos0 = pos;
        if (/^[^ ;}]/.test(input.charAt(pos))) {
          result1 = input.charAt(pos);
          pos++;
        } else {
          result1 = null;
          if (reportFailures === 0) {
            matchFailed("[^ ;}]");
          }
        }
        if (result1 !== null) {
          result0 = [];
          while (result1 !== null) {
            result0.push(result1);
            if (/^[^ ;}]/.test(input.charAt(pos))) {
              result1 = input.charAt(pos);
              pos++;
            } else {
              result1 = null;
              if (reportFailures === 0) {
                matchFailed("[^ ;}]");
              }
            }
          }
        } else {
          result0 = null;
        }
        if (result0 !== null) {
          result0 = (function(offset, chars) {return chars.join(''); })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_ident() {
        var result0, result1, result2, result3;
        var pos0, pos1;
        
        reportFailures++;
        pos0 = pos;
        pos1 = pos;
        if (input.charCodeAt(pos) === 45) {
          result0 = "-";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"-\"");
          }
        }
        result0 = result0 !== null ? result0 : "";
        if (result0 !== null) {
          result1 = parse_nmstart();
          if (result1 !== null) {
            result2 = [];
            result3 = parse_nmchar();
            while (result3 !== null) {
              result2.push(result3);
              result3 = parse_nmchar();
            }
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, dash, nmstart, nmchar) {
                return dash + nmstart + nmchar.join('');
            })(pos0, result0[0], result0[1], result0[2]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("identifier");
        }
        return result0;
      }
      
      function parse_nmstart() {
        var result0;
        
        if (/^[_a-z]/i.test(input.charAt(pos))) {
          result0 = input.charAt(pos);
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("[_a-z]i");
          }
        }
        return result0;
      }
      
      function parse_nmchar() {
        var result0;
        
        if (/^[_a-z0-9\-]/i.test(input.charAt(pos))) {
          result0 = input.charAt(pos);
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("[_a-z0-9\\-]i");
          }
        }
        return result0;
      }
      
      function parse_S() {
        var result0;
        
        reportFailures++;
        if (/^[ \n\r]/.test(input.charAt(pos))) {
          result0 = input.charAt(pos);
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("[ \\n\\r]");
          }
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("whitespace");
        }
        return result0;
      }
      
      
      function cleanupExpected(expected) {
        expected.sort();
        
        var lastExpected = null;
        var cleanExpected = [];
        for (var i = 0; i < expected.length; i++) {
          if (expected[i] !== lastExpected) {
            cleanExpected.push(expected[i]);
            lastExpected = expected[i];
          }
        }
        return cleanExpected;
      }
      
      function computeErrorPosition() {
        /*
         * The first idea was to use |String.split| to break the input up to the
         * error position along newlines and derive the line and column from
         * there. However IE's |split| implementation is so broken that it was
         * enough to prevent it.
         */
        
        var line = 1;
        var column = 1;
        var seenCR = false;
        
        for (var i = 0; i < Math.max(pos, rightmostFailuresPos); i++) {
          var ch = input.charAt(i);
          if (ch === "\n") {
            if (!seenCR) { line++; }
            column = 1;
            seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            line++;
            column = 1;
            seenCR = true;
          } else {
            column++;
            seenCR = false;
          }
        }
        
        return { line: line, column: column };
      }
      
      
      var result = parseFunctions[startRule]();
      
      /*
       * The parser is now in one of the following three states:
       *
       * 1. The parser successfully parsed the whole input.
       *
       *    - |result !== null|
       *    - |pos === input.length|
       *    - |rightmostFailuresExpected| may or may not contain something
       *
       * 2. The parser successfully parsed only a part of the input.
       *
       *    - |result !== null|
       *    - |pos < input.length|
       *    - |rightmostFailuresExpected| may or may not contain something
       *
       * 3. The parser did not successfully parse any part of the input.
       *
       *   - |result === null|
       *   - |pos === 0|
       *   - |rightmostFailuresExpected| contains at least one failure
       *
       * All code following this comment (including called functions) must
       * handle these states.
       */
      if (result === null || pos !== input.length) {
        var offset = Math.max(pos, rightmostFailuresPos);
        var found = offset < input.length ? input.charAt(offset) : null;
        var errorPosition = computeErrorPosition();
        
        throw new this.SyntaxError(
          cleanupExpected(rightmostFailuresExpected),
          found,
          offset,
          errorPosition.line,
          errorPosition.column
        );
      }
      
      return result;
    },
    
    /* Returns the parser source code. */
    toSource: function() { return this._source; }
  };
  
  /* Thrown when a parser encounters a syntax error. */
  
  result.SyntaxError = function(expected, found, offset, line, column) {
    function buildMessage(expected, found) {
      var expectedHumanized, foundHumanized;
      
      switch (expected.length) {
        case 0:
          expectedHumanized = "end of input";
          break;
        case 1:
          expectedHumanized = expected[0];
          break;
        default:
          expectedHumanized = expected.slice(0, expected.length - 1).join(", ")
            + " or "
            + expected[expected.length - 1];
      }
      
      foundHumanized = found ? quote(found) : "end of input";
      
      return "Expected " + expectedHumanized + " but " + foundHumanized + " found.";
    }
    
    this.name = "SyntaxError";
    this.expected = expected;
    this.found = found;
    this.message = buildMessage(expected, found);
    this.offset = offset;
    this.line = line;
    this.column = column;
  };
  
  result.SyntaxError.prototype = Error.prototype;
  
  return result;
})();
