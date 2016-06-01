'use strict';

/**
 * @ngdoc directive
 * @name mattemotorApp.directive:etButton
 * @description
 * # etButton
 */
angular.module('mattemotorApp')
  .directive('etButton', function () {
    return {
    	scope: { 
                items: '=',
                answer: '='
            },
    	controller: ['$scope', function($scope) {
    		
            $scope.GetClassesForButton = function(name, option) {
    			var exercise = $scope.answer[name];
        		var cssClasses =  exercise.Answer === option ? ['selected'] : [];
        		cssClasses.push(exercise.Error ? 'incorrect' : exercise.Correct ? 'correct' : '');
        		return cssClasses;
    		};

    		$scope.SetAnswerForButton = function(name, option) {
        		var answer = $scope.answer[name];
        		answer.Correct = answer.Error = false;
        		answer.Answer = new String(option).toString();
    		};
    	}],
    	templateUrl: 'views/templates/et-button.html'
    };
});
