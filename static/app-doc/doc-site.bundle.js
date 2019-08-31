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

eval("module.exports = function (nunjucks, env, obj, dependencies){\n\n    var oldRoot = obj.root;\n\n    obj.root = function( env, context, frame, runtime, ignoreMissing, cb ) {\n        var oldGetTemplate = env.getTemplate;\n        env.getTemplate = function (name, ec, parentName, ignoreMissing, cb) {\n            if( typeof ec === \"function\" ) {\n                cb = ec = false;\n            }\n            var _require = function (name) {\n                try {\n                    // add a reference to the already resolved dependency here\n                    return dependencies[name];\n                }\n                catch (e) {\n                    if (frame.get(\"_require\")) {\n                        return frame.get(\"_require\")(name);\n                    }\n                    else {\n                        console.warn('Could not load template \"%s\"', name);\n                    }\n                }\n            };\n\n            var tmpl = _require(name);\n            frame.set(\"_require\", _require);\n\n            if( ec ) tmpl.compile();\n            cb( null, tmpl );\n        };\n\n        oldRoot(env, context, frame, runtime, ignoreMissing, function (err, res) {\n            env.getTemplate = oldGetTemplate;\n            cb( err, res );\n        });\n    };\n\n    var src = {\n        obj: obj,\n        type: 'code'\n    };\n\n    return new nunjucks.Template(src, env);\n\n};\n\n//# sourceURL=webpack:///../node_modules/nunjucks-loader/runtime-shim.js?");

/***/ }),

/***/ "./client/comment-cards.js":
/*!*********************************!*\
  !*** ./client/comment-cards.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nconst { ui, assert } = __webpack_require__(/*! minstatic */ \"minstatic\");\nconst CommentEditor = __webpack_require__(/*! ./comment-editor */ \"./client/comment-editor.js\");\n\nmodule.exports = ui.Cards.subclass({\n  _init({ cell, comment, penv }) {\n    this.cell = cell || {};\n    this.comment = comment || {};\n    this.penv = penv || {};\n    this._applyBindings();\n  },\n  addComment(evt) {\n    let { cell, comment } = this;\n    this.showCard('comment', CommentEditor, { cell, comment });\n  },\n  editComment(evt) {\n    let { cell, comment } = this;\n    //let sid = ui.closestData(evt, 'sid');\n    this.showCard('comment', CommentEditor, { cell, comment });\n  },\n\n  on_cancel(src) {\n    this.hideCard(src);\n  },\n\n  on_done(src, ret) {\n    let { cell, penv } = this;\n    if (!cell.cid && ret && ret.cid && penv.successUrl) {\n      ui.visit(penv.successUrl + '/' + ret.cid);\n    } else {\n      ui.visit(penv.successUrl);\n    }\n  },\n});\n\n\n//# sourceURL=webpack:///./client/comment-cards.js?");

/***/ }),

/***/ "./client/comment-editor.js":
/*!**********************************!*\
  !*** ./client/comment-editor.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst { ui, assert, pick, errorMap, rewriter } = __webpack_require__(/*! minstatic */ \"minstatic\");\nconst { xbarc } = ui.modules;\nconst { forms, FormComp } = __webpack_require__(/*! minstatic/web/ui */ \"minstatic/web/ui\");\n\nconst tmpl = __webpack_require__(/*! ./comment-editor.nunj */ \"./client/comment-editor.nunj\");\n\nmodule.exports = FormComp.subclass({\n  _init0(opts) {\n    let { elem, params } = opts;\n\n    let cell = this.cell = params.cell;\n    let comment = this.comment = params.comment || {};\n    assert(cell.cid, 'missing cid');\n    let form = pick(comment, 'text');\n    elem.innerHTML = tmpl.render({ comment , form });\n\n    this.form = this.first('form');\n    this._applyFormBindings(opts);\n  },\n\n  constraints: {\n    text: {\n      presence: true,\n    },\n  },\n\n  cancel() {\n    this.cntxEmit('cancel', this);\n  },\n\n  async save() {\n    let { cell, comment, form, constraints } = this;\n\n    let errors = this.validateForm();\n    if (!errors) {\n      let cmt = { ...comment, ...ui.formJson(form, 'text') };\n      let ret = await xbarc.askApp('doc', {\n        cid: cell.cid,\n        comment: cmt\n      }, 'upsertComment');\n      if (errors = errorMap(ret)) {\n        return forms.showErrors(form, errors);\n      }\n\n      this.cntxEmit('done', this, ret);\n    }\n  },\n});\n\n\n\n//# sourceURL=webpack:///./client/comment-editor.js?");

/***/ }),

