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
    	templateUrl: 'views/templates/et-sequence.html',
    	controller: ['$rootScope', '$scope' , function($rootScope, $scope) {
    		//When show answer is clicked callback to set
    		$rootScope.$on('showAnswer', function (event, msg) {
	           //check if message is for me
                if(msg.inputType != 'sequence') return;

                for (var propertyName in msg) {

                    var newArr = msg[propertyName].Answer.slice();

                    for (var i = 0; i < newArr.length; i++) {
                        newArr[i] = i+newArr[i];
                    }

	               $scope.items[propertyName].options = newArr;
	            }
        	});

            for (var p in $scope.items) {
                for (var j = 0; j < $scope.items[p].options.length; j++) {
                     $scope.items[p].options[j] = j + $scope.items[p].options[j];
                }
            }
            
            

    		for(var key in $scope.answer) {
                // for (var k = 0; k < $scope.items[key].options.length; k++) {
                //     $scope.items[key].options[k] = $scope.items[key].options[k].substring(1);
                // }

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
                    
                    var newArr = modelValue.slice();

                    for (var i = 0; i < newArr.length; i++) {
                        newArr[i] = newArr[i].substring(1)
                    }


                    $scope.answer[parentName].Answer = newArr;
			    },
			    //containment: '#board',//optional param.
			    //clone: true //optional param for clone feature.
			};

    	}]
    	
    };
  });
