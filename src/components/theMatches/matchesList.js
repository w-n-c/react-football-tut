import React from 'react'
import { easePolyOut } from 'd3-ease'
import NodeGroup from 'react-move/NodeGroup'

class MatchesList extends React.Component {
	state = {
		matchesList: []
	}

	static getDerivedStateFromProps(props, state) {
		return state = {
			matchesList: props.matches
		}
	}

	timing = i => ({
		duration: 500, delay: i*50, ease: easePolyOut
	})


	showMatches = () => {
		return this.state.matchesList ?
			<NodeGroup
				data={this.state.matchesList}
				keyAccessor={data => data.id}
				start={()=>({
					opacity: 0,
					x: -200
				})}

				enter={(data, i)=>({
					opacity: [1],
					x: [0],
					timing: this.timing(i)
				})}

				update={(data, i)=>({
					opacity: [1],
					x: [0],
					timing: this.timing(i)
				})}

				leave={(data, i)=>({
					opacity: [0],
					x: [-200],
					timing: this.timing(i)
				})}
			>
				{(nodes) =>
					<div>
						{nodes.map(({key, data, state: {x, opacity}})=>
							<div
								key={key}
								className="match_box_big"
								style={{
									opacity,
									transform: `translate(${x}px)`
								}}
							>
								<div className="block_wraper">
									<div className="block">
										<div className="icon" style={{background:`url(/images/team_icons/${data.localThmb}.png)`}}></div>
										<div className="team">{data.local}</div>
										<div className="result">{data.resultLocal}</div>
									</div>
									<div className="block">
										<div className="icon" style={{background:`url(/images/team_icons/${data.awayThmb}.png)`}}></div>
										<div className="team">{data.away}</div>
										<div className="result">{data.resultAway}</div>
									</div>
								</div>
								<div className="block_wraper nfo">
									<div><strong>Date:</strong>{data.date}</div>
									<div><strong>Stadium:</strong>{data.stadium}</div>
									<div><strong>Referee:</strong>{data.referee}</div>
								</div>
							</div>
						)}
					</div>
				}
			</NodeGroup>
		:null
	}

	render() {
		return(
			<div>
				{this.showMatches()}
			</div>
		)
	}
}

export default MatchesList
