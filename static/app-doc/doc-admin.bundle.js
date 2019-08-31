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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/nunjucks-loader/runtime-shim.js":
/*!*******************************************************!*\
  !*** ../node_modules/nunjucks-loader/runtime-shim.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (nunjucks, env, obj, dependencies){\n\n    var oldRoot = obj.root;\n\n    obj.root = function( env, context, frame, runtime, ignoreMissing, cb ) {\n        var oldGetTemplate = env.getTemplate;\n        env.getTemplate = function (name, ec, parentName, ignoreMissing, cb) {\n            if( typeof ec === \"function\" ) {\n                cb = ec = false;\n            }\n            var _require = function (name) {\n                try {\n                    // add a reference to the already resolved dependency here\n                    return dependencies[name];\n                }\n                catch (e) {\n                    if (frame.get(\"_require\")) {\n                        return frame.get(\"_require\")(name);\n                    }\n                    else {\n                        console.warn('Could not load template \"%s\"', name);\n                    }\n                }\n            };\n\n            var tmpl = _require(name);\n            frame.set(\"_require\", _require);\n\n            if( ec ) tmpl.compile();\n            cb( null, tmpl );\n        };\n\n        oldRoot(env, context, frame, runtime, ignoreMissing, function (err, res) {\n            env.getTemplate = oldGetTemplate;\n            cb( err, res );\n        });\n    };\n\n    var src = {\n        obj: obj,\n        type: 'code'\n    };\n\n    return new nunjucks.Template(src, env);\n\n};\n\n//# sourceURL=webpack:///../node_modules/nunjucks-loader/runtime-shim.js?");

/***/ }),

/***/ "./client/doc-admin.js":
/*!*****************************!*\
  !*** ./client/doc-admin.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst { assert, ui, errorMap, toMap } = __webpack_require__(/*! minstatic */ \"minstatic\");\n\nconst { root } = ui.modules;\n\nconst { FormComp } = __webpack_require__(/*! minstatic/web/ui */ \"minstatic/web/ui\");\n\nconst ImagesView = __webpack_require__(/*! ./images-view */ \"./client/images-view.js\");\nconst InfoCards = __webpack_require__(/*! ./info-cards */ \"./client/info-cards.js\");\nconst HtmlCards = __webpack_require__(/*! ./html-cards */ \"./client/html-cards.js\");\nconst DocCards = __webpack_require__(/*! ./doc-cards */ \"./client/doc-cards.js\");\nconst SectionCards = __webpack_require__(/*! ./section-cards */ \"./client/section-cards.js\");\n\nmodule.exports = {\n  initIndex(sel) {\n    let elem = ui.first(sel);\n    IndexVM.instance({ elem });\n  },\n\n  initDoc(sel, cell) {\n    let elem = ui.first(sel);\n    DocVM.instance({ elem, cell });\n  },\n\n  initDocEdit(sel, cell) {\n    let elem = ui.first(sel);\n    DocEditVM.instance({ elem, cell });\n  },\n};\n\nconst IndexVM = ui.Comp.subclass({\n  _init() {\n    this._applyBindings();\n\n    DocCards.instance({\n      cntx: this,\n      targetSel: '[data-docs]',\n      penv: { successUrl: `${location.pathname}/cell` },\n    });\n\n    this._joinPage(root);\n  },\n});\n\nlet DocVM = ui.Comp.subclass({\n  _init({ elem, cell }) {\n    assert(elem && cell, 'null input');\n\n    this.cell = cell;\n    this._applyBindings();\n\n    this._joinPage(root);\n  },\n});\n\nconst DocEditVM = ui.Comp.subclass({\n  _init({ elem, cell, penv }) {\n    cell = this.cell = cell;\n\n    penv = this.penv = penv || {};\n    this._applyBindings();\n\n    InfoCards.instance({\n      cntx: this,\n      elem: this.first('.doc-info'),\n      cell,\n    });\n    HtmlCards.instance({\n      cntx: this,\n      elem: this.first('.doc-html'),\n      cell,\n    });\n    \n    let secMap = toMap(cell.data.sections, 'sid'); \n    this.find('.doc-section').forEach(sec => {\n      let sid = ui.closestData(sec, 'sid');\n      sid && secMap[sid] && SectionCards.instance({\n        cntx: this,\n        elem: sec,\n        cell,\n        section: secMap[sid],\n      });\n    });\n    SectionCards.instance({\n      cntx: this,\n      elem: this.first('.section-attach'),\n      cell,\n    });\n\n    ImagesView.instance({\n      cntx: this,\n      elem: this.first('.images'),\n      cell,\n    });\n\n    this._joinPage(root);\n  },\n});\n\n\n\n//# sourceURL=webpack:///./client/doc-admin.js?");

