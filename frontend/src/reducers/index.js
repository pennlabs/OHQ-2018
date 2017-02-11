//this file is the root reducer, and as such holds the global
//application (redux) state.

//Note that we have two kinds of actions.  Those that emit to a websocket
//need to be handled differently than those that don't, so the action types that reducers handle
//are split across two files: src/actions/ActionTypes.js, and src/sockets/socketActionTypes.js.
//This separation exists for clarity alone.

import { combineReducers } from 'redux'
// import { reducer as formReducer } from 'redux-form'

import authReducer from './AuthReducer'
import activeClassReducer from './ActiveClassReducer'
import isTAReducer from './IsTAReducer'
import selectedClassReducer from './SelectedClassReducer'
import queueReducer from './QueueReducer'

const rootReducer = combineReducers({
  // form: formReducer,
  auth: authReducer,
  activeClass: activeClassReducer,
  isTAForCurrentClass: isTAReducer,
  selectedClass: selectedClassReducer,
  queue: queueReducer,
})

export default rootReducer
