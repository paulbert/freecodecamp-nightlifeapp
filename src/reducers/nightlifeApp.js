
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

const search = (state = {text:'',current:''},action) => {
	switch(action.type) {
		case 'CHANGE_TEXT':
			return Object.assign({},state,{text:action.text});
		case 'RECEIVE_BARS':
			return Object.assign({},state,{current:action.search});
		default:
			return state;
	}
};

const spinners = (state = {}, action) => {
	switch(action.type) {
		case 'TRY_ADD_TO_BAR':
			return Object.assign({},state,{going:action.bar.id});
		case 'TRY_REMOVE_FROM_BAR':
			return Object.assign({},state,{notGoing:action.bar.id});
		case 'RECEIVE_BARS':
			var newState = Object.assign({},state);
			for(var prop in newState) {
				if(newState.hasOwnProperty(prop)) {
					newState[prop] = false;
				}
			}
			return newState;
		default:
			return state;
	}
}

const nightlifeApp = combineReducers({
	bars,
	user,
	search,
	spinners
});

export default nightlifeApp;