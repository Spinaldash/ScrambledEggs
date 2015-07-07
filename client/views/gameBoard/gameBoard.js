'use strict';

angular.module('kensu')
.controller('GameCtrl', function($rootScope, $scope, $state, $http, Wordlist){

  // Initialize the game by hitting the API and saving the wordList
  Wordlist.initialize()
    .then(function(data){
      console.log(data.data);
      $scope.wordList = data.data.map(function(wordObject){
        return wordObject.word
      });
      console.log($scope.wordList);
    })


  function serveWord(wordsArray){
    $scope.onDeck = wordsArray.shift();
  }

});
