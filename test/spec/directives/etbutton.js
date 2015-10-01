/*

'use strict';

describe('Directive: etButton', function () {

  // load the directive's module
  beforeEach(module('mattemotorApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<et-button></et-button>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the etButton directive');
  }));
});


*/