var express = require('express');
var router = express.Router();

var poolModule = require('../modules/pool.js');
var pool = poolModule;


router.post('/writeSpells', function(req, res){
  var newSpell= req.body;
  var values = [
    newSpell.casting_time,
    newSpell.classes,
    newSpell.components,
    newSpell.concentration,
    newSpell.description,
    newSpell.duraction,
    newSpell.index,
    newSpell.higher_level,
    newSpell.level,
    newSpell.material,
    newSpell.name,
    newSpell.page,
    newSpell.range,
    newSpell.ritual,
    newSpell.school,
    newSpell.url,
  ];
  console.log('in post route', req.body);
  pool.connect(function(errConnectingToDatabase, db, done){
    if(errConnectingToDatabase) {
      console.log('There was an error connecting to the database', errConnectingToDatabase);
      res.sendStatus(500);
    } else {

      var queryText= 'INSERT INTO spells ("casting_time", "classes", "components", "concentration", "description",' +
      '"duration", "index", "higher_level", "level", "material", "name", "page", "range", "ritual",' +
      '"school", "url") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16);';
      db.query(queryText, values, function(errMakingQuery, result){
        done();
        if(errMakingQuery) {
          console.log('There was an error making the INSERT query', errMakingQuery);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });//end of pool
});//end of post

//post for pet name, color, breed inputs
router.post('/', function(req, res){
  var pets= req.body;
  console.log('in post route', req.body);
  pool.connect(function(errConnectingToDatabase, db, done){
    if(errConnectingToDatabase) {
      console.log('There was an error connecting to the database', errConnectingToDatabase);
      res.sendStatus(500);
    } else {
      var queryText='INSERT INTO pets ("name", "color", "breed", "owner_id") VALUES($1, $2, $3, $4);';
      db.query(queryText, [pets.name, pets.color, pets.breed, pets.owner_id], function(errMakingQuery, result){
        done();
        if(errMakingQuery) {
          console.log('There was an error making the INSERT query', errMakingQuery);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });//end of pool
});//end of post

//get for the pet information --- populates table on DOM
router.get('/', function(req,res){
  console.log('in get pets route');
    pool.connect(function(errConnectingToDatabase, db, done){
      if(errConnectingToDatabase) {
        console.log('There was an error connecting to the database', errConnectingToDatabase);
        res.sendStatus(500);
      } else {
        queryText = 'SELECT owner_id, pet_id, first_name, last_name, name, breed, color, check_in_date, check_out_date from owners JOIN pets on pets.owner_id = owners.id JOIN visits on pets.id = visits.pet_id;';
        db.query(queryText, function(errMakingQuery, result){
          done();
          if(errMakingQuery) {
            console.log('There was an error making the SELECT query', errMakingQuery);
            res.sendStatus(500);
          } else {
            res.send({pets: result.rows});
          }
        });
      }
    });
}); //end of get

//DELETE
router.delete('/:id', function(req, res){
  var id = req.params.id; // id of the thing to delete
  console.log('Delete route called with id of', id);
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
  //this queryText does not work because it is attempted to delete a pet
  //that is referenced in the visits table
      var queryText = 'DELETE FROM pets WHERE id = $1;';
      // errorMakingQuery is a bool, result is an object
      db.query(queryText, [id], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('ID IS:', id);
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          // console.log(result);
          // Send back the results
          res.sendStatus(200);
        }
      }); // end query
    } // end if
  }); // end pool
});

//UPDATE aka put route for Pets - edit
router.put('/:id', function(req, res){
  var id = req.params.id;
  var pet = req.body;
  console.log('in put route', req.params);
  pool.connect(function(errConnectingToDatabase, db, done){
    if(errConnectingToDatabase) {
      console.log('There was an error connecting to the database', errConnectingToDatabase);
      res.sendStatus(500);
    } else {
      var queryText = 'UPDATE pets SET "name" = $1, "breed" = $2, "color" = $3 WHERE "id" = $4;';
      db.query(queryText, [pets.name, pets.color, pets.breed, id], function(errMakingQuery, result){
        done();
        if(errMakingQuery) {
          console.log('There was an error making the INSERT query', errMakingQuery);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
});




module.exports = router;
