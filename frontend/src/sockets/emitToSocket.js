// This file contains all methods used for sending data from the client
// to the server via websockets

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
 * Used to attempt to join a class
 * @param {Number} link - the current uri path
 */
export function joinClass({ link }) {
  Socket.emit(SocketActions.JOIN_CLASS, { link })
}

/**
 * Used by students to join the office hours queue for a given class
 * @param {String} location - where the student is located
 * @param {String} question - the text of the student's question
 * @param {UserInfo} userInfo - the student's information
 * @param {Number} link - the current uri path
 */
export function joinClassQueue({ question, location, userInfo, link }) {
  Socket.emit(SocketActions.JOIN_CLASS_QUEUE, { question, location, userInfo, link })
}

/**
 * Used by TAs to create an OHQ session
 * @param {String} location - where the office hours are being held
 * @param {String} endTime - when the office hours finish
 */
export function createClass({ location, className }) {
  Socket.emit(SocketActions.CREATE_CLASS, { location, className })
}

/**
 * Used by TAs to deactivate an active class
 * @param {Number} classId
 */
export function deactivateClass({ link }) {
  Socket.emit(SocketActions.DESTROY_CLASS, { link })
}

/**
 * Used by TAs topdate the broadcast section of an active class, which
 * all students in that class see.
 * @param {Number} classId
 * @param {String} broadcast - the message being broadcasted
 */
export function updateBroadcast({ link, broadcast }) {
  Socket.emit(SocketActions.UPDATE_BROADCAST, { link, broadcast })
}

/**
 * Used by TAs to unqueue students from the office hours queue
 * when they go to help them.
 * @param {Number} classId
 * @param {UserInfo} userInfo - information on the TA who unqueued the student
 */
export function taUnqueueStudent({ link, userInfo }) {
  Socket.emit(SocketActions.TA_UNQUEUE_STUDENT, { link, userInfo })
}

/**
 * Used by TAs to unqueue students from the office hours queue
 * when they go to help them.
 * @param {Number} classId
 * @param {UserInfo} userInfo - information on the TA who unqueued the student
 */
export function studentUnqueueSelf({ link, userInfo }) {
  Socket.emit(SocketActions.STUDENT_UNQUEUE_SELF, { link, userInfo })
}
