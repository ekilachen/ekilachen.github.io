/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../lib/access.js":
/*!************************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/access.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = access;

function access(path, otherwise, obj, obtain, value) {
  if (typeof path === 'function') {
    obj = path(obj);
    return obj === undefined ? otherwise : obj;
  }

  if (!obj || typeof obj !== 'object') return otherwise;
  if (typeof path === 'string') path = path.split('.');
  var name,
      child,
      last = path.length - 1;
  if (last < 0) return obj;

  for (var i = 0; i < last; i++) {
    name = path[i];
    child = obj[name];

    if (child === undefined) {
      if (!obtain) return otherwise;
      obj = obj[name] = {};
    } else if (child && typeof child === 'object') {
      obj = child;
    } else {
      return otherwise;
    }
  }

  name = path[last];
  child = obj[name];

  if (obtain && value !== undefined) {
    obj[name] = value;
  }

  return child === undefined ? otherwise : child;
}

access.get = function (obj, path, otherwise) {
  return access(path, otherwise, obj);
};

access.obtain = function (obj, path, otherwise) {
  return access(path, otherwise, obj, true);
};

access.set = function (obj, path, value) {
  return access(path, undefined, obj, true, value);
};

access.map = function (arr, path, otherwise) {
  if (typeof path === 'string') path = path.split('.');
  return arr.map(function (item) {
    return access(path, otherwise, item);
  });
};

access.find = function (arr, path, val) {
  if (!arr || !path) return;
  if (typeof path === 'string') path = path.split('.');

  for (var i = 0, n = arr.length; i < n; i++) {
    var obj = arr[i];
    if (access(path, undefined, obj) === val) return obj;
  }
};

/***/ }),

/***/ "../../lib/app-mixin.js":
/*!***************************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/app-mixin.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  joinTree: function (tree) {
    this.tree = tree;
    tree.join(this);
  },

  emit(event, src) {
    let fn;

    if (src && src.NAME) {
      let name = src.NAME.replace(/[-\/\.]/g, '_');
      fn = this[`on_${event}_${name}`];
    }

    fn = fn || this[`on_${event}`];

    if (typeof fn === 'function') {
      return fn.apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof (fn = this.onEvent) === 'function') {
      return fn.apply(this, arguments);
    }
  },

  on_fusing: function (plug, apps, spec) {
    if (!apps[0]) return;
    var need = spec.need.replace(/[-\/\.]/g, '_');
    var fn = this['need_' + need];
    if (typeof fn === 'function') fn.call(this, apps[0], spec, plug);
  },
  on_token: function (plug, token, spec) {
    var accept = spec.accept.replace(/[-\/\.]/g, '_');
    var fn = this['accept_' + accept];
    if (typeof fn === 'function') fn.call(this, token, spec, plug);
  }
};

/***/ }),

/***/ "../../lib/array-like.js":
/*!****************************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/array-like.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toString = Object.prototype.toString;

module.exports = function arrayLike(obj) {
  return Array.isArray(obj) || !!obj && typeof obj === 'object' && toString.call(obj) === '[object Arguments]';
};

/***/ }),

/***/ "../../lib/assert.js":
/*!************************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/assert.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function assert(b) {
  if (b) return;
  if (arguments.length === 1) throw Error('ERROR');
  throw Error([].slice.call(arguments, 1).join(' '));
};

/***/ }),

/***/ "../../lib/assign.js":
/*!************************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/assign.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(/*! ./is-object */ "../../lib/is-object.js");

var pick = __webpack_require__(/*! ./pick */ "../../lib/pick.js");

function isIn(arr) {
  return function (key) {
    return arr.indexOf(key) >= 0;
  };
}

function hasKey(keys) {
  return function (key) {
    return keys[key];
  };
}

function same(k) {
  return function (key) {
    return k === key;
  };
}

function assign(obj, data, fields, excepts) {
  if (!obj || !data) return obj;
  if (typeof obj !== 'object' || !isObject(data)) return obj;
  if (!fields && !excepts) return Object.assign(obj, data);
  var keys = Array.isArray(fields) ? fields : Object.keys(data);
  var len = keys.length;
  if (len === 0) return obj;
  var fn = !excepts ? false : typeof excepts === 'string' ? same(excepts) : typeof excepts === 'function' ? excepts : Array.isArray(excepts) ? isIn(excepts) : hasKey(excepts);

  for (var i = 0; i < len; i++) {
    var key = keys[i];

    if (!fn || !fn(key)) {
      var val = data[key];
      if (val !== undefined) obj[key] = val;
    }
  }

  return obj;
}

module.exports = assign;

/***/ }),

/***/ "../../lib/assure.js":
/*!************************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/assure.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLike = __webpack_require__(/*! ./array-like */ "../../lib/array-like.js");

module.exports = function assure(obj, from, names) {
  var i = arrayLike(names) ? 0 : 2;
  var args = i === 0 ? names : arguments;

  for (var n = args.length; i < n; i++) {
    var name = args[i];
    var val = from[name];
    if (val == null) throw Error('missing ' + name);
    obj[name] = val;
  }

  return obj;
};

/***/ }),

/***/ "../../lib/clone.js":
/*!***********************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/clone.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const arrayLike = __webpack_require__(/*! ./array-like */ "../../lib/array-like.js");

function clone(obj, fn, depth) {
  depth = depth >= 0 ? depth : 10;
  if (depth === 0) return;
  if (fn) obj = fn(obj);
  if (typeof obj === 'function') return;
  if (!obj || typeof obj !== 'object') return obj;

  if (arrayLike(obj)) {
    return Array.prototype.map.call(obj, function (item) {
      return clone(item, fn, depth - 1);
    });
  }

  let ret = {};
  Object.keys(obj).forEach(function (key) {
    ret[key] = clone(obj[key], fn, depth - 1);
  });
  return ret;
}

module.exports = clone;

/***/ }),

/***/ "../../lib/define.js":
/*!************************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/define.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function define(obj, prop, target, mthd, args) {
  if (typeof target === 'string') {
    args = mthd;
    mthd = target;
    target = obj;
  }

  args = args || [];
  var fn = target[mthd];
  var ret;
  Object.defineProperty(obj, prop, {
    get: function () {
      return ret === undefined ? ret = fn.apply(target, args) : ret;
    }
  });
  return obj;
}

define.forward = function delegate(obj, fields, target, renames) {
  fields.forEach(function (field) {
    var name = renames && renames[field] || field;
    Object.defineProperty(obj, field, {
      get: function () {
        return target[name];
      }
    });
  });
  return obj;
};

module.exports = define;

/***/ }),

/***/ "../../lib/each.js":
/*!**********************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/each.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var arrayLike = __webpack_require__(/*! ./array-like */ "../../lib/array-like.js");

module.exports = function each(obj, fn, me) {
  if (!obj || typeof obj !== 'object') return;

  if (arrayLike(obj)) {
    for (var i = 0, n = obj.length; i < n; i++) {
      fn.call(me, obj[i], i);
    }
  } else {
    Object.keys(obj).forEach(function (key) {
      fn.call(me, obj[key], key);
    });
  }
};

/***/ }),

/***/ "../../lib/emitter.js":
/*!*************************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/emitter.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/component/emitter 
// Copyright (c) 2014 Component contributors <dev@component.io>

/**
 * Expose `Emitter`.
 */
if (true) {
  module.exports = Emitter;
}
/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */


function Emitter(obj) {
  if (obj) return mixin(obj);
}

;
/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }

  return obj;
}
/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */


Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);
  return this;
};
/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */


Emitter.prototype.once = function (event, fn) {
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};
/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */


Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
  this._callbacks = this._callbacks || {}; // all

  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  } // specific event


  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this; // remove all handlers

  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  } // remove specific handler


  var cb;

  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];

    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  } // Remove event specific arrays for event types that no
  // one is subscribed for to avoid memory leak.


  if (callbacks.length === 0) {
    delete this._callbacks['$' + event];
  }

  return this;
};
/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */


Emitter.prototype.emit = function (event) {
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1),
      callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);

    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};
/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */


Emitter.prototype.listeners = function (event) {
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};
/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */


Emitter.prototype.hasListeners = function (event) {
  return !!this.listeners(event).length;
};

/***/ }),

/***/ "../../lib/ensure.js":
/*!************************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/ensure.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLike = __webpack_require__(/*! ./array-like */ "../../lib/array-like.js");

module.exports = function ensure(obj, names) {
  var i = arrayLike(names) ? 0 : 1;
  var args = i === 0 ? names : arguments;

  for (var n = args.length; i < n; i++) {
    var name = args[i];
    if (obj[name] == null) throw Error('missing ' + name);
  }

  return obj;
};

/***/ }),

/***/ "../../lib/env.js":
/*!*********************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/env.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ensure = __webpack_require__(/*! ./ensure */ "../../lib/ensure.js");

var arrayLike = __webpack_require__(/*! ./array-like */ "../../lib/array-like.js");

var slice = Array.prototype.slice;

function _init(parent, base, args, i) {
  var env = Object.create(Env);
  env.parent = parent;
  env.root = parent ? parent.root : env;
  env.values = parent ? Object.create(parent.values) : base ? Object.create(base.values) : {};
  if (base) env.base = base;

  if (args) {
    for (var n = args.length; i < n; i++) {
      env.set(args[i]);
    }
  }

  return env;
}

function _pick(obj, names, i, to) {
  //, to2) {
  for (var n = names.length; i < n; i++) {
    var name = names[i];
    var val = obj[name];

    if (val !== undefined) {
      to[name] = val; //if (to2) to2[name] = val;
    }
  }

  return to;
}

var Env = {
  push: function (opts, names) {
    var env = _init(this);

    if (typeof opts === 'string') {
      env.set(opts, names);
    } else if (arguments.length < 2) {
      if (opts) env.set(opts);
    } else {
      var i = arrayLike(names) ? 0 : 1;
      var args = i === 0 ? names : arguments;

      _pick(opts, args, i, env.values);
    }

    return env;
  },
  pop: function () {
    return this.parent;
  },
  set: function (key, val) {
    var values = this.values;

    if (typeof key === 'string') {
      if (val !== undefined) values[key] = val;
    } else if (key) {
      Object.keys(key).forEach(function (name) {
        val = key[name];
        if (val !== undefined) values[name] = val;
      });
    }

    return this;
  },
  get: function (name) {
    return this.values[name];
  },
  pick: function (names) {
    var args = arrayLike(names) ? names : arguments;
    return _pick(this.values, args, 0, {});
  },
  ensure: function (names) {
    var args = arrayLike(names) ? names : arguments;
    return ensure.call(null, this.values, args);
  },
  pushEnv: function (env, names) {
    var args = arrayLike(names) ? names : slice.call(arguments, 1);
    return this.push(env.values, args);
  } //frame: function() {
  //  return _init(null, this, arguments, 0);
  //},

};

module.exports = function (base) {
  return _init(null, base, arguments, 1);
};

/***/ }),

/***/ "../../lib/error-map.js":
/*!***************************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/error-map.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (ret) {
  if (!ret || !ret.error && !ret.errors) return null;
  if (ret.error) return {
    error: [ret.error]
  };
  var errors = ret.errors;
  var map = {};

  if (Array.isArray(errors)) {
    errors.forEach(function (err) {
      var name = err && (err.property || err.path || err.name);
      var msg = err.message || err.error;

      if (name) {
        if (err.property) msg = name + ' ' + msg;

        _push(map, name, msg);
      }
    });
  } else {
    Object.keys(errors).forEach(function (key) {
      var err = errors[key];
      if (Array.isArray(err)) map[key] = err;else _push(map, key, err);
    });
  }

  return map;
};

function _push(map, name, msg) {
  if (name && msg) {
    var arr = map[name] || (map[name] = []);
    arr.push(msg);
  }
}

/***/ }),

/***/ "../../lib/find-index.js":
/*!****************************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/find-index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function findIndex(arr, key, val) {
  for (var i = 0, n = arr.length; i < n; i++) {
    var obj = arr[i];
    if (obj && obj[key] === val) return i;
  }

  return -1;
}

module.exports = findIndex;

/***/ }),

/***/ "../../lib/for-own.js":
/*!*************************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/for-own.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function forOwn(obj, fn, me) {
  if (!obj) return;
  if (Array.isArray(obj)) return obj.forEach(fn, me);

  if (typeof obj === 'object') {
    Object.keys(obj).forEach(key => fn(obj[key], key, me));
  }
};

/***/ }),

/***/ "../../lib/includes-all.js":
/*!******************************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/includes-all.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function includesAll(arr, vals) {
  if (!arr) return false;
  if (!Array.isArray(vals)) return arr.indexOf(vals) >= 0;
  var len = vals.length;
  if (len === 0) return true;
  if (len === 1) return arr.indexOf(vals[0]) >= 0;
  return vals.every(function (val) {
    return arr.indexOf(val) >= 0;
  });
};

/***/ }),

