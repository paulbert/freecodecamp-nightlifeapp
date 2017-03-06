import React from 'react'

const SearchBar = ({search,onSearchClick,onTextChange}) => {
	
	return (
	
	<section>
		<form onSubmit={(e) => { 
			e.preventDefault();
			return onSearchClick(search);
		}} className="form-inline">
			<div className="form-group">
				<input type="text" className="form-control" value={search} onChange={(e) => onTextChange(e.target.value)} placeholder="Enter a location to search" />
				<button type="submit" className="btn btn-default">Search</button>
			</div>
		</form>
	</section>

)};

export default SearchBar;