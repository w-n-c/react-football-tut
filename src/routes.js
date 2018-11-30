import React from 'react';
import { Switch } from 'react-router-dom'

import Layout from './hoc/Layout'

import PrivateRoute from './components/routes/private'
import PublicRoute from './components/routes/public'

import Home from './components/home'
import SignIn from './components/signin'
import Dashboard from './components/admin/dashboard'
import AdminMatches from './components/admin/matches'
import EditMatch from './components/admin/matches/editMatch'

const Routes = (props) => {
return (
		<Layout>
			<Switch>
				<PrivateRoute exact path="/admin_matches/edit_match" component={EditMatch} {...props}/>
				<PrivateRoute exact path="/admin_matches/edit_match/:id" component={EditMatch} {...props}/>
				<PrivateRoute exact path="/admin_matches" component={AdminMatches} {...props}/>
				<PrivateRoute exact path="/dashboard" component={Dashboard} {...props}/>
				<PublicRoute restricted exact path="/sign_in" component={SignIn} {...props}/>
				<PublicRoute exact path="/" component={Home} {...props}/>
			</Switch>
		</Layout>
	)
}

export default Routes;
