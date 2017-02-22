//since we are using a single page app architecture, we do not have routes
//in the traditional sense.  This file, using react-router, mimics routing
//behavior for our frontend

import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/app.react'
import SplashPage from './components/SplashPage.react'
import Main from './components/Main.react'
import Signin from './components/auth/Signin.react'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Main} />
    <Route path='/signin' component={SplashPage}>
    </Route>
  </Route>
)
