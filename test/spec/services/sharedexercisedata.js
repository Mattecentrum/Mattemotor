'use strict';

describe('Service: sharedExerciseData', function () {

  // load the service's module
  beforeEach(module('mattemotorApp'));

  // instantiate service
  var sharedExerciseData;
  beforeEach(inject(function (_sharedExerciseData_) {
    sharedExerciseData = _sharedExerciseData_;
  }));

  it('should do something', function () {
    expect(!!sharedExerciseData).toBe(true);
  });

});
