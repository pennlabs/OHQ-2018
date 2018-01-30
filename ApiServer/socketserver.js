const io = require('socket.io')
const { pick } = require('lodash')
const { UserInfo, QuestionInfo, TALogInfo } = require('../shared')
const { SocketActions } = require('./../shared')

// TODO: once we figure out authentication, we need to prevent non-auth'd users from being able to
// connect to our socket server.

// TODO: handle type checking to prevent someone sending wrong types and crashing server

// temporary obj to hold user data
// TODO: each user will also need to store the classes subscribed to,
// so that they only receive socket events relevant to those classes
const nameData = {
  count: 0,
  getNameAndCount() {
    if (this.count >= this.list.length) {
      this.count = 1
      return { name: this.list[0], count: 0, classes: this.list[0].classIDList }
    }
    const str = this.list[this.count].name
    const classes = this.list[this.count].classIDList
    const currentCount = this.count
    this.count++
    return { name: str, count: currentCount, classes }
  },
  list: [
    { name: 'Bilbo Baggins', classIDList: [0, 1, 2] },
    { name: 'Frodo Baggins', classIDList: [0, 1, 2] },
    { name: 'Samwise Gamgee', classIDList: [0, 1, 2] },
    { name: 'Merry Brandybuck', classIDList: [0, 1, 2] },
    { name: 'Pippin Took', classIDList: [0, 1, 2] },
    { name: 'Tom Bombadil', classIDList: [0, 1, 2] },
    { name: 'Xuan Fronk', classIDList: [0, 1, 2] },
    { name: 'Victoria Mebane', classIDList: [0, 1, 2] },
    { name: 'Tiffaney Wile', classIDList: [0, 1, 2] },
    { name: 'Troy Gervais', classIDList: [0, 1, 2] },
    { name: 'Valda Carriere', classIDList: [0, 1, 2] },
    { name: 'Deborah Loder', classIDList: [0, 1, 2] },
    { name: 'Karl Giddens', classIDList: [0, 1, 2] },
    { name: 'Marguerite Brookes', classIDList: [0, 1, 2] },
    { name: 'Cameron Rushford', classIDList: [0, 1, 2] },
    { name: 'Charlesetta Lundstrom', classIDList: [0, 1, 2] },
    { name: 'Klara Gallman', classIDList: [0, 1, 2] },
    { name: 'Angele Harry', classIDList: [0, 1, 2] },
    { name: 'Norah Pears', classIDList: [0, 1, 2] },
    { name: 'Debora Waymire', classIDList: [0, 1, 2] },
    { name: 'Norine Messerly', classIDList: [0, 1, 2] },
    { name: 'Mark Weingart', classIDList: [0, 1, 2] },
    { name: 'Stephanie Mcginnis', classIDList: [0, 1, 2] },
    { name: 'Roscoe Birdsell', classIDList: [0, 1, 2] },
    { name: 'Santa Staudt', classIDList: [0, 1, 2] },
    { name: 'Jonathon Abram', classIDList: [0, 1, 2] },
    { name: 'Tomas Lagarde', classIDList: [0, 1, 2] },
    { name: 'Renda Strauch', classIDList: [0, 1, 2] },
    { name: 'Carolynn Mullikin', classIDList: [0, 1, 2] },
    { name: 'Elias Scogin', classIDList: [0, 1, 2] },
    { name: 'Edward Elric', classIDList: [0, 1, 2] },
    { name: 'Ty Gaeth', classIDList: [0, 1, 2] },
    { name: 'Imelda Melnick', classIDList: [0, 1, 2] },
    { name: 'Jackie Kuiper', classIDList: [0, 1, 2] },
    { name: 'Stacey Mone', classIDList: [0, 1, 2] },
    { name: 'Elfreda Antonelli', classIDList: [0, 1, 2] },
    { name: 'Elizabeth Soriano', classIDList: [0, 1, 2] },
    { name: 'Kristyn Hultman', classIDList: [0, 1, 2] },
    { name: 'Miles Andre', classIDList: [0, 1, 2] },
    { name: 'Tammera Phaneuf', classIDList: [0, 1, 2] },
    { name: 'Roxane Wirtz', classIDList: [0, 1, 2] },
    { name: 'Vergie Level', classIDList: [0, 1, 2] },
    { name: 'Verna Einhorn', classIDList: [0, 1, 2] },
    { name: 'Nereida Romanowski', classIDList: [0, 1, 2] },
    { name: 'Dorathy Cafferty', classIDList: [0, 1, 2] },
    { name: 'Sean Fadden', classIDList: [0, 1, 2] },
    { name: 'Garrett Bossard', classIDList: [0, 1, 2] },
    { name: 'Alla Montijo', classIDList: [0, 1, 2] },
    { name: 'Randall Reddington', classIDList: [0, 1, 2] },
    { name: 'Arlinda Rent', classIDList: [0, 1, 2] },
  ]
}