/***/ }),

/***/ "./client/doc-cards.js":
/*!*****************************!*\
  !*** ./client/doc-cards.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nconst { ui, assert, pick, errorMap } = __webpack_require__(/*! minstatic */ \"minstatic\");\nconst { forms, FormComp } = __webpack_require__(/*! minstatic/web/ui */ \"minstatic/web/ui\");\n\nconst { xbarc } = ui.modules;\n\nconst tmpl = __webpack_require__(/*! ./doc-editor.nunj */ \"./client/doc-editor.nunj\");\n\nmodule.exports = ui.Cards.subclass({\n  _init({ cell, penv }) {\n    this.cell = cell || { type: 'doc' };\n    assert(this.cell.type === 'doc', 'not doc');\n    this.penv = penv || {};\n    this._applyBindings();\n  },\n  addDoc(evt) {\n    this.showCard('doc', DocCreator, { cell: this.cell });\n  },\n\n  on_cancel(src) {\n    this.hideCard(src);\n  },\n\n  on_done(src, ret) {\n    let { cell, penv } = this;\n    if (!cell.cid && ret && ret.cid && penv.successUrl) {\n      ui.visit(`${penv.successUrl}/${ret.cid}/edit`);\n    } else {\n      ui.visit(penv.successUrl);\n    }\n  },\n});\n\nconst DocCreator = FormComp.subclass({\n  _init0(opts) {\n    let { elem, params } = opts;\n\n    let cell = this.cell = params.cell;\n    assert(cell.type === 'doc', 'not doc cell');\n    let form = pick(cell.data, 'title', 'html');\n    elem.innerHTML = tmpl.render({ form });\n\n    this.form = this.first('form');\n    this._applyFormBindings(opts);\n  },\n\n  constraints: {\n    cid: {\n      format: {\n        pattern: '^[a-z0-9]+(-[a-z0-9]+)*$',\n        message: 'can only contains a-z, 0-9, and -' \n      },\n    },\n    title: {\n      presence: {allowEmpty: false},\n    },\n    html: {\n      presence: {allowEmpty: false},\n    },\n  },\n  ckEditors: ['textarea'],\n\n  cancel() {\n    this.cntxEmit('cancel', this);\n  },\n  async save() {\n    let { cell, form } = this;\n\n    if (this.validateForm()) return;\n\n    let json = ui.formJson(form, 'cid', 'title', 'html');\n    let doc = {\n      ...pick(cell, 'type'),\n      ...pick(json, 'cid'),\n      data: pick(json, 'title', 'html'),\n    };\n    let ret = await xbarc.askApp('doc', doc, 'createDoc');\n    let errors = errorMap(ret);\n    if (errors) return forms.showErrors(form, errors);\n\n    this.cntxEmit('done', this, ret);\n  },\n});\n\n\n\n//# sourceURL=webpack:///./client/doc-cards.js?");

/***/ }),

