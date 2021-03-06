
import fetch from 'isomorphic-fetch'

export const changeText = (text) => {
	return {
		type:'CHANGE_TEXT',
		text
	}
}

const searchingBars = () => {
	return {
		type:'SEARCHING_BARS',
	}
};

const receiveBars = (bars,search) => {
	return {
		type:'RECEIVE_BARS',
		bars,
		search
	}
};

const gettingOnePoll = () => {
	return {
		type: 'GETTING_ONE_POLL'
	}
};

const receiveOnePoll = (poll) => {
	return {
		type: 'RECEIVE_ONE_POLL',
		poll
	}
};

const checkingLoggedIn = () => {
	return {
		type: 'CHECKING_LOGGED_IN'
	}
};

const receiveUserInfo = (user) => {
	return {
		type: 'RECEIVE_USER_INFO',
		user
	}
};

const tryAddToBar = (bar) => {
	return {
		type: 'TRY_ADD_TO_BAR',
		bar
	}
};

const tryRemoveFromBar = (bar) => {
	return {
		type: 'TRY_REMOVE_FROM_BAR',
		bar
	}
};

const fetchGet = (url) => {
	return fetch(url, {
		method: 'GET',
		credentials:'include',
		headers: {
			'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
			'Content-Type': 'application/json'
		}
	});
};

export function checkLoggedIn() {
	
	return function(dispatch) {
		dispatch(checkingLoggedIn());
		
		return fetchGet('/userInfo')
		.then(response => {
			response.json().then((json) => {
				return dispatch(receiveUserInfo(json))
			});
		});
	}
	
};

export function doSearch(search) {
	
	return function(dispatch) {
		
		dispatch(searchingBars());
		
		return fetchGet('/searchBars?search=' + search)
		.then(response => {
			response.json().then((res) => {
				if(window.history && window.history.pushState) {
					window.history.pushState('',document.title,'/?s=' + search);
				}
				dispatch(receiveBars(res,search));
			});
		});
	}
};

const fetchPost = (url,reqBody) => {
	return fetch(url, {
		method: 'POST',
		credentials:'include',
		headers: {
			'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(reqBody)
	})
};

export function goingToBar(bar,user,search) {
	
	return function(dispatch) {
		
		dispatch(tryAddToBar(bar));
		
		return fetchPost('/goingTo',{bar:bar,user:user})
		.then(response => {
			response.json().then((res) => {
				if(!res.error) {
					dispatch(doSearch(search));
				}
			});
		});
	}

}

export function notGoing(bar,user,search) {
	
	return function(dispatch) {
		
		dispatch(tryRemoveFromBar(bar));
		
		return fetchPost('/notGoing',{bar:bar,user:user})
		.then(response => {
			response.json().then((res) => {
				if(!res.error) {
					dispatch(doSearch(search));
				}
			});
		});
	}

}