
//auth reducer tracks two pieces of state on state.auth: authenticated, and error
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './../actions/ActionTypes'

const defaultState = {error: null, authenticated: false}


export default function(state = defaultState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {...state, authenticated: true}
    case UNAUTH_USER:
      return {...state, authenticated: false}
    case AUTH_ERROR:
      return {...state, error: action.payload}
    default:
      return state
  }
}
