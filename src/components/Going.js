import React from 'react';

const Going = ({count,spinner,onGoingClick}) => (
	<button onClick={() => onGoingClick()} className="btn btn-default">{spinner ? <i className="fa fa-spinner fa-pulse fa-lg fa-fw"></i> : count + ' Going'}</button>
)

export default Going;