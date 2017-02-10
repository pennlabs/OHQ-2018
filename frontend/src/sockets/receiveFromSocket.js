import Socket from './index.js'

import { Store } from './../index.js'
import * as SocketActions from './socketActionTypes'

Socket.on(SocketActions.QUEUE_UPDATED, data => {
  Store.dispatch()
})
