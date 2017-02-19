import { USER_INFO_UPDATED } from './../actions/ActionTypes'

const defaultState = {
  id: null,
  firstName: null,
  lastName: null,
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case USER_INFO_UPDATED:
      return action.payload
    default:
      return state
  }
}
