
var express = require('express'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	expressSession = require('express-session'),
	path = require('path'),
	passport = require('passport'),
	passportCfg = require('./passport.config.js'),
	app = express(),
	MongoClient = require('mongodb');

var db_name = 'nightlifeApp';

var mongodb_connection_string = 'mongodb://127.0.0.1:27017/' + db_name;

// Production deployment on Heroku will have MongoDB environment variable
if(process.env.MONGODB_URI){
	mongodb_connection_string = process.env.MONGODB_URI;
} else {
	require('dotenv').config();
	var webpack = require('webpack'),
		webpackCfg = require('./webpack.config.js'),
		compiler = webpack(webpackCfg.config);
}

var routes = require('./routes/index.js'),
	passportObj = {
		clientID: process.env.FB_APPID,
		clientSecret: process.env.FB_APPSECRET,
		callbackURL:process.env.FB_CBURL,
		profileFields:[ 'displayName','name' ]
	},
	yelpObj = {
		grant_type:'client_credentials',
		client_id: process.env.YELP_APPID,
		client_secret: process.env.YELP_APPSECRET
	};

MongoClient.connect(mongodb_connection_string,function(err,db) {
	
	if(!err) {

		passportCfg(db,passport,passportObj);
		
		app.set('port',process.env.PORT || 3000);

		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({'extended':'true'}));
		app.use(cookieParser(process.env.EXPRESS_SECRET));
		app.use(express.static(path.join(__dirname,'builds')));
		app.use(expressSession({ secret: process.env.EXPRESS_SECRET, resave:true, saveUninitialized:true }));
		app.use(passport.initialize());
		app.use(passport.session());
		
		if(compiler) {
			compiler.watch(webpackCfg.watchOptions,webpackCfg.watchHandler);
		}
	
		routes(app,db,passport,yelpObj);

		app.listen(app.get('port'),app.get('ip'), function() {
			console.log("Node app is running at localhost:" + app.get('port'));
		});
	}
	
});