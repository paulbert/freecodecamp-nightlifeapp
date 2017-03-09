import React, { Component } from 'react'
import { connect } from 'react-redux'
import Going from '../components/Going'
import { goingToBar } from '../actions'

const mapStateToProps = (state,ownProps) => {
	return {
		count:ownProps.count
	}
};

const mapDispatchToProps = (dispatch,ownProps) => {
	return {
		onGoingClick:() => {
			dispatch(goingToBar(ownProps.bar,ownProps.user,ownProps.search));
		}
	}
};

const GoingContain = connect(mapStateToProps,mapDispatchToProps)(Going);

export default GoingContain