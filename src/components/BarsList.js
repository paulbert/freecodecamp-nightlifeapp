import React from 'react'
import FBLogin from './FBLogin'
import GoingContain from '../containers/GoingContain'

const BarsList = ({bars,user}) => {
	
	return (
	
	<section>
		<table>
			<tbody>
			{bars.map((bar,ind,arr) => {
				var goingCount = typeof bar.users === 'undefined' ? 0 : bar.users.length;
				return (
					<tr key={ind}>
						<td>bar.title</td>
						<td>{user.empty === true ? <FBLogin count={goingCount} /> : <GoingContain bar={bar} count={goingCount} user={user} />}</td>
					</tr>
				);
			})}
			</tbody>
		</table>
	</section>

)};

export default BarsList;