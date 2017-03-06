
function usersDAO (db) {
	
	var collection = 'users';
	
	function insertNewUser(newUser,callback) {
		db.collection(collection).insert(newUser,callback);
	}
	
	function getUser(userId,callback) {
		db.collection(collection).findOne({_id:userId},{fullName:true,firstName:true},callback);
	}
	
	return {
		insert:insertNewUser,
		getOne:getUser
	}
	
}

module.exports = usersDAO;