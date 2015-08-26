'use strict';

/**
 * @ngdoc service
 * @name mattemotorApp.Exercises
 * @description
 * # Exercises
 * Factory in the mattemotorApp.
 */
angular.module('mattemotorApp')
    .factory('exerciseList', function ($resource, $http) {
        var self = this;
        return {
            SetCurrent: function (list) {
                self.currentList = list;
            },
            
            GetCurrent: function () {
                return self.currentList;
            },

            Load: function (listId, language, callback) {
                
                var call = $resource('json/:language/list/:listId.json', {}, {
                    query: { method: 'GET', params: { listId: 'all', language: 'all' }, isArray: true }
                }).$promise.then(
                    function (response) {
                        self.currentList = response;
                        callback(response);
                    },
                    function function_name (error) {
                           throw error
                    }   

                );

                call.get(listId, language, function (data) {
                    self.currentList = data;
                    callback(data);
                });
            }
        };
    });
