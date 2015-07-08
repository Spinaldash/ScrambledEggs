'use strict';

angular.module('kensu')
.controller('GameCtrl', function($rootScope, $scope, $state, Wordlist, FryingPan, Refrigerator){
  // *lastGuessedLetter can be refactored out
  var letterGuessIndex, lastGuessedLetter;
  var TURNTIME = 30;
  $scope.TURNTIME = TURNTIME;

  // Initialize the game by hitting the API and saving the wordList
  startGame();
  readyControls();

  // Make the board recieve key commands
  function readyControls(){
    document.onkeypress = function(e){
      var key = codeToLetter(e);
      // on KeyCommand, rearrange onDeck.scrambled and increment letterGuessIndex
      letterGuessIndex = guessLetter(key, letterGuessIndex);
    };
  };

  // This function takes a word from the array and scrambles and serves it
  function serveNextWord(wordsArray){
    var inThePan = wordsArray.shift();
    $scope.resetTimer();
    $scope.startTimer();

    // Make sure we get a proper word // If no word trigger win condition
    if(!inThePan){
      endGame();
      Refrigerator.victory($scope.score);
      // startGame();
    } else {
      $scope.$evalAsync(function(){
        $scope.onDeck = FryingPan.scramble(inThePan);
      });
    }
  }

  // This function runs on keypress
  function guessLetter(key, currentIndex){
    // detecting if the keypress was a valid guess
    var guessedIndex = $scope.onDeck.scrambled.indexOf(key, currentIndex);
    if(guessedIndex >= currentIndex){
      // yes: Swap the array elements
      var temp = $scope.onDeck.scrambled[currentIndex];

      lastGuessedLetter += 1;
      currentIndex += 1;
      // Have to use $apply because this is not a $angular function
      $scope.$apply(function(){
        $scope.onDeck.scrambled[currentIndex - 1] = $scope.onDeck.scrambled[guessedIndex];
        $scope.onDeck.scrambled[guessedIndex] = temp;
      });
      // Check if we have guessed the number of letters in the word
      if(currentIndex === $scope.onDeck.scrambled.length){
        // Check if we guessed the correct word
        if($scope.onDeck.scrambled.join('') === $scope.onDeck.original){
          // the player guessed the word correctly! Celbrate & set up for the next word
          console.log('you guessed right!');
          $scope.stopTimer();
          lastGuessedLetter = -1;
          return 0;
        }
        // otherwise the player guessed incorrectly, reset the scramble and lastGuessedLetter
        lastGuessedLetter = -1;
        $scope.$apply(function(){
          $scope.onDeck.scrambled = $scope.onDeck.unscrambled.slice();
        });
        return 0;
      }
    }
    return currentIndex;
  }


  function codeToLetter(e){
    e = e || window.event;
    return (String.fromCharCode(e.keyCode).toUpperCase() || String.fromCharCode(e.which).toUpperCase());
  }

  function startGame(){
    letterGuessIndex = 0;
    lastGuessedLetter = -1;
    $scope.score = 0;
    Wordlist.initialize()
    .then(function(data){
      $scope.$evalAsync(function(){
        $scope.wordList = data.data.map(function(wordObject){
          return wordObject.word;
        });
        serveNextWord($scope.wordList);
      });
    });
  }

  function endGame(){
    document.onkeypress = function(e){
    };
    $scope.$evalAsync(function(){
      delete $scope.wordList;
      delete $scope.onDeck;
      $scope.clearTimer();
    })
  }

  // Detect if a letter should have the lockedIn class
  $scope.isLocked = function(letterIndex){
    if(letterIndex <= lastGuessedLetter){
      return true;
    }
    return false;
  };

  $scope.startTimer = function(){
    $scope.$broadcast('timer-start');
    $scope.timerRunning = true;
  }
  $scope.stopTimer = function (){
    $scope.$broadcast('timer-stop');
    $scope.timerRunning = false;
  };
  $scope.clearTimer = function (){
    $scope.$broadcast('timer-clear');
    $scope.timerRunning = false;
  };

  $scope.resetTimer = function(){
    $scope.$broadcast('timer-set-countdown', TURNTIME);
  }

  $scope.$on('timer-stopped', function (event, data){
      // When the timer stops, use the time remaining to add to the score
      $scope.score += data.millis / 1000;
      lastGuessedLetter = -1;
      letterGuessIndex = 0;
      serveNextWord($scope.wordList);
      // For some reason this apply is needed to run a digest cycle even though serverNextWord should be causing a digest cycle
      $scope.$apply();
  });

});
