const DEFAULT_STATE = {}

export function rootReducer (state, action) {
  // init Redux with empty state
  if (state === undefined) return DEFAULT_STATE
  let {creator, reducer, payload} = action
  if (creator && payload && typeof reducer === 'function') {
    // handle fast-redux action
    let {ns, getState} = creator
    let nsState = getState(state)
    let newNsState = reducer(nsState, ...payload)
    if (newNsState === nsState) return state // nothing changed
    return {...state, [ns]: newNsState}
  }
  // return unchanged state for all unknown actions
  return state
}
