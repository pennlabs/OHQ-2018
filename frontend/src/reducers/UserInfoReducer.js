import { SocketActions } from './../../../shared'
import { UserInfo } from './../../../shared/'
const { USER_INFO_UPDATED } = SocketActions

const defaultState = new UserInfo(null, null, null)

export default function(state = defaultState, action) {
  switch (action.type) {
  case USER_INFO_UPDATED:
    return action.payload
  default:
    return state
  }
}
