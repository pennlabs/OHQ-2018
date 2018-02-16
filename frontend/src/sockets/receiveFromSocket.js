import Socket from './initSocket.js'

import { Store } from './../index.js'
import { SocketActions } from './../../../shared'

// Most of these functions take classInfo because after the server
// makes a change to a class, it is easiest to resend that entire class
// to each client. The exceptions are allClassInfo, which sends an array of classes,
// and userInfo, which just sends userInfo. The specification for classInfo
// and userInfo can be found in the shared folder.

Socket.on(SocketActions.CLASS_UPDATED, classInfo => {
  console.log('class updated', classInfo)
  Store.dispatch({ type: SocketActions.CLASS_UPDATED, payload: classInfo })
})

Socket.on(SocketActions.CLASS_QUEUE_JOINED, classInfo => {
  console.log('class queue updated', classInfo)
  Store.dispatch({ type: SocketActions.CLASS_QUEUE_JOINED, payload: classInfo })
})

Socket.on(SocketActions.USER_INFO_UPDATED, userInfo => {
  console.log('user info updated', userInfo)
  Store.dispatch({ type: SocketActions.USER_INFO_UPDATED, payload: userInfo })
})

Socket.on(SocketActions.ALL_CLASS_INFO, allClassInfo => {
  console.log('inital class data received', allClassInfo)
  Store.dispatch({ type: SocketActions.ALL_CLASS_INFO, payload: allClassInfo })
})

Socket.on(SocketActions.CLASS_ACTIVATED, classInfo => {
  console.log('class session created')
  Store.dispatch({ type: SocketActions.CLASS_ACTIVATED, payload: classInfo })
})

Socket.on(SocketActions.CLASS_DEACTIVATED, classInfo => {
  console.log('class session removed', classInfo)
  Store.dispatch({ type: SocketActions.CLASS_DEACTIVATED, payload: classInfo })
})

Socket.on(SocketActions.BROADCAST_UPDATED, classInfo => {
  console.log('broadcast updated', classInfo)
  Store.dispatch({ type: SocketActions.BROADCAST_UPDATED, payload: classInfo })
})

Socket.on(SocketActions.STUDENT_UNQUEUED_BY_TA, classInfo => {
  console.log('student unqueued by ta')
  Store.dispatch({ type: SocketActions.STUDENT_UNQUEUED_BY_TA, payload: classInfo })
})

// Will need to handle the user being disconnected: push them to a special screen
Socket.on('disconnect', () => {
  console.log('@@@@@@@@@@@@@disconnected!')
})
