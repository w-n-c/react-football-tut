import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

import { dbMatches } from '../../database'
import { revArray, dbFormatter } from '../ui/misc'

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
		return <div>t</div>
	}
}

export default TheMatches
