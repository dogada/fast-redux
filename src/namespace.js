const namespaceAction = (ns, defaultState) => (name, reducer) => {
  if (typeof reducer !== 'function') throw new Error('Reducer must be a function.')
  return (...args) => ({
    ns,
    reducer,
    type: `${ns}/${name}`,
    payload: args,
    defaultState
  })
}

const getNamespaceState = (ns, defaultState) => (state, ...keys) => {
  let nsState = ns in state ? state[ns] : defaultState
  if (keys.length === 0) return nsState
  let res = {}
  for (let i = keys.length; --i >= 0;) {
    let key = keys[i]
    res[key] = nsState[key]
  }
  return res
}

/**
 * Return config for the fast redux namespace.
 * @param {String} ns
 * @param {*} defaultState
 */
export function namespaceConfig (ns, defaultState) {
  return {
    action: namespaceAction(ns, defaultState),
    getState: getNamespaceState(ns, defaultState)
  }
}
