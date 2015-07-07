'use strict';

angular.module('kensu')
.controller('GameCtrl', function($rootScope, $scope, $state, $http, Wordlist, FryingPan){

  // Initialize the game by hitting the API and saving the wordList
  Wordlist.initialize()
    .then(function(data){
      console.log(data.data);
      $scope.wordList = data.data.map(function(wordObject){
        return wordObject.word
      });
      console.log($scope.wordList);
      serveNextWord($scope.wordList);


    })
  // Make the board recieve key commands
  window.onload = function(){
    document.onkeypress = function(e){
    var key = code(e);
    // do something with key
    console.log("key is: ", key);
    };
  };

  // This function takes a word from the array and scrambles and serves it
  function serveNextWord(wordsArray){
    var inThePan = wordsArray.shift();
    // Make sure we get a proper word // If no word trigger win condition
    if (!inThePan){
      alert('you win');
    }
    $scope.onDeck = FryingPan.scramble(inThePan)
  }

  $scope.guessLetter = function(event){
    console.log(event);
  }

  function activateBoard(){
    document.getElementById('gameboard').onkeypress = letterPress;
  }

  function letterPress(){

  }

  function code(e) {
    e = e || window.event;
    return(e.keyCode || e.which);
  }

});
