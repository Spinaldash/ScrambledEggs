  'use strict';

  angular.module('kensu')
  .factory('Refrigerator', function($rootScope){
    function Refrigerator(){
    }

    Refrigerator.victory = function(score){
      window.swal({
        title: "Congratulations!",
        text: "You scored " + score + "! Etch your name into the refrigerator of destiny!",
        type: "input",
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "Your Name"
        },
        function(inputValue){
          if (inputValue === false) return false;
          if (inputValue === "") {
            swal.showInputError("You need to write something!");
            return false
          }
          $rootScope.fbRoot.push({
            name: inputValue,
            score: score
          });
          swal("Nice!", "Look for: " + inputValue + " on the Leaderboards!", "success");
        });
    };

    return Refrigerator;
  });
