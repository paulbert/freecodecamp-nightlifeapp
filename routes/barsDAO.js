
function barsDAO (db) {
	
	var collection = 'bars';
	
	function addUser(bar,user,callback) {
		
		function insert(linkString) {
			console.log('Inserting new bar titled: ' + bar.name);
			db.collection(collection).insert(Object.assign({},bar,{users:[user]}),callback);
		}
		
		if(pollLink === 'new') {
			makeLink(poll.title.split(' '),1);
		} else {
			console.log('Start update...');
			db.collection(collection).update({id:bar.id},{$push:{users:user}},callback);
		}
	}
	
	function get(query,callback) {
		db.collection(collection).find(query,callback);
	}
	
	return {
		addUser:addUser,
		get:get
	}
	
}

module.exports = barsDAO;