/***/ "./client/doc-editor.nunj":
/*!********************************!*\
  !*** ./client/doc-editor.nunj ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nunjucks = __webpack_require__(/*! nunjucks/browser/nunjucks-slim */ \"nunjucks/browser/nunjucks-slim\");\nvar env;\nif (!nunjucks.currentEnv){\n\tenv = nunjucks.currentEnv = new nunjucks.Environment([], undefined);\n} else {\n\tenv = nunjucks.currentEnv;\n}\nvar configure = __webpack_require__(/*! ../nunjucks.config.js */ \"./nunjucks.config.js\")(env);\nvar dependencies = nunjucks.webpackDependencies || (nunjucks.webpackDependencies = {});\n\n\n\n\nvar shim = __webpack_require__(/*! ../node_modules/nunjucks-loader/runtime-shim */ \"../node_modules/nunjucks-loader/runtime-shim.js\");\n\n\n(function() {(nunjucks.nunjucksPrecompiled = nunjucks.nunjucksPrecompiled || {})[\"client/doc-editor.nunj\"] = (function() {\nfunction root(env, context, frame, runtime, cb) {\nvar lineno = 0;\nvar colno = 0;\nvar output = \"\";\ntry {\nvar parentTemplate = null;\noutput += \"<div class=\\\"card card-primary mb-4\\\">\\n  <div class=\\\"card-header\\\">\\n    Doc\\n    <div class=\\\"float-right\\\">\\n      <button class=\\\"btn btn-primary btn-sm\\\" data-click=\\\"save\\\">\\n        <span class=\\\"fa fa-save\\\"></span>\\n      </button>\\n      <a href=\\\"#\\\" class=\\\"btn btn-secondary btn-sm\\\" data-click=\\\"cancel\\\">\\n        <span class=\\\"fa fa-times\\\"></span>\\n      </a>\\n    </div>\\n  </div>\\n\\n  <div class=\\\"card-body\\\">\\n    <form novalidate>\\n      <div class=\\\"form-group\\\">\\n        <label for=\\\"title\\\">cid</label>\\n        <input type=\\\"text\\\" class=\\\"form-control\\\" placeholder=\\\"cid\\\" name=\\\"cid\\\" value=\\\"\";\noutput += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, \"form\")),\"cid\"), env.opts.autoescape);\noutput += \"\\\">\\n      </div>\\n\\n      <div class=\\\"form-group\\\">\\n        <label for=\\\"title\\\">Title</label>\\n        <input type=\\\"text\\\" class=\\\"form-control\\\" placeholder=\\\"Title\\\" name=\\\"title\\\" value=\\\"\";\noutput += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, \"form\")),\"title\"), env.opts.autoescape);\noutput += \"\\\">\\n      </div>\\n      <div class=\\\"form-group\\\">\\n        <label for=\\\"html\\\">Html</label>\\n        <textarea name=\\\"html\\\" class=\\\"form-control\\\" rows=\\\"5\\\" placeholder=\\\"Html\\\">\";\noutput += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, \"form\")),\"html\"), env.opts.autoescape);\noutput += \"</textarea>\\n      </div>\\n      <div class=\\\"form-group\\\">\\n        <input class=\\\"form-control\\\" type=\\\"hidden\\\" data-errors=\\\"\\\">\\n      </div>\\n    </form>\\n  </div>\\n</div>\\n\";\nif(parentTemplate) {\nparentTemplate.rootRenderFunc(env, context, frame, runtime, cb);\n} else {\ncb(null, output);\n}\n;\n} catch (e) {\n  cb(runtime.handleError(e, lineno, colno));\n}\n}\nreturn {\nroot: root\n};\n\n})();\n})();\n\n\n\nmodule.exports = shim(nunjucks, env, nunjucks.nunjucksPrecompiled[\"client/doc-editor.nunj\"] , dependencies)\n\n//# sourceURL=webpack:///./client/doc-editor.nunj?");

/***/ }),

/***/ "./client/html-cards.js":
/*!******************************!*\
  !*** ./client/html-cards.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nconst { ui, assert } = __webpack_require__(/*! minstatic */ \"minstatic\");\nconst HtmlEditor = __webpack_require__(/*! ./html-editor */ \"./client/html-editor.js\");\nconst SectionEditor = __webpack_require__(/*! ./section-editor */ \"./client/section-editor.js\");\n\nmodule.exports = ui.Cards.subclass({\n  _init({ cell, penv }) {\n    this.cell = cell || {};\n    this.penv = penv || {};\n    this._applyBindings();\n  },\n  editHtml() {\n    let { cell } = this;\n    this.showCard('html', HtmlEditor, { cell });\n  },\n\n  on_cancel(src) {\n    this.hideCard(src);\n  },\n\n  on_done(src, ret) {\n    let { cell, penv } = this;\n    if (!cell.cid && ret && ret.cid && penv.successUrl) {\n      ui.visit(penv.successUrl + '/' + ret.cid);\n    } else {\n      ui.visit(penv.successUrl);\n    }\n  },\n});\n\n\n//# sourceURL=webpack:///./client/html-cards.js?");

/***/ }),

/***/ "./client/html-editor.js":
/*!*******************************!*\
  !*** ./client/html-editor.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst { ui, assert, pick, errorMap } = __webpack_require__(/*! minstatic */ \"minstatic\");\nconst { forms, FormComp } = __webpack_require__(/*! minstatic/web/ui */ \"minstatic/web/ui\");\n\nconst { xbarc } = ui.modules;\n\nconst tmpl = __webpack_require__(/*! ./html-editor.nunj */ \"./client/html-editor.nunj\");\n\nmodule.exports = FormComp.subclass({\n  _init0(opts) {\n    let { elem, params } = opts;\n\n    let cell = this.cell = params.cell;\n    assert(cell.cid, 'missing cid');\n    let form = pick(cell.data, 'html');\n    elem.innerHTML = tmpl.render({ cell, form });\n\n    this.form = this.first('form'); // must set\n    this._applyFormBindings(opts);\n  },\n\n  constraints: {\n    html: {\n      presence: {allowEmpty: false},\n    },\n  },\n  ckEditors: ['textarea'],\n\n  cancel() {\n    this.cntxEmit('cancel', this);\n  },\n  async save() {\n    let { cell, form } = this;\n\n    if (this.validateForm()) return;\n\n    let doc = pick(cell, 'cid', 'type'); // cell-like\n    doc.data = ui.formJson(form, 'html');\n    let ret = await xbarc.askApp('doc', doc, 'updateDoc'); \n    let errors = errorMap(ret);\n    if (errors) return forms.showErrors(form, errors);\n\n    this.cntxEmit('done', this, ret);\n  },\n});\n\n\n\n//# sourceURL=webpack:///./client/html-editor.js?");

