var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var request = require('request');

var jwt = require('jsonwebtoken');
var config = require('./server/config');

var user = require('./server/routes/user.js');
var expense = require('./server/routes/expense.js');

var port = process.env.PORT || config.serverport;

var path = require("path");

mongoose.connect(config.database, function (err) {
  if (err) {
    console.log('Error connecting database, please check if MongoDB is running.');
  } else {
    console.log('Connected to database...');
  }
});

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('body-parser').json({type: '*/*'}));
// use morgan to log requests to the console
app.use(morgan('dev'));

// Enable CORS from client-side
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
// app.use(express.static(__dirname+"/dist"));
app.use(express.static('dist'));


// basic routes

app.get('/', function (req, res) {
  // res.render('index.html');
  res.sendFile("index.html");

});

app.get('/sandbox', function (req, response) {
  request({
    headers: {
      'Authorization': 'Bearer ad26d0b8-f8ed-1fa9-5c74-d19e704aebb4',
      'Content-Type': 'application/json'
    },
    uri: 'https://apisandbox.dev.clover.com/v3/merchants/Z5F5QK8W7ANG1/orders?expand=employee',
    method: 'GET'
  }, function (err, res, body) {
    response.setHeader('Content-Type', 'application/json');
    response.send(body);
    //response.json(body);
  });
});

app.get('/sandbox/create', function (req, response) {
  request({
    headers: {
      'Authorization': 'Bearer ad26d0b8-f8ed-1fa9-5c74-d19e704aebb4',
      'Content-Type': 'application/json'
    },
    json: {"state": "open"},
    body: {"state": "open"},
    uri: 'https://apisandbox.dev.clover.com/v3/merchants/Z5F5QK8W7ANG1/orders',
    method: 'POST'
  }, function (err, res, body) {
    response.setHeader('Content-Type', 'application/json');
    response.send(body);
    //response.json(body);
  });
});

app.get('/sandbox/order/:id', function (req, response) {
  var orederId = req.params.id;
  request({
    headers: {
      'Authorization': 'Bearer ad26d0b8-f8ed-1fa9-5c74-d19e704aebb4',
      'Content-Type': 'application/json'
    },
    uri: 'https://apisandbox.dev.clover.com/v3/merchants/Z5F5QK8W7ANG1/orders/' + orederId,
    method: 'GET'
  }, function (err, res, body) {
    response.setHeader('Content-Type', 'application/json');
    response.send(body);
  });
});

app.post('/register', user.signup);

// express router
var apiRoutes = express.Router();

app.use('/api', apiRoutes);

apiRoutes.post('/login', user.login);

apiRoutes.use(user.authenticate); // route middleware to authenticate and check token

// authenticated routes
apiRoutes.get('/', function (req, res) {
  res.status(201).json({message: 'Welcome to the authenticated routes!'});
});

apiRoutes.get('/user/:id', user.getuserDetails); // API returns user details

apiRoutes.put('/user/:id', user.updateUser); // API updates user details

apiRoutes.put('/password/:id', user.updatePassword); // API updates user password

apiRoutes.post('/expense/:id', expense.saveexpense); // API adds & update expense of the user

apiRoutes.delete('/expense/:id', expense.delexpense); //API removes the expense details of given expense id

apiRoutes.get('/expense/:id', expense.getexpense); // API returns expense details of given expense id

apiRoutes.post('/expense/total/:id', expense.expensetotal); // API returns expense details of given expense id

apiRoutes.post('/expense/report/:id', expense.expensereport); //API returns expense report based on user input

app.get('*', function (req, res) {
  // res.render('index.html');
  res.redirect('/')
});

// kick off the server
app.listen(port);
console.log('Expense Watch app is on listening ' + port);
