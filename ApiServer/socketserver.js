const io = require('socket.io')

//TODO: once we figure out authentication, we need to prevent non-auth'd users from being able to
//connect to our socket server.

module.exports = function(server) {
  const socketServer = io(server)
  const connections = []

  //classQueues is an object consisting of keys which map to arrays, where each array consists of
  //objects containing a user and a question
  const classQueues = {
    classFoo: []
  }

  socketServer.on('connection', socket => {
    connections.push(socket)
    //emit initial event for starting classQueues
    socketServer.emit('QUEUE_UPDATED', classQueues)

    //Example socket code for a chat application
    // socket.on('message', data => {
    //   connections.forEach(connectedSocket => {
    //     if (connectedSocket !== socket) {
    //       connectedSocket.emit('message', data)
    //     }
    //   })
    // })

    socket.on('disconnect', () => {
      const index = connections.indexOf(socket)
      connections.splice(index, 1)
      console.log('a user disconnected!')
      console.log(`new length: ${connections.length}`)
    })
    console.log('A user connected!')
    console.log(`new length: ${connections.length}`)


    socket.on('UPDATE_QUEUE', data => {
      //TODO: this needs to be able to handle different classes
      console.log('update queue event logged:', data)
      classQueues.classFoo.push(data)
      socketServer.emit('QUEUE_UPDATED', classQueues)
    })
  })

}
