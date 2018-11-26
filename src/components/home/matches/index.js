import React from 'react'

import { Tag } from '../../ui/misc'
import Blocks from './Blocks'

const Matches = () =>
	<div className="home_matches_wrapper">
		<div className="container">
			<Tag
				bck="#0e1731"
				size="50px"
				color="#fff"
				// add={{}} can overwrite css stylings
			>
				Matches
			</Tag>
			<Blocks />
			<Tag
				bck="#fff"
				size="22px"
				color="#0e1731"
				link="/the_team"
			>
				See more matches
			</Tag>
		</div>
	</div>

export default Matches
