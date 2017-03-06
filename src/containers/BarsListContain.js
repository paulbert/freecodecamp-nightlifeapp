import React, { Component } from 'react'
import { connect } from 'react-redux'
import BarsList from '../components/BarsList'

const mapStateToProps = (state) => {
	return {
		bars:state.bars,
		user:state.user
	}
};

const BarsListContain = connect(mapStateToProps)(BarsList);

export default BarsListContain