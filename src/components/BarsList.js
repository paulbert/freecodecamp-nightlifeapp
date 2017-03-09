import React from 'react'
import FBLogin from './FBLogin'
import GoingContain from '../containers/GoingContain'

const BarsList = ({bars,user,search}) => {
	
	return (
	
	<section>
		<table>
			<tbody>
			{bars.map((bar,ind,arr) => {
				var goingCount = typeof bar.users === 'undefined' ? 0 : bar.users.length;
				return (
					<tr key={ind}>
						<td>{bar.name}</td>
						<td className="col-xs-3"><img src={bar.image_url} className="img-responsive img-rounded" /></td>
						<td>{user.empty === true ? <FBLogin count={goingCount} /> : <GoingContain bar={bar} count={goingCount} user={user} search={search} />}</td>
					</tr>
				);
			})}
			</tbody>
		</table>
	</section>

)};

export default BarsList;