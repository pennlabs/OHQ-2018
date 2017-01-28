const io = require('socket.io')

module.exports = function(server) {
  const socketServer = io(server)
  const connections = []

  socketServer.on('connection', socket => {
    connections.push(socket)

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
  })

}
