'use strict';

angular.module('kensu')
.controller('GameCtrl', function($rootScope, $scope, $state, $http, Wordlist, FryingPan){

  // initalizing variables
  var letterGuess = 0;

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
      // on KeyCommand, rearrange onDeck.scrambled and increment letterGuess
      letterGuess = guessLetter(key, letterGuess);
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

  function guessLetter(key, guesses){
    var guessedIndex = $scope.onDeck.scrambled.indexOf(key)
    // if a letter in the scrambled array is guessed
    console.log(guessedIndex);
    if (guessedIndex !== -1){
      //Swap the array elements
      var temp = $scope.onDeck.scrambled[guesses];
      console.log('temp', temp);
      // Have to use $apply because this is not a $scope function
      $scope.$apply(function(){
        $scope.onDeck.scrambled[guesses] = $scope.onDeck.scrambled[guessedIndex];
        $scope.onDeck.scrambled[guessedIndex] = temp;
      });
      guesses += 1;
    }

    return guesses
  }

  function activateBoard(){
    document.getElementById('gameboard').onkeypress = letterPress;
  }

  function code(e) {
    e = e || window.event;
    return(String.fromCharCode(e.keyCode).toUpperCase() || String.fromCharCode(e.which).toUpperCase());
  }

});
