import { UPDATE_QUEUE } from './../sockets/socketActionTypes'

//TODO: this needs to be set by the user's preferences somehow, from the database
const defaultState = {
  classFoo: {
    queue: []
  }
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case UPDATE_QUEUE:
      return action.payload
    default:
      return state
  }
}