/***/ "../../lib/index.js":
/*!***********************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  klass: __webpack_require__(/*! ./klass */ "../../lib/klass.js"),
  assert: __webpack_require__(/*! ./assert */ "../../lib/assert.js"),
  ensure: __webpack_require__(/*! ./ensure */ "../../lib/ensure.js"),
  assure: __webpack_require__(/*! ./assure */ "../../lib/assure.js"),
  access: __webpack_require__(/*! ./access */ "../../lib/access.js"),
  match: __webpack_require__(/*! ./match */ "../../lib/match.js"),
  define: __webpack_require__(/*! ./define */ "../../lib/define.js"),
  clone: __webpack_require__(/*! ./clone */ "../../lib/clone.js"),
  forOwn: __webpack_require__(/*! ./for-own */ "../../lib/for-own.js"),
  preorder: __webpack_require__(/*! ./preorder */ "../../lib/preorder.js"),
  toMap: __webpack_require__(/*! ./to-map */ "../../lib/to-map.js"),
  errorMap: __webpack_require__(/*! ./error-map */ "../../lib/error-map.js"),
  arrayLike: __webpack_require__(/*! ./array-like */ "../../lib/array-like.js"),
  includesAll: __webpack_require__(/*! ./includes-all */ "../../lib/includes-all.js"),
  assign: __webpack_require__(/*! ./assign */ "../../lib/assign.js"),
  pick: __webpack_require__(/*! ./pick */ "../../lib/pick.js"),
  omit: __webpack_require__(/*! ./omit */ "../../lib/omit.js"),
  map: __webpack_require__(/*! ./map */ "../../lib/map.js"),
  each: __webpack_require__(/*! ./each */ "../../lib/each.js"),
  utils: __webpack_require__(/*! ./utils */ "../../lib/utils.js"),
  isObject: __webpack_require__(/*! ./is-object */ "../../lib/is-object.js"),
  NamedList: __webpack_require__(/*! ./named-list */ "../../lib/named-list.js"),
  findIndex: __webpack_require__(/*! ./find-index */ "../../lib/find-index.js"),
  Tree: __webpack_require__(/*! ./tree */ "../../lib/tree.js"),
  Env: __webpack_require__(/*! ./env */ "../../lib/env.js"),
  Plug: __webpack_require__(/*! ./plug */ "../../lib/plug.js"),
  Emitter: __webpack_require__(/*! ./emitter */ "../../lib/emitter.js"),
  SimpleApp: __webpack_require__(/*! ./simple-app */ "../../lib/simple-app.js"),
  AppMixin: __webpack_require__(/*! ./app-mixin */ "../../lib/app-mixin.js"),
  Xbarc: __webpack_require__(/*! ./xbarc */ "../../lib/xbarc.js"),
};


/***/ }),

/***/ "../../lib/index.js-exposed":
/*!*******************************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/index.js-exposed ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["minstatic"] = __webpack_require__(/*! -!./index.js */ "../../lib/index.js");
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../lib/is-object.js":
/*!***************************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/is-object.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
};

/***/ }),

/***/ "../../lib/klass.js":
/*!***********************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/klass.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  var klass = {
    subclass: subclass,
    asclass: asclass,
    subobject: subobject
  };
  Array.prototype.forEach.call(arguments, function (arg) {
    if (typeof arg === 'function') {
      if (!klass.init) {
        // just override init, subclass, instance, ...
        klass = Object.assign(Object.create(arg.prototype), klass);

        klass.init = function () {
          return new (Function.prototype.bind.apply(arg, arguments))();
        };
      } else {
        // no effect if arg is ES6 class
        Object.assign(klass, arg.prototype);
      }
    } else {
      Object.assign(klass, arg);
    }
  });
  klass.instance = instance.bind(klass);
  Object.defineProperty(klass, 'klass', {
    value: klass,
    writable: false
  });
  return klass;
};

function asclass() {
  if (arguments.length > 0) {
    // shorthand of subclass(...).asclass()
    return subclass.apply(this, arguments).asclass();
  }

  if (!this.__class) {
    // this is klass
    this.__class = function () {
      if (this.init) this.init.apply(this, arguments);
    }.bind(this);

    this.__class.prototype = this;
  }

  return this.__class;
}

function subclass() {
  var derived = Object.create(this); // this is klass, so is derived

  for (var i = 0, n = arguments.length; i < n; i++) {
    Object.assign(derived, arguments[i]);
  }

  derived.instance = instance.bind(derived);
  Object.defineProperty(derived, 'klass', {
    value: derived,
    writable: false
  });
  return derived;
}

function instance() {
  var obj = Object.create(this); // this is klass

  return this.init && this.init.apply(obj, arguments) || obj;
}

function subobject() {
  // inherit instance
  var obj = Object.create(this); // this is instance

  for (var i = 0, n = arguments.length; i < n; i++) {
    Object.assign(obj, arguments[i]);
  }

  return obj;
}

/***/ }),

/***/ "../../lib/map.js":
/*!*********************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/map.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var arrayLike = __webpack_require__(/*! ./array-like */ "../../lib/array-like.js");

var access = __webpack_require__(/*! ./access */ "../../lib/access.js");

function nonNull(obj) {
  return obj != null;
}

module.exports = function map(obj, fn, me, filter) {
  if (typeof fn === 'string' || arrayLike(fn)) {
    fn = access.bind(null, fn, undefined);
  }

  if (filter && typeof filter !== 'function') filter = nonNull;
  var ret, val, i, n;

  if (arrayLike(obj)) {
    ret = [];

    for (i = 0, n = obj.length; i < n; i++) {
      val = fn.call(me, obj[i], i, obj);
      if (!filter || filter(val, i, obj)) ret.push(val);
    }
  } else {
    ret = {};
    var keys = Object.keys(obj);

    for (i = 0, n = keys.length; i < n; i++) {
      var key = keys[i];
      val = fn.call(me, obj[key], key, obj);
      if (!filter || filter(val, key, obj)) ret[key] = val;
    }
  }

  return ret;
};

/***/ }),

/***/ "../../lib/match.js":
/*!***********************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/match.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function match(obj) {
  if (!obj || typeof obj !== 'object') return false;

  for (var i = 1, argn = arguments.length; i < argn; i++) {
    var pat = arguments[i];
    var keys = Object.keys(pat);

    for (var j = 0, n = keys.length; j < n; j++) {
      var key = keys[j];
      var val = pat[key];
      if (val !== undefined && obj[key] !== val) return false;
    }
  }

  return true;
}

match.matcher = matcher;

function matcher() {
  var args = arguments;
  return function (obj) {
    return match.bind(null, obj).apply(null, args);
  };
}

match.filter = function (arr, opts) {
  return !arr ? [] : arr.filter(typeof opts === 'function' ? opts : matcher(opts));
};

module.exports = match;

/***/ }),

/***/ "../../lib/named-list.js":
/*!****************************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/named-list.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign = __webpack_require__(/*! ./assign */ "../../lib/assign.js");

var map = __webpack_require__(/*! ./map */ "../../lib/map.js");

var matcher = __webpack_require__(/*! ./match */ "../../lib/match.js").matcher;

var findIndex = __webpack_require__(/*! ./find-index */ "../../lib/find-index.js");

var arrayLike = __webpack_require__(/*! ./array-like */ "../../lib/array-like.js"); // array of objects with null or unique-key field and filtering utilities


var NamedList = {
  //INCR_ATTR: function incrAttr(key, old, item) {},
  instance: function (opts, keyName) {
    return Object.create(NamedList).init(opts, keyName);
  },
  init: function (opts, keyName) {
    if (typeof opts === 'string') {
      opts = {
        key: opts
      };
    } else if (Array.isArray(opts)) {
      opts = {
        items: opts,
        key: keyName
      };
    } else {
      opts = opts || {};
    }

    this.allowNullKey = !!opts.nullKey; // default false

    this.keyName = opts.key || 'name';
    this.factory = opts.factory;
    this.items = [];
    this.itemMap = {};
    this.reset(opts.items);
    return this;
  },
  reset: function (items) {
    this.items.length = 0;
    this.itemMap = {};

    if (Array.isArray(items)) {
      for (var i = 0; i < items.length; i++) {
        this.add(items[i]);
      }
    }
  },
  get: function (key) {
    if (key != null) return this.itemMap[key];
  },
  obtain: function (key, promote) {
    if (key == null) return;
    var item = this.itemMap[key];

    if (item) {
      if (promote && this.items[0] !== item) {
        var idx = this.items.indexOf(item);
        this.items.splice(idx, 1);
        this.items.unshift(item);
      }
    } else {
      item = this.factory ? this.factory() : {};
      item[this.keyName] = key;
      this.itemMap[key] = item;

      if (promote) {
        this.items.unshift(item);
      } else {
        this.items.push(item);
      }
    }

    return item;
  },
  getAt: function (idx) {
    return this.items[idx];
  },
  update: function (key, data, fields) {
    return assign(this.get(key), data, fields, this.keyName);
  },
  updateAt: function (idx, data, fields) {
    return assign(this.items[idx], data, fields, this.keyName);
  },
  add: function (item, replace) {
    if (!item) return this;
    var key = item[this.keyName];

    if (key != null) {
      if (this.itemMap[key]) {
        if (!replace) throw Error('item ' + key + ' exists');
        var idx = findIndex(this.items, this.keyName, key);
        this.items[idx] = item;
      } else {
        this.items.push(item);
      }

      this.itemMap[key] = item;
    } else if (this.allowNullKey) {
      this.items.push(item);
    }

    return this;
  },
  set: function (item, idx) {
    this.add(item, true);
    if (arguments.length > 1) this.move(item, idx);
    return this;
  },
  setAll: function (items, fn) {
    // falsy fn - overwrite
    var me = this,
        isFn = typeof fn === 'function';
    items.forEach(function (it) {
      var key = it[me.keyName];

      if (key) {
        var old = me.get(key);

        if (isFn) {
          var obj = fn(key, old, it);
          if (obj) me.set(obj);
        } else if (!fn) {
          me.add(it, true);
        }
      }
    });
  },
  remove: function (item) {
    var key = typeof item === 'string' ? item : item && item[this.keyName];

    if (key != null) {
      if (this.itemMap[key]) {
        var idx = findIndex(this.items, this.keyName, key);
        this.items.splice(idx, 1);
        delete this.itemMap[key];
      }
    } else if (item && this.allowNullKey) {
      for (var i = this.items.length; i >= 0; i--) {
        if (this.items[i] === item) this.items.splice(i, 1);
      }
    }

    return this;
  },
  removeAll: function (keys) {
    var map = this.itemMap,
        keyName = this.keyName;
    keys.forEach(function (key) {
      delete map[key];
    });
    this.items = this.items.filter(function (it) {
      return !(keyName in it) || map[it[keyName]];
    });
    return this;
  },
  pop: function () {
    var last = this.items.pop();

    if (last && this.keyName in last) {
      delete this.itemMap[last[this.keyName]];
    }

    return last;
  },
  truncate: function (limit) {
    var len = this.items.length;
    if (len <= limit) return;
    var map = this.itemMap,
        keyName = this.keyName;
    this.items.forEach(function (it) {
      if (keyName in it) delete map[it[keyName]];
    });
    this.items.length = limit;
    return this;
  },
  retainAll: function (keys) {
    var map = this.itemMap;
    var delKeys = keys.filter(function (key) {
      return !map[key];
    });
    this.removeAll(delKeys);
    return this;
  },
  rename: function (oldKey, newKey) {
    if (typeof oldKey !== 'string' || typeof newKey !== 'string') return false;
    var old = this.get(oldKey);
    if (!old) return false;
    if (oldKey === newKey) return true;
    if (this.itemMap[newKey]) return false;
    old[this.keyName] = newKey;
    delete this.itemMap[oldKey];
    this.itemMap[newKey] = old;
    return true;
  },
  size: function () {
    return this.items.length;
  },
  isEmpty: function () {
    return this.items.length === 0;
  },
  indexOf: function (item) {
    return item ? this.items.indexOf(item) : -1;
  },
  has: function (item) {
    return typeof item === 'string' ? item in this.itemMap : this.indexOf(item) >= 0;
  },
  move: function (item, idx) {
    idx = Math.floor(idx);
    if (!isFinite(idx)) return -1;
    var items = this.items,
        len = items.length;
    if (len === 0) return -1;
    if (typeof item === 'string') item = this.itemMap[item];
    if (!item) return -1;
    var old = this.indexOf(item);
    if (old < 0) return -1;
    if (idx < 0) idx = len + idx;
    idx = idx < 0 ? 0 : idx >= len ? len - 1 : idx;
    if (old === idx) return idx;
    var tmp = items[idx];
    items[idx] = item;
    items[old] = tmp;
    return idx;
  },
  keys: function () {
    return Object.keys(this.itemMap);
  },
  each: function (fn, me) {
    this.items.forEach(fn, me);
  },
  map: function (fn, me, filter) {
    return map(this.items, fn, me, filter);
  },
  filter: function (opts, me) {
    if (!opts) return this.items;
    var fn = typeof opts === 'function' ? opts : matcher(opts);
    return this.items.filter(fn, me === undefined ? this : me);
  },
  first: function (opts, me) {
    if (!opts) return this.items[0];
    var fn = typeof opts === 'function' ? opts : matcher(opts);
    return this.items.find(fn, me === undefined ? this : me);
  },
  exclude: function (items) {
    if (items.length === 0) return this.items.concat();
    var its = this.items,
        kn = this.keyName;
    return typeof items[0] === 'string' ? its.filter(function (key) {
      return items.indexOf(key) < 0;
    }) : its.filter(function (it) {
      return findIndex(items, kn, it[kn]) < 0;
    });
  },
  interset: function (items, inverse) {
    var me = this,
        kn = this.keyName;
    return items.filter(function (it) {
      var key = typeof it === 'string' ? it : it[kn];
      return me.get(key) ? !inverse : inverse;
    });
  },
  union: function (items) {
    return this.items.concat(this.interset(items, true));
  },
  obtainAttr: function (name, attr, factory) {
    var ret,
        item = factory ? this.obtain(name) : this.get(name);

    if (item) {
      if (attr in item) {
        ret = item[attr];
      } else if (factory) {
        ret = item[attr] = factory() || {};
      }
    }

    return ret;
  },
  listAttr: function (name, attr, opts) {
    return this.obtainAttr(name, attr, NamedList.instance.bind(null, opts));
  },
  listAttrGet: function (name, attr, key) {
    var item = this.get(name);
    return item && item[attr] && item[attr].get(key);
  },
  setAttr: function (name, attr) {
    return this.obtainAttr(name, attr, newSet);
  },
  mapAttr: function (name, attr) {
    return this.obtainAttr(name, attr, newMap);
  },
  arrayAttr: function (name, attr) {
    return this.obtainAttr(name, attr, newArray);
  },
  arrayAttrMerge: function (name, attr, objs) {
    var arr = this.arrayAttr(name, attr);

    if (arrayLike(objs)) {
      for (var i = 0, n = objs.length; i < n; i++) {
        if (arr.indexOf(objs[i]) < 0) arr.push(objs[i]);
      }
    } else if (objs !== undefined) {
      if (arr.indexOf(objs) < 0) arr.push(objs);
    }

    return arr;
  }
};

