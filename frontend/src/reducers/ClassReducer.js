//This file holds data for all classes relevant to the user in a single object.
//the key for each class is the class’ ID.

import { SocketActions } from './../../../shared'

const {
  CLASS_QUEUE_JOINED,
  CLASS_ACTIVATED,
  CLASS_DEACTIVATED,
  BROADCAST_UPDATED,
  STUDENT_UNQUEUED_BY_TA
} = SocketActions

// Classes is a an object made of class class objects,
// where each class object is identied by a key identical to its id field.
const defaultState = null

export default function(state = defaultState, action) {
  switch (action.type) {
    case CLASS_QUEUE_JOINED:
      return action.payload
    // this logic is a duplicate of the logic for class queue updates.
    // we separate it for clarity and ease of refactoring.
    // TODO: handle activation as well as people joining/leaving a class
    case CLASS_ACTIVATED:
    case CLASS_DEACTIVATED:
      return { ...state, [action.payload.id]: action.payload }
    case BROADCAST_UPDATED:
      return action.payload
    case STUDENT_UNQUEUED_BY_TA:
      return action.payload
    default:
      return state
  }
}
