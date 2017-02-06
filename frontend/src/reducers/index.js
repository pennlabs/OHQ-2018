//this file is the root reducer, and as such holds the global
//application (redux) state.

import { combineReducers } from 'redux'
// import { reducer as formReducer } from 'redux-form'

import authReducer from './AuthReducer'
import activeClassReducer from './ActiveClassReducer'
import isTAReducer from './IsTAReducer'

const rootReducer = combineReducers({
  // form: formReducer,
  auth: authReducer,
  activeClass: activeClassReducer,
  isTAForCurrentClass: isTAReducer,
})

export default rootReducer
