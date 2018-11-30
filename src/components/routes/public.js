import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({
	user,
	component: Component,
	restricted,
	...rest
}) => {
	return (
		<Route {... rest} component={(props)=>(
			restricted ?
			user ?
				<Redirect to="/dashboard"/>
				: <Component {...props} user={user}/>
			: <Component {...props} user={user}/>
		)}/>
	)
}

export default PrivateRoute
