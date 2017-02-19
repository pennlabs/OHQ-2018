import { UPDATE_SELECTED_CLASS } from './../actions/ActionTypes'

//Selected class is the class whose information will be given to the ClassPage react component.
//It is just the information for a single class

const defaultState = {
  queue: [],
  TAs: [],
  isActive: true,
  id: 0,
  name: 'classFoo'
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case UPDATE_SELECTED_CLASS:
      return action.payload
    default:
      return state
  }
}
