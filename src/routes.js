import React from 'react';
import { Switch } from 'react-router-dom'

import Layout from './hoc/Layout'

import PrivateRoute from './components/routes/private'
import PublicRoute from './components/routes/public'
import NotFound from './components/ui/notFound'

import Home from './components/home'
import SignIn from './components/signin'
import TheTeam from './components/theTeam'
import TheMatches from './components/theMatches'
import Dashboard from './components/admin/dashboard'
import AdminMatches from './components/admin/matches'
import EditMatch from './components/admin/matches/editMatch'
import AdminPlayers from './components/admin/players'
import EditPlayer from './components/admin/players/editPlayer'

const Routes = (props) => {
return (
		<Layout>
			<Switch>
				<PrivateRoute exact path="/admin_matches/edit_match" component={EditMatch} {...props}/>
				<PrivateRoute exact path="/admin_matches/edit_match/:id" component={EditMatch} {...props}/>
				<PrivateRoute exact path="/admin_matches" component={AdminMatches} {...props}/>
				<PrivateRoute exact path="/admin_players/edit_player" component={EditPlayer} {...props}/>
				<PrivateRoute exact path="/admin_players/edit_player/:id" component={EditPlayer} {...props}/>
				<PrivateRoute exact path="/admin_players" component={AdminPlayers} {...props}/>
				<PrivateRoute exact path="/dashboard" component={Dashboard} {...props}/>
				<PublicRoute restricted exact path="/sign_in" component={SignIn} {...props}/>
				<PublicRoute exact path="/the_team" component={TheTeam} {...props}/>
				<PublicRoute exact path="/the_matches" component={TheMatches} {...props}/>
				<PublicRoute exact path="/" component={Home} {...props}/>
				<PublicRoute component={NotFound} {...props}/>
			</Switch>
		</Layout>
	)
}

export default Routes;