function newSet() {
  return new Set();
}

function newMap() {
  return new Map();
}

function newArray() {
  return [];
}

module.exports = NamedList;

/***/ }),

/***/ "../../lib/omit.js":
/*!**********************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/omit.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign = __webpack_require__(/*! ./assign */ "../../lib/assign.js");

module.exports = function omit(obj, omits) {
  return assign({}, obj, null, omits);
};

/***/ }),

/***/ "../../lib/pick.js":
/*!**********************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/pick.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var arrayLike = __webpack_require__(/*! ./array-like */ "../../lib/array-like.js");

function pick(obj, names) {
  var picked = {};
  if (!obj || typeof obj !== 'object') return picked;
  var i = arrayLike(names) ? 0 : 1;
  var args = i === 0 ? names : arguments;

  for (var len = args.length; i < len; i++) {
    var val,
        name = args[i];

    if (typeof name === 'string') {
      val = obj[name];
    } else {
      val = undefined;
      Object.keys(name).forEach(function (key) {
        if (key in obj) {
          val = val || {};
          val[key] = pick(obj[key], name[key]);
        }
      });
    }

    if (val !== undefined) picked[name] = val;
  }

  return picked;
}

module.exports = pick;

/***/ }),

/***/ "../../lib/plug.js":
/*!**********************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/plug.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var klass = __webpack_require__(/*! ./klass */ "../../lib/klass.js");

var assign = __webpack_require__(/*! ./assign */ "../../lib/assign.js");

var pick = __webpack_require__(/*! ./pick */ "../../lib/pick.js");

var slice = Array.prototype.slice;
var Plug = klass({
  init: function (app, opts) {
    var spec = app.SPEC ? Object.assign({}, app.SPEC) : {};
    if (opts) Object.assign(spec, opts);
    this.app = app;
    this.name = spec.name || app.name || null;
    this.role = spec.role || app.role || null;
    this.appType = spec.type || app.type || null;
    this.forType = spec.for || null;
    this.localDecls = spec.local || [];
    this.xbarDecls = spec.xbar || [];
    this.needs = {};
  },
  info: function () {
    var info = assign({}, this, null, ['tree', 'app']);
    var app = this.app;
    info.app = typeof app.info === 'function' ? app.info() : pick(app, 'name', 'role', 'SPEC');
    return info;
  },
  setTree: function (tree) {
    this.tree = tree;
    this.emitApp('join', this, tree);
  },
  _invokeApp: function (kind, event) {
    var app = this.app;
    var fn = app[kind ? kind + '_' + event : event];

    if (typeof fn === 'function') {
      return fn.apply(app, slice.call(arguments, 2));
    }
  },
  emitApp: function () {
    return this._invokeApp.apply(this, ['on'].concat(slice.call(arguments)));
  },
  askApp: function () {
    return this._invokeApp.apply(this, ['ask'].concat(slice.call(arguments)));
  },
  callApp: function () {
    return this._invokeApp.apply(this, [null].concat(slice.call(arguments)));
  },
  xemitApp: function () {
    return this._invokeApp.apply(this, ['xon'].concat(slice.call(arguments)));
  },
  xaskApp: function () {
    return this._invokeApp.apply(this, ['xask'].concat(slice.call(arguments)));
  },

  /*emitApp: function(event) {
    var app = this.app;
    //TODO may skip this to avoid accidents
    if (typeof app.emit === 'function') {
      return app.emit.apply(app, arguments);
    }
     var fn = app['on_' + event];
    if (typeof fn === 'function') {
      return fn.apply(app, slice.call(arguments, 1));
    }
  },
   askApp: function(event) {
    var app = this.app;
    var fn = app['ask_' + event];
    if (typeof fn === 'function') {
      return fn.apply(app, slice.call(arguments, 1));
    }
  },
   callApp: function(mthd) {
    var fn = typeof mthd === 'string' ? this.app[mthd] : mthd;
    if (typeof fn === 'function') {
      return fn.apply(this.app, slice.call(arguments, 1));
    }
  },
  */
  fusing0: function () {
    var me = this;
    me.localDecls.forEach(function (spec) {
      var plugs = me.tree.closestPlugs(spec, me.appType);

      if (plugs) {
        var apps = plugs.map(function (p) {
          return p.app;
        }); // maybe empty (for update later)

        me.emitApp('fusing', me, apps, spec);
      }
    });
  },
  fusing: function () {
    var me = this;
    me.localDecls.forEach(function (spec) {
      if (spec.name) {
        var plugs = me.tree.closestPlugs(spec, me.appType);

        if (plugs && plugs[0]) {
          var app = me.needs[spec.name] = plugs[0].app;
          var need = spec.need.replace(/[-\/\.]/g, '_');
          me.callApp('fusing_' + need, me, app, spec);
        }
      } else {
        var plugs = me.tree.closestPlugs(spec, me.appType);

        if (plugs) {
          var apps = plugs.map(function (p) {
            return p.app;
          }); // maybe empty (for update later)

          me.emitApp('fusing', me, apps, spec);
        }
      }
    });
  },
  unplugging: function () {
    this.emitApp('unplugging', this);
  },
  unplugged: function (ancester) {
    this.emitApp('unplugged', this);
  },
  fused: function () {
    this.emitApp('fused', this);
  },
  defusing: function () {
    this.emitApp('defusing', this);
  },
  detaching: function (ancester) {
    this.emitApp('detaching', this, ancester);
  },
  detached: function (ancester) {
    this.emitApp('detached', this, ancester);
  },
  hasRole: function (role) {
    return !!this.role && (typeof role === 'string' ? this.role === role : role.indexOf(this.role) >= 0);
  },
  // TODO: gone

  /*onToken: function (token) {
    var me = this
    me.xbarDecls.forEach(function (spec) {
      if (spec.accept === token.type) {
        me.emitApp('token', me, token, spec);
      }
    });
  },
  */
  // from local context
  onPlug: function (offerPlug) {
    var me = this;
    me.localDecls.forEach(function (spec) {
      if (offerPlug.appType === spec.need) {
        if (!offerPlug.forType || offerPlug.forType === me.appType) {
          me.emitApp('plug', me, offerPlug, spec);
        }
      }
    });
  }
});
module.exports = Plug;

/***/ }),

/***/ "../../lib/preorder.js":
/*!**************************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/preorder.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const forOwn = __webpack_require__(/*! ./for-own */ "../../lib/for-own.js");

function preorder(obj, fn, depth, key, host) {
  fn(obj, key, host);

  if (depth > 0) {
    forOwn(obj, (val, key) => preorder(val, fn, depth - 1, key, obj));
  }
}

module.exports = function (obj, fn, depth) {
  depth = depth >= 0 ? depth : 10;
  preorder(obj, fn, depth);
};

/***/ }),

/***/ "../../lib/simple-app.js":
/*!****************************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/simple-app.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var klass = __webpack_require__(/*! ./klass */ "../../lib/klass.js");

var AppMixin = __webpack_require__(/*! ./app-mixin */ "../../lib/app-mixin.js");

module.exports = klass(AppMixin, {
  init: function (tree) {
    tree && this.joinTree(tree);

    this._init.apply(this, arguments);
  },
  _init: function () {}
});

/***/ }),

/***/ "../../lib/to-map.js":
/*!************************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/to-map.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function toMap(arr, prop) {
  var map = {};
  if (!arr) return map;
  var isFun = typeof prop === 'function';

  for (var i = 0, n = arr.length; i < n; i++) {
    var item = arr[i],
        key = null;

    if (isFun) {
      // skip null and undefined item
      if (item != null) key = prop(item);
    } else if (typeof item === 'string') {
      key = item;
      item = prop === undefined ? null : prop;
    } else {
      if (item && typeof item === 'object') key = item[prop];
    }

    if (key !== null) map[key] = item;
  }

  return map;
};

/***/ }),

/***/ "../../lib/tree.js":
/*!**********************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/tree.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var klass = __webpack_require__(/*! ./klass */ "../../lib/klass.js");

var assert = __webpack_require__(/*! ./assert */ "../../lib/assert.js");

var NamedList = __webpack_require__(/*! ./named-list */ "../../lib/named-list.js");

var Plug = __webpack_require__(/*! ./plug */ "../../lib/plug.js");

var Env = __webpack_require__(/*! ./env */ "../../lib/env.js");

var DEBUG = true;
var Tree = klass({
  values: null,
  locals: null,
  root: null,
  Namespace: function (name) {
    if (name in this) throw Error(name + ' exists');
    var derived = this.subclass();
    Object.defineProperty(derived, name, {
      get: function () {
        return this.namespace(name);
      }
    });
    return derived;
  },
  init: function (parent, name, opts) {
    assert(!parent || parent.root, 'parent missing root');
    assert(!parent || name, 'missing name');
    this.parent = parent || null;
    this.root = parent ? parent.root : this;
    this.name = name || '';
    this.path = parent ? parent.path.concat([name]) : [];
    this.values = parent ? Object.create(parent.values) : {};
    this.locals = opts ? Object.assign({}, opts) : {};
    if (opts) Object.assign(this.values, this.locals);
    this._ns = {};
    this._trees = NamedList.instance({
      key: 'name',
      nullKey: false
    });
    this._plugs = NamedList.instance({
      key: 'name',
      nullKey: true
    });
    this._fused = false;
  },
  namespace: function (name) {
    return this._ns[name] || (this._ns[name] = !this.parent ? {} : Object.create(this.parent.namespace(name)));
  },
  isRoot: function () {
    return this.root === this;
  },
  isDetached: function () {
    return !this.parent && this.root !== this;
  },
  isFused: function () {
    return this._fused;
  },
  children: function () {
    return this._trees.items;
  },
  child: function (name) {
    return this._trees.get(name);
  },
  childAt: function (idx) {
    return this._trees.getAt(idx);
  },
  addChild: function (name, opts) {
    assert(name && !this.child(name), 'child exists');
    var child = this.klass.instance(this, name, opts);

    this._trees.add(child);

    return child;
  },
  removeChild: function (name) {
    var old = this.child(name);

    if (old) {
      old.callPlugPreOrder('detaching', [this]);
      old.parent = null;

      this._trees.remove(old);

      old.callPlugPreOrder('detached', [this]);
    }

    return old;
  },
  replaceChild: function (name, opts) {
    assert(name, 'missing name');
    var child = this.klass.instance(this, name, opts);
    var old = this.child(name);

    if (old) {
      old.callPlugPreOrder('detaching', [this]);
      old.parent = null;

      this._trees.add(child, true);

      old.callPlugPreOrder('detached', [this]);
    } else {
      this._trees.add(child);
    }

    return child;
  },
  set: function (opts) {
    if (opts) {
      Object.assign(this.locals, opts);
      Object.assign(this.values, opts);
    }

    return this;
  },
  get: function (name) {
    return this.locals[name];
  },
  lookup: function (name) {
    return this.values[name];
  },
  // tree is essential for uvw app building
  isDev: function () {
    return this.values.NODE_ENV !== 'production';
  },
  join: function (app, spec) {
    return this.plugIn(Plug.instance(app, spec));
  },
  unplug: function (name) {
    //TODO: unnamed
    var plug = this.plug(name);

    if (plug) {
      plug.unplugging();

      this._plugs.remove(name);

      plug.unplugged();
    }
  },
  plugIn: function (plug) {
    if (this._plugs.has(plug)) return plug;
    plug.setTree(this);

    this._plugs.add(plug);

    if (this._fused) this._insertPlug(plug);
    return plug;
  },
  plugs: function (role) {
    var plugs = this._plugs.items;
    if (plugs.length === 0 || !role) return plugs;
    var fn = typeof role === 'function' ? role : function (p) {
      return p.hasRole(role);
    };
    return plugs.filter(fn);
  },
  plug: function (name) {
    return this._plugs.get(name);
  },
  plugApp: function (name) {
    let plug = this._plugs.get(name);

    return plug && plug.app;
  },
  collectPlugs: function (role, arr) {
    return collectPlugs(this, role, arr || []);
  },
  collectPlugMap: function (role, map, skip) {
    return collectPlugMap(this, role, map || {}, skip || false);
  },
  closestPlugs: function (spec, appType) {
    var plugs = this._plugs.filter(function (p) {
      return p.forType !== 'none' && p.appType === spec.need;
    });

    if (plugs.length && appType) {
      var specifics = plugs.filter(function (p) {
        return p.forType === appType;
      });
      plugs = specifics.length ? specifics : plugs.filter(function (p) {
        return !p.forType;
      });
    }

    return plugs.length ? plugs : this.parent && this.parent.closestPlugs(spec, appType);
  },
  fuse: function () {
    if (!this._fused) {
      // all plugs in place, start fulfilling needs
      this.callPlugPreOrder('fusing', []);
      this._fused = true;
      this.callPlugPreOrder('fused', []); // synchronous, each plug expects others fused

      var es = this._fusedEvents;

      if (es) {
        this._fusedEvents = null;
        es.forEach(function (arr) {
          this.emitPreOrder(arr[0], arr[1], arr[2]);
        }.bind(this));
      }
    }

    return this;
  },
  defuse: function () {
    if (this._fused) {
      this.callPlugPreOrder('defusing', []);
      this._fused = false;
    }

    return this;
  },
  //TODO: gone
  //pushToken: function(token) {
  //  this.root.callPlugPreOrder('onToken', [token]);
  //},
  _insertPlug: function (newPlug) {
    newPlug.fusing(); // note that newPlug see tree._fused true

    newPlug.fused(); //this.callPlugPreOrder('onPlug', [newPlug]);
  },
  env: function (opts) {
    return Env(this, opts);
  },
  callPlugPreOrder: function (func, args, role) {
    try {
      callPlugPreOrder(this, func, args, role);
    } catch (ex) {
      if (DEBUG) console.error(ex);
      throw ex;
    }
  },
  emitAfterFused: function (event, args, role) {
    if (this._fused) {
      this.emitPreOrder(event, args, role);
    } else {
      var es = this._fusedEvents || (this._fusedEvents = []);
      es.push([event, args, role]);
    }
  },
  emitPreOrder: function (event, args, role, xemit) {
    args = args ? [event].concat(args) : [event];
    this.callPlugPreOrder(xemit ? 'xemitApp' : 'emitApp', args, role);
  },
  xemitPreOrder: function (event, args, role) {
    return this.emitPreOrder(event, args, role, true);
  },
  callAppPreOrder: function (mthd, args, role) {
    args = args ? [mthd].concat(args) : [mthd];
    this.callPlugPreOrder('callApp', args, role);
  },
  askPreOrder: function (event, args, role, xask) {
    try {
      args = args ? [event].concat(args) : [event];
      return askPlugPreOrder(this, xask ? 'xaskApp' : 'askApp', args, role);
    } catch (ex) {
      if (DEBUG) console.error(ex);
      throw ex;
    }
  },
  xaskPreOrder: function (event, args, role) {
    return this.askPreOrder(event, args, role, true);
  },
  // NOTE: collect non-null results in array rets if rets is given
  //  - bypass plug, plug.app may not hav func
  callPreOrder: function (func, args, role, rets, noSkip) {
    try {
      callPreOrder(this, func, args, role, rets, noSkip);
      return rets;
    } catch (ex) {
      if (DEBUG) console.error(ex);
      throw ex;
    }
  },
  callPreOrderWaiting: function (func, args, role, noSkip) {
    try {
      var rets = [];
      callPreOrder(this, func, args, role, rets, noSkip);
      return Promise.all(rets);
    } catch (ex) {
      if (DEBUG) console.error(ex);
      throw ex;
    }
  },
  callEach: function (func, args, role, rets, noSkip) {
    try {
      callEach(this, func, args, role, rets, noSkip);
    } catch (ex) {
      if (DEBUG) console.error(ex);
      throw ex;
    }
  },
  callChildren: function (func, args, role, rets, noSkip) {
    this.children().forEach(function (ch) {
      callEach(ch, func, args, role, rets, noSkip);
    });
  }
}); // plug must have mthd (the plug contract)

