import { UPDATE_USER_INFO } from './../actions/ActionTypes'

const defaultState = {
  id: null,
  firstName: null,
  lastName: null,
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case UPDATE_USER_INFO:
      return action.payload
    default:
      return state
  }
}
