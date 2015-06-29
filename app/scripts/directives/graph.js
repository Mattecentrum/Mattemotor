'use strict';

/**
 * @ngdoc directive
 * @name mattemotorApp.directive:graph
 * @description
 * # graph
 */
angular.module('mattemotorApp')
  .directive('graph', function ($rootScope, $window) {
    // return the directive link function. (compile function not needed)
    var defaultOpt = function (option, defaultOption) {
        if (typeof option === 'boolean') {
            return option;
        }

        return option || defaultOption;
    };

    return function (scope, element, attrs) {
        //listen to answered event
        $rootScope.$on('answered', function (event, msg) {
            for (var propertyName in msg) {
                var JSXGraphElement = scope.JSXGraphElements[propertyName];

                if (JSXGraphElement) {
                    if (msg[propertyName].Correct) {
                        JSXGraphElement.setAttribute({ fillColor: '#6fe77d', strokeColor: '#6fe77d' });
                    }
                    else {
                        JSXGraphElement.setAttribute({ fillColor: '#ef8b8b', strokeColor: '#ef8b8b' });
                    }
                }
            }
        });

        //graph manipulation
        scope.JSXGraphOptions = {
            'Angles': 'Angles',
            'Arch': 'Arc',
            'arrows':
            {
                'JSXGraphName': 'arrow'
            },
            'Arrowparalleles': 'Arrowparallel',
            'Axis': 'Axis',
            'Bisectors': 'Bisector',
            'Bisectorlines': 'Bisectorlines',
            'Circles': 'Circle',
            'Circumcenters': 'Circumcenter',
            'Circumcircles': 'Circumcircle',
            'CircumcircleArch': 'CircumcircleArc',
            'Circumcirclesectors': 'Circumcirclesector',
            'Conics': 'Conics',
            'Curves': 'Curve',
            'Ellipses': 'Ellipse',
            'functiongraphs': {
                'priority': 1,
                'JSXGraphName': 'functiongraph'
            },
            'gliders': {
                'priority': 2,
                'JSXGraphName': 'glider',
            },
            'Grids': 'Grid',
            'Hyperbolas': 'Hyperbola',
            'Images': 'Images',
            'Incenters': 'Incenter',
            'Incircles': 'Incircle',
            'Inequalities': 'Inequality',
            'integrals': {
                'JSXGraphName': 'integral'
            },
            'Intersections': 'Intersection',
            'lines': {
                'JSXGraphName': 'line'
            },
            'Locus': 'Locus',
            'Midpoints': 'Midpoint',
            'MinorArch': 'MinorArc',
            'Mirrorpoints': 'Mirrorpoint',
            'Normals': 'Normal',
            'Orthogonalprojections': 'Orthogonalprojection',
            'OtherIntersections': 'OtherIntersection',
            'Parabolas': 'Parabola',
            'Parallels': 'Parallel',
            'parallelpoints': {
                'JSXGraphName': 'line'
            },
            'Perpendiculars': 'Perpendicular',
            'Perpendicularpoints': 'Perpendicularpoint',
            'points': {
                'priority': 1,
                'JSXGraphName': 'point'
            },
            'polygons': {
                'JSXGraphName': 'polygon'
            },
            'Reflection': 'Reflections',
            'RegularPolygons': 'RegularPolygon',
            'Riemannsums': 'Riemannsum',
            'Sectors': 'Sector',
            'Segments': 'Segment',
            'Semicircles': 'Semicircle',
            'Sliders': 'Slider',
            'tangents': {
                'JSXGraphName': 'tangent'
            },
            'texts': {
                'JSXGraphName': 'text'
            },
            'Ticks': 'Ticks',
            'Tracecurves': 'Tracecurve',
            //Custom objects
            'triangles': {
                'JSXGraphName': 'triangle'
            },
            'vectors': {
                'JSXGraphName': 'vector'
            }
        };

        scope.createFunc = function (func) {
            var result = (function (fun) {
                return new Function('x', 'return (' + fun + ');');
            })(mathjs(func));

            return result;
        };

        scope.createMouseCoordinates = function () {
            //If show mouse coordinates
            if (exercise.graph.showMouseCoordinates) {
                scope.mouseText = null;
                scope.board.on('move', function (evt) {
                    var array = scope.board.getMousePosition(evt);
                    var offsetArray = [];
                    angular.copy(array, offsetArray);

                    var coords = new $window.JXG.Coords($window.JXG.COORDS_BY_SCREEN, array, scope.board);

                    offsetArray[0] = offsetArray[0] + 10;
                    offsetArray[1] = offsetArray[1] - 10;

                    //offset position in pixels
                    var offsetCoords = new $window.JXG.Coords($window.JXG.COORDS_BY_SCREEN, offsetArray, scope.board);

                    if (scope.mouseText === null) {
                        scope.mouseText = scope.board.create('text', [offsetCoords.usrCoords[1], offsetCoords.usrCoords[2], '(' + coords.usrCoords[1] + ',' + coords.usrCoords[2] + ')'], { label: { offsets: [-10, 10] } });
                    } else {
                        scope.mouseText.setCoords(offsetCoords.usrCoords[1], offsetCoords.usrCoords[2]);
                        scope.mouseText.setText('(' + coords.usrCoords[1] + ',' + coords.usrCoords[2] + ')');
                        scope.mouseText.updateCoords();
                        scope.mouseText.update();
                        scope.mouseText.updateRenderer();
                    }
                    scope.board.update();
                });
            }
        };

        var exercise = scope.$parent.exercise;

        var options = exercise.graph.options || {};

        //defaults
        if (!options.grid) {
            options.grid = true;
        }
        if (!options.showCopyright) {
            options.showCopyright = false;
        }
        if (!options.axis) {
            options.axis = true;
        }
        if (!options.boundingbox) {
            options.boundingbox = [-10, 10, 10, -10];
        }
        if (!options.showNavigation) {
            options.showNavigation = true;
        }
        if (!options.zoom) {
            options.zoom = false;
        }
        if (!options.pan) {
            options.pan = true;
        }

        $window.JXG.Options = $window.JXG.deepCopy($window.JXG.Options, {
            showNavigation: false,
            elements: {
                fillColor: '#47c4ed',
            },
            curve: {
                strokeColor: '#47c4ed',
                fillColor: 'none'
            },
            point: {
                fillColor: '#149cd1',
                strokeColor: '#149cd1'
            },
            glider: {
                strokeColor: '#149cd1'
            },
            line: {
                strokeColor: '#149cd1',
            }
        });

        scope.board = $window.JXG.JSXGraph.initBoard(element[0].id, options);

        scope.createJsxGraphElement = function (JSXGraphOption, jsonName, obj) {
            for (var elem in obj) {
                //Special case for functiongraphs
                if (JSXGraphOption.JSXGraphName === 'functiongraph') {
                    obj[elem].value[0] = scope.createFunc(obj[elem].value[0]);
                } else {
                    for (var i = 0; i < obj[elem].value.length; i++) {
                        var elemName = obj[elem].value[i]; //If the number is typed in as string we need to convert it to an int
                        if (!isNaN(elemName)) {
                            obj[elem].value[i] = elemName;
                        }

                        //Find the other elements by name and assign instead of variablename
                        if (scope.JSXGraphElements && scope.JSXGraphElements[elemName]) {
                            obj[elem].value[i] = scope.JSXGraphElements[elemName];
                        }
                    }
                }
                var options = obj[elem].options || {};
                options.name = elem;
                var graphElem = scope.board.create(JSXGraphOption.JSXGraphName, obj[elem].value, options);

                /* Bind events to the graph element, events used when creating the answer */
                if (scope.$parent.answer[elem] !== undefined) {
                    graphElem.mbName = elem;
                    if (graphElem.on !== undefined) {
                        graphElem.on('drag', function () {
                            //set answer to model
                            scope.$parent.answer[this.mbName].Answer = { 'x': this.X().toString(), 'y': this.Y().toString() };
                        });

                        //Special for integral
                        if (graphElem.curveLeft && graphElem.curveRight) {
                            graphElem.curveLeft.on('drag', function () {
                                //set answer to model

                                scope.$parent.answer[graphElem.mbName].Answer = graphElem.label.content.htmlStr.split('=')[1].trim();
                            });
                            graphElem.curveRight.on('drag', function () {
                                //set answer to model
                                scope.$parent.answer[graphElem.mbName].Answer = graphElem.label.content.htmlStr.split('=')[1].trim();
                            });
                        }
                    }
                }

                scope.JSXGraphElements = scope.JSXGraphElements || {};

                scope.JSXGraphElements[elem] = graphElem;
            }
        };

        scope.createMouseCoordinates(exercise.graph.showMouseCoordinates);

        var priorityQueue = {};

        for (var graphElement in exercise.graph) {
            var elem = exercise.graph[graphElement];

            var JSXGraphOption = scope.JSXGraphOptions[graphElement];
            if (JSXGraphOption) {
                var priority = JSXGraphOption.priority;

                if (!priority) {
                    priority = 'none';
                }

                if (!priorityQueue[priority]) {
                    priorityQueue[priority] = [];
                }

                priorityQueue[priority].push([scope.JSXGraphOptions[graphElement], graphElement, elem]);
            }
        }

        for (var i = 0; i < 10; i++) {
            var queueItem = priorityQueue[i];
            if (queueItem) {
                for (var j = queueItem.length - 1; j >= 0; j--) {
                    scope.createJsxGraphElement(queueItem[j][0], queueItem[j][1], queueItem[j][2]);
                }
            }
        }

        var queueItem = priorityQueue['none'];

        if (queueItem) {
            for (var k = queueItem.length - 1; k >= 0; k--) {
                scope.createJsxGraphElement(queueItem[k][0], queueItem[k][1], queueItem[k][2]);
            }
        }
    };
  });
