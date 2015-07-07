'use strict';

angular.module('kensu')
.controller('GameCtrl', function($rootScope, $scope, $state, $http, Wordlist, FryingPan){

  // initalizing variables
  var letterGuessIndex = 0;

  // Initialize the game by hitting the API and saving the wordList
  Wordlist.initialize()
    .then(function(data){
      $scope.wordList = data.data.map(function(wordObject){
        return wordObject.word
      });
      serveNextWord($scope.wordList);
    })

  // Make the board recieve key commands
  window.onload = function(){
    document.onkeypress = function(e){
      var key = code(e);
      // on KeyCommand, rearrange onDeck.scrambled and increment letterGuessIndex
      letterGuessIndex = guessLetter(key, letterGuessIndex);
    };
  };

  // This function takes a word from the array and scrambles and serves it
  function serveNextWord(wordsArray){
    var inThePan = wordsArray.shift();
    // Make sure we get a proper word // If no word trigger win condition
    if (!inThePan){
      alert('you win');
    }
    $scope.$evalAsync(function(){
      $scope.onDeck = FryingPan.scramble(inThePan)
    });
  }

  function guessLetter(key, guesses){
    var guessedIndex = $scope.onDeck.scrambled.indexOf(key, guesses);
    console.log('number of guesses:', guesses);
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
      // Check if we have guessed the number of letters in the word
      if(guesses === $scope.onDeck.scrambled.length){
        // Check if we guessed the unscrambled word
        if($scope.onDeck.scrambled.join('') === $scope.onDeck.original){
          console.log('you guessed right!');
          serveNextWord($scope.wordList);
          return 0
        } else {
        // else the player guessed incorrectly, reset the scramble
          $scope.$apply(function(){
            $scope.onDeck.scrambled = $scope.onDeck.unscrambled.slice();
          });
          return 0
        }
      }

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
