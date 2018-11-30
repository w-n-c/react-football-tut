import React from 'react'
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import { firebase } from '../../../database'


const AdminNav = () => {
	const links = [
		{
			title: 'Matches',
			linkTo: '/admin_matches'
		},
		{
			title: 'Edit Matches',
			linkTo: '/admin_matches/edit_match'
		},
		{
			title: 'Players',
			linkTo: '/admin_players'
		},
		{
			title: 'Edit Players',
			linkTo: '/admin_players/edit_players'
		},
	]

	const style = {
		color: '#fff',
		fontWeight: '300',
		borderBottom: '1px solid #353535'
	}

	const renderItems = () => 
		links.map(link =>
			<Link to={link.linkTo} key={link.title}>
				<ListItem button style={style}>
					{link.title}
				</ListItem>
			</Link>
		)

	const logoutHandler = () =>
		firebase.auth().signOut().then(()=>{
			return
		}, (error)=> {
			return
		})
	
	return (
		<div>
			{renderItems()}
			<ListItem button style={style} onClick={()=> logoutHandler()}>
				Log out
			</ListItem>
		</div>
	)
}

export default AdminNav
