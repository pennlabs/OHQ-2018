import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/app.react'
import Signin from './components/auth/Signin.react'
import SearchBox from './components/SearchBox.react'
import Queue from './components/Queue.react'

export default (
	<Route path='/' component={App}>
		<Route path='/signin' component={Signin}>
		</Route>
		<Route path='/class' component={SearchBox}>
		</Route>
		<Route path='class/queue' component={Queue}>
		</Route>
	</Route>
)
