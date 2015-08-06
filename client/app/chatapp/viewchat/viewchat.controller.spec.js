'use strict';

describe('Controller: ViewchatCtrl', function () {

  // load the controller's module
  beforeEach(module('zimmApp'));

  var ViewchatCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ViewchatCtrl = $controller('ViewchatCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
