// These are actions that use websockets.  They are grouped in pairs;
// actions that emit to the server have a corresponding return action.
// Note that reducers generally only need to handle the return action.

// this is used for the user to update class status.
export const UPDATE_CLASS = 'UPDATE_CLASS'
export const CLASS_UPDATED = 'CLASS_UPDATED'

// this is used for students to join the class queue
export const JOIN_CLASS_QUEUE = 'JOIN_CLASS_QUEUE'
export const CLASS_QUEUE_JOINED = 'CLASS_QUEUE_JOINED'

// this is used to update user info, and to send the initial info to the user.
export const USER_INFO_UPDATED = 'USER_INFO_UPDATED'

// this is used to send all the relevant classes when a user first connects
export const ALL_CLASS_DATA = 'ALL_CLASS_DATA'

// this is used to activate and deactivate a class.
export const ACTIVATE_CLASS = 'ACTIVATE_CLASS'
export const CLASS_ACTIVATED = 'CLASS_ACTIVATED'
export const DEACTIVATE_CLASS = 'DEACTIVATE_CLASS'
export const CLASS_DEACTIVATED = 'CLASS_DEACTIVATED'

//this is used for TAs to remove a student from the queue
export const REMOVE_FROM_QUEUE = 'REMOVE_FROM_QUEUE'
export const QUEUE_REMOVED_FROM = 'QUEUE_REMOVED_FROM'

// this is used to update a class' broadcast
export const UPDATE_BROADCAST = 'UPDATE_BROADCAST'
export const BROADCAST_UPDATED = 'BROADCAST_UPDATED'
