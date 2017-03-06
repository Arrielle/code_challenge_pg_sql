var router = require('express').Router(); //special server file that only has routes in it
var pg = require('pg'); //connect node applications to our database
var config = {
  database: 'phi',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000 //how long to attempt a connection until it times out
};
var pool = new pg.Pool(config);
// get all treats
router.get('/', function(req,res){
  console.log('Did I hit my get treats route?');
  pool.connect(function(err, client, done){ //error - if can't connect, client, done - what to do when done
    if(err){
      res.sendStatus(500);
    } else {
      client.query('SELECT * from treats;', function(err, result){ //error if query errors out
        done();
        if(err){
          console.log(err);
          res.sendStatus(500);
        } else {
        // console.log(result); //taking a look at the differences
        console.log(result.rows);
        res.status(200).send(result.rows);
      }
      });
    }
  });
});// ends get

router.post('/', function(req,res){
  console.log('here is the body? -> ', req.body);
  var treatObject = req.body;
  pool.connect(function(err, client, done){
    if(err){
      console.log('error connecting to pool')
      res.sendStatus(500);
    } else {
      client.query('INSERT INTO treats (name, description, pic) VALUES ($1, $2, $3);', [treatObject.name, treatObject.description, treatObject.url], function(){
        done();
        if(err){
          console.log('error inserting into treats');
          res.sendStatus(500);
        } else{
          res.sendStatus(201);
        }
      });//end client query
    } //end else
  });
});

router.delete('/delete/:id', function(req, res){
  var treatID = req.params.id;
  console.log('treat id to delete: ', treatID);
  pool.connect(function(err, client, done){
    if(err) {
      // There was an error connecting to the database
      res.sendStatus(500);
    } else {
      // We connected to the database!!!
      // Now, we're gonna' git stuff!!!!!
      client.query('DELETE FROM treats WHERE id=$1;', //PARAM 1 $1 tells PG that we're looking for a variable
      [treatID], //PARAM 2 variable that we're adding to the PG query (Replaces $1 in the query)
      function(err, result){ //PARAM 3 the function that is run after the query takes place
        done();
        if(err) {
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }//ends client.query function
      });//ends client.query
    } //ends ppol connect function
  });//ends pool connect
});//ends delete router

router.put('/save/:id', function(req, res){
  var treatID = req.params.id; //finds the optional parameter
  var treatObject = req.body;
  console.log('book id to save: ', treatID);

  pool.connect(function(err, client, done){
    if(err) {
      console.log('Error connecting to database: ', err);
      res.sendStatus(500);
    } else {
      client.query('UPDATE treats SET name=$1, description=$2 WHERE id=$3;',
      [treatObject.name, treatObject.description, treatID], //PARAM 2 variable that we're adding to the PG query (Replaces $1 in the query)
      function(err, result){ //PARAM 3 the function that is run after the query takes place
        done();
        if(err) {
          console.log('no edition?', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }//ends client.query function
      });//ends client.query
    } //ends ppol connect function
  });//ends pool connect
});//ends save router

module.exports = router;