function callPlugPreOrder(tree, mthd, args, role) {
  tree.plugs(role).forEach(function (plug) {
    plug[mthd].apply(plug, args);
  });
  tree.children().forEach(function (child) {
    callPlugPreOrder(child, mthd, args, role);
  });
} // plug must have mthd


function askPlugPreOrder(tree, mthd, args, role, rets) {
  rets = rets || [];
  var plugs = tree.plugs(role);
  var ret, i, n;

  for (i = 0, n = plugs.length; i < n; i++) {
    ret = plugs[i][mthd].apply(plugs[i], args);
    if (ret != null) rets.push(ret);
  }

  var children = tree.children();

  for (i = 0, n = children.length; i < n; i++) {
    askPlugPreOrder(children[i], mthd, args, role, rets);
    if (ret != null) rets.push(ret);
  }

  return rets;
}

function callEach(tree, func, args, role, rets, noSkip) {
  args = args || [];
  tree.plugs(role).forEach(function (plug) {
    var fn = typeof func === 'string' ? plug.app[func] : func;
    if (!noSkip && typeof fn !== 'function') return;
    var ret = fn.apply(plug.app, args);
    if (rets && ret != null) rets.push(ret);
  });
}

function callPreOrder(tree, func, args, role, rets, noSkip) {
  args = args || [];
  callEach(tree, func, args, role, rets, noSkip);
  tree.children().forEach(function (ch) {
    callPreOrder(ch, func, args, role, rets, noSkip);
  });
}

function collectPlugs(tree, role, arr) {
  tree.plugs(role).forEach(function (plug) {
    arr.push(plug);
  });
  tree.children().forEach(function (ch) {
    collectPlugs(ch, role, arr);
  });
  return arr;
}

function collectPlugMap(tree, role, map, skip) {
  tree.plugs(role).forEach(function (plug) {
    if (!skip && map[plug.name]) throw Error('plug ' + plug.name + ' exists');
    map[plug.name] = plug;
  });
  tree.children().forEach(function (ch) {
    collectPlugMap(ch, role, map, skip);
  });
  return map;
}

module.exports = Tree;

/***/ }),

/***/ "../../lib/ui/asset-loader.js":
/*!*********************************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/ui/asset-loader.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* global document, window */

function loadAsset(asset, varName, checkHeader) {
  if (varName && typeof window[varName] !== 'undefined') {
    return Promise.resolve(window[varName]);
  }

  if (typeof asset === 'string') {
    if (/\.css$/.test(asset)) {
      asset = {
        src: asset,
        type: 'css'
      };
    } else {
      asset = {
        src: asset
      };
    }
  }

  var isCss = asset.type === 'css';

  if (checkHeader && asset.src) {
    var tname = isCss ? 'link' : 'script';
    var attr = isCss ? 'href' : 'src';
    var head = document.getElementsByTagName('head')[0];
    var elems = head.getElementsByTagName(tname);

    for (var i = 0; i < elems.length; i++) {
      if (elems[i].getAttribute(attr) === asset.src) {
        return Promise.resolve(!isCss && varName ? window[varName] : undefined);
      }
    }
  }

  var tag;

  if (isCss) {
    tag = document.createElement('link');
    tag.setAttribute('rel', 'stylesheet');
    tag.setAttribute('href', asset.src);
  } else {
    tag = document.createElement('script');
    tag.setAttribute('type', 'text/javascript');
    tag.setAttribute('src', asset.src);
  }

  return new Promise(function (resolve) {
    tag.async = true;

    tag.onreadystatechange = tag.onload = function () {
      var state = tag.readyState;

      if (!state || /loaded|complete/.test(state)) {
        resolve(varName ? window[varName] : undefined);
      }
    };

    document.getElementsByTagName('head')[0].appendChild(tag);
  });
}

function loadAssets(assets, varName, checkHeader) {
  if (varName && typeof window[varName] !== 'undefined') {
    return Promise.resolve(window[varName]);
  }

  function loadIt(previous, assets, i) {
    return previous.then(function () {
      return loadAsset(assets[i], null, checkHeader);
    });
  }

  var previous = Promise.resolve();

  for (var i = 0; i < assets.length; i++) {
    previous = loadIt(previous, assets, i);
  }

  return !varName ? previous : previous.then(function () {
    return window[varName];
  });
}

exports.loadAsset = loadAsset;
exports.loadAssets = loadAssets;

/***/ }),

/***/ "../../lib/ui/cards.js":
/*!**************************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/ui/cards.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const dom = __webpack_require__(/*! ./dom */ "../../lib/ui/dom.js");

const Comp = __webpack_require__(/*! ./comp */ "../../lib/ui/comp.js");

module.exports = Comp.subclass({
  _init0({
    extra,
    outer,
    targetSel
  }) {
    this._cards = [];
    this._target = this._findTarget(targetSel);
    this._outer = outer || {
      origH: this._target.offsetHeight
    };
    this._extra = extra || {};
  },

  _card(obj) {
    return this._cards.find(c => c.cardId === obj || c.elem === obj || c.inst === obj);
  },

  _findTarget(targetSel) {
    return !targetSel ? this.elem : typeof targetSel === 'string' ? dom.first(targetSel) : targetSel;
  },

  hasCard(cardId) {
    return !!this._card(cardId);
  },

  showCard: function (cardId, cardCls, params, opts) {
    opts = opts || {};
    opts.show = true;
    return this.obtainCard(cardId, cardCls, params, opts);
  },
  obtainCard: function (cardId, cardCls, params, opts) {
    opts = opts || {};
    if (!cardId) return;

    var card = this._card(cardId);

    if (!card && !cardCls) return;
    var target = this._target;
    var isBody = target === document.body;
    var show = !!opts.show;
    var before = !!opts.before;
    var after = !!opts.after;

    if (show && !isBody && (before || after)) {
      target.classList.remove('show');
    }

    if (card) {
      if (show) card.elem.classList.add('show');
    } else {
      var elem = document.createElement('div');
      elem.classList.add('collapse');
      if (show) elem.classList.add('show');

      if (isBody) {
        target.appendChild(elem);
      } else if (after) {
        target.parentNode.insertAfter(elem, target);
      } else {
        target.parentNode.insertBefore(elem, target);
      }

      let {
        _extra,
        _outer
      } = this;

      this._cards.push(card = { ..._extra,
        cardId,
        elem,
        target,
        params,
        outer: _outer
      });

      card.inst = (cardCls.instance || cardCls)({ ...card,
        cntx: this
      });
    }

    return card;
  },
  hideCard: function (obj) {
    var isBody = this._target === document.body;

    if (obj) {
      let card = this._card(obj);

      if (card) {
        card.elem.classList.remove('show');
        if (!isBody) this._target.classList.add('show');
      }
    } else {
      this._cards.forEach(card => card.elem.classList.remove('show'));

      if (!isBody) this._target.classList.add('show');
    }
  },

  on_cancel(src) {
    this.hideCard(src);
  }

});

/***/ }),

/***/ "../../lib/ui/comp.js":
/*!*************************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/ui/comp.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const klass = __webpack_require__(/*! ../klass */ "../../lib/klass.js");

const AppMixin = __webpack_require__(/*! ../app-mixin */ "../../lib/app-mixin.js");

const dom = __webpack_require__(/*! ./dom */ "../../lib/ui/dom.js");

const Comp = klass(AppMixin, {
  init({
    cntx,
    elem
  }) {
    this.cntx = cntx;
    this.elem = elem;

    this._init0.apply(this, arguments);

    this._init.apply(this, arguments);
  },

  _init0() {},

  _init() {},

  find(sel, fn) {
    return dom.find(this.elem, sel, fn);
  },

  first(sel, fn) {
    return dom.first(this.elem, sel, fn);
  },

  attr(sel, name) {
    return dom.attr(this.elem, sel, name);
  },

  val(sel, newVal) {
    return dom.val(this.elem, sel, newVal);
  },

  html(sel) {
    return dom.html(this.elem, sel);
  },

  _applyBindings(events = ['click', 'submit']) {
    if (this._bounded) return; // called once

    this._bounded = true;
    Comp.ApplyBindings(this, this.elem, events);
  },

  _joinPage: function (root, pageInfo) {
    root.set({
      pageInfo
    });
    var ptree = root.replaceChild('page');
    this.tree = ptree;
    ptree.join(this);
    ptree.fuse();
    root.emitPreOrder('page_replaced', [pageInfo, this]);
  },

  cntxEmit(evt) {
    let emit = this.cntx && this.cntx.emit;
    if (typeof emit === 'function') emit.apply(this.cntx, arguments);
  },

  cancel() {
    this.cntxEmit('cancel', this);
  },

  ApplyBindings(vm, elem, events) {
    events.forEach(event => {
      dom.delegate(event, elem, `[data-${event}]`, evt => {
        let mthd = dom.closestData(evt, event);
        mthd && vm[mthd] && vm[mthd].call(vm, evt);
      });
    });
  },

  //TOGO
  koShowCardBefore: function (ko, comp, params, target, id) {
    this.koShowCard(ko, comp, params, target, id, true);
  },
  koShowCardAfter: function (ko, comp, params, target, id) {
    this.koShowCard(ko, comp, params, target, id, true, true);
  },
  koShowCard: function (ko, comp, params, target, cardId, noHide, after) {
    if (typeof target === 'string') {
      if (!cardId) cardId = target;
      target = this.first(target);
    }

    if (!comp || !target || !cardId) return;
    var $target = target.jquery ? target : $(target);
    if (!$target[0]) return;

    if (!noHide) {
      if (this.hideClass) $target.addClass(this.hideClass);else $target.hide();
    }

    var cards = this._cards || (this._cards = {});
    var card = cards[cardId];

    if (card) {
      card.$comp.show();
    } else {
      params = params ? ' params="' + params + '"' : '';
      var $comp = $('<' + comp + params + '></' + comp + '>');
      $comp.data('card-id', cardId);
      card = cards[cardId] = {
        id: cardId,
        type: comp,
        $comp: $comp,
        hiding: noHide ? null : target
      };
      ko.applyBindings(this, $comp[0]);

      if (after) {
        $comp.insertAfter($target[0]);
      } else {
        $comp.insertBefore($target[0]);
      }
    }

    return cardId;
  },
  koHideCard: function (cardId) {
    if (typeof cardId !== 'string') {
      cardId = cardId.elem && $(cardId.elem).data('card-id');
    }

    if (!cardId) return;
    var card = this._cards && this._cards[cardId];

    if (card) {
      card.$comp.hide();

      if (card.hiding) {
        if (this.hideClass) $(card.hiding).removeClass(this.hideClass);else $(card.hiding).show();
      }
    }
  },
  on_cancel: function (src) {
    this.koHideCard(src);
  }
});
module.exports = Comp;

/***/ }),

/***/ "../../lib/ui/dom.js":
/*!************************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/ui/dom.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* global document, window, eval */

var each = __webpack_require__(/*! ../each */ "../../lib/each.js");

var isArray = Array.isArray;
var slice = Array.prototype.slice;
var filter = Array.prototype.filter;
var _turbolinks = null;

function isFn(x) {
  return typeof x === 'function';
}

