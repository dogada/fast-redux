'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.nestedConfig = nestedConfig;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
  Optional utils for working with nested states.
  For the example of usage please see:
  examples/async/src/actions/postsByReddit.js
*/

var nestedAction = function nestedAction(action, defaultNestedState) {
  return function (reducer, name) {
    if (typeof reducer !== 'function') throw new Error('Reducer must be a function.');
    console.log('nestedAction', action);
    return action(name || reducer.name, function () {
      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var nestedKey = arguments[1];

      var nestedState = state[nestedKey] || defaultNestedState;
      console.log('nested', name, nestedKey, args, nestedState);
      return _extends({}, state, _defineProperty({}, nestedKey, reducer.apply(undefined, [nestedState].concat(args))));
    });
  };
};

var nestedGetState = function nestedGetState(getParentState, defaultNestedState) {
  return function (state, key) {
    return getParentState(state)[key] || defaultNestedState;
  };
};

function nestedConfig(parentAction, getParentState, defaultNestedState) {
  return {
    nestedAction: nestedAction(parentAction, defaultNestedState),
    getNestedState: nestedGetState(getParentState, defaultNestedState)
  };
}