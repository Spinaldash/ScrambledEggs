'use strict';

angular.module('kensu')
.factory('FryingPan', function($rootScope, $http, tenWordsUrl){
  function FryingPan(){
  }

  FryingPan.scramble = function(eggWord){
      eggWord = eggWord.toUpperCase();
      var plate = {
        original: eggWord
      }
      var eggArray = eggWord.split('');
      // Scrambling an Array using the Fisher-Yates (aka Knuth) Shuffle

      var currentIndex = eggArray.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex){

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = eggArray[currentIndex];
        eggArray[currentIndex] = eggArray[randomIndex];
        eggArray[randomIndex] = temporaryValue;
      }

      plate.scrambled = eggArray;
      plate.unscrambled = eggArray.slice();
      return plate;

  };

  return FryingPan;
});
