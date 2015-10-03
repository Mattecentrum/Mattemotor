'use strict';

describe('Service: equalService', function () {
    // load the service's module
    beforeEach(module('mattemotorApp'));

    // instantiate service
    var equalService;
    beforeEach(inject(function (_equalService_) {
        equalService = _equalService_;
    }));

    it('if arrays contains different number of elements should not be equal', function () {
       
        var actual = [1, 2, 3, 4],
            expected = [1, 2, 3,4, 5];

        expect(equalService.arraysEqual(actual, expected)).toBe(false);
    });

    it('array of numbers should be equal', function () {
       
        var actual = [1, 2, 3, 4, 5],
            expected = [1, 2, 3, 4 , 5];

        expect(equalService.arraysEqual(actual,expected)).toBe(true);
    });

    it('arrays contains the same elements', function () {
       
        var actual = [1, 2, 3, 4, 5],
            expected = [5, 4, 3, 2, 1];

        expect(equalService.arraysContainsSameElements(actual,expected)).toBe(true);
    });

    it('arrays does not contain the same elements', function () {
       
        var actual = [1, 2, 7, 4, 5],
            expected = [5, 4, 3, 2, 1];

        expect(equalService.arraysContainsSameElements(actual,expected)).toBe(false);
    });

    it('predefined is array and answer is correct', function () {
        
        var variables = [],
            predefinedAnswer = [true, "3,1", "test"],
            givenAnswer = [true, 3.1, "test"];

        expect(equalService.isEqual(variables, givenAnswer, predefinedAnswer)).toBe(true);

    });

    it('predefined is object and answer is correct', function () {
        
        var variables = [],
        
         predefinedAnswer = {
            'boolean': true,
            'number': 3.1,
            'string': '{{"test"}}'
        },
        
        givenAnswer = {
            'boolean': true,
            'number': "3,1",
            'string': "test"
        };

        expect(equalService.isEqual(variables, givenAnswer, predefinedAnswer)).toBe(true);

    });

    it('predefined is boolean and answer is correct', function () {
        
        var variables = [];
        
        var predefinedAnswer = "{{(1==1)}}";
        
        //Doesn't matter since answer is correct and that is evaluated as true or false and returned
        var givenAnswer = "";

        expect(equalService.isEqual(variables, givenAnswer, predefinedAnswer)).toBe(true);

    });

    it('predefined is string and answer is correct', function () {
        
        var variables = [];
        
        var predefinedAnswer = "{{'correct'}}";
        
        //Doesn't matter since answer is correct and that is evaluated as true or false and returned
        var givenAnswer = "correct";

        expect(equalService.isEqual(variables, givenAnswer, predefinedAnswer)).toBe(true);

    });

    it('predefined is number and answer is correct', function () {
        
        var variables = [];
        
        var predefinedAnswer = 1.0;
        
        //Doesn't matter since answer is correct and that is evaluated as true or false and returned
        var givenAnswer = 1;

        expect(equalService.isEqual(variables, givenAnswer, predefinedAnswer)).toBe(true);

    });

     it('predefined is array and answer is error', function () {
        
        var variables = [];
        var predefinedAnswer = [true, 3, "test"];
        var givenAnswer = [true, 3, ""];

        expect(equalService.isEqual(variables, givenAnswer, predefinedAnswer)).toBe(false);

    });

    it('predefined is object and answer is error', function () {
        
        var variables = [];
        
        var predefinedAnswer = {
            'boolean': true,
            'number': 3,
            'string': 'test'
        };
        
        var givenAnswer = {
            'boolean': false,
            'number': 3,
            'string': 'test'
        };

        expect(equalService.isEqual(variables, givenAnswer, predefinedAnswer)).toBe(false);

    });

    it('predefined is boolean and answer is error', function () {
        
        var variables = [];
        
        var predefinedAnswer = false;
        
        //Doesn't matter since answer is correct and that is evaluated as true or false and returned
        var givenAnswer = "";

        expect(equalService.isEqual(variables, givenAnswer, predefinedAnswer)).toBe(false);

    });

    it('predefined is string and answer is error', function () {
        
        var variables = [];
        
        var predefinedAnswer = "correct";
        
        //Doesn't matter since answer is correct and that is evaluated as true or false and returned
        var givenAnswer = "incorrect";

        expect(equalService.isEqual(variables, givenAnswer, predefinedAnswer)).toBe(false);

    });

    it('predefined is number and answer is error', function () {
        
        var variables = [];
        
        var predefinedAnswer = 1.0;
        
        //Doesn't matter since answer is correct and that is evaluated as true or false and returned
        var givenAnswer = 2;

        expect(equalService.isEqual(variables, givenAnswer, predefinedAnswer)).toBe(false);

    });

    it('should throw exception', function () {
        
        var variables = [];
        
        var predefinedAnswer = null;
        
        //Doesn't matter since answer is correct and that is evaluated as true or false and returned
        var givenAnswer = 2;

        expect(function() { equalService.isEqual(variables, givenAnswer, predefinedAnswer); }).toThrow();

    });

     it('should hande null undefined answer', function () {
        
        var variables = [];
        
        var predefinedAnswer = 1.0;
        
        //Doesn't matter since answer is correct and that is evaluated as true or false and returned
        var givenAnswer;

        expect(equalService.isEqual(variables, givenAnswer, predefinedAnswer)).toBe(false);

    });

    it('should return correct answer', function () {
        
        var variables = [];
        
        var predefinedAnswer = "{{1 + 2}}";
        
        //Doesn't matter since answer is correct and that is evaluated as true or false and returned
        var givenAnswer;

        expect(equalService.getCorrectAnswer(variables, predefinedAnswer)).toBe('3');

    });

     it('should return correct answer', function () {
        
        var variables = [];
        
        var predefinedAnswer = "{{ 1 + 2 }}";
        
        //Doesn't matter since answer is correct and that is evaluated as true or false and returned
        var givenAnswer;

        expect(equalService.getCorrectAnswer(variables, predefinedAnswer)).toBe('3');

    });



});