var dom = {
  ready: function (x) {
    if (document.readyState === 'complete' || document.readyState !== 'loading') {
      return Promise.resolve(x);
    }

    return new Promise(function (resolve) {
      document.addEventListener('DOMContentLoaded', function () {
        resolve(x);
      });
    });
  },
  filter: function (x, fn, me) {
    return x ? filter.call(x, fn, me) : [];
  },
  each: each,
  closest: function (elev, selector) {
    var elem = elev.target || elev; // elev can be event

    if (isFn(elem.closest)) return elem.closest(selector);
    var matchesSelector = elem.matches || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector;

    while (elem) {
      if (matchesSelector.call(elem, selector)) {
        return elem;
      } else {
        elem = elem.parentElement;
      }
    }

    return null;
  },
  // REF: http://ryanmorr.com/abstract-away-the-performance-faults-of-queryselectorall/
  find: function (elem, selector, fn) {
    var selFn = isFn(selector);

    if (!selector || selFn) {
      fn = selFn ? selector : fn;
      selector = elem;
      elem = document;
    }

    if (typeof elem === 'string') {
      elem = dom.find(elem)[0];
    }

    if (!elem) return [];
    var ret;

    if (!selector) {
      ret = [elem];
    } else if (typeof selector !== 'string') {
      ret = [selector];
    } else if (/^(#?[\w-]+|\.[\w-.]+)$/.test(selector)) {
      var ch = selector.charAt(0);

      if (ch === '#') {
        var found = document.getElementById(selector.substr(1));
        ret = found ? [found] : [];
      } else if (ch === '.') {
        var classes = selector.substr(1).replace(/\./g, ' ');
        ret = slice.call(elem.getElementsByClassName(classes));
      } else {
        ret = slice.call(elem.getElementsByTagName(selector));
      }
    } else {
      ret = slice.call(elem.querySelectorAll(selector));
    }

    if (ret.length && isFn(fn)) ret.forEach(fn);
    return ret;
  },
  first: function (elem, selector, fn) {
    var selFn = isFn(selector);
    var ret = dom.find(elem, selFn ? null : selector)[0];
    if (ret && isFn(fn = selFn ? selector : fn)) fn(ret);
    return ret;
  },
  attr: function (elem, selector, name) {
    var len = arguments.length;
    var el = len < 3 ? dom.first(elem) : dom.first(elem, selector);

    if (el) {
      name = len < 3 ? selector : name;
      if (name && el.hasAttribute(name)) return el.getAttribute(name) || '';
    }
  },

  /*attr: function(elem, selector, name) {
    var el = dom.first(elem, selector);
    if (el && name && el.hasAttribute(name)) return el.getAttribute(name) || '';
  }, */
  html: function (elem, selector) {
    var el = dom.first(elem, selector);
    return el && el.innerHTML || undefined;
  },
  val: function (elem, selector, newVal) {
    var el = dom.first(elem, selector);

    if (el && 'value' in el) {
      var ret = el.value;
      if (typeof newVal === 'string') el.value = newVal;
      return ret || '';
    }
  },
  traverseForm: function (form, fn, all) {
    if (typeof form !== 'object' || form.nodeName !== 'FORM') return;
    each(form.elements, function (field) {
      var b = false,
          selected;

      if (field.name) {
        if (all) {
          b = isArray(all) ? all.indexOf(field.nodeName.toLowerCase()) >= 0 : true;
        } else if (!field.disabled && field.type !== 'file' && field.type !== 'reset' && field.type !== 'submit' && field.type !== 'button') {
          if (field.type === 'select-multiple') {
            b = true;
            selected = filter.call(field.options, function (option) {
              return option.selected;
            }).map(function (option) {
              return option.value;
            });
          } else if (field.type !== 'checkbox' && field.type !== 'radio' || field.checked) {
            b = true;
          }
        }
      }

      if (b) fn(field.name, selected || field.value, field);
    });
  },
  formData: function (form) {
    var s = [];
    dom.traverseForm(form, function (name, value) {
      name = encodeURIComponent(name);

      if (isArray(value)) {
        value.forEach(function (val) {
          s[s.length] = name + "=" + encodeURIComponent(val);
        });
      } else {
        s[s.length] = name + "=" + encodeURIComponent(value);
      }
    });
    return s.join('&').replace(/%20/g, '+');
  },
  formJson: function (form) {
    var ret = {};

    if (arguments.length > 1) {
      var args = isArray(arguments[1]) ? arguments[1] : slice.call(arguments, 1);
      args.forEach(function (arg) {
        var el = form.elements[arg];
        if (el) ret[arg] = el.value;
      });
    } else {
      dom.traverseForm(form, function (name, value) {
        ret[name] = value;
      });
    }

    return ret;
  },
  elem: function (elemId) {
    return document.getElementById(elemId);
  },
  on: function (evt, elem, selector, fn, opts) {
    if (!elem) return;
    var elems;

    if (isFn(selector)) {
      opts = fn;
      fn = selector;
      elems = dom.find(elem);
    } else {
      elems = dom.find(elem, selector);
    }

    opts = opts || {};
    var fn2 = opts.noPrevent ? fn : function (e) {
      e.preventDefault();
      opts.stopProp && e.stopPropagation();
      return fn(e);
    };
    elems.forEach(function (el) {
      el.addEventListener(evt, fn2.bind(el), false);
    });
    return dom;
  },
  delegate: function (evt, elem, selector, fn) {
    elem = dom.first(elem);
    elem.addEventListener(evt, function (e) {
      for (var target = e.target; target && target !== this; target = target.parentNode) {
        if (target.matches(selector)) {
          e.preventDefault(); //e.stopPropagation();

          if (fn.call(target, e) === false) {
            e.stopPropagation();
          }
        }
      }
    }, false);
    return dom;
  },
  data: function (elev, name) {
    var elem = elev && elev.target || elev;
    return name && elem && elem.dataset[name] || undefined;
  },
  closestData: function (elev, name) {
    if (elev && name) {
      var elem = dom.closest(elev, '[data-' + name + ']');
      return dom.data(elem, name);
    }
  },
  setTurbolinks: function (turbolinks) {
    _turbolinks = turbolinks;
  },
  visit: function (url, opts) {
    if (_turbolinks) {
      if (url && typeof url === 'object') {
        opts = url;
        url = null;
      }

      if (url && typeof url === 'string') {
        _turbolinks.visit(url, opts);
      } else {
        url = window.location.pathname;

        _turbolinks.visit(url, opts || {
          replace: true
        });
      }
    } else if (typeof url === 'string') {
      window.location = url;
    } else {
      window.location.reload();
    }
  },
  replaceWithTurbolinks: function (html) {
    if (_turbolinks && html) {
      var s = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)[1];
      document.body.innerHTML = s;

      _turbolinks.dispatch('turbolinks:load');

      var arr = document.body.getElementsByTagName('script');

      for (var i = 0; i < arr.length; i++) {
        eval(arr[i].innerHTML);
      }
    }
  }
};
module.exports = dom;

/***/ }),

/***/ "../../lib/ui/event-source.js":
/*!*********************************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/ui/event-source.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (url) {
  return new (window.EventSource || _EventSource)(url);
}; // https://github.com/remy/polyfills/blob/master/EventSource.js
// - MIT license https://rem.mit-license.org/


var RECONNECT = false;
var reTrim = /^(\s|\u00A0)+|(\s|\u00A0)+$/g;

var _EventSource = function (url) {
  var eventsource = this,
      xhrTimeout = 6000000,
      activityTimeout = 24000,
      interval = 5000,
      // polling interval
  lastEventId = null,
      cache = '';

  if (!url || typeof url != 'string') {
    throw new SyntaxError('Not enough arguments');
  }

  this.URL = url;
  this.readyState = this.CONNECTING;
  this._pollTimer = null;
  this._xhr = null;

  function pollAgain(intv) {
    eventsource._pollTimer = setTimeout(function () {
      poll.call();
    }, intv);
  }

  function poll() {
    try {
      // force hiding of the error message... insane?
      if (eventsource.readyState == eventsource.CLOSED) return; // NOTE: IE7 and upwards support

      var xhr = new XMLHttpRequest();
      xhr.open('GET', eventsource.URL, true);
      xhr.setRequestHeader('Accept', 'text/event-stream');
      xhr.setRequestHeader('Cache-Control', 'no-cache'); // we must make use of this on the server side if we're working with Android - because they don't trigger 
      // readychange until the server connection is closed

      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      if (lastEventId != null) xhr.setRequestHeader('Last-Event-ID', lastEventId);
      cache = '';
      var tick = 1;
      xhr.timeout = xhrTimeout;

      xhr.onreadystatechange = function () {
        if (this.readyState == 3 || this.readyState == 4 && this.status == 200) {
          // on success
          if (eventsource.readyState == eventsource.CONNECTING) {
            eventsource.readyState = eventsource.OPEN;
            eventsource.dispatchEvent('open', {
              type: 'open'
            });
          }

          var responseText = '';

          try {
            responseText = this.responseText || '';
          } catch (e) {} // process this.responseText


          var parts = responseText.substr(cache.length).split("\n"),
              eventType = 'message',
              data = [],
              i = 0,
              line = '';
          cache = responseText; // TODO handle 'event' (for buffer name), retry

          for (; i < parts.length; i++) {
            line = parts[i].replace(reTrim, '');

            if (line.indexOf('event') == 0) {
              eventType = line.replace(/event:?\s*/, '');
            } else if (line.indexOf('retry') == 0) {
              var retry = parseInt(line.replace(/retry:?\s*/, ''));

              if (!isNaN(retry)) {
                interval = retry;
              }
            } else if (line.indexOf('data') == 0) {
              data.push(line.replace(/data:?\s*/, ''));
            } else if (line.indexOf('id:') == 0) {
              lastEventId = line.replace(/id:?\s*/, '');
            } else if (line.indexOf('id') == 0) {
              // this resets the id
              lastEventId = null;
            } else if (line == '') {
              if (data.length) {
                var event = new MessageEvent(data.join('\n'), eventsource.url, lastEventId);
                eventsource.dispatchEvent(eventType, event);
                data = [];
                eventType = 'message';
              }
            }
          }

          if (this.readyState == 4) pollAgain(interval); // don't need to poll again, because we're long-loading
          else {
              tick++;
            }
        } else if (eventsource.readyState !== eventsource.CLOSED) {
          if (this.readyState == 4) {
            // and some other status
            if (RECONNECT) {
              // dispatch error
              eventsource.readyState = eventsource.CONNECTING;
              eventsource.dispatchEvent('error', {
                type: 'error'
              });
              pollAgain(interval);
            } else {
              eventsource.readyState = eventsource.CLOSED;
              eventsource.dispatchEvent('error', {
                type: 'error'
              });
            }
          } else if (this.readyState == 0) {
            // likely aborted
            pollAgain(interval);
          } else {}
        }
      };

      xhr.send();
      setTimeout(checkActivity, activityTimeout);

      function checkActivity() {
        if (xhr.readyState === 3) {
          // still loading
          if (tick > 0) {
            tick = 0;
            setTimeout(checkActivity, activityTimeout);
          } else {
            xhr.abort();
          }
        }
      }

      eventsource._xhr = xhr;
    } catch (e) {
      // in an attempt to silence the errors
      eventsource.dispatchEvent('error', {
        type: 'error',
        data: e.message
      }); // ???
    }
  }

  ;
  poll(); // init now
};

_EventSource.prototype = {
  close: function () {
    // closes the connection - disabling the polling
    this.readyState = this.CLOSED;
    clearTimeout(this._pollTimer);

    this._xhr.abort();
  },
  CONNECTING: 0,
  OPEN: 1,
  CLOSED: 2,
  dispatchEvent: function (type, event) {
    var handlers = this['_' + type + 'Handlers'];

    if (handlers) {
      for (var i = 0; i < handlers.length; i++) {
        handlers[i].call(this, event);
      }
    }

    if (this['on' + type]) {
      this['on' + type].call(this, event);
    }
  },
  addEventListener: function (type, handler) {
    if (!this['_' + type + 'Handlers']) {
      this['_' + type + 'Handlers'] = [];
    }

    this['_' + type + 'Handlers'].push(handler);
  },
  removeEventListener: function (type, handler) {
    var handlers = this['_' + type + 'Handlers'];

    if (!handlers) {
      return;
    }

    for (var i = handlers.length - 1; i >= 0; --i) {
      if (handlers[i] === handler) {
        handlers.splice(i, 1);
        break;
      }
    }
  },
  onerror: null,
  onmessage: null,
  onopen: null,
  readyState: 0,
  URL: ''
};

var MessageEvent = function (data, origin, lastEventId) {
  this.data = data;
  this.origin = origin;
  this.lastEventId = lastEventId || '';
};

MessageEvent.prototype = {
  data: null,
  type: 'message',
  lastEventId: '',
  origin: ''
};

/***/ }),

/***/ "../../lib/ui/index.js":
/*!**************************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/ui/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ui = Object.assign({
  assetLoader: __webpack_require__(/*! ./asset-loader */ "../../lib/ui/asset-loader.js"),
  eventSource: __webpack_require__(/*! ./event-source */ "../../lib/ui/event-source.js"),
  Comp: __webpack_require__(/*! ./comp */ "../../lib/ui/comp.js"),
  Cards: __webpack_require__(/*! ./cards */ "../../lib/ui/cards.js"),
  rd: function () {
    var n = arguments.length,
        fn = arguments[n - 1];
    ui.rdall([].slice.call(arguments, 0, n - 1)).then(function (args) {
      fn.apply(null, args);
    });
  }
}, __webpack_require__(/*! ./loadjs */ "../../lib/ui/loadjs.js"), __webpack_require__(/*! ./dom */ "../../lib/ui/dom.js"));
module.exports = ui;

/***/ }),

/***/ "../../lib/ui/loadjs.js":
/*!***************************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/ui/loadjs.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* global document, window */

var ready = __webpack_require__(/*! ./dom */ "../../lib/ui/dom.js").ready;

