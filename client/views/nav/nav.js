'use strict';

angular.module('kensu')
.controller('NavCtrl', function($rootScope, $scope, $state, $http){
  function goHome(){
    $state.go('home');
  };
});
