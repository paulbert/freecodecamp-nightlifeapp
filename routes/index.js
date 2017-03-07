
var usersDAO = require('./usersDAO'),
	path = require('path'),
	barsDAO = require('./barsDAO'),
	request = require('request');
	
module.exports = exports = function(app,db,passport,yelpObj) {
	
	var users = usersDAO(db),
		bars = barsDAO(db),
		yelpToken = '',
		yelpExpire = 0,
		savedSearch = '';
		
	var expiration = 30 * 24 * 3600000;
	
		
	function authYelp(callback) {
		request.post({url:'https://api.yelp.com/oauth2/token',form:yelpObj},function(err,httpResponse,body) {
			if(err) {
				console.log('Auth failed.');
			} else {
				var bodyObj = JSON.parse(body);
				yelpToken = bodyObj.access_token;
				console.log('Token','==========================',yelpToken);
				yelpExpire = Date.now() + (parseInt(bodyObj.expires_in) * 1000);
				callback();
			}
		});
	}
	
	authYelp(function() { return ;});
		
	// Facebook login passport routes
	app.get('/auth/facebook', passport.authenticate('facebook'));
	
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook'),function(req,res) { res.redirect('/?s=' + req.cookies.savedSearch);});
		
	app.get('/userInfo',function(req,res) {
		console.log('The user is:');console.log(req.user);
		var jsonResponse = req.user || { empty: true };
		console.log(jsonResponse);
		res.json(jsonResponse);
	});
	
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});
	// End Facebook login routes
	
	app.get('/searchBars', function(req,res) {
		var search = req.query.search;
		console.log('Searching: ' + search);
		res.cookie('savedSearch',search,{maxAge: expiration});
		console.log(savedSearch);
		request.get('https://api.yelp.com/v3/businesses/search?term=bars&location=' + search, {'auth':{'bearer':yelpToken}}, function(error,response,body) {
			var bodyObj = JSON.parse(body);
			res.send(bodyObj.businesses);
		});
	});
	
	app.post('/goingTo', function(req,res) {
		// TODO: After clicking on going button, add this user to bar for one day
	});
	
	app.get('*', function(req,res) {
		console.log('Saved search: ' + savedSearch);
		res.sendFile(path.join(__dirname + '/../builds/templates/index.html'));
	});
}