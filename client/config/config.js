'use strict';

angular.module('kensu')
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {url: '/', templateUrl: '/views/general/home.html'})
  .state('leaderboards', {url: '/leaderboards', templateUrl: '/views/general/leaderboards.html'})
});
