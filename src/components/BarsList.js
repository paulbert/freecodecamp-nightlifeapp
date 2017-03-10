import React from 'react'
import FBLogin from './FBLogin'
import GoingContain from '../containers/GoingContain'

require('../css/BarsList.scss');

const placeholderImg = 'https://s3-media3.fl.yelpcdn.com/assets/srv0/yelp_styleguide/fe8c0c8725d3/assets/img/default_avatars/business_90_square.png'

const BarsList = ({bars,user,search,spinners,onNotGoingClick}) => {
	
	return (
	
	<section>
		<table id="bars-list">
			<tbody>
			{bars.map((bar,ind,arr) => {
				var goingCount = typeof bar.users === 'undefined' ? 0 : bar.users.length,
					userIsGoing = bar.users && bar.users.reduce((going,val) => { if(val._id === user._id) { return true; } return going; }, false),
					address = bar.location,
					imgUrl = !bar.image_url ? placeholderImg : bar.image_url
					
				return (
					<tr key={ind}>
						<td className="col-xs-3">
							<div className="img-container" style={{backgroundImage:'url('+ imgUrl +')'}}></div>
						</td>
						<td className="col-xs-6">
							<p className="lead">{bar.name}</p>
							<p>{address.address1}</p>
							<p>{address.city + ', ' + address.state + ' ' + address.zip_code}</p>
						</td>
						<td className="col-xs-3">
							{user.empty ? <FBLogin count={goingCount} /> : <GoingContain bar={bar} count={goingCount} user={user} search={search} isGoing={userIsGoing} spinner={spinners.going} />}
							{userIsGoing ? <button onClick={() => onNotGoingClick(bar,user,search)} className="btn btn-warning">
								{spinners.notGoing === bar.id ? <i className="fa fa-spinner fa-pulse fa-lg fa-fw"></i> : 'Not going'}
							</button> : ''}
						</td>
						
					</tr>
				);
			})}
			</tbody>
		</table>
	</section>

)};

export default BarsList;