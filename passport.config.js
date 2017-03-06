
var FacebookStrategy = require('passport-facebook').Strategy,
	usersDAO = require('./routes/usersDAO.js')

module.exports = function(db,passport,configObj) {

	var users = usersDAO(db);
	
	// used to serialize the user for the session
	passport.serializeUser(function(user, done) {
		done(null, user._id);
	});

	// used to deserialize the user
	passport.deserializeUser(function(id, done) {
		users.getOne(id, function(err, user) {
			done(err, user);
		});
	});
    
	console.log(configObj);
	
	passport.use(new FacebookStrategy(configObj,
		// facebook will send back the token and profile
		function(token, refreshToken, profile, done) {
			console.log(profile);
			// asynchronous
			process.nextTick(function() {
				users.getOne(profile.id, function(err, user) {
					if (err) {
						return done(err);
					}

					// if the user is found, then log them in
					if (user) {
						return done(null, user); // user found, return that user
					} else {
						// if there is no user found with that facebook id, create them
						var newUser = {
							_id: profile.id,
							token: token,
							fullName: profile.name.givenName + ' ' + profile.name.familyName,
							firstName: profile.name.givenName
						};

						// save our user to the database
						users.insert(newUser, function(err) {
							if (err) {
								throw err;
							}
							return done(null, newUser);
						});
					}

				});
			});

		})
	);

};