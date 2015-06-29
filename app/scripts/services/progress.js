'use strict';

/**
 * @ngdoc service
 * @name mattemotorApp.progress
 * @description
 * # progress
 * Factory in the mattemotorApp.
 */
angular.module('mattemotorApp')
    .factory('progress', function ($cookies, $rootScope) {
        var exercises = $cookies.exercises,
            sharedService = {};

        return {
           
            AddProgress: function (exercise) {
                //No data in cookie push
                exercises = exercises || {};
                 
                exercises[exercise.id] = exercise;
                
                $cookies.exercises = exercises;

                sharedService.prepareForBroadcast = function (exercises) {
                    this.exercises = exercises;
                    this.broadcastItem();
                };

                sharedService.broadcastItem = function () {
                    $rootScope.$broadcast('handleBroadcast');
                };

                sharedService.prepareForBroadcast(exercises);
            },

            GetProgress: function () {
                var exercises = $cookies.exercises;
                return exercises;
            }
        };
    });

