// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({20:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = $;
/**
 * Shorter and fast way to select a single node in the DOM
 * @param   { String } selector - unique dom selector
 * @param   { Object } ctx - DOM node where the target of our search will is located
 * @returns { Object } dom node found
 */
function $(selector, ctx) {
  return (ctx || document).querySelector(selector);
}
},{}],12:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

const
// be aware, internal usage
// ATTENTION: prefix the global dynamic variables with `__`
// tags instances cache
__TAGS_CACHE = exports.__TAGS_CACHE = [],

// tags implementation cache
__TAG_IMPL = exports.__TAG_IMPL = {},
      YIELD_TAG = exports.YIELD_TAG = 'yield',


/**
 * Const
 */
GLOBAL_MIXIN = exports.GLOBAL_MIXIN = '__global_mixin',


// riot specific prefixes or attributes
ATTRS_PREFIX = exports.ATTRS_PREFIX = 'riot-',


// Riot Directives
REF_DIRECTIVES = exports.REF_DIRECTIVES = ['ref', 'data-ref'],
      IS_DIRECTIVE = exports.IS_DIRECTIVE = 'data-is',
      CONDITIONAL_DIRECTIVE = exports.CONDITIONAL_DIRECTIVE = 'if',
      LOOP_DIRECTIVE = exports.LOOP_DIRECTIVE = 'each',
      LOOP_NO_REORDER_DIRECTIVE = exports.LOOP_NO_REORDER_DIRECTIVE = 'no-reorder',
      SHOW_DIRECTIVE = exports.SHOW_DIRECTIVE = 'show',
      HIDE_DIRECTIVE = exports.HIDE_DIRECTIVE = 'hide',
      KEY_DIRECTIVE = exports.KEY_DIRECTIVE = 'key',
      RIOT_EVENTS_KEY = exports.RIOT_EVENTS_KEY = '__riot-events__',


// for typeof == '' comparisons
T_STRING = exports.T_STRING = 'string',
      T_OBJECT = exports.T_OBJECT = 'object',
      T_UNDEF = exports.T_UNDEF = 'undefined',
      T_FUNCTION = exports.T_FUNCTION = 'function',
      XLINK_NS = exports.XLINK_NS = 'http://www.w3.org/1999/xlink',
      SVG_NS = exports.SVG_NS = 'http://www.w3.org/2000/svg',
      XLINK_REGEX = exports.XLINK_REGEX = /^xlink:(\w+)/,
      WIN = exports.WIN = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === T_UNDEF ? undefined : window,


// special native tags that cannot be treated like the others
RE_SPECIAL_TAGS = exports.RE_SPECIAL_TAGS = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?|opt(?:ion|group))$/,
      RE_SPECIAL_TAGS_NO_OPTION = exports.RE_SPECIAL_TAGS_NO_OPTION = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?)$/,
      RE_EVENTS_PREFIX = exports.RE_EVENTS_PREFIX = /^on/,
      RE_HTML_ATTRS = exports.RE_HTML_ATTRS = /([-\w]+) ?= ?(?:"([^"]*)|'([^']*)|({[^}]*}))/g,

// some DOM attributes must be normalized
CASE_SENSITIVE_ATTRIBUTES = exports.CASE_SENSITIVE_ATTRIBUTES = {
  'viewbox': 'viewBox',
  'preserveaspectratio': 'preserveAspectRatio'
},

/**
 * Matches boolean HTML attributes in the riot tag definition.
 * With a long list like this, a regex is faster than `[].indexOf` in most browsers.
 * @const {RegExp}
 * @see [attributes.md](https://github.com/riot/compiler/blob/dev/doc/attributes.md)
 */
RE_BOOL_ATTRS = exports.RE_BOOL_ATTRS = /^(?:disabled|checked|readonly|required|allowfullscreen|auto(?:focus|play)|compact|controls|default|formnovalidate|hidden|ismap|itemscope|loop|multiple|muted|no(?:resize|shade|validate|wrap)?|open|reversed|seamless|selected|sortable|truespeed|typemustmatch)$/,

// version# for IE 8-11, 0 for others
IE_VERSION = exports.IE_VERSION = (WIN && WIN.document || {}).documentMode | 0;
},{}],19:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeElement;

var _globalVariables = require('./../../global-variables');

/**
 * Create a generic DOM node
 * @param   { String } name - name of the DOM node we want to create
 * @returns { Object } DOM node just created
 */
function makeElement(name) {
  return name === 'svg' ? document.createElementNS(_globalVariables.SVG_NS, name) : document.createElement(name);
}
},{"./../../global-variables":12}],21:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setAttribute;

var _globalVariables = require('./../../global-variables');

/**
 * Set any DOM attribute
 * @param { Object } dom - DOM node we want to update
 * @param { String } name - name of the property we want to set
 * @param { String } val - value of the property we want to set
 */
function setAttribute(dom, name, val) {
  const xlink = _globalVariables.XLINK_REGEX.exec(name);
  if (xlink && xlink[1]) dom.setAttributeNS(_globalVariables.XLINK_NS, xlink[1], val);else dom.setAttribute(name, val);
}
},{"./../../global-variables":12}],11:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _$ = require('./../common/util/dom/$');

var _$2 = _interopRequireDefault(_$);

var _makeElement = require('./../common/util/dom/make-element');

var _makeElement2 = _interopRequireDefault(_makeElement);

var _setAttribute = require('./../common/util/dom/set-attribute');

var _setAttribute2 = _interopRequireDefault(_setAttribute);

var _globalVariables = require('./../common/global-variables');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let styleNode;
// Create cache and shortcut to the correct property
let cssTextProp;
let byName = {};
let needsInject = false;

// skip the following code on the server
if (_globalVariables.WIN) {
  styleNode = (() => {
    // create a new style element with the correct type
    const newNode = (0, _makeElement2.default)('style');
    // replace any user node or insert the new one into the head
    const userNode = (0, _$2.default)('style[type=riot]');

    (0, _setAttribute2.default)(newNode, 'type', 'text/css');
    /* istanbul ignore next */
    if (userNode) {
      if (userNode.id) newNode.id = userNode.id;
      userNode.parentNode.replaceChild(newNode, userNode);
    } else document.head.appendChild(newNode);

    return newNode;
  })();
  cssTextProp = styleNode.styleSheet;
}

/**
 * Object that will be used to inject and manage the css of every tag instance
 */
exports.default = {
  styleNode: styleNode,
  /**
   * Save a tag style to be later injected into DOM
   * @param { String } css - css string
   * @param { String } name - if it's passed we will map the css to a tagname
   */
  add: function (css, name) {
    byName[name] = css;
    needsInject = true;
  },

  /**
   * Inject all previously saved tag styles into DOM
   * innerHTML seems slow: http://jsperf.com/riot-insert-style
   */
  inject: function () {
    if (!_globalVariables.WIN || !needsInject) return;
    needsInject = false;
    const style = Object.keys(byName).map(k => byName[k]).join('\n');
    /* istanbul ignore next */
    if (cssTextProp) cssTextProp.cssText = style;else styleNode.innerHTML = style;
  },


  /**
   * Remove a tag style of injected DOM later.
   * @param {String} name a registered tagname
   */
  remove: function (name) {
    delete byName[name];
    needsInject = true;
  }
};
},{"./../common/util/dom/$":20,"./../common/util/dom/make-element":19,"./../common/util/dom/set-attribute":21,"./../common/global-variables":12}],15:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * The riot template engine
 * @version v3.0.8
 */

