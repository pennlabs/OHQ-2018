//This file holds data for all classes relevant to the user in a single object.
//the key for each class is the class’ ID.

import { SocketActions } from './../../../shared'

const {
  CLASS_QUEUE_JOINED,
  BROADCAST_UPDATED,
  STUDENT_UNQUEUED_BY_TA,
  CLASS_DESTROYED,
  CLASS_JOINED_STUDENT,
  CLASS_JOINED_TA,
} = SocketActions

// this reducer holds the current class info data
const defaultState = null

export default function(state = defaultState, action) {
  switch (action.type) {
    case CLASS_QUEUE_JOINED:
      return action.payload
    // TODO: this case needs to be able to trigger action on the frontend (e.g. signalling class closed)
    case CLASS_DESTROYED:
      return null
    case BROADCAST_UPDATED:
      return action.payload
    case STUDENT_UNQUEUED_BY_TA:
      return action.payload
    case CLASS_JOINED_STUDENT:
      return action.payload
    case CLASS_JOINED_TA:
      return action.payload.classInfo
    default:
      return state
  }
}
