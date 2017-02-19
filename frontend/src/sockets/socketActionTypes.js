//These are actions that use websockets.  They are grouped in pairs;
//actions that emit to the server have a corresponding return action.
//Note that reducers generally only need to handle the return action.

//this is used for the user to update class status.
export const UPDATE_CLASS = 'UPDATE_CLASS'
export const CLASS_UPDATED = 'CLASS_UPDATED'

//this is used to update the current class queue
export const UPDATE_CLASS_QUEUE = 'UPDATE_CLASS_QUEUE'
export const CLASS_QUEUE_UPDATED = 'CLASS_QUEUE_UPDATED'

//this is used to update user info, and to send the initial info to the user.
export const USER_INFO_UPDATED = 'USER_INFO_UPDATED'

//this is used to send all the relevant classes when a user first connects
export const ALL_CLASS_DATA = 'ALL_CLASS_DATA'
