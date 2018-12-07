import React from 'react'
import { Promise } from 'core-js'
import Fade from 'react-reveal/Fade'

import { dbPlayers, firebase } from '../../database'
import { dbFormatter } from '../ui/misc'

import PlayerCard from '../ui/playerCards'
import Stripes from '../../resources/images/stripes.png'

class TheTeam extends React.Component {
	state = {
		loading: true,
		players: [],
	}

	componentDidMount() {
		dbPlayers.once('value').then(snapshot => {
			const players = dbFormatter(snapshot)
			let promises = []

			for (let key in players) {
				promises.push(
					new Promise((resolve, reject) => {
						firebase.storage().ref('players')
							.child(players[key].image).getDownloadURL()
							.then( url => {
								players[key].url = url
								resolve()
							})
					})
				)
			}

			Promise.all(promises).then(()=> {
				this.setState({
					loading: false,
					players
				})
			})

		})
	}

	showPlayersByCategory = (category) => (
		this.state.players ?
			this.state.players.map((player, i) => {
				return player.position === category ?
					<Fade left delay={i*40} key={i}>
						<div className="item">,
							<PlayerCard
								number={player.number}
								name={player.name}
								lastname={player.lastname}
								bck={player.url}
							/>
						</div>
					</Fade>
				:null
			})
		:null
	)


	render() {
		return (
			<div className="the_team_container"
				style={{
					background: `url(${Stripes}) repeat`
				}}
			>
				{!this.state.loading ?
					<div>
						<div className="team_category_wrapper">
							<div className="title">Keepers</div>
							<div className="team_cards">
								{this.showPlayersByCategory('Keeper')}
							</div>
						</div>
						<div className="team_category_wrapper">
							<div className="title">Defence</div>
							<div className="team_cards">
								{this.showPlayersByCategory('Defence')}
							</div>
						</div>
						<div className="team_category_wrapper">
							<div className="title">Midfield</div>
							<div className="team_cards">
								{this.showPlayersByCategory('Midfield')}
							</div>
						</div>
						<div className="team_category_wrapper">
							<div className="title">Strikers</div>
							<div className="team_cards">
								{this.showPlayersByCategory('Striker')}
							</div>
						</div>
					</div>
				:null}
			</div>
		)
	}

}

export default TheTeam
