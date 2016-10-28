import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
// import ReduxPromise from 'redux-promise'
import reduxThunk from 'redux-thunk'

import routes from './routes'

import reducers from './reducers'
import './../style/style.scss'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.querySelector('.container'))
