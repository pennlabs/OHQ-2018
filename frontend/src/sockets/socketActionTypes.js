//These are actions that use websockets.  They are grouped in pairs;
//actions that emit to the server have a corresponding return action.
//Note that reducers generally only need to handle the return action.

export const UPDATE_QUEUE = 'UPDATE_QUEUE'
export const QUEUE_UPDATED = 'QUEUE_UPDATED'
