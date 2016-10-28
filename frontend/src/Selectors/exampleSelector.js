import { createSelector } from 'reselect'

const getState = state => state.thing

const exampleSelector = createSelector(
  getState,
  state => state
)

export default exampleSelector
