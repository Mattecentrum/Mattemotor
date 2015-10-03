'use strict';

/**
 * @ngdoc function
 * @name mattemotorApp.controller:ExercisectrlCtrl
 * @description
 * # ExercisectrlCtrl
 * Controller of the mattemotorApp
 */
angular.module('mattemotorApp')
  .controller('ExerciseCtrl', ['$scope', '$routeParams', '$interpolate', '$rootScope',  '$filter', '$sce', '$window', '$translate', '$location', 'exercise', 'typeResolver', 'progress', 'pager', 'equalService',
    function ($scope, $routeParams, $interpolate, $rootScope, $filter, $sce, $window, $translate, $location, exercise, typeResolver, progress, pager, equalService) {

    function initExercise(data) {

         //Setup answer model so we can keep track of correct answers
        $scope.answer = {};
        $scope.mathVars = {};
        
        setVariables(data.variables);
        eachRecursive($scope.exercise);

        for (var a in $scope.exercise.expectedanswer) {
            $scope.answer[a] = { 'Answer': null, 'Correct': false, 'Error': false };
        }

        //shuffle options if contains multichoice move to directive
        if (data.multichoice) {
            for (var name in data.multichoice) {
                data.multichoice[name].options = shuffle(data.multichoice[name].options);
            }
        }

        $scope.exercise.exercise = $sce.trustAsHtml(data.exercise);
    }

    //Load exercise
    $scope.exercise = exercise.get({ exerciseId: $routeParams.exerciseId, language: $routeParams.language }, initExercise);
    
    function setVariables(variables) {
        var variable,
            range;

        if(!variables) {
            return;
        }

        for (variable in variables) {
            range = variables[variable];
            $scope.mathVars[variable] = typeResolver.isArray(range) ? randomize(range[0], range[1]) : range;
        }   
    }

    function eachRecursive(obj, level, isFunctiongraphs) {
        level = level || 1;
        isFunctiongraphs = isFunctiongraphs || false;
        for (var k in obj) {
           
            //dont evaluate expected answer before we got an answer
            if(k == "expectedanswer") continue;

            if (level === 2) {
                isFunctiongraphs = k === 'functiongraphs';
            }

            if (!obj.hasOwnProperty(k)) {
                continue;
            }

            if (typeof obj[k] === 'object') {
                eachRecursive(obj[k], level + 1, isFunctiongraphs);
            } else if (typeof obj[k] === 'string') {
                var expressions = getExpression(obj[k]);

                if (expressions === null) {
                    continue; 
                }

                for (var i = 0; i < expressions.length; i++) {
                    var expression = expressions[i];
                    
                    if (expression !== undefined && expression !== '') {
                        var mathIt = $window.mathjs(expression);
                        expression = obj[k].replace(expression, mathIt);
                        
                        if (!isFunctiongraphs) {
                            var func = createFunc(obj[k]);
                            obj[k] = func.apply(null, $scope.mathValues);
                        } else {
                            obj[k] = evaluateExpression(expression, isFunctiongraphs).toString();
                        }
                    }
                }
            }
        }
    }

     //+ Jonas Raoni Soares Silva
    //@ http://jsfromhell.com/array/shuffle [v1.0]
    function shuffle(o) { //v1.0
        for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x){}
        return o;
    }

    $scope.keypressCallback = function($event) {
        //enter
        if ($event.keyCode === 13) {
            $event.preventDefault();
            $scope.verify($scope.answer);
        }
    };

    $scope.showAnswer = function() {
        for (var key in $scope.exercise.expectedanswer) {
            $scope.answer[key] = {
                Answer: equalService.getCorrectAnswer($scope.mathVars, $scope.exercise.expectedanswer[key]),
                Correct: true,
                Error: false
            };

            $scope.Cheated = true;


        }

        $rootScope.$broadcast('showAnswer', $scope.answer);
    };

    $scope.ResetField = function(exercise) {
        exercise.Error = false;
        exercise.Correct = false;
    };

    $scope.GetAnswerClass = function(exercise) {
        if (exercise.Error) {
            return ['incorrect'];
        } else if (exercise.Correct) {
            return ['correct'];
        }
    };

    $scope.GetClassForGraph = function() {
        return $scope.GetAnswerClass({ Error: $scope.Error, Correct: $scope.Correct });
    };

    $scope.SetAnswerForButton = function(answer, option) {
        option = new String(option).toString();
        
        answer.Correct = false;
        answer.Error = false;
        answer.Answer = option;
    };

    $scope.GetClassesForButton = function(exercise, option) {
        var classes = [];
        
        if (exercise.Answer === option) {
            classes.push('selected');
        }
        
        if (exercise.Error) {
            classes.push('incorrect');
        } else if (exercise.Correct) {
            classes.push('correct');
        }

        return classes;
    };

    function createFunc(str) {
        var varNames = [],
            i,
            toFunc,
            mathed;

        $scope.mathValues = [];

        for (i in $scope.mathVars) {
            varNames.push(i);
            $scope.mathValues.push($scope.mathVars[i]);
        }

        varNames.push('answer');
        
        toFunc = new $window.ToFunc();

        mathed = toFunc.Parse(str).replace(/\\/g, '\\\\');

        return new Function(varNames, mathed);
    }

    function randomize(from, to) {
        //100 -  = seed
        //10-1 === 1 to 10
        var fromSplit = from.toString().split('.'),
            toSplit = to.toString().split('.'),
            decimals = 0,
            seed = to - from,
            randomNumber = 0,
            pow = 0,
            result = 0;
        
        if (fromSplit.length > 1) {
            decimals = fromSplit[1].length;
        }
        
        if (toSplit.length > 1) {
            var tmp = toSplit[1].length;
            if (tmp > decimals) {
                decimals = tmp; 
            }
        }

        randomNumber = ((Math.random() * seed) + from);
        pow = Math.pow(10, decimals);
        result = Math.round(randomNumber * pow) / pow;
        return result;
    }

    function getExpression(str) {
        var pattern = new RegExp('{{.*?}}', 'g');
        return str.match(pattern);
    }

    function evaluateExpression(value, isFunctiongraph) {
        var expressions = value,
            func,
            result;

        if (expressions === null) {
            return value;
        }

        func = createFunc(expressions);
        result = func.apply(null, $scope.mathValues);

        if (isFunctiongraph) {
            console.log("value", value);
            if (typeResolver.typeOf(value) === 'string' && value.indexOf('{{') >= 0 && value.indexOf('}}') >= 0) {
                if (value.indexOf('function(') === -1 && !isFunctiongraph) {
                    value = value.replace(/}}/g, ' | number }}');
                }
                result = result.replace(/,/g, '.');
                var exp = $interpolate(result);
                result = exp($scope);
            }
        }

        return result;
    }

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    $scope.verify = function(answer) {
        var givenAnswers = [];
         console.log("predefinedAnswer", $scope.exercise.expectedanswer)
        for (var propertyName in $scope.exercise.expectedanswer) {
            var predefinedAnswer = $scope.exercise.expectedanswer[propertyName],
                givenAnswer = answer[propertyName];


               
                var equal = equalService.isEqual($scope.mathVars, givenAnswer.Answer, predefinedAnswer);

            givenAnswers.push(givenAnswer);
            
            //If the exercise is incorrect we check the exercise if there is a match for the specific error
            //else default error message if any
            if (!equal && $scope.exercise.error.definederrors !== undefined) {
                var definederrors = $scope.exercise.error.definederrors || undefined;

                if (definederrors !== undefined && definederrors.length > 0) {
                    for (var i = definederrors.length - 1; i >= 0; i--) {
                        var definedError = definederrors[i].match;
                        //And defined error matched the answer set error message
                        if (givenAnswer.Answer === definedError) {
                            $scope.exercise.error.message = definederrors[i].message;
                        }
                    }
                }
            }

            givenAnswer.Correct = equal;
            givenAnswer.Error = !equal;
            givenAnswer.current = true;
            answer[propertyName] = givenAnswer;
        }

        $rootScope.$broadcast('answered', answer);

        //Iterate over all given answeres and set the correct false flag on scope.
        for (var item in answer) {
            $scope.Error = false;
            $scope.Correct = false;

            if (!answer[item].Correct) {
                $scope.Error = true;
                break;
            }

            $scope.Correct = !$scope.Error;
        }

        progress.AddProgress({
            id: $scope.exercise.id,
            correct: $scope.Correct,
            error: $scope.error
        });
    };

    $scope.next = function() {
        var path = $location.$$path, 
            segments = path.split('/');

        if (pager.last()) {
            //remove last item
            segments.pop();
            segments.pop();
            segments.push('result');
            $location.path(segments.join('/'));
        } else {
            pager.next();
        }
    };
}]);