/***/ }),

/***/ "./client/html-editor.nunj":
/*!*********************************!*\
  !*** ./client/html-editor.nunj ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nunjucks = __webpack_require__(/*! nunjucks/browser/nunjucks-slim */ \"nunjucks/browser/nunjucks-slim\");\nvar env;\nif (!nunjucks.currentEnv){\n\tenv = nunjucks.currentEnv = new nunjucks.Environment([], undefined);\n} else {\n\tenv = nunjucks.currentEnv;\n}\nvar configure = __webpack_require__(/*! ../nunjucks.config.js */ \"./nunjucks.config.js\")(env);\nvar dependencies = nunjucks.webpackDependencies || (nunjucks.webpackDependencies = {});\n\n\n\n\nvar shim = __webpack_require__(/*! ../node_modules/nunjucks-loader/runtime-shim */ \"../node_modules/nunjucks-loader/runtime-shim.js\");\n\n\n(function() {(nunjucks.nunjucksPrecompiled = nunjucks.nunjucksPrecompiled || {})[\"client/html-editor.nunj\"] = (function() {\nfunction root(env, context, frame, runtime, cb) {\nvar lineno = 0;\nvar colno = 0;\nvar output = \"\";\ntry {\nvar parentTemplate = null;\noutput += \"<div class=\\\"card card-primary mb-4\\\">\\n  <div class=\\\"card-header\\\">\\n    HTML\\n    <div class=\\\"float-right\\\">\\n      <button class=\\\"btn btn-primary btn-sm\\\" data-click=\\\"save\\\">\\n        <span class=\\\"fa fa-save\\\"></span>\\n      </button>\\n      <a href=\\\"#\\\" class=\\\"btn btn-secondary btn-sm\\\" data-click=\\\"cancel\\\">\\n        <span class=\\\"fa fa-times\\\"></span>\\n      </a>\\n    </div>\\n  </div>\\n\\n  <div class=\\\"card-body\\\">\\n    <form novalidate>\\n      <div class=\\\"form-group\\\">\\n        <label for=\\\"html\\\">Html</label>\\n        <textarea name=\\\"html\\\" class=\\\"form-control\\\" rows=\\\"5\\\" placeholder=\\\"Html\\\">\";\noutput += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, \"form\")),\"html\"), env.opts.autoescape);\noutput += \"</textarea>\\n      </div>\\n      <div class=\\\"form-group\\\">\\n        <input class=\\\"form-control\\\" type=\\\"hidden\\\" data-errors=\\\"\\\">\\n      </div>\\n    </form>\\n  </div>\\n</div>\\n\";\nif(parentTemplate) {\nparentTemplate.rootRenderFunc(env, context, frame, runtime, cb);\n} else {\ncb(null, output);\n}\n;\n} catch (e) {\n  cb(runtime.handleError(e, lineno, colno));\n}\n}\nreturn {\nroot: root\n};\n\n})();\n})();\n\n\n\nmodule.exports = shim(nunjucks, env, nunjucks.nunjucksPrecompiled[\"client/html-editor.nunj\"] , dependencies)\n\n//# sourceURL=webpack:///./client/html-editor.nunj?");

/***/ }),

/***/ "./client/images-view.js":
/*!*******************************!*\
  !*** ./client/images-view.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nconst { ui } = __webpack_require__(/*! minstatic */ \"minstatic\");\n\nconst Uploader = __webpack_require__(/*! ./uploader */ \"./client/uploader.js\");\n\nmodule.exports = ui.Comp.subclass({\n  _init({ cell, elem }) {\n    this.cell = cell;\n    this._cards = ui.Cards.instance({\n      cntx: this,\n      elem: ui.first(elem, '.images-attach'),\n    }),\n    this._applyBindings();\n  },\n\n  upload() {\n    this._cards.showCard('images', Uploader, { cell: this.cell });\n  },\n\n  //on_done(src) {\n  //  this.hideCard(src);\n  //},\n});\n\n\n//# sourceURL=webpack:///./client/images-view.js?");

/***/ }),

