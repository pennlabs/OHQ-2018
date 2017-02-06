import { UPDATE_IS_TA } from './../actions/ActionTypes'

const defaultState = false

export default function(state = defaultState, action) {
  switch (action.type) {
    case UPDATE_IS_TA:
      return action.payload
    default:
      return state
  }
}
