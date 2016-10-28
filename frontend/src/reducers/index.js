import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import authReducer from './AuthReducer'

const rootReducer = combineReducers({
  state: (state = {}) => state,
  form: formReducer,
  auth: authReducer
})

export default rootReducer
