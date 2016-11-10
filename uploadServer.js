'use strict';
var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');

// config files
var db = require('./config/db');
var https = require('https');
var fs = require('fs');
// configuration ===========================================
	var hskey = fs.readFileSync('./config/arpho-key.pem');
    var hscert = fs.readFileSync('./config/arpho-cert.pem'),
     options = {
        key: hskey,
        cert: hscert
    };
var port = process.env.PORT || 3000; // set our port
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

var https = require('https');
https.createServer(options,app).listen(port)

console.log('Upload server listening on port ' + port); 			// shoutout to the user
app.post('/upload', function(req, res){
console.log('upload request')
  // create an incoming form object
  var form = new formidable.IncomingForm();
	console.log('uploading')
  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req,function(err, fields, files){});

});


