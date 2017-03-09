import React, { Component } from 'react'
import { connect } from 'react-redux'
import Going from '../components/Going'
import { goingToBar } from '../actions'

const mapStateToProps = (state,ownProps) => {
	return {
		count:ownProps.count,
		spinner:ownProps.spinner === ownProps.bar.id
	}
};

const mapDispatchToProps = (dispatch,ownProps) => {
	return {
		onGoingClick:() => {
			if(!ownProps.isGoing) {
				dispatch(goingToBar(ownProps.bar,ownProps.user,ownProps.search));
			}
		}
	}
};

const GoingContain = connect(mapStateToProps,mapDispatchToProps)(Going);

export default GoingContain