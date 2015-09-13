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
       
        var a1 = [1,2,3,4];
        var a2 = [1,2,3,4,5];

        expect(equalService.arraysEqual(a1,a2)).toBe(false);
    });

    it('array of numbers should be equal', function () {
       
        var a1 = [1,2,3,4,5];
        var a2 = [1,2,3,4,5];

        expect(equalService.arraysEqual(a1,a2)).toBe(true);
    });

    it('arrays contains the same elements', function () {
       
        var a1 = [1, 2, 3, 4, 5];
        var a2 = [5, 4, 3, 2, 1];

        expect(equalService.arraysContainsSameElements(a1,a2)).toBe(true);
    });

    it('arrays does not contain the same elements', function () {
       
        var a1 = [1, 2, 7, 4, 5];
        var a2 = [5, 4, 3, 2, 1];

        expect(equalService.arraysContainsSameElements(a1,a2)).toBe(false);
    });
});
