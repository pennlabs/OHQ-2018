// This file contains actions that are sent via websocket to the server.
// It is not necessary to use mapDispatchToProps; instead, reducers should just handle
// any corresponding events in receiveFromSocket
// NOTE: the annotations are not full jsdoc annotations due to each function
// taking a sole parameter. This was done on purpose for simplicity.

import Socket from './initSocket'
import { SocketActions } from './../../../shared'

/**
 * A brute force update of an entire class.  Shouldn't need to be used.
 * @param {ClassInfo} myClass - all information about a class
 */
export function updateClass(myClass) {
  Socket.emit(SocketActions.UPDATE_CLASS, myClass)
}

/**
 * Used by students to join the office hours queue for a given class
 * @param {Number} classId - the class whose office hours are being joined
 * @param {String} location - where the student is located
 * @param {String} question - the text of the student's question
 * @param {UserInfo} userInfo - the student's information
 */
export function joinClassQueue({question, location, userInfo, classId}) {
  Socket.emit(SocketActions.JOIN_CLASS_QUEUE, {question, location, userInfo, classId})
}

/**
 * Used by TAs to activate an inactive class
 * @param {Number} classId
 * @param {String} locationText - where the office hours are being held
 * @param {String} endTime - when the office hours finish
 */
export function activateClass({classId, locationText, endTime}) {
  Socket.emit(SocketActions.ACTIVATE_CLASS, {classId, locationText, endTime})
}

/**
 * Used by TAs to deactivate an active class
 * @param {Number} classId
 */
export function deactivateClass({classId}) {
  Socket.emit(SocketActions.DEACTIVATE_CLASS, {classId})
}

/**
 * Used by TAs topdate the broadcast section of an active class, which
 * all students in that class see.
 * @param {Number} classId
 * @param {String} broadcast - the message being broadcasted
 */
export function updateBroadcast({classId, broadcast}) {
  Socket.emit(SocketActions.UPDATE_BROADCAST, {classId, broadcast})
}

// TODO: make sure this can also handle the TA activity log
/**
 * Used by TAs to unqueue students from the office hours queue
 * when they go to help them.
 * @param {Number} classId
 * @param {UserInfo} userInfo - information on the TA who unqueued the student
 */
export function taUnqueueStudent({classId, userInfo}) {
  Socket.emit(SocketActions.TA_UNQUEUE_STUDENT, {classId, userInfo})
}

// NOTE: may not be necessary, updateClass could simply add a class.
// updateClass takes an entire class as an object.
// export function addClass(myClass) {
//   Socket.emit(SocketActions.UPDATE_CLASS, myClass)
// }
