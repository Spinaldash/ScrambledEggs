angular.module('kensu')
.controller('LeaderBoardCtrl', function($rootScope, $scope, $state, Wordlist, FryingPan, Refrigerator){

  $rootScope.fbRoot.orderByChild("score").on("value", function(snapshot) {
    // console.log(snapshot.val());
    $scope.leaderboardArray = [];
    snapshot.forEach(function(childSnapshot){
      console.log("childSnapshot val", childSnapshot.val());
      $scope.leaderboardArray.push(childSnapshot.val());
    });
    $scope.$apply();
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
});
