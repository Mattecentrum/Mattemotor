'use strict';

/**
 * @ngdoc function
 * @name mattemotorApp.controller:ExercisectrlCtrl
 * @description
 * # ExercisectrlCtrl
 * Controller of the mattemotorApp
 */
angular.module('mattemotorApp')
  .controller('ExerciseCtrl', ['$scope', '$routeParams', '$rootScope', '$sce', '$window', '$translate', 'exercise', 'progress', 'pager', 'equalService',
    function ($scope, $routeParams, $rootScope, $sce, $window, $translate, exerciseService, progress, pager, equalService) {

        function loadExerciseData(id, lang) {
            exerciseService.getExercise(id, lang)
                .then(function( data ) {
                    applyRemoteData( data );
                });
        }

        loadExerciseData($routeParams.exerciseId, $routeParams.language);

        function applyRemoteData(data) {
            var key,
                a,
                name;
            //Exercise properties
            $scope.answer = {};
            $scope.mathVars = {};

            for (key in data.variables) {
                $scope.mathVars[key] = angular.isArray(data.variables[key]) ? randomize(data.variables[key][0], data.variables[key][1]) : data.variables[key];
            }

            findAndParseExpression(data);

            $scope.expectedanswer = data.expectedanswer;
            $scope.multichoice = {};
            $scope.inputType = data.inputtype;
            $scope.graph = data.graph;
            $scope.name = data.name;
            $scope.error = data.error;
            $scope.correct = data.correct;
            $scope.id = data.id;
            $scope.inputformat = data.inputformat;
            $scope.image = data.image;

            $scope.exerciseText = $sce.trustAsHtml(data.exercise);

            for (a in data.expectedanswer) {
                $scope.answer[a] = {
                    Answer: null,
                    Correct: false,
                    Error: false
                };
            }

            for (name in data.multichoice) {
                $scope.multichoice[name] = {
                    options: shuffle(data.multichoice[name].options),
                    question: data.multichoice[name].question
                };
            }
        }

        function findAndParseExpression(obj) {
            var key;
            for (key in obj) {
                if (key === 'expectedanswer' || !obj.hasOwnProperty(key)) {
                    continue;
                }
                else if (angular.isObject(obj[key]) || angular.isArray(obj[key])) {
                    findAndParseExpression(obj[key]);
                }
                else if (angular.isString(obj[key])) { 
                    obj[key] = equalService.getCorrectAnswer($scope.mathVars, obj[key]); 
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
            if ($event.keyCode !== 13) return;

            $event.preventDefault();
            $scope.verify($scope.answer);
        };

        $scope.showAnswer = function() {
            for (var key in $scope.expectedanswer) {
                $scope.answer[key] = {
                    Answer: equalService.getCorrectAnswer($scope.mathVars, $scope.expectedanswer[key]),
                    Correct: true,
                    Error: false
                };

                $scope.Cheated = true;
            }

            $rootScope.$broadcast('showAnswer', $scope.answer);
        };

        $scope.ResetField = function(exercise) {
            exercise.Error = exercise.Correct = false;
        };

        $scope.GetAnswerClass = function(exercise) {
            return exercise.Error ? ['incorrect'] : exercise.Correct ? ['correct']  : [];
        };

        $scope.GetClassForGraph = function() {
            return $scope.GetAnswerClass({ Error: $scope.Error, Correct: $scope.Correct });
        };

        function randomize(from, to) {
            var fromSplit = from.toString().split('.'),
                toSplit = to.toString().split('.'),
                decimals = fromSplit[1] ? fromSplit[1] : 0,
                seed = to - from,
                tmp = toSplit[1] ? toSplit.length : 0,
                decimals = tmp > decimals ? tmp : decimals,
                pow = Math.pow(10, decimals),
                randomNumber = ((Math.random() * seed) + from);
            return Math.round(randomNumber * pow) / pow;
        }

        $scope.verify = function(answer) {
            $scope.Correct = true;
            $scope.Error = false;

            for (var propertyName in $scope.expectedanswer) {
                var predefinedAnswer = $scope.expectedanswer[propertyName],
                    givenAnswer = answer[propertyName],
                    equal = equalService.isEqual($scope.mathVars, givenAnswer.Answer, predefinedAnswer);

                if (!equal) {
                    var definederrors = $scope.error.definederrors || undefined;
                    for(var e in definederrors) {
                        $scope.error.message = givenAnswer.Answer == definederrors[e].match ? definederrors[e].message : "";
                    }
                }

                givenAnswer.Correct = equal;
                givenAnswer.Error = !equal;
                givenAnswer.current = true;
                answer[propertyName] = givenAnswer;

                if(!equal) {
                    $scope.Correct = false;
                    $scope.Error = true;
                }
            }

            $rootScope.$broadcast('answered', answer);

            progress.AddProgress({
                id: $scope.id,
                correct: $scope.Correct,
                error: $scope.Error
            });
        };

        $scope.next = function() {
            if (pager.last())  pager.goToresultPage();
            else pager.next();
        };
    }
]);
