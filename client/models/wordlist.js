'use strict';

angular.module('kensu')
.factory('Wordlist', function($rootScope, $http, tenWordsUrl){
  function Wordlist(){
  }

  Wordlist.initialize = function(){
    return $http.get(tenWordsUrl);
  };

  return Wordlist;
});
