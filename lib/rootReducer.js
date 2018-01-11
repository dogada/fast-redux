'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.rootReducer = rootReducer;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var DEFAULT_STATE = {};

function rootReducer(state, action) {
  // init Redux with empty state
  if (state === undefined) return DEFAULT_STATE;
  var creator = action.creator,
      reducer = action.reducer,
      payload = action.payload;

  if (creator && payload && typeof reducer === 'function') {
    // handle fast-redux action
    var ns = creator.ns,
        getState = creator.getState;

    var nsState = getState(state);
    var newNsState = reducer.apply(undefined, [nsState].concat(_toConsumableArray(payload)));
    if (newNsState === nsState) return state; // nothing changed
    return _extends({}, state, _defineProperty({}, ns, newNsState));
  }
  // return unchanged state for all unknown actions
  return state;
}