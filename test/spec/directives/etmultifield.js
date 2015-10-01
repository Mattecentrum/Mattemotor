/*

'use strict';

describe('Directive: etMultifield', function () {

  // load the directive's module
  beforeEach(module('mattemotorApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<et-multifield></et-multifield>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the etMultifield directive');
  }));
});

*/