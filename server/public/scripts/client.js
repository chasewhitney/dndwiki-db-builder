console.log("client.js sourced");
var myApp = angular.module('myApp', []);

myApp.controller('BuilderController', function($http){

  var vm = this;

  vm.test = function(){
    console.log('vm.allSpellData is:', vm.allSpellData);
  };

  vm.getSpellList = function(){
    console.log('in getSpellList');

    $http.get('/fetcher/getSpellList').then(function(response){
          console.log('got response data:', response.data.results);
          vm.spellList = response.data.results;
        });

  };

  vm.getSpellData = function(list){
    vm.allSpellData = [];
    console.log('getting ALL spell data with:', list);
    for (var i = 0; i < list.length; i++) {
      $http.post('/fetcher/getSpellData', list[i]).then(function(response){
            console.log('got response data:', response.data);
            vm.allSpellData.push(response.data);
          });

    }



  };


  vm.writeData = function(){
    $http.get('/fetcher/writeData').then(function(response){
      console.log('got response from writeData:');
    });
  };



});