var skipRegex = function () {
  //eslint-disable-line no-unused-vars

  var beforeReChars = '[{(,;:?=|&!^~>%*/';

  var beforeReWords = ['case', 'default', 'do', 'else', 'in', 'instanceof', 'prefix', 'return', 'typeof', 'void', 'yield'];

  var wordsLastChar = beforeReWords.reduce(function (s, w) {
    return s + w.slice(-1);
  }, '');

  var RE_REGEX = /^\/(?=[^*>/])[^[/\\]*(?:(?:\\.|\[(?:\\.|[^\]\\]*)*\])[^[\\/]*)*?\/[gimuy]*/;
  var RE_VN_CHAR = /[$\w]/;

  function prev(code, pos) {
    while (--pos >= 0 && /\s/.test(code[pos]));
    return pos;
  }

  function _skipRegex(code, start) {

    var re = /.*/g;
    var pos = re.lastIndex = start++;
    var match = re.exec(code)[0].match(RE_REGEX);

    if (match) {
      var next = pos + match[0].length;

      pos = prev(code, pos);
      var c = code[pos];

      if (pos < 0 || ~beforeReChars.indexOf(c)) {
        return next;
      }

      if (c === '.') {

        if (code[pos - 1] === '.') {
          start = next;
        }
      } else if (c === '+' || c === '-') {

        if (code[--pos] !== c || (pos = prev(code, pos)) < 0 || !RE_VN_CHAR.test(code[pos])) {
          start = next;
        }
      } else if (~wordsLastChar.indexOf(c)) {

        var end = pos + 1;

        while (--pos >= 0 && RE_VN_CHAR.test(code[pos]));
        if (~beforeReWords.indexOf(code.slice(pos + 1, end))) {
          start = next;
        }
      }
    }

    return start;
  }

  return _skipRegex;
}();

/**
 * riot.util.brackets
 *
 * - `brackets    ` - Returns a string or regex based on its parameter
 * - `brackets.set` - Change the current riot brackets
 *
 * @module
 */

/* global riot */

var brackets = exports.brackets = function (UNDEF) {

  var REGLOB = 'g',
      R_MLCOMMS = /\/\*[^*]*\*+(?:[^*\/][^*]*\*+)*\//g,
      R_STRINGS = /"[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'|`[^`\\]*(?:\\[\S\s][^`\\]*)*`/g,
      S_QBLOCKS = R_STRINGS.source + '|' + /(?:\breturn\s+|(?:[$\w\)\]]|\+\+|--)\s*(\/)(?![*\/]))/.source + '|' + /\/(?=[^*\/])[^[\/\\]*(?:(?:\[(?:\\.|[^\]\\]*)*\]|\\.)[^[\/\\]*)*?([^<]\/)[gim]*/.source,
      UNSUPPORTED = RegExp('[\\' + 'x00-\\x1F<>a-zA-Z0-9\'",;\\\\]'),
      NEED_ESCAPE = /(?=[[\]()*+?.^$|])/g,
      S_QBLOCK2 = R_STRINGS.source + '|' + /(\/)(?![*\/])/.source,
      FINDBRACES = {
    '(': RegExp('([()])|' + S_QBLOCK2, REGLOB),
    '[': RegExp('([[\\]])|' + S_QBLOCK2, REGLOB),
    '{': RegExp('([{}])|' + S_QBLOCK2, REGLOB)
  },
      DEFAULT = '{ }';

  var _pairs = ['{', '}', '{', '}', /{[^}]*}/, /\\([{}])/g, /\\({)|{/g, RegExp('\\\\(})|([[({])|(})|' + S_QBLOCK2, REGLOB), DEFAULT, /^\s*{\^?\s*([$\w]+)(?:\s*,\s*(\S+))?\s+in\s+(\S.*)\s*}/, /(^|[^\\]){=[\S\s]*?}/];

  var cachedBrackets = UNDEF,
      _regex,
      _cache = [],
      _settings;

  function _loopback(re) {
    return re;
  }

  function _rewrite(re, bp) {
    if (!bp) bp = _cache;
    return new RegExp(re.source.replace(/{/g, bp[2]).replace(/}/g, bp[3]), re.global ? REGLOB : '');
  }

  function _create(pair) {
    if (pair === DEFAULT) return _pairs;

    var arr = pair.split(' ');

    if (arr.length !== 2 || UNSUPPORTED.test(pair)) {
      throw new Error('Unsupported brackets "' + pair + '"');
    }
    arr = arr.concat(pair.replace(NEED_ESCAPE, '\\').split(' '));

    arr[4] = _rewrite(arr[1].length > 1 ? /{[\S\s]*?}/ : _pairs[4], arr);
    arr[5] = _rewrite(pair.length > 3 ? /\\({|})/g : _pairs[5], arr);
    arr[6] = _rewrite(_pairs[6], arr);
    arr[7] = RegExp('\\\\(' + arr[3] + ')|([[({])|(' + arr[3] + ')|' + S_QBLOCK2, REGLOB);
    arr[8] = pair;
    return arr;
  }

  function _brackets(reOrIdx) {
    return reOrIdx instanceof RegExp ? _regex(reOrIdx) : _cache[reOrIdx];
  }

  _brackets.split = function split(str, tmpl, _bp) {
    // istanbul ignore next: _bp is for the compiler
    if (!_bp) _bp = _cache;

    var parts = [],
        match,
        isexpr,
        start,
        pos,
        re = _bp[6];

    var qblocks = [];
    var prevStr = '';
    var mark, lastIndex;

    isexpr = start = re.lastIndex = 0;

    while (match = re.exec(str)) {

      lastIndex = re.lastIndex;
      pos = match.index;

      if (isexpr) {

        if (match[2]) {

          var ch = match[2];
          var rech = FINDBRACES[ch];
          var ix = 1;

          rech.lastIndex = lastIndex;
          while (match = rech.exec(str)) {
            if (match[1]) {
              if (match[1] === ch) ++ix;else if (! --ix) break;
            } else {
              rech.lastIndex = pushQBlock(match.index, rech.lastIndex, match[2]);
            }
          }
          re.lastIndex = ix ? str.length : rech.lastIndex;
          continue;
        }

        if (!match[3]) {
          re.lastIndex = pushQBlock(pos, lastIndex, match[4]);
          continue;
        }
      }

      if (!match[1]) {
        unescapeStr(str.slice(start, pos));
        start = re.lastIndex;
        re = _bp[6 + (isexpr ^= 1)];
        re.lastIndex = start;
      }
    }

    if (str && start < str.length) {
      unescapeStr(str.slice(start));
    }

    parts.qblocks = qblocks;

    return parts;

    function unescapeStr(s) {
      if (prevStr) {
        s = prevStr + s;
        prevStr = '';
      }
      if (tmpl || isexpr) {
        parts.push(s && s.replace(_bp[5], '$1'));
      } else {
        parts.push(s);
      }
    }

    function pushQBlock(_pos, _lastIndex, slash) {
      //eslint-disable-line
      if (slash) {
        _lastIndex = skipRegex(str, _pos);
      }

      if (tmpl && _lastIndex > _pos + 2) {
        mark = '\u2057' + qblocks.length + '~';
        qblocks.push(str.slice(_pos, _lastIndex));
        prevStr += str.slice(start, _pos) + mark;
        start = _lastIndex;
      }
      return _lastIndex;
    }
  };

  _brackets.hasExpr = function hasExpr(str) {
    return _cache[4].test(str);
  };

  _brackets.loopKeys = function loopKeys(expr) {
    var m = expr.match(_cache[9]);

    return m ? { key: m[1], pos: m[2], val: _cache[0] + m[3].trim() + _cache[1] } : { val: expr.trim() };
  };

  _brackets.array = function array(pair) {
    return pair ? _create(pair) : _cache;
  };

  function _reset(pair) {
    if ((pair || (pair = DEFAULT)) !== _cache[8]) {
      _cache = _create(pair);
      _regex = pair === DEFAULT ? _loopback : _rewrite;
      _cache[9] = _regex(_pairs[9]);
    }
    cachedBrackets = pair;
  }

  function _setSettings(o) {
    var b;

    o = o || {};
    b = o.brackets;
    Object.defineProperty(o, 'brackets', {
      set: _reset,
      get: function () {
        return cachedBrackets;
      },
      enumerable: true
    });
    _settings = o;
    _reset(b);
  }

  Object.defineProperty(_brackets, 'settings', {
    set: _setSettings,
    get: function () {
      return _settings;
    }
  });

  /* istanbul ignore next: in the browser riot is always in the scope */
  _brackets.settings = typeof riot !== 'undefined' && riot.settings || {};
  _brackets.set = _reset;
  _brackets.skipRegex = skipRegex;

  _brackets.R_STRINGS = R_STRINGS;
  _brackets.R_MLCOMMS = R_MLCOMMS;
  _brackets.S_QBLOCKS = S_QBLOCKS;
  _brackets.S_QBLOCK2 = S_QBLOCK2;

  return _brackets;
}();

/**
 * @module tmpl
 *
 * tmpl          - Root function, returns the template value, render with data
 * tmpl.hasExpr  - Test the existence of a expression inside a string
 * tmpl.loopKeys - Get the keys for an 'each' loop (used by `_each`)
 */

var tmpl = exports.tmpl = function () {

  var _cache = {};

  function _tmpl(str, data) {
    if (!str) return str;

    return (_cache[str] || (_cache[str] = _create(str))).call(data, _logErr.bind({
      data: data,
      tmpl: str
    }));
  }

  _tmpl.hasExpr = brackets.hasExpr;

  _tmpl.loopKeys = brackets.loopKeys;

  // istanbul ignore next
  _tmpl.clearCache = function () {
    _cache = {};
  };

  _tmpl.errorHandler = null;

  function _logErr(err, ctx) {

    err.riotData = {
      tagName: ctx && ctx.__ && ctx.__.tagName,
      _riot_id: ctx && ctx._riot_id //eslint-disable-line camelcase
    };

    if (_tmpl.errorHandler) _tmpl.errorHandler(err);else if (typeof console !== 'undefined' && typeof console.error === 'function') {
      console.error(err.message);
      console.log('<%s> %s', err.riotData.tagName || 'Unknown tag', this.tmpl); // eslint-disable-line
      console.log(this.data); // eslint-disable-line
    }
  }

  function _create(str) {
    var expr = _getTmpl(str);

    if (expr.slice(0, 11) !== 'try{return ') expr = 'return ' + expr;

    return new Function('E', expr + ';'); // eslint-disable-line no-new-func
  }

  var RE_DQUOTE = /\u2057/g;
  var RE_QBMARK = /\u2057(\d+)~/g;

  function _getTmpl(str) {
    var parts = brackets.split(str.replace(RE_DQUOTE, '"'), 1);
    var qstr = parts.qblocks;
    var expr;

    if (parts.length > 2 || parts[0]) {
      var i,
          j,
          list = [];

      for (i = j = 0; i < parts.length; ++i) {

        expr = parts[i];

        if (expr && (expr = i & 1 ? _parseExpr(expr, 1, qstr) : '"' + expr.replace(/\\/g, '\\\\').replace(/\r\n?|\n/g, '\\n').replace(/"/g, '\\"') + '"')) list[j++] = expr;
      }

      expr = j < 2 ? list[0] : '[' + list.join(',') + '].join("")';
    } else {

      expr = _parseExpr(parts[1], 0, qstr);
    }

    if (qstr.length) {
      expr = expr.replace(RE_QBMARK, function (_, pos) {
        return qstr[pos].replace(/\r/g, '\\r').replace(/\n/g, '\\n');
      });
    }
    return expr;
  }

  var RE_CSNAME = /^(?:(-?[_A-Za-z\xA0-\xFF][-\w\xA0-\xFF]*)|\u2057(\d+)~):/;
  var RE_BREND = {
    '(': /[()]/g,
    '[': /[[\]]/g,
    '{': /[{}]/g
  };

  function _parseExpr(expr, asText, qstr) {

    expr = expr.replace(/\s+/g, ' ').trim().replace(/\ ?([[\({},?\.:])\ ?/g, '$1');

    if (expr) {
      var list = [],
          cnt = 0,
          match;

      while (expr && (match = expr.match(RE_CSNAME)) && !match.index) {
        var key,
            jsb,
            re = /,|([[{(])|$/g;

        expr = RegExp.rightContext;
        key = match[2] ? qstr[match[2]].slice(1, -1).trim().replace(/\s+/g, ' ') : match[1];

        while (jsb = (match = re.exec(expr))[1]) skipBraces(jsb, re);

        jsb = expr.slice(0, match.index);
        expr = RegExp.rightContext;

        list[cnt++] = _wrapExpr(jsb, 1, key);
      }

      expr = !cnt ? _wrapExpr(expr, asText) : cnt > 1 ? '[' + list.join(',') + '].join(" ").trim()' : list[0];
    }
    return expr;

    function skipBraces(ch, re) {
      var mm,
          lv = 1,
          ir = RE_BREND[ch];

      ir.lastIndex = re.lastIndex;
      while (mm = ir.exec(expr)) {
        if (mm[0] === ch) ++lv;else if (! --lv) break;
      }
      re.lastIndex = lv ? expr.length : ir.lastIndex;
    }
  }

  // istanbul ignore next: not both
  var // eslint-disable-next-line max-len
  JS_CONTEXT = '"in this?this:' + (typeof window !== 'object' ? 'global' : 'window') + ').',
      JS_VARNAME = /[,{][\$\w]+(?=:)|(^ *|[^$\w\.{])(?!(?:typeof|true|false|null|undefined|in|instanceof|is(?:Finite|NaN)|void|NaN|new|Date|RegExp|Math)(?![$\w]))([$_A-Za-z][$\w]*)/g,
      JS_NOPROPS = /^(?=(\.[$\w]+))\1(?:[^.[(]|$)/;

  function _wrapExpr(expr, asText, key) {
    var tb;

    expr = expr.replace(JS_VARNAME, function (match, p, mvar, pos, s) {
      if (mvar) {
        pos = tb ? 0 : pos + match.length;

        if (mvar !== 'this' && mvar !== 'global' && mvar !== 'window') {
          match = p + '("' + mvar + JS_CONTEXT + mvar;
          if (pos) tb = (s = s[pos]) === '.' || s === '(' || s === '[';
        } else if (pos) {
          tb = !JS_NOPROPS.test(s.slice(pos));
        }
      }
      return match;
    });

    if (tb) {
      expr = 'try{return ' + expr + '}catch(e){E(e,this)}';
    }

    if (key) {

      expr = (tb ? 'function(){' + expr + '}.call(this)' : '(' + expr + ')') + '?"' + key + '":""';
    } else if (asText) {

      expr = 'function(v){' + (tb ? expr.replace('return ', 'v=') : 'v=(' + expr + ')') + ';return v||v===0?v:""}.call(this)';
    }

    return expr;
  }

  _tmpl.version = brackets.version = 'v3.0.8';

  return _tmpl;
}();
},{}],14:[function(require,module,exports) {
var define;
;(function(window, undefined) {var observable = function(el) {

  /**
   * Extend the original object or create a new empty one
   * @type { Object }
   */

  el = el || {}

  /**
   * Private variables
   */
  var callbacks = {},
    slice = Array.prototype.slice

  /**
   * Public Api
   */

  // extend the el object adding the observable methods
  Object.defineProperties(el, {
    /**
     * Listen to the given `event` ands
     * execute the `callback` each time an event is triggered.
     * @param  { String } event - event id
     * @param  { Function } fn - callback function
     * @returns { Object } el
     */
    on: {
      value: function(event, fn) {
        if (typeof fn == 'function')
          (callbacks[event] = callbacks[event] || []).push(fn)
        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Removes the given `event` listeners
     * @param   { String } event - event id
     * @param   { Function } fn - callback function
     * @returns { Object } el
     */
    off: {
      value: function(event, fn) {
        if (event == '*' && !fn) callbacks = {}
        else {
          if (fn) {
            var arr = callbacks[event]
            for (var i = 0, cb; cb = arr && arr[i]; ++i) {
              if (cb == fn) arr.splice(i--, 1)
            }
          } else delete callbacks[event]
        }
        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Listen to the given `event` and
     * execute the `callback` at most once
     * @param   { String } event - event id
     * @param   { Function } fn - callback function
     * @returns { Object } el
     */
    one: {
      value: function(event, fn) {
        function on() {
          el.off(event, on)
          fn.apply(el, arguments)
        }
        return el.on(event, on)
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Execute all callback functions that listen to
     * the given `event`
     * @param   { String } event - event id
     * @returns { Object } el
     */
    trigger: {
      value: function(event) {

        // getting the arguments
        var arglen = arguments.length - 1,
          args = new Array(arglen),
          fns,
          fn,
          i

        for (i = 0; i < arglen; i++) {
          args[i] = arguments[i + 1] // skip first argument
        }

        fns = slice.call(callbacks[event] || [], 0)

        for (i = 0; fn = fns[i]; ++i) {
          fn.apply(el, args)
        }

        if (callbacks['*'] && event != '*')
          el.trigger.apply(el, ['*', event].concat(args))

        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    }
  })

  return el

}
  /* istanbul ignore next */
  // support CommonJS, AMD & browser
  if (typeof exports === 'object')
    module.exports = observable
  else if (typeof define === 'function' && define.amd)
    define(function() { return observable })
  else
    window.observable = observable

})(typeof window != 'undefined' ? window : undefined);
},{}],48:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPropDescriptor;
/**
 * Short alias for Object.getOwnPropertyDescriptor
 */
function getPropDescriptor(o, k) {
  return Object.getOwnPropertyDescriptor(o, k);
}
},{}],22:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = isUndefined;

var _globalVariables = require('./../../global-variables');

/**
 * Check if passed argument is undefined
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isUndefined(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === _globalVariables.T_UNDEF;
}
},{"./../../global-variables":12}],35:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isWritable;

var _getPropDescriptor = require('../misc/get-prop-descriptor');

var _getPropDescriptor2 = _interopRequireDefault(_getPropDescriptor);

var _isUndefined = require('./is-undefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Check whether object's property could be overridden
 * @param   { Object }  obj - source object
 * @param   { String }  key - object property
 * @returns { Boolean } true if writable
 */
function isWritable(obj, key) {
  const descriptor = (0, _getPropDescriptor2.default)(obj, key);
  return (0, _isUndefined2.default)(obj[key]) || descriptor && descriptor.writable;
}
},{"../misc/get-prop-descriptor":48,"./is-undefined":22}],18:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extend;

var _isWritable = require('../checks/is-writable');

var _isWritable2 = _interopRequireDefault(_isWritable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Extend any object with other properties
 * @param   { Object } src - source object
 * @returns { Object } the resulting extended object
 *
 * var obj = { foo: 'baz' }
 * extend(obj, {bar: 'bar', foo: 'bar'})
 * console.log(obj) => {bar: 'bar', foo: 'bar'}
 *
 */
function extend(src) {
  let obj;
  let i = 1;
  const args = arguments;
  const l = args.length;

  for (; i < l; i++) {
    if (obj = args[i]) {
      for (const key in obj) {
        // check if this property of the source object could be overridden
        if ((0, _isWritable2.default)(src, key)) src[key] = obj[key];
      }
    }
  }
  return src;
}
},{"../checks/is-writable":35}],17:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = create;
/**
 * Alias for Object.create
 */
function create(src) {
  return Object.create(src);
}
},{}],10:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extend = require('./browser/common/util/misc/extend');

var _extend2 = _interopRequireDefault(_extend);

var _objectCreate = require('./browser/common/util/misc/object-create');

var _objectCreate2 = _interopRequireDefault(_objectCreate);

var _riotTmpl = require('riot-tmpl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _extend2.default)((0, _objectCreate2.default)(_riotTmpl.brackets.settings), {
  skipAnonymousTags: true,
  // handle the auto updates on any DOM event
  autoUpdate: true
});
},{"./browser/common/util/misc/extend":18,"./browser/common/util/misc/object-create":17,"riot-tmpl":15}],27:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = $$;
/**
 * Shorter and fast way to select multiple nodes in the DOM
 * @param   { String } selector - DOM selector
 * @param   { Object } ctx - DOM node where the targets of our search will is located
 * @returns { Object } dom nodes found
 */
function $$(selector, ctx) {
  return [].slice.call((ctx || document).querySelectorAll(selector));
}
},{}],38:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createDOMPlaceholder;
/**
 * Create a document text node
 * @returns { Object } create a text node to use as placeholder
 */
function createDOMPlaceholder() {
  return document.createTextNode('');
}
},{}],39:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toggleVisibility;
/**
 * Toggle the visibility of any DOM node
 * @param   { Object }  dom - DOM node we want to hide
 * @param   { Boolean } show - do we want to show it?
 */

function toggleVisibility(dom, show) {
  dom.style.display = show ? '' : 'none';
  dom.hidden = show ? false : true;
}
},{}],26:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getAttribute;
/**
 * Get the value of any DOM attribute on a node
 * @param   { Object } dom - DOM node we want to parse
 * @param   { String } name - name of the attribute we want to get
 * @returns { String | undefined } name of the node attribute whether it exists
 */
function getAttribute(dom, name) {
  return dom.getAttribute(name);
}
},{}],40:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = removeAttribute;
/**
 * Remove any DOM attribute from a node
 * @param   { Object } dom - DOM node we want to update
 * @param   { String } name - name of the property we want to remove
 */
function removeAttribute(dom, name) {
  dom.removeAttribute(name);
}
},{}],41:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setInnerHTML;

var _globalVariables = require('./../../global-variables');

/**
 * Set the inner html of any DOM node SVGs included
 * @param { Object } container - DOM node where we'll inject new html
 * @param { String } html - html to inject
 * @param { Boolean } isSvg - svg tags should be treated a bit differently
 */
/* istanbul ignore next */
function setInnerHTML(container, html, isSvg) {
  // innerHTML is not supported on svg tags so we neet to treat them differently
  if (isSvg) {
    const node = container.ownerDocument.importNode(new DOMParser().parseFromString('<svg xmlns="' + _globalVariables.SVG_NS + '">' + html + '</svg>', 'application/xml').documentElement, true);

    container.appendChild(node);
  } else {
    container.innerHTML = html;
  }
}
},{"./../../global-variables":12}],42:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = walkAttributes;

var _globalVariables = require('./../../global-variables');

/**
 * Minimize risk: only zero or one _space_ between attr & value
 * @param   { String }   html - html string we want to parse
 * @param   { Function } fn - callback function to apply on any attribute found
 */
function walkAttributes(html, fn) {
  if (!html) return;
  let m;
  while (m = _globalVariables.RE_HTML_ATTRS.exec(html)) fn(m[1].toLowerCase(), m[2] || m[3] || m[4]);
}
},{"./../../global-variables":12}],43:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createFragment;
/**
 * Create a document fragment
 * @returns { Object } document fragment
 */
function createFragment() {
  return document.createDocumentFragment();
}
},{}],44:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = safeInsert;
/**
 * Insert safely a tag to fix #1962 #1649
 * @param   { HTMLElement } root - children container
 * @param   { HTMLElement } curr - node to insert
 * @param   { HTMLElement } next - node that should preceed the current node inserted
 */
function safeInsert(root, curr, next) {
  root.insertBefore(curr, next.parentNode && next);
}
},{}],45:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = styleObjectToString;
/**
 * Convert a style object to a string
 * @param   { Object } style - style object we need to parse
 * @returns { String } resulting css string
 * @example
 * styleObjectToString({ color: 'red', height: '10px'}) // => 'color: red; height: 10px'
 */
function styleObjectToString(style) {
  return Object.keys(style).reduce((acc, prop) => {
    return acc + ' ' + prop + ': ' + style[prop] + ';';
  }, '');
}
},{}],46:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = walkNodes;
/**
 * Walk down recursively all the children tags starting dom node
 * @param   { Object }   dom - starting node where we will start the recursion
 * @param   { Function } fn - callback to transform the child node just found
 * @param   { Object }   context - fn can optionally return an object, which is passed to children
 */
function walkNodes(dom, fn, context) {
  if (dom) {
    const res = fn(dom, context);
    let next;
    // stop the recursion
    if (res === false) return;

    dom = dom.firstChild;

    while (dom) {
      next = dom.nextSibling;
      walkNodes(dom, fn, res);
      dom = next;
    }
  }
}
},{}],31:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _$$ = require('./$$');

Object.defineProperty(exports, '$$', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_$$).default;
  }
});

var _$ = require('./$');

Object.defineProperty(exports, '$', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_$).default;
  }
});

var _createPlaceholder = require('./create-placeholder');

Object.defineProperty(exports, 'createDOMPlaceholder', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_createPlaceholder).default;
  }
});

var _makeElement = require('./make-element');

Object.defineProperty(exports, 'mkEl', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_makeElement).default;
  }
});

var _setAttribute = require('./set-attribute');

Object.defineProperty(exports, 'setAttr', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_setAttribute).default;
  }
});

var _toggleVisibility = require('./toggle-visibility');

Object.defineProperty(exports, 'toggleVisibility', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_toggleVisibility).default;
  }
});

var _getAttribute = require('./get-attribute');

Object.defineProperty(exports, 'getAttr', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_getAttribute).default;
  }
});

var _removeAttribute = require('./remove-attribute');

Object.defineProperty(exports, 'remAttr', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_removeAttribute).default;
  }
});

var _setInnerHTML = require('./set-inner-HTML');

Object.defineProperty(exports, 'setInnerHTML', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_setInnerHTML).default;
  }
});