var assetLoader = __webpack_require__(/*! ./asset-loader */ "../../lib/ui/asset-loader.js");

var slice = Array.prototype.slice;
var bind = Function.prototype.bind;
var isArray = Array.isArray;
var _mods = {};
var _modules = {};
var _waits = {};
var loadjs = {
  modules: _modules,
  module: function (modName) {
    var mod = _mods[modName];
    return mod && mod.loaded ? mod.result : undefined;
  },
  rdall: function () {
    var args = isArray(arguments[0]) ? arguments[0] : slice.call(arguments);
    return ready().then(function () {
      return Promise.all(args.map(function (arg) {
        return typeof arg === 'string' ? loadjs.load(arg) : arg;
      }));
    });
  },
  rdload: function () {
    return ready(arguments).then(function (args) {
      return loadjs.load.apply(null, args);
    });
  },
  prdload: function () {
    return ready(arguments).then(function (args) {
      var arg0 = args[0];
      var rest = slice.call(args, 1);
      var name = rest[0];
      var q = !arg0 || typeof name === 'string' && name in _modules ? Promise.resolve() : assetLoader.loadAssets(isArray(arg0) ? arg0 : [arg0], null, true);
      return q.then(function () {
        return loadjs.load.apply(null, rest);
      });
    });
  },
  load: function (modName, mthd) {
    if (isArray(modName)) {
      //TODO: maybe remove this
      return Promise.all(modName.map(loadjs.load)).then(function (vals) {
        if (typeof mthd === 'function') mthd.apply(null, vals);
        return vals;
      });
    }

    var mod = _mods[modName],
        ret;

    if (!mod) {
      ret = new Promise(function (resolve) {
        var waits = _waits[modName] || (_waits[modName] = []);
        waits.push({
          resolve: resolve
        });
      });
    } else if (mod.loaded) {
      ret = Promise.resolve(mod.result);
    } else if (mod.varName && mod.varName in window) {
      mod.result = window[mod.varName];
      mod.loaded = true;
      _modules[mod.name] = mod.result;
      ret = Promise.resolve(mod.result);
    } else {
      ret = assetLoader.loadAssets(mod.assets, mod.varName).then(function (obj) {
        mod.loaded = true;
        return mod.result = obj;
      });
    }

    if (!mthd) return ret;
    var args = arguments;
    return ret.then(function (obj) {
      if (typeof obj === 'function' && mthd === 'new') {
        return new (bind.apply(obj, slice.call(args, 1)))();
      } else {
        return obj[mthd].apply(obj, slice.call(args, 2));
      }
    });
  },
  register: function (mod, obj) {
    if (typeof mod === 'string') {
      mod = {
        name: mod,
        loaded: true,
        result: obj
      };
    }

    var modName = mod.name;

    if (!modName || !mod.loaded && !mod.assets) {
      throw Error('missing name or assets');
    }

    if (_mods[modName]) {
      console.log('WARNING: re-register module ' + modName);
      return _mods[modName];
    }

    _mods[modName] = mod;
    if (mod.loaded) _modules[modName] = mod.result;
    var waits = _waits[modName];

    if (waits) {
      delete _waits[modName];
      loadjs.load(modName).then(function (result) {
        waits.forEach(function (wait) {
          wait.resolve(result);
        });
      });
    }

    return mod;
  },
  // utils
  wait: function (scriptId, varName) {
    if (varName && varName in window) return Promise.resolve(window[varName]);
    return new Promise(function (resolve) {
      document.querySelector('#' + scriptId).addEventListener('load', function () {
        resolve(varName ? window[varName] : undefined);
      });
    });
  }
};
module.exports = loadjs;

/***/ }),

/***/ "../../lib/utils.js":
/*!***********************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/utils.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var access = __webpack_require__(/*! ./access */ "../../lib/access.js");

var utils = {
  BASE16: '0123456789abcdef',
  BASE62: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  BASE64: '0123456789-abcdefghijklmnopqrstuvwxyz_ABCDEFGHIJKLMNOPQRSTUVWXYZ'
};

utils.randomString = function (len, letters) {
  letters = letters || utils.BASE64;
  var arr = Array(len = Number(len));

  for (var i = 0; i < len; i++) {
    arr[i] = letters.charAt(Math.floor(Math.random() * letters.length));
  }

  return arr.join('');
};

utils.randomHex = function (len) {
  return utils.randomString(len, utils.BASE16);
};

utils.transfilter = function (arr, trans, noFilter) {
  if (!arr || !arr.length) return [];

  if (typeof trans === 'string') {
    trans = access.bind(null, trans.split('.'), undefined);
  }

  var fn = typeof noFilter === 'function' ? noFilter : false;
  var ret = [];

  for (var i = 0, n = arr.length; i < n; i++) {
    var val = arr[i];
    if (trans) val = trans(val);
    var b = fn ? fn(val) : noFilter || val != null;
    if (b) ret.push(val);
  }

  return ret;
};

utils.pickAll = function (obj, keys, noUndef) {
  var val,
      picked = {};

  if (keys && keys.length) {
    for (var i = 0; i < keys.length; i++) {
      val = obj ? obj[keys[i]] : undefined;

      if (val !== undefined || !noUndef) {
        picked[keys[i]] = val;
      }
    }
  }

  return picked;
};

function set(key, obj, key2, val) {
  return (obj[key] || (obj[key] = {}))[key2] = val;
}

utils.set = set;
utils.$set = set.bind(null, '$set');
utils.$unset = set.bind(null, '$unset');
utils.$push = set.bind(null, '$push');

utils.$pull = function (update, name, key, val) {
  var at = {};
  at[key] = val;
  set('$pull', update, name, at);
};

utils.$currentDate = function (update, name, spec) {
  set('$currentDate', update, name, spec || true);
};

utils.arrayToObject = arrayToObject;

function arrayToObject(arr, depth) {
  var obj = {};
  if (!arr || !arr.length) return obj;

  for (var i = 0; i < arr.length; i += 2) {
    var attr = arr[i];

    if (arr && typeof attr === 'string') {
      var val = arr[i + 1];

      if (depth > 0 && Array.isArray(val)) {
        val = arrayToObject(val, depth - 1);
      }

      if (val !== undefined) obj[attr] = val;
    }
  }

  return obj;
}

;

utils.endsWith = function (str, suffix) {
  var len = str.length,
      slen = suffix.length;
  if (!slen) return true;
  if (len < slen) return false;
  return str.indexOf(suffix, len - slen) !== -1;
};

utils.find = function (array, path, val) {
  if (!array || !path) return;
  if (typeof path === 'string') path = path.split('.');

  for (var i = 0, n = array.length; i < n; i++) {
    var obj = array[i];
    if (access(path, undefined, obj) === val) return obj;
  }
};

utils.serialize = function (obj) {
  if (obj && typeof obj === 'object') {
    var keys = Object.keys(obj);

    if (keys.length > 0) {
      keys.sort();
      return JSON.stringify(obj, keys);
    }
  }

  return JSON.stringify(obj);
};

utils.trim = function (arr, sep) {
  if (!arr) return [];
  if (typeof arr === 'string') arr = arr.split(sep || ',');
  var ret = [],
      item;

  for (var i = 0, n = arr.length; i < n; i++) {
    if ((item = arr[i]) && (item = item.trim())) {
      ret.push(item);
    }
  }

  return ret;
};

utils.truncate = function (s, n, ell) {
  return !s ? '' : s.length <= n ? s : s.slice(0, n) + (ell || '...');
};

utils.hashCode = hashCode;

function hashCode(s) {
  var hash = 0,
      i,
      chr,
      len;
  if (s.length === 0) return hash;

  for (i = 0, len = s.length; i < len; i++) {
    chr = s.charCodeAt(i);
    hash = (hash << 5) - hash + chr; //hash |= 0; // Convert to 32bit integer

    hash = hash >>> 0; // Convert to unsigned 32bit integer
  }

  return hash;
}

;

utils.hashString = function (s, nseg) {
  var len = s.length;
  var seg = len > 0 && nseg > 1 ? Math.ceil(len / nseg) : 0;
  if (seg < 1) return hashCode(s).toString(36);
  var start = 0,
      ret = '';

  while (start < len) {
    ret = ret + hashCode(s.substr(start, seg)).toString(36);
    start += seg;
  }

  return ret;
};

utils.hashColor = function (str, min) {
  min = min > 192 ? 192 : min >= 0 ? min : 192;
  var hash = utils.hashCode(str);
  var b = hash % 64 + 192;
  var g = (hash >> 6) % 64 + 192; //jshint ignore: line

  var r = (hash >> 12) % 64 + 192; //jshint ignore: line

  var rgb = '#' + utils.rgbToHex(r, g, b);
  return [rgb, r, g, b];
};

utils.componentToHex = componentToHex;

function componentToHex(c) {
  c = (c < 0 ? -c : c) % 256;
  var hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

utils.rgbToHex = rgbToHex;

function rgbToHex(r, g, b) {
  return componentToHex(r) + componentToHex(g) + componentToHex(b);
} // https://github.com/darkskyapp/string-hash/blob/master/index.js


utils.hash = function (str) {
  var hash = 5381,
      i = str.length;

  while (i) {
    hash = hash * 33 ^ str.charCodeAt(--i);
  }
  /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
   * integers. Since we want the results to be always positive, convert the
   * signed int to an unsigned by doing an unsigned bitshift. */


  return hash >>> 0;
};

utils.timestamp = timestamp;

function timestamp(obj) {
  if (typeof obj === 'number') {
    return obj;
  } else if (!obj) {
    return Number.NaN;
  } else if (typeof obj === 'string') {
    var ts = Number(obj);
    return isFinite(ts) ? ts : Date.parse(obj); // this is UTC
  } else if (obj.getTimestamp) {
    // well mongo ObjectID here
    return obj.getTimestamp().getTime();
  } else if (obj.valueOf) {
    return obj.valueOf();
  } else {
    return Number.NaN;
  }
}

utils.toDate = function (obj) {
  return obj instanceof Date ? obj : new Date(timestamp(obj));
};

utils.epochDates = epochDates;

function epochDates(date) {
  return Math.floor(timestamp(date) / 86400000);
}

utils.epochSeconds = epochSeconds;

function epochSeconds(date) {
  return Math.floor(timestamp(date) / 1000);
}

utils.utcDateString = function (date, includesTime) {
  if (!date.getUTCFullYear) date = new Date(timestamp(date));
  var y = date.getUTCFullYear();
  var m = date.getUTCMonth() + 1;
  var d = date.getUTCDate();
  if (m < 10) m = '0' + m;
  if (d < 10) d = '0' + d;
  var ret = y + '-' + m + '-' + d;

  if (includesTime) {
    var h = date.getUTCHours();
    var n = date.getUTCMinutes();
    var s = date.getUTCSeconds();
    if (h < 10) h = '0' + h;
    if (n < 10) n = '0' + n;
    if (s < 10) s = '0' + s;
    ret = ret + ' ' + h + ':' + n + ':' + s;
  }

  return ret;
};

utils.randomObjectId = function (date, seed) {
  var msecs = date ? date.getTime() + (seed >= 0 ? seed % 86400000 : 86400000 * Math.random()) : 946656000000 + 5000 * 86400000 * Math.random();
  var hex = ('00000000' + Math.floor(msecs / 1000).toString(16)).substr(-8);

  if (seed >= 0) {
    return hex + ('0000000000000000' + seed.toString(16)).substr(-16);
  } else {
    return hex + utils.randomHex(16);
  }
};

utils.dateObjectId = function (date, offset) {
  var dates = epochDates(date);

  if (dates >= 0) {
    if (isFinite(offset)) dates += Math.floor(offset);
    var prefix = ('00000000' + (dates * 86400).toString(16)).substr(-8);
    return prefix + '0000000000000000';
  } // otherwise undefined

};

utils.secondsObjectId = function (date, msecs) {
  var secs = epochSeconds(date);

  if (secs >= 0) {
    var prefix = ('00000000' + secs.toString(16)).substr(-8);
    msecs = msecs > 0 ? Math.floor(msecs) : 0;

    if (msecs > 0 && msecs < 1000) {
      return prefix + ('000' + msecs).substr(-3) + '0000000000000';
    } else {
      return prefix + '0000000000000000';
    }
  } // otherwise undefined

};

utils.range = function (from, to, step) {
  step = step || 1;
  var a = [];

  for (var i = from; i < to; i += step) {
    a.push(i);
  }

  return a;
};

utils.extname = function (s, sep) {
  var i = s.lastIndexOf(sep);
  return i < 0 ? s : s.substring(i + 1);
};

utils.testAll = function (arr, func) {
  func = func || (func === null ? nonNull : identity);
  var re = func instanceof RegExp;

  for (var i = 0, n = arr.length; i < n; i++) {
    var obj = arr[i];
    if (re && !func.test(obj) || !re && !func(obj)) return false;
  }

  return true;
};

utils.hasNull = function (items) {
  return items.length === 0 ? false : items.indexOf(null) >= 0 || items.indexOf(undefined) >= 0;
};

utils.hasTags = hasTags;

function hasTags(obj, field, tags, rejects) {
  if (!obj || field == null) return false;
  return containsTags(obj[field], tags, rejects);
}

utils.filterTags = function (objs, field, tags, rejects) {
  return utils.transfilter(objs, function (obj) {
    return hasTags(obj, field, tags, rejects) ? obj : null;
  });
};

utils.tagsChecker = function (field, tags, rejects) {
  return function (obj) {
    return hasTags(obj, field, tags, rejects);
  };
}; // assuming arr uniq


utils.union = function (arr, arr2) {
  return !arr2 ? arr.concat() : arr.concat(arr2.filter(function (it) {
    return arr.indexOf(it) < 0;
  }));
}; // assume arr uniq


utils.intersection = function (arr, arr2) {
  return !arr2 ? [] : arr.filter(function (it) {
    return arr2.indexOf(it) >= 0;
  });
};

module.exports = utils;

/***/ }),