module.exports = function(server) {
  const socketServer = io(server)
  const connections = []

  //we use an object as a hashmap for faster retrieval
  //TODO: the initial list of classQueues
  //will need to be retrieved from some kind of database
  const classQueues = {
    0: {
      queue: [],
      TAs: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30],
      TAActivityLog: [],
      isActive: false,
      id: 0,
      name: 'CIS 110',
      broadcast: '',
      locations: []
    },
    1: {
      queue: [],
      TAs: [],
      TAActivityLog: [],
      isActive: true,
      id: 1,
      name: 'CIS 120',
      broadcast: '',
      locations: ['Towne 100']
    },
    2: {
      queue: [],
      TAs: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30].map(x => x + 1),
      TAActivityLog: [],
      isActive: false,
      id: 2,
      name: 'CIS 160',
      broadcast: '',
      locations: []
    }
  }

  socketServer.on('connection', socket => {
    connections.push(socket)
    console.log('A user connected!')
    console.log(`new length: ${connections.length}`)

    //TODO: we will need to query information from our database here
    //Get the connected user's information
    const { name: currentName, count, classes } = nameData.getNameAndCount()

    //connect the user to a channel for each class ID.
    //using a for loop for maximum performance server side
    // TODO: we can use this to check if the user belongs to the class
    // for which they're trying to send events.
    if (classes != null && classes.length != null) {
      for (let i = 0; i < classes.length; i++) {
        socket.join(`${classes[i]}`)
      }
    }

    //send the user information for every class they're subscribed to
    socket.emit(SocketActions.ALL_CLASS_INFO, pick(classQueues, classes))

    socket.emit(
      'USER_INFO_UPDATED',
      new UserInfo(count, currentName.split(' ')[0], currentName.split(' ')[1])
    )

    socket.on('disconnect', () => {
      const index = connections.indexOf(socket)
      connections.splice(index, 1)
      console.log('a user disconnected!')
      console.log(`new length: ${connections.length}`)
    })

    /**
     * A brute force update of an entire class.  Shouldn't need to be used.
     * @param {ClassInfo} data - all information about a class
     */
    socket.on(SocketActions.UPDATE_CLASS, data => {
      console.log('update class event logged:', data)
      classQueues[data.id] = data
      socketServer.emit(SocketActions.CLASS_UPDATED, classQueues[data.id])
    })

    //TODO: in future, we probably don't want to allow any user to modify any property of the classQueue.
    //Logic should be restricted based on TA/user status.  Simply requiring the userId isn't secure;
    //we will need to also use whatever auth mechanism we end up using
    /**
     * Used by students to join the office hours queue for a given class
     * @param {Number} classId - the class whose office hours are being joined
     * @param {String} location - where the student is located
     * @param {String} question - the text of the student's question
     * @param {UserInfo} userInfo - the student's information
     */
    socket.on(SocketActions.JOIN_CLASS_QUEUE, ({ question, location, userInfo, classId }) => {
      //check if the user is already in the queue, if so, do nothing.
      //using a for loop here for faster execution
      for (let i = 0; i < classQueues[classId].queue.length; i++) {
        if (classQueues[classId].queue[i].userInfo.id === userInfo.id) return
      }
      classQueues[classId].queue.push(new QuestionInfo(userInfo, location, question))
      socketServer.to(`${classId}`).emit(SocketActions.CLASS_QUEUE_JOINED, classQueues[classId])
    })

    /**
     * Used by TAs to activate an inactive class
     * @param {Number} classId
     * @param {String} locationText - where the office hours are being held
     * @param {String} endTime - when the office hours finish
     */
    socket.on(SocketActions.ACTIVATE_CLASS, ({ classId, locationText, endTime }) => {
      classQueues[classId].isActive = true
      classQueues[classId].locations.push(locationText)
      socketServer.to(`${classId}`).emit(SocketActions.CLASS_ACTIVATED, classQueues[classId])
    })

    /**
     * Used by TAs to deactivate an active class
     * @param {Number} classId
     */
    socket.on(SocketActions.DEACTIVATE_CLASS, ({ classId }) => {
      classQueues[classId].isActive = false
      // empty working data
      classQueues[classId].queue = []
      classQueues[classId].locations = []
      classQueues[classId].broadcast = ''
      // TODO: here also empty the ta log and write it to the DB for analytics
      socketServer.to(`${classId}`).emit(SocketActions.CLASS_DEACTIVATED, classQueues[classId])
    })

    /**
     * Used by TAs topdate the broadcast section of an active class, which
     * all students in that class see.
     * @param {Number} classId
     * @param {String} broadcast - the message being broadcasted
     */
    socket.on(SocketActions.UPDATE_BROADCAST, ({ classId, broadcast }) => {
      classQueues[classId].broadcast = broadcast
      socketServer.to(`${classId}`).emit(SocketActions.BROADCAST_UPDATED, classQueues[classId])
    })

    /**
     * Used by TAs to unqueue students from the office hours queue
     * when they go to help them.  It's a bit of a hack, but this also
     * updates the TA activity log.  If we wanted the TA log to be handled
     * as a separate event, we could refactor this file so that rather than
     * emitting all class data for every event, we emit only parts of the class
     * object that are relevant.  Will probably end up doing that
     * once OHQ is released; for now, sending the entire class is easier
     * to dev with.
     * @param {Number} classId
     * @param {UserInfo} userInfo - information on the TA who unqueued the student
     */
    socket.on(SocketActions.TA_UNQUEUE_STUDENT, ({ classId, userInfo: TAInfo }) => {
      if (!classQueues[classId].queue.length) return
      const questionInfo = classQueues[classId].queue.shift()
      const time = new Date()
      // Update ta activity log
      classQueues[classId].TAActivityLog.push(new TALogInfo(TAInfo, questionInfo, time))
      socketServer.to(`${classId}`)
        .emit(SocketActions.STUDENT_UNQUEUED_BY_TA, classQueues[classId])
    })
  })
}
