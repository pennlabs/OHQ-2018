//This file holds data for all classes relevant to the user in a single object.
//the key for each class is the class’ ID.

import {
  CLASS_QUEUE_UPDATED,
  ALL_CLASS_DATA
} from './../sockets/socketActionTypes'

//Classes is a an object made of class class objects,
//where each class object is identied by a key identical to its id field.
const defaultState = {
  0: {
    queue: [],
    TAs: [],
    isActive: true,
    id: 0,
    name: 'Initial State',
    locations: ['some place']
  }
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case CLASS_QUEUE_UPDATED:
      return {...state, [action.payload.id]: action.payload}
    case ALL_CLASS_DATA:
      return action.payload
    default:
      return state
  }
}
