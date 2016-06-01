'use strict';

/**
 * @ngdoc function
 * @name mattemotorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mattemotorApp
 */
angular.module('mattemotorApp')
    .controller('MainCtrl', ['$rootScope', '$scope', '$route', '$routeParams', '$location', '$translate', 'pager', 'exerciseList', 'progress', function($rootScope, $scope, $route, $routeParams, $location, $translate, pager, exerciseList, progress) {
       
        $scope.exercises = {};
        $scope.pathName = document.location.pathname;
        $scope.$on('$routeChangeSuccess', function() {
            
            $translate.use($routeParams.language);  
            //Not we reload unnecessary          
            exerciseList.Load({ listId: $routeParams.listId, language: $routeParams.language }, function(data) {
                    //the property listid
                    for (var i = 0; i < data.exercises.length; i++) {
                        data.exercises[i].listId = $routeParams.listId;
                    }
                   
                    $scope.listId = $routeParams.listId;
                    $scope.language = $routeParams.language;
                    $scope.exercises = data;
                    $scope.setCurrentExercise();
                    //Load the first exercise if not defined in url
                    if (!$routeParams.exerciseId && !pager.isResultPage()) {
                        pager.goTo(0);
                    }
            });
        });
        
        $scope.getClass = function(exercise) {
            var result = [],
                status = progress.GetProgressByExerciseId(exercise.id);

            if (exercise.id == $routeParams.exerciseId) {
                result.push('current');
            }

            if(!status) return result; 

            if (status.error) {
                result.push('incorrect');
            } else if (status.correct) {
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
                exercises = $scope.exercises.exercises,
                i;

             for (i = 0; i < exercises.length; i++) {
                
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


