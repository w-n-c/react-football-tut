import React from 'react'

import { CityLogo } from '../ui/Icons'

const Footer = (props) => {
	return (
		<footer className="bck_blue">
			<div className="footer_logo">
				<CityLogo
					width="70px"
					height="70px"
					link="/"
				/>
			</div>
			<div className="footer_discl">
				Manchester City 2018. All rights reserved.
			</div>
		</footer>
	)
}

export default Footer
