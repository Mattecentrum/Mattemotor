'use strict';

/**
 * @ngdoc directive
 * @name mattemotorApp.directive:multiField
 * @description
 * # multiField
 */
angular.module('mattemotorApp')
    .directive('multiField', function ($compile) {
        
        

        var linker = function (scope, element) {
            var template = scope.$parent.inputformat,
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
        

            if (scope.$parent.inputformat) {
                for (var answer in scope.$parent.expectedanswer) {
                    var tmp = '$parent.answer.' + answer + '.Answer';

                    for (var j = tokenized.length - 1; j >= 0; j--) {
                        if (tokenized[j] === '[[' + answer + ']]') {
                            var onTouchStart = 'this.type = &#39;number&#39;',
                                onFocus = 'setTimeout("this.type=&#39;text&#39;",100)';
                            tokenized[j] = '<input type="text" ng-model="' + tmp + '" ng-class="$parent.GetAnswerClass($parent.answer.' + answer + ')" ng-focus="$parent.ResetField($parent.answer.' + answer + ')" ng-keydown="$parent.keypressCallback($event,$parent.answer.' + answer + ')" ontouchstart="' + onTouchStart + '" onfocus="' + onFocus + '"/>';
                        }
                    }
                }
            }

            element.html(tokenized.join(''));
            $compile(element.contents())(scope.$parent);
        };
       
        return {
            restrict: 'A',
            replace: true,
            link: linker,
            scope: {
                content: '=',
                key: '='
            }
        };
  });
