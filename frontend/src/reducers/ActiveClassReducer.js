import { UPDATE_ACTIVE_CLASS } from './../actions/ActionTypes'

const defaultState = ['classFoo']

export default function(state = defaultState, action) {
  switch (action.type) {
    case UPDATE_ACTIVE_CLASS:
      return action.payload
    default:
      return state
  }
}
