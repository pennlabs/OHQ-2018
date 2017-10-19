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
