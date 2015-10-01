'use strict';

/**
 * @ngdoc service
 * @name mattemotorApp.equalService
 * @description
 * # equalService
 * Service in the mattemotorApp. 
 */
angular.module('mattemotorApp')
  .service('equalService', function ($window, typeResolver) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    
    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    //Note no deep object or array compare Yeti
    var typeTable = {
        array : function(actual, expected) {
            var i = 0,
                type = "";

            if(actual.length !== expected.length) {
                return false;
            };

            for(var i = 0; i < actual.length; i++) {
                type = typeResolver.typeOf(expected[i]);
                if(!typeTable[type](actual[i], expected[i])) {
                    return false;
                }       
            }     

            return true;
        },

        'object' : function(actual, expected) {
            var args = [],
                key,
                value,
                type;

            for (key in expected) {
                value = expected[key];

                type = typeResolver.typeOf(value);

                if (!typeTable[type](actual[key], value)) {
                   return false;
                }
            }

            return true;
        },

        'boolean' : function(actual, expected) {
            return expected;
        },
        
        'number' : function(actual, expected) {
            expected = expected.toString();
            actual = actual.toString().replace(',', '.');

            if (isNumber(actual) && isNumber(expected)) {
                return parseFloat(actual) === parseFloat(expected);
            }

            return actual === expected;

        },

        'string' : function(actual, expected) {
            expected = expected.toString().replace(',', '.');
            actual = actual.toString().replace(',', '.');
            
            if (isNumber(actual) && isNumber(expected)) {
                return parseFloat(actual) === parseFloat(expected);
            }

            return actual === expected;
        }
    };

     /*Execepcted answer is configured to be an anynoumous func*/
    function createFunctionForExpectedAnswer(mathVars, actual, expected) {
        var type = typeResolver.typeOf(expected),
            argNames = [],
            argValues = [],
            i,
            key;
            
        if(type === 'object' || type === 'array') {
            for (key in expected) {
                //recursive call
               expected[key] = createFunctionForExpectedAnswer(mathVars, actual[key], expected[key]);
            }
        } else { 

            for (i in mathVars) {
                argNames.push(i);
                argValues.push(mathVars[i]);
            }

            //add answer and value
            argNames.push('answer');
            argValues.push(sanitizeInput(actual));
            expected = createFunc(expected, argNames).apply(null, argValues);
        }

        return expected;
    }

    function sanitizeInput(input) {
        var sanitized = input.toString().replace(',','.');

        if(isNumber(sanitized)) {
            return sanitized;
        }

        return input;
    }

    function createFunc(funcBody, varNames) {
        var toFunc = new $window.ToFunc(),
            mathed = toFunc.Parse(funcBody); //.replace(/\\/g, '\\\\'),
        
        return new Function(varNames, mathed);   
    }

    function throwIfNull(key, value) {
        
        if(typeof(value) === 'boolean') {
            return value;
        }

        if(!value) {
            throw  key + " can't be null";
        }
    }

    var service = {
        arraysEqual : function(a1, a2) {

            if(a1.length !== a2.length) {
                return false;
            }

            for(var i = 0; i < a1.length; i++) {
                if(a1[i] != a2[i]) {
                    return false;
                }       
            }     

            return true;
        },

        arraysContainsSameElements : function(a1, a2) {
            var copy1 = a1.slice(0).sort(),
                copy2 = a2.slice(0).sort();

            return service.arraysEqual(copy1, copy2);
        },

        objectEquals : function(o1, o2) {
            return false;
        },

        /*Variabled must be the dictionary containing both key, value*/
        isEqual : function(variables, actual, expected) {
            throwIfNull("expected", expected);           
            expected = createFunctionForExpectedAnswer(variables, actual,  expected);
            
            var type = typeResolver.typeOf(expected);
            
            return typeTable[type](actual, expected);
        }
    };

    return service;
 });
