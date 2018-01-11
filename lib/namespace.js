'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.namespaceConfig = namespaceConfig;
function namespaceAction(ns, defaultState) {
  function creator(name, reducer) {
    if (typeof reducer !== 'function') throw new Error('Reducer must be a function.');
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return {
        type: ns + '/' + name,
        payload: args,
        creator: creator,
        reducer: reducer
      };
    };
  }
  creator.ns = ns;
  creator.defaultState = defaultState;
  creator.getState = function (state) {
    return ns in state ? state[ns] : defaultState;
  };
  return creator;
}

var getNamespaceState = function getNamespaceState(ns, defaultState) {
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

/**
 * Return config for the fast redux namespace.
 * @param {String} ns
 * @param {*} defaultState
 */
function namespaceConfig(ns, defaultState) {
  return {
    action: namespaceAction(ns, defaultState),
    getState: getNamespaceState(ns, defaultState)
  };
}