// this holds the two links for the current class.  Note that only TAs will receive
// this information.

//TODO: replace with null when class is shutdown?
// also can modify so that students have their class link too - depends on how we want to
// do routing

import { SocketActions } from './../../../shared'
const { CLASS_JOINED_TA } = SocketActions

const defaultState = null

export default function(state = defaultState, action) {
  switch (action.type) {
    case CLASS_JOINED_TA:
      return action.payload.links
    default:
      return state
  }
}