/***/ "../../lib/xbarc.js":
/*!***********************************************!*\
  !*** /Users/pikachu/ws/aliceart/lib/xbarc.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assert = __webpack_require__(/*! ./assert */ "../../lib/assert.js");

var klass = __webpack_require__(/*! ./klass */ "../../lib/klass.js");

var Emitter = __webpack_require__(/*! ./emitter */ "../../lib/emitter.js");

var RESERVED = {
  message: true,
  open: true,
  error: true,
  config: true,
  connected: true,
  disconnected: true
}; // xbars client

var Xbarc = klass(Emitter.prototype, {
  init: function (opts) {
    assert(opts.fetch, 'missing fetch');
    assert(opts.eventSource, 'missing eventSource');
    this.url = opts.url;
    this._connId = null;
    this._listeners = {
      message: onMessage.bind(this),
      open: onOpen.bind(this),
      error: onError.bind(this)
    };
    this._fetch = opts.fetch;
    this._clientId = opts.clientId;
    this._clientSecret = opts.clientSecret;
    this._xbarId = opts.xbarId;
    this._eventSource = opts.eventSource;
    this._headers = opts.headers || null;
    this._tokenField = opts.tokenField;
    this._ajaxHeaders = {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest' //'Accept': 'application/json',

    };

    if (this._headers) {
      this._ajaxHeaders = Object.assign({}, this._headers, this._ajaxHeaders);
    }

    if (this._clientId) {
      this._ajaxHeaders['X-Xbarx-Client-Id'] = this._clientId;
      this._ajaxHeaders['X-Xbarx-Client-Secret'] = this._clientSecret;
      this._ajaxHeaders['X-Xbarx-Xbar-Id'] = this._xbarId;
    }
  },
  _resolve: function (connId, err) {
    var fn = err ? this._rejectFn : this._resolveFn;
    this._resolveFn = this._rejectFn = null;
    if (fn) fn(err || connId);
  },
  _events: function () {
    return Object.keys(this._listeners);
  },
  apps: function () {
    return this._events().filter(function (e) {
      return !RESERVED[e];
    });
  },

  tap(app) {
    if (RESERVED[app]) return this;

    if (!this._listeners[app]) {
      var listener = this._listeners[app] = function (e) {
        parseAndEmit(this, app, e.data);
      }.bind(this);

      if (this._es) this._es.addEventListener(app, listener);
      this.emit('config', 'tap', app);
    }

    return this;
  },

  connect: function () {
    var headers = this._headers;
    return this._waitConnId || (this._waitConnId = new Promise(function (resolve, reject) {
      this._resolveFn = resolve;
      this._rejectFn = reject;
      var opts = this._clientId && {
        headers: {
          'X-Xbarx-Client-Id': this._clientId,
          'X-Xbarx-Client-Secret': this._clientSecret,
          'X-Xbarx-Xbar-Id': this._xbarId
        }
      };

      if (opts && headers) {
        opts.headers = Object.assign({}, headers, opts.headers);
      }

      var es = this._es = opts ? this._eventSource(this.url, opts) : this._eventSource(this.url);
      var ls = this._listeners;
      Object.keys(ls).forEach(function (key) {
        es.addEventListener(key, ls[key]);
      });
    }.bind(this)));
  },
  disconnect: function (err) {
    var es = this._es;

    if (es) {
      var ls = this._listeners;
      Object.keys(ls).forEach(function (key) {
        es.removeEventListener(key, ls[key]);
      });
      es.close();
    }

    var connId = this._connId;
    this._connId = this._es = this._waitConnId = null;
    if (this._resolveFn) this._resolve(null, Error(err && err.message || 'abort'));
    if (connId) this.emit('disconnected', connId);
  },
  toggle: function () {
    this._waitConnId ? this.disconnect() : this.connect();
  },
  connected: function () {
    return !!this._connId;
  },
  getConnId: function () {
    return this._connId;
  },
  _getAjaxHeaders: function (opts) {
    var authToken = this._tokenField && localStorage.getItem(this._tokenField);
    var headers = authToken && {
      'X-Access-Token': authToken
    };
    if (opts && opts.headers) headers = Object.assign(headers || {}, opts.headers);
    return headers ? Object.assign(headers, this._ajaxHeaders) : this._ajaxHeaders;
  },
  post: function (data, opts) {
    if (!this._connId) return Promise.reject('not connected');
    opts = opts || {};
    var req = {
      connId: this._connId,
      data: data
    };
    if (opts.app) req.app = opts.app;
    if (opts.verb) req.verb = opts.verb;
    return this._fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(req),
      headers: this._getAjaxHeaders()
    }).then(function (res) {
      return res.text();
    }).then(function (text) {
      console.log("POST", data, opts, "GOT", text);
      if (text === 'undefined') return undefined;

      try {
        return JSON.parse(text);
      } catch (ex) {
        return Promise.reject(ex);
      }
    });
  },
  postApp: function (appName, data, opts) {
    assert(appName && data, 'missing appName or data');

    if (!opts) {
      opts = {
        app: appName
      };
    } else if (typeof opts === 'string') {
      opts = {
        app: appName,
        verb: opts
      };
    } else {
      opts = Object.assign({}, opts, {
        app: appName
      });
    }

    return this.post(data, opts);
  },
  pushApp: function (appName, data) {
    return this.postApp(appName, data, 'push');
  },
  ask: function (data, opts) {
    if (!this._connId) return Promise.reject('not connected');
    opts = opts || {};
    var req = {
      connId: this._connId,
      data: data
    };
    if (opts.app) req.app = opts.app;
    if (opts.verb) req.verb = opts.verb;
    return this._fetch(this.url + '/ask', {
      method: 'POST',
      body: JSON.stringify(req),
      headers: this._getAjaxHeaders()
    }).then(function (res) {
      return res.text();
    }).then(function (text) {
      console.log("ASK", data, opts, "GOT", text);
      if (text === 'undefined') return undefined;

      try {
        return JSON.parse(text);
      } catch (ex) {
        return Promise.reject(ex);
      }
    });
  },
  askApp: function (appName, data, opts) {
    assert(appName && data, 'missing appName or data');

    if (!opts) {
      opts = {
        app: appName
      };
    } else if (typeof opts === 'string') {
      opts = {
        app: appName,
        verb: opts
      };
    } else {
      opts = Object.assign({}, opts, {
        app: appName
      });
    }

    return this.ask(data, opts);
  }
});

function parseAndEmit(me, app, data) {
  var json;

  try {
    json = JSON.parse(data);
  } catch (ex) {
    return me.emit('error', ex); // no disconnect
  }

  me.emit(app, json);
}

function onMessage(e) {
  if (e.data.indexOf('connId ') === 0) {
    if (this._connId) console.error('receiving multiple connId');
    this._connId = e.data.substr(7);

    this._resolve(this._connId);

    this.emit('connected', this._connId);
  } else {
    parseAndEmit(this, 'message', e.data);
  }
}

function onOpen(e) {
  this.emit('open', e);
}

function onError(e) {
  //this.disconnect(e);
  this.emit('error', this._connId, e);
  this._connId = null;
}

module.exports = Xbarc;

/***/ }),

/***/ "../../node_modules/mini-css-extract-plugin/dist/loader.js!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/src/index.js?!../../node_modules/sass-loader/dist/cjs.js!./scss/custom.scss":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/pikachu/ws/aliceart/node_modules/mini-css-extract-plugin/dist/loader.js!/Users/pikachu/ws/aliceart/node_modules/css-loader!/Users/pikachu/ws/aliceart/node_modules/postcss-loader/src??ref--7-3!/Users/pikachu/ws/aliceart/node_modules/sass-loader/dist/cjs.js!./scss/custom.scss ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../../node_modules/style-loader/lib/addStyles.js":
/*!*****************************************************************************!*\
  !*** /Users/pikachu/ws/aliceart/node_modules/style-loader/lib/addStyles.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "../../node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "../../node_modules/style-loader/lib/urls.js":
/*!************************************************************************!*\
  !*** /Users/pikachu/ws/aliceart/node_modules/style-loader/lib/urls.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "../../node_modules/turbolinks/dist/turbolinks.js":
/*!*****************************************************************************!*\
  !*** /Users/pikachu/ws/aliceart/node_modules/turbolinks/dist/turbolinks.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
Turbolinks 5.2.0
Copyright © 2018 Basecamp, LLC
 */
