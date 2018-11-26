import React from 'react'
import { easePolyOut } from 'd3-ease'
import Animate from 'react-move/Animate'
import FeaturedPlayer from '../../../resources/images/featured_player.png'

const animateNumber = () => (
	<Animate
		show={true}
		start={{
			opacity: 0,
			rotate: 0,
		}}
		enter={{
			opacity: [1],
			rotate: [360],
			timing: { duration: 1000, ease: easePolyOut }
		}}
	>
		{({opacity, rotate}) => (
			<div
				className="featured_number"
				style={{
					opacity,
					transform: `translate(260px, 170px) rotateY(${rotate}deg)`
				}}
			>
				3
			</div>
		)}
	</Animate>
)
const animateFirst = () => (
	<Animate
		show={true}
		start={{
			opacity: 0,
			x: 503,
			y: 450,
		}}
		enter={{
			opacity: [1],
			timing: { duration: 500, ease: easePolyOut },
			x: [273],
			y: [450],
		}}
	>
		{({opacity, x, y}) => (
			<div
				className="featured_first"
				style={{
					opacity,
					transform: `translate(${x}px, ${y}px)`
				}}
			>
				League
			</div>
		)}
	</Animate>
)
const animateSecond = () => (
	<Animate
		show={true}
		start={{
			opacity: 0,
			x: 503,
			y: 586,
		}}
		enter={{
			opacity: [1],
			timing: {delay: 300, duration: 500, ease: easePolyOut },
			x: [273],
			y: [586],
		}}
	>
		{({opacity, x, y}) => (
			<div
				className="featured_second"
				style={{
					opacity,
					transform: `translate(${x}px, ${y}px)`
				}}
			>
				Champions
			</div>
		)}
	</Animate>
)

const animatePlayer = () => (
	<Animate
		show={true}
		start={{
			opacity: 0,
		}}
		enter={{
			opacity: [1],
			timing: {delay: 800, duration: 500, ease: easePolyOut },
		}}
	>
		{({opacity}) => (
			<div
				className="featured_player"
				style={{
					opacity,
					background: `url(${FeaturedPlayer})`,
					transform: `translate(550px, 201px)`,
				}}
			>
			</div>
		)}
	</Animate>
)
const Text = () => (
	<div className="featured_text">
		{animatePlayer()}
		{animateNumber()}
		{animateFirst()}
		{animateSecond()}
	</div>
)

export default Text
