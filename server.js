// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var multer = require('multer');
var helmet = require('helmet'),
morgan = require('morgan'),
cache = require('./app/utilities/wrapperCache')
cache.setCache('projectRoot',__dirname)
app.use(helmet())
if(require('./config/configs').morgan) {

	var morgan = require('morgan')
	app.use(morgan('dev'))
}

// config files
var db = require('./config/db');
var https = require('https');
var fs = require('fs');
const formidable = require('formidable');
// configuration ===========================================
	var hskey = fs.readFileSync('./config/arpho-key.pem');
    var hscert = fs.readFileSync('./config/arpho-cert.pem'),
     options = {
        key: hskey,
        cert: hscert
    };
var port = process.env.PORT || 9090; // set our port
var HOST = 'localhost';

//server = https.createServer(options, app).listen(port, HOST);
 mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)
 //app.use(formidable());
// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
//app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
//app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

//app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./app/routing/routes')(app); // pass our application into our routes

// start app ===============================================
var https = require('https');
https.createServer(options,app).listen(port)
console.log('Magic https  happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app
// https ====================================================================
