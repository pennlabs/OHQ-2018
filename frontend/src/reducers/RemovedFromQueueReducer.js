// this reducer controls state for if a student was just helped.  It loads regardless of what class the student
// is visiting.  This state is used to decide whether or not a modal should be shown to the student.

import { SocketActions } from './../../../shared'
const { QUEUE_REMOVED_FROM } = SocketActions

const defaultState = false
export default function(state = defaultState, action) {
  switch (action.type) {
  case QUEUE_REMOVED_FROM:
    return action.payload
  default:
    return state
  }
}