(function(){var t=this;(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame&&null!=window.addEventListener}(),visit:function(t,r){return e.controller.visit(t,r)},clearCache:function(){return e.controller.clearCache()},setProgressBarDelay:function(t){return e.controller.setProgressBarDelay(t)}}}).call(this)}).call(t);var e=t.Turbolinks;(function(){(function(){var t,r,n,o=[].slice;e.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},e.closest=function(e,r){return t.call(e,r)},t=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),e.defer=function(t){return setTimeout(t,1)},e.throttle=function(t){var e;return e=null,function(){var r;return r=1<=arguments.length?o.call(arguments,0):[],null!=e?e:e=requestAnimationFrame(function(n){return function(){return e=null,t.apply(n,r)}}(this))}},e.dispatch=function(t,e){var r,o,i,s,a,u;return a=null!=e?e:{},u=a.target,r=a.cancelable,o=a.data,i=document.createEvent("Events"),i.initEvent(t,!0,r===!0),i.data=null!=o?o:{},i.cancelable&&!n&&(s=i.preventDefault,i.preventDefault=function(){return this.defaultPrevented||Object.defineProperty(this,"defaultPrevented",{get:function(){return!0}}),s.call(this)}),(null!=u?u:document).dispatchEvent(i),i},n=function(){var t;return t=document.createEvent("Events"),t.initEvent("test",!0,!0),t.preventDefault(),t.defaultPrevented}(),e.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),e.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){e.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.requestURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=t(this.requestCanceled,this),this.requestTimedOut=t(this.requestTimedOut,this),this.requestFailed=t(this.requestFailed,this),this.requestLoaded=t(this.requestLoaded,this),this.requestProgressed=t(this.requestProgressed,this),this.url=e.Location.wrap(n).requestURL,this.referrer=e.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return e.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return e.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.ProgressBar=function(){function e(){this.trickle=t(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,e.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",e.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},e.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},e.prototype.setValue=function(t){return this.value=t,this.refresh()},e.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},e.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},e.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},e.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},e.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},e.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},e.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},e.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},e.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},e.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},e}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=t(this.showProgressBar,this),this.progressBar=new e.ProgressBar}var n,o,i;return i=e.HttpRequest,n=i.NETWORK_FAILURE,o=i.TIMEOUT_FAILURE,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case o:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,this.controller.progressBarDelay)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.History=function(){function r(e){this.delegate=e,this.onPageLoad=t(this.onPageLoad,this),this.onPopState=t(this.onPopState,this)}return r.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),addEventListener("load",this.onPageLoad,!1),this.started=!0)},r.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),removeEventListener("load",this.onPageLoad,!1),this.started=!1):void 0},r.prototype.push=function(t,r){return t=e.Location.wrap(t),this.update("push",t,r)},r.prototype.replace=function(t,r){return t=e.Location.wrap(t),this.update("replace",t,r)},r.prototype.onPopState=function(t){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=t.state)?n.turbolinks:void 0)?(r=e.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},r.prototype.onPageLoad=function(t){return e.defer(function(t){return function(){return t.pageLoaded=!0}}(this))},r.prototype.shouldHandlePopState=function(){return this.pageIsLoaded()},r.prototype.pageIsLoaded=function(){return this.pageLoaded||"complete"===document.readyState},r.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},r}()}.call(this),function(){e.HeadDetails=function(){function t(t){var e,r,n,s,a,u;for(this.elements={},n=0,a=t.length;a>n;n++)u=t[n],u.nodeType===Node.ELEMENT_NODE&&(s=u.outerHTML,r=null!=(e=this.elements)[s]?e[s]:e[s]={type:i(u),tracked:o(u),elements:[]},r.elements.push(u))}var e,r,n,o,i;return t.fromHeadElement=function(t){var e;return new this(null!=(e=null!=t?t.childNodes:void 0)?e:[])},t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},t.prototype.getMetaValue=function(t){var e;return null!=(e=this.findMetaElementByName(t))?e.getAttribute("content"):void 0},t.prototype.findMetaElementByName=function(t){var r,n,o,i;r=void 0,i=this.elements;for(o in i)n=i[o].elements,e(n[0],t)&&(r=n[0]);return r},i=function(t){return r(t)?"script":n(t)?"stylesheet":void 0},o=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},r=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},n=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},e=function(t,e){var r;return r=t.tagName.toLowerCase(),"meta"===r&&t.getAttribute("name")===e},t}()}.call(this),function(){e.Snapshot=function(){function t(t,e){this.headDetails=t,this.bodyElement=e}return t.wrap=function(t){return t instanceof this?t:"string"==typeof t?this.fromHTMLString(t):this.fromHTMLElement(t)},t.fromHTMLString=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromHTMLElement(e)},t.fromHTMLElement=function(t){var r,n,o,i;return o=t.querySelector("head"),r=null!=(i=t.querySelector("body"))?i:document.createElement("body"),n=e.HeadDetails.fromHeadElement(o),new this(n,r)},t.prototype.clone=function(){return new this.constructor(this.headDetails,this.bodyElement.cloneNode(!0))},t.prototype.getRootLocation=function(){var t,r;return r=null!=(t=this.getSetting("root"))?t:"/",new e.Location(r)},t.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},t.prototype.getElementForAnchor=function(t){try{return this.bodyElement.querySelector("[id='"+t+"'], a[name='"+t+"']")}catch(e){}},t.prototype.getPermanentElements=function(){return this.bodyElement.querySelectorAll("[id][data-turbolinks-permanent]")},t.prototype.getPermanentElementById=function(t){return this.bodyElement.querySelector("#"+t+"[data-turbolinks-permanent]")},t.prototype.getPermanentElementsPresentInSnapshot=function(t){var e,r,n,o,i;for(o=this.getPermanentElements(),i=[],r=0,n=o.length;n>r;r++)e=o[r],t.getPermanentElementById(e.id)&&i.push(e);return i},t.prototype.findFirstAutofocusableElement=function(){return this.bodyElement.querySelector("[autofocus]")},t.prototype.hasAnchor=function(t){return null!=this.getElementForAnchor(t)},t.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},t.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},t.prototype.isVisitable=function(){return"reload"!==this.getSetting("visit-control")},t.prototype.getSetting=function(t){return this.headDetails.getMetaValue("turbolinks-"+t)},t}()}.call(this),function(){var t=[].slice;e.Renderer=function(){function e(){}var r;return e.render=function(){var e,r,n,o;return n=arguments[0],r=arguments[1],e=3<=arguments.length?t.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,e,function(){}),o.delegate=n,o.render(r),o},e.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},e.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},e.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,e.async=!1,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},e}()}.call(this),function(){var t,r,n=function(t,e){function r(){this.constructor=t}for(var n in e)o.call(e,n)&&(t[n]=e[n]);return r.prototype=e.prototype,t.prototype=new r,t.__super__=e.prototype,t},o={}.hasOwnProperty;e.SnapshotRenderer=function(e){function o(t,e,r){this.currentSnapshot=t,this.newSnapshot=e,this.isPreview=r,this.currentHeadDetails=this.currentSnapshot.headDetails,this.newHeadDetails=this.newSnapshot.headDetails,this.currentBody=this.currentSnapshot.bodyElement,this.newBody=this.newSnapshot.bodyElement}return n(o,e),o.prototype.render=function(t){return this.shouldRender()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.isPreview||e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},o.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},o.prototype.replaceBody=function(){var t;return t=this.relocateCurrentBodyPermanentElements(),this.activateNewBodyScriptElements(),this.assignNewBody(),this.replacePlaceholderElementsWithClonedPermanentElements(t)},o.prototype.shouldRender=function(){return this.newSnapshot.isVisitable()&&this.trackedElementsAreIdentical()},o.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},o.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},o.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},o.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},o.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},o.prototype.relocateCurrentBodyPermanentElements=function(){var e,n,o,i,s,a,u;for(a=this.getCurrentBodyPermanentElements(),u=[],e=0,n=a.length;n>e;e++)i=a[e],s=t(i),o=this.newSnapshot.getPermanentElementById(i.id),r(i,s.element),r(o,i),u.push(s);return u},o.prototype.replacePlaceholderElementsWithClonedPermanentElements=function(t){var e,n,o,i,s,a,u;for(u=[],o=0,i=t.length;i>o;o++)a=t[o],n=a.element,s=a.permanentElement,e=s.cloneNode(!0),u.push(r(n,e));return u},o.prototype.activateNewBodyScriptElements=function(){var t,e,n,o,i,s;for(i=this.getNewBodyScriptElements(),s=[],e=0,o=i.length;o>e;e++)n=i[e],t=this.createScriptElement(n),s.push(r(n,t));return s},o.prototype.assignNewBody=function(){return document.body=this.newBody},o.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.newSnapshot.findFirstAutofocusableElement())?t.focus():void 0},o.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},o.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},o.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},o.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},o.prototype.getCurrentBodyPermanentElements=function(){return this.currentSnapshot.getPermanentElementsPresentInSnapshot(this.newSnapshot)},o.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},o}(e.Renderer),t=function(t){var e;return e=document.createElement("meta"),e.setAttribute("name","turbolinks-permanent-placeholder"),e.setAttribute("content",t.id),{element:e,permanentElement:t}},r=function(t,e){var r;return(r=t.parentNode)?r.replaceChild(e,t):void 0}}.call(this),function(){var t=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;e.ErrorRenderer=function(e){function r(t){var e;e=document.createElement("html"),e.innerHTML=t,this.newHead=e.querySelector("head"),this.newBody=e.querySelector("body")}return t(r,e),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceHeadAndBody(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceHeadAndBody=function(){var t,e;return e=document.head,t=document.body,e.parentNode.replaceChild(this.newHead,e),t.parentNode.replaceChild(this.newBody,t)},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(e.Renderer)}.call(this),function(){e.View=function(){function t(t){this.delegate=t,this.htmlElement=document.documentElement}return t.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},t.prototype.getElementForAnchor=function(t){return this.getSnapshot().getElementForAnchor(t)},t.prototype.getSnapshot=function(){return e.Snapshot.fromHTMLElement(this.htmlElement)},t.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,n,e):this.renderError(r,e)},t.prototype.markAsPreview=function(t){return t?this.htmlElement.setAttribute("data-turbolinks-preview",""):this.htmlElement.removeAttribute("data-turbolinks-preview")},t.prototype.renderSnapshot=function(t,r,n){return e.SnapshotRenderer.render(this.delegate,n,this.getSnapshot(),e.Snapshot.wrap(t),r)},t.prototype.renderError=function(t,r){return e.ErrorRenderer.render(this.delegate,r,t)},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.ScrollManager=function(){function r(r){this.delegate=r,this.onScroll=t(this.onScroll,this),this.onScroll=e.throttle(this.onScroll)}return r.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},r.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},r.prototype.scrollToElement=function(t){return t.scrollIntoView()},r.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},r.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},r.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},r}()}.call(this),function(){e.SnapshotCache=function(){function t(t){this.size=t,this.keys=[],this.snapshots={}}var r;return t.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},t.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},t.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},t.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},t.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},t.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},t.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(t){return e.Location.wrap(t).toCacheKey()},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=t(this.performScroll,this),this.identifier=e.uuid(),this.location=e.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new e.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(t,r){return this.response=t,null!=r&&(this.redirectedToLocation=e.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return e.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.Controller=function(){function r(){this.clickBubbled=t(this.clickBubbled,this),this.clickCaptured=t(this.clickCaptured,this),this.pageLoaded=t(this.pageLoaded,this),this.history=new e.History(this),this.view=new e.View(this),this.scrollManager=new e.ScrollManager(this),this.restorationData={},this.clearCache(),this.setProgressBarDelay(500)}return r.prototype.start=function(){return e.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new e.SnapshotCache(10)},r.prototype.visit=function(t,r){var n,o;return null==r&&(r={}),t=e.Location.wrap(t),this.applicationAllowsVisitingLocation(t)?this.locationIsVisitable(t)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(t,n)):window.location=t:void 0},r.prototype.startVisitToLocationWithAction=function(t,r,n){var o;return e.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(t,r,{restorationData:o})):window.location=t},r.prototype.setProgressBarDelay=function(t){return this.progressBarDelay=t},r.prototype.startHistory=function(){return this.location=e.Location.wrap(window.location),this.restorationIdentifier=e.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(t,r){return this.restorationIdentifier=r,this.location=e.Location.wrap(t),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(t,r){return this.restorationIdentifier=r,this.location=e.Location.wrap(t),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(t,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(t,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=e.Location.wrap(t)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return null!=(e=this.cache.get(t))?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable();
},r.prototype.cacheSnapshot=function(){var t,r;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),r=this.view.getSnapshot(),t=this.lastRenderedLocation,e.defer(function(e){return function(){return e.cache.put(t,r.clone())}}(this))):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=this.view.getElementForAnchor(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(t,r){return e.dispatch("turbolinks:click",{target:t,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(t){return e.dispatch("turbolinks:before-visit",{data:{url:t.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(t){return e.dispatch("turbolinks:visit",{data:{url:t.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return e.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(t){return e.dispatch("turbolinks:before-render",{data:{newBody:t}})},r.prototype.notifyApplicationAfterRender=function(){return e.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(t){return null==t&&(t={}),e.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:t}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(t,r,n){var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new e.Visit(this,t,r),u.restorationIdentifier=null!=a?a:e.uuid(),u.restorationData=e.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(t){return this.nodeIsVisitable(t)?e.closest(t,"a[href]:not([target]):not([download])"):void 0},r.prototype.getVisitableLocationForLink=function(t){var r;return r=new e.Location(t.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(t){var r;return(r=e.closest(t,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){!function(){var t,e;if((t=e=document.currentScript)&&!e.hasAttribute("data-turbolinks-suppress-warning"))for(;t=t.parentNode;)if(t===document.body)return console.warn("You are loading Turbolinks from a <script> element inside the <body> element. This is probably not what you meant to do!\n\nLoad your application\u2019s JavaScript bundle inside the <head> element instead. <script> elements in <body> are evaluated with each page change.\n\nFor more information, see: https://github.com/turbolinks/turbolinks#working-with-script-elements\n\n\u2014\u2014\nSuppress this warning by adding a `data-turbolinks-suppress-warning` attribute to: %s",e.outerHTML)}()}.call(this),function(){var t,r,n;e.start=function(){return r()?(null==e.controller&&(e.controller=t()),e.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=e),n()},t=function(){var t;return t=new e.Controller,t.adapter=new e.BrowserAdapter(t),t},n=function(){return window.Turbolinks===e},n()&&e.start()}.call(this)}).call(this), true&&module.exports?module.exports=e: true&&!(__WEBPACK_AMD_DEFINE_FACTORY__ = (e),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))}).call(this);

/***/ }),

/***/ "../../node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "../../xbar/xbars/client/xbars-app.js":
/*!*****************************************************************!*\
  !*** /Users/pikachu/ws/aliceart/xbar/xbars/client/xbars-app.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {
  klass,
  ensure
} = __webpack_require__(/*! ../../../lib */ "../../lib/index.js-exposed"); // unlink server xbars app, this is for dispatching events only
// - clients call xbarc directly to push messages to server


module.exports = klass({
  role: 'app',
  name: 'xbars',

  init(tree, xbarc) {
    this.tree = tree;
    this.xbarc = xbarc;
    tree.join(this);
    tree.apps.xbars = this; //TODO: hack

    this._listeners = {};
    this.updateListeners();
    xbarc.on('config', function (key, val) {
      if (key === 'tap') this.updateListeners();
    }.bind(this));
  },

  updateListeners: function () {
    var me = this;

    if (!me._listeners.message) {
      //TODO: to remove, special case
      me.xbarc.on('message', me._listeners.message = function (e) {
        me.tree.root.emitPreOrder('xbars_message', [e]);
      });
    }

    me.xbarc.apps().forEach(function (aname) {
      if (me._listeners[aname]) return;
      me.xbarc.on(aname, me._listeners[aname] = function (e) {
        me.tree.root.emitPreOrder(aname + '_' + (e.verb || 'push'), [e]);
      });
    });
  }
});

/***/ }),

/***/ "./client.js":
/*!*******************!*\
  !*** ./client.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./scss/custom.scss */ "./scss/custom.scss");

let minstatic = __webpack_require__(/*! ../../lib */ "../../lib/index.js-exposed");

minstatic.ui = __webpack_require__(/*! ../../lib/ui */ "../../lib/ui/index.js");
let {
  ui,
  Tree,
  Xbarc
} = minstatic;
let root = Tree.Namespace('apps').instance(null, 'minstatic');
ui.register('root', root);
let profile = window.PROFILE || {};
ui.register('profile', profile);

if (profile.mode !== 'static') {
  let ko = __webpack_require__(/*! knockout */ "knockout");

  ko.bindingHandlers.stopBinding = {
    init() {
      return {
        controlsDescendantBindings: true
      };
    }

  };
  ko.virtualElements.allowedBindings.stopBinding = true;
  let xbarc = Xbarc.instance({
    url: 'http://localhost:7003/xbars',
    fetch: window.fetch.bind(window),
    eventSource: ui.eventSource,
    tokenField: '_token'
  });
  ui.register('xbarc', xbarc);

  __webpack_require__(/*! ../../xbar/xbars/client/xbars-app */ "../../xbar/xbars/client/xbars-app.js").instance(root, xbarc);
}

let turbolinks = __webpack_require__(/*! turbolinks */ "../../node_modules/turbolinks/dist/turbolinks.js"); // Monkey patch Turbolinks to render 40x & 500 normally
// See https://github.com/turbolinks/turbolinks/issues/179


turbolinks.HttpRequest.prototype.requestLoaded = function () {
  return this.endRequest(function () {
    let code = this.xhr.status;

    if (code >= 200 && code < 300 || code >= 400 && code <= 404 || code === 500) {
      this.delegate.requestCompletedWithResponse(this.xhr.responseText, this.xhr.getResponseHeader('Turbolinks-Location'));
    } else {
      this.failed = true;
      this.delegate.requestFailedWithStatusCode(code, this.xhr.responseText);
    }
  }.bind(this));
};

let _curUrl = window.location.pathname;
document.addEventListener('turbolinks:load', function (evt) {
  updateUrl(window.location.pathname);
});

function updateUrl(url) {
  let oldUrl = _curUrl;
  if (!url || oldUrl === url) return;
  _curUrl = url;
  root.removeChild('page');
  root.emitPreOrder('url_updated', [url, oldUrl]);
}

ui.setTurbolinks(turbolinks);
turbolinks.start();

/***/ }),

/***/ "./scss/custom.scss":
/*!**************************!*\
  !*** ./scss/custom.scss ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../node_modules/css-loader!../../../node_modules/postcss-loader/src??ref--7-3!../../../node_modules/sass-loader/dist/cjs.js!./custom.scss */ "../../node_modules/mini-css-extract-plugin/dist/loader.js!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/src/index.js?!../../node_modules/sass-loader/dist/cjs.js!./scss/custom.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "../../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ 0:
/*!*************************!*\
  !*** multi ./client.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./client.js */"./client.js");


/***/ }),

/***/ "knockout":
/*!*********************!*\
  !*** external "ko" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ko;

/***/ })

/******/ });
//# sourceMappingURL=bare.bundle.js.map