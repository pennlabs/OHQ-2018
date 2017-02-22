//this file is the root reducer, and as such holds the global
//application (redux) state.

//Note that we have two kinds of actions.  Those that emit to a websocket
//need to be handled differently than those that don't, so the action types that reducers handle
//are split across two files: src/actions/ActionTypes.js, and src/sockets/socketActionTypes.js.

import { combineReducers } from 'redux'

import authReducer from './AuthReducer'
import selectedClassReducer from './SelectedClassReducer'
import userInfoReducer from './UserInfoReducer'
import classesReducer from './ClassesReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  userInfo: userInfoReducer,
  classes: classesReducer,
  selectedClass: selectedClassReducer,
})

export default rootReducer
