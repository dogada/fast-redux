const DEFAULT_STATE = {}

export function rootReducer (state, action) {
  // init Redux with empty state
  if (state === undefined) return DEFAULT_STATE
  if (action.ns && action.payload && typeof action.reducer === 'function') {
    // handle fast-redux action
    let ns = action.ns
    let nsState = ns in state ? state[ns] : action.defaultState
    let newNsState = action.reducer(nsState, ...action.payload)
    if (newNsState === nsState) return state // nothing changed
    return {...state, [ns]: newNsState}
  }
  // return unchanged state for all unknown actions
  return state
}
