console.log("client.js sourced");
var myApp = angular.module('myApp', []);

myApp.controller('BuilderController', function($http, $scope, $timeout){

  var vm = this;
  vm.items = ["hi", "hello", "goodbye"];
  vm.testData = [];
  vm.testText = "Hi";
  //GET RAW DATA
  getData = function(){

  var requestURL = 'https://raw.githubusercontent.com/ChaseWhitney/dndwiki-db-builder/master/spellData.json';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
      vm.testData = request.response.data;
      vm.allSpellData = request.response.data;
      console.log('vm.testData typeof:', typeof vm.testData);
      console.log('vm.testData is:', vm.testData);
      console.log('vm.testData[0] is:', vm.testData[0]);
      console.log('vm.testData[0].name is:', vm.testData[0].name);
    };

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


  vm.convertArrays = function(){ //convert arrays to strings for SQL database
    console.log('converting Arrays in:', vm.allSpellData);
    for (var i = 0; i < vm.allSpellData.length; i++) {
      var spell = vm.allSpellData[i];

      spell.description = spell.desc[0];
      for (var p = 1; p < vm.allSpellData[i].desc.length; p++) {
        spell.description += "<BREAK>" + spell.desc[p];
      }

      spell.componentsString = spell.components[0];
      for (var p = 1; p < spell.components.length; p++) {
        spell.componentsString += spell.components[p];
      }

      spell.classesString = spell.classes[0].name;
      for (var p = 1; p < spell.classes.length; p++) {
        spell.classesString += ", " + spell.classes[p].name;
      }

    }
    console.log('new data is:', vm.allSpellData);
  };

  vm.createDbObjects = function (){
    console.log('building objects for SQL database entry');
    vm.dbSpells = [];
for (var i = 0; i < vm.allSpellData.length; i++) {
  var spell = vm.allSpellData[i];
  var newSpell = {};

  newSpell.casting_time = spell.casting_time;
  newSpell.classes = spell.classesString;
  newSpell.components = spell.componentsString;
  newSpell.concentration = spell.concentration;
  newSpell.description = spell.description;
  newSpell.duraction = spell.duration;
  newSpell.index = spell.index;
  newSpell.higher_level = spell.higher_level;
  newSpell.level = spell.level;
  newSpell.material = spell.material;
  newSpell.name = spell.name;
  newSpell.page = spell.page;
  newSpell.range = spell.range;
  newSpell.ritual = spell.ritual;
  newSpell.school = spell.school.name;
  newSpell.url = spell.url;

  vm.dbSpells.push(newSpell);
}
 console.log('dbSpells:', vm.dbSpells);

  };

  vm.writeToDb = function(){
    $http.put('/builder/writeData').then(function(response){
      console.log('got response from writeData:');
    });
  };


getData();
$timeout(function(){vm.loaded = true;}, 1000);
$timeout(function(){vm.loaded = true;}, 3000);
});
