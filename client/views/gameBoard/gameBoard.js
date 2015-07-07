'use strict';

angular.module('kensu')
.controller('GameCtrl', function($rootScope, $scope, $state, $http, Wordlist, FryingPan){

  // initalizing variables
  var letterGuessIndex = 0;
  var lastGuessedLetter = -1;

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

  function guessLetter(key, currentIndex){
    var guessedIndex = $scope.onDeck.scrambled.indexOf(key, currentIndex);
    console.log('number of currentIndex:', currentIndex);
    // if a letter in the current unguessed scrambled array is guessed
    if (guessedIndex >= currentIndex){
      console.log('guessed letter: ', key);
      //Swap the array elements
      var temp = $scope.onDeck.scrambled[currentIndex];

      lastGuessedLetter += 1;
      currentIndex += 1;
      // Have to use $apply because this is not a $scope function
      $scope.$apply(function(){
        $scope.onDeck.scrambled[currentIndex - 1] = $scope.onDeck.scrambled[guessedIndex];
        $scope.onDeck.scrambled[guessedIndex] = temp;
      });
      // Check if we have guessed the number of letters in the word
      console.log('currentIndex:', currentIndex)
      console.log('$scope.onDeck.scrambled.length', $scope.onDeck.scrambled.length)
      if(currentIndex === $scope.onDeck.scrambled.length){
        // Check if we guessed the unscrambled word
        if($scope.onDeck.scrambled.join('') === $scope.onDeck.original){
          console.log('you guessed right!');
          serveNextWord($scope.wordList);
          // reset lastGuessedLetter
          lastGuessedLetter = -1;
          return 0
        } else {
          // else the player guessed incorrectly, reset the scramble
          // reset lastGuessedLetter
          lastGuessedLetter = -1;
          $scope.$apply(function(){
            $scope.onDeck.scrambled = $scope.onDeck.unscrambled.slice();
          });
          return 0
        }
      }

    }

    return currentIndex
  }

  function activateBoard(){
    document.getElementById('gameboard').onkeypress = letterPress;
  }

  function code(e) {
    e = e || window.event;
    return(String.fromCharCode(e.keyCode).toUpperCase() || String.fromCharCode(e.which).toUpperCase());
  }

  $scope.isLocked = function(letterIndex){
    // console.log('isLocked running; letterIndex: ', letterIndex);
    // console.log('lastGuessedLetter: ', lastGuessedLetter);
    if(letterIndex <= lastGuessedLetter){
      return true
    } else {
      return false
    }
  }

});
