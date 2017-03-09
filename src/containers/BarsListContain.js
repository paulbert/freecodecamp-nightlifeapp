import React, { Component } from 'react'
import { connect } from 'react-redux'
import BarsList from '../components/BarsList'
import { notGoing } from '../actions'

const mapStateToProps = (state) => {
	return {
		bars:state.bars,
		user:state.user,
		search:state.search.current,
		spinners:state.spinners
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		onNotGoingClick:(bar,user,search) => {
			dispatch(notGoing(bar,user,search));
		}
	}
}

const BarsListContain = connect(mapStateToProps,mapDispatchToProps)(BarsList);

export default BarsListContain