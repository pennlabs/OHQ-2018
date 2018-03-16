import React from 'react'
import { Route, IndexRoute } from 'react-router'

import SplashPage from './components/SplashPage.react'
import VerifyClass from './components/VerifyClass.react'

export default (
  <Route path='/' component={({ children }) => children}>
    <IndexRoute component={SplashPage} />
    <Route path='/:candidate' component={VerifyClass} />
  </Route>
)