/***/ "./client/comment-editor.nunj":
/*!************************************!*\
  !*** ./client/comment-editor.nunj ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nunjucks = __webpack_require__(/*! nunjucks/browser/nunjucks-slim */ \"nunjucks/browser/nunjucks-slim\");\nvar env;\nif (!nunjucks.currentEnv){\n\tenv = nunjucks.currentEnv = new nunjucks.Environment([], undefined);\n} else {\n\tenv = nunjucks.currentEnv;\n}\nvar configure = __webpack_require__(/*! ../nunjucks.config.js */ \"./nunjucks.config.js\")(env);\nvar dependencies = nunjucks.webpackDependencies || (nunjucks.webpackDependencies = {});\n\n\n\n\nvar shim = __webpack_require__(/*! ../node_modules/nunjucks-loader/runtime-shim */ \"../node_modules/nunjucks-loader/runtime-shim.js\");\n\n\n(function() {(nunjucks.nunjucksPrecompiled = nunjucks.nunjucksPrecompiled || {})[\"client/comment-editor.nunj\"] = (function() {\nfunction root(env, context, frame, runtime, cb) {\nvar lineno = 0;\nvar colno = 0;\nvar output = \"\";\ntry {\nvar parentTemplate = null;\noutput += \"<div class=\\\"card card-primary mb-4\\\">\\n  <div class=\\\"card-header\\\">\\n    Comment\\n    <div class=\\\"float-right\\\">\\n      <button class=\\\"btn btn-primary btn-sm\\\" data-click=\\\"save\\\">\\n        <span class=\\\"fa fa-save\\\"></span>\\n      </button>\\n      <a href=\\\"#\\\" class=\\\"btn btn-secondary btn-sm\\\" data-click=\\\"cancel\\\">\\n        <span class=\\\"fa fa-times\\\"></span>\\n      </a>\\n    </div>\\n  </div>\\n\\n  <div class=\\\"card-body\\\">\\n    <form novalidate>\\n      <div class=\\\"form-group\\\">\\n        <label for=\\\"text\\\">Text</label>\\n        <input type=\\\"text\\\" class=\\\"form-control\\\" placeholder=\\\"Text\\\" name=\\\"text\\\" value=\\\"\";\noutput += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, \"form\")),\"text\"), env.opts.autoescape);\noutput += \"\\\">\\n\\n      </div>\\n      <div class=\\\"form-group\\\">\\n        <input class=\\\"form-control\\\" type=\\\"hidden\\\" data-errors=\\\"\\\">\\n      </div>\\n    </form>\\n  </div>\\n</div>\\n\";\nif(parentTemplate) {\nparentTemplate.rootRenderFunc(env, context, frame, runtime, cb);\n} else {\ncb(null, output);\n}\n;\n} catch (e) {\n  cb(runtime.handleError(e, lineno, colno));\n}\n}\nreturn {\nroot: root\n};\n\n})();\n})();\n\n\n\nmodule.exports = shim(nunjucks, env, nunjucks.nunjucksPrecompiled[\"client/comment-editor.nunj\"] , dependencies)\n\n//# sourceURL=webpack:///./client/comment-editor.nunj?");

/***/ }),

/***/ "./client/doc-site.js":
/*!****************************!*\
  !*** ./client/doc-site.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst ko = __webpack_require__(/*! knockout */ \"knockout\");\n\nconst { assert, ui, klass, toMap } = __webpack_require__(/*! minstatic */ \"minstatic\");\n\nconst { root, xbarc, profile } = ui.modules;\n\nconst Forum = __webpack_require__(/*! ../lib/forum */ \"./lib/forum.js\");\n\nconst TopicCards = __webpack_require__(/*! ./topic-cards */ \"./client/topic-cards.js\");\nconst TopicPostCards = __webpack_require__(/*! ./topic-post-cards */ \"./client/topic-post-cards.js\");\nconst CommentCards = __webpack_require__(/*! ./comment-cards */ \"./client/comment-cards.js\");\n\nconst topicsTmpl = __webpack_require__(/*! ../views/doc/site-cell-topics.nunj */ \"./views/doc/site-cell-topics.nunj\");\n\nconst isStatic = profile.mode === 'static';\nconst isSpa = profile.mode === 'spa';\n\nfunction _docKey(cid) {\n  return `doc-${cid}`;\n}\nfunction _tsKey(cid) {\n  return `doc-${cid}-ts`;\n}\n\nmodule.exports = {\n  initDoc(sel, cell) {\n    if (isStatic) return;\n\n    var elem = ui.first(sel);\n    DocVM.instance({ elem, cell });\n  },\n};\n\nconst DocVM = ui.Comp.subclass({\n  _init({ elem, cell }) {\n    assert(elem && cell && cell.cid, 'null input');\n\n    this.cell = cell;\n\n    this._applyBindings();\n\n    let forum = this.forum = this.origForum = Forum.instance(cell.data);\n    this.forumTs = this.origForumTs = forum.latestUpdateTime();\n    let ts = localStorage.getItem(_tsKey(cell.cid));\n    this.localForumTs = ts > 0 ? Number(ts) : 0;\n\n    if (this._updateForum(forum)) this._replaceHtml();\n\n    this._applyForumBindings();\n\n    this._joinPage(root);\n  },\n\n  _updateForum(forum) {\n    let cid = this.cell.cid;\n    let docKey = _docKey(cid);\n    let tsKey = _tsKey(cid);\n\n    let localForum;\n    let ts = forum.latestUpdateTime();\n    if (!isSpa) {\n      this._clearLocalForum();\n    } else if (ts > this.forumTs) {\n      localStorage.setItem(tsKey, ts);\n      localStorage.setItem(docKey, JSON.stringify(forum));\n      this.localForumTs = ts;\n    } else if (ts < this.localForumTs) {\n      try {\n        localForum = Forum.instance(JSON.parse(localStorage.getItem(docKey)));\n        ts = this.localForumTs;\n        if (ts !== localForum.latestUpdateTime()) console.log('WARN: time not matched');\n      } catch(ex) {\n        this._clearLocalForum();\n      }\n    }\n\n    this.forum = localForum || forum;\n    if (ts > this.forumTs) {\n      this.forumTs = ts;\n      return true;\n    }\n    return false;\n  },\n\n  _clearLocalForum() {\n    let cid = this.cell.cid;\n    localStorage.removeItem(_docKey(cid));\n    localStorage.removeItem(_tsKey(cid));\n    this.localForumTs = 0;\n  },\n \n  _replaceHtml() {\n    let { cell, forum } = this;\n    console.log(\"REPLACING...\", topicsTmpl.render({\n      cell, forum, profile,\n      isAdmin: profile.role === 'admin',\n    }));\n    this.first('[data-topics]').innerHTML = topicsTmpl.render({\n      cell, forum, profile,\n      isAdmin: profile.role === 'admin',\n    });\n  },\n\n  _applyForumBindings() {\n    let { cell, forum } = this;\n\n    let tpMap = toMap(forum.topics, 'sid');\n    this.find('.doc-topic').forEach(tp => {\n      let sid = ui.closestData(tp, 'sid');\n      sid && tpMap[sid] && TopicCards.instance({\n        cntx: this,\n        elem: tp,\n        cell, forum,\n        topic: tpMap[sid],\n      });\n    });\n\n    let el = this.first('.topic-attach');\n    el && TopicCards.instance({\n      cntx: this,\n      elem: el,\n      cell, forum,\n    });\n\n    let pstMap = toMap(forum.posts, 'sid');\n    this.find('.doc-topic-post').forEach(pst => {\n      let sid = ui.closestData(pst, 'sid');\n      let tid = ui.closestData(pst, 'tid');\n      sid && tid && pstMap[sid] && TopicPostCards.instance({\n        cntx: this,\n        elem: pst,\n        cell, forum,\n        post: pstMap[sid],\n      });\n    });\n\n    this.find('.topic-post-attach').forEach(pst => {\n      let tid = ui.closestData(pst, 'tid');\n      tid && TopicPostCards.instance({\n        cntx: this,\n        elem: pst,\n        cell, forum,\n        post: { pid: cell.cid, tid },\n      });\n    });\n\n    let cmtMap = toMap(forum.comments, 'sid');\n    this.find('.doc-comment').forEach(cmt => {\n      let sid = ui.closestData(cmt, 'sid');\n      let pid = ui.closestData(cmt, 'pid');\n      let tid = ui.closestData(cmt, 'tid');\n      console.log('sid pid tid', sid, pid, tid);\n      sid && pid && tid && cmtMap[sid] && CommentCards.instance({\n        cntx: this,\n        elem: cmt,\n        cell, forum,\n        comment: cmtMap[sid],\n      });\n    });\n\n    this.find('.comment-attach').forEach(cmt => {\n      let pid = ui.closestData(cmt, 'pid');\n      let post = pstMap[pid];\n      let tid = post ? ui.closestData(cmt, 'tid') : null;\n      console.log('comment attach pid tid', pid, tid);\n      pid && CommentCards.instance({\n        cntx: this,\n        elem: cmt,\n        cell, forum,\n        comment: { pid, tid },\n      });\n    });\n  },\n\n  async refresh() {\n    if (!isSpa) return;\n\n    let ret = await xbarc.askApp('doc', { cid: this.cell.cid }, 'refresh');\n    console.log(JSON.stringify(ret, null, 2));\n\n    let newForum = Forum.instance(ret.doc.data);\n    if (this._updateForum(newForum)) {\n      this._replaceHtml();\n      this._applyForumBindings();\n    }\n  },\n});\n\n\n\n//# sourceURL=webpack:///./client/doc-site.js?");

