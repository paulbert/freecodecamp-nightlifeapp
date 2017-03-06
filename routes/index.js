
var usersDAO = require('./usersDAO'),
	path = require('path'),
	barsDAO = require('./barsDAO');
	
module.exports = exports = function(app,db,passport) {
	
	var users = usersDAO(db),
		bars = barsDAO(db);
		
	// Facebook login passport routes
	app.get('/auth/facebook', passport.authenticate('facebook'));
	
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', { successRedirect: '/',failureRedirect: '/' }));
		
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
	
	app.post('/zipSearch', function(req,res) {
		// TODO: Route for searching for bars with Yelp API
	});
	
	app.post('/goingTo', function(req,res) {
		// TODO: After clicking on going button, add this user to bar for one day
	});
	
	app.get('*', function(req,res) {
		res.sendFile(path.join(__dirname + '/../builds/templates/index.html'));
	});
}