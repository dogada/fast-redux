const PREFIX = '@@edux'
const DEFAULT_STATE = {}

export const namespaceActionCreator = (ns) => (name, reducer) => {
  if (!reducer) {
    // first arg name is optional
    reducer = name
    name = reducer.name
  }
  if (typeof reducer !== 'function') throw new Error('Reducer must be a function.')
  return (...args) => ({
    ns,
    reducer,
    type: `${PREFIX}/${ns}/${name}`,
    payload: args
  })
}

export const namespaceGetState = (ns, defaultState) => (state, ...keys) => {
  let nsState = ns in state ? state[ns] : defaultState
  if (keys.length === 0) return nsState
  let res = {}
  for (let i = keys.length; --i >= 0;) {
    let key = keys[i]
    res[key] = nsState[key]
  }
  return res
}

export function rootReducer (state, action) {
  // init Redux with empty state
  if (state === undefined) return DEFAULT_STATE
  if (action.ns && action.payload && typeof action.reducer === 'function' &&
      action.type && action.type.indexOf(PREFIX) === 0) {
    // handle fast-redux action
    let ns = action.ns
    let nsState = state[ns]
    let newNsState = action.reducer(nsState, ...action.payload)
    if (newNsState === nsState) return state // nothing changed
    return {...state, [ns]: newNsState}
  }
  // return unchanged state for all unknown actions
  return state
}

export function namespaceConfig (ns, defaultState) {
  return {
    NS: ns,
    DEFAULT_STATE: defaultState,
    actionCreator: namespaceActionCreator(ns),
    getState: namespaceGetState(ns, defaultState)
  }
}