/***/ }),

/***/ "./client/topic-cards.js":
/*!*******************************!*\
  !*** ./client/topic-cards.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nconst { ui, assert } = __webpack_require__(/*! minstatic */ \"minstatic\");\nconst TopicEditor = __webpack_require__(/*! ./topic-editor */ \"./client/topic-editor.js\");\n\nmodule.exports = ui.Cards.subclass({\n  _init({ cell, topic, isNotice, penv }) {\n    this.cell = cell || {};\n    this.topic = topic || {};\n    this.isNotice = !!isNotice;\n    this.penv = penv || {};\n    this._applyBindings();\n  },\n  addTopic(evt) {\n    let { cell, isNotice } = this;\n    this.showCard('topic', TopicEditor, { cell, isNotice });\n  },\n  editTopic(evt) {\n    let { cell, topic, isNotice } = this;\n    //let sid = ui.closestData(evt, 'sid');\n    this.showCard('topic', TopicEditor, { cell, topic, isNotice });\n  },\n\n  on_cancel(src) {\n    this.hideCard(src);\n  },\n\n  on_done(src, ret) {\n    let { cell, penv } = this;\n    if (!cell.cid && ret && ret.cid && penv.successUrl) {\n      ui.visit(penv.successUrl + '/' + ret.cid);\n    } else {\n      ui.visit(penv.successUrl);\n    }\n  },\n});\n\n\n//# sourceURL=webpack:///./client/topic-cards.js?");

/***/ }),

