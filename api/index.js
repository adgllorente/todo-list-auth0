// Dependencies
var express = require('express');
var jwt = require('express-jwt');
var cors = require('cors');

// Auth0 variables
var AUTH0_SECRET = 'YOUR_AUTH0_SECRET';
var AUTH0_CLIENT_ID = 'YOUR_AUTH0_CLIENT_ID';

// Creating the API
var app = express();

// Configure default CORS.
app.use(cors());

// Configuring JWT. This will check if a given token is authorized to use the
// API.
var jwtCheck = jwt({
  secret: new Buffer(AUTH0_SECRET, 'base64'),
  audience: AUTH0_CLIENT_ID
});

// This will return a list of tasks. To restrict access just for authorized
// users we have to add jwtCheck as a second parameter of app.get.
app.get('/private/tasks', jwtCheck, function(req, res) {
  res.json([
    {
      id: 0,
      title: 'Clean the bathroom'
    }, {
      id: 1,
      title: 'Write a post in the blog'
    }, {
      id: 2,
      title: 'Become CEO of Google'
    }
  ]);
});

// Launching the API on port 3000
app.listen(3000);
console.log('API listening on port 3000');
