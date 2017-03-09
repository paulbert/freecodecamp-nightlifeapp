
function barsDAO (db) {
	
	var collection = 'bars';
	
	function addUserToBar(bar,user,callback) {
		console.log('Checking if bar exists...');
		db.collection(collection).findOne({id:bar.id},function(err,result) {
			if(result) {
				console.log('Checking if user is already going to bar...');
				var addUser = true,
					users = result.users;
				
				if(result.users) {
					for(var i = 0; i < users.length; i++) {
						if(users[i]._id === user._id) {
							addUser = false;
							break;
						}
					}
				}
				if(addUser) {
					console.log('Start update...');
					db.collection(collection).update({id:bar.id},{$push:{users:user}},callback);
				}
			} else {
				console.log('Inserting new bar titled: ' + bar.name);
				db.collection(collection).insert(Object.assign({},bar,{users:[user]}),callback);
			}
		});
	}
	
	function removeUserFromBar(bar,user,callback) {
		db.collection(collection).update({id:bar.id},{$pull:{users:{_id:user._id}}},callback);
	}
	
	function get(query,callback) {
		db.collection(collection).find(query,{_id:0}).toArray(callback);
	}
	
	return {
		addUserToBar:addUserToBar,
		removeUserFromBar:removeUserFromBar,
		get:get
	}
	
}

module.exports = barsDAO;