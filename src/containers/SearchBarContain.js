import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchBar from '../components/SearchBar'
import { vote,getOnePoll,doSearch,changeText } from '../actions'

const mapStateToProps = (state) => {
	return {
		search:state.search.text
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchClick:(search) => {
			dispatch(doSearch(search));
		},
		onTextChange: (text) => {
			dispatch(changeText(text));
		}
	}
};

const SearchBarContain = connect(mapStateToProps,mapDispatchToProps)(SearchBar);

export default SearchBarContain