import React from 'react';

const FBLogin = ({count}) => (
	<a href="/auth/facebook" className="btn btn-default">{count + ' Going'}</a>
)

export default FBLogin;