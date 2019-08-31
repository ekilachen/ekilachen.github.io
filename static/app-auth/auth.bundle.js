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

/***/ "../node_modules/nunjucks-loader/runtime-shim.js":
/*!*******************************************************!*\
  !*** ../node_modules/nunjucks-loader/runtime-shim.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (nunjucks, env, obj, dependencies){

    var oldRoot = obj.root;

    obj.root = function( env, context, frame, runtime, ignoreMissing, cb ) {
        var oldGetTemplate = env.getTemplate;
        env.getTemplate = function (name, ec, parentName, ignoreMissing, cb) {
            if( typeof ec === "function" ) {
                cb = ec = false;
            }
            var _require = function (name) {
                try {
                    // add a reference to the already resolved dependency here
                    return dependencies[name];
                }
                catch (e) {
                    if (frame.get("_require")) {
                        return frame.get("_require")(name);
                    }
                    else {
                        console.warn('Could not load template "%s"', name);
                    }
                }
            };

            var tmpl = _require(name);
            frame.set("_require", _require);

            if( ec ) tmpl.compile();
            cb( null, tmpl );
        };

        oldRoot(env, context, frame, runtime, ignoreMissing, function (err, res) {
            env.getTemplate = oldGetTemplate;
            cb( err, res );
        });
    };

    var src = {
        obj: obj,
        type: 'code'
    };

    return new nunjucks.Template(src, env);

};

/***/ }),

/***/ "./client.js":
/*!*******************!*\
  !*** ./client.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


//require('./scss/auth.css');

var ui = __webpack_require__(/*! minstatic */ "minstatic").ui;
ui.register('auth-app', __webpack_require__(/*! ./client/auth-app */ "./client/auth-app.js"));


/***/ }),

/***/ "./client/auth-app.js":
/*!****************************!*\
  !*** ./client/auth-app.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const $ = __webpack_require__(/*! jquery */ "jquery");
const { ui, pick, omit, errorMap } = __webpack_require__(/*! minstatic */ "minstatic");
const { FormComp, forms } = __webpack_require__(/*! minstatic/web/ui */ "minstatic/web/ui");

const { xbarc, root, profile } = ui.modules;

const userTmpl = __webpack_require__(/*! ./user-menu.nunj */ "./client/user-menu.nunj");
const loginTmpl = __webpack_require__(/*! ./auth-login.nunj */ "./client/auth-login.nunj");
const signupTmpl = __webpack_require__(/*! ./auth-signup.nunj */ "./client/auth-signup.nunj");

let _authVM = null;

module.exports = {
  initAuth(sel) {
    if (_authVM) return _authVM.updateUser();

    let elem = ui.first(sel);
    _authVM = AuthVM.instance({ elem });
  },
};

const AuthVM = ui.Comp.subclass({
  _init({ elem }) {
    this._initUser();
    this._updateMenu();
    this._applyBindings();
    this._joinPage(root);
  },

  updateUser() {
    this._initUser();
    this._updateMenu();
  },

  _initUser() {
    if (profile._id) { // meaning regular website, with session
      this._user = { ...profile };
    } else {
      let userStr = localStorage.getItem('_user');
      let token = localStorage.getItem('_token');
      try {
        let u = this._user = userStr ? JSON.parse(userStr) : {};
        if (!u._id || !token) {
          this._clearUser();
        } else {
          Object.assign(profile, u);
          document.body.classList.add('member');
        }
      } catch(ex) {
        this._clearUser();
      }
    }
  },

  _clearUser() {
    this._user = {};
    localStorage.removeItem('_user');
    localStorage.removeItem('_token');

    delete profile._id;
    delete profile.role;
    delete profile.email;
    profile.name = 'Guest';
    document.body.classList.remove('member');
  },

  _updateMenu() {
    this.elem.innerHTML = userTmpl.render({ profile: this._user });
  },

  login() {
    let $dialog = $(loginTmpl.render());
    $('body').append($dialog);

    AuthLogin.instance({
      cntx: this,
      elem: $dialog[0],
      form: 'form',
    });

    $dialog.modal();
  },
  signup() {
    let $dialog = $(signupTmpl.render());
    $('body').append($dialog);

    AuthSignup.instance({
      cntx: this,
      elem: $dialog[0],
      form: 'form',
    });

    $dialog.modal();
  },

  async logout() {
    await xbarc.askApp('auth', {}, 'logout');
    this._clearUser();
    this._updateMenu();
    ui.visit();
  },

  async echo() {
    let ret = await xbarc.askApp('auth', { abc: 'def' }, 'echo');
    alert("RRRRRR " + JSON.stringify(ret, null, 2));
  },

  on_done(src, ret) {
    if (ret.user && ret.user._id && ret.token) {
      this._user = ret.user;
      localStorage.setItem('_user', JSON.stringify(this._user));
      localStorage.setItem('_token', ret.token);

      //TODO: revise, via event?
      Object.assign(profile, ret.user);
      document.body.classList.add('member');
    } else {
      this._clearUser();
    }
    this._updateMenu();
    ui.visit();
  },
});