/***/ "./client/topic-editor.js":
/*!********************************!*\
  !*** ./client/topic-editor.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst { ui, assert, pick, errorMap, rewriter } = __webpack_require__(/*! minstatic */ \"minstatic\");\nconst { xbarc } = ui.modules;\nconst { forms, FormComp } = __webpack_require__(/*! minstatic/web/ui */ \"minstatic/web/ui\");\nconst tmpl = __webpack_require__(/*! ./topic-editor.nunj */ \"./client/topic-editor.nunj\");\n\nfunction editorForm(data, opts={}) {\n  return pick(data, 'title', 'html');\n}\n\nmodule.exports = FormComp.subclass({\n  _init0(opts) {\n    let { elem, params } = opts;\n\n    let cell = this.cell = params.cell;\n    let topic = this.topic = params.topic || {};\n    assert(cell.cid, 'missing cid');\n    let form = editorForm(topic);\n    elem.innerHTML = tmpl.render({ topic, form });\n\n    this.form = this.first('form');\n    this._applyFormBindings(opts);\n  },\n\n  constraints: {\n    title: {\n      presence: true,\n    },\n    html: {\n      presence: {allowEmpty: false},\n    },\n  },\n  ckEditors: ['textarea'],\n  //tagFields: ['tags', 'mtags'],\n\n  cancel() {\n    this.cntxEmit('cancel', this);\n  },\n\n  async save() {\n    let { cell, topic, form, constraints } = this;\n\n    let errors = this.validateForm();\n    if (!errors) {\n      let tpc = { ...topic, ...ui.formJson(form, 'title', 'html') };\n      let ret = await xbarc.askApp('doc', {\n        cid: cell.cid,\n        topic: tpc\n      }, 'upsertTopic');\n      if (errors = errorMap(ret)) {\n        return forms.showErrors(form, errors);\n      }\n\n      this.cntxEmit('done', this, ret);\n    }\n  },\n});\n\n\n\n//# sourceURL=webpack:///./client/topic-editor.js?");

/***/ }),

/***/ "./client/topic-editor.nunj":
/*!**********************************!*\
  !*** ./client/topic-editor.nunj ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nunjucks = __webpack_require__(/*! nunjucks/browser/nunjucks-slim */ \"nunjucks/browser/nunjucks-slim\");\nvar env;\nif (!nunjucks.currentEnv){\n\tenv = nunjucks.currentEnv = new nunjucks.Environment([], undefined);\n} else {\n\tenv = nunjucks.currentEnv;\n}\nvar configure = __webpack_require__(/*! ../nunjucks.config.js */ \"./nunjucks.config.js\")(env);\nvar dependencies = nunjucks.webpackDependencies || (nunjucks.webpackDependencies = {});\n\n\n\n\nvar shim = __webpack_require__(/*! ../node_modules/nunjucks-loader/runtime-shim */ \"../node_modules/nunjucks-loader/runtime-shim.js\");\n\n\n(function() {(nunjucks.nunjucksPrecompiled = nunjucks.nunjucksPrecompiled || {})[\"client/topic-editor.nunj\"] = (function() {\nfunction root(env, context, frame, runtime, cb) {\nvar lineno = 0;\nvar colno = 0;\nvar output = \"\";\ntry {\nvar parentTemplate = null;\noutput += \"<div class=\\\"card card-primary mb-4\\\">\\n  <div class=\\\"card-header\\\">\\n    Topic\\n    <div class=\\\"float-right\\\">\\n      <button class=\\\"btn btn-primary btn-sm\\\" data-click=\\\"save\\\">\\n        <span class=\\\"fa fa-save\\\"></span>\\n      </button>\\n      <a href=\\\"#\\\" class=\\\"btn btn-secondary btn-sm\\\" data-click=\\\"cancel\\\">\\n        <span class=\\\"fa fa-times\\\"></span>\\n      </a>\\n    </div>\\n  </div>\\n\\n  <div class=\\\"card-body\\\">\\n    <form novalidate>\\n      <div class=\\\"form-group\\\">\\n        <label for=\\\"title\\\">Title</label>\\n        <input type=\\\"text\\\" class=\\\"form-control\\\" placeholder=\\\"Title\\\" name=\\\"title\\\" value=\\\"\";\noutput += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, \"form\")),\"title\"), env.opts.autoescape);\noutput += \"\\\">\\n\\n      </div>\\n      <div class=\\\"form-group\\\">\\n        <label for=\\\"html\\\">Html</label>\\n        <textarea name=\\\"html\\\" class=\\\"form-control\\\" rows=\\\"5\\\" placeholder=\\\"Html\\\">\";\noutput += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, \"form\")),\"html\"), env.opts.autoescape);\noutput += \"</textarea>\\n      </div>\\n      <div class=\\\"form-group\\\">\\n        <input class=\\\"form-control\\\" type=\\\"hidden\\\" data-errors=\\\"\\\">\\n      </div>\\n    </form>\\n  </div>\\n</div>\\n\";\nif(parentTemplate) {\nparentTemplate.rootRenderFunc(env, context, frame, runtime, cb);\n} else {\ncb(null, output);\n}\n;\n} catch (e) {\n  cb(runtime.handleError(e, lineno, colno));\n}\n}\nreturn {\nroot: root\n};\n\n})();\n})();\n\n\n\nmodule.exports = shim(nunjucks, env, nunjucks.nunjucksPrecompiled[\"client/topic-editor.nunj\"] , dependencies)\n\n//# sourceURL=webpack:///./client/topic-editor.nunj?");

/***/ }),

/***/ "./client/topic-post-cards.js":
/*!************************************!*\
  !*** ./client/topic-post-cards.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nconst { ui, assert } = __webpack_require__(/*! minstatic */ \"minstatic\");\nconst TopicPostEditor = __webpack_require__(/*! ./topic-post-editor */ \"./client/topic-post-editor.js\");\n\nmodule.exports = ui.Cards.subclass({\n  _init({ cell, post, penv }) {\n    this.cell = cell || {};\n    this.post = post;\n    assert(post, 'missing post');\n    this.penv = penv || {};\n    this._applyBindings();\n  },\n  addPost(evt) {\n    let { cell, post } = this;\n    this.showCard('post', TopicPostEditor, { cell, post });\n  },\n  editPost(evt) {\n    let { cell, post } = this;\n    //let sid = ui.closestData(evt, 'sid');\n    this.showCard('post', TopicPostEditor, { cell, post });\n  },\n\n  on_cancel(src) {\n    this.hideCard(src);\n  },\n\n  on_done(src, ret) {\n    ui.visit();\n  },\n});\n\n\n//# sourceURL=webpack:///./client/topic-post-cards.js?");

