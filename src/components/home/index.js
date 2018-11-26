import React from 'react'
import Featured from './featured'
import Matches from './matches'
import MeetPlayers from './meetPlayers'
import Promotion from './promotion'

const Home = () => (
	<div className="bck_blue">
		<Featured />
		<Matches />
		<MeetPlayers />
		<Promotion />
	</div>
)

export default Home
