import Socket from './initSocket'
import * as SocketActions from './socketActionTypes'

//updateClass takes an entire class as a parameter.
export function updateClass(myClass) {
  Socket.emit(SocketActions.UPDATE_CLASS, myClass)
}

//updateClassQueue takes an object containing question, location, userInfo, and classId properties.
export function updateClassQueue(data) {
  Socket.emit(SocketActions.UPDATE_CLASS_QUEUE, data)
}

//NOTE: may not be necessary, updateClass could simply add a class.
//updateClass takes an entire class as an object.
// export function addClass(myClass) {
//   Socket.emit(SocketActions.UPDATE_CLASS, myClass)
// }
