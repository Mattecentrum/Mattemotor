'use strict';

/**
 * @ngdoc service
 * @name mattemotorApp.Exercise
 * @description
 * # Exercise
 * Factory in the mattemotorApp.
 */
angular.module('mattemotorApp')
    .factory('exercise', function ($resource) {
        return $resource('json/exercise/:exerciseId.json', {}, {
            query: { method: 'GET', params: { exerciseId: 'all' }, isArray: true },
        });
    });
