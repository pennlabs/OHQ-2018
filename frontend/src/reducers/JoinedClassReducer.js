import { SocketActions } from './../../../shared'

const {
  CLASS_JOINED_FAILURE,
  CLASS_JOINED_STUDENT,
  CLASS_JOINED_TA
} = SocketActions

const defaultState = null

export default function(state = defaultState, action) {
  switch (action.type) {
    case CLASS_JOINED_FAILURE:
    case CLASS_JOINED_STUDENT:
    case CLASS_JOINED_TA:
      return action.type
    default:
      return state
  }
}
