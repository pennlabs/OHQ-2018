const io = require('socket.io')

//TODO: once we figure out authentication, we need to prevent non-auth'd users from being able to
//connect to our socket server.

//temporary obj to hold user data
const nameData = {
  count: 0,
  getName() {
    if (this.count >= this.list.length) {
      this.count = 1
      return this.list[0]
    }
    const str = this.list[this.count]
    this.count++
    return str
  },
  list: [
    'Jazmine Kidney',
    'Marlys Hannah',
    'Moriah Treaster',
    'Golden Bloyd',
    'Kiana Chartrand',
    'Willow Brockwell',
    'Xuan Fronk',
    'Victoria Mebane',
    'Tiffaney Wile',
    'Troy Gervais',
    'Valda Carriere',
    'Deborah Loder',
    'Karl Giddens',
    'Marguerite Brookes',
    'Cameron Rushford',
    'Charlesetta Lundstrom',
    'Klara Gallman',
    'Angele Harry',
    'Norah Pears',
    'Debora Waymire',
    'Norine Messerly',
    'Mark Weingart',
    'Stephanie Mcginnis',
    'Roscoe Birdsell',
    'Santa Staudt',
    'Jonathon Abram',
    'Tomas Lagarde',
    'Renda Strauch',
    'Carolynn Mullikin',
    'Elias Scogin',
    'Edward Elric',
    'Ty Gaeth',
    'Imelda Melnick',
    'Jackie Kuiper',
    'Stacey Mone',
    'Elfreda Antonelli',
    'Elizabeth Soriano',
    'Kristyn Hultman',
    'Miles Andre',
    'Tammera Phaneuf',
    'Roxane Wirtz',
    'Vergie Level',
    'Verna Einhorn',
    'Nereida Romanowski',
    'Dorathy Cafferty',
    'Sean Fadden',
    'Garrett Bossard',
    'Alla Montijo',
    'Randall Reddington',
    'Arlinda Rent',
  ]
}

module.exports = function(server) {
  const socketServer = io(server)
  const connections = []

  //classQueues is an object consisting of keys which map to arrays, where each array consists of
  //objects containing a user and a question.  TODO: the initial list of classQueues
  //will need to be retrieved from some kind of database
  const classQueues = {
    0: {
      queue: [], //queue is an array of objects, where each object has user, location, and question properties
      TAs: [],
      isActive: true,
      id: 0,
      name: 'classFoo'
    },
    1: {
      queue: [], //queue is an array of objects, where each object has user, location, and question properties
      TAs: [],
      isActive: false,
      id: 1,
      name: 'classBar'
    }
  }

  let currentName

  socketServer.on('connection', socket => {
    connections.push(socket)
    console.log('A user connected!')
    console.log(`new length: ${connections.length}`)

    //emit initial event for starting classQueues
    socketServer.emit('ALL_CLASS_DATA', classQueues)

    //TODO: we will need to query information from our database here
    currentName = nameData.getName()
    socket.emit('USER_INFO_UPDATED', {
      id: socket.id,
      firstName: currentName.split(' ')[0],
      lastName: currentName.split(' ')[1],
    })

    socket.on('disconnect', () => {
      const index = connections.indexOf(socket)
      connections.splice(index, 1)
      console.log('a user disconnected!')
      console.log(`new length: ${connections.length}`)
    })

    //TODO: in future, we probably don't want to allow the user to modify any property of the classQueue.
    //Logic should be restricted based on TA/user status and only specific properties should be able
    //to be modified.
    socket.on('UPDATE_CLASS', data => {
      console.log('update class event logged:', data)
      classQueues[data.id] = data
      socketServer.emit('CLASS_UPDATED', classQueues[data.id])
    })

    socket.on('UPDATE_CLASS_QUEUE', data => {
      console.log('update class queue event logged:', data)
      const { question, location, userInfo, classId } = data

      //check if the user is already in the queue, if so, do nothing.
      //using a for loop here for faster execution
      for (let i = 0; i < classQueues[classId].queue.length; i++) {
        if (classQueues[classId].queue[i].userInfo.id === userInfo.id) return
      }
      classQueues[classId].queue.push({question, location, userInfo})
      socketServer.emit('CLASS_QUEUE_UPDATED', classQueues[classId])
    })
  })
}
