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
      serveWord($scope.wordList);
    })

  // This function takes a word from the array and scrambles and serves it
  function serveWord(wordsArray){
    var inThePan = wordsArray.shift();
    // Make sure we get a proper word // If no word trigger win condition
    if (!inThePan){
      alert('you win');
    }
    $scope.onDeck = scramble(inThePan.toUpperCase().split(''));
  }

  // Scrambling an Array using the Fisher-Yates (aka Knuth) Shuffle
  function scramble(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

});
