import { QUEUE_UPDATED } from './../sockets/socketActionTypes'

//TODO: this needs to be set by the user's preferences somehow, from the database
const defaultState = null

export default function(state = defaultState, action) {
  switch (action.type) {
    case QUEUE_UPDATED:
      return action.payload
    default:
      return state
  }
}