/***/ "./client/info-cards.js":
/*!******************************!*\
  !*** ./client/info-cards.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nconst { ui, assert } = __webpack_require__(/*! minstatic */ \"minstatic\");\nconst InfoEditor = __webpack_require__(/*! ./info-editor */ \"./client/info-editor.js\");\n\nmodule.exports = ui.Cards.subclass({\n  _init({ cell, penv }) {\n    this.cell = cell || {};\n    this.penv = penv || {};\n    this._applyBindings();\n  },\n  editInfo() {\n    let { cell } = this;\n    this.showCard('info', InfoEditor, { cell });\n  },\n\n  on_cancel(src) {\n    this.hideCard(src);\n  },\n\n  on_done(src, ret) {\n    let { cell, penv } = this;\n    if (!cell.cid && ret && ret.cid && penv.successUrl) {\n      ui.visit(penv.successUrl + '/' + ret.cid);\n    } else {\n      ui.visit(penv.successUrl);\n    }\n  },\n});\n\n\n//# sourceURL=webpack:///./client/info-cards.js?");

/***/ }),

/***/ "./client/info-editor.js":
/*!*******************************!*\
  !*** ./client/info-editor.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst { ui, assert, pick, errorMap } = __webpack_require__(/*! minstatic */ \"minstatic\");\nconst { tagUtils, forms, FormComp } = __webpack_require__(/*! minstatic/web/ui */ \"minstatic/web/ui\");\n\nconst { xbarc } = ui.modules;\n\nconst tmpl = __webpack_require__(/*! ./info-editor.nunj */ \"./client/info-editor.nunj\");\n\nmodule.exports = FormComp.subclass({\n  _init0(opts) {\n    let { elem, params } = opts;\n\n    let cell = this.cell = params.cell;\n    let { tags, mtags } = cell;\n    let { title } = cell.data;\n    let form = { tags, mtags, title };\n    elem.innerHTML = tmpl.render({ cell, form });\n\n    this.form = this.first('form');\n    this._applyFormBindings(opts);\n  },\n\n  constraints: {\n    title: {\n      presence: {allowEmpty: false},\n    },\n  },\n  tagFields: ['tags', 'mtags'],\n\n  cancel() {\n    this.cntxEmit('cancel', this);\n  },\n  async save() {\n    let { cell, form, tabId, constraints } = this;\n\n    if (this.validateForm()) return;\n\n    let json = ui.formJson(form, 'title', 'tags', 'mtags');\n    let doc = pick(cell, 'type', 'cid'); // cell-like\n    doc.tags = json.tags ? json.tags.split(',') : [];\n    doc.mtags = json.mtags ? json.mtags.split(',') : [];\n    doc.data = { title: json.title };\n\n    let ret = await xbarc.askApp('doc', doc, doc.cid ? 'updateDoc' : 'createDoc');\n    let errors = errorMap(ret);\n    if (errors) return forms.showErrors(form, errors);\n\n    this.cntxEmit('done', this, ret);\n  },\n});\n\n\n\n//# sourceURL=webpack:///./client/info-editor.js?");

/***/ }),

