import Socket from './initSocket.js'

import { Store } from './../index.js'
import * as SocketActions from './socketActionTypes'

Socket.on('QUEUE_UPDATED', data => {
  console.log('frontend received!')
  console.log(data)
  Store.dispatch({type: SocketActions.QUEUE_UPDATED, payload: data})
})
