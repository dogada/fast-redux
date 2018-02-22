/**
 * Actions for working directly with the properties of an object stored in a
 * state. For example object 'posts' that holds various reddits states.
 * You can find example of usage in:
 * examples/async/src/stores/postsByReddit.js
 */

const makePropertyAction = (action, propertyName) => (name, reducer) => {
  return action(name,
    (state, ...args) => {
      return {
        ...state,
        [propertyName]: reducer(state[propertyName], ...args)
      }
    }
  )
}

/**
 * Return utility functions to work directly with a single property of a parent object.
 * Property name is provided on config stage and can't be changed during action call.
 * Default value for the property shoult be set in a namespaceConfig
 * @param {function} action an action that accepts the object as a state
 * @param {function} getObjectState function to obtain state of parent namespace
 * @param {string} propertyName name of object's property
 * @param {*} defaultPropertyState initial value of a property
 */
export function staticPropertyConfig (action, propertyName) {
  const getPropertyState = (state) => action.getState(state)[propertyName]
  return {
    propertyAction: makePropertyAction(action, propertyName),
    getPropertyState
  }
}

/**
 * Actions for working directly with the properties of an object stored in a
 * state. For example object 'posts' that holds various reddits states.
 * You can find example of usage in:
 * examples/async/src/actions/postsByReddit.js
 */

const makeObjectAction = (action, defaultPropertyState) => (name, reducer) => {
  return action(name,
    (state, key, ...args) => {
      let nestedState = state[key] || defaultPropertyState
      return {
        ...state,
        [key]: reducer(nestedState, ...args)
      }
    })
}

/**
 * Return utility functions to work directly with properties of a parent object.
 * Property name is provided dynamically as first argument of action.
 * @param {function} action an action that accepts the object as a state
 * @param {function} getObjectState function to obtain state of parent namespace
 * @param {*} defaultPropertyState initial value of a property
 */
export function dynamicPropertyConfig (action, defaultPropertyState) {
  const getPropertyState = (state, key) => action.getState(state)[key] || defaultPropertyState
  return {
    propertyAction: makeObjectAction(action, defaultPropertyState),
    getPropertyState
  }
}
