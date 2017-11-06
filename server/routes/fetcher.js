var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');

var spellList = [];



//http dnd5eapi.co/api/spells/1/

router.get('/getSpellList', function(req, res){
  var URL = 'http://dnd5eapi.co/api/spells';
  request(URL, function(err, response, body) {
    if(err) {
      console.log('error:', err);
      res.sendStatus(500);
    } else {
      res.send(body);
    }
  });
});

router.post('/getSpellData', function(req, res){
  // console.log('in getSpellData with req.body:', req.body);
  var spell = req.body;
  var url = spell.url;
  // console.log('url is:', url);
  request(url, function(err, response, body) {
    if(err) {
      console.log('error:', err);
      res.sendStatus(500);
    } else {
      spellList.push(body);
      res.send(body);
    }
  });



});

router.get('/writeData', function(req, res){
  console.log('writing data');
  var dataObj = {data: spellList};
  var content = JSON.stringify(dataObj);

  fs.writeFile("spellData.json", content, 'utf8', function (err) {
      if (err) {
          return console.log(err);
      }

      console.log("The file was saved!");
      res.sendStatus(200);
  });
});

module.exports = router;
