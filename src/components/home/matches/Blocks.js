import React from 'react'
import { dbMatches } from '../../../database'
import { dbFormatter, revArray } from '../../ui/misc'

import MatchBlock from '../../ui/match_block.js'
import Slide from 'react-reveal/Slide'

class Blocks extends React.Component {
	state = {
		matches: []
	}

	componentDidMount() {
		dbMatches.limitToLast(6).once('value').then((snapshot) => {
			const matches = dbFormatter(snapshot)
			this.setState({
				matches: revArray(matches)
			})
		})
	}

	showMatches = (matches) => (
		matches ?
			matches.map(match =>
				<Slide bottom key={match.id}>
					<div className="item">
						<div className="wrapper">
							<MatchBlock match={match} />
						</div>
					</div>
				</Slide>
			)
		: null
	)

	render() {
		return (
			<div className="home_matches">
				{this.showMatches(this.state.matches)}
			</div>
		)
	}
}

export default Blocks