const AuthLogin = FormComp.subclass({
  constraints: {
    uid: {
      presence: {allowEmpty: false},
    },
    password: {
      presence: {allowEmpty: false},
    },
  },

  async save() {
    let { elem, form } = this;

    if (this.validateForm()) return;

    let body = ui.formJson(form, 'uid', 'password');
    let ret = await xbarc.askApp('auth', body, 'login');
    let errors = errorMap(ret);
    if (errors) return forms.showErrors(form, errors);

    this.cntxEmit('done', this, ret);

    $(elem).modal('hide');
  },
});

const AuthSignup = FormComp.subclass({
  constraints: {
    uid: {
      presence: {allowEmpty: false},
    },
    email: {
      presence: {allowEmpty: false},
    },
    name: {
      presence: {allowEmpty: false},
    },
    password: {
      presence: {allowEmpty: false},
    },
    password2: {
      presence: {allowEmpty: false},
    },
  },

  async save() {
    let { elem, form } = this;

    if (this.validateForm()) return;

    let json = ui.formJson(form, 'uid', 'email', 'name', 'password', 'password2');
    if (json.password !== json.password2) {
      return forms.showErrors(form, { password2: ['Passwords not matched'] });
    }

    let user = pick(json, 'uid', 'email', 'name', 'password');
    let ret = await xbarc.askApp('auth', { user }, 'signUp');
    let errors = errorMap(ret);
    if (errors) return forms.showErrors(form, errors);

    this.cntxEmit('done', this, ret);

    $(elem).modal('hide');
  },
});



/***/ }),

/***/ "./client/auth-login.nunj":
/*!********************************!*\
  !*** ./client/auth-login.nunj ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var nunjucks = __webpack_require__(/*! nunjucks/browser/nunjucks-slim */ "nunjucks/browser/nunjucks-slim");
var env;
if (!nunjucks.currentEnv){
	env = nunjucks.currentEnv = new nunjucks.Environment([], undefined);
} else {
	env = nunjucks.currentEnv;
}
var configure = __webpack_require__(/*! ../nunjucks.config.js */ "./nunjucks.config.js")(env);
var dependencies = nunjucks.webpackDependencies || (nunjucks.webpackDependencies = {});




var shim = __webpack_require__(/*! ../node_modules/nunjucks-loader/runtime-shim */ "../node_modules/nunjucks-loader/runtime-shim.js");


(function() {(nunjucks.nunjucksPrecompiled = nunjucks.nunjucksPrecompiled || {})["client/auth-login.nunj"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"modal\" tabindex=\"-1\" role=\"dialog\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\">Login</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <form novalidate>\n          <div class=\"form-group\">\n            <label for=\"uid\">User ID or e-mail</label>\n            <input type=\"text\" class=\"form-control\" placeholder=\"ID or e-mail\" name=\"uid\">\n\n          </div>\n          <div class=\"form-group\">\n            <label for=\"password\">Password</label>\n            <input type=\"password\" class=\"form-control\" placeholder=\"Password\" name=\"password\">\n          </div>\n          <div class=\"form-group\">\n            <input class=\"form-control\" type=\"hidden\" data-errors=\"\">\n          </div>\n        </form>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n        <button type=\"button\" class=\"btn btn-primary\"\n                data-click=\"save\">Save changes</button>\n      </div>\n    </div>\n  </div>\n</div>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();



module.exports = shim(nunjucks, env, nunjucks.nunjucksPrecompiled["client/auth-login.nunj"] , dependencies)

/***/ }),

/***/ "./client/auth-signup.nunj":
/*!*********************************!*\
  !*** ./client/auth-signup.nunj ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var nunjucks = __webpack_require__(/*! nunjucks/browser/nunjucks-slim */ "nunjucks/browser/nunjucks-slim");
var env;
if (!nunjucks.currentEnv){
	env = nunjucks.currentEnv = new nunjucks.Environment([], undefined);
} else {
	env = nunjucks.currentEnv;
}
var configure = __webpack_require__(/*! ../nunjucks.config.js */ "./nunjucks.config.js")(env);
var dependencies = nunjucks.webpackDependencies || (nunjucks.webpackDependencies = {});




var shim = __webpack_require__(/*! ../node_modules/nunjucks-loader/runtime-shim */ "../node_modules/nunjucks-loader/runtime-shim.js");


