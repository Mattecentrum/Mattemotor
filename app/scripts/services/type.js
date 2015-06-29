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
        return {
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
            }
        };
    });
