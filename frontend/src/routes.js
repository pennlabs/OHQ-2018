//since we are using a single page app architecture, we do not have routes
//in the traditional sense.  This file, using react-router, mimics routing
//behavior for our frontend

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