/***/ }),

/***/ "./client/topic-post-editor.js":
/*!*************************************!*\
  !*** ./client/topic-post-editor.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst { ui, assert, pick, errorMap, rewriter } = __webpack_require__(/*! minstatic */ \"minstatic\");\nconst { xbarc } = ui.modules;\nconst { forms, FormComp } = __webpack_require__(/*! minstatic/web/ui */ \"minstatic/web/ui\");\n\nconst tmpl = __webpack_require__(/*! ./topic-post-editor.nunj */ \"./client/topic-post-editor.nunj\");\n\nfunction editorForm(data) {\n  return pick(data, 'html');\n}\n\nmodule.exports = FormComp.subclass({\n  _init0(opts) {\n    let { elem, params } = opts;\n\n    let cell = this.cell = params.cell;\n    let post = this.post = params.post;\n    assert(cell.cid, 'missing cid');\n    assert(post.pid && post.tid, 'missing post pid or tid');\n    let form = editorForm(post);\n    elem.innerHTML = tmpl.render({ form });\n\n    this.form = this.first('form');\n    this._applyFormBindings(opts);\n  },\n\n  constraints: {\n    html: {\n      presence: {allowEmpty: false},\n    },\n  },\n  ckEditors: ['textarea'],\n\n  cancel() {\n    this.cntxEmit('cancel', this);\n  },\n\n  async save() {\n    let { cell, post, form, constraints } = this;\n\n    let errors = this.validateForm();\n    if (!errors) {\n      let pst = { ...post, ...ui.formJson(form, 'html') };\n      let ret = await xbarc.askApp('doc', {\n        cid: cell.cid,\n        post: pst\n      }, 'upsertTopicPost');\n      if (errors = errorMap(ret)) {\n        return forms.showErrors(form, errors);\n      }\n\n      this.cntxEmit('done', this, ret);\n    }\n  },\n});\n\n\n\n//# sourceURL=webpack:///./client/topic-post-editor.js?");

/***/ }),

/***/ "./client/topic-post-editor.nunj":
/*!***************************************!*\
  !*** ./client/topic-post-editor.nunj ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nunjucks = __webpack_require__(/*! nunjucks/browser/nunjucks-slim */ \"nunjucks/browser/nunjucks-slim\");\nvar env;\nif (!nunjucks.currentEnv){\n\tenv = nunjucks.currentEnv = new nunjucks.Environment([], undefined);\n} else {\n\tenv = nunjucks.currentEnv;\n}\nvar configure = __webpack_require__(/*! ../nunjucks.config.js */ \"./nunjucks.config.js\")(env);\nvar dependencies = nunjucks.webpackDependencies || (nunjucks.webpackDependencies = {});\n\n\n\n\nvar shim = __webpack_require__(/*! ../node_modules/nunjucks-loader/runtime-shim */ \"../node_modules/nunjucks-loader/runtime-shim.js\");\n\n\n(function() {(nunjucks.nunjucksPrecompiled = nunjucks.nunjucksPrecompiled || {})[\"client/topic-post-editor.nunj\"] = (function() {\nfunction root(env, context, frame, runtime, cb) {\nvar lineno = 0;\nvar colno = 0;\nvar output = \"\";\ntry {\nvar parentTemplate = null;\noutput += \"<div class=\\\"card card-primary mb-4\\\">\\n  <div class=\\\"card-header\\\">\\n    Post\\n    <div class=\\\"float-right\\\">\\n      <button class=\\\"btn btn-primary btn-sm\\\" data-click=\\\"save\\\">\\n        <span class=\\\"fa fa-save\\\"></span>\\n      </button>\\n      <a href=\\\"#\\\" class=\\\"btn btn-secondary btn-sm\\\" data-click=\\\"cancel\\\">\\n        <span class=\\\"fa fa-times\\\"></span>\\n      </a>\\n    </div>\\n  </div>\\n\\n  <div class=\\\"card-body\\\">\\n    <form novalidate>\\n      <div class=\\\"form-group\\\">\\n        <label for=\\\"html\\\">Html</label>\\n        <textarea name=\\\"html\\\" class=\\\"form-control\\\" rows=\\\"5\\\" placeholder=\\\"Html\\\">\";\noutput += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, \"form\")),\"html\"), env.opts.autoescape);\noutput += \"</textarea>\\n      </div>\\n      <div class=\\\"form-group\\\">\\n        <input class=\\\"form-control\\\" type=\\\"hidden\\\" data-errors=\\\"\\\">\\n      </div>\\n    </form>\\n  </div>\\n</div>\\n\";\nif(parentTemplate) {\nparentTemplate.rootRenderFunc(env, context, frame, runtime, cb);\n} else {\ncb(null, output);\n}\n;\n} catch (e) {\n  cb(runtime.handleError(e, lineno, colno));\n}\n}\nreturn {\nroot: root\n};\n\n})();\n})();\n\n\n\nmodule.exports = shim(nunjucks, env, nunjucks.nunjucksPrecompiled[\"client/topic-post-editor.nunj\"] , dependencies)\n\n//# sourceURL=webpack:///./client/topic-post-editor.nunj?");

/***/ }),

/***/ "./doc-site-bundle.js":
/*!****************************!*\
  !*** ./doc-site-bundle.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n//require('./scss/doc.css');\n\nvar ui = __webpack_require__(/*! minstatic */ \"minstatic\").ui;\nui.register('doc-site', __webpack_require__(/*! ./client/doc-site */ \"./client/doc-site.js\"));\n\n\n//# sourceURL=webpack:///./doc-site-bundle.js?");

