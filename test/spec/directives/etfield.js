/*
'use strict';

describe('Directive: etField', function () {

  // load the directive's module
  beforeEach(module('mattemotorApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<et-field></et-field>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the etField directive');
  }));
});

*/