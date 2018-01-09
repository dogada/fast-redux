/*
  Optional utils for working with nested states.
  For the example of usage please see:
  examples/async/src/actions/postsByReddit.js#L7
*/

const nestedAction = (action, defaultNestedState) => (reducer, name) => {
  if (typeof reducer !== 'function') throw new Error('Reducer must be a function.')
  return action(
    name || reducer.name,
    (state = {}, nestedKey, ...args) => {
      let nestedState = state[nestedKey] || defaultNestedState
      return {
        ...state,
        [nestedKey]: reducer(nestedState, ...args)
      }
    })
}

const nestedGetState = (getParentState, defaultNestedState) => (state, key) => {
  return getParentState(state)[key] || defaultNestedState
}

export function nestedConfig (parentAction, getParentState, defaultNestedState) {
  return {
    nestedAction: nestedAction(parentAction, defaultNestedState),
    getNestedState: nestedGetState(getParentState, defaultNestedState)
  }
}
