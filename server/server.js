var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 5000;
var path = require('path');
var builderRoute = require('./routes/builder.js');
var fetcherRoute = require('./routes/fetcher.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/builder', builderRoute);
app.use('/fetcher', fetcherRoute);

app.get('/*', function(req, res) {
  var file = req.params[0] || '/views/index.html';
  res.sendFile(path.join(__dirname, '/public/', file));
});

// Start listening for requests on a specific port
app.listen(port, function(){
  console.log('listening on port', port);
});
