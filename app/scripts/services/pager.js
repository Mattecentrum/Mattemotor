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
                    current = segments[segments.length - 1],
                    i;

                //Note use $route or $routParams to get the current exerciseId
                for (i = exercises.length - 1; i >= 0; i--) {
                    if (exercises[i].id == current) {
                        if (i <= exercises.length - 2) {
                            segments[segments.length - 1] = exercises[i + 1].id;
                        }
                    }
                }
       
                $location.path(segments.join('/'));
            },

            goTo: function (index) {
                var exercises = exerciseList.GetCurrent().exercises,
                    segments = $location.$$path.split('/'),
                    url,
                    language,
                    listId,
                    exerciseId;
                //Note use $route or $routParams to get the current exerciseId

                language = segments[1];
                listId = segments[3];
                exerciseId = exercises[index].id;
               
                url = '/' + language + '/list/' + listId + '/exercise/' + exerciseId;

                $location.path(url);
            },

            //Needs comments because very unclear what happens here. 
            //Refactor name to IsLast() or equal
            isLast: function () {
                var exercises = exerciseList.GetCurrent().exercises,
                    segments = $location.$$path.split('/');
               
                return exercises[exercises.length - 1].id == segments[segments.length - 1];
            },

            goToresultPage: function () {
                var segments = $location.$$path.split('/');            
                segments.pop();
                segments.pop();
                segments.push('result');
                $location.path(segments.join('/'));
            },

            isResultPage: function () {
                var segments = $location.$$path.split('/');

                return segments[segments.length - 1] === 'result';
            }
        };
    }]);
