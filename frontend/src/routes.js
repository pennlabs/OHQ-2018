import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/app.react'
import Signin from './components/auth/Signin.react'

export default (
	<Route path='/' component={App}>
		<Route path='/signin' component={Signin}>
		</Route>
	</Route>
)