var _walkAttributes = require('./walk-attributes');

Object.defineProperty(exports, 'walkAttrs', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_walkAttributes).default;
  }
});

var _createFragment = require('./create-fragment');

Object.defineProperty(exports, 'createFrag', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_createFragment).default;
  }
});

var _safeInsert = require('./safe-insert');

Object.defineProperty(exports, 'safeInsert', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_safeInsert).default;
  }
});

var _styleObjectToString = require('./style-object-to-string');

Object.defineProperty(exports, 'styleObjectToString', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_styleObjectToString).default;
  }
});

var _walkNodes = require('./walk-nodes');

Object.defineProperty(exports, 'walkNodes', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_walkNodes).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./$$":27,"./$":20,"./create-placeholder":38,"./make-element":19,"./set-attribute":21,"./toggle-visibility":39,"./get-attribute":26,"./remove-attribute":40,"./set-inner-HTML":41,"./walk-attributes":42,"./create-fragment":43,"./safe-insert":44,"./style-object-to-string":45,"./walk-nodes":46}],57:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isNil;

var _isUndefined = require('./is-undefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Check against the null and undefined values
 * @param   { * }  value -
 * @returns {Boolean} -
 */
function isNil(value) {
  return (0, _isUndefined2.default)(value) || value === null;
}
},{"./is-undefined":22}],53:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isBlank;

var _isNil = require('./is-nil');

var _isNil2 = _interopRequireDefault(_isNil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Check if passed argument is empty. Different from falsy, because we dont consider 0 or false to be blank
 * @param { * } value -
 * @returns { Boolean } -
 */
function isBlank(value) {
  return (0, _isNil2.default)(value) || value === '';
}
},{"./is-nil":57}],25:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = isFunction;

var _globalVariables = require('./../../global-variables');

/**
 * Check if passed argument is a function
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isFunction(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === _globalVariables.T_FUNCTION;
}
},{"./../../global-variables":12}],24:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = isObject;

var _globalVariables = require('./../../global-variables');

/**
 * Check if passed argument is an object, exclude null
 * NOTE: use isObject(x) && !isArray(x) to excludes arrays.
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isObject(value) {
  return value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === _globalVariables.T_OBJECT; // typeof null is 'object'
}
},{"./../../global-variables":12}],54:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSvg;
/**
 * Check if a DOM node is an svg tag or part of an svg
 * @param   { HTMLElement }  el - node we want to test
 * @returns {Boolean} true if it's an svg node
 */
function isSvg(el) {
  const owner = el.ownerSVGElement;
  return !!owner || owner === null;
}
},{}],55:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isArray;
/**
 * Check if passed argument is a kind of array
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isArray(value) {
  return Array.isArray(value) || value instanceof Array;
}
},{}],56:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isBoolAttr;

var _globalVariables = require('./../../global-variables');

/**
 * Check if the passed argument is a boolean attribute
 * @param   { String } value -
 * @returns { Boolean } -
 */
function isBoolAttr(value) {
  return _globalVariables.RE_BOOL_ATTRS.test(value);
}
},{"./../../global-variables":12}],23:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = isString;

var _globalVariables = require('./../../global-variables');

/**
 * Check if passed argument is a string
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isString(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === _globalVariables.T_STRING;
}
},{"./../../global-variables":12}],32:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isBlank = require('./is-blank');

Object.defineProperty(exports, 'isBlank', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_isBlank).default;
  }
});

var _isFunction = require('./is-function');

Object.defineProperty(exports, 'isFunction', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_isFunction).default;
  }
});

var _isObject = require('./is-object');

Object.defineProperty(exports, 'isObject', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_isObject).default;
  }
});

var _isSvg = require('./is-svg');

Object.defineProperty(exports, 'isSvg', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_isSvg).default;
  }
});

var _isWritable = require('./is-writable');

Object.defineProperty(exports, 'isWritable', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_isWritable).default;
  }
});

var _isArray = require('./is-array');

Object.defineProperty(exports, 'isArray', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_isArray).default;
  }
});

var _isBooleanAttribute = require('./is-boolean-attribute');

Object.defineProperty(exports, 'isBoolAttr', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_isBooleanAttribute).default;
  }
});

var _isNil = require('./is-nil');

Object.defineProperty(exports, 'isNil', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_isNil).default;
  }
});

var _isString = require('./is-string');

Object.defineProperty(exports, 'isString', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_isString).default;
  }
});

var _isUndefined = require('./is-undefined');

Object.defineProperty(exports, 'isUndefined', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_isUndefined).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./is-blank":53,"./is-function":25,"./is-object":24,"./is-svg":54,"./is-writable":35,"./is-array":55,"./is-boolean-attribute":56,"./is-nil":57,"./is-string":23,"./is-undefined":22}],37:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = contains;
/**
 * Check whether an array contains an item
 * @param   { Array } array - target array
 * @param   { * } item - item to test
 * @returns { Boolean } -
 */
function contains(array, item) {
  return array.indexOf(item) !== -1;
}
},{}],28:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = each;
/**
 * Specialized function for looping an array-like collection with `each={}`
 * @param   { Array } list - collection of items
 * @param   {Function} fn - callback function
 * @returns { Array } the array looped
 */
function each(list, fn) {
  const len = list ? list.length : 0;
  let i = 0;
  for (; i < len; i++) fn(list[i], i);
  return list;
}
},{}],47:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startsWith;
/**
 * Faster String startsWith alternative
 * @param   { String } str - source string
 * @param   { String } value - test string
 * @returns { Boolean } -
 */
function startsWith(str, value) {
  return str.slice(0, value.length) === value;
}
},{}],49:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Function returning always a unique identifier
 * @returns { Number } - number from 0...n
 */
exports.default = function uid() {
  let i = -1;
  return () => ++i;
}();
},{}],50:[function(require,module,exports) {

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = define;

var _extend = require('./extend');

var _extend2 = _interopRequireDefault(_extend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Helper function to set an immutable property
 * @param   { Object } el - object where the new property will be set
 * @param   { String } key - object key where the new property will be stored
 * @param   { * } value - value of the new property
 * @param   { Object } options - set the propery overriding the default options
 * @returns { Object } - the initial object
 */
function define(el, key, value, options) {
  Object.defineProperty(el, key, (0, _extend2.default)({
    value: value,
    enumerable: false,
    writable: false,
    configurable: true
  }, options));
  return el;
}
},{"./extend":18}],51:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toCamel;
/**
 * Convert a string containing dashes to camel case
 * @param   { String } str - input string
 * @returns { String } my-string -> myString
 */
function toCamel(str) {
  return str.replace(/-(\w)/g, (_, c) => c.toUpperCase());
}
},{}],52:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = warn;
/**
 * Warn a message via console
 * @param   {String} message - warning message
 */
function warn(message) {
  if (console && console.warn) console.warn(message);
}
},{}],33:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _contains = require('./contains');

Object.defineProperty(exports, 'contains', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_contains).default;
  }
});

var _each = require('./each');

Object.defineProperty(exports, 'each', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_each).default;
  }
});

var _getPropDescriptor = require('./get-prop-descriptor');

Object.defineProperty(exports, 'getPropDescriptor', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_getPropDescriptor).default;
  }
});

var _startsWith = require('./starts-with');

Object.defineProperty(exports, 'startsWith', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_startsWith).default;
  }
});

var _uid = require('./uid');

Object.defineProperty(exports, 'uid', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_uid).default;
  }
});

var _define = require('./define');

Object.defineProperty(exports, 'defineProperty', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_define).default;
  }
});

var _objectCreate = require('./object-create');

Object.defineProperty(exports, 'objectCreate', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_objectCreate).default;
  }
});

var _extend = require('./extend');

Object.defineProperty(exports, 'extend', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_extend).default;
  }
});

var _toCamel = require('./to-camel');

Object.defineProperty(exports, 'toCamel', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_toCamel).default;
  }
});

var _warn = require('./warn');

Object.defineProperty(exports, 'warn', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_warn).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./contains":37,"./each":28,"./get-prop-descriptor":48,"./starts-with":47,"./uid":49,"./define":50,"./object-create":17,"./extend":18,"./to-camel":51,"./warn":52}],58:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = arrayishAdd;

var _isArray = require('../checks/is-array');

var _isArray2 = _interopRequireDefault(_isArray);

var _isUndefined = require('../checks/is-undefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Set the property of an object for a given key. If something already
 * exists there, then it becomes an array containing both the old and new value.
 * @param { Object } obj - object on which to set the property
 * @param { String } key - property name
 * @param { Object } value - the value of the property to be set
 * @param { Boolean } ensureArray - ensure that the property remains an array
 * @param { Number } index - add the new item in a certain array position
 */
function arrayishAdd(obj, key, value, ensureArray, index) {
  const dest = obj[key];
  const isArr = (0, _isArray2.default)(dest);
  const hasIndex = !(0, _isUndefined2.default)(index);

  if (dest && dest === value) return;

  // if the key was never set, set it once
  if (!dest && ensureArray) obj[key] = [value];else if (!dest) obj[key] = value;
  // if it was an array and not yet set
  else {
      if (isArr) {
        const oldIndex = dest.indexOf(value);
        // this item never changed its position
        if (oldIndex === index) return;
        // remove the item from its old position
        if (oldIndex !== -1) dest.splice(oldIndex, 1);
        // move or add the item
        if (hasIndex) {
          dest.splice(index, 0, value);
        } else {
          dest.push(value);
        }
      } else obj[key] = [dest, value];
    }
}
},{"../checks/is-array":55,"../checks/is-undefined":22}],62:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = get;

var _globalVariables = require('./../../global-variables');

var _getAttribute = require('../dom/get-attribute');

var _getAttribute2 = _interopRequireDefault(_getAttribute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Detect the tag implementation by a DOM node
 * @param   { Object } dom - DOM node we need to parse to get its tag implementation
 * @returns { Object } it returns an object containing the implementation of a custom tag (template and boot function)
 */
function get(dom) {
  return dom.tagName && _globalVariables.__TAG_IMPL[(0, _getAttribute2.default)(dom, _globalVariables.IS_DIRECTIVE) || (0, _getAttribute2.default)(dom, _globalVariables.IS_DIRECTIVE) || dom.tagName.toLowerCase()];
}
},{"./../../global-variables":12,"../dom/get-attribute":26}],59:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getName;

var _globalVariables = require('./../../global-variables');

var _riotTmpl = require('riot-tmpl');

var _get = require('./get');

var _get2 = _interopRequireDefault(_get);

var _getAttribute = require('../dom/get-attribute');

var _getAttribute2 = _interopRequireDefault(_getAttribute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get the tag name of any DOM node
 * @param   { Object } dom - DOM node we want to parse
 * @param   { Boolean } skipDataIs - hack to ignore the data-is attribute when attaching to parent
 * @returns { String } name to identify this dom node in riot
 */
function getName(dom, skipDataIs) {
  const child = (0, _get2.default)(dom);
  const namedTag = !skipDataIs && (0, _getAttribute2.default)(dom, _globalVariables.IS_DIRECTIVE);
  return namedTag && !_riotTmpl.tmpl.hasExpr(namedTag) ? namedTag : child ? child.name : dom.tagName.toLowerCase();
}
},{"./../../global-variables":12,"riot-tmpl":15,"./get":62,"../dom/get-attribute":26}],60:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = inheritParentProps;

var _extend = require('../misc/extend');

var _extend2 = _interopRequireDefault(_extend);

var _objectCreate = require('../misc/object-create');

var _objectCreate2 = _interopRequireDefault(_objectCreate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Return a temporary context containing also the parent properties
 * @this Tag
 * @param { Tag } - temporary tag context containing all the parent properties
 */
function inheritParentProps() {
  if (this.parent) return (0, _extend2.default)((0, _objectCreate2.default)(this), this.parent);
  return this;
}
},{"../misc/extend":18,"../misc/object-create":17}],72:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mkdom;

var _makeElement = require('./../common/util/dom/make-element');

var _makeElement2 = _interopRequireDefault(_makeElement);

var _setInnerHTML = require('./../common/util/dom/set-inner-HTML');

var _setInnerHTML2 = _interopRequireDefault(_setInnerHTML);

var _$ = require('./../common/util/dom/$');

var _$2 = _interopRequireDefault(_$);

var _globalVariables = require('./../common/global-variables');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  Includes hacks needed for the Internet Explorer version 9 and below
  See: http://kangax.github.io/compat-table/es5/#ie8
       http://codeplanet.io/dropping-ie8/
*/

const reHasYield = /<yield\b/i,
      reYieldAll = /<yield\s*(?:\/>|>([\S\s]*?)<\/yield\s*>|>)/ig,
      reYieldSrc = /<yield\s+to=['"]([^'">]*)['"]\s*>([\S\s]*?)<\/yield\s*>/ig,
      reYieldDest = /<yield\s+from=['"]?([-\w]+)['"]?\s*(?:\/>|>([\S\s]*?)<\/yield\s*>)/ig,
      rootEls = { tr: 'tbody', th: 'tr', td: 'tr', col: 'colgroup' },
      tblTags = _globalVariables.IE_VERSION && _globalVariables.IE_VERSION < 10 ? _globalVariables.RE_SPECIAL_TAGS : _globalVariables.RE_SPECIAL_TAGS_NO_OPTION,
      GENERIC = 'div',
      SVG = 'svg';

/*
  Creates the root element for table or select child elements:
  tr/th/td/thead/tfoot/tbody/caption/col/colgroup/option/optgroup
*/
function specialTags(el, tmpl, tagName) {

  let select = tagName[0] === 'o',
      parent = select ? 'select>' : 'table>';

  // trim() is important here, this ensures we don't have artifacts,
  // so we can check if we have only one element inside the parent
  el.innerHTML = '<' + parent + tmpl.trim() + '</' + parent;
  parent = el.firstChild;

  // returns the immediate parent if tr/th/td/col is the only element, if not
  // returns the whole tree, as this can include additional elements
  /* istanbul ignore next */
  if (select) {
    parent.selectedIndex = -1; // for IE9, compatible w/current riot behavior
  } else {
    // avoids insertion of cointainer inside container (ex: tbody inside tbody)
    const tname = rootEls[tagName];
    if (tname && parent.childElementCount === 1) parent = (0, _$2.default)(tname, parent);
  }
  return parent;
}

/*
  Replace the yield tag from any tag template with the innerHTML of the
  original tag in the page
*/
function replaceYield(tmpl, html) {
  // do nothing if no yield
  if (!reHasYield.test(tmpl)) return tmpl;

  // be careful with #1343 - string on the source having `$1`
  const src = {};

  html = html && html.replace(reYieldSrc, function (_, ref, text) {
    src[ref] = src[ref] || text; // preserve first definition
    return '';
  }).trim();

  return tmpl.replace(reYieldDest, function (_, ref, def) {
    // yield with from - to attrs
    return src[ref] || def || '';
  }).replace(reYieldAll, function (_, def) {
    // yield without any "from"
    return html || def || '';
  });
}

/**
 * Creates a DOM element to wrap the given content. Normally an `DIV`, but can be
 * also a `TABLE`, `SELECT`, `TBODY`, `TR`, or `COLGROUP` element.
 *
 * @param   { String } tmpl  - The template coming from the custom tag definition
 * @param   { String } html - HTML content that comes from the DOM element where you
 *           will mount the tag, mostly the original tag in the page
 * @param   { Boolean } isSvg - true if the root node is an svg
 * @returns { HTMLElement } DOM element with _tmpl_ merged through `YIELD` with the _html_.
 */
function mkdom(tmpl, html, isSvg) {
  const match = tmpl && tmpl.match(/^\s*<([-\w]+)/);
  const tagName = match && match[1].toLowerCase();
  let el = (0, _makeElement2.default)(isSvg ? SVG : GENERIC);

  // replace all the yield tags with the tag inner html
  tmpl = replaceYield(tmpl, html);

  /* istanbul ignore next */
  if (tblTags.test(tagName)) el = specialTags(el, tmpl, tagName);else (0, _setInnerHTML2.default)(el, tmpl, isSvg);

  return el;
}
},{"./../common/util/dom/make-element":19,"./../common/util/dom/set-inner-HTML":41,"./../common/util/dom/$":20,"./../common/global-variables":12}],66:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getImmediateCustomParent;
/**
 * Loop backward all the parents tree to detect the first custom parent tag
 * @param   { Object } tag - a Tag instance
 * @returns { Object } the instance of the first custom parent tag found
 */
