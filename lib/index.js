'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.rootReducer = rootReducer;
exports.namespaceConfig = namespaceConfig;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var PREFIX = '@@fast-redux';
var DEFAULT_STATE = {};

var namespaceActionCreator = exports.namespaceActionCreator = function namespaceActionCreator(ns, defaultState) {
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
        type: PREFIX + '/' + ns + '/' + name,
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
  if (action.ns && action.payload && typeof action.reducer === 'function' && action.type && action.type.indexOf(PREFIX) === 0) {
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

function namespaceConfig(ns, defaultState) {
  return {
    NS: ns,
    DEFAULT_STATE: defaultState,
    actionCreator: namespaceActionCreator(ns, defaultState),
    getState: namespaceGetState(ns, defaultState)
  };
}