  'use strict';

  angular.module('kensu')
  .factory('Refrigerator', function(){
    function Refrigerator(){
    }

    Refrigerator.victory = function(){
      window.swal({
        title: "Congratulations!",
        text: "You scored XXX! Etch yourname into the refrigerator of destiny!",
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
          swal("Nice!", "You wrote: " + inputValue, "success");
        });
    };

    return Refrigerator;
  });