import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

import { dbMatches } from '../../database'
import { revArray, dbFormatter } from '../ui/misc'

import LeagueTable from './table'

class TheMatches extends React.Component {
	state = {
		loading: true,
		matches: [],
		playerFilter: 'All',
		resultFilter: 'All'
	}

	componentDidMount() {
		dbMatches.once('value').then(snapshot => {
			const matches = dbFormatter(snapshot)
			this.setState({
				loading: false,
				matches: revArray(matches),
				filterMatches: revArray(matches)
			})
		})
	}

	render() {
		const state = this.state
		return <div className="the_matches_container">
			<div className="the_matches_wrapper">
				<div className="left">
				</div>
				<div className="right">
					<LeagueTable />
				</div>
			</div>
		</div>
	}
}

export default TheMatches
