import React from 'react'
import SearchBarContain from '../containers/SearchBarContain'
import BarsListContain from '../containers/BarsListContain'

require('../css/App.scss');

const App = () => (
	
	<div className="container">
		<h1>NightLIFE yeah</h1>
		<SearchBarContain />
		<BarsListContain />
	</div>
);

export default App;