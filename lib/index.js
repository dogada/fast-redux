'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.rootReducer = rootReducer;
exports.namespaceConfig = namespaceConfig;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var DEFAULT_STATE = {};

var namespaceAction = exports.namespaceAction = function namespaceAction(ns, defaultState) {
  return function (name, reducer) {
    if (!reducer) {
      // first arg name is optional
      reducer = name;
      name = reducer.name;
    }
    if (typeof reducer !== 'function') throw new Error('Reducer must be a function.');
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return {
        ns: ns,
        reducer: reducer,
        type: ns + '/' + name,
        payload: args,
        defaultState: defaultState
      };
    };
  };
};

var namespaceGetState = exports.namespaceGetState = function namespaceGetState(ns, defaultState) {
  return function (state) {
    for (var _len2 = arguments.length, keys = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      keys[_key2 - 1] = arguments[_key2];
    }

    var nsState = ns in state ? state[ns] : defaultState;
    if (keys.length === 0) return nsState;
    var res = {};
    for (var i = keys.length; --i >= 0;) {
      var key = keys[i];
      res[key] = nsState[key];
    }
    return res;
  };
};

function rootReducer(state, action) {
  // init Redux with empty state
  if (state === undefined) return DEFAULT_STATE;
  if (action.ns && action.payload && typeof action.reducer === 'function') {
    // handle fast-redux action
    var ns = action.ns;
    var nsState = ns in state ? state[ns] : action.defaultState;
    var newNsState = action.reducer.apply(action, [nsState].concat(_toConsumableArray(action.payload)));
    if (newNsState === nsState) return state; // nothing changed
    return _extends({}, state, _defineProperty({}, ns, newNsState));
  }
  // return unchanged state for all unknown actions
  return state;
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
function statePropertyAction(action, name, propertyReducer) {
  function reducer(state, id) {
    if ((typeof state === 'undefined' ? 'undefined' : _typeof(state)) !== 'object') {
      throw new Error('State of object type is required for propAction.');
    }

    for (var _len3 = arguments.length, propertyReducerArgs = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
      propertyReducerArgs[_key3 - 2] = arguments[_key3];
    }

    return _extends({}, state, _defineProperty({}, id, propertyReducer.apply(undefined, [state[id]].concat(propertyReducerArgs))));
  }
  return action(name, reducer);
}

/**
 * Return config for the fast redux namespace.
 * @param {String} ns
 * @param {*} defaultState
 */
function namespaceConfig(ns, defaultState) {
  var action = namespaceAction(ns, defaultState);
  return {
    NS: ns,
    DEFAULT_STATE: defaultState,
    action: action,
    propAction: statePropertyAction.bind(null, action),
    getState: namespaceGetState(ns, defaultState)
  };
}