function getImmediateCustomParent(tag) {
  let ptag = tag;
  while (ptag.__.isAnonymous) {
    if (!ptag.parent) break;
    ptag = ptag.parent;
  }
  return ptag;
}
},{}],83:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setEventHandler;

var _isWritable = require('./../common/util/checks/is-writable');

var _isWritable2 = _interopRequireDefault(_isWritable);

var _contains = require('./../common/util/misc/contains');

var _contains2 = _interopRequireDefault(_contains);

var _globalVariables = require('../common/global-variables');

var _getImmediateCustomParent = require('./../common/util/tags/get-immediate-custom-parent');

var _getImmediateCustomParent2 = _interopRequireDefault(_getImmediateCustomParent);

var _settings = require('../../settings');

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Trigger DOM events
 * @param   { HTMLElement } dom - dom element target of the event
 * @param   { Function } handler - user function
 * @param   { Object } e - event object
 */
function handleEvent(dom, handler, e) {
  let ptag = this.__.parent;
  let item = this.__.item;

  if (!item) while (ptag && !item) {
    item = ptag.__.item;
    ptag = ptag.__.parent;
  }

  // override the event properties
  /* istanbul ignore next */
  if ((0, _isWritable2.default)(e, 'currentTarget')) e.currentTarget = dom;
  /* istanbul ignore next */
  if ((0, _isWritable2.default)(e, 'target')) e.target = e.srcElement;
  /* istanbul ignore next */
  if ((0, _isWritable2.default)(e, 'which')) e.which = e.charCode || e.keyCode;

  e.item = item;

  handler.call(this, e);

  // avoid auto updates
  if (!_settings2.default.autoUpdate) return;

  if (!e.preventUpdate) {
    const p = (0, _getImmediateCustomParent2.default)(this);
    // fixes #2083
    if (p.isMounted) p.update();
  }
}

/**
 * Attach an event to a DOM node
 * @param { String } name - event name
 * @param { Function } handler - event callback
 * @param { Object } dom - dom node
 * @param { Tag } tag - tag instance
 */
function setEventHandler(name, handler, dom, tag) {
  let eventName;
  const cb = handleEvent.bind(tag, dom, handler);

  // avoid to bind twice the same event
  // possible fix for #2332
  dom[name] = null;

  // normalize event name
  eventName = name.replace(_globalVariables.RE_EVENTS_PREFIX, '');

  // cache the listener into the listeners array
  if (!(0, _contains2.default)(tag.__.listeners, dom)) tag.__.listeners.push(dom);
  if (!dom[_globalVariables.RIOT_EVENTS_KEY]) dom[_globalVariables.RIOT_EVENTS_KEY] = {};
  if (dom[_globalVariables.RIOT_EVENTS_KEY][name]) dom.removeEventListener(eventName, dom[_globalVariables.RIOT_EVENTS_KEY][name]);

  dom[_globalVariables.RIOT_EVENTS_KEY][name] = cb;
  dom.addEventListener(eventName, cb, false);
}
},{"./../common/util/checks/is-writable":35,"./../common/util/misc/contains":37,"../common/global-variables":12,"./../common/util/tags/get-immediate-custom-parent":66,"../../settings":10}],63:[function(require,module,exports) {

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initChild;

var _getName = require('./get-name');

var _getName2 = _interopRequireDefault(_getName);

var _getImmediateCustomParent = require('./get-immediate-custom-parent');

var _getImmediateCustomParent2 = _interopRequireDefault(_getImmediateCustomParent);

var _arrayishAdd = require('./arrayish-add');

var _arrayishAdd2 = _interopRequireDefault(_arrayishAdd);

var _define = require('../misc/define');

var _define2 = _interopRequireDefault(_define);

var _tag = require('./../../../tag/tag');

var _tag2 = _interopRequireDefault(_tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create a new child tag including it correctly into its parent
 * @param   { Object } child - child tag implementation
 * @param   { Object } opts - tag options containing the DOM node where the tag will be mounted
 * @param   { String } innerHTML - inner html of the child node
 * @param   { Object } parent - instance of the parent tag including the child custom tag
 * @returns { Object } instance of the new child tag just created
 */
function initChild(child, opts, innerHTML, parent) {
  const tag = (0, _tag2.default)(child, opts, innerHTML);
  const tagName = opts.tagName || (0, _getName2.default)(opts.root, true);
  const ptag = (0, _getImmediateCustomParent2.default)(parent);
  // fix for the parent attribute in the looped elements
  (0, _define2.default)(tag, 'parent', ptag);
  // store the real parent tag
  // in some cases this could be different from the custom parent tag
  // for example in nested loops
  tag.__.parent = parent;

  // add this tag to the custom parent tag
  (0, _arrayishAdd2.default)(ptag.tags, tagName, tag);

  // and also to the real parent tag
  if (ptag !== parent) (0, _arrayishAdd2.default)(parent.tags, tagName, tag);

  return tag;
}
},{"./get-name":59,"./get-immediate-custom-parent":66,"./arrayish-add":58,"../misc/define":50,"./../../../tag/tag":36}],61:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = arrayishRemove;

var _isArray = require('../checks/is-array');

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Removes an item from an object at a given key. If the key points to an array,
 * then the item is just removed from the array.
 * @param { Object } obj - object on which to remove the property
 * @param { String } key - property name
 * @param { Object } value - the value of the property to be removed
 * @param { Boolean } ensureArray - ensure that the property remains an array
*/
function arrayishRemove(obj, key, value, ensureArray) {
  if ((0, _isArray2.default)(obj[key])) {
    let index = obj[key].indexOf(value);
    if (index !== -1) obj[key].splice(index, 1);
    if (!obj[key].length) delete obj[key];else if (obj[key].length === 1 && !ensureArray) obj[key] = obj[key][0];
  } else if (obj[key] === value) delete obj[key]; // otherwise just delete the key
}
},{"../checks/is-array":55}],67:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeVirtual;

var _createPlaceholder = require('../dom/create-placeholder');

var _createPlaceholder2 = _interopRequireDefault(_createPlaceholder);

var _createFragment = require('../dom/create-fragment');

var _createFragment2 = _interopRequireDefault(_createFragment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Adds the elements for a virtual tag
 * @this Tag
 * @param { Node } src - the node that will do the inserting or appending
 * @param { Tag } target - only if inserting, insert before this tag's first child
 */
function makeVirtual(src, target) {
  const head = (0, _createPlaceholder2.default)();
  const tail = (0, _createPlaceholder2.default)();
  const frag = (0, _createFragment2.default)();
  let sib;
  let el;

  this.root.insertBefore(head, this.root.firstChild);
  this.root.appendChild(tail);

  this.__.head = el = head;
  this.__.tail = tail;

  while (el) {
    sib = el.nextSibling;
    frag.appendChild(el);
    this.__.virts.push(el); // hold for unmounting
    el = sib;
  }

  if (target) src.insertBefore(frag, target.__.head);else src.appendChild(frag);
}
},{"../dom/create-placeholder":38,"../dom/create-fragment":43}],65:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeReplaceVirtual;

var _createFragment = require('../dom/create-fragment');

var _createFragment2 = _interopRequireDefault(_createFragment);

var _makeVirtual = require('./make-virtual');

var _makeVirtual2 = _interopRequireDefault(_makeVirtual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * makes a tag virtual and replaces a reference in the dom
 * @this Tag
 * @param { tag } the tag to make virtual
 * @param { ref } the dom reference location
 */
function makeReplaceVirtual(tag, ref) {
  const frag = (0, _createFragment2.default)();
  _makeVirtual2.default.call(tag, frag);
  ref.parentNode.replaceChild(frag, ref);
}
},{"../dom/create-fragment":43,"./make-virtual":67}],80:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDataIs = updateDataIs;
exports.normalizeAttrName = normalizeAttrName;
exports.updateExpression = updateExpression;
exports.default = update;

var _riotTmpl = require('riot-tmpl');

var _each = require('./../common/util/misc/each');

var _each2 = _interopRequireDefault(_each);

var _contains = require('./../common/util/misc/contains');

var _contains2 = _interopRequireDefault(_contains);

var _isBlank = require('./../common/util/checks/is-blank');

var _isBlank2 = _interopRequireDefault(_isBlank);

var _isObject = require('./../common/util/checks/is-object');

var _isObject2 = _interopRequireDefault(_isObject);

var _isString = require('./../common/util/checks/is-string');

var _isString2 = _interopRequireDefault(_isString);

var _isFunction = require('./../common/util/checks/is-function');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _removeAttribute = require('./../common/util/dom/remove-attribute');

var _removeAttribute2 = _interopRequireDefault(_removeAttribute);

var _getAttribute = require('./../common/util/dom/get-attribute');

var _getAttribute2 = _interopRequireDefault(_getAttribute);

var _setAttribute = require('./../common/util/dom/set-attribute');

var _setAttribute2 = _interopRequireDefault(_setAttribute);

var _createPlaceholder = require('./../common/util/dom/create-placeholder');

var _createPlaceholder2 = _interopRequireDefault(_createPlaceholder);

var _toggleVisibility = require('./../common/util/dom/toggle-visibility');

var _toggleVisibility2 = _interopRequireDefault(_toggleVisibility);

var _styleObjectToString = require('./../common/util/dom/style-object-to-string');

var _styleObjectToString2 = _interopRequireDefault(_styleObjectToString);

var _setEventHandler = require('./setEventHandler');

var _setEventHandler2 = _interopRequireDefault(_setEventHandler);

var _initChild = require('./../common/util/tags/init-child');

var _initChild2 = _interopRequireDefault(_initChild);

var _arrayishRemove = require('./../common/util/tags/arrayish-remove');

var _arrayishRemove2 = _interopRequireDefault(_arrayishRemove);

var _inheritParentProperties = require('./../common/util/tags/inherit-parent-properties');

var _inheritParentProperties2 = _interopRequireDefault(_inheritParentProperties);

var _replaceVirtual = require('./../common/util/tags/replace-virtual');

var _replaceVirtual2 = _interopRequireDefault(_replaceVirtual);

var _globalVariables = require('./../common/global-variables');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Update dynamically created data-is tags with changing expressions
 * @param { Object } expr - expression tag and expression info
 * @param { Tag }    parent - parent for tag creation
 * @param { String } tagName - tag implementation we want to use
 */
function updateDataIs(expr, parent, tagName) {
  let tag = expr.tag || expr.dom._tag;
  let ref;

  const { head: head } = tag ? tag.__ : {};
  const isVirtual = expr.dom.tagName === 'VIRTUAL';

  if (tag && expr.tagName === tagName) {
    tag.update();
    return;
  }

  // sync _parent to accommodate changing tagnames
  if (tag) {
    // need placeholder before unmount
    if (isVirtual) {
      ref = (0, _createPlaceholder2.default)();
      head.parentNode.insertBefore(ref, head);
    }

    tag.unmount(true);
  }

  // unable to get the tag name
  if (!(0, _isString2.default)(tagName)) return;

  expr.impl = _globalVariables.__TAG_IMPL[tagName];

  // unknown implementation
  if (!expr.impl) return;

  expr.tag = tag = (0, _initChild2.default)(expr.impl, {
    root: expr.dom,
    parent: parent,
    tagName: tagName
  }, expr.dom.innerHTML, parent);

  (0, _each2.default)(expr.attrs, a => (0, _setAttribute2.default)(tag.root, a.name, a.value));
  expr.tagName = tagName;
  tag.mount();

  // root exist first time, after use placeholder
  if (isVirtual) (0, _replaceVirtual2.default)(tag, ref || tag.root);

  // parent is the placeholder tag, not the dynamic tag so clean up
  parent.__.onUnmount = () => {
    const delName = tag.opts.dataIs;
    (0, _arrayishRemove2.default)(tag.parent.tags, delName, tag);
    (0, _arrayishRemove2.default)(tag.__.parent.tags, delName, tag);
    tag.unmount();
  };
}

/**
 * Nomalize any attribute removing the "riot-" prefix
 * @param   { String } attrName - original attribute name
 * @returns { String } valid html attribute name
 */
function normalizeAttrName(attrName) {
  if (!attrName) return null;
  attrName = attrName.replace(_globalVariables.ATTRS_PREFIX, '');
  if (_globalVariables.CASE_SENSITIVE_ATTRIBUTES[attrName]) attrName = _globalVariables.CASE_SENSITIVE_ATTRIBUTES[attrName];
  return attrName;
}

/**
 * Update on single tag expression
 * @this Tag
 * @param { Object } expr - expression logic
 * @returns { undefined }
 */
function updateExpression(expr) {
  if (this.root && (0, _getAttribute2.default)(this.root, 'virtualized')) return;

  const dom = expr.dom;
  // remove the riot- prefix
  const attrName = normalizeAttrName(expr.attr);
  const isToggle = (0, _contains2.default)([_globalVariables.SHOW_DIRECTIVE, _globalVariables.HIDE_DIRECTIVE], attrName);
  const isVirtual = expr.root && expr.root.tagName === 'VIRTUAL';
  const { isAnonymous: isAnonymous } = this.__;
  const parent = dom && (expr.parent || dom.parentNode);
  // detect the style attributes
  const isStyleAttr = attrName === 'style';
  const isClassAttr = attrName === 'class';

  let value;

  // if it's a tag we could totally skip the rest
  if (expr._riot_id) {
    if (expr.__.wasCreated) {
      expr.update();
      // if it hasn't been mounted yet, do that now.
    } else {
      expr.mount();
      if (isVirtual) {
        (0, _replaceVirtual2.default)(expr, expr.root);
      }
    }
    return;
  }

  // if this expression has the update method it means it can handle the DOM changes by itself
  if (expr.update) return expr.update();

  const context = isToggle && !isAnonymous ? _inheritParentProperties2.default.call(this) : this;

  // ...it seems to be a simple expression so we try to calculate its value
  value = (0, _riotTmpl.tmpl)(expr.expr, context);

  const hasValue = !(0, _isBlank2.default)(value);
  const isObj = (0, _isObject2.default)(value);

  // convert the style/class objects to strings
  if (isObj) {
    if (isClassAttr) {
      value = (0, _riotTmpl.tmpl)(JSON.stringify(value), this);
    } else if (isStyleAttr) {
      value = (0, _styleObjectToString2.default)(value);
    }
  }

  // remove original attribute
  if (expr.attr && (!expr.wasParsedOnce || !hasValue || value === false)) {
    // remove either riot-* attributes or just the attribute name
    (0, _removeAttribute2.default)(dom, (0, _getAttribute2.default)(dom, expr.attr) ? expr.attr : attrName);
  }

  // for the boolean attributes we don't need the value
  // we can convert it to checked=true to checked=checked
  if (expr.bool) value = value ? attrName : false;
  if (expr.isRtag) return updateDataIs(expr, this, value);
  if (expr.wasParsedOnce && expr.value === value) return;

  // update the expression value
  expr.value = value;
  expr.wasParsedOnce = true;

  // if the value is an object (and it's not a style or class attribute) we can not do much more with it
  if (isObj && !isClassAttr && !isStyleAttr && !isToggle) return;
  // avoid to render undefined/null values
  if (!hasValue) value = '';

  // textarea and text nodes have no attribute name
  if (!attrName) {
    // about #815 w/o replace: the browser converts the value to a string,
    // the comparison by "==" does too, but not in the server
    value += '';
    // test for parent avoids error with invalid assignment to nodeValue
    if (parent) {
      // cache the parent node because somehow it will become null on IE
      // on the next iteration
      expr.parent = parent;
      if (parent.tagName === 'TEXTAREA') {
        parent.value = value; // #1113
        if (!_globalVariables.IE_VERSION) dom.nodeValue = value; // #1625 IE throws here, nodeValue
      } // will be available on 'updated'
      else dom.nodeValue = value;
    }
    return;
  }

  // event handler
  if ((0, _isFunction2.default)(value)) {
    (0, _setEventHandler2.default)(attrName, value, dom, this);
    // show / hide
  } else if (isToggle) {
    (0, _toggleVisibility2.default)(dom, attrName === _globalVariables.HIDE_DIRECTIVE ? !value : value);
    // handle attributes
  } else {
    if (expr.bool) {
      dom[attrName] = value;
    }

    if (attrName === 'value' && dom.value !== value) {
      dom.value = value;
    } else if (hasValue && value !== false) {
      (0, _setAttribute2.default)(dom, attrName, value);
    }

    // make sure that in case of style changes
    // the element stays hidden
    if (isStyleAttr && dom.hidden) (0, _toggleVisibility2.default)(dom, false);
  }
}

