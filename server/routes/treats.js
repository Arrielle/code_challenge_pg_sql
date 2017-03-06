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
  //connect to the database
  // pool.connect(function(err, client, done){ //error - if can't connect, client, done - what to do when done
  //   if(err){
  //     res.sendStatus(500);
  //   } else {
  //     //select all tasks
  //     //SELECT * from task;
  //     client.query('SELECT * from task;', function(err, result){ //error if query errors out
  //       done();
  //       if(err){
  //         console.log(err);
  //         res.sendStatus(500);
  //       } else {
  //       // console.log(result); //taking a look at the differences
  //       console.log(result.rows);
  //       res.status(200).send(result.rows);
  //     }
  //     });
  //   }
  // });
  res.sendStatus(200); // don't set two send status!! Otherwise can't send headers twice
});// ends get

module.exports = router;
