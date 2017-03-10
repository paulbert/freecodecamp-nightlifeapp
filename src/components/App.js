import React from 'react'
import SearchBarContain from '../containers/SearchBarContain'
import BarsListContain from '../containers/BarsListContain'

require('../css/App.scss');

const App = () => (
	
	<div className="container">
		<h1>NightLIFE yeah</h1>
		<h2>Search for bars in your area, see if other people are going tonight, and RSVP!</h2>
		<SearchBarContain />
		<BarsListContain />
		<footer>Created by <a target="_blank" href="http://github.com/paulbert">Paul Albert</a></footer>
	</div>
);

export default App;