/***/ }),

/***/ "./lib/forum.js":
/*!**********************!*\
  !*** ./lib/forum.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nconst { klass, pick } = __webpack_require__(/*! ../../lib */ \"minstatic\");\n\nconst Forum = klass({\n  init(data) {\n    Object.assign(this, pick(data, 'topics', 'posts', 'comments'));\n    this.topics = this.topics || [];\n    this.posts = this.posts || [];\n    this.comments = this.comments || [];\n  },\n\n  getTopic(sid) {\n    return this.topics.find(x => x.sid === sid);\n  },\n  getPost(sid) {\n    return this.posts.find(x => x.sid === sid);\n  },\n  getComment(sid) {\n    return this.comments.find(x => x.sid === sid);\n  },\n  getComments(pid) {\n    return this.comments.filter(x => x.pid === pid);\n  },\n  getTopicPosts(sid) {\n    return this.posts.filter(x => x.tid === sid);\n  },\n\n  latestUpdateTime() {\n    let ts = 0;\n    this.topics.forEach(x => { if (x.updated > ts) ts = x.updated; });\n    this.posts.forEach(x => { if (x.updated > ts) ts = x.updated; });\n    this.comments.forEach(x => { if (x.updated > ts) ts = x.updated; });\n    return ts;\n  },\n});\n\nmodule.exports = Forum;\n\n\n//# sourceURL=webpack:///./lib/forum.js?");

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

