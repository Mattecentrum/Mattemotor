'use strict';

/**
 * @ngdoc service
 * @name mattemotorApp.Exercises
 * @description
 * # Exercises
 * Factory in the mattemotorApp.
 */
angular.module('mattemotorApp')
    .factory('exerciseList', function (config, $resource, $http) {
        var self = this;
        return {
            SetCurrent: function (list) {
                self.currentList = list;
            },
            
            GetCurrent: function () {
                return self.currentList;
            },

            Load: function (options, callback) {
                var url = 'json/:language/list/:listId.json'
                
                if(config != null && config.endpoints != null) {
                    url = config.endpoints.list;
                }

                var call = $resource(url, {}, {
                    query: { method: 'GET', params: { listId: 'all', language: 'all' }, isArray: true }
                });

                call.get(options, function (data) {
                    self.currentList = data;
                    callback(data);
                });
            }
        };
    });
