import { USER_INFO_UPDATED } from './../sockets/socketActionTypes'
import { UserInfo } from './../../../shared/'

const defaultState = new UserInfo(null, null, null)

export default function(state = defaultState, action) {
  switch (action.type) {
  case USER_INFO_UPDATED:
    return action.payload
  default:
    return state
  }
}
