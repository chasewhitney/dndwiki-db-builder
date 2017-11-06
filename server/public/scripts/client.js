console.log("client.js sourced");
var myApp = angular.module('myApp', []);

myApp.controller('BuilderController', function($http){

  var vm = this;

  //GET RAW DATA
  var requestURL = 'https://raw.githubusercontent.com/ChaseWhitney/dndwiki-db-builder/master/spellData.json';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
      vm.testData = request.response.data;
      console.log('vm.testData is:', vm.testData);
      console.log('vm.testData[0] is:', vm.testData[0]);
      console.log('vm.testData[0].name is:', vm.testData[0].name);

    };

    //END GET RAW DATA

  vm.test = function(){
    console.log('vm.testData is:', vm.testData);
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
