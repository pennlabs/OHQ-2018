import { ROOT_URL } from './../constants'

import io from 'socket.io-client'

const socket = process.env.NODE_ENV === 'production' ? io() : io(ROOT_URL)

export default socket