(function() {(nunjucks.nunjucksPrecompiled = nunjucks.nunjucksPrecompiled || {})["client/auth-signup.nunj"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"modal\" tabindex=\"-1\" role=\"dialog\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\">Signup</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <form novalidate>\n          <div class=\"form-group\">\n            <label for=\"uid\">User ID</label>\n            <input type=\"text\" class=\"form-control\" placeholder=\"User ID\" name=\"uid\">\n          </div>\n          <div class=\"form-group\">\n            <label for=\"uid\">E-mail</label>\n            <input type=\"email\" class=\"form-control\" placeholder=\"E-mail\" name=\"email\">\n          </div>\n          <div class=\"form-group\">\n            <label for=\"name\">Name</label>\n            <input type=\"text\" class=\"form-control\" placeholder=\"Name\" name=\"name\">\n          </div>\n          <div class=\"form-group\">\n            <label for=\"password\">Password</label>\n            <input type=\"password\" class=\"form-control\" placeholder=\"Password\" name=\"password\">\n          </div>\n          <div class=\"form-group\">\n            <label for=\"password2\">Re-enter password</label>\n            <input type=\"password\" class=\"form-control\" placeholder=\"Re-enter password\"\n                   name=\"password2\">\n          </div>\n          <div class=\"form-group\">\n            <input class=\"form-control\" type=\"hidden\" data-errors=\"\">\n          </div>\n        </form>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n        <button type=\"button\" class=\"btn btn-primary\"\n                data-click=\"save\">Submit</button>\n      </div>\n    </div>\n  </div>\n</div>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();



module.exports = shim(nunjucks, env, nunjucks.nunjucksPrecompiled["client/auth-signup.nunj"] , dependencies)

/***/ }),

/***/ "./client/user-menu.nunj":
/*!*******************************!*\
  !*** ./client/user-menu.nunj ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var nunjucks = __webpack_require__(/*! nunjucks/browser/nunjucks-slim */ "nunjucks/browser/nunjucks-slim");
var env;
if (!nunjucks.currentEnv){
	env = nunjucks.currentEnv = new nunjucks.Environment([], {"dev":false,"autoescape":true,"throwOnUndefined":false,"trimBlocks":false,"lstripBlocks":false});
} else {
	env = nunjucks.currentEnv;
}
var configure = __webpack_require__(/*! ../nunjucks.config.js */ "./nunjucks.config.js")(env);
var dependencies = nunjucks.webpackDependencies || (nunjucks.webpackDependencies = {});




var shim = __webpack_require__(/*! ../node_modules/nunjucks-loader/runtime-shim */ "../node_modules/nunjucks-loader/runtime-shim.js");


(function() {(nunjucks.nunjucksPrecompiled = nunjucks.nunjucksPrecompiled || {})["client/user-menu.nunj"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "profile")),"_id")) {
output += "\n  <form class=\"form-inline mt-2 mt-md-0\">\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "profile")),"role") == "admin" && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "profile")),"mode") == "web") {
output += "\n    <a href=\"/admin\" class=\"btn btn-outline-secondary my-2 my-sm-0 mr-2\">\n      Admin\n    </a>\n    ";
;
}
output += "\n    <a href=\"#\" class=\"btn btn-outline-secondary my-2 my-sm-0 mr-2\">\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "profile")),"avatar_url")) {
output += "\n      <img src=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "profile")),"avatar_url"), env.opts.autoescape);
output += "\" width=\"24\" height=\"24\" class=\"rounded mr-2\">\n      ";
;
}
output += "\n      ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "profile")),"name"), env.opts.autoescape);
output += "\n    </a>\n    <a href=\"#\" data-click=\"logout\"\n       class=\"btn btn-outline-danger my-2 my-sm-0\">\n      Logout\n    </a>\n  </form>\n  ";
;
}
else {
output += "\n  <form class=\"form-inline mt-2 mt-md-0\">\n    <a href=\"#\" data-click=\"signup\"\n       class=\"btn btn-outline-info my-2 my-sm-0 mr-2\">\n      Signup\n    </a>\n    <a href=\"#\" data-click=\"login\"\n       class=\"btn btn-outline-success my-2 my-sm-0\">\n      Login\n    </a>\n  </form>\n  ";
;
}
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();



module.exports = shim(nunjucks, env, nunjucks.nunjucksPrecompiled["client/user-menu.nunj"] , dependencies)

/***/ }),

/***/ "./nunjucks.config.js":
/*!****************************!*\
  !*** ./nunjucks.config.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function(env) {
  env.addGlobal('JSON', JSON);
  env.addGlobal('__', x => x);
};


/***/ }),

/***/ 0:
/*!*************************!*\
  !*** multi ./client.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./client.js */"./client.js");


/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),

/***/ "minstatic":
/*!****************************!*\
  !*** external "minstatic" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = minstatic;

/***/ }),

/***/ "minstatic/web/ui":
/*!***********************************!*\
  !*** external "minstatic_web_ui" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = minstatic_web_ui;

/***/ }),

/***/ "nunjucks/browser/nunjucks-slim":
/*!***************************!*\
  !*** external "nunjucks" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = nunjucks;

/***/ })

/******/ });
//# sourceMappingURL=auth.bundle.js.map