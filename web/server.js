var express = require('express');
var app = express();

// Serving the website
app.use(express.static('./node_modules'));
app.use(express.static('./web'));

app.listen(8080, function() {
  console.log('Admin panel started on port 8080');
});
