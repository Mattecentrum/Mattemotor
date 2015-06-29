'use strict';

/**
 * @ngdoc function
 * @name mattemotorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mattemotorApp
 */
angular.module('mattemotorApp')
    .controller('MainCtrl', ['$scope', '$route', '$routeParams', '$location', 'pager', 'exerciseList', 'progress', function($scope, $route, $routeParams, $location, pager, exerciseList, progress) {
       
        $scope.exercises = {};

        $scope.$on('$routeChangeSuccess', function() {
            
            if ($routeParams.listId && $scope.listId !== $routeParams.listId) {
                exerciseList.Load({ listId: $routeParams.listId }, function(data) {
                    
                    //the property listid
                    for (var i = 0; i < data.exercises.length; i++) {
                        data.exercises[i].listId = $routeParams.listId;
                    }
                   
                    $scope.listId = $routeParams.listId;

                    $scope.exercises = data;

                    $scope.setCurrentExercise();

                    //Load the first exercise if only list
                    if (!$routeParams.exerciseId) {
                        pager.goTo(0);
                    }
                });
            }   

            $scope.setCurrentExercise();
        });
        
        $scope.getClass = function(exercise) {
            var result = [];

            if (exercise.current) {
                result.push('current');
            }

            if (exercise.error) {
                result.push('incorrect');
            } else if (exercise.correct) {
                result.push('correct');
            }

            return result;
        };
       
        $scope.setCurrentExercise = function() {
            var exercises = $scope.exercises.exercises;
            
            if (!exercises) {
                return;
            }
            
            for (var i = 0; i < exercises.length; i++) {
                exercises[i].current = (exercises[i].id === $routeParams.exerciseId);
            }
        };

        $scope.$on('handleBroadcast', function() {
            if ($scope.exercises === undefined){
                return;
            } 

            $scope.updateProgress();
        });

        $scope.updateProgress = function() {
            var currentProgress = progress.GetProgress(),
                exercises = $scope.exercises.exercises;

            for (var i = 0; i < exercises.length; i++) {
                
                //Todo clean this should not be needed
                if (!currentProgress[exercises[i].id]) {
                    continue;
                }
    
                exercises[i] = currentProgress[exercises[i].id];
                exercises[i].current = (exercises[i].id === $routeParams.exerciseId);
                exercises[i].listId = $scope.listId;
            }

            exerciseList.SetCurrent($scope.exercises);
        };
 }]);


