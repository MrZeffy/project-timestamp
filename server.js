// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp", (req, res) => {
  const date = new Date();
  const myDateObject = {
    unix: Date.now(),
    utc: date.toGMTString()
  };
  
  res.json(myDateObject);
});

app.get("/api/timestamp/:input", (req, res, next) => {
  let integerForm = parseInt(req.params.input);
  if(req.params.input == integerForm){
    req.params.input = integerForm;
  }
  next();
}, (req, res) => {
  const date = new Date(req.params.input);
  
  if(date.getTime() != date.getTime()){
    return res.json({error: "Invalid Date"});
  }

  const myDateObject = {
    unix: date.getTime(),
    utc: date.toGMTString()
  };
  
  res.json(myDateObject);
});




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
