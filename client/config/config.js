'use strict';

angular.module('kensu')
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
  // .state('home', {url: '/', templateUrl: '/views/general/home.html'})
  .state('gameBoard', {url: '/', templateUrl: '/views/gameBoard/gameBoard.html', controller: 'GameCtrl'})
  .state('leaderboards', {url: '/leaderboards', templateUrl: '/views/leaderboards/leaderboards.html', controller: 'LeaderBoardCtrl'});
});
