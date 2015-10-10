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
        var exercises = $cookies.exercises || {},
            sharedService = {};

        return {
           
            AddProgress: function (exercise) { 
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

            GetProgress: function GetProgress() {
                return $cookies.exercises || {};
            },

            GetProgressByExerciseId: function(id) {
                var progress = $cookies.exercises || {};

                if(progress[id]) {
                    return progress[id];
                } 

                return undefined; 
            }
        };
    });

