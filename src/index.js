import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import nightlifeApp from './reducers/nightlifeApp'
import App from './components/App'
import thunkMiddleware from 'redux-thunk'
import { checkLoggedIn, doSearch, changeText } from './actions'

let store = createStore(nightlifeApp,applyMiddleware(thunkMiddleware));

function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		if (decodeURIComponent(pair[0]) == variable) {
			return decodeURIComponent(pair[1]);
		}
	}
}

let search = getQueryVariable('s');

// Set state based on logged in status
store.dispatch(checkLoggedIn());
if(typeof search !== 'undefined') {
	store.dispatch(doSearch(search));
	store.dispatch(changeText(search));
}

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
