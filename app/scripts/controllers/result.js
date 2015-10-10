'use strict';

/**
 * @ngdoc function
 * @name mattemotorApp.controller:ResultCtrl
 * @description
 * # ResultCtrl
 * Controller of the mattemotorApp
 */
angular.module('mattemotorApp')
  .controller('ResultCtrl', ['$scope', '$translate', '$routeParams', '$location', 'exerciseList', 'progress', function ($scope, $translate, $routeParams, $location, exerciseList, progress) {
        
        $translate.use($routeParams.language);

        $scope.exercises = exerciseList.GetCurrent();
        
        var numberOfCorrectAnswers = 0,
            numberOfExercises = $scope.exercises.exercises.length,
            i;

        for (i = $scope.exercises.exercises.length - 1; i >= 0; i--) {
            numberOfExercises += $scope.exercises.exercises[i].correct ? 1 : 0;
        }

        $translate('RESULT_MESSAGE', { 
            numberOfCorrectAnswers: numberOfCorrectAnswers,
            numberOfExercises: numberOfExercises
        }).then(function(resultMessage){
            $scope.resultMessage = resultMessage;
        });


        $scope.resetExerciseList = function() {
            for (var i = $scope.exercises.exercises.length - 1; i >= 0; i--) {
                Progress.RemoveProgress($scope.exercises.exercises[i]);

                $scope.exercises.exercises[i].correct = false;
                $scope.exercises.exercises[i].error = false;
            }

            exerciseList.SetCurrent($scope.exercises);
        };

        $scope.redo = function() {
            $scope.resetExerciseList();

            var path = $location.$$path, segments = path.split('/');

            //remove last item
            segments.pop();
            segments.push($scope.exercises.exercises[0].id);
            $location.path(segments.join("/"));
        };

        $scope.next = function() {
            var path = $location.$$path,
                segments = path.split('/');

            //remove last item
            segments.pop();
            //remove last item
            segments.pop();

            segments.push($scope.exercises.next.id);
            $location.path(segments.join("/"));
        };
  }]);
