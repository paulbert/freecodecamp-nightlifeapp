import React, { Component } from 'react'
import { connect } from 'react-redux'
import BarsList from '../components/BarsList'

const mapStateToProps = (state) => {
	return {
		bars:state.bars,
		user:state.user,
		search:state.search.current
	}
};

const BarsListContain = connect(mapStateToProps)(BarsList);

export default BarsListContain