/**
 * Update all the expressions in a Tag instance
 * @this Tag
 * @param { Array } expressions - expression that must be re evaluated
 */
function update(expressions) {
  (0, _each2.default)(expressions, updateExpression.bind(this));
}
},{"riot-tmpl":15,"./../common/util/misc/each":28,"./../common/util/misc/contains":37,"./../common/util/checks/is-blank":53,"./../common/util/checks/is-object":24,"./../common/util/checks/is-string":23,"./../common/util/checks/is-function":25,"./../common/util/dom/remove-attribute":40,"./../common/util/dom/get-attribute":26,"./../common/util/dom/set-attribute":21,"./../common/util/dom/create-placeholder":38,"./../common/util/dom/toggle-visibility":39,"./../common/util/dom/style-object-to-string":45,"./setEventHandler":83,"./../common/util/tags/init-child":63,"./../common/util/tags/arrayish-remove":61,"./../common/util/tags/inherit-parent-properties":60,"./../common/util/tags/replace-virtual":65,"./../common/global-variables":12}],81:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateOpts;

var _each = require('../misc/each');

var _each2 = _interopRequireDefault(_each);

var _globalVariables = require('./../../global-variables');

var _toCamel = require('../misc/to-camel');

var _toCamel2 = _interopRequireDefault(_toCamel);

var _update = require('../../../tag/update');

var _inheritParentProperties = require('./inherit-parent-properties');

var _inheritParentProperties2 = _interopRequireDefault(_inheritParentProperties);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * We need to update opts for this tag. That requires updating the expressions
 * in any attributes on the tag, and then copying the result onto opts.
 * @this Tag
 * @param   {Boolean} isLoop - is it a loop tag?
 * @param   { Tag }  parent - parent tag node
 * @param   { Boolean }  isAnonymous - is it a tag without any impl? (a tag not registered)
 * @param   { Object }  opts - tag options
 * @param   { Array }  instAttrs - tag attributes array
 */
function updateOpts(isLoop, parent, isAnonymous, opts, instAttrs) {
  // isAnonymous `each` tags treat `dom` and `root` differently. In this case
  // (and only this case) we don't need to do updateOpts, because the regular parse
  // will update those attrs. Plus, isAnonymous tags don't need opts anyway
  if (isLoop && isAnonymous) return;
  const ctx = isLoop ? _inheritParentProperties2.default.call(this) : parent || this;

  (0, _each2.default)(instAttrs, attr => {
    if (attr.expr) _update.updateExpression.call(ctx, attr.expr);
    // normalize the attribute names
    opts[(0, _toCamel2.default)(attr.name).replace(_globalVariables.ATTRS_PREFIX, '')] = attr.expr ? attr.expr.value : attr.value;
  });
}
},{"../misc/each":28,"./../../global-variables":12,"../misc/to-camel":51,"../../../tag/update":80,"./inherit-parent-properties":60}],73:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = componentUpdate;

var _update = require('../update');

var _update2 = _interopRequireDefault(_update);

var _extend = require('./../../common/util/misc/extend');

var _extend2 = _interopRequireDefault(_extend);

var _isFunction = require('./../../common/util/checks/is-function');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _updateOptions = require('./../../common/util/tags/update-options');

var _updateOptions2 = _interopRequireDefault(_updateOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Update the tag expressions and options
 * @param { Tag } tag - tag object
 * @param { * } data - data we want to use to extend the tag properties
 * @param { Array } expressions - component expressions array
 * @returns { Tag } the current tag instance
 */
function componentUpdate(tag, data, expressions) {
  const __ = tag.__;
  const nextOpts = {};
  const canTrigger = tag.isMounted && !__.skipAnonymous;

  // inherit properties from the parent tag
  if (__.isAnonymous && __.parent) (0, _extend2.default)(tag, __.parent);
  (0, _extend2.default)(tag, data);

  _updateOptions2.default.apply(tag, [__.isLoop, __.parent, __.isAnonymous, nextOpts, __.instAttrs]);

  if (canTrigger && tag.isMounted && (0, _isFunction2.default)(tag.shouldUpdate) && !tag.shouldUpdate(data, nextOpts)) {
    return tag;
  }

  (0, _extend2.default)(tag.opts, nextOpts);

  if (canTrigger) tag.trigger('update', data);
  _update2.default.call(tag, expressions);
  if (canTrigger) tag.trigger('updated');

  return tag;
}
},{"../update":80,"./../../common/util/misc/extend":18,"./../../common/util/checks/is-function":25,"./../../common/util/tags/update-options":81}],30:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = query;

var _globalVariables = require('./../../global-variables');

/**
 * Get selectors for tags
 * @param   { Array } tags - tag names to select
 * @returns { String } selector
 */
function query(tags) {
  // select all tags
  if (!tags) {
    const keys = Object.keys(_globalVariables.__TAG_IMPL);
    return keys + query(keys);
  }

  return tags.filter(t => !/[^-\w]/.test(t)).reduce((list, t) => {
    const name = t.trim().toLowerCase();
    return list + (',[' + _globalVariables.IS_DIRECTIVE + '="' + name + '"]');
  }, '');
}
},{"./../../global-variables":12}],13:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = undefined;
exports.Tag = Tag;
exports.tag = tag;
exports.tag2 = tag2;
exports.mount = mount;
exports.mixin = mixin;
exports.update = update;
exports.unregister = unregister;

var _styleManager = require('./styleManager');

var _styleManager2 = _interopRequireDefault(_styleManager);

var _isString = require('./../common/util/checks/is-string');

var _isString2 = _interopRequireDefault(_isString);

var _isUndefined = require('./../common/util/checks/is-undefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _isObject = require('./../common/util/checks/is-object');

var _isObject2 = _interopRequireDefault(_isObject);

var _isFunction = require('./../common/util/checks/is-function');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _setAttribute = require('./../common/util/dom/set-attribute');

var _setAttribute2 = _interopRequireDefault(_setAttribute);

var _getAttribute = require('./../common/util/dom/get-attribute');

var _getAttribute2 = _interopRequireDefault(_getAttribute);

var _$$ = require('./../common/util/dom/$$');

var _$$2 = _interopRequireDefault(_$$);

var _each = require('./../common/util/misc/each');

var _each2 = _interopRequireDefault(_each);

var _extend = require('./../common/util/misc/extend');

var _extend2 = _interopRequireDefault(_extend);

var _mount = require('./../common/util/tags/mount');

var _mount2 = _interopRequireDefault(_mount);

var _query = require('./../common/util/tags/query');

var _query2 = _interopRequireDefault(_query);

var _globalVariables = require('./../common/global-variables');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Another way to create a riot tag a bit more es6 friendly
 * @param { HTMLElement } el - tag DOM selector or DOM node/s
 * @param { Object } opts - tag logic
 * @returns { Tag } new riot tag instance
 */
function Tag(el, opts) {
  // get the tag properties from the class constructor
  const { name: name, tmpl: tmpl, css: css, attrs: attrs, onCreate: onCreate } = this;
  // register a new tag and cache the class prototype
  if (!_globalVariables.__TAG_IMPL[name]) {
    tag(name, tmpl, css, attrs, onCreate);
    // cache the class constructor
    _globalVariables.__TAG_IMPL[name].class = this.constructor;
  }

  // mount the tag using the class instance
  (0, _mount2.default)(el, name, opts, this);
  // inject the component css
  if (css) _styleManager2.default.inject();

  return this;
}

/**
 * Create a new riot tag implementation
 * @param   { String }   name - name/id of the new riot tag
 * @param   { String }   tmpl - tag template
 * @param   { String }   css - custom tag css
 * @param   { String }   attrs - root tag attributes
 * @param   { Function } fn - user function
 * @returns { String } name/id of the tag just created
 */
function tag(name, tmpl, css, attrs, fn) {
  if ((0, _isFunction2.default)(attrs)) {
    fn = attrs;

    if (/^[\w-]+\s?=/.test(css)) {
      attrs = css;
      css = '';
    } else attrs = '';
  }

  if (css) {
    if ((0, _isFunction2.default)(css)) fn = css;else _styleManager2.default.add(css, name);
  }

  name = name.toLowerCase();
  _globalVariables.__TAG_IMPL[name] = { name: name, tmpl: tmpl, attrs: attrs, fn: fn };

  return name;
}

/**
 * Create a new riot tag implementation (for use by the compiler)
 * @param   { String }   name - name/id of the new riot tag
 * @param   { String }   tmpl - tag template
 * @param   { String }   css - custom tag css
 * @param   { String }   attrs - root tag attributes
 * @param   { Function } fn - user function
 * @returns { String } name/id of the tag just created
 */
function tag2(name, tmpl, css, attrs, fn) {
  if (css) _styleManager2.default.add(css, name);

  _globalVariables.__TAG_IMPL[name] = { name: name, tmpl: tmpl, attrs: attrs, fn: fn };

  return name;
}

/**
 * Mount a tag using a specific tag implementation
 * @param   { * } selector - tag DOM selector or DOM node/s
 * @param   { String } tagName - tag implementation name
 * @param   { Object } opts - tag logic
 * @returns { Array } new tags instances
 */
function mount(selector, tagName, opts) {
  const tags = [];
  let elem, allTags;

  function pushTagsTo(root) {
    if (root.tagName) {
      let riotTag = (0, _getAttribute2.default)(root, _globalVariables.IS_DIRECTIVE),
          tag;

      // have tagName? force riot-tag to be the same
      if (tagName && riotTag !== tagName) {
        riotTag = tagName;
        (0, _setAttribute2.default)(root, _globalVariables.IS_DIRECTIVE, tagName);
      }

      tag = (0, _mount2.default)(root, riotTag || root.tagName.toLowerCase(), opts);

      if (tag) tags.push(tag);
    } else if (root.length) (0, _each2.default)(root, pushTagsTo); // assume nodeList
  }

  // inject styles into DOM
  _styleManager2.default.inject();

  if ((0, _isObject2.default)(tagName)) {
    opts = tagName;
    tagName = 0;
  }

  // crawl the DOM to find the tag
  if ((0, _isString2.default)(selector)) {
    selector = selector === '*' ?
    // select all registered tags
    // & tags found with the riot-tag attribute set
    allTags = (0, _query2.default)() :
    // or just the ones named like the selector
    selector + (0, _query2.default)(selector.split(/, */));

    // make sure to pass always a selector
    // to the querySelectorAll function
    elem = selector ? (0, _$$2.default)(selector) : [];
  } else
    // probably you have passed already a tag or a NodeList
    elem = selector;

  // select all the registered and mount them inside their root elements
  if (tagName === '*') {
    // get all custom tags
    tagName = allTags || (0, _query2.default)();
    // if the root els it's just a single tag
    if (elem.tagName) elem = (0, _$$2.default)(tagName, elem);else {
      // select all the children for all the different root elements
      var nodeList = [];

      (0, _each2.default)(elem, _el => nodeList.push((0, _$$2.default)(tagName, _el)));

      elem = nodeList;
    }
    // get rid of the tagName
    tagName = 0;
  }

  pushTagsTo(elem);

  return tags;
}

// Create a mixin that could be globally shared across all the tags
const mixins = {};
const globals = mixins[_globalVariables.GLOBAL_MIXIN] = {};
let mixins_id = 0;

/**
 * Create/Return a mixin by its name
 * @param   { String }  name - mixin name (global mixin if object)
 * @param   { Object }  mix - mixin logic
 * @param   { Boolean } g - is global?
 * @returns { Object }  the mixin logic
 */
function mixin(name, mix, g) {
  // Unnamed global
  if ((0, _isObject2.default)(name)) {
    mixin('__' + mixins_id++ + '__', name, true);
    return;
  }

  const store = g ? globals : mixins;

  // Getter
  if (!mix) {
    if ((0, _isUndefined2.default)(store[name])) throw new Error('Unregistered mixin: ' + name);

    return store[name];
  }

  // Setter
  store[name] = (0, _isFunction2.default)(mix) ? (0, _extend2.default)(mix.prototype, store[name] || {}) && mix : (0, _extend2.default)(store[name] || {}, mix);
}

/**
 * Update all the tags instances created
 * @returns { Array } all the tags instances
 */
function update() {
  return (0, _each2.default)(_globalVariables.__TAGS_CACHE, tag => tag.update());
}

function unregister(name) {
  _styleManager2.default.remove(name);
  return delete _globalVariables.__TAG_IMPL[name];
}

const version = exports.version = 'WIP';
},{"./styleManager":11,"./../common/util/checks/is-string":23,"./../common/util/checks/is-undefined":22,"./../common/util/checks/is-object":24,"./../common/util/checks/is-function":25,"./../common/util/dom/set-attribute":21,"./../common/util/dom/get-attribute":26,"./../common/util/dom/$$":27,"./../common/util/misc/each":28,"./../common/util/misc/extend":18,"./../common/util/tags/mount":29,"./../common/util/tags/query":30,"./../common/global-variables":12}],74:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = componentMixin;

var _core = require('./../core');

var _isString = require('./../../common/util/checks/is-string');

var _isString2 = _interopRequireDefault(_isString);

var _isFunction = require('./../../common/util/checks/is-function');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _each = require('./../../common/util/misc/each');

var _each2 = _interopRequireDefault(_each);

var _contains = require('./../../common/util/misc/contains');

var _contains2 = _interopRequireDefault(_contains);

var _getPropDescriptor = require('./../../common/util/misc/get-prop-descriptor');

var _getPropDescriptor2 = _interopRequireDefault(_getPropDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Add a mixin to this tag
 * @returns { Tag } the current tag instance
 */
function componentMixin(tag, ...mixins) {
  (0, _each2.default)(mixins, mix => {
    let instance;
    let obj;
    let props = [];

    // properties blacklisted and will not be bound to the tag instance
    const propsBlacklist = ['init', '__proto__'];

    mix = (0, _isString2.default)(mix) ? (0, _core.mixin)(mix) : mix;

    // check if the mixin is a function
    if ((0, _isFunction2.default)(mix)) {
      // create the new mixin instance
      instance = new mix();
    } else instance = mix;

    const proto = Object.getPrototypeOf(instance);

    // build multilevel prototype inheritance chain property list
    do props = props.concat(Object.getOwnPropertyNames(obj || instance)); while (obj = Object.getPrototypeOf(obj || instance));

    // loop the keys in the function prototype or the all object keys
    (0, _each2.default)(props, key => {
      // bind methods to tag
      // allow mixins to override other properties/parent mixins
      if (!(0, _contains2.default)(propsBlacklist, key)) {
        // check for getters/setters
        const descriptor = (0, _getPropDescriptor2.default)(instance, key) || (0, _getPropDescriptor2.default)(proto, key);
        const hasGetterSetter = descriptor && (descriptor.get || descriptor.set);

        // apply method only if it does not already exist on the instance
        if (!tag.hasOwnProperty(key) && hasGetterSetter) {
          Object.defineProperty(tag, key, descriptor);
        } else {
          tag[key] = (0, _isFunction2.default)(instance[key]) ? instance[key].bind(tag) : instance[key];
        }
      }
    });

    // init method will be called automatically
    if (instance.init) instance.init.bind(tag)(tag.opts);
  });

  return tag;
}
},{"./../core":13,"./../../common/util/checks/is-string":23,"./../../common/util/checks/is-function":25,"./../../common/util/misc/each":28,"./../../common/util/misc/contains":37,"./../../common/util/misc/get-prop-descriptor":48}],64:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = moveChild;

var _isArray = require('../checks/is-array');

var _isArray2 = _interopRequireDefault(_isArray);

var _arrayishAdd = require('./arrayish-add');

var _arrayishAdd2 = _interopRequireDefault(_arrayishAdd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Move the position of a custom tag in its parent tag
 * @this Tag
 * @param   { String } tagName - key where the tag was stored
 * @param   { Number } newPos - index where the new tag will be stored
 */
function moveChild(tagName, newPos) {
  const parent = this.parent;
  let tags;
  // no parent no move
  if (!parent) return;

  tags = parent.tags[tagName];

  if ((0, _isArray2.default)(tags)) tags.splice(newPos, 0, tags.splice(tags.indexOf(this), 1)[0]);else (0, _arrayishAdd2.default)(parent.tags, tagName, this);
}
},{"../checks/is-array":55,"./arrayish-add":58}],68:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = moveVirtual;

var _createFragment = require('../dom/create-fragment');

