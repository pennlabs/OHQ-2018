import Socket from './initSocket'
import * as SocketActions from './socketActionTypes'

//updateQueue takes a single object, with a `question` key, `location` key,
//`class` key, and `user` key.  HACK: for now, the `user` information is the socket ID
//and there is no class information
export function updateQueue(data) {
  Socket.emit(SocketActions.UPDATE_QUEUE, {...data, user: Socket.id, class: 'classFoo'})
}
