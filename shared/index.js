// This file contains constants and types shared between the frontend and backend

/**
 * Represents a person.
 */
exports.UserInfo = class UserInfo {
  /**
   * @param {number} id - a unique id associated with the person
   * @param {string} firstName - the person's first name
   * @param {string} lastName - the person's last name
   */
  constructor(id, firstName, lastName) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
  }
}

/**
 * Stores information about a question in the queue
 */
exports.QuestionInfo = class QuestionInfo {
  /**
   * @param {UserInfo} userInfo - info of the person associated with the question.
   * @param {string} location - the location of where the asker is sitting
   * @param {string} question - the question being asked
   */
  constructor(userInfo, location, question) {
    this.userInfo = userInfo
    this.location = location
    this.question = question
  }
}

/**
 * The information needed to represent a full class
 * TODO: taactivitylog
 */
exports.ClassInfo = class ClassInfo {
  /**
   * @param {QuestionInfo[]} [queue=[]] - a queue representing the students in office hours
   * @param {Number[]} TAs - a list of the ids of the TAs in the course
   * @param {boolean} [isActive=false] - whether or not the class is active
   * @param {Number} id - the unique id of the course
   * @param {String} name - the name of the course
   * @param {String[]} [locations=[]] - a list of locations where the class is being held
   * @param {String} [broadcast=''] - an optional announcement when class is active
   */
  constructor(id, name, TAs, queue = [], isActive = false, locations = [], broadcast = '') {
    this.queue = queue
    this.TAs = TAs
    this.isActive = isActive
    this.id = id
    this.name = name
    this.locations = locations
    this.broadcast = broadcast
  }
}

exports.SocketActions = {
// These are actions that use websockets.  They are grouped in pairs;
// actions that emit to the server have a corresponding return action.
// Note that reducers generally only need to handle the return action.

  // this is used for the user to update class status.
  UPDATE_CLASS: 'UPDATE_CLASS',
  CLASS_UPDATED: 'CLASS_UPDATED',

  // this is used for students to join the class queue
  JOIN_CLASS_QUEUE: 'JOIN_CLASS_QUEUE',
  CLASS_QUEUE_JOINED: 'CLASS_QUEUE_JOINED',

  // this is used to update user info, and to send the initial info to the user.
  USER_INFO_UPDATED: 'USER_INFO_UPDATED',

  // this is used to send all the relevant classes when a user first connects
  ALL_CLASS_DATA: 'ALL_CLASS_DATA',

  // this is used to activate and deactivate a class.
  ACTIVATE_CLASS: 'ACTIVATE_CLASS',
  CLASS_ACTIVATED: 'CLASS_ACTIVATED',
  DEACTIVATE_CLASS: 'DEACTIVATE_CLASS',
  CLASS_DEACTIVATED: 'CLASS_DEACTIVATED',

  //this is used for TAs to remove a student from the queue
  REMOVE_FROM_QUEUE: 'REMOVE_FROM_QUEUE',
  QUEUE_REMOVED_FROM: 'QUEUE_REMOVED_FROM',

  // this is used to update a class' broadcast
  UPDATE_BROADCAST: 'UPDATE_BROADCAST',
  BROADCAST_UPDATED: 'BROADCAST_UPDATED'
}
