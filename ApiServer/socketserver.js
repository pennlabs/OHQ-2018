const io = require('socket.io')
const { pick } = require('lodash')

// TODO: once we figure out authentication, we need to prevent non-auth'd users from being able to
// connect to our socket server.

// temporary obj to hold user data
// TODO: each user will also need to store the classes subscribed to,
// so that they only receive socket events relevant to those classes
const nameData = {
  count: 0,
  getNameAndCount() {
    if (this.count >= this.list.length) {
      this.count = 1
      return { name: this.list[0], count: 0 }
    }
    const str = this.list[this.count].name
    const classes = this.list[this.count].classIDList
    const currentCount = this.count
    this.count++
    return { name: str, count: currentCount, classes }
  },
  list: [
    { name: 'Bilbo Baggins', classIDList: [0, 1, 2] },
    { name: 'Marlys Hannah', classIDList: [0, 1, 2] },
    { name: 'Moriah Treaster', classIDList: [0, 1, 2] },
    { name: 'Golden Bloyd', classIDList: [0, 1, 2] },
    { name: 'Kiana Chartrand', classIDList: [0, 1, 2] },
    { name: 'Willow Brockwell', classIDList: [0, 1, 2] },
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

// TODO: we need to ensure that users only see updates to the classes they've added.
// Right now every user sees the action for every class.
module.exports = function(server) {
  const socketServer = io(server)
  const connections = []

  //classQueues is an object consisting of keys which map to arrays, where each array consists of
  //objects containing a user and a question.  TODO: the initial list of classQueues
  //will need to be retrieved from some kind of database
  const classQueues = {
    0: {
      queue: [], //queue is an array of objects, where each object has user, location, and question properties
      TAs: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18], //TAs is a list of ids, where each id represents a TA's student id.
      isActive: false,
      id: 0,
      name: 'CIS 110',
      locations: [] // use an array here in case of multiple locations
    },
    1: {
      queue: [],
      TAs: [],
      isActive: true,
      id: 1,
      name: 'CIS 120',
      locations: ['Towne 100']
    },
    2: {
      queue: [],
      TAs: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18].map(x => x + 1),
      isActive: false,
      id: 2,
      name: 'CIS 160',
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
    classes.forEach(id => {
      socket.join(`${id}`)
    })

    //send the user information for every class they're subscribed to
    socket.emit('ALL_CLASS_DATA', pick(classQueues, classes))

    socket.emit('USER_INFO_UPDATED', {
      id: count,
      firstName: currentName.split(' ')[0],
      lastName: currentName.split(' ')[1],
    })

    socket.on('disconnect', () => {
      const index = connections.indexOf(socket)
      connections.splice(index, 1)
      console.log('a user disconnected!')
      console.log(`new length: ${connections.length}`)
    })

    //A general method to modify data is a bad idea; only specific properties should be able
    //to be modified.
    socket.on('UPDATE_CLASS', data => {
      console.log('update class event logged:', data)
      classQueues[data.id] = data
      socketServer.emit('CLASS_UPDATED', classQueues[data.id])
    })

    //TODO: in future, we probably don't want to allow any user to modify any property of the classQueue.
    //Logic should be restricted based on TA/user status.  Simply requiring the userId isn't secure;
    //we will need to also use whatever auth mechanism we end up using
    socket.on('JOIN_CLASS_QUEUE', data => {
      console.log('update class queue event logged:', data)
      const { question, location, userInfo, classId } = data

      //check if the user is already in the queue, if so, do nothing.
      //using a for loop here for faster execution
      for (let i = 0; i < classQueues[classId].queue.length; i++) {
        if (classQueues[classId].queue[i].userInfo.id === userInfo.id) return
      }
      classQueues[classId].queue.push({question, location, userInfo})
      socketServer.to(`${classId}`).emit('CLASS_QUEUE_JOINED', classQueues[classId])
    })

    socket.on('ACTIVATE_CLASS', ({classId, locationText, endTime}) => {
      classQueues[classId].isActive = true
      classQueues[classId].locations.push(locationText)
      socketServer.to(`${classId}`).emit('CLASS_ACTIVATED', classQueues[classId])
    })

    socket.on('DEACTIVATE_CLASS', classId => {
      classQueues[classId].isActive = false
      // empty working arrays
      classQueues[classId].queue = []
      classQueues[classId].locations = []
      socketServer.to(`${classId}`).emit('CLASS_DEACTIVATED', classQueues[classId])
    })
  })
}
