import Socket from './initSocket.js'

import { Store } from './../index.js'
import * as SocketActions from './socketActionTypes'

Socket.on(SocketActions.CLASS_UPDATED, classData => {
  console.log('class updated', classData)
  Store.dispatch({type: SocketActions.CLASS_UPDATED, payload: classData})
})

//while the action is class queue updated, we're returning the entire class object.
Socket.on(SocketActions.CLASS_QUEUE_UPDATED, classData => {
  console.log('class queue updated', classData)
  Store.dispatch({type: SocketActions.CLASS_QUEUE_UPDATED, payload: classData})
})

Socket.on(SocketActions.SELECTED_CLASS_UPDATED, classData => {
  console.log('class updated', classData)
  Store.dispatch({type: SocketActions.SELECTED_CLASS_UPDATED, payload: classData})
})

Socket.on(SocketActions.USER_INFO_UPDATED, userInfo => {
  console.log('user info updated', userInfo)
  Store.dispatch({type: SocketActions.USER_INFO_UPDATED, payload: userInfo})
})

Socket.on(SocketActions.ALL_CLASS_DATA, allClassData => {
  console.log('inital class data received', allClassData)
  Store.dispatch({type: SocketActions.ALL_CLASS_DATA, payload: allClassData})
})
