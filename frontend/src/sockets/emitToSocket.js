// This file contains actions that are sent via websocket to the server.
// It is not necessary to use mapDispatchToProps; instead, reducers should just handle
// any corresponding events in receiveFromSocket

import Socket from './initSocket'
import * as SocketActions from './socketActionTypes'

//updateClass takes an entire class as a parameter.
export function updateClass(myClass) {
  Socket.emit(SocketActions.UPDATE_CLASS, myClass)
}

//updateClassQueue takes an object containing question, location, userInfo, and classId properties.
export function joinClassQueue(data) {
  Socket.emit(SocketActions.JOIN_CLASS_QUEUE, data)
}

// activateClass takes an object with classId, locationText, and endTime fields
// classId is a number and the other two are strings
export function activateClass(data) {
  Socket.emit(SocketActions.ACTIVATE_CLASS, data)
}

// deactiveClass takes a class id as a parameter
export function deactivateClass(classId) {
  Socket.emit(SocketActions.DEACTIVATE_CLASS, classId)
}

// updateBroadcast updates the broadcast section of the classpage.
// takes an object containing a `classId` which is a number,
// and a `broadcast` which is a string
export function updateBroadcast(data) {
  Socket.emit(SocketActions.UPDATE_BROADCAST, data)
}

// NOTE: may not be necessary, updateClass could simply add a class.
// updateClass takes an entire class as an object.
// export function addClass(myClass) {
//   Socket.emit(SocketActions.UPDATE_CLASS, myClass)
// }
