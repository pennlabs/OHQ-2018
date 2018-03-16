const io = require('socket.io')
const { UserInfo, QuestionInfo, ClassInfo } = require('../shared')
const { SocketActions } = require('./../shared')
const genUniqueData = require('./services/idAndLinkGenerator')

// TODO: handle type checking/input validation to prevent malformed data from crashing server
// TODO: close classes after X time
module.exports = function(server) {
  const socketServer = io(server)
  let connections = 0

  // these objects serve as maps
  const classIdsToClassData = {}
  const studentLinksToClassIds = {}
  const TALinksToClassIds = {}
  // this data should only be sent to TAs
  const classIdsToLinks = {}

  socketServer.on('connection', socket => {
    connections += 1
    console.log('A user connected!')
    console.log(`total connected: ${connections}`)

    socket.on('disconnect', () => {
      connections -= 1
      console.log('a user disconnected!')
    })

    // NOTE: We have multiple kinds of events, even if logic is redundant,
    // because it allows the frontend to behave differently depending
    // on the kind of event.

    /**
      * Used by TAs to start a class
      * @param {Number} classId
      * @param {String} locationText - where the office hours are being held
      * @param {String} endTime - when the office hours finish
      */
    // NOTE: two possible options here.  The first is that TAs
    // use their gen code as a unique url to join as a TA and that's
    // the only way we identify them.  The second way is that
    // after they use their gen code, they are registered in the class's
    // info with their id as being a TA, which means they could even be
    // redirected to a different url (potentially to prevent spying)
    // this second way will be necessary only if we want to show the students
    // the names of the TAs on duty because we'll need to allow
    // TAs to persist their sessions after refreshing.
    socket.on(SocketActions.CREATE_CLASS, ({ name, location }) => {
      const { studentLink, TALink, classId } = genUniqueData(
        { ...studentLinksToClassIds, ...TALinksToClassIds }
      )
      classIdsToLinks[classId] = { studentLink, TALink }
      studentLinksToClassIds[studentLink] = classId
      TALinksToClassIds[TALink] = classId
      classIdsToClassData[classId] = new ClassInfo(classId, name, location)
      socket.join(`${classId}`)
      // when the class is joined push the creator into the class' page
      socket.emit(SocketActions.CLASS_JOINED_TA, {
        classInfo: classIdsToClassData[classId],
        links: classIdsToLinks[classId]
      })
    })

    /**
     * Used when trying to access a specific uri path.  Either joins a class
     * as a student, a TA, or emits an error state if the path doesn't exist
     * @param {String} link - the uri path (e.g. protocol://server.domain/path)
     */
    socket.on(SocketActions.JOIN_CLASS, ({ link }) => {
      if (studentLinksToClassIds.hasOwnProperty(link)) {
        const classId = studentLinksToClassIds[link]
        socket.join(`${classId}`)
        socket.emit(SocketActions.CLASS_JOINED_STUDENT, { classInfo: classIdsToClassData[classId] })
      } else if (TALinksToClassIds.hasOwnProperty(link)) {
        const classId = TALinksToClassIds[link]
        socket.join(`${classId}`)
        // only send link info to TAs
        socket.emit(SocketActions.CLASS_JOINED_TA, {
          classInfo: classIdsToClassData[classId],
          links: classIdsToLinks[classId]
        })
      } else {
        socket.emit(SocketActions.CLASS_JOINED_FAILURE)
      }
    })

    /**
     * Used by students to join the office hours queue for a given class
     * @param {String} link - the uri path (e.g. protocol://server.domain/path)
     * @param {String} location - where the student is located
     * @param {String} question - the text of the student's question
     * @param {UserInfo} userInfo - the student's information
     */
    socket.on(SocketActions.JOIN_CLASS_QUEUE, ({ link, userInfo, location, question }) => {
      if (studentLinksToClassIds.hasOwnProperty(link)) {
        const classId = studentLinksToClassIds[link]
        // if the user is already in the queue do nothing
        for (let i = 0; i < classIdsToClassData[classId].queue.length; i++) {
          if (classIdsToClassData[classId].queue[i].userInfo.id === userInfo.id) return
        }
        classIdsToClassData[classId].queue.push(new QuestionInfo(userInfo, location, question))
        socketServer
          .to(`${classId}`)
          .emit(SocketActions.CLASS_QUEUE_JOINED, { classInfo: classIdsToClassData[classId] })
      }
    })

    /**
     * Used by TAs to shut down a class
     * TODO: should be called on its own at some point to avoid space leaks
     * @param {String} link
     */
    socket.on(SocketActions.DESTROY_CLASS, ({ link }) => {
      if (TALinksToClassIds.hasOwnProperty(link)) {
        const classId = TALinksToClassIds[link]
        const { studentLink } = classIdsToLinks[classId]
        delete classIdsToClassData[classId]
        delete classIdsToLinks[classId]
        delete TALinksToClassIds[link]
        delete studentLinksToClassIds[studentLink]
        socketServer.to(`${classId}`).emit(SocketActions.CLASS_DESTROYED)
      }
    })

    /**
     * Used by TAs to update the broadcast section of an active class, which
     * all students in that class see.
     * @param {String} link
     * @param {String} broadcast - the message being broadcasted
     */
    socket.on(SocketActions.UPDATE_BROADCAST, ({ link, broadcast }) => {
      if (TALinksToClassIds.hasOwnProperty(link)) {
        const classId = TALinksToClassIds[link]
        classIdsToClassData[classId].broadcast = broadcast
        socketServer
          .to(`${classId}`)
          .emit(SocketActions.BROADCAST_UPDATED, { classInfo: classIdsToClassData[classId] })
      }
    })

    /**
     * Used by TAs to unqueue students from the office hours queue
     * when they go to help them.
     * TODO: may need to send back the latest question; wait for feedback
     * @param {String} link
     */
    socket.on(SocketActions.TA_UNQUEUE_STUDENT, ({ link }) => {
      if (TALinksToClassIds.hasOwnProperty(link)) {
        const classId = TALinksToClassIds[link]
        const questionInfo = classIdsToClassData[classId].queue.shift()
        socketServer
          .to(`${classId}`)
          .emit(SocketActions.STUDENT_UNQUEUED_BY_TA, { classInfo: classIdsToClassData[classId] })
      }
    })

    /**
     * Used by students to remove themselves from the office hours queue.
     * @param {String} link
     */
    socket.on(SocketActions.STUDENT_UNQUEUE_SELF, ({ link }) => {
      if (studentLinksToClassIds.hasOwnProperty(link)) {
        const classId = studentLinksToClassIds[link]
        const questionInfo = classIdsToClassData[classId].queue.shift()
        socketServer
          .to(`${classId}`)
          .emit(SocketActions.STUDENT_UNQUEUED_BY_TA, { classInfo: classIdsToClassData[classId] })
      }
    })
  })
}
