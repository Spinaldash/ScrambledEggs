'use strict';

angular.module('kensu')
.controller('GameCtrl', function($rootScope, $scope, $state, $http, Wordlist){
  Wordlist.initialize()
    .then(function(data){
      console.log(data);
    })

});