/***/ "./client/info-editor.nunj":
/*!*********************************!*\
  !*** ./client/info-editor.nunj ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nunjucks = __webpack_require__(/*! nunjucks/browser/nunjucks-slim */ \"nunjucks/browser/nunjucks-slim\");\nvar env;\nif (!nunjucks.currentEnv){\n\tenv = nunjucks.currentEnv = new nunjucks.Environment([], undefined);\n} else {\n\tenv = nunjucks.currentEnv;\n}\nvar configure = __webpack_require__(/*! ../nunjucks.config.js */ \"./nunjucks.config.js\")(env);\nvar dependencies = nunjucks.webpackDependencies || (nunjucks.webpackDependencies = {});\n\n\n\n\nvar shim = __webpack_require__(/*! ../node_modules/nunjucks-loader/runtime-shim */ \"../node_modules/nunjucks-loader/runtime-shim.js\");\n\n\n(function() {(nunjucks.nunjucksPrecompiled = nunjucks.nunjucksPrecompiled || {})[\"client/info-editor.nunj\"] = (function() {\nfunction root(env, context, frame, runtime, cb) {\nvar lineno = 0;\nvar colno = 0;\nvar output = \"\";\ntry {\nvar parentTemplate = null;\noutput += \"<div class=\\\"card card-primary mb-4\\\">\\n  <div class=\\\"card-header\\\">\\n    Info\\n    <div class=\\\"float-right\\\">\\n      <button class=\\\"btn btn-primary btn-sm\\\" data-click=\\\"save\\\">\\n        <span class=\\\"fa fa-save\\\"></span>\\n      </button>\\n      <a href=\\\"#\\\" class=\\\"btn btn-secondary btn-sm\\\" data-click=\\\"cancel\\\">\\n        <span class=\\\"fa fa-times\\\"></span>\\n      </a>\\n    </div>\\n  </div>\\n\\n  <div class=\\\"card-body\\\">\\n    <form novalidate>\\n      <div class=\\\"form-group\\\">\\n        <label for=\\\"title\\\">Title</label>\\n        <input type=\\\"text\\\" class=\\\"form-control\\\" placeholder=\\\"Title\\\" name=\\\"title\\\" value=\\\"\";\noutput += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, \"form\")),\"title\"), env.opts.autoescape);\noutput += \"\\\">\\n      </div>\\n      <div class=\\\"form-group\\\">\\n        <label for=\\\"tags\\\">tags</label>\\n        <input type=\\\"text\\\" class=\\\"form-control\\\" placeholder=\\\"tags\\\" name=\\\"tags\\\" value=\\\"\";\noutput += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, \"form\")),\"tags\"), env.opts.autoescape);\noutput += \"\\\">\\n      </div>\\n      <div class=\\\"form-group\\\">\\n        <label for=\\\"mtags\\\">mtags</label>\\n        <input type=\\\"text\\\" class=\\\"form-control\\\" placeholder=\\\"mtags\\\" name=\\\"mtags\\\" value=\\\"\";\noutput += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, \"form\")),\"mtags\"), env.opts.autoescape);\noutput += \"\\\">\\n      </div>\\n      <div class=\\\"form-group\\\">\\n        <input class=\\\"form-control\\\" type=\\\"hidden\\\" data-errors=\\\"\\\">\\n      </div>\\n    </form>\\n  </div>\\n</div>\\n\";\nif(parentTemplate) {\nparentTemplate.rootRenderFunc(env, context, frame, runtime, cb);\n} else {\ncb(null, output);\n}\n;\n} catch (e) {\n  cb(runtime.handleError(e, lineno, colno));\n}\n}\nreturn {\nroot: root\n};\n\n})();\n})();\n\n\n\nmodule.exports = shim(nunjucks, env, nunjucks.nunjucksPrecompiled[\"client/info-editor.nunj\"] , dependencies)\n\n//# sourceURL=webpack:///./client/info-editor.nunj?");

/***/ }),

/***/ "./client/section-cards.js":
/*!*********************************!*\
  !*** ./client/section-cards.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nconst { ui, assert } = __webpack_require__(/*! minstatic */ \"minstatic\");\nconst SectionEditor = __webpack_require__(/*! ./section-editor */ \"./client/section-editor.js\");\n\nmodule.exports = ui.Cards.subclass({\n  _init({ cell, section, penv }) {\n    this.cell = cell || {};\n    this.section = section || {};\n    this.penv = penv || {};\n    this._applyBindings();\n  },\n  addSection(evt) {\n    let { cell, section } = this;\n    this.showCard('section', SectionEditor, { cell });\n  },\n  editSection(evt) {\n    let { cell, section } = this;\n    let sid = ui.closestData(evt, 'sid');\n    this.showCard('section', SectionEditor, { cell, section });\n  },\n\n  on_cancel(src) {\n    this.hideCard(src);\n  },\n\n  on_done(src, ret) {\n    let { cell, penv } = this;\n    if (!cell.cid && ret && ret.cid && penv.successUrl) {\n      ui.visit(penv.successUrl + '/' + ret.cid);\n    } else {\n      ui.visit(penv.successUrl);\n    }\n  },\n});\n\n\n//# sourceURL=webpack:///./client/section-cards.js?");

/***/ }),

/***/ "./client/section-editor.js":
/*!**********************************!*\
  !*** ./client/section-editor.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst { ui, assert, pick, errorMap } = __webpack_require__(/*! minstatic */ \"minstatic\");\nconst { forms, FormComp } = __webpack_require__(/*! minstatic/web/ui */ \"minstatic/web/ui\");\n\nconst { xbarc } = ui.modules;\n\nconst tmpl = __webpack_require__(/*! ./section-editor.nunj */ \"./client/section-editor.nunj\");\n\nmodule.exports = FormComp.subclass({\n  _init0(opts) {\n    let { elem, params } = opts;\n\n    let cell = this.cell = params.cell;\n    let section = this.section = params.section || {};\n    assert(cell.cid, 'missing cid');\n    let form = pick(section, 'title', 'html');\n    elem.innerHTML = tmpl.render({ section, form });\n\n    this.form = this.first('form');\n    this._applyFormBindings(opts);\n  },\n\n  constraints: {\n    title: {\n      presence: {allowEmpty: false},\n    },\n    html: {\n      presence: {allowEmpty: false},\n    },\n  },\n  ckEditors: ['textarea'],\n  //tagFields: ['tags', 'mtags'],\n\n  cancel() {\n    this.cntxEmit('cancel', this);\n  },\n  async save() {\n    let { cell, section, form, constraints } = this;\n\n    if (this.validateForm()) return;\n\n    let sec = pick(section, 'sid'); // maybe none\n    Object.assign(sec, ui.formJson(form, 'title', 'html'));\n    let ret = await xbarc.askApp('doc', { cid: cell.cid, section: sec }, 'upsertSection');\n    let errors = errorMap(ret);\n    if (errors) return forms.showErrors(form, errors);\n\n    this.cntxEmit('done', this, ret);\n  },\n});\n\n\n\n//# sourceURL=webpack:///./client/section-editor.js?");