var _createFragment2 = _interopRequireDefault(_createFragment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Move virtual tag and all child nodes
 * @this Tag
 * @param { Node } src  - the node that will do the inserting
 * @param { Tag } target - insert before this tag's first child
 */
function moveVirtual(src, target) {
  let el = this.__.head;
  let sib;
  const frag = (0, _createFragment2.default)();

  while (el) {
    sib = el.nextSibling;
    frag.appendChild(el);
    el = sib;
    if (el === this.__.tail) {
      frag.appendChild(el);
      src.insertBefore(frag, target.__.head);
      break;
    }
  }
}
},{"../dom/create-fragment":43}],84:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = _each;

var _globalVariables = require('./../common/global-variables');

var _isString = require('./../common/util/checks/is-string');

var _isString2 = _interopRequireDefault(_isString);

var _isArray = require('./../common/util/checks/is-array');

var _isArray2 = _interopRequireDefault(_isArray);

var _removeAttribute = require('./../common/util/dom/remove-attribute');

var _removeAttribute2 = _interopRequireDefault(_removeAttribute);

var _getAttribute = require('./../common/util/dom/get-attribute');

var _getAttribute2 = _interopRequireDefault(_getAttribute);

var _createPlaceholder = require('./../common/util/dom/create-placeholder');

var _createPlaceholder2 = _interopRequireDefault(_createPlaceholder);

var _safeInsert = require('./../common/util/dom/safe-insert');

var _safeInsert2 = _interopRequireDefault(_safeInsert);

var _createFragment = require('./../common/util/dom/create-fragment');

var _createFragment2 = _interopRequireDefault(_createFragment);

var _each2 = require('./../common/util/misc/each');

var _each3 = _interopRequireDefault(_each2);

var _contains = require('./../common/util/misc/contains');

var _contains2 = _interopRequireDefault(_contains);

var _objectCreate = require('./../common/util/misc/object-create');

var _objectCreate2 = _interopRequireDefault(_objectCreate);

var _extend = require('./../common/util/misc/extend');

var _extend2 = _interopRequireDefault(_extend);

var _moveChild = require('./../common/util/tags/move-child');

var _moveChild2 = _interopRequireDefault(_moveChild);

var _get = require('./../common/util/tags/get');

var _get2 = _interopRequireDefault(_get);

var _getName = require('./../common/util/tags/get-name');

var _getName2 = _interopRequireDefault(_getName);

var _arrayishAdd = require('./../common/util/tags/arrayish-add');

var _arrayishAdd2 = _interopRequireDefault(_arrayishAdd);

var _arrayishRemove = require('./../common/util/tags/arrayish-remove');

var _arrayishRemove2 = _interopRequireDefault(_arrayishRemove);

var _makeVirtual = require('./../common/util/tags/make-virtual');

var _makeVirtual2 = _interopRequireDefault(_makeVirtual);

var _moveVirtual = require('./../common/util/tags/move-virtual');

var _moveVirtual2 = _interopRequireDefault(_moveVirtual);

var _tag = require('./tag');

var _tag2 = _interopRequireDefault(_tag);

var _riotTmpl = require('riot-tmpl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Convert the item looped into an object used to extend the child tag properties
 * @param   { Object } expr - object containing the keys used to extend the children tags
 * @param   { * } key - value to assign to the new object returned
 * @param   { * } val - value containing the position of the item in the array
 * @returns { Object } - new object containing the values of the original item
 *
 * The variables 'key' and 'val' are arbitrary.
 * They depend on the collection type looped (Array, Object)
 * and on the expression used on the each tag
 *
 */
function mkitem(expr, key, val) {
  const item = {};
  item[expr.key] = key;
  if (expr.pos) item[expr.pos] = val;
  return item;
}

/**
 * Unmount the redundant tags
 * @param   { Array } items - array containing the current items to loop
 * @param   { Array } tags - array containing all the children tags
 */
function unmountRedundant(items, tags, filteredItemsCount) {
  let i = tags.length;
  const j = items.length - filteredItemsCount;

  while (i > j) {
    i--;
    remove.apply(tags[i], [tags, i]);
  }
}

/**
 * Remove a child tag
 * @this Tag
 * @param   { Array } tags - tags collection
 * @param   { Number } i - index of the tag to remove
 */
function remove(tags, i) {
  tags.splice(i, 1);
  this.unmount();
  (0, _arrayishRemove2.default)(this.parent, this, this.__.tagName, true);
}

/**
 * Move the nested custom tags in non custom loop tags
 * @this Tag
 * @param   { Number } i - current position of the loop tag
 */
function moveNestedTags(i) {
  (0, _each3.default)(Object.keys(this.tags), tagName => {
    _moveChild2.default.apply(this.tags[tagName], [tagName, i]);
  });
}

/**
 * Move a child tag
 * @this Tag
 * @param   { HTMLElement } root - dom node containing all the loop children
 * @param   { Tag } nextTag - instance of the next tag preceding the one we want to move
 * @param   { Boolean } isVirtual - is it a virtual tag?
 */
function move(root, nextTag, isVirtual) {
  if (isVirtual) _moveVirtual2.default.apply(this, [root, nextTag]);else (0, _safeInsert2.default)(root, this.root, nextTag.root);
}

/**
 * Insert and mount a child tag
 * @this Tag
 * @param   { HTMLElement } root - dom node containing all the loop children
 * @param   { Tag } nextTag - instance of the next tag preceding the one we want to insert
 * @param   { Boolean } isVirtual - is it a virtual tag?
 */
function insert(root, nextTag, isVirtual) {
  if (isVirtual) _makeVirtual2.default.apply(this, [root, nextTag]);else (0, _safeInsert2.default)(root, this.root, nextTag.root);
}

/**
 * Append a new tag into the DOM
 * @this Tag
 * @param   { HTMLElement } root - dom node containing all the loop children
 * @param   { Boolean } isVirtual - is it a virtual tag?
 */
function append(root, isVirtual) {
  if (isVirtual) _makeVirtual2.default.call(this, root);else root.appendChild(this.root);
}

/**
 * Return the value we want to use to lookup the postion of our items in the collection
 * @param   { String }  keyAttr         - lookup string or expression
 * @param   { * }       originalItem    - original item from the collection
 * @param   { Object }  keyedItem       - object created by riot via { item, i in collection }
 * @param   { Boolean } hasKeyAttrExpr  - flag to check whether the key is an expression
 * @returns { * } value that we will use to figure out the item position via collection.indexOf
 */
function getItemId(keyAttr, originalItem, keyedItem, hasKeyAttrExpr) {
  if (keyAttr) {
    return hasKeyAttrExpr ? (0, _riotTmpl.tmpl)(keyAttr, keyedItem) : originalItem[keyAttr];
  }

  return originalItem;
}

/**
 * Manage tags having the 'each'
 * @param   { HTMLElement } dom - DOM node we need to loop
 * @param   { Tag } parent - parent tag instance where the dom node is contained
 * @param   { String } expr - string contained in the 'each' attribute
 * @returns { Object } expression object for this each loop
 */
function _each(dom, parent, expr) {
  const mustReorder = _typeof((0, _getAttribute2.default)(dom, _globalVariables.LOOP_NO_REORDER_DIRECTIVE)) !== _globalVariables.T_STRING || (0, _removeAttribute2.default)(dom, _globalVariables.LOOP_NO_REORDER_DIRECTIVE);
  const keyAttr = (0, _getAttribute2.default)(dom, _globalVariables.KEY_DIRECTIVE);
  const hasKeyAttrExpr = keyAttr ? _riotTmpl.tmpl.hasExpr(keyAttr) : false;
  const tagName = (0, _getName2.default)(dom);
  const impl = _globalVariables.__TAG_IMPL[tagName];
  const parentNode = dom.parentNode;
  const placeholder = (0, _createPlaceholder2.default)();
  const child = (0, _get2.default)(dom);
  const ifExpr = (0, _getAttribute2.default)(dom, _globalVariables.CONDITIONAL_DIRECTIVE);
  const tags = [];
  const isLoop = true;
  const innerHTML = dom.innerHTML;
  const isAnonymous = !_globalVariables.__TAG_IMPL[tagName];
  const isVirtual = dom.tagName === 'VIRTUAL';
  let oldItems = [];
  let hasKeys;

  // remove the each property from the original tag
  (0, _removeAttribute2.default)(dom, _globalVariables.LOOP_DIRECTIVE);
  (0, _removeAttribute2.default)(dom, _globalVariables.KEY_DIRECTIVE);

  // parse the each expression
  expr = _riotTmpl.tmpl.loopKeys(expr);
  expr.isLoop = true;

  if (ifExpr) (0, _removeAttribute2.default)(dom, _globalVariables.CONDITIONAL_DIRECTIVE);

  // insert a marked where the loop tags will be injected
  parentNode.insertBefore(placeholder, dom);
  parentNode.removeChild(dom);

  expr.update = function updateEach() {
    // get the new items collection
    expr.value = (0, _riotTmpl.tmpl)(expr.val, parent);

    let items = expr.value;
    const frag = (0, _createFragment2.default)();
    const isObject = !(0, _isArray2.default)(items) && !(0, _isString2.default)(items);
    const root = placeholder.parentNode;
    const tmpItems = [];

    // if this DOM was removed the update here is useless
    // this condition fixes also a weird async issue on IE in our unit test
    if (!root) return;

    // object loop. any changes cause full redraw
    if (isObject) {
      hasKeys = items || false;
      items = hasKeys ? Object.keys(items).map(key => mkitem(expr, items[key], key)) : [];
    } else {
      hasKeys = false;
    }

    // store the amount of filtered items
    let filteredItemsCount = 0;

    // loop all the new items
    (0, _each3.default)(items, (_item, i) => {
      i -= filteredItemsCount;

      const item = !hasKeys && expr.key ? mkitem(expr, _item, i) : _item;

      // skip this item because it must be filtered
      if (ifExpr && !(0, _riotTmpl.tmpl)(ifExpr, (0, _extend2.default)((0, _objectCreate2.default)(parent), item))) {
        filteredItemsCount++;
        return;
      }

      const itemId = getItemId(keyAttr, _item, item, hasKeyAttrExpr);
      // reorder only if the items are objects
      const doReorder = mustReorder && (typeof _item === 'undefined' ? 'undefined' : _typeof(_item)) === _globalVariables.T_OBJECT && !hasKeys;
      const oldPos = oldItems.indexOf(itemId);
      const isNew = oldPos === -1;
      const pos = !isNew && doReorder ? oldPos : i;
      // does a tag exist in this position?
      let tag = tags[pos];
      const mustAppend = i >= oldItems.length;
      const mustCreate = doReorder && isNew || !doReorder && !tag;

      // new tag
      if (mustCreate) {
        tag = (0, _tag2.default)(impl, {
          parent: parent,
          isLoop: isLoop,
          isAnonymous: isAnonymous,
          tagName: tagName,
          root: dom.cloneNode(isAnonymous),
          item: item,
          index: i
        }, innerHTML);

        // mount the tag
        tag.mount();

        if (mustAppend) append.apply(tag, [frag || root, isVirtual]);else insert.apply(tag, [root, tags[i], isVirtual]);

        if (!mustAppend) oldItems.splice(i, 0, item);
        tags.splice(i, 0, tag);
        if (child) (0, _arrayishAdd2.default)(parent.tags, tagName, tag, true);
      } else if (pos !== i && doReorder) {
        // move
        if (keyAttr || (0, _contains2.default)(items, oldItems[pos])) {
          move.apply(tag, [root, tags[i], isVirtual]);
          // move the old tag instance
          tags.splice(i, 0, tags.splice(pos, 1)[0]);
          // move the old item
          oldItems.splice(i, 0, oldItems.splice(pos, 1)[0]);
        }

        // update the position attribute if it exists
        if (expr.pos) tag[expr.pos] = i;

        // if the loop tags are not custom
        // we need to move all their custom tags into the right position
        if (!child && tag.tags) moveNestedTags.call(tag, i);
      }

      // cache the original item to use it in the events bound to this node
      // and its children
      (0, _extend2.default)(tag.__, {
        item: item,
        index: i,
        parent: parent
      });

      tmpItems[i] = itemId;

      if (!mustCreate) tag.update(item);
    });

    // remove the redundant tags
    unmountRedundant(items, tags, filteredItemsCount);

    // clone the items array
    oldItems = tmpItems.slice();

    root.insertBefore(frag, placeholder);
  };

  expr.unmount = () => {
    (0, _each3.default)(tags, t => {
      t.unmount();
    });
  };

  return expr;
}
},{"./../common/global-variables":12,"./../common/util/checks/is-string":23,"./../common/util/checks/is-array":55,"./../common/util/dom/remove-attribute":40,"./../common/util/dom/get-attribute":26,"./../common/util/dom/create-placeholder":38,"./../common/util/dom/safe-insert":44,"./../common/util/dom/create-fragment":43,"./../common/util/misc/each":28,"./../common/util/misc/contains":37,"./../common/util/misc/object-create":17,"./../common/util/misc/extend":18,"./../common/util/tags/move-child":64,"./../common/util/tags/get":62,"./../common/util/tags/get-name":59,"./../common/util/tags/arrayish-add":58,"./../common/util/tags/arrayish-remove":61,"./../common/util/tags/make-virtual":67,"./../common/util/tags/move-virtual":68,"./tag":36,"riot-tmpl":15}],77:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _riotTmpl = require('riot-tmpl');

var _isBlank = require('./../common/util/checks/is-blank');

var _isBlank2 = _interopRequireDefault(_isBlank);

var _isString = require('./../common/util/checks/is-string');

var _isString2 = _interopRequireDefault(_isString);

var _removeAttribute = require('./../common/util/dom/remove-attribute');

var _removeAttribute2 = _interopRequireDefault(_removeAttribute);

var _setAttribute = require('./../common/util/dom/set-attribute');

var _setAttribute2 = _interopRequireDefault(_setAttribute);

var _tags = require('./../common/util/tags');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  init: function (dom, parent, attrName, attrValue) {
    this.dom = dom;
    this.attr = attrName;
    this.rawValue = attrValue;
    this.parent = parent;
    this.hasExp = _riotTmpl.tmpl.hasExpr(attrValue);
    return this;
  },
  update: function () {
    const old = this.value;
    const customParent = this.parent && (0, _tags.getImmediateCustomParentTag)(this.parent);
    // if the referenced element is a custom tag, then we set the tag itself, rather than DOM
    const tagOrDom = this.dom.__ref || this.tag || this.dom;

    this.value = this.hasExp ? (0, _riotTmpl.tmpl)(this.rawValue, this.parent) : this.rawValue;

    // the name changed, so we need to remove it from the old key (if present)
    if (!(0, _isBlank2.default)(old) && customParent) (0, _tags.arrayishRemove)(customParent.refs, old, tagOrDom);
    if (!(0, _isBlank2.default)(this.value) && (0, _isString2.default)(this.value)) {
      // add it to the refs of parent tag (this behavior was changed >=3.0)
      if (customParent) (0, _tags.arrayishAdd)(customParent.refs, this.value, tagOrDom,
      // use an array if it's a looped node and the ref is not an expression
      null, this.parent.__.index);

      if (this.value !== old) {
        (0, _setAttribute2.default)(this.dom, this.attr, this.value);
      }
    } else {
      (0, _removeAttribute2.default)(this.dom, this.attr);
    }

    // cache the ref bound to this dom node
    // to reuse it in future (see also #2329)
    if (!this.dom.__ref) this.dom.__ref = tagOrDom;
  },
  unmount: function () {
    const tagOrDom = this.tag || this.dom;
    const customParent = this.parent && (0, _tags.getImmediateCustomParentTag)(this.parent);
    if (!(0, _isBlank2.default)(this.value) && customParent) (0, _tags.arrayishRemove)(customParent.refs, this.value, tagOrDom);
  }
};
},{"riot-tmpl":15,"./../common/util/checks/is-blank":53,"./../common/util/checks/is-string":23,"./../common/util/dom/remove-attribute":40,"./../common/util/dom/set-attribute":21,"./../common/util/tags":34}],71:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createRefDirective;

var _ref = require('../../../tag/ref');

var _ref2 = _interopRequireDefault(_ref);

var _objectCreate = require('../misc/object-create');

