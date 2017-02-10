import Socket from './index'
import * as SocketActions from './socketActionTypes'

export function updateQueue(data) {
  Socket.emit(SocketActions.UPDATE_QUEUE, data)
}
