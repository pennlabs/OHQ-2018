import Socket from './initSocket.js'

import { Store } from './../index.js'
import * as SocketActions from './socketActionTypes'

Socket.on(SocketActions.QUEUE_UPDATED, data => {
  Store.dispatch({type: SocketActions.QUEUE_UPDATED, payload: data})
})