/***/ "./views/doc/site-cell-topics.nunj":
/*!*****************************************!*\
  !*** ./views/doc/site-cell-topics.nunj ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nunjucks = __webpack_require__(/*! nunjucks/browser/nunjucks-slim */ \"nunjucks/browser/nunjucks-slim\");\nvar env;\nif (!nunjucks.currentEnv){\n\tenv = nunjucks.currentEnv = new nunjucks.Environment([], {\"dev\":false,\"autoescape\":true,\"throwOnUndefined\":false,\"trimBlocks\":false,\"lstripBlocks\":false});\n} else {\n\tenv = nunjucks.currentEnv;\n}\nvar configure = __webpack_require__(/*! ../../nunjucks.config.js */ \"./nunjucks.config.js\")(env);\nvar dependencies = nunjucks.webpackDependencies || (nunjucks.webpackDependencies = {});\n\n\n\n\nvar shim = __webpack_require__(/*! ../node_modules/nunjucks-loader/runtime-shim */ \"../node_modules/nunjucks-loader/runtime-shim.js\");\n\n\n(function() {(nunjucks.nunjucksPrecompiled = nunjucks.nunjucksPrecompiled || {})[\"views/doc/site-cell-topics.nunj\"] = (function() {\nfunction root(env, context, frame, runtime, cb) {\nvar lineno = 0;\nvar colno = 0;\nvar output = \"\";\ntry {\nvar parentTemplate = null;\noutput += \"  \";\nvar macro_t_1 = runtime.makeMacro(\n[\"sz\", \"name\"], \n[], \nfunction (l_sz, l_name, kwargs) {\nvar callerFrame = frame;\nframe = new runtime.Frame();\nkwargs = kwargs || {};\nif (Object.prototype.hasOwnProperty.call(kwargs, \"caller\")) {\nframe.set(\"caller\", kwargs.caller); }\nframe.set(\"sz\", l_sz);\nframe.set(\"name\", l_name);\nvar t_2 = \"\";t_2 += \"\\n  <svg class=\\\"rounded-circle mr-3\\\" width=\\\"\";\nt_2 += runtime.suppressValue(l_sz, env.opts.autoescape);\nt_2 += \"\\\" height=\\\"\";\nt_2 += runtime.suppressValue(l_sz, env.opts.autoescape);\nt_2 += \"\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" preserveAspectRatio=\\\"xMidYMid slice\\\" focusable=\\\"false\\\" role=\\\"img\\\">\\n    <rect width=\\\"100%\\\" height=\\\"100%\\\" fill=\\\"#868e96\\\"></rect>\\n    <text x=\\\"40%\\\" y=\\\"50%\\\" fill=\\\"#dee2e6\\\" dy=\\\".4em\\\">\";\nt_2 += runtime.suppressValue(runtime.memberLookup((l_name),0) || \"?\", env.opts.autoescape);\nt_2 += \"</text>\\n  </svg>\\n  \";\n;\nframe = callerFrame;\nreturn new runtime.SafeString(t_2);\n});\ncontext.addExport(\"avatar\");\ncontext.setVariable(\"avatar\", macro_t_1);\noutput += \"\\n\\n  \";\nframe = frame.push();\nvar t_5 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, \"forum\")),\"topics\");\nif(t_5) {t_5 = runtime.fromIterator(t_5);\nvar t_4 = t_5.length;\nfor(var t_3=0; t_3 < t_5.length; t_3++) {\nvar t_6 = t_5[t_3];\nframe.set(\"topic\", t_6);\nframe.set(\"loop.index\", t_3 + 1);\nframe.set(\"loop.index0\", t_3);\nframe.set(\"loop.revindex\", t_4 - t_3);\nframe.set(\"loop.revindex0\", t_4 - t_3 - 1);\nframe.set(\"loop.first\", t_3 === 0);\nframe.set(\"loop.last\", t_3 === t_4 - 1);\nframe.set(\"loop.length\", t_4);\nif(runtime.memberLookup((t_6),\"pid\") == runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, \"cell\")),\"cid\")) {\noutput += \"\\n  <div class=\\\"media doc-topic mb-3 border border-info\\\"\\n       data-sid=\\\"\";\noutput += runtime.suppressValue(runtime.memberLookup((t_6),\"sid\"), env.opts.autoescape);\noutput += \"\\\" data-tid=\\\"\";\noutput += runtime.suppressValue(runtime.memberLookup((t_6),\"sid\"), env.opts.autoescape);\noutput += \"\\\">\\n    \";\noutput += runtime.suppressValue((lineno = 10, colno = 12, runtime.callWrap(macro_t_1, \"avatar\", context, [45,runtime.memberLookup((t_6),\"uid\")])), env.opts.autoescape);\noutput += \"\\n    <div class=\\\"media-body\\\" data-pid=\\\"\";\noutput += runtime.suppressValue(runtime.memberLookup((t_6),\"sid\"), env.opts.autoescape);\noutput += \"\\\">\\n      <h5 class=\\\"mt-0\\\">\";\noutput += runtime.suppressValue(runtime.memberLookup((t_6),\"title\"), env.opts.autoescape);\noutput += \"\\n        \";\nif(runtime.contextOrFrameLookup(context, frame, \"isAdmin\")) {\noutput += \"\\n        <a href=\\\"#\\\" class=\\\"float-right\\\" data-click=\\\"editTopic\\\">edit</a>\\n        \";\n;\n}\noutput += \"\\n      </h5>\\n      \";\noutput += runtime.suppressValue(env.getFilter(\"safe\").call(context, runtime.memberLookup((t_6),\"html\")), env.opts.autoescape);\noutput += \"\\n\\n      <ul class=\\\"list-unstyled my-0\\\">\\n        \";\nframe = frame.push();\nvar t_9 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, \"forum\")),\"comments\");\nif(t_9) {t_9 = runtime.fromIterator(t_9);\nvar t_8 = t_9.length;\nfor(var t_7=0; t_7 < t_9.length; t_7++) {\nvar t_10 = t_9[t_7];\nframe.set(\"comment\", t_10);\nframe.set(\"loop.index\", t_7 + 1);\nframe.set(\"loop.index0\", t_7);\nframe.set(\"loop.revindex\", t_8 - t_7);\nframe.set(\"loop.revindex0\", t_8 - t_7 - 1);\nframe.set(\"loop.first\", t_7 === 0);\nframe.set(\"loop.last\", t_7 === t_8 - 1);\nframe.set(\"loop.length\", t_8);\nif(runtime.memberLookup((t_10),\"pid\") == runtime.memberLookup((t_6),\"sid\")) {\noutput += \"\\n        <li class=\\\"media doc-comment\\\" data-sid=\\\"\";\noutput += runtime.suppressValue(runtime.memberLookup((t_10),\"sid\"), env.opts.autoescape);\noutput += \"\\\">\\n          <div class=\\\"media-body\\\">\\n            <p class=\\\"my-0\\\"><strong>@\";\noutput += runtime.suppressValue(runtime.memberLookup((t_10),\"uid\"), env.opts.autoescape);\noutput += \"</strong> \";\noutput += runtime.suppressValue(runtime.memberLookup((t_10),\"text\"), env.opts.autoescape);\noutput += \"\\n              \";\nif(runtime.contextOrFrameLookup(context, frame, \"isAdmin\")) {\noutput += \"\\n              <a href=\\\"#\\\" data-click=\\\"editComment\\\">edit</a>\\n              \";\n;\n}\noutput += \"\\n            </p>\\n          </div>\\n        </li>\\n        \";\n;\n}\n;\n}\n}\nframe = frame.pop();\noutput += \"\\n      </ul>\\n\\n      \";\nif(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, \"profile\")),\"_id\")) {\noutput += \"\\n      <p class=\\\"comment-attach\\\">\\n        <a href=\\\"#\\\" data-click=\\\"addComment\\\">add a comment</a>\\n      </p>\\n      \";\n;\n}\noutput += \"\\n\\n      \";\nframe = frame.push();\nvar t_13 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, \"forum\")),\"posts\");\nif(t_13) {t_13 = runtime.fromIterator(t_13);\nvar t_12 = t_13.length;\nfor(var t_11=0; t_11 < t_13.length; t_11++) {\nvar t_14 = t_13[t_11];\nframe.set(\"post\", t_14);\nframe.set(\"loop.index\", t_11 + 1);\nframe.set(\"loop.index0\", t_11);\nframe.set(\"loop.revindex\", t_12 - t_11);\nframe.set(\"loop.revindex0\", t_12 - t_11 - 1);\nframe.set(\"loop.first\", t_11 === 0);\nframe.set(\"loop.last\", t_11 === t_12 - 1);\nframe.set(\"loop.length\", t_12);\nif(runtime.memberLookup((t_14),\"tid\") == runtime.memberLookup((t_6),\"sid\")) {\noutput += \"\\n      <div class=\\\"media doc-topic-post mt-3 border border-warning\\\"\\n           data-sid=\\\"\";\noutput += runtime.suppressValue(runtime.memberLookup((t_14),\"sid\"), env.opts.autoescape);\noutput += \"\\\" data-pid=\\\"\";\noutput += runtime.suppressValue(runtime.memberLookup((t_14),\"sid\"), env.opts.autoescape);\noutput += \"\\\">\\n        \";\noutput += runtime.suppressValue((lineno = 42, colno = 16, runtime.callWrap(macro_t_1, \"avatar\", context, [35,runtime.memberLookup((t_14),\"uid\")])), env.opts.autoescape);\noutput += \"\\n        <div class=\\\"media-body\\\">\\n          \";\nif(runtime.contextOrFrameLookup(context, frame, \"isAdmin\")) {\noutput += \"\\n          <a href=\\\"#\\\" class=\\\"float-right\\\" data-click=\\\"editPost\\\">edit</a>\\n          \";\n;\n}\noutput += \"\\n          \";\noutput += runtime.suppressValue(env.getFilter(\"safe\").call(context, runtime.memberLookup((t_14),\"html\")), env.opts.autoescape);\noutput += \"\\n\\n          <ul class=\\\"list-unstyled my-0\\\">\\n            \";\nframe = frame.push();\nvar t_17 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, \"forum\")),\"comments\");\nif(t_17) {t_17 = runtime.fromIterator(t_17);\nvar t_16 = t_17.length;\nfor(var t_15=0; t_15 < t_17.length; t_15++) {\nvar t_18 = t_17[t_15];\nframe.set(\"comment\", t_18);\nframe.set(\"loop.index\", t_15 + 1);\nframe.set(\"loop.index0\", t_15);\nframe.set(\"loop.revindex\", t_16 - t_15);\nframe.set(\"loop.revindex0\", t_16 - t_15 - 1);\nframe.set(\"loop.first\", t_15 === 0);\nframe.set(\"loop.last\", t_15 === t_16 - 1);\nframe.set(\"loop.length\", t_16);\nif(runtime.memberLookup((t_18),\"pid\") == runtime.memberLookup((t_14),\"sid\")) {\noutput += \"\\n            <li class=\\\"media doc-comment\\\" data-sid=\\\"\";\noutput += runtime.suppressValue(runtime.memberLookup((t_18),\"sid\"), env.opts.autoescape);\noutput += \"\\\">\\n              <div class=\\\"media-body\\\">\\n                <p class=\\\"my-0\\\"> <strong>@\";\noutput += runtime.suppressValue(runtime.memberLookup((t_18),\"uid\"), env.opts.autoescape);\noutput += \"</strong> \";\noutput += runtime.suppressValue(runtime.memberLookup((t_18),\"text\"), env.opts.autoescape);\noutput += \"\\n                  \";\nif(runtime.contextOrFrameLookup(context, frame, \"isAdmin\")) {\noutput += \"\\n                  <a href=\\\"#\\\" data-click=\\\"editComment\\\">edit</a>\\n                  \";\n;\n}\noutput += \"\\n                </p>\\n              </div>\\n            </li>\\n            \";\n;\n}\n;\n}\n}\nframe = frame.pop();\noutput += \"\\n          </ul>\\n\\n          <div class=\\\"comment-attach\\\">\\n            \";\nif(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, \"profile\")),\"_id\")) {\noutput += \"\\n            <a href=\\\"#\\\" data-click=\\\"addComment\\\">add a comment</a>\\n            \";\n;\n}\noutput += \"\\n          </div>\\n        </div>\\n      </div>\\n      \";\n;\n}\n;\n}\n}\nframe = frame.pop();\noutput += \"\\n\\n      \";\nif(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, \"profile\")),\"_id\")) {\noutput += \"\\n      <div class=\\\"topic-post-attach my-2\\\">\\n        <a class=\\\"btn btn-outline-info btn-sm\\\" data-click=\\\"addPost\\\">\\n          <span class=\\\"fa fa-plus\\\"></span> Post\\n        </a>\\n      </div>\\n      \";\n;\n}\noutput += \"\\n    </div>\\n  </div>\\n  \";\n;\n}\n;\n}\n}\nframe = frame.pop();\noutput += \"\\n\\n  \";\nvar t_19;\nt_19 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, \"profile\")),\"mode\") == \"spa\";\nframe.set(\"isSpa\", t_19, true);\nif(frame.topLevel) {\ncontext.setVariable(\"isSpa\", t_19);\n}\nif(frame.topLevel) {\ncontext.addExport(\"isSpa\", t_19);\n}\noutput += \"\\n  \";\nif(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, \"profile\")),\"_id\") || runtime.contextOrFrameLookup(context, frame, \"isSpa\")) {\noutput += \"\\n  <div class=\\\"topic-attach \";\nif(runtime.contextOrFrameLookup(context, frame, \"isSpa\")) {\noutput += \"spa\";\n;\n}\noutput += \"\\\" class=\\\"mt-2\\\">\\n    <a class=\\\"btn btn-outline-info btn-sm\\\" data-click=\\\"addTopic\\\">\\n      <span class=\\\"fa fa-plus\\\"></span> Topic\\n    </a>\\n  </div>\\n  \";\n;\n}\noutput += \"\\n\\n\";\nif(parentTemplate) {\nparentTemplate.rootRenderFunc(env, context, frame, runtime, cb);\n} else {\ncb(null, output);\n}\n;\n} catch (e) {\n  cb(runtime.handleError(e, lineno, colno));\n}\n}\nreturn {\nroot: root\n};\n\n})();\n})();\n\n\n\nmodule.exports = shim(nunjucks, env, nunjucks.nunjucksPrecompiled[\"views/doc/site-cell-topics.nunj\"] , dependencies)\n\n//# sourceURL=webpack:///./views/doc/site-cell-topics.nunj?");

/***/ }),

/***/ 0:
/*!**********************************!*\
  !*** multi ./doc-site-bundle.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./doc-site-bundle.js */\"./doc-site-bundle.js\");\n\n\n//# sourceURL=webpack:///multi_./doc-site-bundle.js?");

/***/ }),

/***/ "knockout":
/*!*********************!*\
  !*** external "ko" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = ko;\n\n//# sourceURL=webpack:///external_%22ko%22?");

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