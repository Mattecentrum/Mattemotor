'use strict';

/**
 * @ngdoc directive
 * @name mattemotorApp.directive:sequence
 * @description
 * # sequence
 */
angular.module('mattemotorApp')
  .directive('etSequence', function () {
    return {
    	scope : {
            items: '=',
            answer: '='
        },
    	templateUrl: '/views/templates/et-sequence.html',
    	controller: ['$rootScope', '$scope' , function($rootScope, $scope) {
    		//When show answer is clicked callback to set
    		$rootScope.$on('showAnswer', function (event, msg) {
	            for (var propertyName in msg) {
	               $scope.items[key].options = msg[propertyName].Answer;
	            }
        	});

    		for(var key in $scope.answer) {
    			$scope.answer[key].Answer = $scope.items[key].options;
    		}

    		$scope.GetClassesForButton = function(name, option) {
    			var exercise = $scope.answer[name];
        		var cssClasses =  exercise.Answer === option ? ['selected'] : [];
        		cssClasses.push(exercise.Error ? 'incorrect' : exercise.Correct ? 'correct' : '');
        		return cssClasses;
    		};

    		$scope.dragControlListeners = {
    			//accept: function (sourceItemHandleScope, destSortableScope) {return true;},//override to determine drag is allowed or not. default is true.
    			//itemMoved: function (event) {return true;},
			    orderChanged: function(event) {
			    	var parentName = event.dest.sortableScope.$parent.name,
			    		modelValue = event.dest.sortableScope.modelValue;
			    	$scope.answer[parentName].Answer = modelValue;
			    },
			    //containment: '#board',//optional param.
			    //clone: true //optional param for clone feature.
			};

    	}]
    	
    };
  });
