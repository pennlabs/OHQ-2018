import Socket from './initSocket'
import * as SocketActions from './socketActionTypes'

//updateClass takes an entire class as a parameter.
export function updateClass(myClass) {
  Socket.emit(SocketActions.UPDATE_CLASS, myClass)
}

//updateClassQueue takes an object containing question, location, userInfo, and class properties.
export function updateClassQueue(data) {
  Socket.emit(SocketActions.UPDATE_CLASS_QUEUE, data)
}

//NOTE: probably remove this, since selected class is something only a single user cares about
//and does not involve modifying any data.
export function updateSelectedClass(myClass) {
  Socket.emit(SocketActions.UPDATE_SELECTED_CLASS, myClass)
}

//NOTE: may not be necessary, updateClass could simply add a class.
//updateClass takes an entire class as an object.
// export function addClass(myClass) {
//   Socket.emit(SocketActions.UPDATE_CLASS, myClass)
// }
