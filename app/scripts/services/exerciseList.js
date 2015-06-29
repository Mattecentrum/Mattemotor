'use strict';

/**
 * @ngdoc service
 * @name mattemotorApp.Exercises
 * @description
 * # Exercises
 * Factory in the mattemotorApp.
 */
angular.module('mattemotorApp')
    .factory('exerciseList', function ($resource) {
        var self = this;
        return {
            SetCurrent: function (list) {
                self.currentList = list;
            },

            GetCurrent: function () {
                return self.currentList;
            },

            Load: function (listId, callback) {
                var call = $resource('json/list/:listId.json', {}, {
                    query: { method: 'GET', params: { listId: 'all' }, isArray: true }
                });

                call.get(listId, function (data) {
                    self.currentList = data;
                    callback(data);
                });
            }
        };
    });
