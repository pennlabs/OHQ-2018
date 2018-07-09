// This file contains constants and types shared between the frontend and backend

// TODO: probably best to have a class for each kind of data that a socket sends
// TODO: this should be decoupled as much as possible - since the backend
// is very simple, we may want to consider rewriting to go/clojure
// for improved server performance. See https://hashrocket.com/blog/posts/websocket-shootout

// checks if an object is an instance of CandidateClass via duck typing
exports.matches = function(object, CandidateClass) {
  const keys = Object.keys(new CandidateClass())
  if (keys.length !== Object.keys(object).length) {
    return false
  }
  for (const key of keys) {
    if (!object.hasOwnProperty(key)) {
      return false
    }
  }
  return true
}

/**
 * Represents a person.
 * TODO: ensure that students stay in the queue upon refresh
 */
exports.UserInfo = class UserInfo {
  /**
   * @param {number} id - a unique id associated with the person
   * @param {String} firstName - the person's first name
   * @param {String} lastName - the person's last name
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
   * @param {String} location - the location of where the asker is sitting
   * @param {String} question - the question being asked
   */
  constructor(userInfo, location, question) {
    this.userInfo = userInfo
    this.location = location
    this.question = question
  }
}

// TODO: also update the log for events like class creation,
// broadcast updates, class closing, etc.
// Will need to refactor into a one-of/union type.
// exports.TALogInfo = class TALogInfo {
//   /**
//    * @param {UserInfo} TAInfo - info of the TA who updated the actoin
//    * @param {QuestionInfo} questionInfo - the data about the student's question.
//    * @param {Date} time - the time that the TA helped the student
//    */
//   constructor(TAInfo, questionInfo, time) {
//     this.TAInfo = TAInfo
//     this.questionInfo = questionInfo
//     this.time = time
//   }
// }

/**
 * The information needed to represent a full class
 */
exports.ClassInfo = class ClassInfo {
  // TODO: we don't want to send TALink info to students; handle this somehow
  /**
   * @param {Number} id - the unique id of the course
   * @param {String} name - the name of the course
   * @param {String} [location=''] - the location where the class is being held
   * @param {QuestionInfo[]} [queue=[]] - a queue representing the students in office hours
   * @param {String} [broadcast=''] - an optional announcement when class is active
   */
  constructor(id, name, location = '', queue = [], broadcast = '') {
    this.id = id
    this.name = name
    this.location = location
    this.queue = queue
    this.broadcast = broadcast
  }
}

exports.SocketActions = {
  // These are actions that use websockets.  They are grouped in pairs;
  // actions that emit to the server have a corresponding return action.
  // Note that reducers generally only need to handle the return action.
  // Singleton actions mean that the server sent in a way that is
  // not coupled to a corresponding action.  E.g. on connection the user
  // receives data for the classes they're subcribed to.

  // generic info updating
  CLASS_UPDATED: 'CLASS_UPDATED',

  // used by students and TAs to join a created class
  // either joined or joined_failure is returned depending on whether a valid
  // link is used
  JOIN_CLASS: 'JOIN_CLASS',
  CLASS_JOINED_TA: 'CLASS_JOINED_TA',
  CLASS_JOINED_STUDENT: 'CLASS_JOINED_STUDENT',
  CLASS_JOINED_FAILURE: 'CLASS_JOINED_FAILURE',

  // used by students to join the class queue
  JOIN_CLASS_QUEUE: 'JOIN_CLASS_QUEUE',
  CLASS_QUEUE_JOINED: 'CLASS_QUEUE_JOINED',

  // used to activate a class
  CREATE_CLASS: 'CREATE_CLASS',
  CLASS_CREATED: 'CLASS_CREATED',

  // used to deactivate a class.
  DESTROY_CLASS: 'DESTROY_CLASS',
  CLASS_DESTROYED: 'CLASS_DESTROYED',

  // used for unqueuing students from the queue.
  // different cases allow different notifications on the frontend
  TA_UNQUEUE_STUDENT: 'TA_UNQUEUE_STUDENT',
  STUDENT_UNQUEUE_SELF: 'STUDENT_UNQUEUE_SELF',
  STUDENT_UNQUEUED_BY_SELF: 'STUDENT_UNQUEUED_BY_SELF',
  STUDENT_UNQUEUED_BY_TA: 'STUDENT_UNQUEUED_BY_TA',

  // used to update a class' broadcast
  UPDATE_BROADCAST: 'UPDATE_BROADCAST',
  BROADCAST_UPDATED: 'BROADCAST_UPDATED',
}
