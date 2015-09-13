'use strict';

/**
 * @ngdoc function
 * @name mattemotorApp.controller:ExercisectrlCtrl
 * @description
 * # ExercisectrlCtrl
 * Controller of the mattemotorApp
 */
angular.module('mattemotorApp')
  .controller('ExerciseCtrl', ['$scope', '$routeParams', '$interpolate', '$rootScope',  '$filter', '$sce', '$window', '$translate', '$location', 'exercise', 'typeResolver', 'progress', 'pager',
    function ($scope, $routeParams, $interpolate, $rootScope, $filter, $sce, $window, $translate, $location, exercise, typeResolver, progress, pager) {

    function initExercise(data) {

         //Setup answer model so we can keep track of correct answers
        $scope.answer = {};
        $scope.mathVars = {};
        
        setVariables(data.variables);
        evaluateExpectedAnswer($scope.exercise);
        eachRecursive($scope.exercise);

        for (var a in $scope.exercise.expectedanswer) {
            $scope.answer[a] = { 'Answer': null, 'Correct': false, 'Error': false };
        }

        //shuffle options if contains multichoice
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
            //If the value is of type array i.e from - to
            if (typeResolver.typeOf(range) === 'array') {
                $scope.mathVars[variable] = randomize(range[0], range[1]);
            } else {
                $scope.mathVars[variable] = range;
            }
        }   
    }

    function evaluateExpectedAnswer(exercise) {
        var toFunc = new $window.ToFunc(),
            varNames = [],
            mathed = null,
            func = null,
            args = [];

        $scope.mathValues = [];

        for (var i in $scope.mathVars) {
            varNames.push(i);
            $scope.mathValues.push($scope.mathVars[i]);
        }

        varNames.push('answer');

        for (var key in exercise.expectedanswer) {
            args = [];
            var obj = exercise.expectedanswer[key];
            var type = typeResolver.typeOf(obj);

            if (type === 'array') {
                for (var j = 0; j < obj.length; j++) {
                    var arrayElement = obj[j];
                    mathed = toFunc.Parse(arrayElement);
                    mathed = mathed.replace(/\\/g, '\\\\');
                    args = varNames.slice(0);
                    args.push(mathed);
                    func = Function.apply(null, args);
                    exercise.expectedanswer[key][j] = func;
                }
            } else if (type === 'object') {
                for (var prop in obj) {
                    var propertyValue = obj[prop];
                    mathed = toFunc.Parse(propertyValue);
                    mathed = mathed.replace(/\\/g, '\\\\');
                    args = varNames.slice(0);
                    args.push(mathed);
                    func = Function.apply(null, args);
                    exercise.expectedanswer[key][prop] = func;
                }
            } else {
                mathed = toFunc.Parse(exercise.expectedanswer[key]);
                mathed = mathed.replace(/\\/g, '\\\\');
                args = varNames.slice(0);
                args.push(mathed);
                func = Function.apply(null, args);
                exercise.expectedanswer[key] = func;
            }
        }
    }

    function eachRecursive(obj, level, isFunctiongraphs) {
        level = level || 1;
        isFunctiongraphs = isFunctiongraphs || false;
        for (var k in obj) {
           
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
        var expectedAnswer = '';
        for (var propertyName in $scope.exercise.expectedanswer) {
           expectedAnswer = '';
            //If mathValues is empty/undefined answer push empty string
            if ($scope.mathValues.length === 0) {
                $scope.mathValues.push('');
            }

            //If the answer is of type array take the first alternative since we can't show two
            if (typeResolver.typeOf($scope.exercise.expectedanswer[propertyName]) === 'array') {
                expectedAnswer = $scope.exercise.expectedanswer[propertyName][0].apply(null, $scope.mathValues);
            } else {
                expectedAnswer = $scope.exercise.expectedanswer[propertyName].apply(null, $scope.mathValues);

                if ($scope.exercise.showcorrectanswer && $scope.exercise.showcorrectanswer[propertyName]) {
                    eval('$scope.funcDynamicAnswer =' + $scope.exercise.showcorrectanswer[propertyName]);
                    expectedAnswer = $scope.funcDynamicAnswer();
                }
            }

            var answer = $scope.answer[propertyName];

            answer.Answer = expectedAnswer;
            answer.Correct = true;
            answer.Error = false;
            $scope.Cheated = true;
        }
    };

    $scope.ResetField = function(exercise) {
        exercise.Error = false;
        exercise.Correct = false;
    };

    $scope.GetAnswerClass = function(exercise) {
        var result = [];

        if (exercise.Error) {
            result.push('incorrect');
        } else if (exercise.Correct) {
            result.push('correct');
        }

        return result;
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

    $scope.SetToSequence = function(answer, option) {
        
        if(answer.Answer == null) {
            answer.Answer = [];
        }

        option = new String(option).toString();
        answer.Answer.push(option);
    };

    $scope.GetClassesForButton = function(exercise, option) {
        var classes = [];

        if (exercise.Error) {
            classes.push('incorrect');
        } else if (exercise.Correct) {
            classes.push('correct');
        }

        if (exercise.Answer === option) {
            classes.push('selected');
        }

        return classes;
    };

    function createFunc(str) {
        var varNames = [],
            i,
            toFunc,
            mathed,
            args,
            func;

        $scope.mathValues = [];

        for (i in $scope.mathVars) {
            varNames.push(i);
            $scope.mathValues.push($scope.mathVars[i]);
        }

        varNames.push('answer');
        args = varNames.slice(0);
        
        toFunc = new $window.ToFunc();

        mathed = toFunc.Parse(str).replace(/\\/g, '\\\\');

        args.push(mathed);

        func = Function.apply(null, args);

        return func;
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

    //http://docs.angularjs.org/api/ng.$interpolate could probably be used
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

    function answersEqual(givenAnswer, predefinedAnswer) {
        var equal = false,
            tmp = null,
            args = [];

        if (predefinedAnswer === null || typeof(predefinedAnswer) === 'undefined') {
            throw 'Must have an answer for the exercise';
        }

        var type = typeResolver.typeOf(predefinedAnswer);

        if (type === 'array') {
            
            args = $scope.mathValues.slice(0);
            args.push(givenAnswer);

            var arr = [];

            for (var i = 0; i < predefinedAnswer.length; i++) {
                tmp = predefinedAnswer[i].apply(null, args);
                
                if (tmp === givenAnswer.Answer) {
                    equal = true;
                    break;
                }
            }
            //Simple array compare, could be switched for something faster
            equal = JSON.stringify(givenAnswer.Answer)==JSON.stringify(a2)

        } else if (type === 'object') {
            equal = true;
            for (var propertyName in predefinedAnswer) {
                args = $scope.mathValues.slice(0);
                args.push(givenAnswer.Answer[propertyName]);

                tmp = predefinedAnswer[propertyName].apply(null, args);

                if (tmp !== givenAnswer.Answer[propertyName]) {
                    equal = false;
                    break;
                }
            }
        } else {
            //If we replace , with . is it a number? The convert so the input to the function is a number else let it be
            var convertedInput = isNumber(givenAnswer.Answer.toString().replace(',', '.')) ? givenAnswer.Answer.toString().replace(',', '.') : givenAnswer.Answer;
            var inputArr = $scope.mathValues.slice(0);
            inputArr.push(convertedInput);

            var answer = predefinedAnswer.apply(null, inputArr);

            if (typeResolver.typeOf(answer) === 'boolean') {
             return answer;
            }

            //If answer is simple just check for equality and return
            if (typeResolver.typeOf(answer) === 'number' || typeResolver.typeOf(answer) === 'string') {
                var cleanComma = convertedInput.toString();
                var cleanAnswer = answer.toString().replace(',', '.');
                if (isNumber(cleanComma) && isNumber(cleanAnswer)) {
                    return parseFloat(cleanComma) === parseFloat(cleanAnswer);
                }

                return answer === cleanComma;
            }
        }
        return equal;
    }

    $scope.verify = function(answer) {
        var givenAnswers = [];
       
        for (var propertyName in $scope.exercise.expectedanswer) {
            var predefinedAnswer = $scope.exercise.expectedanswer[propertyName],
                givenAnswer = answer[propertyName],
                equal = answersEqual(givenAnswer, predefinedAnswer);

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
