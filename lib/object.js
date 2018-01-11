"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.staticPropertyConfig = staticPropertyConfig;
exports.dynamicPropertyConfig = dynamicPropertyConfig;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Actions for working directly with the properties of an object stored in a
 * state. For example object 'posts' that holds various reddits states.
 * You can find example of usage in:
 * examples/async/src/actions/postsByReddit.js
 */

var makePropertyAction = function makePropertyAction(action, propertyName) {
  return function (name, reducer) {
    return action(name, function (state) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return _extends({}, state, _defineProperty({}, propertyName, reducer.apply(undefined, [state[propertyName]].concat(args))));
    });
  };
};

/**
 * Return utility functions to work directly with a single property of a parent object.
 * Property name is provided on config stage and can't be changed during action call.
 * Default value for the property shoult be set in a namespaceConfig
 * @param {function} action an action that accepts the object as a state
 * @param {function} getObjectState function to obtain state of parent namespace
 * @param {string} propertyName name of object's property
 * @param {*} defaultPropertyState initial value of a property
 */
function staticPropertyConfig(action, propertyName) {
  var getPropertyState = function getPropertyState(state) {
    return action.getState(state)[propertyName];
  };
  return {
    propertyAction: makePropertyAction(action, propertyName),
    getPropertyState: getPropertyState
  };
}

/**
 * Actions for working directly with the properties of an object stored in a
 * state. For example object 'posts' that holds various reddits states.
 * You can find example of usage in:
 * examples/async/src/actions/postsByReddit.js
 */

var makeObjectAction = function makeObjectAction(action, defaultPropertyState) {
  return function (name, reducer) {
    return action(name, function (state, key) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      var nestedState = state[key] || defaultPropertyState;
      return _extends({}, state, _defineProperty({}, key, reducer.apply(undefined, [nestedState].concat(args))));
    });
  };
};

/**
 * Return utility functions to work directly with properties of a parent object.
 * Property name is provided dynamically as first argument of action.
 * @param {function} action an action that accepts the object as a state
 * @param {function} getObjectState function to obtain state of parent namespace
 * @param {*} defaultPropertyState initial value of a property
 */
function dynamicPropertyConfig(action, defaultPropertyState) {
  var getPropertyState = function getPropertyState(state, key) {
    return action.getState(state)[key] || defaultPropertyState;
  };
  return {
    propertyAction: makeObjectAction(action, defaultPropertyState),
    getPropertyState: getPropertyState
  };
}