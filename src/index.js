import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
 
import './resources/css/app.css';
import Routes from './routes';
import { firebase } from './database'

const App = (props) => (
	<BrowserRouter>
		<Routes {...props}/>
	</BrowserRouter>
)

firebase.auth().onAuthStateChanged((user)=>{
	ReactDOM.render(<App user={user}/>, document.getElementById('root'));
})


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
