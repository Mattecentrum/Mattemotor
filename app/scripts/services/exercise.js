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
        return $resource('json/:language/exercise/:exerciseId.json', {}, {
            query: { method: 'GET', params: { exerciseId: 'all', language: 'all' }, isArray: true },
        });
    });
