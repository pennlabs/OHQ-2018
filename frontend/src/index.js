//this file is the entry point for the application frontend

import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'

import routes from './routes'

import reducers from './reducers'

//this file is for global styles that will be applied to everything in the frontend
import './../style/Style.scss'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)

const enableReduxDevTools = () => {
  if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__) {
    return window.__REDUX_DEVTOOLS_EXTENSION__()
  }
}

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers, enableReduxDevTools())}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.querySelector('.container'))
