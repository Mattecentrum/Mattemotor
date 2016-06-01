'use strict';

/**
 * @ngdoc directive
 * @name mattemotorApp.directive:etMultifield
 * @description
 * # etMultifield
 */
angular.module('mattemotorApp')
  .directive('etMultifield', function () {
    return {
      	templateUrl: 'views/templates/et-multifield.html',
    
        scope: {
            inputformat: '=',
            items: '=',
            answer: '='
        },

        controller: ['$scope', function($scope) {
        	var template = $scope.inputformat,
                index = 0,
            	tokenized = [];
            
            for (var i = 0; i < template.length; i++) {
                if (template[i] === '[' && template[i + 1] === '[') {
                    index++;
                } else if (template[i] === ']' && template[i + 1] === ']') {
                    tokenized[index] += ']]';
                    index++;
                    i = i + 1;
                    continue;
                }

                if (!tokenized[index]){
                    tokenized[index] = '';
                }

                tokenized[index] += template[i];
            	
            }

            for (var i = 0; i < tokenized.length; i++) {
            	tokenized[i] = tokenized[i].replace('[[','').replace(']]','');
            };

            $scope.tokens = tokenized;

            $scope.GetAnswerClass = function(key) {
            	return $scope.answer[key].Error ? ['incorrect'] : $scope.answer[key].Correct ? ['correct']  : [];
        	};
        }]
    }
  });