/***/ }),

/***/ "./client/section-editor.nunj":
/*!************************************!*\
  !*** ./client/section-editor.nunj ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nunjucks = __webpack_require__(/*! nunjucks/browser/nunjucks-slim */ \"nunjucks/browser/nunjucks-slim\");\nvar env;\nif (!nunjucks.currentEnv){\n\tenv = nunjucks.currentEnv = new nunjucks.Environment([], undefined);\n} else {\n\tenv = nunjucks.currentEnv;\n}\nvar configure = __webpack_require__(/*! ../nunjucks.config.js */ \"./nunjucks.config.js\")(env);\nvar dependencies = nunjucks.webpackDependencies || (nunjucks.webpackDependencies = {});\n\n\n\n\nvar shim = __webpack_require__(/*! ../node_modules/nunjucks-loader/runtime-shim */ \"../node_modules/nunjucks-loader/runtime-shim.js\");\n\n\n(function() {(nunjucks.nunjucksPrecompiled = nunjucks.nunjucksPrecompiled || {})[\"client/section-editor.nunj\"] = (function() {\nfunction root(env, context, frame, runtime, cb) {\nvar lineno = 0;\nvar colno = 0;\nvar output = \"\";\ntry {\nvar parentTemplate = null;\noutput += \"<div class=\\\"card card-primary mb-4\\\">\\n  <div class=\\\"card-header\\\">\\n    Section\\n    <div class=\\\"float-right\\\">\\n      <button class=\\\"btn btn-primary btn-sm\\\" data-click=\\\"save\\\">\\n        <span class=\\\"fa fa-save\\\"></span>\\n      </button>\\n      <a href=\\\"#\\\" class=\\\"btn btn-secondary btn-sm\\\" data-click=\\\"cancel\\\">\\n        <span class=\\\"fa fa-times\\\"></span>\\n      </a>\\n    </div>\\n  </div>\\n\\n  <div class=\\\"card-body\\\">\\n    <form novalidate>\\n      <div class=\\\"form-group\\\">\\n        <label for=\\\"title\\\">Title</label>\\n        <input type=\\\"text\\\" class=\\\"form-control\\\" placeholder=\\\"Title\\\" name=\\\"title\\\" value=\\\"\";\noutput += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, \"form\")),\"title\"), env.opts.autoescape);\noutput += \"\\\">\\n\\n      </div>\\n      <div class=\\\"form-group\\\">\\n        <label for=\\\"html\\\">Html</label>\\n        <textarea name=\\\"html\\\" class=\\\"form-control\\\" rows=\\\"5\\\" placeholder=\\\"Html\\\">\";\noutput += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, \"form\")),\"html\"), env.opts.autoescape);\noutput += \"</textarea>\\n      </div>\\n      <div class=\\\"form-group\\\">\\n        <input class=\\\"form-control\\\" type=\\\"hidden\\\" data-errors=\\\"\\\">\\n      </div>\\n    </form>\\n  </div>\\n</div>\\n\";\nif(parentTemplate) {\nparentTemplate.rootRenderFunc(env, context, frame, runtime, cb);\n} else {\ncb(null, output);\n}\n;\n} catch (e) {\n  cb(runtime.handleError(e, lineno, colno));\n}\n}\nreturn {\nroot: root\n};\n\n})();\n})();\n\n\n\nmodule.exports = shim(nunjucks, env, nunjucks.nunjucksPrecompiled[\"client/section-editor.nunj\"] , dependencies)\n\n//# sourceURL=webpack:///./client/section-editor.nunj?");

/***/ }),

/***/ "./client/uploader.js":
/*!****************************!*\
  !*** ./client/uploader.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst { ui } = __webpack_require__(/*! minstatic */ \"minstatic\");\n\nconst tmpl = __webpack_require__(/*! ./uploader.nunj */ \"./client/uploader.nunj\");\n\nmodule.exports = ui.Comp.subclass({\n  _init({elem, params}) {\n    let cell = this.cell = params.cell;\n    elem.innerHTML = tmpl.render();\n\n    this._applyBindings();\n\n    let url = cell && cell.cid ? '/upload?cid=' + cell.cid : '/upload';\n    let el = this.first('[type=file]');\n    $(el).fileinput({\n      uploadUrl: url, \n      uploadAsync: true,\n      dropZoneEnabled: false,\n      maxFileCount: 5,\n      maxImageWidth: 2560,\n      maxImageHeight: 1280,\n      maxFileSize: 6000\n    }).on('fileuploaded', function() {\n      ui.visit();\n    });\n  },\n});\n\n\n//# sourceURL=webpack:///./client/uploader.js?");

