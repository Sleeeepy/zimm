'use strict';

describe('Controller: AddchatCtrl', function () {

  // load the controller's module
  beforeEach(module('zimmApp'));

  var AddchatCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddchatCtrl = $controller('AddchatCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