var _objectCreate2 = _interopRequireDefault(_objectCreate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create a new ref directive
 * @param   { HTMLElement } dom - dom node having the ref attribute
 * @param   { Tag } context - tag instance where the DOM node is located
 * @param   { String } attrName - either 'ref' or 'data-ref'
 * @param   { String } attrValue - value of the ref attribute
 * @returns { RefExpr } a new RefExpr object
 */
function createRefDirective(dom, tag, attrName, attrValue) {
  return (0, _objectCreate2.default)(_ref2.default).init(dom, tag, attrName, attrValue);
}
},{"../../../tag/ref":77,"../misc/object-create":17}],69:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = unmountAll;

var _each = require('../misc/each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Trigger the unmount method on all the expressions
 * @param   { Array } expressions - DOM expressions
 */
function unmountAll(expressions) {
  (0, _each2.default)(expressions, expr => {
    if (expr.unmount) expr.unmount(true);else if (expr.tagName) expr.tag.unmount(true);else if (expr.unmount) expr.unmount();
  });
}
},{"../misc/each":28}],78:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _removeAttribute = require('./../common/util/dom/remove-attribute');

var _removeAttribute2 = _interopRequireDefault(_removeAttribute);

var _createPlaceholder = require('./../common/util/dom/create-placeholder');

var _createPlaceholder2 = _interopRequireDefault(_createPlaceholder);

var _unmountAll = require('./../common/util/tags/unmount-all');

var _unmountAll2 = _interopRequireDefault(_unmountAll);

var _extend = require('./../common/util/misc/extend');

var _extend2 = _interopRequireDefault(_extend);

var _riotTmpl = require('riot-tmpl');

var _globalVariables = require('./../common/global-variables');

var _parse = require('./parse');

var _update = require('./update');

var _update2 = _interopRequireDefault(_update);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  init: function (dom, tag, expr) {
    (0, _removeAttribute2.default)(dom, _globalVariables.CONDITIONAL_DIRECTIVE);
    (0, _extend2.default)(this, { tag: tag, expr: expr, stub: (0, _createPlaceholder2.default)(), pristine: dom });
    const p = dom.parentNode;
    p.insertBefore(this.stub, dom);
    p.removeChild(dom);

    return this;
  },
  update: function () {
    this.value = (0, _riotTmpl.tmpl)(this.expr, this.tag);

    if (this.value && !this.current) {
      // insert
      this.current = this.pristine.cloneNode(true);
      this.stub.parentNode.insertBefore(this.current, this.stub);
      this.expressions = _parse.parseExpressions.apply(this.tag, [this.current, true]);
    } else if (!this.value && this.current) {
      // remove
      (0, _unmountAll2.default)(this.expressions);
      if (this.current._tag) {
        this.current._tag.unmount();
      } else if (this.current.parentNode) {
        this.current.parentNode.removeChild(this.current);
      }
      this.current = null;
      this.expressions = [];
    }

    if (this.value) _update2.default.call(this.tag, this.expressions);
  },
  unmount: function () {
    (0, _unmountAll2.default)(this.expressions || []);
  }
};
},{"./../common/util/dom/remove-attribute":40,"./../common/util/dom/create-placeholder":38,"./../common/util/tags/unmount-all":69,"./../common/util/misc/extend":18,"riot-tmpl":15,"./../common/global-variables":12,"./parse":79,"./update":80}],70:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createIfDirective;

var _if = require('../../../tag/if');

var _if2 = _interopRequireDefault(_if);

var _objectCreate = require('../misc/object-create');

var _objectCreate2 = _interopRequireDefault(_objectCreate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create a new if directive
 * @param   { HTMLElement } dom - if root dom node
 * @param   { Tag } context - tag instance where the DOM node is located
 * @param   { String } attr - if expression
 * @returns { IFExpr } a new IfExpr object
 */
function createIfDirective(dom, tag, attr) {
  return (0, _objectCreate2.default)(_if2.default).init(dom, tag, attr);
}
},{"../../../tag/if":78,"../misc/object-create":17}],79:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseExpressions = parseExpressions;
exports.parseAttributes = parseAttributes;

var _each2 = require('./each');

var _each3 = _interopRequireDefault(_each2);

var _riotTmpl = require('riot-tmpl');

var _globalVariables = require('./../common/global-variables');

var _createRefDirective = require('./../common/util/tags/create-ref-directive');

var _createRefDirective2 = _interopRequireDefault(_createRefDirective);

var _createIfDirective = require('./../common/util/tags/create-if-directive');

var _createIfDirective2 = _interopRequireDefault(_createIfDirective);

var _isBooleanAttribute = require('./../common/util/checks/is-boolean-attribute');

var _isBooleanAttribute2 = _interopRequireDefault(_isBooleanAttribute);

var _walkNodes = require('./../common/util/dom/walk-nodes');

var _walkNodes2 = _interopRequireDefault(_walkNodes);

var _getAttribute = require('./../common/util/dom/get-attribute');

var _getAttribute2 = _interopRequireDefault(_getAttribute);

var _setAttribute = require('./../common/util/dom/set-attribute');

var _setAttribute2 = _interopRequireDefault(_setAttribute);

var _each4 = require('./../common/util/misc/each');

var _each5 = _interopRequireDefault(_each4);

var _contains = require('./../common/util/misc/contains');

var _contains2 = _interopRequireDefault(_contains);

var _warn = require('./../common/util/misc/warn');

var _warn2 = _interopRequireDefault(_warn);

var _get = require('./../common/util/tags/get');

var _get2 = _interopRequireDefault(_get);

var _initChild = require('./../common/util/tags/init-child');

var _initChild2 = _interopRequireDefault(_initChild);

var _tag = require('./tag');

var _tag2 = _interopRequireDefault(_tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Walk the tag DOM to detect the expressions to evaluate
 * @this Tag
 * @param   { HTMLElement } root - root tag where we will start digging the expressions
 * @param   { Boolean } mustIncludeRoot - flag to decide whether the root must be parsed as well
 * @returns { Array } all the expressions found
 */
function parseExpressions(root, mustIncludeRoot) {
  const expressions = [];

  (0, _walkNodes2.default)(root, dom => {
    const type = dom.nodeType;
    let attr;
    let tagImpl;

    if (!mustIncludeRoot && dom === root) return;

    // text node
    if (type === 3 && dom.parentNode.tagName !== 'STYLE' && _riotTmpl.tmpl.hasExpr(dom.nodeValue)) expressions.push({ dom: dom, expr: dom.nodeValue });

    if (type !== 1) return;

    const isVirtual = dom.tagName === 'VIRTUAL';

    // loop. each does it's own thing (for now)
    if (attr = (0, _getAttribute2.default)(dom, _globalVariables.LOOP_DIRECTIVE)) {
      if (isVirtual) (0, _setAttribute2.default)(dom, 'loopVirtual', true); // ignore here, handled in _each
      expressions.push((0, _each3.default)(dom, this, attr));
      return false;
    }

    // if-attrs become the new parent. Any following expressions (either on the current
    // element, or below it) become children of this expression.
    if (attr = (0, _getAttribute2.default)(dom, _globalVariables.CONDITIONAL_DIRECTIVE)) {
      expressions.push((0, _createIfDirective2.default)(dom, this, attr));
      return false;
    }

    if (attr = (0, _getAttribute2.default)(dom, _globalVariables.IS_DIRECTIVE)) {
      if (_riotTmpl.tmpl.hasExpr(attr)) {
        expressions.push({
          isRtag: true,
          expr: attr,
          dom: dom,
          attrs: [].slice.call(dom.attributes)
        });

        return false;
      }
    }

    // if this is a tag, stop traversing here.
    // we ignore the root, since parseExpressions is called while we're mounting that root
    tagImpl = (0, _get2.default)(dom);

    if (isVirtual) {
      if ((0, _getAttribute2.default)(dom, 'virtualized')) {
        dom.parentElement.removeChild(dom);
      } // tag created, remove from dom
      if (!tagImpl && !(0, _getAttribute2.default)(dom, 'virtualized') && !(0, _getAttribute2.default)(dom, 'loopVirtual')) // ok to create virtual tag
        tagImpl = { tmpl: dom.outerHTML };
    }

    if (tagImpl && (dom !== root || mustIncludeRoot)) {
      const hasIsDirective = (0, _getAttribute2.default)(dom, _globalVariables.IS_DIRECTIVE);
      if (isVirtual && !hasIsDirective) {
        // handled in update
        // can not remove attribute like directives
        // so flag for removal after creation to prevent maximum stack error
        (0, _setAttribute2.default)(dom, 'virtualized', true);
        const tag = (0, _tag2.default)({ tmpl: dom.outerHTML }, { root: dom, parent: this }, dom.innerHTML);

        expressions.push(tag); // no return, anonymous tag, keep parsing
      } else {
        if (hasIsDirective && isVirtual) (0, _warn2.default)('Virtual tags shouldn\'t be used together with the "' + _globalVariables.IS_DIRECTIVE + '" attribute - https://github.com/riot/riot/issues/2511');

        expressions.push((0, _initChild2.default)(tagImpl, {
          root: dom,
          parent: this
        }, dom.innerHTML, this));
        return false;
      }
    }

    // attribute expressions
    parseAttributes.apply(this, [dom, dom.attributes, (attr, expr) => {
      if (!expr) return;
      expressions.push(expr);
    }]);
  });

  return expressions;
}

/**
 * Calls `fn` for every attribute on an element. If that attr has an expression,
 * it is also passed to fn.
 * @this Tag
 * @param   { HTMLElement } dom - dom node to parse
 * @param   { Array } attrs - array of attributes
 * @param   { Function } fn - callback to exec on any iteration
 */
function parseAttributes(dom, attrs, fn) {
  (0, _each5.default)(attrs, attr => {
    if (!attr) return false;

    const name = attr.name;
    const bool = (0, _isBooleanAttribute2.default)(name);
    let expr;

    if ((0, _contains2.default)(_globalVariables.REF_DIRECTIVES, name) && dom.tagName.toLowerCase() !== _globalVariables.YIELD_TAG) {
      expr = (0, _createRefDirective2.default)(dom, this, name, attr.value);
    } else if (_riotTmpl.tmpl.hasExpr(attr.value)) {
      expr = { dom: dom, expr: attr.value, attr: name, bool: bool };
    }

    fn(attr, expr);
  });
}
},{"./each":84,"riot-tmpl":15,"./../common/global-variables":12,"./../common/util/tags/create-ref-directive":71,"./../common/util/tags/create-if-directive":70,"./../common/util/checks/is-boolean-attribute":56,"./../common/util/dom/walk-nodes":46,"./../common/util/dom/get-attribute":26,"./../common/util/dom/set-attribute":21,"./../common/util/misc/each":28,"./../common/util/misc/contains":37,"./../common/util/misc/warn":52,"./../common/util/tags/get":62,"./../common/util/tags/init-child":63,"./tag":36}],82:[function(require,module,exports) {

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setMountState;

var _define = require('../misc/define');

var _define2 = _interopRequireDefault(_define);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Manage the mount state of a tag triggering also the observable events
 * @this Tag
 * @param { Boolean } value - ..of the isMounted flag
 */
function setMountState(value) {
  const { isAnonymous: isAnonymous } = this.__;

  (0, _define2.default)(this, 'isMounted', value);

  if (!isAnonymous) {
    if (value) this.trigger('mount');else {
      this.trigger('unmount');
      this.off('*');
      this.__.wasCreated = false;
    }
  }
}
},{"../misc/define":50}],75:[function(require,module,exports) {

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = componentMount;

var _parse = require('../parse');

var _ref = require('../ref');

var _ref2 = _interopRequireDefault(_ref);

var _core = require('../core');

var _globalVariables = require('./../../common/global-variables');

var _setAttribute = require('./../../common/util/dom/set-attribute');

var _setAttribute2 = _interopRequireDefault(_setAttribute);

var _walkAttributes = require('./../../common/util/dom/walk-attributes');

var _walkAttributes2 = _interopRequireDefault(_walkAttributes);

var _each = require('./../../common/util/misc/each');

var _each2 = _interopRequireDefault(_each);

var _define = require('./../../common/util/misc/define');

var _define2 = _interopRequireDefault(_define);

var _getImmediateCustomParent = require('./../../common/util/tags/get-immediate-custom-parent');

var _getImmediateCustomParent2 = _interopRequireDefault(_getImmediateCustomParent);

var _updateOptions = require('./../../common/util/tags/update-options');

var _updateOptions2 = _interopRequireDefault(_updateOptions);

var _setMountState = require('./../../common/util/tags/set-mount-state');

var _setMountState2 = _interopRequireDefault(_setMountState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Mount the current tag instance
 * @returns { Tag } the current tag instance
 */
function componentMount(tag, dom, expressions, opts) {
  const __ = tag.__;
  const root = __.root;
  root._tag = tag; // keep a reference to the tag just created

  // Read all the attrs on this instance. This give us the info we need for updateOpts
  _parse.parseAttributes.apply(__.parent, [root, root.attributes, (attr, expr) => {
    if (!__.isAnonymous && _ref2.default.isPrototypeOf(expr)) expr.tag = tag;
    attr.expr = expr;
    __.instAttrs.push(attr);
  }]);

  // update the root adding custom attributes coming from the compiler
  (0, _walkAttributes2.default)(__.impl.attrs, (k, v) => {
    __.implAttrs.push({ name: k, value: v });
  });
  _parse.parseAttributes.apply(tag, [root, __.implAttrs, (attr, expr) => {
    if (expr) expressions.push(expr);else (0, _setAttribute2.default)(root, attr.name, attr.value);
  }]);

  // initialiation
  _updateOptions2.default.apply(tag, [__.isLoop, __.parent, __.isAnonymous, opts, __.instAttrs]);

  // add global mixins
  const globalMixin = (0, _core.mixin)(_globalVariables.GLOBAL_MIXIN);

  if (globalMixin && !__.skipAnonymous) {
    for (const i in globalMixin) {
      if (globalMixin.hasOwnProperty(i)) {
        tag.mixin(globalMixin[i]);
      }
    }
  }

  if (__.impl.fn) __.impl.fn.call(tag, opts);

  if (!__.skipAnonymous) tag.trigger('before-mount');

  // parse layout after init. fn may calculate args for nested custom tags
  (0, _each2.default)(_parse.parseExpressions.apply(tag, [dom, __.isAnonymous]), e => expressions.push(e));

  tag.update(__.item);

  if (!__.isAnonymous && !__.isInline) {
    while (dom.firstChild) root.appendChild(dom.firstChild);
  }

  (0, _define2.default)(tag, 'root', root);

  // if we need to wait that the parent "mount" or "updated" event gets triggered
  if (!__.skipAnonymous && tag.parent) {
    const p = (0, _getImmediateCustomParent2.default)(tag.parent);
    p.one(!p.isMounted ? 'mount' : 'updated', () => {
      _setMountState2.default.call(tag, true);
    });
  } else {
    // otherwise it's not a child tag we can trigger its mount event
    _setMountState2.default.call(tag, true);
  }

  tag.__.wasCreated = true;

  return tag;
}
},{"../parse":79,"../ref":77,"../core":13,"./../../common/global-variables":12,"./../../common/util/dom/set-attribute":21,"./../../common/util/dom/walk-attributes":42,"./../../common/util/misc/each":28,"./../../common/util/misc/define":50,"./../../common/util/tags/get-immediate-custom-parent":66,"./../../common/util/tags/update-options":81,"./../../common/util/tags/set-mount-state":82}],76:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tagUnmount;

var _globalVariables = require('./../../common/global-variables');

var _removeAttribute = require('./../../common/util/dom/remove-attribute');

var _removeAttribute2 = _interopRequireDefault(_removeAttribute);

var _walkAttributes = require('./../../common/util/dom/walk-attributes');

var _walkAttributes2 = _interopRequireDefault(_walkAttributes);

var _setInnerHTML = require('./../../common/util/dom/set-inner-HTML');

var _setInnerHTML2 = _interopRequireDefault(_setInnerHTML);

var _each = require('./../../common/util/misc/each');

var _each2 = _interopRequireDefault(_each);

var _startsWith = require('./../../common/util/misc/starts-with');

var _startsWith2 = _interopRequireDefault(_startsWith);

var _unmountAll = require('./../../common/util/tags/unmount-all');

var _unmountAll2 = _interopRequireDefault(_unmountAll);

var _arrayishRemove = require('./../../common/util/tags/arrayish-remove');

var _arrayishRemove2 = _interopRequireDefault(_arrayishRemove);

var _getImmediateCustomParent = require('./../../common/util/tags/get-immediate-custom-parent');

var _getImmediateCustomParent2 = _interopRequireDefault(_getImmediateCustomParent);

var _setMountState = require('./../../common/util/tags/set-mount-state');

var _setMountState2 = _interopRequireDefault(_setMountState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Unmount the tag instance
 * @param { Boolean } mustKeepRoot - if it's true the root node will not be removed
 * @returns { Tag } the current tag instance
 */
function tagUnmount(tag, mustKeepRoot, expressions) {
  const __ = tag.__;
  const root = __.root;
  const tagIndex = _globalVariables.__TAGS_CACHE.indexOf(tag);
  const p = root.parentNode;

  if (!__.skipAnonymous) tag.trigger('before-unmount');

  // clear all attributes coming from the mounted tag
  (0, _walkAttributes2.default)(__.impl.attrs, name => {
    if ((0, _startsWith2.default)(name, _globalVariables.ATTRS_PREFIX)) name = name.slice(_globalVariables.ATTRS_PREFIX.length);

    (0, _removeAttribute2.default)(root, name);
  });

  // remove all the event listeners
  tag.__.listeners.forEach(dom => {
    Object.keys(dom[_globalVariables.RIOT_EVENTS_KEY]).forEach(eventName => {
      dom.removeEventListener(eventName, dom[_globalVariables.RIOT_EVENTS_KEY][eventName]);
    });
  });

  // remove tag instance from the global tags cache collection
  if (tagIndex !== -1) _globalVariables.__TAGS_CACHE.splice(tagIndex, 1);

  // clean up the parent tags object
  if (__.parent && !__.isAnonymous) {
    const ptag = (0, _getImmediateCustomParent2.default)(__.parent);

    if (__.isVirtual) {
      Object.keys(tag.tags).forEach(tagName => (0, _arrayishRemove2.default)(ptag.tags, tagName, tag.tags[tagName]));
    } else {
      (0, _arrayishRemove2.default)(ptag.tags, __.tagName, tag);
    }
  }

  // unmount all the virtual directives
  if (tag.__.virts) {
    (0, _each2.default)(tag.__.virts, v => {
      if (v.parentNode) v.parentNode.removeChild(v);
    });
  }

  // allow expressions to unmount themselves
  (0, _unmountAll2.default)(expressions);
  (0, _each2.default)(__.instAttrs, a => a.expr && a.expr.unmount && a.expr.unmount());

  // clear the tag html if it's necessary
  if (mustKeepRoot) (0, _setInnerHTML2.default)(root, '');
  // otherwise detach the root tag from the DOM
  else if (p) p.removeChild(root);

  // custom internal unmount function to avoid relying on the observable
  if (__.onUnmount) __.onUnmount();

  // weird fix for a weird edge case #2409 and #2436
  // some users might use your software not as you've expected
  // so I need to add these dirty hacks to mitigate unexpected issues
  if (!tag.isMounted) _setMountState2.default.call(tag, true);

  _setMountState2.default.call(tag, false);

  delete root._tag;

  return tag;
}
},{"./../../common/global-variables":12,"./../../common/util/dom/remove-attribute":40,"./../../common/util/dom/walk-attributes":42,"./../../common/util/dom/set-inner-HTML":41,"./../../common/util/misc/each":28,"./../../common/util/misc/starts-with":47,"./../../common/util/tags/unmount-all":69,"./../../common/util/tags/arrayish-remove":61,"./../../common/util/tags/get-immediate-custom-parent":66,"./../../common/util/tags/set-mount-state":82}],36:[function(require,module,exports) {

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createTag;

var _riotObservable = require('riot-observable');

var _riotObservable2 = _interopRequireDefault(_riotObservable);

var _mkdom = require('./mkdom');

var _mkdom2 = _interopRequireDefault(_mkdom);

var _settings = require('../../settings');

var _settings2 = _interopRequireDefault(_settings);

var _isSvg = require('./../common/util/checks/is-svg');

var _isSvg2 = _interopRequireDefault(_isSvg);

var _extend = require('./../common/util/misc/extend');

var _extend2 = _interopRequireDefault(_extend);

var _uid = require('./../common/util/misc/uid');

var _uid2 = _interopRequireDefault(_uid);

var _define = require('./../common/util/misc/define');

var _define2 = _interopRequireDefault(_define);

var _getName = require('./../common/util/tags/get-name');

var _getName2 = _interopRequireDefault(_getName);

var _update = require('./component/update');

var _update2 = _interopRequireDefault(_update);

var _mixin = require('./component/mixin');

var _mixin2 = _interopRequireDefault(_mixin);

var _mount = require('./component/mount');

var _mount2 = _interopRequireDefault(_mount);

var _unmount = require('./component/unmount');

var _unmount2 = _interopRequireDefault(_unmount);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Tag creation factory function
 * @constructor
 * @param { Object } impl - it contains the tag template, and logic
 * @param { Object } conf - tag options
 * @param { String } innerHTML - html that eventually we need to inject in the tag
 */
function createTag(impl = {}, conf = {}, innerHTML) {
  const tag = conf.context || {};
  const opts = (0, _extend2.default)({}, conf.opts);
  const parent = conf.parent;
  const isLoop = conf.isLoop;
  const isAnonymous = !!conf.isAnonymous;
  const skipAnonymous = _settings2.default.skipAnonymousTags && isAnonymous;
  const item = conf.item;
  // available only for the looped nodes
  const index = conf.index;
  // All attributes on the Tag when it's first parsed
  const instAttrs = [];
  // expressions on this type of Tag
  const implAttrs = [];
  const expressions = [];
  const root = conf.root;
  const tagName = conf.tagName || (0, _getName2.default)(root);
  const isVirtual = tagName === 'virtual';
  const isInline = !isVirtual && !impl.tmpl;
  let dom;

  // make this tag observable
  if (!skipAnonymous) (0, _riotObservable2.default)(tag);
  // only call unmount if we have a valid __TAG_IMPL (has name property)
  if (impl.name && root._tag) root._tag.unmount(true);

  // not yet mounted
  (0, _define2.default)(tag, 'isMounted', false);

  (0, _define2.default)(tag, '__', {
    impl: impl,
    root: root,
    skipAnonymous: skipAnonymous,
    implAttrs: implAttrs,
    isAnonymous: isAnonymous,
    instAttrs: instAttrs,
    innerHTML: innerHTML,
    tagName: tagName,
    index: index,
    isLoop: isLoop,
    isInline: isInline,
    item: item,
    parent: parent,
    // tags having event listeners
    // it would be better to use weak maps here but we can not introduce breaking changes now
    listeners: [],
    // these vars will be needed only for the virtual tags
    virts: [],
    wasCreated: false,
    tail: null,
    head: null
  });

  // create a unique id to this tag
  // it could be handy to use it also to improve the virtual dom rendering speed
  (0, _define2.default)(tag, '_riot_id', (0, _uid2.default)()); // base 1 allows test !t._riot_id
  (0, _define2.default)(tag, 'root', root);
  (0, _extend2.default)(tag, { opts: opts }, item);
  // protect the "tags" and "refs" property from being overridden
  (0, _define2.default)(tag, 'parent', parent || null);
  (0, _define2.default)(tag, 'tags', {});
  (0, _define2.default)(tag, 'refs', {});

  if (isInline || isLoop && isAnonymous) {
    dom = root;
  } else {
    if (!isVirtual) root.innerHTML = '';
    dom = (0, _mkdom2.default)(impl.tmpl, innerHTML, (0, _isSvg2.default)(root));
  }

  (0, _define2.default)(tag, 'update', data => (0, _update2.default)(tag, data, expressions));
  (0, _define2.default)(tag, 'mixin', (...mixins) => (0, _mixin2.default)(tag, ...mixins));
  (0, _define2.default)(tag, 'mount', () => (0, _mount2.default)(tag, dom, expressions, opts));
  (0, _define2.default)(tag, 'unmount', mustKeepRoot => (0, _unmount2.default)(tag, mustKeepRoot, expressions));

  return tag;
}
},{"riot-observable":14,"./mkdom":72,"../../settings":10,"./../common/util/checks/is-svg":54,"./../common/util/misc/extend":18,"./../common/util/misc/uid":49,"./../common/util/misc/define":50,"./../common/util/tags/get-name":59,"./component/update":73,"./component/mixin":74,"./component/mount":75,"./component/unmount":76}],29:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mount;

