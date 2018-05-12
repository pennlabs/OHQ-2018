import Socket from './initSocket.js'

import { Store } from './../index.js'
import { SocketActions } from './../../../shared'

// Most of these functions take classInfo because after the server
// makes a change to a class, it is easiest to resend that entire class
// to each client.  TODO: update me

Socket.on(SocketActions.CLASS_UPDATED, ({ classInfo }) => {
  Store.dispatch({ type: SocketActions.CLASS_UPDATED, payload: classInfo })
})

Socket.on(SocketActions.CLASS_JOINED_TA, ({ classInfo, links }) => {
  console.log('class joined TA')
  Store.dispatch({
    type: SocketActions.CLASS_JOINED_TA,
    payload: { classInfo, links }
  })
})

Socket.on(SocketActions.CLASS_JOINED_STUDENT, ({ classInfo }) => {
  console.log('class joined student')
  Store.dispatch({ type: SocketActions.CLASS_JOINED_STUDENT, payload: classInfo })
})

Socket.on(SocketActions.CLASS_JOINED_FAILURE, () => {
  console.log('class joined failure')
  Store.dispatch({ type: SocketActions.CLASS_JOINED_FAILURE })
})

Socket.on(SocketActions.CLASS_QUEUE_JOINED, ({ classInfo }) => {
  console.log('class queue updated', classInfo)
  Store.dispatch({ type: SocketActions.CLASS_QUEUE_JOINED, payload: classInfo })
})

Socket.on(SocketActions.CLASS_DESTROYED, () => {
  console.log('class destroyed')
  Store.dispatch({ type: SocketActions.CLASS_DESTROYED })
})

Socket.on(SocketActions.BROADCAST_UPDATED, ({ classInfo }) => {
  console.log('broadcast updated')
  Store.dispatch({ type: SocketActions.BROADCAST_UPDATED, payload: classInfo })
})

Socket.on(SocketActions.STUDENT_UNQUEUED_BY_TA, ({ classInfo }) => {
  console.log('student unqueued by ta')
  Store.dispatch({ type: SocketActions.STUDENT_UNQUEUED_BY_TA, payload: classInfo })
})

Socket.on(SocketActions.STUDENT_UNQUEUED_BY_SELF, ({ classInfo }) => {
  console.log('student unqueued self')
  Store.dispatch({ type: SocketActions.STUDENT_UNQUEUED_BY_SELF, payload: classInfo })
})

// Will need to handle the user being disconnected: push them to a special screen
Socket.on('disconnect', () => {
  console.log('@@@@@@@@@@@@@disconnected!')
})
