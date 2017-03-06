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

module.exports = router;
