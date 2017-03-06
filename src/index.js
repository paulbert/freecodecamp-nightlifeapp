import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import nightlifeApp from './reducers/nightlifeApp'
import App from './components/App'
import thunkMiddleware from 'redux-thunk'
import { checkLoggedIn } from './actions'

let store = createStore(nightlifeApp,applyMiddleware(thunkMiddleware));

// Set state based on logged in status
store.dispatch(checkLoggedIn());

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
