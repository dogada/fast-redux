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

/**
 * Return action that accepts a property id, finds its value in state and pass
 * this value to propertyReducer. If the state isn't an object, error is thrown.
 * Then it returns new state with new property value.
 * @param {function} action Action creator from namespaceConfig
 * @param {string} name Action name
 * @param {function} propertyReducer Function that returns new value of the
 * property
 */
function statePropertyAction (action, name, propertyReducer) {
  function reducer (state, id, ...propertyReducerArgs) {
    if (typeof state !== 'object') {
      throw new Error('State of object type is required for propAction.')
    }
    return {
      ...state,
      [id]: propertyReducer(state[id], ...propertyReducerArgs)
    }
  }
  return action(name, reducer)
}

/**
 * Return config for the fast redux namespace.
 * @param {String} ns
 * @param {*} defaultState
 */
export function namespaceConfig (ns, defaultState) {
  let action = namespaceAction(ns, defaultState)
  return {
    NS: ns,
    DEFAULT_STATE: defaultState,
    action,
    propAction: statePropertyAction.bind(null, action),
    getState: namespaceGetState(ns, defaultState)
  }
}
