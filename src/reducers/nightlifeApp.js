
import { combineReducers } from 'redux';

const bars = (state = [],action) => {
	switch(action.type) {
		case 'RECEIVE_BARS':
			return action.bars;
		default:
			return state;
	}
};

const user = (state = { empty: true },action) => {
	switch(action.type) {
		case 'RECEIVE_USER_INFO':
			return action.user;
		case 'LOGOUT':
			return { empty: true };
		default:
			return state;
	}
};

const searchText = (state = '',action) => {
	switch(action.type) {
		case 'CHANGE_TEXT':
			return action.text;
		default:
			return state;
	}
};

const nightlifeApp = combineReducers({
	bars,
	user,
	searchText
});

export default nightlifeApp;