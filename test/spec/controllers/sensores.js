'use strict';

describe('Controller: SensoresCtrl', function () {

  // load the controller's module
  beforeEach(module('dashApp'));

  var SensoresCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SensoresCtrl = $controller('SensoresCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
