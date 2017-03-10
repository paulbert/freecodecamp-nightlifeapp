
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
	
	// Logic for deleting bars based on rough time zone estimate
	var	lastDelete = new Date(Date.UTC(2017,2,10,16)),
		lastDeleteLong = 0;
	
	function zoneLong(zone) {
		return (zone * 15) - 180;
	}
	
	function createRemoveQuery (zoneStart,zoneEnd) {
		return { "coordinates.longitude": {$gte: zoneLong(zoneStart), $lt: zoneLong(zoneEnd) }};
	}
	
	function hoursSinceLastDelete() {
		return Math.floor((Date.now() - lastDelete) / 3600000);
	}
	
	function hourChange(hour,changeBy) {
		var newHour = hour + changeBy;
		if(newHour < 0) {
			return 24 + newHour;
		}
		if(newHour > 23) {
			return newHour - 24;
		}
		return newHour;
	}
	
	app.use(function(req,res,next) {
		var hourDiff = hoursSinceLastDelete(),
			twoRemoves = false;
		console.log('Checking to remove, last date: ' + lastDelete);
		console.log('It is now: ' + new Date(Date.now()));
		function callback(err) {
			if(err) {
				console.log(err);
			}
			if(!twoRemoves) {
				next(); 
			}
			twoRemoves = false;
		}
		console.log('The difference in hours is: ' + hourDiff);
		if(hourDiff > 0) {
			if(hourDiff > 23) {
				console.log('Removing all bars');
				bars.remove({}, callback);
			}
			var zoneStart = hourChange(lastDelete.getHours(),14),
				zoneEnd = hourChange(zoneStart,hourDiff);
			lastDelete = new Date(Date.now());
			lastDelete.setMinutes(0,0,0);
			console.log('Removing zone #' + zoneStart + ' to zone #' + zoneEnd);
			if(zoneEnd < zoneStart) {
				twoRemoves = true;
				bars.remove(createRemoveQuery(0,zoneEnd),  callback);
				bars.remove(createRemoveQuery(zoneStart,23),  callback);
			} else {
				bars.remove(createRemoveQuery(zoneStart,zoneEnd), callback);
			}
		} else {
			next();
		}
	});
		
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
	
	function getBar(bar,callback) {
		bars.get({id:bar.id},function(err,results) {
			if(err) {
				console.log(err);
			}
			if(results.length > 0) {
				if(results.length > 1) {
					console.log('Bar ' + bar.id + ' duplicated somehow...');
				}
				callback(results[0]);
			}
			callback(bar);
		});
	}
	
	app.get('/searchBars', function(req,res) {
		var search = req.query.search;
		console.log('Searching: ' + search);
		res.cookie('savedSearch',search,{maxAge: expiration});
		console.log(savedSearch);
		request.get('https://api.yelp.com/v3/businesses/search?term=bars&location=' + search, {'auth':{'bearer':yelpToken}}, function(error,response,body) {
			var bodyObj = JSON.parse(body);
			Promise.all(bodyObj.businesses.map(function(val) {
				return new Promise(function(resolve,reject) {
					getBar(val,function(bar) { resolve(bar); } );
				});
			})).then(function(bars) {
				res.send(bars);
			});
		});
	});
	
	app.post('/goingTo', function(req,res) {
		bars.addUserToBar(req.body.bar,req.body.user,function(err) {
			if(err) {
				console.log(err);
				res.send({'error':true});
			} else {
				res.send({'error':false});
			}
		});
	});
	
	app.post('/notGoing', function(req,res) {
		bars.removeUserFromBar(req.body.bar,req.body.user,function(err) {
			if(err) {
				console.log(err);
				res.send({'error':true});
			} else {
				res.send({'error':false});
			}
		});
	});
	
	app.get('*', function(req,res) {
		console.log('Saved search: ' + savedSearch);
		res.sendFile(path.join(__dirname + '/../builds/templates/index.html'));
	});
}