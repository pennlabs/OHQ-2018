import { SocketActions, UserInfo } from './../../../shared'
import uuid from 'uuid/v4'

// User information is stored client sie in localstorage.
// Thus anytime user info is updated locally, we store it here.
// Note that id should never be set anywhere apart from
// the initial check here.

//TODO: may want to use redux-thunk to clean this up

const { USER_INFO_UPDATED } = SocketActions

// set local storage user information if it doesn't exist
if (localStorage.getItem('pennlabsohq') == null) {
  localStorage.setItem('pennlabsohq', JSON.stringify({
    id: uuid(),
    firstName: '',
    lastName: ''
  }))
}

const defaultState = JSON.parse(localStorage.getItem('pennlabsohq '))

export default function(state = defaultState, action) {
  switch (action.type) {
    case USER_INFO_UPDATED: { // new block for scoping
      const newState = {...state, ...action.payload}
      localStorage.setItem('pennlabsohq', JSON.stringify(newState))
      return newState
    }
    default:
      return state
  }
}
