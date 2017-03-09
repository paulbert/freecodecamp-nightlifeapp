import React from 'react';

const Going = ({count,onGoingClick}) => (
	<button onClick={() => onGoingClick()} className="btn btn-default">{count + ' Going'}</button>
)

export default Going;