var _globalVariables = require('./../../global-variables');

var _extend = require('../misc/extend');

var _extend2 = _interopRequireDefault(_extend);

var _contains = require('../misc/contains');

var _contains2 = _interopRequireDefault(_contains);

var _objectCreate = require('../misc/object-create');

var _objectCreate2 = _interopRequireDefault(_objectCreate);

var _tag = require('./../../../tag/tag');

var _tag2 = _interopRequireDefault(_tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Mount a tag creating new Tag instance
 * @param   { Object } root - dom node where the tag will be mounted
 * @param   { String } tagName - name of the riot tag we want to mount
 * @param   { Object } opts - options to pass to the Tag instance
 * @param   { Object } ctx - optional context that will be used to extend an existing class ( used in riot.Tag )
 * @returns { Tag } a new Tag instance
 */
function mount(root, tagName, opts, ctx) {
  const impl = _globalVariables.__TAG_IMPL[tagName];
  const implClass = _globalVariables.__TAG_IMPL[tagName].class;
  const context = ctx || (implClass ? (0, _objectCreate2.default)(implClass.prototype) : {});
  // cache the inner HTML to fix #855
  const innerHTML = root._innerHTML = root._innerHTML || root.innerHTML;
  const conf = (0, _extend2.default)({ root: root, opts: opts, context: context }, { parent: opts ? opts.parent : null });
  let tag;

  if (impl && root) tag = (0, _tag2.default)(impl, conf, innerHTML);

  if (tag && tag.mount) {
    tag.mount(true);
    // add this tag to the virtualDom variable
    if (!(0, _contains2.default)(_globalVariables.__TAGS_CACHE, tag)) _globalVariables.__TAGS_CACHE.push(tag);
  }

  return tag;
}
},{"./../../global-variables":12,"../misc/extend":18,"../misc/contains":37,"../misc/object-create":17,"./../../../tag/tag":36}],34:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _arrayishAdd = require('./arrayish-add');

Object.defineProperty(exports, 'arrayishAdd', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_arrayishAdd).default;
  }
});

var _getName = require('./get-name');

Object.defineProperty(exports, 'getTagName', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_getName).default;
  }
});

var _inheritParentProperties = require('./inherit-parent-properties');

Object.defineProperty(exports, 'inheritParentProps', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_inheritParentProperties).default;
  }
});

var _mount = require('./mount');

Object.defineProperty(exports, 'mountTo', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_mount).default;
  }
});

var _query = require('./query');

Object.defineProperty(exports, 'selectTags', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_query).default;
  }
});

var _arrayishRemove = require('./arrayish-remove');

Object.defineProperty(exports, 'arrayishRemove', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_arrayishRemove).default;
  }
});

var _get = require('./get');

Object.defineProperty(exports, 'getTag', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_get).default;
  }
});

var _initChild = require('./init-child');

Object.defineProperty(exports, 'initChildTag', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_initChild).default;
  }
});

var _moveChild = require('./move-child');

Object.defineProperty(exports, 'moveChildTag', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_moveChild).default;
  }
});

var _replaceVirtual = require('./replace-virtual');

Object.defineProperty(exports, 'makeReplaceVirtual', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_replaceVirtual).default;
  }
});

var _getImmediateCustomParent = require('./get-immediate-custom-parent');

Object.defineProperty(exports, 'getImmediateCustomParentTag', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_getImmediateCustomParent).default;
  }
});

var _makeVirtual = require('./make-virtual');

Object.defineProperty(exports, 'makeVirtual', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_makeVirtual).default;
  }
});

var _moveVirtual = require('./move-virtual');

Object.defineProperty(exports, 'moveVirtual', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_moveVirtual).default;
  }
});

var _unmountAll = require('./unmount-all');

Object.defineProperty(exports, 'unmountAll', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_unmountAll).default;
  }
});

var _createIfDirective = require('./create-if-directive');

Object.defineProperty(exports, 'createIfDirective', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_createIfDirective).default;
  }
});

var _createRefDirective = require('./create-ref-directive');

Object.defineProperty(exports, 'createRefDirective', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_createRefDirective).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./arrayish-add":58,"./get-name":59,"./inherit-parent-properties":60,"./mount":29,"./query":30,"./arrayish-remove":61,"./get":62,"./init-child":63,"./move-child":64,"./replace-virtual":65,"./get-immediate-custom-parent":66,"./make-virtual":67,"./move-virtual":68,"./unmount-all":69,"./create-if-directive":70,"./create-ref-directive":71}],8:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.observable = exports.version = exports.unregister = exports.update = exports.mixin = exports.mount = exports.tag2 = exports.tag = exports.Tag = exports.util = exports.settings = undefined;

var _styleManager = require('./browser/tag/styleManager');

var _styleManager2 = _interopRequireDefault(_styleManager);

var _riotTmpl = require('riot-tmpl');

var _riotObservable = require('riot-observable');

var _riotObservable2 = _interopRequireDefault(_riotObservable);

var _settings = require('./settings');

var _settings2 = _interopRequireDefault(_settings);

var _globalVariables = require('./browser/common/global-variables');

var _dom = require('./browser/common/util/dom');

var dom = _interopRequireWildcard(_dom);

var _checks = require('./browser/common/util/checks');

var check = _interopRequireWildcard(_checks);

var _misc = require('./browser/common/util/misc');

var misc = _interopRequireWildcard(_misc);

var _tags = require('./browser/common/util/tags');

var tags = _interopRequireWildcard(_tags);

var _core = require('./browser/tag/core');

var core = _interopRequireWildcard(_core);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Riot public api
 */
const settings = exports.settings = _settings2.default; // avoid to add breaking changes
const util = exports.util = {
  tmpl: _riotTmpl.tmpl,
  brackets: _riotTmpl.brackets,
  styleManager: _styleManager2.default,
  vdom: _globalVariables.__TAGS_CACHE,
  styleNode: _styleManager2.default.styleNode,
  // export the riot internal utils as well
  dom: dom,
  check: check,
  misc: misc,
  tags: tags

  // export the core props/methods
};const Tag = exports.Tag = core.Tag;
const tag = exports.tag = core.tag;
const tag2 = exports.tag2 = core.tag2;
const mount = exports.mount = core.mount;
const mixin = exports.mixin = core.mixin;
const update = exports.update = core.update;
const unregister = exports.unregister = core.unregister;
const version = exports.version = core.version;
const observable = exports.observable = _riotObservable2.default;

exports.default = misc.extend({}, core, {
  observable: _riotObservable2.default,
  settings: settings,
  util: util
});
},{"./browser/tag/styleManager":11,"riot-tmpl":15,"riot-observable":14,"./settings":10,"./browser/common/global-variables":12,"./browser/common/util/dom":31,"./browser/common/util/checks":32,"./browser/common/util/misc":33,"./browser/common/util/tags":34,"./browser/tag/core":13}],6:[function(require,module,exports) {
'use strict';

var _riot = require('riot');

var _riot2 = _interopRequireDefault(_riot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_riot2.default.tag2('app', '<img src="https://placehold.jp/150x150.png" alt=""> <h3>{head}</h3> <p>{txt}</p>', '', 'class="item"', function (opts) {
  this.head = opts.head;
  this.txt = opts.txt;
});

_riot2.default.tag2('coffee', '<h1>{name}</h1>', '', '', function (opts) {
  this.name = opts.name;
});
_riot2.default.tag2('ichigo', '<div class="item" each="{item_list}"> <img src="https://placehold.jp/150x150.png" alt=""> <h3>{name}</h1> <p>{txt}</p> </div>', '', '', function (opts) {

  var array = [{ name: 'name', txt: 'これはichigoタグの中身' }];
  for (var i = 0; i < 9; i++) {
    array.push({ name: 'name', txt: 'これはichigoタグの中身' });
  }this.item_list = array;
  this.image = opts.res;
});
},{"riot":8}],16:[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],9:[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":16}],5:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":9}],4:[function(require,module,exports) {
'use strict';

var _riot = require('riot');

var _riot2 = _interopRequireDefault(_riot);

require('./app/tags');

require('./style/main.sass');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_riot2.default.mount('App');
_riot2.default.mount('ichigo');
_riot2.default.mount('coffee');
},{"riot":8,"./app/tags":6,"./style/main.sass":5}],102:[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '49866' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
      // Clear the console after HMR
      console.clear();
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[102,4], null)
//# sourceMappingURL=/riotJsTest.f32dfe66.map