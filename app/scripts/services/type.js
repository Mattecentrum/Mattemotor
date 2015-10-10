'use strict';

/**
 * @ngdoc service
 * @name mattemotorApp.type
 * @description
 * # type
 * Factory in the mattemotorApp.
 */
angular.module('mattemotorApp')
    .factory('typeResolver', function () {
        //Uses type of but extends with array check
        var struct = {
            typeOf: function (value) {

                var type = typeof value;
                if (type === 'object') {
                    if (value) {
                        if (Object.prototype.toString.call(value) === '[object Array]') {
                            type = 'array';
                        }
                    } else {
                        type = 'null';
                    }
                }

                return type;
            },

            isArray: function (value) {
                return struct.typeOf(value) === 'array';
            },

            isObject: function (value) {
                return struct.typeOf(value) === 'object';
            },

            isString: function (value) {
                return struct.typeOf(value) === 'string';
            },
        }; 

        return struct;
    });
