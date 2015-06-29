'use strict';

/**
 * @ngdoc service
 * @name mattemotorApp.pager
 * @description
 * # pager
 * Handles urls for the app
 */
angular.module('mattemotorApp')
    .factory('pager', ['$route','$location', 'exerciseList', function ($route, $location, exerciseList) {
        return {
            next: function () {
                var exercises = exerciseList.GetCurrent().exercises,
                    segments = $location.$$path.split('/'),
                    current = segments[segments.length - 1];

                for (var i = exercises.length - 1; i >= 0; i--) {
                    if (exercises[i].id === current) {
                        if (i <= exercises.length - 2) {
                            segments[segments.length - 1] = exercises[i + 1].id;
                        }
                    }
                }
                
                $location.path(segments.join('/'));
            },

            goTo: function (index) {
                var exercises = exerciseList.GetCurrent().exercises,
                    segments = $location.$$path.split('/');

                segments[segments.length - 1] = exercises[index].id;
                
                $location.path(segments.join('/'));
            },

            //Needs comments because very unclear what happens here. 
            last: function () {
                var exercises = exerciseList.GetCurrent().exercises,
                    segments = $location.$$path.split('/'),
                    current = segments[segments.length - 1];

                for (var i = 0; i < exercises.length; i++) {
                   if (exercises[i].id === current) {
                        return (i === exercises.length - 1);
                    }
                }

                throw 'Error, not last but...';
            }
        };
    }]);
