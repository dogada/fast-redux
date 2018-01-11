'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _namespace = require('./namespace');

Object.defineProperty(exports, 'namespaceConfig', {
  enumerable: true,
  get: function get() {
    return _namespace.namespaceConfig;
  }
});

var _object = require('./object');

Object.defineProperty(exports, 'dynamicPropertyConfig', {
  enumerable: true,
  get: function get() {
    return _object.dynamicPropertyConfig;
  }
});
Object.defineProperty(exports, 'staticPropertyConfig', {
  enumerable: true,
  get: function get() {
    return _object.staticPropertyConfig;
  }
});

var _rootReducer = require('./rootReducer');

Object.defineProperty(exports, 'rootReducer', {
  enumerable: true,
  get: function get() {
    return _rootReducer.rootReducer;
  }
});