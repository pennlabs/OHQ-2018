import Socket from './initSocket'

import { Store } from './../index.js'
import * as SocketActions from './socketActionTypes'

Socket.on(SocketActions.CLASS_UPDATED, classData => {
  console.log('class updated', classData)
  Store.dispatch({type: SocketActions.CLASS_UPDATED, payload: classData})
})

Socket.on(SocketActions.CLASS_QUEUE_JOINED, classData => {
  console.log('class queue updated', classData)
  Store.dispatch({type: SocketActions.CLASS_QUEUE_JOINED, payload: classData})
})

Socket.on(SocketActions.USER_INFO_UPDATED, userInfo => {
  console.log('user info updated', userInfo)
  Store.dispatch({type: SocketActions.USER_INFO_UPDATED, payload: userInfo})
})

Socket.on(SocketActions.ALL_CLASS_DATA, allClassData => {
  console.log('inital class data received', allClassData)
  Store.dispatch({type: SocketActions.ALL_CLASS_DATA, payload: allClassData})
})

Socket.on(SocketActions.CLASS_ACTIVATED, classData => {
  console.log('class session created')
  Store.dispatch({type: SocketActions.CLASS_ACTIVATED, payload: classData})
})

Socket.on(SocketActions.CLASS_DEACTIVATED, classData => {
  console.log('class session removed', classData)
  Store.dispatch({type: SocketActions.CLASS_DEACTIVATED, payload: classData})
})

Socket.on(SocketActions.BROADCAST_UPDATED, classData => {
  console.log('broadcast updated', classData)
  Store.dispatch({type: SocketActions.BROADCAST_UPDATED, payload: classData})
})

Socket.on(SocketActions.QUEUE_REMOVED_FROM, classData => {
  Store.dispatch({type: SocketActions.QUEUE_REMOVED_FROM, payload: classData})
})