/***/ }),

/***/ "./client/uploader.nunj":
/*!******************************!*\
  !*** ./client/uploader.nunj ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nunjucks = __webpack_require__(/*! nunjucks/browser/nunjucks-slim */ \"nunjucks/browser/nunjucks-slim\");\nvar env;\nif (!nunjucks.currentEnv){\n\tenv = nunjucks.currentEnv = new nunjucks.Environment([], undefined);\n} else {\n\tenv = nunjucks.currentEnv;\n}\nvar configure = __webpack_require__(/*! ../nunjucks.config.js */ \"./nunjucks.config.js\")(env);\nvar dependencies = nunjucks.webpackDependencies || (nunjucks.webpackDependencies = {});\n\n\n\n\nvar shim = __webpack_require__(/*! ../node_modules/nunjucks-loader/runtime-shim */ \"../node_modules/nunjucks-loader/runtime-shim.js\");\n\n\n(function() {(nunjucks.nunjucksPrecompiled = nunjucks.nunjucksPrecompiled || {})[\"client/uploader.nunj\"] = (function() {\nfunction root(env, context, frame, runtime, cb) {\nvar lineno = 0;\nvar colno = 0;\nvar output = \"\";\ntry {\nvar parentTemplate = null;\noutput += \"<div class=\\\"card\\\">\\n  <div class=\\\"card-header\\\">\\n    <div class=\\\"float-right\\\">\\n      <button class=\\\"btn btn-outline-secondary btn-sm\\\" data-click=\\\"cancel\\\">\\n        <span class=\\\"fa fa-times\\\"></span>\\n      </button>\\n    </div>\\n    <span class=\\\"card-title\\\">\";\noutput += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, \"title\"), env.opts.autoescape);\noutput += \"</span> \\n  </div>\\n\\n  <div class=\\\"card-body\\\">\\n    <input type=\\\"file\\\" multiple/>\\n  </div>\\n</div>\\n\";\nif(parentTemplate) {\nparentTemplate.rootRenderFunc(env, context, frame, runtime, cb);\n} else {\ncb(null, output);\n}\n;\n} catch (e) {\n  cb(runtime.handleError(e, lineno, colno));\n}\n}\nreturn {\nroot: root\n};\n\n})();\n})();\n\n\n\nmodule.exports = shim(nunjucks, env, nunjucks.nunjucksPrecompiled[\"client/uploader.nunj\"] , dependencies)\n\n//# sourceURL=webpack:///./client/uploader.nunj?");

/***/ }),

/***/ "./doc-admin-bundle.js":
/*!*****************************!*\
  !*** ./doc-admin-bundle.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar ui = __webpack_require__(/*! minstatic */ \"minstatic\").ui;\nui.register('doc-admin', __webpack_require__(/*! ./client/doc-admin */ \"./client/doc-admin.js\"));\n\n\n//# sourceURL=webpack:///./doc-admin-bundle.js?");

/***/ }),

/***/ "./nunjucks.config.js":
/*!****************************!*\
  !*** ./nunjucks.config.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function(env) {\n  env.addGlobal('JSON', JSON);\n  env.addGlobal('__', x => x);\n};\n\n\n//# sourceURL=webpack:///./nunjucks.config.js?");

/***/ }),

/***/ 1:
/*!***********************************!*\
  !*** multi ./doc-admin-bundle.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./doc-admin-bundle.js */\"./doc-admin-bundle.js\");\n\n\n//# sourceURL=webpack:///multi_./doc-admin-bundle.js?");

/***/ }),

/***/ "minstatic":
/*!****************************!*\
  !*** external "minstatic" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = minstatic;\n\n//# sourceURL=webpack:///external_%22minstatic%22?");

/***/ }),

/***/ "minstatic/web/ui":
/*!***********************************!*\
  !*** external "minstatic_web_ui" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = minstatic_web_ui;\n\n//# sourceURL=webpack:///external_%22minstatic_web_ui%22?");

/***/ }),

/***/ "nunjucks/browser/nunjucks-slim":
/*!***************************!*\
  !*** external "nunjucks" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = nunjucks;\n\n//# sourceURL=webpack:///external_%22nunjucks%22?");

/***/ })

/******/ });