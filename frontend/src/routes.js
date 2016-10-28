import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/app.react'
import Signin from './components/auth/Signin.react'

export default (
	<Route path='/frontend' component={App}>
		<Route path='/frontend/signin' component={Signin}>
		</Route>
	</Route>
)
