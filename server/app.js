var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 3000;
var treatsPath = require('./routes/treats');

/*** Build out a module to manage our treats requests. ***/

app.use('/treats', treatsPath);

// Get static files
app.use(express.static('./server/public'));
// app.use(bodyParser.urlencoded({extended: true}));


// Get index.html
app.get('/', function(req, res) {
  res.sendFile(path.resolve('./server/public/views/index.html'));
});


app.listen(port, function() {
  console.log('Server running on port: ', port);
});
