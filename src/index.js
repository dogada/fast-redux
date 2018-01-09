const DEFAULT_STATE = {}

export const namespaceAction = (ns, defaultState) => (name, reducer) => {
  if (!reducer) {
    // first arg name is optional
    reducer = name
    name = reducer.name
  }
  if (typeof reducer !== 'function') throw new Error('Reducer must be a function.')
  return (...args) => ({
    ns,
    reducer,
    type: `${ns}/${name}`,
    payload: args,
    defaultState
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

export function namespaceConfig (ns, defaultState) {
  return {
    NS: ns,
    DEFAULT_STATE: defaultState,
    action: namespaceAction(ns, defaultState),
    getState: namespaceGetState(ns, defaultState)
  }
}

const nestedActionCreator = (actionCreator, defaultNestedState) => (reducer, name) => {
  if (typeof reducer !== 'function') throw new Error('Reducer must be a function.')
  return actionCreator(
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

export function nestedConfig (parentActionCreator, getParentState, defaultNestedState) {
  return {
    nestedActionCreator: nestedActionCreator(parentActionCreator, defaultNestedState),
    getNestedState: nestedGetState(getParentState, defaultNestedState)
  }
}
