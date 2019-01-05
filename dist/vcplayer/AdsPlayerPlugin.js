(function () { var define = undefined; 

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('playercore'), require('react')) :
	typeof define === 'function' && define.amd ? define(['playercore', 'react'], factory) :
	(factory(global.vcplayerCore,global.React));
}(this, (function (playercore,React) { 'use strict';

var playercore__default = 'default' in playercore ? playercore['default'] : playercore;
var React__default = 'default' in React ? React['default'] : React;

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var toString = {}.toString;

var _cof = function (it) {
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject = function (it) {
  return _iobject(_defined(it));
};

var f$1 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$1
};

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var document$1 = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document$1) && _isObject(document$1.createElement);
var _domCreate = function (it) {
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
});

var gOPD = Object.getOwnPropertyDescriptor;

var f = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = _toIobject(O);
  P = _toPrimitive(P, true);
  if (_ie8DomDefine) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
};

var _objectGopd = {
	f: f
};

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function (fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var dP = Object.defineProperty;

var f$2 = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f$2
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && _has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? _ctx(out, _global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

// most Object methods by ES6 should accept primitives



var _objectSap = function (KEY, exec) {
  var fn = (_core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
};

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)

var $getOwnPropertyDescriptor = _objectGopd.f;

_objectSap('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(_toIobject(it), key);
  };
});

var $Object = _core.Object;
var getOwnPropertyDescriptor$1 = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};

var getOwnPropertyDescriptor = createCommonjsModule(function (module) {
module.exports = { "default": getOwnPropertyDescriptor$1, __esModule: true };
});

var _Object$getOwnPropertyDescriptor = unwrapExports(getOwnPropertyDescriptor);

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// true  -> String#at
// false -> String#codePointAt
var _stringAt = function (TO_STRING) {
  return function (that, pos) {
    var s = String(_defined(that));
    var i = _toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

var _library = true;

var _redefine = _hide;

var _iterators = {};

// 7.1.15 ToLength

var min = Math.min;
var _toLength = function (it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;
var _toAbsoluteIndex = function (index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes



var _arrayIncludes = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject($this);
    var length = _toLength(O.length);
    var index = _toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var _shared = createCommonjsModule(function (module) {
var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: _core.version,
  mode: _library ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});
});

var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var shared = _shared('keys');

var _sharedKey = function (key) {
  return shared[key] || (shared[key] = _uid(key));
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO$1 = _sharedKey('IE_PROTO');

var _objectKeysInternal = function (object, names) {
  var O = _toIobject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO$1) _has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (_has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)



var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};

var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  _anObject(O);
  var keys = _objectKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
  return O;
};

var document$2 = _global.document;
var _html = document$2 && document$2.documentElement;

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



var IE_PROTO = _sharedKey('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE$1 = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate('iframe');
  var i = _enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  _html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
  return createDict();
};

var _objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE$1] = _anObject(O);
    result = new Empty();
    Empty[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : _objectDps(result, Properties);
};

var _wks = createCommonjsModule(function (module) {
var store = _shared('wks');

var Symbol = _global.Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
};

$exports.store = store;
});

var def = _objectDp.f;

var TAG = _wks('toStringTag');

var _setToStringTag = function (it, tag, stat) {
  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

'use strict';



var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

var _iterCreate = function (Constructor, NAME, next) {
  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
  _setToStringTag(Constructor, NAME + ' Iterator');
};

// 7.1.13 ToObject(argument)

var _toObject = function (it) {
  return Object(_defined(it));
};

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


var IE_PROTO$2 = _sharedKey('IE_PROTO');
var ObjectProto = Object.prototype;

var _objectGpo = Object.getPrototypeOf || function (O) {
  O = _toObject(O);
  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

'use strict';








var ITERATOR = _wks('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  _iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      _setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!_library && typeof IteratorPrototype[ITERATOR] != 'function') _hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    _hide(proto, ITERATOR, $default);
  }
  // Plug for library
  _iterators[NAME] = $default;
  _iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) _redefine(proto, key, methods[key]);
    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

'use strict';
var $at = _stringAt(true);

// 21.1.3.27 String.prototype[@@iterator]()
_iterDefine(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

var _iterStep = function (done, value) {
  return { value: value, done: !!done };
};

'use strict';





// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
  this._t = _toIobject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return _iterStep(1);
  }
  if (kind == 'keys') return _iterStep(0, index);
  if (kind == 'values') return _iterStep(0, O[index]);
  return _iterStep(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
_iterators.Arguments = _iterators.Array;

var TO_STRING_TAG = _wks('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = _global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
  _iterators[NAME] = _iterators.Array;
}

var f$3 = _wks;

var _wksExt = {
	f: f$3
};

var iterator$2 = _wksExt.f('iterator');

var iterator = createCommonjsModule(function (module) {
module.exports = { "default": iterator$2, __esModule: true };
});

unwrapExports(iterator);

var _meta = createCommonjsModule(function (module) {
var META = _uid('meta');


var setDesc = _objectDp.f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !_fails(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!_has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!_has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};
});

var defineProperty = _objectDp.f;
var _wksDefine = function (name) {
  var $Symbol = _core.Symbol || (_core.Symbol = _library ? {} : _global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: _wksExt.f(name) });
};

var f$4 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$4
};

// all enumerable object keys, includes symbols



var _enumKeys = function (it) {
  var result = _objectKeys(it);
  var getSymbols = _objectGops.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = _objectPie.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

// 7.2.2 IsArray(argument)

var _isArray = Array.isArray || function isArray(arg) {
  return _cof(arg) == 'Array';
};

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

var f$6 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return _objectKeysInternal(O, hiddenKeys);
};

var _objectGopn = {
	f: f$6
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

var gOPN$1 = _objectGopn.f;
var toString$1 = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN$1(it);
  } catch (e) {
    return windowNames.slice();
  }
};

var f$5 = function getOwnPropertyNames(it) {
  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN$1(_toIobject(it));
};

var _objectGopnExt = {
	f: f$5
};

'use strict';
// ECMAScript 6 symbols shim





var META = _meta.KEY;



















var gOPD$1 = _objectGopd.f;
var dP$1 = _objectDp.f;
var gOPN = _objectGopnExt.f;
var $Symbol = _global.Symbol;
var $JSON = _global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE$2 = 'prototype';
var HIDDEN = _wks('_hidden');
var TO_PRIMITIVE = _wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = _shared('symbol-registry');
var AllSymbols = _shared('symbols');
var OPSymbols = _shared('op-symbols');
var ObjectProto$1 = Object[PROTOTYPE$2];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = _global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = _descriptors && _fails(function () {
  return _objectCreate(dP$1({}, 'a', {
    get: function () { return dP$1(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD$1(ObjectProto$1, key);
  if (protoDesc) delete ObjectProto$1[key];
  dP$1(it, key, D);
  if (protoDesc && it !== ObjectProto$1) dP$1(ObjectProto$1, key, protoDesc);
} : dP$1;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty$1 = function defineProperty(it, key, D) {
  if (it === ObjectProto$1) $defineProperty$1(OPSymbols, key, D);
  _anObject(it);
  key = _toPrimitive(key, true);
  _anObject(D);
  if (_has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!_has(it, HIDDEN)) dP$1(it, HIDDEN, _propertyDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP$1(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  _anObject(it);
  var keys = _enumKeys(P = _toIobject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty$1(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = _toPrimitive(key, true));
  if (this === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor$1 = function getOwnPropertyDescriptor(it, key) {
  it = _toIobject(it);
  key = _toPrimitive(key, true);
  if (it === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
  var D = gOPD$1(it, key);
  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(_toIobject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto$1;
  var names = gOPN(IS_OP ? OPSymbols : _toIobject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto$1, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto$1) $set.call(OPSymbols, value);
      if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, _propertyDesc(1, value));
    };
    if (_descriptors && setter) setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
    return this._k;
  });

  _objectGopd.f = $getOwnPropertyDescriptor$1;
  _objectDp.f = $defineProperty$1;
  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
  _objectPie.f = $propertyIsEnumerable;
  _objectGops.f = $getOwnPropertySymbols;

  if (_descriptors && !_library) {
    _redefine(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  _wksExt.f = function (name) {
    return wrap(_wks(name));
  };
}

_export(_export.G + _export.W + _export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)_wks(es6Symbols[j++]);

for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

_export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return _has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

_export(_export.S + _export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty$1,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor$1,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!_isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!_isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
_setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
_setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
_setToStringTag(_global.JSON, 'JSON', true);

_wksDefine('asyncIterator');

_wksDefine('observable');

var symbol$2 = _core.Symbol;

var symbol = createCommonjsModule(function (module) {
module.exports = { "default": symbol$2, __esModule: true };
});

unwrapExports(symbol);

var _typeof_1 = createCommonjsModule(function (module, exports) {
"use strict";

exports.__esModule = true;



var _iterator2 = _interopRequireDefault(iterator);



var _symbol2 = _interopRequireDefault(symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
});

var _typeof = unwrapExports(_typeof_1);

// 19.1.2.9 Object.getPrototypeOf(O)



_objectSap('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return _objectGpo(_toObject(it));
  };
});

var getPrototypeOf$1 = _core.Object.getPrototypeOf;

var getPrototypeOf = createCommonjsModule(function (module) {
module.exports = { "default": getPrototypeOf$1, __esModule: true };
});

var _Object$getPrototypeOf = unwrapExports(getPrototypeOf);

'use strict';
// 19.1.2.1 Object.assign(target, source, ...)





var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
var _objectAssign = !$assign || _fails(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = _toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = _objectGops.f;
  var isEnum = _objectPie.f;
  while (aLen > index) {
    var S = _iobject(arguments[index++]);
    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;

// 19.1.3.1 Object.assign(target, source)


_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

var assign$2 = _core.Object.assign;

var assign = createCommonjsModule(function (module) {
module.exports = { "default": assign$2, __esModule: true };
});

unwrapExports(assign);

var _extends = createCommonjsModule(function (module, exports) {
"use strict";

exports.__esModule = true;



var _assign2 = _interopRequireDefault(assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};
});

var _extends$1 = unwrapExports(_extends);

var classCallCheck = createCommonjsModule(function (module, exports) {
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
});

var _classCallCheck = unwrapExports(classCallCheck);

var possibleConstructorReturn = createCommonjsModule(function (module, exports) {
"use strict";

exports.__esModule = true;



var _typeof3 = _interopRequireDefault(_typeof_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};
});

var _possibleConstructorReturn = unwrapExports(possibleConstructorReturn);

// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

var $Object$1 = _core.Object;
var defineProperty$3 = function defineProperty(it, key, desc) {
  return $Object$1.defineProperty(it, key, desc);
};

var defineProperty$1 = createCommonjsModule(function (module) {
module.exports = { "default": defineProperty$3, __esModule: true };
});

unwrapExports(defineProperty$1);

var createClass = createCommonjsModule(function (module, exports) {
"use strict";

exports.__esModule = true;



var _defineProperty2 = _interopRequireDefault(defineProperty$1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
});

var _createClass = unwrapExports(createClass);

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */


var check = function (O, proto) {
  _anObject(O);
  if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
var _setProto = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

// 19.1.3.19 Object.setPrototypeOf(O, proto)

_export(_export.S, 'Object', { setPrototypeOf: _setProto.set });

var setPrototypeOf$2 = _core.Object.setPrototypeOf;

var setPrototypeOf = createCommonjsModule(function (module) {
module.exports = { "default": setPrototypeOf$2, __esModule: true };
});

unwrapExports(setPrototypeOf);

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
_export(_export.S, 'Object', { create: _objectCreate });

var $Object$2 = _core.Object;
var create$2 = function create(P, D) {
  return $Object$2.create(P, D);
};

var create = createCommonjsModule(function (module) {
module.exports = { "default": create$2, __esModule: true };
});

unwrapExports(create);

var inherits = createCommonjsModule(function (module, exports) {
"use strict";

exports.__esModule = true;



var _setPrototypeOf2 = _interopRequireDefault(setPrototypeOf);



var _create2 = _interopRequireDefault(create);



var _typeof3 = _interopRequireDefault(_typeof_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};
});

var _inherits = unwrapExports(inherits);

var runtime = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = 'object' === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);
});

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

var runtimeModule = runtime;

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}

var regenerator = runtimeModule;

// getting tag from 19.1.3.6 Object.prototype.toString()

var TAG$1 = _wks('toStringTag');
// ES3 wrong here
var ARG = _cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

var _classof = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
    // builtinTag case
    : ARG ? _cof(O)
    // ES3 arguments fallback
    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

var _anInstance = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

// call something on iterator step with safe closing on error

var _iterCall = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) _anObject(ret.call(iterator));
    throw e;
  }
};

// check on default Array iterator

var ITERATOR$1 = _wks('iterator');
var ArrayProto = Array.prototype;

var _isArrayIter = function (it) {
  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
};

var ITERATOR$2 = _wks('iterator');

var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$2]
    || it['@@iterator']
    || _iterators[_classof(it)];
};

var _forOf = createCommonjsModule(function (module) {
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : core_getIteratorMethod(iterable);
  var f = _ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (_isArrayIter(iterFn)) for (length = _toLength(iterable.length); length > index; index++) {
    result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = _iterCall(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;
});

// 7.3.20 SpeciesConstructor(O, defaultConstructor)


var SPECIES = _wks('species');
var _speciesConstructor = function (O, D) {
  var C = _anObject(O).constructor;
  var S;
  return C === undefined || (S = _anObject(C)[SPECIES]) == undefined ? D : _aFunction(S);
};

// fast apply, http://jsperf.lnkit.com/fast-apply/5
var _invoke = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};

var process$1 = _global.process;
var setTask = _global.setImmediate;
var clearTask = _global.clearImmediate;
var MessageChannel = _global.MessageChannel;
var Dispatch = _global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer;
var channel;
var port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      _invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (_cof(process$1) == 'process') {
    defer = function (id) {
      process$1.nextTick(_ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(_ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = _ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (_global.addEventListener && typeof postMessage == 'function' && !_global.importScripts) {
    defer = function (id) {
      _global.postMessage(id + '', '*');
    };
    _global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in _domCreate('script')) {
    defer = function (id) {
      _html.appendChild(_domCreate('script'))[ONREADYSTATECHANGE] = function () {
        _html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(_ctx(run, id, 1), 0);
    };
  }
}
var _task = {
  set: setTask,
  clear: clearTask
};

var macrotask = _task.set;
var Observer = _global.MutationObserver || _global.WebKitMutationObserver;
var process$2 = _global.process;
var Promise$1 = _global.Promise;
var isNode$1 = _cof(process$2) == 'process';

var _microtask = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode$1 && (parent = process$2.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode$1) {
    notify = function () {
      process$2.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(_global.navigator && _global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise$1 && Promise$1.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise$1.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(_global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};

'use strict';
// 25.4.1.5 NewPromiseCapability(C)


function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = _aFunction(resolve);
  this.reject = _aFunction(reject);
}

var f$7 = function (C) {
  return new PromiseCapability(C);
};

var _newPromiseCapability = {
	f: f$7
};

var _perform = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

var navigator$1 = _global.navigator;

var _userAgent = navigator$1 && navigator$1.userAgent || '';

var _promiseResolve = function (C, x) {
  _anObject(C);
  if (_isObject(x) && x.constructor === C) return x;
  var promiseCapability = _newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

var _redefineAll = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else _hide(target, key, src[key]);
  } return target;
};

'use strict';




var SPECIES$1 = _wks('species');

var _setSpecies = function (KEY) {
  var C = typeof _core[KEY] == 'function' ? _core[KEY] : _global[KEY];
  if (_descriptors && C && !C[SPECIES$1]) _objectDp.f(C, SPECIES$1, {
    configurable: true,
    get: function () { return this; }
  });
};

var ITERATOR$3 = _wks('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR$3]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  
} catch (e) { /* empty */ }

var _iterDetect = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR$3]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR$3] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

'use strict';










var task = _task.set;
var microtask = _microtask();




var PROMISE = 'Promise';
var TypeError$1 = _global.TypeError;
var process = _global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = _global[PROMISE];
var isNode = _classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal;
var newGenericPromiseCapability;
var OwnPromiseCapability;
var Wrapper;
var newPromiseCapability = newGenericPromiseCapability = _newPromiseCapability.f;

var USE_NATIVE$1 = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[_wks('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && _userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return _isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError$1('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(_global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = _perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = _global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = _global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(_global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = _global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, _ctx($resolve, wrapper, 1), _ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE$1) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    _anInstance(this, $Promise, PROMISE, '_h');
    _aFunction(executor);
    Internal.call(this);
    try {
      executor(_ctx($resolve, this, 1), _ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = _redefineAll($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(_speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = _ctx($resolve, promise, 1);
    this.reject = _ctx($reject, promise, 1);
  };
  _newPromiseCapability.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

_export(_export.G + _export.W + _export.F * !USE_NATIVE$1, { Promise: $Promise });
_setToStringTag($Promise, PROMISE);
_setSpecies(PROMISE);
Wrapper = _core[PROMISE];

// statics
_export(_export.S + _export.F * !USE_NATIVE$1, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
_export(_export.S + _export.F * (_library || !USE_NATIVE$1), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return _promiseResolve(_library && this === Wrapper ? $Promise : this, x);
  }
});
_export(_export.S + _export.F * !(USE_NATIVE$1 && _iterDetect(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = _perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      _forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = _perform(function () {
      _forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

// https://github.com/tc39/proposal-promise-finally
'use strict';






_export(_export.P + _export.R, 'Promise', { 'finally': function (onFinally) {
  var C = _speciesConstructor(this, _core.Promise || _global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return _promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return _promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });

'use strict';
// https://github.com/tc39/proposal-promise-try




_export(_export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = _newPromiseCapability.f(this);
  var result = _perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });

var promise$1 = _core.Promise;

var promise = createCommonjsModule(function (module) {
module.exports = { "default": promise$1, __esModule: true };
});

var _Promise = unwrapExports(promise);

var asyncToGenerator = createCommonjsModule(function (module, exports) {
"use strict";

exports.__esModule = true;



var _promise2 = _interopRequireDefault(promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};
});

var _asyncToGenerator = unwrapExports(asyncToGenerator);

var _class$3;
var _temp$3;

/**
 * BaseClass của VCPlayer
 * @class VCPlayerObject
 */
var VCPlayerObject$1 = (_temp$3 = _class$3 = function () {

    /**
     * Tạo một instance của class SkyGoObject
     * @param  {Object} props
     */


    /**
     * Định props default
     * @type {Object}
     */
    function VCPlayerObject(props) {
        _classCallCheck(this, VCPlayerObject);

        this.state = {};

        this._validProps(props);
        this._initProps(props);
    }

    /**
     * get default props
     * @return {Object}       Trả về props default (static defaultProps)
     */


    /**
     * Định nghĩa kiểu của props
     * @type {Object}
     */


    _createClass(VCPlayerObject, [{
        key: 'getDefaultProps',
        value: function getDefaultProps() {
            return this.constructor.defaultProps;
        }

        /**
         * Hàm set state
         * @param {Object} state={}
         */

    }, {
        key: 'setState',
        value: function setState() {
            var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var old_state = this.state || {};
            this.state = _extends$1({}, old_state, state);

            playercore.log.stateInfo({
                label: this.constructor.name,
                prevState: old_state,
                nextState: state
            });
        }

        /**
         * Hàm update props
         * @param  {Object} props
         */

    }, {
        key: 'updateProps',
        value: function updateProps() {
            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var old_props = this.props || {};
            this.props = _extends$1({}, old_props, props);
        }

        /**
         * Hàm init props. 
         * ```js
         * var defaultProps = this.getDefaultProps(props);
         * this.props = {...defaultProps, ...props};
         *  ```
         * @param  {Object} props Props được truyền vào trong constructor
         */

    }, {
        key: '_initProps',
        value: function _initProps(props) {
            var defaultProps = this.getDefaultProps(props);
            this.props = _extends$1({}, defaultProps, props);
        }

        /**
         * Hàm valid props truyền vào hàm constructor khi khởi tạo đối tượng dựa trên propTypes
         */

    }, {
        key: '_validProps',
        value: function _validProps(props) {
            var propTypes = this.constructor.propTypes;

            playercore.PropTypes.checkPropTypes(propTypes, props, 'prop', this.constructor.name);
        }
    }]);

    return VCPlayerObject;
}(), _class$3.propTypes = {}, _class$3.defaultProps = {}, _temp$3);

var ISO8086_REGEXP = /^([+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([.,]\d+(?!:))?)?(\17[0-5]\d([.,]\d+)?)?([zZ]|([+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;

function noop() {}

function isNull(o) {
    return o === null;
}

function isDefined(o) {
    return o !== undefined;
}

function isObject$1(obj) {
    return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}

function isFunction(str) {
    return typeof str === 'function';
}

function isNumber(num) {
    return typeof num === 'number';
}

function isArray$1(array) {
    return Object.prototype.toString.call(array) === '[object Array]';
}

function isString(str) {
    return typeof str === 'string';
}

function isEmptyString(str) {
    return isString(str) && str.length === 0;
}

function isNotEmptyString(str) {
    return isString(str) && str.length !== 0;
}

function arrayLikeObjToArray(args) {
    return Array.prototype.slice.call(args);
}

function forEach(obj, iterator, context) {
    var key, length;
    if (obj) {
        if (isFunction(obj)) {
            for (key in obj) {
                // Need to check if hasOwnProperty exists,
                // as on IE8 the result of querySelectorAll is an object without a hasOwnProperty function
                if (key !== 'prototype' && key !== 'length' && key !== 'name' && (!obj.hasOwnProperty || obj.hasOwnProperty(key))) {
                    iterator.call(context, obj[key], key, obj);
                }
            }
        } else if (isArray$1(obj)) {
            var isPrimitive = (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object';
            for (key = 0, length = obj.length; key < length; key++) {
                if (isPrimitive || key in obj) {
                    iterator.call(context, obj[key], key, obj);
                }
            }
        } else if (obj.forEach && obj.forEach !== forEach) {
            obj.forEach(iterator, context, obj);
        } else {
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    iterator.call(context, obj[key], key, obj);
                }
            }
        }
    }
    return obj;
}

function extend(obj) {
    var arg, i, k;
    for (i = 1; i < arguments.length; i++) {
        arg = arguments[i];
        for (k in arg) {
            if (arg.hasOwnProperty(k)) {
                if (isObject$1(obj[k]) && !isNull(obj[k]) && isObject$1(arg[k])) {
                    obj[k] = extend({}, obj[k], arg[k]);
                } else {
                    obj[k] = arg[k];
                }
            }
        }
    }
    return obj;
}

function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function decapitalize(s) {
    return s.charAt(0).toLowerCase() + s.slice(1);
}

/**
 * This method works the same way array.prototype.map works but if the transformer returns undefine, then
 * it won't be added to the transformed Array.
 */
function transformArray(array, transformer) {
    var transformedArray = [];

    array.forEach(function (item, index) {
        var transformedItem = transformer(item, index);
        if (isDefined(transformedItem)) {
            transformedArray.push(transformedItem);
        }
    });

    return transformedArray;
}

function toFixedDigits(num, digits) {
    var formattedNum = num + '';
    digits = isNumber(digits) ? digits : 0;
    num = isNumber(num) ? num : parseInt(num, 10);
    if (isNumber(num) && !isNaN(num)) {
        formattedNum = num + '';
        while (formattedNum.length < digits) {
            formattedNum = '0' + formattedNum;
        }
        return formattedNum;
    }
    return NaN + '';
}

function throttle(callback, delay) {
    var previousCall = new Date().getTime() - (delay + 1);
    return function () {
        var time = new Date().getTime();
        if (time - previousCall >= delay) {
            previousCall = time;
            callback.apply(this, arguments);
        }
    };
}

function isISO8601(value) {
    if (isNumber(value)) {
        value = value + ''; //we make sure that we are working with strings
    }

    if (!isString(value)) {
        return false;
    }

    return ISO8086_REGEXP.test(value.trim());
}

/**
 * Checks if the Browser is IE9 and below
 * @returns {boolean}
 */
function isOldIE() {
    var version = getInternetExplorerVersion(navigator);
    if (version === -1) {
        return false;
    }

    return version < 10;
}

/**
 * Returns the version of Internet Explorer or a -1 (indicating the use of another browser).
 * Source: https://msdn.microsoft.com/en-us/library/ms537509(v=vs.85).aspx
 * @returns {number} the version of Internet Explorer or a -1 (indicating the use of another browser).
 */
function getInternetExplorerVersion(navigator) {
    var rv = -1;

    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re = new RegExp('MSIE ([0-9]{1,}\\.[0-9]{0,})');
        var res = re.exec(ua);
        if (res !== null) {
            rv = parseFloat(res[1]);
        }
    }

    return rv;
}

var Dom = function () {
    function Dom() {
        _classCallCheck(this, Dom);
    }

    _createClass(Dom, null, [{
        key: 'addClass',
        value: function addClass(el, cssClass) {
            var classes;

            if (isNotEmptyString(cssClass)) {
                if (el.classList) {
                    return el.classList.add(cssClass);
                }

                classes = isString(el.getAttribute('class')) ? el.getAttribute('class').split(/\s+/) : [];
                if (isString(cssClass) && isNotEmptyString(cssClass.replace(/\s+/, ''))) {
                    classes.push(cssClass);
                    el.setAttribute('class', classes.join(' '));
                }
            }
        }
    }, {
        key: 'addEventListener',
        value: function addEventListener(el, type, handler) {
            if (isArray$1(el)) {
                forEach(el, function (e) {
                    Dom.addEventListener(e, type, handler);
                });
                return;
            }

            if (isArray$1(type)) {
                forEach(type, function (t) {
                    Dom.addEventListener(el, t, handler);
                });
                return;
            }

            if (el.addEventListener) {
                el.addEventListener(type, handler, false);
            } else if (el.attachEvent) {
                // WARNING!!! this is a very naive implementation !
                // the event object that should be passed to the handler
                // would not be there for IE8
                // we should use "window.event" and then "event.srcElement"
                // instead of "event.target"
                el.attachEvent('on' + type, handler);
            }
        }
    }, {
        key: 'remove',
        value: function remove(node) {
            if (node && node.parentNode) {
                node.parentNode.removeChild(node);
            }
        }
    }, {
        key: 'removeEventListener',
        value: function removeEventListener(el, type, handler) {
            if (isArray$1(el)) {
                forEach(el, function (e) {
                    Dom.removeEventListener(e, type, handler);
                });
                return;
            }

            if (isArray$1(type)) {
                forEach(type, function (t) {
                    Dom.removeEventListener(el, t, handler);
                });
                return;
            }

            if (el.removeEventListener) {
                el.removeEventListener(type, handler, false);
            } else if (el.detachEvent) {
                el.detachEvent('on' + type, handler);
            } else {
                el['on' + type] = null;
            }
        }
    }, {
        key: 'isDomElement',
        value: function isDomElement(ele) {
            return ele instanceof Element;
        }
    }, {
        key: 'getDimension',
        value: function getDimension(element) {
            var rect;

            //On IE9 and below getBoundingClientRect does not work consistently
            if (!isOldIE() && element.getBoundingClientRect) {
                rect = element.getBoundingClientRect();
                return {
                    width: rect.width,
                    height: rect.height
                };
            }

            return {
                width: element.offsetWidth,
                height: element.offsetHeight
            };
        }
    }]);

    return Dom;
}();

/**
 * class VastError
 */
var VastError = function () {
    function VastError() {
        var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var data = arguments[2];

        _classCallCheck(this, VastError);

        this.code = code;
        this.msg = msg;
        if (data) {
            this.data = data;
        }
    }

    _createClass(VastError, [{
        key: 'extendsWithData',
        value: function extendsWithData(data) {
            var code = this.code;
            var msg = this.msg;

            return new Error(code, msg, data);
        }
    }]);

    return VastError;
}();

var generateError = function generateError(code, msg) {
    return new VastError(code, msg);
};

/**
 * Danh sách các lỗi
 * @type {Object}
 */
var error = {
    ERROR_DF_99: generateError(99, 'timeout while waiting for the video to start playing'),
    ERROR_100: generateError(100, 'VASTClient, error parsing xml'),
    ERROR_102: generateError(102, 'VASTClient, not supported VAST version'),
    ERROR_301: generateError(301, 'VASTClient, request ad tag url error'),
    ERROR_303: generateError(303, 'VASTClient, no Ad in VAST tree'),
    ERROR_402: generateError(402, 'timeout while waiting for the video to start playing'),

    VPAIDHTML5TECH_INVALID_MEDIA_FILE: generateError(700, 'Invalid MediaFile'),
    VPAIDHTML5TECH_INVALID_DOM_CONTAINER_EL: generateError(701, 'Invalid container HtmlElement'),
    VPAIDHTML5TECH_INVALID_DOM_VIDEO_EL: generateError(702, 'Invalid HTMLVideoElement'),
    VPAIDHTML5TECH_MISSING_CALLBACK: generateError(702, 'Missing valid callback'),

    VASTTRACKER_ASSET_URI: generateError(110, 'VASTTracker, missing required the URI of the ad asset being played'),
    VASTTRACKER_VAST_RESPONSE: generateError(111, 'VASTTracker, missing required VAST response'),

    VASTClIENT_MISS_AD_TAG_URL: generateError(120, 'VASTClient, missing ad tag URL'),
    VASTClIENT_RESQUEST_AD_TAG_URL_ERROR: generateError(121, 'VASTClient, request ad tag url error'),
    VASTClIENT_NO_AD_IN_VAST_TREE: generateError(303, 'VASTClient, no Ad in VAST tree'),
    VASTClIENT_NOT_SUPPORT_VAST_VERSION: generateError(102, 'VASTClient, not supported VAST version'),
    VASTClIENT_PARSING_XML_ERROR: generateError(100, 'VASTClient, error parsing xml'),
    VASTClIENT_WRAPPER_LIMIT_REACHED: generateError(302, 'VASTClient, players wrapper limit reached'),
    VASTClIENT_AD_TYPE_NOT_SUPPORT: generateError(200, 'VASTClient, received an Ad type that is not supported'),
    VASTClIENT_MISSING_DURATION: generateError(101, 'VASTClient, missing duration field in VAST response'),
    VASTClIENT_MISSING_OFFSET_TRACKING: generateError(101, 'VASTClient, missing or wrong offset attribute on progress tracking event'),

    VALID_AD_ERROR_1: generateError(101, 'VASTClient, InLine and Wrapper both found on the same Ad'),
    VALID_AD_ERROR_2: generateError(101, 'VASTClient, nor wrapper nor inline elements found on the Ad'),
    VALID_AD_ERROR_3: generateError(403, 'VASTClient, could not find MediaFile that is supported by this video player'),
    VALID_AD_ERROR_4: generateError(133, 'VASTClient, missing "VASTAdTagURI" in wrapper'),

    VAST_INTEGRATOR_SOURCE_ERROR: generateError(403, 'VASTIntegrator, Could not find Ad mediafile supported by this player'),

    VPAID_INTEGRATOR_NOT_SUPPORT_MEDIAFILE: generateError(150, 'VPAIDIntegrator, Could not find a supported mediaFile'),
    VPAID_INTEGRATOR_HANDSHAKE_NOT_SUPPORT_VERSION: generateError(151, 'VPAIDIntegrator handshake, unsupported version'),
    VPAID_INTEGRATOR_ERROR_WHILE_WAITING_FINISH: generateError(152, ' VPAIDIntegrator, error while waiting for the adUnit to finish playing'),
    VPAID_INTEGRATOR_ERROR_WHILE_INIT: generateError(153, ' VPAIDIntegrator, error while waiting init adUnit'),

    VPAID_AD_UNIT_WRAPPER_AD_UNIT_NOT_FULLY: generateError(160, 'VPAIDAdUnitWrapper, the passed VPAID adUnit does not fully implement the VPAID interface'),
    VPAID_AD_UNIT_WRAPPER_METHOD_TIMEOUT: generateError(161, ' VPAIDAdUnitWrapper, timeout while waiting for a response on call method'),
    VPAID_AD_UNIT_WRAPPER_INVALID_METHOD_NAME: generateError(162, ' VPAIDAdUnitWrapper, invalid method name'),
    VPAID_AD_UNIT_WRAPPER_MISSING_CALLBACK: generateError(163, ' VPAIDAdUnitWrapper, missing callback'),

    VPAID_AD_UNIT_WRAPPER_EVENT_TIMEOUT: generateError(601, ' VPAIDAdUnitWrapper, timeout while waiting for event'),
    VPAID_AD_UNIT_WRAPPER_MISSING_EVENT_NAME: generateError(165, ' VPAIDAdUnitWrapper, missing event name'),
    VPAID_AD_UNIT_WRAPPER_MISSING_EVENT_CALLBACK: generateError(166, ' VPAIDAdUnitWrapper, missing event callback')
};

'use strict';

/**
 * noop a empty function
 */
function noop$1() {}

/**
 * validate if is not validate will return an Error with the message
 *
 * @param {boolean} isValid
 * @param {string} message
 */
function validate(isValid, message) {
    return isValid ? null : new Error(message);
}

var timeouts = {};
/**
 * clearCallbackTimeout
 *
 * @param {function} func handler to remove
 */
function clearCallbackTimeout(func) {
    var timeout = timeouts[func];
    if (timeout) {
        clearTimeout(timeout);
        delete timeouts[func];
    }
}

/**
 * callbackTimeout if the onSuccess is not called and returns true in the timelimit then onTimeout will be called
 *
 * @param {number} timer
 * @param {function} onSuccess
 * @param {function} onTimeout
 */
function callbackTimeout(timer, onSuccess, onTimeout) {
    var callback, timeout;

    timeout = setTimeout(function () {
        onSuccess = noop$1;
        delete timeout[callback];
        onTimeout();
    }, timer);

    callback = function () {
        // TODO avoid leaking arguments
        // https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
        if (onSuccess.apply(this, arguments)) {
            clearCallbackTimeout(callback);
        }
    };

    timeouts[callback] = timeout;

    return callback;
}


/**
 * createElementInEl
 *
 * @param {HTMLElement} parent
 * @param {string} tagName
 * @param {string} id
 */
function createElementInEl(parent, tagName, id) {
    var nEl = document.createElement(tagName);
    if (id) nEl.id = id;
    parent.appendChild(nEl);
    return nEl;
}

/**
 * createIframeWithContent
 *
 * @param {HTMLElement} parent
 * @param {string} template simple template using {{var}}
 * @param {object} data
 */
function createIframeWithContent(parent, template, data) {
    var iframe = createIframe(parent, null, data.zIndex);
    if (!setIframeContent(iframe, simpleTemplate(template, data))) return;
    return iframe;
}

/**
 * createIframe
 *
 * @param {HTMLElement} parent
 * @param {string} url
 */
function createIframe(parent, url, zIndex) {
    var nEl = document.createElement('iframe');
    nEl.src = url || 'about:blank';
    nEl.marginWidth = '0';
    nEl.marginHeight = '0';
    nEl.frameBorder = '0';
    nEl.width = '100%';
    nEl.height = '100%';
    setFullSizeStyle(nEl);

    if(zIndex){
        nEl.style.zIndex = zIndex;
    }

    nEl.setAttribute('SCROLLING','NO');
    parent.innerHTML = '';
    parent.appendChild(nEl);
    return nEl;
}

function setFullSizeStyle(element) {
    element.style.position = 'absolute';
    element.style.left = '0';
    element.style.top = '0';
    element.style.margin = '0px';
    element.style.padding = '0px';
    element.style.border = 'none';
    element.style.width = '100%';
    element.style.height = '100%';
}

/**
 * simpleTemplate
 *
 * @param {string} template
 * @param {object} data
 */
function simpleTemplate(template, data) {
    Object.keys(data).forEach(function (key) {
        var value = (typeof value === 'object') ? JSON.stringify(data[key]) : data[key];
        template = template.replace(new RegExp('{{' + key + '}}', 'g'), value);
    });
    return template;
}

/**
 * setIframeContent
 *
 * @param {HTMLIframeElement} iframeEl
 * @param content
 */
function setIframeContent(iframeEl, content) {
    var iframeDoc = iframeEl.contentWindow && iframeEl.contentWindow.document;
    if (!iframeDoc) return false;

    iframeDoc.write(content);

    return true;
}


/**
 * extend object with keys from another object
 *
 * @param {object} toExtend
 * @param {object} fromSource
 */
function extend$1(toExtend, fromSource) {
    Object.keys(fromSource).forEach(function(key) {
        toExtend[key] = fromSource[key];
    });
    return toExtend;
}


/**
 * unique will create a unique string everytime is called, sequentially and prefixed
 *
 * @param {string} prefix
 */
function unique$1(prefix) {
    var count = -1;
    return function () {
        return prefix + '_' + (++count);
    };
}

var utils = {
    noop: noop$1,
    validate: validate,
    clearCallbackTimeout: clearCallbackTimeout,
    callbackTimeout: callbackTimeout,
    createElementInEl: createElementInEl,
    createIframeWithContent: createIframeWithContent,
    createIframe: createIframe,
    setFullSizeStyle: setFullSizeStyle,
    simpleTemplate: simpleTemplate,
    setIframeContent: setIframeContent,
    extend: extend$1,
    unique: unique$1
};

'use strict';

var METHODS$1 = [
    'handshakeVersion',
    'initAd',
    'startAd',
    'stopAd',
    'skipAd', // VPAID 2.0 new method
    'resizeAd',
    'pauseAd',
    'resumeAd',
    'expandAd',
    'collapseAd',
    'subscribe',
    'unsubscribe'
];

var EVENTS = [
    'AdLoaded',
    'AdStarted',
    'AdStopped',
    'AdSkipped',
    'AdSkippableStateChange', // VPAID 2.0 new event
    'AdSizeChange', // VPAID 2.0 new event
    'AdLinearChange',
    'AdDurationChange', // VPAID 2.0 new event
    'AdExpandedChange',
    'AdRemainingTimeChange', // [Deprecated in 2.0] but will be still fired for backwards compatibility
    'AdVolumeChange',
    'AdImpression',
    'AdVideoStart',
    'AdVideoFirstQuartile',
    'AdVideoMidpoint',
    'AdVideoThirdQuartile',
    'AdVideoComplete',
    'AdClickThru',
    'AdInteraction', // VPAID 2.0 new event
    'AdUserAcceptInvitation',
    'AdUserMinimize',
    'AdUserClose',
    'AdPaused',
    'AdPlaying',
    'AdLog',
    'AdError'
];

var GETTERS = [
    'getAdLinear',
    'getAdWidth', // VPAID 2.0 new getter
    'getAdHeight', // VPAID 2.0 new getter
    'getAdExpanded',
    'getAdSkippableState', // VPAID 2.0 new getter
    'getAdRemainingTime',
    'getAdDuration', // VPAID 2.0 new getter
    'getAdVolume',
    'getAdCompanions', // VPAID 2.0 new getter
    'getAdIcons' // VPAID 2.0 new getter
];

var SETTERS = [
    'setAdVolume'
];


/**
 * This callback is displayed as global member. The callback use nodejs error-first callback style
 * @callback NodeStyleCallback
 * @param {string|null}
 * @param {undefined|object}
 */


/**
 * IVPAIDAdUnit
 *
 * @class
 *
 * @param {object} creative
 * @param {HTMLElement} el
 * @param {HTMLVideoElement} video
 */
function IVPAIDAdUnit(creative, el, video) {}


/**
 * handshakeVersion
 *
 * @param {string} VPAIDVersion
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.handshakeVersion = function (VPAIDVersion, callback) {};

/**
 * initAd
 *
 * @param {number} width
 * @param {number} height
 * @param {string} viewMode can be 'normal', 'thumbnail' or 'fullscreen'
 * @param {number} desiredBitrate indicates the desired bitrate in kbps
 * @param {object} [creativeData] used for additional initialization data
 * @param {object} [environmentVars] used for passing implementation-specific of js version
 * @param {NodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.initAd = function(width, height, viewMode, desiredBitrate, creativeData, environmentVars, callback) {};

/**
 * startAd
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.startAd = function(callback) {};

/**
 * stopAd
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.stopAd = function(callback) {};

/**
 * skipAd
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.skipAd = function(callback) {};

/**
 * resizeAd
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.resizeAd = function(width, height, viewMode, callback) {};

/**
 * pauseAd
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.pauseAd = function(callback) {};

/**
 * resumeAd
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.resumeAd = function(callback) {};

/**
 * expandAd
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.expandAd = function(callback) {};

/**
 * collapseAd
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.collapseAd = function(callback) {};

/**
 * subscribe
 *
 * @param {string} event
 * @param {nodeStyleCallback} handler
 * @param {object} context
 */
IVPAIDAdUnit.prototype.subscribe = function(event, handler, context) {};

/**
 * startAd
 *
 * @param {string} event
 * @param {function} handler
 */
IVPAIDAdUnit.prototype.unsubscribe = function(event, handler) {};



/**
 * getAdLinear
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.getAdLinear = function(callback) {};

/**
 * getAdWidth
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.getAdWidth = function(callback) {};

/**
 * getAdHeight
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.getAdHeight = function(callback) {};

/**
 * getAdExpanded
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.getAdExpanded = function(callback) {};

/**
 * getAdSkippableState
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.getAdSkippableState = function(callback) {};

/**
 * getAdRemainingTime
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.getAdRemainingTime = function(callback) {};

/**
 * getAdDuration
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.getAdDuration = function(callback) {};

/**
 * getAdVolume
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.getAdVolume = function(callback) {};

/**
 * getAdCompanions
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.getAdCompanions = function(callback) {};

/**
 * getAdIcons
 *
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.getAdIcons = function(callback) {};

/**
 * setAdVolume
 *
 * @param {number} volume
 * @param {nodeStyleCallback} callback
 */
IVPAIDAdUnit.prototype.setAdVolume = function(volume, callback) {};

addStaticToInterface(IVPAIDAdUnit, 'METHODS', METHODS$1);
addStaticToInterface(IVPAIDAdUnit, 'GETTERS', GETTERS);
addStaticToInterface(IVPAIDAdUnit, 'SETTERS', SETTERS);
addStaticToInterface(IVPAIDAdUnit, 'EVENTS',  EVENTS);


var VPAID1_METHODS = METHODS$1.filter(function(method) {
    return ['skipAd'].indexOf(method) === -1;
});

addStaticToInterface(IVPAIDAdUnit, 'checkVPAIDInterface', function checkVPAIDInterface (creative) {
    var result = VPAID1_METHODS.every(function(key) {
        return typeof creative[key] === 'function';
    });
    return result;
});

var IVPAIDAdUnit_1 = IVPAIDAdUnit;

function addStaticToInterface(Interface, name, value) {
    Object.defineProperty(Interface, name, {
        writable: false,
        configurable: false,
        value: value
    });
}

'use strict';

function Subscriber() {
    this._subscribers = {};
}

Subscriber.prototype.subscribe = function subscribe(handler, eventName, context) {
    if (!this.isHandlerAttached(handler, eventName)) {
        this.get(eventName).push({handler: handler, context: context, eventName: eventName});
    }
};

Subscriber.prototype.unsubscribe = function unsubscribe(handler, eventName) {
    this._subscribers[eventName] = this.get(eventName).filter(function (subscriber) {
        return handler !== subscriber.handler;
    });
};

Subscriber.prototype.unsubscribeAll = function unsubscribeAll() {
    this._subscribers = {};
};

Subscriber.prototype.trigger = function(eventName, data) {
    var that = this;
    var subscribers = this.get(eventName)
        .concat(this.get('*'));

    subscribers.forEach(function (subscriber) {
        setTimeout(function () {
            if (that.isHandlerAttached(subscriber.handler, subscriber.eventName)) {
                subscriber.handler.call(subscriber.context, data);
            }
        }, 0);
    });
};

Subscriber.prototype.triggerSync = function(eventName, data) {
    var subscribers = this.get(eventName)
        .concat(this.get('*'));

    subscribers.forEach(function (subscriber) {
        subscriber.handler.call(subscriber.context, data);
    });
};

Subscriber.prototype.get = function get(eventName) {
    if (!this._subscribers[eventName]) {
        this._subscribers[eventName] = [];
    }
    return this._subscribers[eventName];
};

Subscriber.prototype.isHandlerAttached = function isHandlerAttached(handler, eventName) {
    return this.get(eventName).some(function(subscriber) {
        return handler === subscriber.handler;
    })
};

var subscriber = Subscriber;

'use strict';



var checkVPAIDInterface = IVPAIDAdUnit_1.checkVPAIDInterface;

var ERROR$1 = 'AdError';
var AD_CLICK = 'AdClickThru';
var FILTERED_EVENTS = IVPAIDAdUnit_1.EVENTS.filter(function (event) {
    return event != AD_CLICK;
});

/**
 * This callback is displayed as global member. The callback use nodejs error-first callback style
 * @callback NodeStyleCallback
 * @param {string|null}
 * @param {undefined|object}
 */


/**
 * VPAIDAdUnit
 * @class
 *
 * @param VPAIDCreative
 * @param {HTMLElement} [el] this will be used in initAd environmentVars.slot if defined
 * @param {HTMLVideoElement} [video] this will be used in initAd environmentVars.videoSlot if defined
 */
function VPAIDAdUnit(VPAIDCreative, el, video, iframe) {
    this._isValid = checkVPAIDInterface(VPAIDCreative);
    if (this._isValid) {
        this._creative = VPAIDCreative;
        this._el = el;
        this._videoEl = video;
        this._iframe = iframe;
        this._subscribers = new subscriber();
        utils.setFullSizeStyle(el);
        $addEventsSubscribers.call(this);
    }
}

VPAIDAdUnit.prototype = Object.create(IVPAIDAdUnit_1.prototype);

/**
 * isValidVPAIDAd will return if the VPAIDCreative passed in constructor is valid or not
 *
 * @return {boolean}
 */
VPAIDAdUnit.prototype.isValidVPAIDAd = function isValidVPAIDAd() {
    return this._isValid;
};

IVPAIDAdUnit_1.METHODS.forEach(function(method) {
    //NOTE: this methods arguments order are implemented differently from the spec
    var ignores = [
        'subscribe',
        'unsubscribe',
        'initAd'
    ];

    if (ignores.indexOf(method) !== -1) return;

    VPAIDAdUnit.prototype[method] = function () {
        var ariaty = IVPAIDAdUnit_1.prototype[method].length;
        // TODO avoid leaking arguments
        // https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
        var args = Array.prototype.slice.call(arguments);
        var callback = (ariaty === args.length) ? args.pop() : undefined;

        setTimeout(function () {
            var result, error = null;
            try {
                result = this._creative[method].apply(this._creative, args);
            } catch(e) {
                error = e;
            }

            callOrTriggerEvent(callback, this._subscribers, error, result);
        }.bind(this), 0);
    };
});


/**
 * initAd concreate implementation
 *
 * @param {number} width
 * @param {number} height
 * @param {string} viewMode can be 'normal', 'thumbnail' or 'fullscreen'
 * @param {number} desiredBitrate indicates the desired bitrate in kbps
 * @param {object} [creativeData] used for additional initialization data
 * @param {object} [environmentVars] used for passing implementation-specific of js version, if el & video was used in constructor slot & videoSlot will be added to the object
 * @param {NodeStyleCallback} callback
 */
VPAIDAdUnit.prototype.initAd = function initAd(width, height, viewMode, desiredBitrate, creativeData, environmentVars, callback) {
    creativeData = creativeData || {};
    environmentVars = utils.extend({
        slot: this._el,
        videoSlot: this._videoEl
    }, environmentVars || {});

    setTimeout(function () {
        var error;
        try {
            this._creative.initAd(width, height, viewMode, desiredBitrate, creativeData, environmentVars);
        } catch (e) {
            error = e;
        }

        callOrTriggerEvent(callback, this._subscribers, error);
    }.bind(this), 0);
};

/**
 * subscribe
 *
 * @param {string} event
 * @param {nodeStyleCallback} handler
 * @param {object} context
 */
VPAIDAdUnit.prototype.subscribe = function subscribe(event, handler, context) {
    this._subscribers.subscribe(handler, event, context);
};


/**
 * unsubscribe
 *
 * @param {string} event
 * @param {nodeStyleCallback} handler
 */
VPAIDAdUnit.prototype.unsubscribe = function unsubscribe(event, handler) {
    this._subscribers.unsubscribe(handler, event);
};

//alias
VPAIDAdUnit.prototype.on = VPAIDAdUnit.prototype.subscribe;
VPAIDAdUnit.prototype.off = VPAIDAdUnit.prototype.unsubscribe;

IVPAIDAdUnit_1.GETTERS.forEach(function(getter) {
    VPAIDAdUnit.prototype[getter] = function (callback) {
        setTimeout(function () {

            var result, error = null;
            try {
                result = this._creative[getter]();
            } catch(e) {
                error = e;
            }

            callOrTriggerEvent(callback, this._subscribers, error, result);
        }.bind(this), 0);
    };
});

/**
 * setAdVolume
 *
 * @param volume
 * @param {nodeStyleCallback} callback
 */
VPAIDAdUnit.prototype.setAdVolume = function setAdVolume(volume, callback) {
    setTimeout(function () {

        var result, error = null;
        try {
            this._creative.setAdVolume(volume);
            result = this._creative.getAdVolume();
        } catch(e) {
            error = e;
        }

        if (!error) {
            error = utils.validate(result === volume, 'failed to apply volume: ' + volume);
        }
        callOrTriggerEvent(callback, this._subscribers, error, result);
    }.bind(this), 0);
};

VPAIDAdUnit.prototype._destroy = function destroy() {
    this.stopAd();
    this._subscribers.unsubscribeAll();
};

function $addEventsSubscribers() {
    // some ads implement
    // so they only handle one subscriber
    // to handle this we create our one
    FILTERED_EVENTS.forEach(function (event) {
        this._creative.subscribe($trigger.bind(this, event), event);
    }.bind(this));

    // map the click event to be an object instead of depending of the order of the arguments
    // and to be consistent with the flash
    this._creative.subscribe($clickThruHook.bind(this), AD_CLICK);

    // because we are adding the element inside the iframe
    // the user is not able to click in the video
    if (this._videoEl) {
        var documentElement = this._iframe.contentDocument.documentElement;
        var videoEl = this._videoEl;
        documentElement.addEventListener('click', function(e) {
            if (e.target === documentElement) {
                videoEl.click();
            }
        });
    }
}

function $clickThruHook(url, id, playerHandles) {
    this._subscribers.triggerSync(AD_CLICK, {url: url, id: id, playerHandles: playerHandles});
}

function $trigger(event) {
    // TODO avoid leaking arguments
    // https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
    this._subscribers.trigger(event, Array.prototype.slice(arguments, 1));
}

function callOrTriggerEvent(callback, subscribers, error, result) {
    if (callback) {
        callback(error, result);
    } else if (error) {
        subscribers.trigger(ERROR$1, error);
    }
}

var VPAIDAdUnit_1 = VPAIDAdUnit;

'use strict';


var unique = utils.unique('vpaidIframe');


var defaultTemplate = '<!DOCTYPE html>' +
    '<html lang="en">' +
    '<head><meta charset="UTF-8"></head>' +
    '<body style="margin:0;padding:0"><div class="ad-element"></div>' +
    '<script type="text/javascript" src="{{iframeURL_JS}}"></script>' +
    '<script type="text/javascript">' +
    'window.parent.postMessage(\'{"event": "ready", "id": "{{iframeID}}"}\', \'{{origin}}\');' +
    '</script>' +
    '</body>' +
    '</html>';

var AD_STOPPED = 'AdStopped';

/**
 * This callback is displayed as global member. The callback use nodejs error-first callback style
 * @callback NodeStyleCallback
 * @param {string|null}
 * @param {undefined|object}
 */

/**
 * VPAIDHTML5Client
 * @class
 *
 * @param {HTMLElement} el that will contain the iframe to load adUnit and a el to add to adUnit slot
 * @param {HTMLVideoElement} video default video element to be used by adUnit
 * @param {object} [templateConfig] template: html template to be used instead of the default, extraOptions: to be used when rendering the template
 * @param {object} [vpaidOptions] timeout: when loading adUnit
 */
function VPAIDHTML5Client(el, video, templateConfig, vpaidOptions) {
    templateConfig = templateConfig || {};

    this._id = unique();
    this._destroyed = false;

    this._frameContainer = utils.createElementInEl(el, 'div');
    this._videoEl = video;
    this._vpaidOptions = vpaidOptions || {timeout: 10000};

    this._templateConfig = {
        template: templateConfig.template || defaultTemplate,
        extraOptions: templateConfig.extraOptions || {}
    };
}

/**
 * destroy
 *
 */
VPAIDHTML5Client.prototype.destroy = function destroy() {
    if (this._destroyed) {
        return;
    }
    this._destroyed = true;
    $unloadPreviousAdUnit.call(this);
};

/**
 * isDestroyed
 *
 * @return {boolean}
 */
VPAIDHTML5Client.prototype.isDestroyed = function isDestroyed() {
    return this._destroyed;
};

/**
 * loadAdUnit
 *
 * @param {string} adURL url of the js of the adUnit
 * @param {nodeStyleCallback} callback
 */
VPAIDHTML5Client.prototype.loadAdUnit = function loadAdUnit(adURL, callback) {
    $throwIfDestroyed.call(this);
    $unloadPreviousAdUnit.call(this);
    var that = this;

    var frame = utils.createIframeWithContent(
        this._frameContainer,
        this._templateConfig.template,
        utils.extend({
            iframeURL_JS: adURL,
            iframeID: this.getID(),
            origin: getOrigin()
        }, this._templateConfig.extraOptions)
    );

    this._frame = frame;

    this._onLoad = utils.callbackTimeout(
        this._vpaidOptions.timeout,
        onLoad.bind(this),
        onTimeout.bind(this)
    );

    window.addEventListener('message', this._onLoad);

    function onLoad (e) {
        /*jshint validthis: false */
        //don't clear timeout
        if (e.origin !== getOrigin()) return;
        var result = JSON.parse(e.data);

        //don't clear timeout
        if (result.id !== that.getID()) return;

        var adUnit, error, createAd;
        if (!that._frame.contentWindow) {

            error = 'the iframe is not anymore in the DOM tree';

        } else {
            createAd = that._frame.contentWindow.getVPAIDAd;
            error = utils.validate(typeof createAd === 'function', 'the ad didn\'t return a function to create an ad');
        }

        if (!error) {
            var adEl = that._frame.contentWindow.document.querySelector('.ad-element');
            adUnit = new VPAIDAdUnit_1(createAd(), adEl, that._videoEl, that._frame);
            adUnit.subscribe(AD_STOPPED, $adDestroyed.bind(that));
            error = utils.validate(adUnit.isValidVPAIDAd(), 'the add is not fully complaint with VPAID specification');
        }

        that._adUnit = adUnit;
        $destroyLoadListener.call(that);
        callback(error, error ? null : adUnit);

        //clear timeout
        return true;
    }

    function onTimeout() {
        callback('timeout', null);
    }
};

/**
 * unloadAdUnit
 *
 */
VPAIDHTML5Client.prototype.unloadAdUnit = function unloadAdUnit() {
    $unloadPreviousAdUnit.call(this);
};

/**
 * getID will return the unique id
 *
 * @return {string}
 */
VPAIDHTML5Client.prototype.getID = function () {
    return this._id;
};


/**
 * $removeEl
 *
 * @param {string} key
 */
function $removeEl(key) {
    var el = this[key];
    if (el) {
        el.remove();
        delete this[key];
    }
}

function $adDestroyed() {
    $removeAdElements.call(this);
    delete this._adUnit;
}

function $unloadPreviousAdUnit() {
    $removeAdElements.call(this);
    $destroyAdUnit.call(this);
}

function $removeAdElements() {
    $removeEl.call(this, '_frame');
    $destroyLoadListener.call(this);
}

/**
 * $destroyLoadListener
 *
 */
function $destroyLoadListener() {
    if (this._onLoad) {
        window.removeEventListener('message', this._onLoad);
        utils.clearCallbackTimeout(this._onLoad);
        delete this._onLoad;
    }
}


function $destroyAdUnit() {
    if (this._adUnit) {
        this._adUnit.stopAd();
        delete this._adUnit;
    }
}

/**
 * $throwIfDestroyed
 *
 */
function $throwIfDestroyed() {
    if (this._destroyed) {
        throw new Error ('VPAIDHTML5Client already destroyed!');
    }
}

function getOrigin() {
    if( window.location.origin ) {
        return window.location.origin;
    }
    else {
        return window.location.protocol + "//" +
            window.location.hostname +
            (window.location.port ? ':' + window.location.port: '');
    }
}

var VPAIDHTML5Client_1 = VPAIDHTML5Client;

var _class$5;
var _temp$5;

var VPAIDHTML5Tech = (_temp$5 = _class$5 = function () {
    function VPAIDHTML5Tech(mediaFile) {
        _classCallCheck(this, VPAIDHTML5Tech);

        if (!mediaFile || !isString(mediaFile.src)) {
            throw error.VPAIDHTML5TECH_INVALID_MEDIA_FILE;
        }

        this.name = 'vpaid-html5';
        this.containerEl = null;
        this.videoEl = null;
        this.vpaidHTMLClient = null;

        this.mediaFile = mediaFile;
    }

    _createClass(VPAIDHTML5Tech, [{
        key: 'loadAdUnit',
        value: function loadAdUnit(containerEl, videoEl, callback) {
            if (!Dom.isDomElement(containerEl)) {
                throw error.VPAIDHTML5TECH_INVALID_DOM_CONTAINER_EL;
            }

            if (!Dom.isDomElement(videoEl) || videoEl.tagName.toLowerCase() !== 'video') {
                throw error.VPAIDHTML5TECH_INVALID_DOM_CONTAINER_EL;
            }

            if (!isFunction(callback)) {
                throw error.VPAIDHTML5TECH_MISSING_CALLBACK;
            }

            this.containerEl = containerEl;
            this.videoEl = videoEl;
            this.vpaidHTMLClient = new VPAIDHTML5Client_1(containerEl, videoEl, {});
            this.vpaidHTMLClient.loadAdUnit(this.mediaFile.src, callback);
        }
    }, {
        key: 'unloadAdUnit',
        value: function unloadAdUnit() {
            if (this.vpaidHTMLClient) {
                try {
                    this.vpaidHTMLClient.destroy();
                } catch (e) {
                    playercore.log.error('VAST ERROR: trying to unload the VPAID adunit');
                }

                this.vpaidHTMLClient = null;
            }

            if (this.containerEl) {
                Dom.remove(this.containerEl);
                this.containerEl = null;
            }
        }
    }], [{
        key: 'supports',
        value: function supports(type) {
            return !isOldIE() && this.types.indexOf(type) > -1;
        }
    }]);

    return VPAIDHTML5Tech;
}(), _class$5.types = ['text/javascript', 'text/javascript1.0', 'text/javascript1.2', 'text/javascript1.4', 'text/jscript', 'application/javascript', 'application/x-javascript', 'text/ecmascript', 'text/ecmascript1.0', 'text/ecmascript1.2', 'text/ecmascript1.4', 'text/livescript', 'application/ecmascript', 'application/x-ecmascript'], _temp$5);

var _class$4;
var _temp$4;

var VastUtil = (_temp$4 = _class$4 = function () {
    function VastUtil() {
        _classCallCheck(this, VastUtil);
    }

    _createClass(VastUtil, null, [{
        key: 'track',
        value: function track(URLMacros, variables) {
            var sources = this.parseURLMacros(URLMacros, variables);
            var trackImgs = [];
            sources.forEach(function (src) {
                var img = new Image();
                img.src = src;
                trackImgs.push(img);
            });
            return trackImgs;
        }
    }, {
        key: 'parseURLMacros',
        value: function parseURLMacros(URLMacros, variables) {
            var self = this;
            var parsedURLs = [];

            variables = variables || {};

            if (!variables['CACHEBUSTING']) {
                variables['CACHEBUSTING'] = Math.round(Math.random() * 1.0e+10);
            }

            URLMacros.forEach(function (URLMacro) {
                URLMacro && parsedURLs.push(self._parseURLMacro(URLMacro, variables));
            });

            return parsedURLs;
        }
    }, {
        key: 'parseURLMacro',
        value: function parseURLMacro(URLMacro, variables) {
            variables = variables || {};

            if (!variables['CACHEBUSTING']) {
                variables['CACHEBUSTING'] = Math.round(Math.random() * 1.0e+10);
            }

            return this._parseURLMacro(URLMacro, variables);
        }
    }, {
        key: 'parseDuration',
        value: function parseDuration(durationStr) {
            var durationRegex = /(\d\d):(\d\d):(\d\d)(\.(\d\d\d))?/;
            var match, durationInMs;

            if (isString(durationStr)) {
                match = durationStr.match(durationRegex);
                if (match) {
                    durationInMs = parseHoursToMs(match[1]) + parseMinToMs(match[2]) + parseSecToMs(match[3]) + parseInt(match[5] || 0);
                }
            }

            return isNaN(durationInMs) ? null : durationInMs;

            /*** local functions ***/
            function parseHoursToMs(hourStr) {
                return parseInt(hourStr, 10) * 60 * 60 * 1000;
            }

            function parseMinToMs(minStr) {
                return parseInt(minStr, 10) * 60 * 1000;
            }

            function parseSecToMs(secStr) {
                return parseInt(secStr, 10) * 1000;
            }
        }
    }, {
        key: 'parseImpressions',
        value: function parseImpressions(impressions) {
            if (impressions) {
                impressions = isArray$1(impressions) ? impressions : [impressions];
                return transformArray(impressions, function (impression) {
                    if (isNotEmptyString(impression.keyValue)) {
                        return impression.keyValue;
                    }
                    return undefined;
                });
            }
            return [];
        }

        //We assume that the progress is going to arrive in milliseconds

    }, {
        key: 'formatProgress',
        value: function formatProgress(progress) {
            var hours, minutes, seconds, milliseconds;
            hours = progress / (60 * 60 * 1000);
            hours = Math.floor(hours);
            minutes = progress / (60 * 1000) % 60;
            minutes = Math.floor(minutes);
            seconds = progress / 1000 % 60;
            seconds = Math.floor(seconds);
            milliseconds = progress % 1000;
            return toFixedDigits(hours, 2) + ':' + toFixedDigits(minutes, 2) + ':' + toFixedDigits(seconds, 2) + '.' + toFixedDigits(milliseconds, 3);
        }
    }, {
        key: 'parseOffset',
        value: function parseOffset(offset, duration) {
            if (isPercentage(offset)) {
                return calculatePercentage(offset, duration);
            }
            return this.parseDuration(offset);

            /*** Local function ***/
            function isPercentage(offset) {
                var percentageRegex = /^\d+(\.\d+)?%$/g;
                return percentageRegex.test(offset);
            }

            function calculatePercentage(percentStr, duration) {
                if (duration) {
                    return calcPercent(duration, parseFloat(percentStr.replace('%', '')));
                }
                return null;
            }

            function calcPercent(quantity, percent) {
                return quantity * percent / 100;
            }
        }
    }, {
        key: 'isVPAID',
        value: function isVPAID(mediaFile) {
            return !!mediaFile && mediaFile.apiFramework === 'VPAID';
        }
    }, {
        key: 'findSupportedVPAIDTech',
        value: function findSupportedVPAIDTech(mimeType) {
            var i, len, VPAIDTech;

            for (i = 0, len = this.VPAID_techs.length; i < len; i += 1) {
                VPAIDTech = this.VPAID_techs[i];
                if (VPAIDTech.supports(mimeType)) {
                    return VPAIDTech;
                }
            }
            return null;
        }
    }, {
        key: 'isFlashSupported',
        value: function isFlashSupported() {
            return false;
        }
    }, {
        key: '_parseURLMacro',
        value: function _parseURLMacro(URLMacro, variables) {
            variables = variables || {};

            forEach(variables, function (value, key) {
                URLMacro = URLMacro.replace(new RegExp('\\[' + key + '\\]', 'gm'), value);
            });

            return URLMacro;
        }
    }]);

    return VastUtil;
}(), _class$4.VPAID_techs = [VPAIDHTML5Tech], _temp$4);

var JXONTree = function () {
    function JXONTree(oXMLParent) {
        _classCallCheck(this, JXONTree);

        var parseText = xml.parseText;

        //The document object is an especial object that it may miss some functions or attrs depending on the browser.
        //To prevent this problem with create the JXONTree using the root childNode which is a fully fleshed node on all supported
        //browsers.
        if (oXMLParent.documentElement) {
            return new JXONTree(oXMLParent.documentElement);
        }

        if (oXMLParent.hasChildNodes()) {
            var sCollectedTxt = '';
            for (var oNode, sProp, vContent, nItem = 0; nItem < oXMLParent.childNodes.length; nItem++) {
                oNode = oXMLParent.childNodes.item(nItem);
                /*jshint bitwise: false*/
                if ((oNode.nodeType - 1 | 1) === 3) {
                    sCollectedTxt += oNode.nodeType === 3 ? oNode.nodeValue.trim() : oNode.nodeValue;
                } else if (oNode.nodeType === 1 && !oNode.prefix) {
                    sProp = decapitalize(oNode.nodeName);
                    vContent = new JXONTree(oNode);
                    if (this.hasOwnProperty(sProp)) {
                        if (this[sProp].constructor !== Array) {
                            this[sProp] = [this[sProp]];
                        }
                        this[sProp].push(vContent);
                    } else {
                        this[sProp] = vContent;
                    }
                }
            }
            if (sCollectedTxt) {
                this.keyValue = parseText(sCollectedTxt);
            }
        }

        //IE8 Stupid fix
        var hasAttr = typeof oXMLParent.hasAttributes === 'undefined' ? oXMLParent.attributes.length > 0 : oXMLParent.hasAttributes();
        if (hasAttr) {
            var oAttrib;
            for (var nAttrib = 0; nAttrib < oXMLParent.attributes.length; nAttrib++) {
                oAttrib = oXMLParent.attributes.item(nAttrib);
                this['@' + decapitalize(oAttrib.name)] = parseText(oAttrib.value.trim());
            }
        }
    }

    _createClass(JXONTree, [{
        key: 'attr',
        value: function attr(_attr) {
            return this['@' + decapitalize(_attr)];
        }
    }]);

    return JXONTree;
}();

var xml = function () {
    function xml() {
        _classCallCheck(this, xml);
    }

    _createClass(xml, null, [{
        key: 'strToXMLDoc',
        value: function strToXMLDoc(stringContainingXMLSource) {
            //IE 8
            if (typeof window.DOMParser === 'undefined') {
                var xmlDocument = new ActiveXObject('Microsoft.XMLDOM');
                xmlDocument.async = false;
                xmlDocument.loadXML(stringContainingXMLSource);
                return xmlDocument;
            }

            return parseString(stringContainingXMLSource);

            function parseString(stringContainingXMLSource) {
                var parser = new DOMParser();
                var parsedDocument;

                //Note: This try catch is to deal with the fact that on IE parser.parseFromString does throw an error but the rest of the browsers don't.
                try {
                    parsedDocument = parser.parseFromString(stringContainingXMLSource, 'application/xml');

                    if (isParseError(parsedDocument) || isEmptyString(stringContainingXMLSource)) {
                        throw new Error();
                    }
                } catch (e) {
                    throw new Error('xml.strToXMLDOC: Error parsing the string: ' + stringContainingXMLSource);
                }

                return parsedDocument;
            }

            function isParseError(parsedDocument) {
                try {
                    // parser and parsererrorNS could be cached on startup for efficiency
                    var parser = new DOMParser(),
                        erroneousParse = parser.parseFromString('INVALID', 'text/xml'),
                        parsererrorNS = erroneousParse.getElementsByTagName('parsererror')[0].namespaceURI;

                    if (parsererrorNS === 'http://www.w3.org/1999/xhtml') {
                        // In PhantomJS the parseerror element doesn't seem to have a special namespace, so we are just guessing here :(
                        return parsedDocument.getElementsByTagName('parsererror').length > 0;
                    }

                    return parsedDocument.getElementsByTagNameNS(parsererrorNS, 'parsererror').length > 0;
                } catch (e) {
                    //Note on IE parseString throws an error by itself and it will never reach this code. Because it will have failed before
                }
            }
        }
    }, {
        key: 'parseText',
        value: function parseText(sValue) {
            if (/^\s*$/.test(sValue)) {
                return null;
            }
            if (/^(?:true|false)$/i.test(sValue)) {
                return sValue.toLowerCase() === 'true';
            }
            if (isFinite(sValue)) {
                return parseFloat(sValue);
            }
            if (isISO8601(sValue)) {
                return new Date(sValue);
            }
            return sValue.trim();
        }
    }, {
        key: 'toJXONTree',
        value: function toJXONTree(xmlString) {
            var xmlDoc = xml.strToXMLDoc(xmlString);
            return new JXONTree(xmlDoc);
        }
    }, {
        key: 'keyValue',
        value: function keyValue(xmlObj) {
            if (xmlObj) {
                return xmlObj.keyValue;
            }
            return undefined;
        }
    }, {
        key: 'attr',
        value: function attr(xmlObj, _attr2) {
            if (xmlObj) {
                return xmlObj['@' + decapitalize(_attr2)];
            }
            return undefined;
        }
    }, {
        key: 'encode',
        value: function encode(str) {
            if (!isString(str)) return undefined;

            return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
        }
    }, {
        key: 'decode',
        value: function decode(str) {
            if (!isString(str)) return undefined;

            return str.replace(/&apos;/g, '\'').replace(/&quot;/g, '"').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
        }
    }]);

    return xml;
}();

var TrackingEvent = function TrackingEvent(trackingJTree, duration) {
    _classCallCheck(this, TrackingEvent);

    this.name = trackingJTree.attr('event');
    this.uri = xml.keyValue(trackingJTree);

    if ('progress' === this.name) {
        this.offset = VastUtil.parseOffset(trackingJTree.attr('offset'), duration);
    }
};

var attributesList = [
//Required attributes
'delivery', 'type', 'width', 'height',
//Optional attributes
'codec', 'id', 'bitrate', 'minBitrate', 'maxBitrate', 'scalable', 'maintainAspectRatio', 'apiFramework'];

var MediaFile = function () {
    function MediaFile(mediaFileJTree) {
        _classCallCheck(this, MediaFile);

        //Required attributes
        this.src = xml.keyValue(mediaFileJTree);

        for (var x = 0; x < attributesList.length; x++) {
            var attribute = attributesList[x];
            this[attribute] = mediaFileJTree.attr(attribute);
        }

        if (this['type'] === 'video/x-mp4') {
            this['type'] = 'video/mp4';
        }
    }

    _createClass(MediaFile, [{
        key: 'isSupported',
        value: function isSupported() {
            if (VastUtil.isVPAID(this)) {
                return !!VastUtil.findSupportedVPAIDTech(this.type);
            }

            if (this.type === 'video/x-flv') {
                return VastUtil.isFlashSupported();
            }

            return true;
        }
    }]);

    return MediaFile;
}();

var VideoClicks = function () {
    function VideoClicks(videoClickJTree) {
        _classCallCheck(this, VideoClicks);

        this.clickThrough = xml.keyValue(videoClickJTree.clickThrough);
        this.clickTrackings = this._parseClickTrackings(videoClickJTree.clickTracking);
        this.customClicks = this._parseClickTrackings(videoClickJTree.customClick);
    }

    _createClass(VideoClicks, [{
        key: '_parseClickTrackings',
        value: function _parseClickTrackings(trackingData) {
            var clickTrackings = [];
            if (trackingData) {
                trackingData = isArray$1(trackingData) ? trackingData : [trackingData];
                trackingData.forEach(function (clickTrackingData) {
                    clickTrackings.push(xml.keyValue(clickTrackingData));
                });
            }
            return clickTrackings;
        }
    }]);

    return VideoClicks;
}();

var Linear = function () {
    function Linear(linearJTree) {
        _classCallCheck(this, Linear);

        this.duration = VastUtil.parseDuration(xml.keyValue(linearJTree.duration));
        this.mediaFiles = this._parseMediaFiles(linearJTree.mediaFiles && linearJTree.mediaFiles.mediaFile);

        //Optional fields
        this.trackingEvents = this._parseTrackingEvents(linearJTree.trackingEvents && linearJTree.trackingEvents.tracking, this.duration);
        this.skipoffset = VastUtil.parseOffset(xml.attr(linearJTree, 'skipoffset'), this.duration);

        if (linearJTree.videoClicks) {
            this.videoClicks = new VideoClicks(linearJTree.videoClicks);
        }

        if (linearJTree.adParameters) {
            this.adParameters = xml.keyValue(linearJTree.adParameters);

            if (xml.attr(linearJTree.adParameters, 'xmlEncoded')) {
                this.adParameters = xml.decode(this.adParameters);
            }
        }
    }

    _createClass(Linear, [{
        key: '_parseMediaFiles',
        value: function _parseMediaFiles(mediaFilesJxonTree) {
            var mediaFiles = [];
            if (isDefined(mediaFilesJxonTree)) {
                mediaFilesJxonTree = isArray$1(mediaFilesJxonTree) ? mediaFilesJxonTree : [mediaFilesJxonTree];

                mediaFilesJxonTree.forEach(function (mfData) {
                    mediaFiles.push(new MediaFile(mfData));
                });
            }
            return mediaFiles;
        }
    }, {
        key: '_parseTrackingEvents',
        value: function _parseTrackingEvents(trackingEvents, duration) {
            var trackings = [];
            if (isDefined(trackingEvents)) {
                trackingEvents = isArray$1(trackingEvents) ? trackingEvents : [trackingEvents];
                trackingEvents.forEach(function (trackingData) {
                    trackings.push(new TrackingEvent(trackingData, duration));
                });
            }
            return trackings;
        }
    }, {
        key: 'isSupported',
        value: function isSupported() {
            var i, len;
            for (i = 0, len = this.mediaFiles.length; i < len; i += 1) {
                if (this.mediaFiles[i].isSupported()) {
                    return true;
                }
            }

            return false;
        }
    }]);

    return Linear;
}();

var Companion = function () {
    function Companion(companionJTree) {
        _classCallCheck(this, Companion);

        playercore.log.info('<Companion> found companion ad');
        playercore.log.debug('<Companion>  companionJTree:', companionJTree);

        //Required Elements
        this.creativeType = xml.attr(companionJTree.staticResource, 'creativeType');
        this.staticResource = xml.keyValue(companionJTree.staticResource);

        playercore.log.info('<Companion>  creativeType: ' + this.creativeType);
        playercore.log.info('<Companion>  staticResource: ' + this.staticResource);

        // Weird bug when the JXON tree is built it doesn't handle casing properly in this situation...
        var htmlResource = null;
        if (xml.keyValue(companionJTree.HTMLResource)) {
            htmlResource = xml.keyValue(companionJTree.HTMLResource);
        } else if (xml.keyValue(companionJTree.hTMLResource)) {
            htmlResource = xml.keyValue(companionJTree.hTMLResource);
        }

        if (htmlResource !== null) {
            playercore.log.info('<Companion> found html resource', htmlResource);
        }

        this.htmlResource = htmlResource;

        var iframeResource = null;
        if (xml.keyValue(companionJTree.IFrameResource)) {
            iframeResource = xml.keyValue(companionJTree.IFrameResource);
        } else if (xml.keyValue(companionJTree.iFrameresource)) {
            iframeResource = xml.keyValue(companionJTree.iFrameresource);
        }

        if (iframeResource !== null) {
            playercore.log.info('<Companion> found iframe resource', iframeResource);
        }

        this.iframeResource = iframeResource;

        //Optional fields
        this.id = xml.attr(companionJTree, 'id');
        this.width = xml.attr(companionJTree, 'width');
        this.height = xml.attr(companionJTree, 'height');
        this.expandedWidth = xml.attr(companionJTree, 'expandedWidth');
        this.expandedHeight = xml.attr(companionJTree, 'expandedHeight');
        this.scalable = xml.attr(companionJTree, 'scalable');
        this.maintainAspectRatio = xml.attr(companionJTree, 'maintainAspectRatio');
        this.minSuggestedDuration = xml.attr(companionJTree, 'minSuggestedDuration');
        this.apiFramework = xml.attr(companionJTree, 'apiFramework');
        this.companionClickThrough = xml.keyValue(companionJTree.companionClickThrough);
        this.trackingEvents = this._parseTrackingEvents(companionJTree.trackingEvents && companionJTree.trackingEvents.tracking);

        playercore.log.info('<Companion>  companionClickThrough: ' + this.companionClickThrough);
    }

    _createClass(Companion, [{
        key: '_parseTrackingEvents',
        value: function _parseTrackingEvents(trackingEvents) {
            var trackings = [];
            if (isDefined(trackingEvents)) {
                trackingEvents = isArray$1(trackingEvents) ? trackingEvents : [trackingEvents];
                trackingEvents.forEach(function (trackingData) {
                    trackings.push(new TrackingEvent(trackingData));
                });
            }
            return trackings;
        }
    }]);

    return Companion;
}();

var Creative = function () {
    function Creative(creativeJTree) {
        _classCallCheck(this, Creative);

        this.id = creativeJTree.attr('id');
        this.sequence = creativeJTree.attr('sequence');
        this.adId = creativeJTree.attr('adId');
        this.apiFramework = creativeJTree.attr('apiFramework');

        if (creativeJTree.linear) {
            this.linear = new Linear(creativeJTree.linear);
        }

        if (creativeJTree.companionAds) {
            var companions = [];
            var companionAds = creativeJTree.companionAds && creativeJTree.companionAds.companion;
            if (isDefined(companionAds)) {
                companionAds = isArray$1(companionAds) ? companionAds : [companionAds];
                companionAds.forEach(function (companionData) {
                    companions.push(new Companion(companionData));
                });
            }
            this.companionAds = companions;
        }
    }

    _createClass(Creative, [{
        key: 'isSupported',
        value: function isSupported() {
            if (this.linear) {
                return this.linear.isSupported();
            }

            return true;
        }
    }], [{
        key: 'parseCreatives',
        value: function parseCreatives(creativesJTree) {
            var creatives = [];
            var creativesData;
            if (isDefined(creativesJTree) && isDefined(creativesJTree.creative)) {
                creativesData = isArray$1(creativesJTree.creative) ? creativesJTree.creative : [creativesJTree.creative];
                creativesData.forEach(function (creative) {
                    creatives.push(new Creative(creative));
                });
            }
            return creatives;
        }
    }]);

    return Creative;
}();

var InLine = function () {
    function InLine(inlineJTree) {
        _classCallCheck(this, InLine);

        //Required Fields
        this.adTitle = xml.keyValue(inlineJTree.adTitle);
        this.adSystem = xml.keyValue(inlineJTree.adSystem);
        this.impressions = VastUtil.parseImpressions(inlineJTree.impression);
        this.creatives = Creative.parseCreatives(inlineJTree.creatives);

        //Optional Fields
        this.description = xml.keyValue(inlineJTree.description);
        this.advertiser = xml.keyValue(inlineJTree.advertiser);
        this.surveys = this._parseSurveys(inlineJTree.survey);
        this.error = xml.keyValue(inlineJTree.error);
        this.pricing = xml.keyValue(inlineJTree.pricing);
        this.extensions = inlineJTree.extensions;
    }

    _createClass(InLine, [{
        key: '_parseSurveys',
        value: function _parseSurveys(inlineSurveys) {
            if (inlineSurveys) {
                return transformArray(isArray$1(inlineSurveys) ? inlineSurveys : [inlineSurveys], function (survey) {
                    if (isNotEmptyString(survey.keyValue)) {
                        return {
                            uri: survey.keyValue,
                            type: survey.attr('type')
                        };
                    }

                    return undefined;
                });
            }
            return [];
        }
    }, {
        key: 'isSupported',
        value: function isSupported() {
            var i, len;

            if (this.creatives.length === 0) {
                return false;
            }

            for (i = 0, len = this.creatives.length; i < len; i += 1) {
                if (!this.creatives[i].isSupported()) {
                    return false;
                }
            }
            return true;
        }
    }]);

    return InLine;
}();

var Wrapper$1 = function Wrapper(wrapperJTree) {
    _classCallCheck(this, Wrapper);

    //Required elements
    this.adSystem = xml.keyValue(wrapperJTree.adSystem);
    this.impressions = VastUtil.parseImpressions(wrapperJTree.impression);
    this.VASTAdTagURI = xml.keyValue(wrapperJTree.vASTAdTagURI);

    //Optional elements
    this.creatives = Creative.parseCreatives(wrapperJTree.creatives);
    this.error = xml.keyValue(wrapperJTree.error);
    this.extensions = wrapperJTree.extensions;

    //Optional attrs
    this.followAdditionalWrappers = isDefined(xml.attr(wrapperJTree, 'followAdditionalWrappers')) ? xml.attr(wrapperJTree, 'followAdditionalWrappers') : true;
    this.allowMultipleAds = xml.attr(wrapperJTree, 'allowMultipleAds');
    this.fallbackOnNoAd = xml.attr(wrapperJTree, 'fallbackOnNoAd');
};

var Ad = function () {
    function Ad(adJTree) {
        _classCallCheck(this, Ad);

        this._initialize(adJTree);
    }

    _createClass(Ad, [{
        key: '_initialize',
        value: function _initialize(adJTree) {
            this.id = adJTree.attr('id');
            this.sequence = adJTree.attr('sequence');

            if (adJTree.inLine) {
                this.inLine = new InLine(adJTree.inLine);
            }

            if (adJTree.wrapper) {
                this.wrapper = new Wrapper$1(adJTree.wrapper);
            }
        }
    }]);

    return Ad;
}();

var VASTResponse = function () {
    function VASTResponse() {
        _classCallCheck(this, VASTResponse);

        this._linearAdded = false;
        this.ads = [];
        this.errorURLMacros = [];
        this.impressions = [];
        this.clickTrackings = [];
        this.customClicks = [];
        this.trackingEvents = {};
        this.mediaFiles = [];
        this.clickThrough = undefined;
        this.adTitle = '';
        this.duration = undefined;
        this.skipoffset = undefined;
    }

    _createClass(VASTResponse, [{
        key: 'addAd',
        value: function addAd(ad) {
            var inLine, wrapper;
            if (ad instanceof Ad) {
                inLine = ad.inLine;
                wrapper = ad.wrapper;

                this.ads.push(ad);

                if (inLine) {
                    this._addInLine(inLine);
                }

                if (wrapper) {
                    this._addWrapper(wrapper);
                }
            }
        }
    }, {
        key: '_addErrorTrackUrl',
        value: function _addErrorTrackUrl(error) {
            var errorURL = error instanceof JXONTree ? xml.keyValue(error) : error;
            if (errorURL) {
                this.errorURLMacros.push(errorURL);
            }
        }
    }, {
        key: '_addImpressions',
        value: function _addImpressions(impressions) {
            isArray$1(impressions) && appendToArray(this.impressions, impressions);
        }
    }, {
        key: '_addClickThrough',
        value: function _addClickThrough(clickThrough) {
            if (isNotEmptyString(clickThrough)) {
                this.clickThrough = clickThrough;
            }
        }
    }, {
        key: '_addClickTrackings',
        value: function _addClickTrackings(clickTrackings) {
            isArray$1(clickTrackings) && appendToArray(this.clickTrackings, clickTrackings);
        }
    }, {
        key: '_addCustomClicks',
        value: function _addCustomClicks(customClicks) {
            isArray$1(customClicks) && appendToArray(this.customClicks, customClicks);
        }
    }, {
        key: '_addTrackingEvents',
        value: function _addTrackingEvents(trackingEvents) {
            var eventsMap = this.trackingEvents;

            if (trackingEvents) {
                trackingEvents = isArray$1(trackingEvents) ? trackingEvents : [trackingEvents];
                trackingEvents.forEach(function (trackingEvent) {
                    if (!eventsMap[trackingEvent.name]) {
                        eventsMap[trackingEvent.name] = [];
                    }
                    eventsMap[trackingEvent.name].push(trackingEvent);
                });
            }
        }
    }, {
        key: '_addTitle',
        value: function _addTitle(title) {
            if (isNotEmptyString(title)) {
                this.adTitle = title;
            }
        }
    }, {
        key: '_addDuration',
        value: function _addDuration(duration) {
            if (isNumber(duration)) {
                this.duration = duration;
            }
        }
    }, {
        key: '_addVideoClicks',
        value: function _addVideoClicks(videoClicks) {
            if (videoClicks instanceof VideoClicks) {
                this._addClickThrough(videoClicks.clickThrough);
                this._addClickTrackings(videoClicks.clickTrackings);
                this._addCustomClicks(videoClicks.customClicks);
            }
        }
    }, {
        key: '_addMediaFiles',
        value: function _addMediaFiles(mediaFiles) {
            isArray$1(mediaFiles) && appendToArray(this.mediaFiles, mediaFiles);
        }
    }, {
        key: '_addSkipoffset',
        value: function _addSkipoffset(offset) {
            if (offset) {
                this.skipoffset = offset;
            }
        }
    }, {
        key: '_addAdParameters',
        value: function _addAdParameters(adParameters) {
            if (adParameters) {
                this.adParameters = adParameters;
            }
        }
    }, {
        key: '_addLinear',
        value: function _addLinear(linear) {
            if (linear instanceof Linear) {
                this._addDuration(linear.duration);
                this._addTrackingEvents(linear.trackingEvents);
                this._addVideoClicks(linear.videoClicks);
                this._addMediaFiles(linear.mediaFiles);
                this._addSkipoffset(linear.skipoffset);
                this._addAdParameters(linear.adParameters);
                this._linearAdded = true;
            }
        }
    }, {
        key: '_addInLine',
        value: function _addInLine(inLine) {
            var that = this;

            if (inLine instanceof InLine) {
                this._addTitle(inLine.adTitle);
                this._addErrorTrackUrl(inLine.error);
                this._addImpressions(inLine.impressions);

                inLine.creatives.forEach(function (creative) {
                    if (creative.linear) {
                        that._addLinear(creative.linear);
                    }
                });
            }
        }
    }, {
        key: '_addWrapper',
        value: function _addWrapper(wrapper) {
            var that = this;

            if (wrapper instanceof Wrapper$1) {
                this._addErrorTrackUrl(wrapper.error);
                this._addImpressions(wrapper.impressions);

                wrapper.creatives.forEach(function (creative) {
                    var linear = creative.linear;
                    if (linear) {
                        that._addVideoClicks(linear.videoClicks);
                        that.clickThrough = undefined; //We ensure that no clickThrough has been added
                        that._addTrackingEvents(linear.trackingEvents);
                    }
                });
            }
        }
    }, {
        key: 'hasLinear',
        value: function hasLinear() {
            return this._linearAdded;
        }
    }]);

    return VASTResponse;
}();

function appendToArray(array, items) {
    items.forEach(function (item) {
        array.push(item);
    });
}

var VASTTracker = function () {
    function VASTTracker(assetURI, vastResponse) {
        _classCallCheck(this, VASTTracker);

        this._sanityCheck(assetURI, vastResponse);
        this._initialize(assetURI, vastResponse);
    }

    _createClass(VASTTracker, [{
        key: '_sanityCheck',
        value: function _sanityCheck(assetURI, vastResponse) {
            if (!isString(assetURI) || isEmptyString(assetURI)) {
                throw error.VASTTRACKER_ASSET_URI;
            }

            if (!(vastResponse instanceof VASTResponse)) {
                throw error.VASTTRACKER_VAST_RESPONSE;
            }
        }
    }, {
        key: '_initialize',
        value: function _initialize(assetURI, vastResponse) {
            this.response = vastResponse;
            this.assetURI = assetURI;
            this.progress = 0;
            this.quartiles = {
                firstQuartile: { tracked: false, time: Math.round(25 * vastResponse.duration) / 100 },
                midpoint: { tracked: false, time: Math.round(50 * vastResponse.duration) / 100 },
                thirdQuartile: { tracked: false, time: Math.round(75 * vastResponse.duration) / 100 }
            };
        }
    }, {
        key: 'durationChange',
        value: function durationChange(duration) {
            this.quartiles = {
                firstQuartile: { tracked: false, time: Math.round(25 * duration) / 100 },
                midpoint: { tracked: false, time: Math.round(50 * duration) / 100 },
                thirdQuartile: { tracked: false, time: Math.round(75 * duration) / 100 }
            };
        }
    }, {
        key: 'trackURLs',
        value: function trackURLs(urls, variables) {
            if (isArray$1(urls) && urls.length > 0) {
                variables = extend({
                    ASSETURI: this.assetURI,
                    CONTENTPLAYHEAD: VastUtil.formatProgress(this.progress)
                }, variables || {});

                VastUtil.track(urls, variables);
            }
        }
    }, {
        key: 'trackEvent',
        value: function trackEvent(eventName, trackOnce) {
            this.trackURLs(this._getEventUris(this.response.trackingEvents[eventName]));
            if (trackOnce) {
                this.response.trackingEvents[eventName] = undefined;
            }
        }
    }, {
        key: 'trackProgress',
        value: function trackProgress(newProgressInMs) {
            var that = this;
            var events = [];
            var ONCE = true;
            var ALWAYS = false;
            var trackingEvents = this.response.trackingEvents;

            if (isNumber(newProgressInMs)) {
                addTrackEvent('start', ONCE, newProgressInMs > 0);
                addTrackEvent('rewind', ALWAYS, hasRewound(this.progress, newProgressInMs));
                addQuartileEvents(newProgressInMs);
                trackProgressEvents(newProgressInMs);
                trackEvents();
                this.progress = newProgressInMs;
            }

            /*** Local function ***/
            function hasRewound(currentProgress, newProgress) {
                var REWIND_THRESHOLD = 3000; //IOS video clock is very unreliable and we need a 3 seconds threshold to ensure that there was a rewind an that it was on purpose.
                return currentProgress > newProgressInMs && Math.abs(newProgress - currentProgress) > REWIND_THRESHOLD;
            }

            function addTrackEvent(eventName, trackOnce, canBeAdded) {
                if (trackingEvents[eventName] && canBeAdded) {
                    events.push({
                        name: eventName,
                        trackOnce: !!trackOnce
                    });
                }
            }

            function addQuartileEvents(progress) {
                var quartiles = that.quartiles;
                var firstQuartile = that.quartiles.firstQuartile;
                var midpoint = that.quartiles.midpoint;
                var thirdQuartile = that.quartiles.thirdQuartile;

                if (!firstQuartile.tracked) {
                    trackQuartile('firstQuartile', progress);
                } else if (!midpoint.tracked) {
                    trackQuartile('midpoint', progress);
                } else if (!thirdQuartile.tracked) {
                    trackQuartile('thirdQuartile', progress);
                }

                /*** Local function ***/
                function trackQuartile(quartileName, progress) {
                    var quartile = quartiles[quartileName];
                    if (canBeTracked(quartile, progress)) {
                        quartile.tracked = true;
                        addTrackEvent(quartileName, ONCE, true);
                    }
                }
            }

            function canBeTracked(quartile, progress) {
                var quartileTime = quartile.time;
                //We only fire the quartile event if the progress is bigger than the quartile time by 5 seconds at most.
                return progress >= quartileTime && progress <= quartileTime + 5000;
            }

            function trackProgressEvents(progress) {
                if (!isArray$1(trackingEvents.progress)) {
                    return; //Nothing to track
                }

                var pendingProgressEvts = [];

                trackingEvents.progress.forEach(function (evt) {
                    if (evt.offset <= progress) {
                        that.trackURLs([evt.uri]);
                    } else {
                        pendingProgressEvts.push(evt);
                    }
                });
                trackingEvents.progress = pendingProgressEvts;
            }

            function trackEvents() {
                events.forEach(function (event) {
                    that.trackEvent(event.name, event.trackOnce);
                });
            }
        }
    }, {
        key: 'trackComplete',
        value: function trackComplete() {
            if (this.quartiles.thirdQuartile.tracked) {
                this.trackEvent('complete', true);
            }
        }
    }, {
        key: 'trackErrorWithCode',
        value: function trackErrorWithCode(errorcode) {
            if (isNumber(errorcode)) {
                this.trackURLs(this.response.errorURLMacros, { ERRORCODE: errorcode });
            }
        }
    }, {
        key: 'trackImpressions',
        value: function trackImpressions() {
            this.trackURLs(this.response.impressions);
        }
    }, {
        key: 'trackCreativeView',
        value: function trackCreativeView() {
            this.trackEvent('creativeView');
        }
    }, {
        key: 'trackClick',
        value: function trackClick() {
            this.trackURLs(this.response.clickTrackings);
        }
    }, {
        key: '_getEventUris',
        value: function _getEventUris(trackingEvents) {
            var uris;

            if (trackingEvents) {
                uris = [];
                trackingEvents.forEach(function (event) {
                    if (event.uri) {
                        uris.push(event.uri);
                    }
                });
            }
            return uris;
        }
    }]);

    return VASTTracker;
}();

['rewind', 'fullscreen', 'exitFullscreen', 'pause', 'resume', 'mute', 'unmute', 'acceptInvitation', 'acceptInvitationLinear', 'collapse', 'expand'].forEach(function (eventName) {
    VASTTracker.prototype['track' + capitalize(eventName)] = function () {
        this.trackEvent(eventName);
    };
});

['start', 'skip', 'close', 'closeLinear'].forEach(function (eventName) {
    VASTTracker.prototype['track' + capitalize(eventName)] = function () {
        this.trackEvent(eventName, true);
    };
});

['firstQuartile', 'midpoint', 'thirdQuartile'].forEach(function (quartile) {
    VASTTracker.prototype['track' + capitalize(quartile)] = function () {
        this.quartiles[quartile].tracked = true;
        this.trackEvent(quartile, true);
    };
});

var playerUtils = function () {
    function playerUtils() {
        _classCallCheck(this, playerUtils);
    }

    _createClass(playerUtils, null, [{
        key: "once",
        value: function once(player, events, handler) {
            function listener() {
                for (var i = 0; i < events.length; i++) {
                    player.off(events[i], listener);
                }

                handler.apply(null, arguments);
            }

            events.forEach(function (event) {
                player.on(event, listener);
            });
        }
    }]);

    return playerUtils;
}();

var _class$7;
var _temp$7;

var DEFAULT$3 = playercore.playerconfig.DEFAULT;
var AdVideoEl = (_temp$7 = _class$7 = function (_VCPlayerObject) {
    _inherits(AdVideoEl, _VCPlayerObject);

    function AdVideoEl(props) {
        _classCallCheck(this, AdVideoEl);

        var _this = _possibleConstructorReturn(this, (AdVideoEl.__proto__ || _Object$getPrototypeOf(AdVideoEl)).call(this, props));

        var player = _this.props.player;

        _this.createAdVideoEl();
        _this._dispose = _this._dispose.bind(_this);
        player.on(DEFAULT$3.EVENT.AD_END, _this._dispose);
        player.on(DEFAULT$3.EVENT.USER_SKIP_AD, _this._dispose);
        player.on(DEFAULT$3.EVENT.VAST_AD_VIDEO_COMPLETE, _this._dispose);
        player.on(DEFAULT$3.EVENT.VPAID_AD_VIDEO_COMPLETE, _this._dispose);
        return _this;
    }
    /**
    * Định nghĩa kiểu của props
    * @type {Object}
    */


    _createClass(AdVideoEl, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var player = this.props.player;

            player.off(DEFAULT$3.EVENT.AD_END, this._dispose);
            player.off(DEFAULT$3.EVENT.USER_SKIP_AD, this._dispose);
            player.off(DEFAULT$3.EVENT.VAST_AD_VIDEO_COMPLETE, this._dispose);
            player.off(DEFAULT$3.EVENT.VPAID_AD_VIDEO_COMPLETE, this._dispose);
        }
    }, {
        key: '_dispose',
        value: function _dispose() {
            var videoEl = this.state.videoEl;
            var player = this.props.player;


            Dom.remove(videoEl);
            videoEl = null;
            player.overlay.getElementsByClassName('overlay-ad')[0].style.opacity = '0';
        }
    }, {
        key: 'createAdVideoEl',
        value: function createAdVideoEl() {
            var player = this.props.player;

            var videoEl = document.createElement('video');
            videoEl.style.display = 'none';
            Dom.addClass(videoEl, 'VideoEl-container');
            player.overlay.getElementsByClassName('overlay-ad')[0].append(videoEl);
            this.setState({
                videoEl: videoEl
            });
            videoEl.addEventListener('playing', function () {
                videoEl.style.display = 'block';
                player.overlay.getElementsByClassName('overlay-ad')[0].style.opacity = '1';
            });
        }
    }, {
        key: 'src',
        value: function src(source) {
            var videoEl = this.state.videoEl;

            videoEl.src = source.src;
        }
    }, {
        key: 'on',
        value: function on(event, cb) {
            var videoEl = this.state.videoEl;

            videoEl.addEventListener(event, cb);
        }
    }, {
        key: 'off',
        value: function off(event, cb) {
            var videoEl = this.state.videoEl;

            videoEl.removeEventListener(event, cb);
        }
    }, {
        key: 'currentTime',
        value: function currentTime() {
            var videoEl = this.state.videoEl;

            return videoEl.currentTime;
        }
    }, {
        key: 'duration',
        value: function duration() {
            var videoEl = this.state.videoEl;

            return videoEl.duration;
        }
    }, {
        key: 'load',
        value: function load() {
            var videoEl = this.state.videoEl;

            videoEl.load();
        }
    }, {
        key: 'volume',
        value: function volume(_volume) {
            var videoEl = this.state.videoEl;

            if (typeof _volume !== 'number') {
                return videoEl.volume;
            }
            videoEl.volume = _volume;
        }
    }, {
        key: 'paused',
        value: function paused() {
            var videoEl = this.state.videoEl;

            return videoEl.paused;
        }
    }, {
        key: 'play',
        value: function play() {
            var videoEl = this.state.videoEl;
            var player = this.props.player;

            player.trigger('play');
            videoEl.play();
        }
    }, {
        key: 'pause',
        value: function pause() {
            var videoEl = this.state.videoEl;
            var player = this.props.player;

            player.trigger('pause');
            videoEl.pause();
        }
    }, {
        key: 'preload',
        value: function preload(pre) {
            var videoEl = this.state.videoEl;

            videoEl.preload = pre;
        }
    }, {
        key: 'muted',
        value: function muted(_mute) {
            var videoEl = this.state.videoEl;

            if (_mute !== undefined) {
                videoEl.muted = _mute;
            }

            return videoEl.muted;
        }
    }]);

    return AdVideoEl;
}(VCPlayerObject$1), _class$7.propTypes = {
    player: playercore.PropTypes.object.isRequired
}, _temp$7);

var _class$6;
var _temp$6;

var PlayerAdUnit = (_temp$6 = _class$6 = function (_VCPlayerObject) {
    _inherits(PlayerAdUnit, _VCPlayerObject);

    function PlayerAdUnit(props) {
        _classCallCheck(this, PlayerAdUnit);

        var _this = _possibleConstructorReturn(this, (PlayerAdUnit.__proto__ || _Object$getPrototypeOf(PlayerAdUnit)).call(this, props));

        _this.selectPlayerAd();
        return _this;
    }
    /**
    * Định nghĩa kiểu của props
    * @type {Object}
    */


    _createClass(PlayerAdUnit, [{
        key: 'createAdVideoEl',
        value: function createAdVideoEl() {
            var player = this.props.player;

            var PlayerAdUnit = new AdVideoEl({ player: player });
            return PlayerAdUnit;
        }
    }, {
        key: 'selectPlayerAd',
        value: function selectPlayerAd() {
            var player = this.props.player;

            var PlayerAdUnit = void 0;

            if (playercore.agent.isIOS) {
                PlayerAdUnit = player;
            } else {
                PlayerAdUnit = this.createAdVideoEl();
            }

            this.setState({
                PlayerAdUnit: PlayerAdUnit
            });
        }
    }, {
        key: 'getPlayerAdUnit',
        value: function getPlayerAdUnit() {
            var PlayerAdUnit = this.state.PlayerAdUnit;


            if (!PlayerAdUnit) {
                return;
            }

            return PlayerAdUnit;
        }
    }]);

    return PlayerAdUnit;
}(VCPlayerObject$1), _class$6.propTypes = {
    player: playercore.PropTypes.object.isRequired
}, _temp$6);

var DEFAULT$2 = playercore.playerconfig.DEFAULT;

var VastTest = function (_VCPlayerObject) {
    _inherits(VastTest, _VCPlayerObject);

    function VastTest(props) {
        _classCallCheck(this, VastTest);

        var _this = _possibleConstructorReturn(this, (VastTest.__proto__ || _Object$getPrototypeOf(VastTest)).call(this, props));

        _this.type = 'VAST';
        _this.state = {
            tracker: null,
            duration: null,
            orderPlay: false,
            firstAdVideoStart: false,
            canPlay: false
        };
        var player = _this.props.player;

        player.one(DEFAULT$2.EVENT.AD_END, _this._handleAdEnd);
        return _this;
    }

    _createClass(VastTest, [{
        key: '_handleAdEnd',
        value: function _handleAdEnd() {}
    }, {
        key: 'playAd',
        value: function playAd(vastResponse) {
            var self = this;
            this.setState({
                vastResponse: vastResponse
            });

            return this._start().then(function () {
                return self._createAdPlayer();
            }).then(function () {
                return self._selectAdSource();
            }).then(function () {
                return self._createVASTTracker();
            }).then(function () {
                return self._addClickThrough();
            }).then(function () {
                return self._addSkipButton();
            }).then(function () {
                return self._setupEvents();
            }).then(function () {
                return self._playSelectedAd();
            }).catch(function (e) {
                self._trackError(e);
                throw e;
            });
        }

        // playSelectedAd(){
        //     return this._playSelectedAd();
        // }

    }, {
        key: '_createAdPlayer',
        value: function _createAdPlayer() {
            var self = this;
            var player = this.props.player;


            return new _Promise(function (resolve) {
                var playerAd = new PlayerAdUnit({ player: player });
                self.setState({
                    playerAdUnit: playerAd.getPlayerAdUnit()
                });
                resolve();
            });
        }
    }, {
        key: 'getPlayerAdUnit',
        value: function getPlayerAdUnit() {
            var playerAdUnit = this.state.playerAdUnit;

            return playerAdUnit;
        }
    }, {
        key: '_start',
        value: function _start() {
            return new _Promise(function (resolve) {
                resolve();
            });
        }
    }, {
        key: '_selectAdSource',
        value: function _selectAdSource() {
            var source = void 0;
            var player = this.props.player;
            var vastResponse = this.state.vastResponse;


            var playerWidth = Dom.getDimension(player.el()).width;
            vastResponse.mediaFiles.sort(function compareTo(a, b) {
                var deltaA = Math.abs(playerWidth - a.width);
                var deltaB = Math.abs(playerWidth - b.width);
                return deltaA - deltaB;
            });

            source = player.selectSource(vastResponse.mediaFiles).source;

            if (source) {
                playercore.log.info('selected source: ', source);
                if (this._adUnit) {
                    this._adUnit._src = source;
                }
                this.setState({ source: source });
                return;
            }

            throw error.VAST_INTEGRATOR_SOURCE_ERROR;
        }
    }, {
        key: '_createVASTTracker',
        value: function _createVASTTracker() {
            var _state = this.state,
                source = _state.source,
                vastResponse = _state.vastResponse;

            var tracker = new VASTTracker(source.src, vastResponse);
            this.setState({ tracker: tracker });
        }
    }, {
        key: '_addClickThrough',
        value: function _addClickThrough() {
            var player = this.props.player;
            var _state2 = this.state,
                source = _state2.source,
                vastResponse = _state2.vastResponse,
                playerAdUnit = _state2.playerAdUnit;

            var updateBlocker = updateBlockerURL.bind(null, vastResponse, playerAdUnit, player);

            playerAdUnit.on('timeupdate', updateBlocker);

            // player.on(DEFAULT.EVENT.VAST_AD_TIMEUPDATE, updateBlocker);
            // videoEl.ontimeupdate = updateBlocker;

            function updateBlockerURL(response, playerAdUnit, player) {
                try {
                    var href = generateClickThroughURL(response.clickThrough, playerAdUnit);
                    player.container.ad.clickThrough.updateBlocker(href);
                } catch (e) {
                    // ignore
                }
            }

            function generateClickThroughURL(clickThroughMacro, playerAdUnit) {
                var variables = {
                    ASSETURI: source.src,
                    CONTENTPLAYHEAD: VastUtil.formatProgress(playerAdUnit.currentTime() * 1000)
                };

                return clickThroughMacro ? VastUtil.parseURLMacro(clickThroughMacro, variables) : '#';
            }
        }
    }, {
        key: '_addSkipButton',
        value: function _addSkipButton() {}
    }, {
        key: '_setupEvents',
        value: function _setupEvents() {
            var player = this.props.player;
            var _state3 = this.state,
                tracker = _state3.tracker,
                playerAdUnit = _state3.playerAdUnit;

            function unbindEvents() {
                player.off('fullscreenchange', trackFullscreenChange);
                player.off(DEFAULT$2.EVENT.VAST_AD_VIDEO_START, trackImpressions);
                playerAdUnit.off('pause', trackPause);
                playerAdUnit.off('timeupdate', trackProgress);
                playerAdUnit.off('volumechange', trackVolumeChange);
                playerAdUnit.off('durationchange', onDurationChange);
            }

            function unbindDurationChange() {
                playerAdUnit.off('durationchange', onDurationChange);
            }

            function trackFullscreenChange() {
                if (player.isFullscreen()) {
                    tracker.trackFullscreen();
                } else {
                    tracker.trackExitFullscreen();
                }
            }

            function trackPause() {
                //NOTE: whenever a video ends the video Element triggers a 'pause' event before the 'ended' event.
                //      We should not track this pause event because it makes the VAST tracking confusing again we use a
                //      Threshold of 2 seconds to prevent false positives on IOS.
                if (Math.abs(playerAdUnit.duration() - playerAdUnit.currentTime()) < 2) {
                    return;
                }
                tracker.trackPause();
                playerUtils.once(player, [DEFAULT$2.EVENT.VAST_AD_RESUME, DEFAULT$2.EVENT.AD_END, DEFAULT$2.EVENT.AD_CANCEL], function (evt) {
                    if (evt.type === DEFAULT$2.EVENT.VAST_AD_RESUME) {
                        tracker.trackResume();
                    }
                });
            }

            function trackProgress() {
                var currentTimeInMs = playerAdUnit.currentTime() * 1000;
                tracker.trackProgress(currentTimeInMs);
            }

            function trackImpressions() {
                tracker.trackImpressions();
                tracker.trackCreativeView();
            }

            function trackVolumeChange() {
                var volume_ = playerAdUnit.volume();
                var mute_ = playerAdUnit.muted();
                if (volume_ === 0 || mute_) {
                    tracker.trackMute();
                } else {
                    tracker.trackUnmute();
                }
            }

            function onDurationChange() {
                var duration = playerAdUnit.duration();
                if (isNaN(duration)) {
                    return;
                }
                tracker.durationChange(duration * 1000);
            }

            player.on('fullscreenchange', trackFullscreenChange);
            player.on(DEFAULT$2.EVENT.VAST_AD_VIDEO_START, trackImpressions);
            player.on(DEFAULT$2.EVENT.VAST_AD_START, unbindDurationChange);

            /* Setup Event tracker   */

            /* Setup Event cho Player */

            playerAdUnit.on('durationchange', function () {
                playerAdUnit.on('pause', trackPause);
                playerAdUnit.on('timeupdate', trackProgress);
                playerAdUnit.on('volumechange', trackVolumeChange);
                playerAdUnit.on('durationchange', onDurationChange);

                playerAdUnit.on('play', function () {
                    player.trigger(DEFAULT$2.EVENT.VAST_AD_RESUME);
                });

                // player.on('pause', trackPause);
                // player.on('timeupdate', trackProgress);
                // player.on('volumechange', trackVolumeChange);
                // player.on('durationchange', onDurationChange);
                onDurationChange();
            });

            playerUtils.once(player, [DEFAULT$2.EVENT.AD_END, DEFAULT$2.EVENT.AD_CANCEL, DEFAULT$2.EVENT.AD_SKIP], unbindEvents);
            playerUtils.once(player, [DEFAULT$2.EVENT.AD_END, DEFAULT$2.EVENT.AD_CANCEL, DEFAULT$2.EVENT.AD_SKIP], function (evt) {
                if (evt.type === DEFAULT$2.EVENT.AD_END) {
                    tracker.trackComplete();
                }
            });

            /*** Local Functions ***/
        }
    }, {
        key: '_playSelectedAd',
        value: function _playSelectedAd() {
            var self = this;
            var _props = this.props,
                player = _props.player,
                type = _props.type,
                preLoaded = _props.preLoaded;
            var _state4 = this.state,
                playerAdUnit = _state4.playerAdUnit,
                orderPlay = _state4.orderPlay,
                firstAdVideoStart = _state4.firstAdVideoStart,
                canPlay = _state4.canPlay,
                source = _state4.source;
            var vastAd = player.vastAd;


            return new _Promise(function (resolve, reject) {
                function unbindEvents() {
                    player.off(DEFAULT$2.EVENT.AD_SKIP, proceed);
                    player.off('play', _preroll);
                    player.off('timeupdate', _playAd);
                    player.off(DEFAULT$2.EVENT.AD_ORDER_START_MIDROLL, _snapshotPlayer);
                    player.off(DEFAULT$2.EVENT.AD_ORDER_START_POSTROLL, _snapshotPlayer);
                    playerAdUnit.off('ended', proceed);
                }

                function proceed(evt) {
                    if (evt.type === 'ended' && playerAdUnit.duration() - playerAdUnit.currentTime() > 3) {
                        // Ignore ended event if the Ad time was not 'near' the end
                        // avoids issues where IOS controls could skip the Ad
                        return;
                    }

                    unbindEvents();

                    //NOTE: if the ads get cancel we do nothing apart removing the listners
                    if (evt.type === 'ended' || evt.type === DEFAULT$2.EVENT.AD_SKIP) {
                        player.trigger(DEFAULT$2.EVENT.VAST_AD_VIDEO_COMPLETE);
                        resolve();
                    }
                }

                function playAd() {
                    if (!canPlay) {
                        orderPlay = true;
                        return;
                    }
                    player.trigger(DEFAULT$2.EVENT.AD_PLAY, vastAd.state.vastResponse);
                    player.trigger(DEFAULT$2.EVENT.VAST_AD_START);
                    player.trigger(DEFAULT$2.EVENT.AD_START, vastAd);
                    player.play();
                }

                function _playAd() {
                    player.vastAd._prepareForAd();

                    player.vastAd.firstAd = true;
                    playAd();
                }

                playerAdUnit.on('error', function () {
                    unbindEvents();
                    reject('Error! Something went wrong');
                });

                playerAdUnit.on('loadedmetadata', function () {
                    if (orderPlay && !canPlay) {
                        canPlay = true;
                        playAd();
                    }
                    canPlay = true;
                });

                playerAdUnit.on('playing', function () {
                    if (!firstAdVideoStart) {
                        self._vastAdVideoStart();
                        firstAdVideoStart = true;
                    }
                });

                playerAdUnit.on('ended', proceed);
                player.on(DEFAULT$2.EVENT.AD_CANCEL, proceed);
                player.on(DEFAULT$2.EVENT.AD_SKIP, proceed);

                if (!preLoaded && !player.vastAd.firstAd) {
                    player.vastAd._setUpRestorePlayer();
                    player.trigger('snapshotPlayer');
                    playerAdUnit.preload('auto');
                    playerAdUnit.src(source);
                    _playAd();
                    return;
                }

                if (player.vastAd.firstAd) {
                    playAd();
                    return;
                }

                function _preroll() {
                    player.one('timeupdate', _snapshotPlayer);
                }
                /**
                 * Check thuộc loại ads nào để load trước mediafile Ads
                 */

                function _snapshotPlayer() {
                    player.trigger('snapshotPlayer');
                    _playAd();
                }

                player.vastAd._setUpRestorePlayer();
                playerAdUnit.preload('auto');
                playerAdUnit.src(source);

                if (type === 'preroll') {
                    playerAdUnit.load();
                    player.one('play', _preroll);
                } else if (type === 'midroll') {
                    playerAdUnit.load();
                    player.one(DEFAULT$2.EVENT.AD_ORDER_START_MIDROLL, _snapshotPlayer);
                    player.trigger('prepareMidrollVastSuccess');
                } else if (type === 'postroll') {
                    playerAdUnit.load();
                    player.one(DEFAULT$2.EVENT.AD_ORDER_START_POSTROLL, _snapshotPlayer);
                    player.trigger('preparePostrollSuccess');
                }
            });
        }
    }, {
        key: '_vastAdVideoStart',
        value: function _vastAdVideoStart() {
            var player = this.props.player;

            player.trigger(DEFAULT$2.EVENT.VAST_AD_VIDEO_START);
        }
    }, {
        key: 'getAdDuration',
        value: function getAdDuration() {
            var playerAdUnit = this.state.playerAdUnit;

            var duration = playerAdUnit.duration();
            return _Promise.resolve(duration);
        }
    }, {
        key: 'getSkipOffSet',
        value: function getSkipOffSet() {
            var skipoffset = this.props.skipoffset;


            if (!skipoffset) {
                return;
            }

            return skipoffset;
        }
    }, {
        key: '_trackError',
        value: function _trackError(error$$1) {
            var vastResponse = this.state.vastResponse;

            VastUtil.track(vastResponse.errorURLMacros, { ERRORCODE: error$$1.code || 900 });
        }
    }, {
        key: 'getAdRemainingTime',
        value: function getAdRemainingTime() {
            // let { player } = this.props;
            var playerAdUnit = this.state.playerAdUnit;

            var remainingTime = playerAdUnit.duration() - playerAdUnit.currentTime();
            return _Promise.resolve(remainingTime);
        }
    }, {
        key: 'getAdVolume',
        value: function getAdVolume() {
            // let { player } = this.props;
            var playerAdUnit = this.state.playerAdUnit;

            var volume = playerAdUnit.volume();
            return _Promise.resolve(volume);
        }
    }, {
        key: 'skipAd',
        value: function skipAd() {
            var player = this.props.player;
            var tracker = this.state.tracker;


            if (!player || !tracker) {
                return;
            }
            tracker.trackSkip();
            player.trigger(DEFAULT$2.EVENT.AD_SKIP);
        }
    }, {
        key: 'pauseAd',
        value: function pauseAd() {
            var player = this.props.player;
            var playerAdUnit = this.state.playerAdUnit;

            playerAdUnit.pause(true);
            player.trigger(DEFAULT$2.EVENT.AD_PAUSE_AD);
        }
    }, {
        key: 'resumeAd',
        value: function resumeAd() {
            var player = this.props.player;
            var playerAdUnit = this.state.playerAdUnit;

            playerAdUnit.play(true);
            player.trigger(DEFAULT$2.EVENT.AD_RESUME_AD);
        }
    }, {
        key: 'clickThrough',
        value: function clickThrough() {
            var player = this.props.player;
            var tracker = this.state.tracker;


            if (!player || !tracker) {
                return;
            }
            player.trigger(DEFAULT$2.EVENT.VAST_AD_CLICK_THRU);
            tracker.trackClick();
        }
    }, {
        key: 'setAdVolume',
        value: function setAdVolume(volume) {
            var playerAdUnit = this.state.playerAdUnit;

            playerAdUnit.volume(volume);
        }
    }, {
        key: 'isPaused',
        value: function isPaused() {
            var playerAdUnit = this.state.playerAdUnit;

            return playerAdUnit.paused();
        }
    }]);

    return VastTest;
}(VCPlayerObject$1);

var _class$9;
var _temp$9;

var EVENTS$1 = ['AdLoaded', 'AdStarted', 'AdStopped', 'AdSkipped', 'AdSkippableStateChange', // VPAID 2.0 new event
'AdSizeChange', // VPAID 2.0 new event
'AdLinearChange', 'AdDurationChange', // VPAID 2.0 new event
'AdExpandedChange', 'AdRemainingTimeChange', // [Deprecated in 2.0] but will be still fired for backwards compatibility
'AdVolumeChange', 'AdImpression', 'AdVideoStart', 'AdVideoFirstQuartile', 'AdVideoMidpoint', 'AdVideoThirdQuartile', 'AdVideoComplete', 'AdClickThru', 'AdInteraction', // VPAID 2.0 new event
'AdUserAcceptInvitation', 'AdUserMinimize', 'AdUserClose', 'AdPaused', 'AdPlaying', 'AdLog', 'AdError'];

var VPAIDAdUnitWrapper = (_temp$9 = _class$9 = function (_VCPlayerObject) {
    _inherits(VPAIDAdUnitWrapper, _VCPlayerObject);

    function VPAIDAdUnitWrapper(props) {
        _classCallCheck(this, VPAIDAdUnitWrapper);

        var _this = _possibleConstructorReturn(this, (VPAIDAdUnitWrapper.__proto__ || _Object$getPrototypeOf(VPAIDAdUnitWrapper)).call(this, props));

        var _this$props = _this.props,
            adUnit = _this$props.adUnit,
            player = _this$props.player;

        if (!adUnit || !_this._checkVPAIDInterface(adUnit)) {
            throw error.VPAID_AD_UNIT_WRAPPER_AD_UNIT_NOT_FULLY;
        }

        EVENTS$1.forEach(function (event) {
            this.on(event, function () {
                player.trigger('ads.log', event);
            });
        }.bind(_this));
        return _this;
    }

    /**
     * Định nghĩa kiểu của props
     * @type {Object}
     */


    _createClass(VPAIDAdUnitWrapper, [{
        key: '_checkVPAIDInterface',
        value: function _checkVPAIDInterface(VPAIDAdUnit) {
            //NOTE: skipAd is not part of the method list because it only appears in VPAID 2.0 and we support VPAID 1.0
            var VPAIDInterfaceMethods = ['handshakeVersion', 'initAd', 'startAd', 'stopAd', 'resizeAd', 'pauseAd', 'expandAd', 'collapseAd'];

            for (var i = 0, len = VPAIDInterfaceMethods.length; i < len; i++) {
                if (!VPAIDAdUnit || !isFunction(VPAIDAdUnit[VPAIDInterfaceMethods[i]])) {
                    return false;
                }
            }

            return canSubscribeToEvents(VPAIDAdUnit) && canUnsubscribeFromEvents(VPAIDAdUnit);

            /*** Local Functions ***/

            function canSubscribeToEvents(adUnit) {
                return isFunction(adUnit.subscribe) || isFunction(adUnit.addEventListener) || isFunction(adUnit.on);
            }

            function canUnsubscribeFromEvents(adUnit) {
                return isFunction(adUnit.unsubscribe) || isFunction(adUnit.removeEventListener) || isFunction(adUnit.off);
            }
        }
    }, {
        key: 'adUnitAsyncCall',
        value: function adUnitAsyncCall() {
            var _props = this.props,
                adUnit = _props.adUnit,
                responseTimeout = _props.responseTimeout;

            var args = arrayLikeObjToArray(arguments);
            var method = args.shift();
            var cb = args.pop();
            var timeoutId;

            sanityCheck(method, cb, adUnit);
            args.push(wrapCallback());

            adUnit[method].apply(adUnit, args);
            timeoutId = setTimeout(function () {
                timeoutId = null;
                cb(error.VPAID_AD_UNIT_WRAPPER_METHOD_TIMEOUT.extendsWithData({ method: method }));
                cb = noop;
            }, responseTimeout);

            /*** Local functions ***/
            function sanityCheck(method, cb, adUnit) {
                if (!isString(method) || !isFunction(adUnit[method])) {
                    throw error.VPAID_AD_UNIT_WRAPPER_INVALID_METHOD_NAME.extendsWithData({ method: method });
                }

                if (!isFunction(cb)) {
                    throw error.VPAID_AD_UNIT_WRAPPER_MISSING_CALLBACK.extendsWithData({ method: method });
                }
            }

            function wrapCallback() {
                return function () {
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                    }
                    cb.apply(this, arguments);
                };
            }
        }
    }, {
        key: 'on',
        value: function on(evtName, handler) {
            var adUnit = this.props.adUnit;

            var addEventListener = adUnit.addEventListener || adUnit.subscribe || adUnit.on;
            addEventListener.call(adUnit, evtName, handler);
        }
    }, {
        key: 'off',
        value: function off(evtName, handler) {
            var adUnit = this.props.adUnit;

            var removeEventListener = adUnit.removeEventListener || adUnit.unsubscribe || adUnit.off;
            removeEventListener.call(adUnit, evtName, handler);
        }
    }, {
        key: 'waitForEvent',
        value: function waitForEvent(evtName, cb, context, timeout) {
            var responseTimeout = this.props.responseTimeout;

            var timeoutId = void 0;
            sanityCheck(evtName, cb);
            context = context || null;

            this.on(evtName, responseListener);

            timeoutId = setTimeout(function () {
                cb(error.VPAID_AD_UNIT_WRAPPER_EVENT_TIMEOUT.extendsWithData({ event: evtName }));
                timeoutId = null;
                cb = noop;
            }, timeout || responseTimeout);

            /*** Local functions ***/
            function sanityCheck(evtName, cb) {
                if (!isString(evtName)) {
                    throw error.VPAID_AD_UNIT_WRAPPER_MISSING_EVENT_NAME.extendsWithData({ event: evtName });
                }

                if (!isFunction(cb)) {
                    throw error.VPAID_AD_UNIT_WRAPPER_MISSING_EVENT_CALLBACK.extendsWithData({ event: evtName });
                }
            }

            function responseListener() {
                var args = arrayLikeObjToArray(arguments);

                if (timeoutId) {
                    clearTimeout(timeoutId);
                    timeoutId = null;
                }

                args.unshift(null);
                cb.apply(context, args);
            }
        }
    }, {
        key: 'handshakeVersion',
        value: function handshakeVersion(version, cb) {
            this.adUnitAsyncCall('handshakeVersion', version, cb);
        }
    }, {
        key: 'initAd',
        value: function initAd(width, height, viewMode, desiredBitrate, adUnitData, cb) {
            var adUnit = this.props.adUnit;

            var isLoaded = false;
            var isError = false;

            this.waitForEvent('AdLoaded', function () {
                if (isError) {
                    return;
                }
                isLoaded = true;
                cb.apply(null, arguments);
            });

            this.on('AdError', function (error$$1) {
                if (isLoaded) {
                    return;
                }

                isError = true;
                cb(error$$1);
            });

            adUnit.initAd(width, height, viewMode, desiredBitrate, adUnitData, { iframe: adUnit._iframe });
        }
    }, {
        key: 'resizeAd',
        value: function resizeAd(width, height, viewMode, cb) {
            // NOTE: AdSizeChange event is only supported on VPAID 2.0 so for the moment we are not going to use it
            // and will assume that everything is fine after the async call
            this.adUnitAsyncCall('resizeAd', width, height, viewMode, cb);
        }
    }, {
        key: 'startAd',
        value: function startAd(cb) {
            var adUnit = this.props.adUnit;

            this.waitForEvent('AdStarted', cb);
            adUnit.startAd();
        }
    }, {
        key: 'stopAd',
        value: function stopAd(cb) {
            var adUnit = this.props.adUnit;

            this.waitForEvent('AdStopped', cb, null, 300);
            adUnit.stopAd();
        }
    }, {
        key: 'pauseAd',
        value: function pauseAd(cb) {
            var adUnit = this.props.adUnit;

            this.waitForEvent('AdPaused', cb);
            adUnit.pauseAd();
        }
    }, {
        key: 'resumeAd',
        value: function resumeAd(cb) {
            var adUnit = this.props.adUnit;

            this.waitForEvent('AdPlaying', cb);
            adUnit.resumeAd();
        }
    }, {
        key: 'expandAd',
        value: function expandAd(cb) {
            var adUnit = this.props.adUnit;

            this.waitForEvent('AdExpandedChange', cb);
            adUnit.expandAd();
        }
    }, {
        key: 'collapseAd',
        value: function collapseAd(cb) {
            var adUnit = this.props.adUnit;

            this.waitForEvent('AdExpandedChange', cb);
            adUnit.collapseAd();
        }
    }, {
        key: 'skipAd',
        value: function skipAd(cb) {
            var adUnit = this.props.adUnit;

            this.waitForEvent('AdSkipped', cb, null, 300);
            adUnit.skipAd();
        }
    }, {
        key: 'setAdVolume',
        value: function setAdVolume(volume, cb) {
            this.adUnitAsyncCall('setAdVolume', volume, cb);
        }
    }]);

    return VPAIDAdUnitWrapper;
}(VCPlayerObject$1), _class$9.propTypes = {
    adUnit: playercore.PropTypes.object.isRequired,
    player: playercore.PropTypes.object.isRequired,
    responseTimeout: playercore.PropTypes.number.isRequired,
    src: playercore.PropTypes.string.isRequired
}, _temp$9);

//VPAID property getters

['adLinear', 'adWidth', 'adHeight', 'adExpanded', 'adSkippableState', 'adRemainingTime', 'adDuration', 'adVolume', 'adCompanions', 'adIcons'].forEach(function (property) {
    var getterName = 'get' + capitalize(property);

    VPAIDAdUnitWrapper.prototype[getterName] = function (cb) {
        this.adUnitAsyncCall(getterName, cb);
    };
});

var _class$8;
var _class2$2;
var _temp$8;

function _applyDecoratedDescriptor$2(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

var DEFAULT$4 = playercore.playerconfig.DEFAULT;
var VPAIDIntegrator = (_class$8 = (_temp$8 = _class2$2 = function (_VCPlayerObject) {
    _inherits(VPAIDIntegrator, _VCPlayerObject);

    function VPAIDIntegrator(props) {
        _classCallCheck(this, VPAIDIntegrator);

        var _this = _possibleConstructorReturn(this, (VPAIDIntegrator.__proto__ || _Object$getPrototypeOf(VPAIDIntegrator)).call(this, props));

        _this.type = 'VPAID';
        _this.VIEW_MODE = {
            NORMAL: 'normal',
            FULLSCREEN: 'fullscreen',
            THUMBNAIL: 'thumbnail'
        };
        _this.state = {
            ended: false,
            duration: null
        };
        var player = _this.props.player;

        _this.containerEl = _this._createVPAIDContainerEl(player);

        player.one('vpaid:AdEnd', _this._handleAdEnd);
        player.one(DEFAULT$4.EVENT.AD_END, _this._handleAdEnd);
        return _this;
    }

    _createClass(VPAIDIntegrator, [{
        key: '_handleAdEnd',
        value: function _handleAdEnd() {
            playercore.log.debug('<VPAIDIntegrator._handleAdEnd>');

            var tech = this.state.tech;

            if (tech) {
                tech.unloadAdUnit();
            }

            if (this.containerEl) {
                Dom.remove(this.containerEl);
                this.containerEl = null;
            }
        }
    }, {
        key: 'playAd',
        value: function playAd(vastResponse) {
            var self = this;
            var player = this.props.player;

            this.setState({
                vastResponse: vastResponse
            });

            return this._start().then(function () {
                return self._createAdPlayer();
            }).then(function () {
                return self._findSupportedTech();
            }).then(function () {
                return self._loadAdUnit();
            }).then(function () {
                return self._playAdUnit();
            }).then(function () {
                var snapshot = player.vastAd.state.restorePlayer.state.snapshot;

                var volume = snapshot.muted ? 0 : snapshot.volume;
                self.setAdVolume(volume);
                return self._finishPlaying();
            }).catch(function (e) {
                self._trackError(e);
                throw e;
            });
        }
    }, {
        key: '_createAdPlayer',
        value: function _createAdPlayer() {
            var self = this;
            var player = this.props.player;


            return new _Promise(function (resolve) {
                var playerAd = new PlayerAdUnit({ player: player });
                self.setState({
                    playerAdUnit: playerAd.getPlayerAdUnit()
                });
                resolve();
            });
        }
    }, {
        key: 'getSkipOffSet',
        value: function getSkipOffSet() {
            var skipoffset = this.props.skipoffset;


            if (!skipoffset) {
                return;
            }

            return skipoffset;
        }
    }, {
        key: 'skipAd',
        value: function skipAd() {
            var player = this.props.player;
            var _state = this.state,
                tracker = _state.tracker,
                adUnit = _state.adUnit;


            if (!player || !tracker) {
                return;
            }

            tracker.trackSkip();
            adUnit.skipAd(function (error$$1) {
                if (error$$1) {
                    player.trigger('vpaid-skip-ad-error', error$$1);
                }
            });
        }
    }, {
        key: 'getAdVolume',
        value: function getAdVolume() {
            var adUnit = this.state.adUnit;

            return new _Promise(function (resolve, reject) {
                adUnit.getAdVolume(function (error$$1, currentVolume) {
                    if (error$$1) {
                        return reject(error$$1);
                    }

                    resolve(currentVolume);
                });
            });
        }
    }, {
        key: 'getAdExpanded',
        value: function getAdExpanded() {
            var adUnit = this.state.adUnit;

            return new _Promise(function (resolve, reject) {
                adUnit.getAdExpanded(function (error$$1, expandAd) {
                    if (error$$1) {
                        reject(error$$1);
                    }
                    resolve(expandAd);
                });
            });
        }
    }, {
        key: 'setAdVolume',
        value: function setAdVolume(volume) {
            var adUnit = this.state.adUnit;

            adUnit.setAdVolume(volume, this._logError);
        }
    }, {
        key: 'pauseAd',
        value: function pauseAd() {
            var player = this.props.player;

            player.trigger('vpaid.pauseAd');
            player.pause(true); //we make sure that the video content gets stopped.
            player.trigger(DEFAULT$4.EVENT.AD_PAUSE_AD);
        }
    }, {
        key: 'resumeAd',
        value: function resumeAd() {
            var player = this.props.player;

            player.trigger('vpaid.resumeAd');
            player.trigger(DEFAULT$4.EVENT.AD_RESUME_AD);
        }
    }, {
        key: 'isPaused',
        value: function isPaused() {
            var paused = this.state.paused;

            return paused;
        }
    }, {
        key: 'getSrc',
        value: function getSrc() {
            var tech = this.state.tech;

            return tech.mediaFile;
        }
    }, {
        key: 'techName',
        value: function techName() {
            var tech = this.state.tech;

            return tech.name;
        }
    }, {
        key: 'getAdRemainingTime',
        value: function getAdRemainingTime() {
            var adUnit = this.state.adUnit;

            return new _Promise(function (resolve, reject) {
                adUnit.getAdRemainingTime(function (error$$1, remainingTime) {
                    if (error$$1) {
                        return reject(error$$1);
                    }

                    resolve(remainingTime);
                });
            });
        }
    }, {
        key: 'getAdDuration',
        value: function getAdDuration() {
            var _state2 = this.state,
                adUnit = _state2.adUnit,
                duration = _state2.duration;

            if (duration) {
                return _Promise.resolve(duration);
            }

            return new _Promise(function (resolve, reject) {
                adUnit.getAdDuration(function (error$$1, duration) {
                    if (error$$1) {
                        return reject(error$$1);
                    }

                    resolve(duration);
                });
            });
        }
    }, {
        key: '_createVPAIDContainerEl',
        value: function _createVPAIDContainerEl() {
            var player = this.props.player;

            var containerEl = document.createElement('div');
            containerEl.style.display = 'none';
            Dom.addClass(containerEl, 'VPAID-container');

            player.overlay.append(containerEl);
            return containerEl;
        }
    }, {
        key: '_start',
        value: function _start() {
            return new _Promise(function (resolve) {
                resolve();
            });
        }
    }, {
        key: '_findSupportedTech',
        value: function _findSupportedTech() {
            var vastResponse = this.state.vastResponse;

            var vpaidMediaFiles = vastResponse.mediaFiles.filter(VastUtil.isVPAID);
            var skippedSupportTechs = [];
            var tech = void 0;

            for (var i = 0, len = vpaidMediaFiles.length; i < len; i += 1) {
                var mediaFile = vpaidMediaFiles[i];
                var VPAIDTech = VastUtil.findSupportedVPAIDTech(mediaFile.type);
                if (!VPAIDTech) {
                    continue;
                }

                skippedSupportTechs.push({ mediaFile: mediaFile, tech: VPAIDTech });
            }

            if (skippedSupportTechs.length) {
                var firstTech = skippedSupportTechs[0];
                tech = new firstTech.tech(firstTech.mediaFile, this.props);
            }

            if (tech) {
                playercore.log.info('<VPAIDIntegrator.playAd> found tech: ', tech);
                this.setState({
                    tech: tech
                });
                return;
            }

            throw error.VPAID_INTEGRATOR_NOT_SUPPORT_MEDIAFILE;
        }
    }, {
        key: 'getPlayerAdUnit',
        value: function getPlayerAdUnit() {
            var playerAdUnit = this.state.playerAdUnit;

            return playerAdUnit;
        }
    }, {
        key: '_loadAdUnit',
        value: function _loadAdUnit() {
            playercore.log.debug('<VPAIDIntegrator._loadAdUnit>');

            var self = this;
            var _props = this.props,
                player = _props.player,
                responseTimeout = _props.responseTimeout;
            var _state3 = this.state,
                tech = _state3.tech,
                playerAdUnit = _state3.playerAdUnit;

            var videoEl = void 0;
            if (playercore.agent.isIOS) {
                videoEl = playerAdUnit.el().querySelector('.vjs-tech');
            } else {
                videoEl = playerAdUnit.state.videoEl;
            }
            // let vjsTechEl = player.el().querySelector('.vjs-tech');

            //player.reset();

            return new _Promise(function (resolve, reject) {
                tech.loadAdUnit(self.containerEl, videoEl, function (error$$1, adUnit) {
                    if (error$$1) {
                        playercore.log.debug('<VPAIDIntegrator._loadAdUnit> error: ', error$$1);
                        reject(error$$1);
                        return;
                    }

                    try {
                        adUnit = self._createVPAIDAdUnitWrapper(adUnit, tech.mediaFile.src, responseTimeout);
                        player.trigger(tech.name + '-ad');
                        self.setState({
                            adUnit: adUnit
                        });
                        playercore.log.debug('<VPAIDIntegrator._loadAdUnit> success');
                        resolve();
                    } catch (e) {
                        playercore.log.debug('<VPAIDIntegrator._loadAdUnit> error: ', error$$1);
                        reject(error$$1);
                    }
                });
            });
        }
    }, {
        key: '_playAdUnit',
        value: function _playAdUnit() {
            playercore.log.debug('<VPAIDIntegrator._playAdUnit>');

            var self = this;
            return this._start().then(function () {
                return self._handshake();
            }).then(function () {
                return self._setupEvents();
            }).then(function () {
                return self._initAd();
            }).then(function () {
                return self._addSkipButton();
            }).then(function () {
                return self._addMuteButton();
            }).then(function () {
                return self._linkPlayerControls();
            }).then(function () {
                return self._playVideoEl();
            }).then(function () {
                return self._startAd();
            });
        }
    }, {
        key: '_playVideoEl',
        value: function _playVideoEl() {
            var _props2 = this.props,
                preLoaded = _props2.preLoaded,
                type = _props2.type,
                player = _props2.player;

            return new _Promise(function (resolve) {

                function playAd() {
                    resolve();
                }

                function _playAd() {
                    player.vastAd._setUpRestorePlayer();
                    player.trigger('snapshotPlayer');
                    player.vastAd._prepareForAd();
                    player.trigger(DEFAULT$4.EVENT.AD_START, player.vastAd);
                    player.vastAd.firstAd = true;
                    playAd();
                }

                if (!preLoaded && !player.vastAd.firstAd) {
                    _playAd();
                    return;
                }

                if (player.vastAd.firstAd) {
                    playAd();
                    return;
                }

                if (type === 'preroll') {
                    player.one('play', function () {
                        player.one('timeupdate', _playAd);
                    });
                } else if (type === 'midroll') {
                    player.one(DEFAULT$4.EVENT.AD_ORDER_START_MIDROLL, _playAd);
                    player.trigger('prepareMidrollVastSuccess');
                } else if (type === 'postroll') {
                    player.one(DEFAULT$4.EVENT.AD_ORDER_START_POSTROLL, _playAd);
                    player.one(DEFAULT$4.EVENT.PLAYER_ENDED_CONTEND, function () {
                        player.trigger('preparePostrollSuccess');
                    });
                }
            });
        }
    }, {
        key: '_handshake',
        value: function _handshake() {
            playercore.log.debug('<VPAIDIntegrator._handshake>');

            var adUnit = this.state.adUnit;
            var VPAID_VERSION = this.props.VPAID_VERSION;


            function isSupportedVersion(version) {
                var majorNum = major(version);
                return majorNum >= 1 && majorNum <= 2;
            }

            function major(version) {
                var parts = version.split('.');
                return parseInt(parts[0], 10);
            }

            return new _Promise(function (resolve, reject) {
                adUnit.handshakeVersion(VPAID_VERSION, function (error$$1, version) {
                    if (error$$1) {
                        reject(error$$1);
                        return;
                    }

                    if (version && isSupportedVersion(version)) {
                        resolve();
                        return;
                    }

                    reject(error.VPAID_INTEGRATOR_HANDSHAKE_NOT_SUPPORT_VERSION);
                });
            });
        }
    }, {
        key: '_initAd',
        value: function _initAd() {
            playercore.log.debug('<VPAIDIntegrator._initAd>');

            var self = this;
            var _state4 = this.state,
                adUnit = _state4.adUnit,
                vastResponse = _state4.vastResponse;
            var player = this.props.player;

            var tech = player.el().querySelector('.vjs-tech');
            // let videoEl_ = this.videoEl;

            var dimension = Dom.getDimension(tech);

            return new _Promise(function (resolve, reject) {

                adUnit.initAd(dimension.width, dimension.height, self.VIEW_MODE.NORMAL, -1, {
                    AdParameters: vastResponse.adParameters || '',
                    playerID: player.id_
                }, function (error$$1) {
                    if (error$$1) {
                        reject(error.VPAID_INTEGRATOR_ERROR_WHILE_INIT.extendsWithData({
                            error: error$$1
                        }));
                        return;
                    }

                    self.setState({
                        inited: true
                    });

                    resolve();
                });
            });
        }
    }, {
        key: '_setupEvents',
        value: function _setupEvents() {
            playercore.log.debug('<VPAIDIntegrator._setupEvents>');

            var self = this;
            var tracker = this._createVASTTracker();
            var player = this.props.player;
            var _state5 = this.state,
                adUnit = _state5.adUnit,
                vastResponse = _state5.vastResponse;


            this.setState({
                tracker: tracker
            });

            adUnit.on('AdSkipped', function () {
                playercore.log.trace('<VPAIDIntegrator Event>', 'AdSkipped');

                player.trigger(DEFAULT$4.EVENT.VPAID_AD_SKIPPED);
                tracker.trackSkip();
            });

            adUnit.on('AdImpression', function () {
                playercore.log.trace('<VPAIDIntegrator Event>', 'AdImpression');

                player.trigger(DEFAULT$4.EVENT.VPAID_AD_IMPRESSION);
                tracker.trackImpressions();
            });

            adUnit.on('AdStarted', function () {
                playercore.log.trace('<VPAIDIntegrator Event>', 'AdStarted');

                player.trigger(DEFAULT$4.EVENT.VPAID_AD_STARTED);
                tracker.trackCreativeView();
                notifyPlayToPlayer();
            });

            adUnit.on('AdVideoStart', function () {
                playercore.log.trace('<VPAIDIntegrator Event>', 'AdVideoStart');

                player.trigger(DEFAULT$4.EVENT.VPAID_AD_VIDEO_START);
                tracker.trackStart();
                notifyPlayToPlayer();
            });

            adUnit.on('AdPlaying', function () {
                playercore.log.trace('<VPAIDIntegrator Event>', 'AdPlaying');

                player.trigger(DEFAULT$4.EVENT.VPAID_AD_PLAYING);
                tracker.trackResume();
                notifyPlayToPlayer();
            });

            adUnit.on('AdPaused', function () {
                playercore.log.trace('<VPAIDIntegrator Event>', 'AdPaused');

                player.trigger(DEFAULT$4.EVENT.VPAID_AD_PAUSED);
                player.trigger(DEFAULT$4.EVENT.AD_PAUSE_AD);
                tracker.trackPause();
                notifyPauseToPlayer();
            });

            function notifyPlayToPlayer() {
                if (self.isPaused()) {
                    self.setState({
                        paused: false
                    });
                }
                player.trigger('play');
            }

            function notifyPauseToPlayer() {
                self.setState({
                    paused: true
                });
                player.trigger('pause');
            }

            adUnit.on('AdVideoFirstQuartile', function () {
                playercore.log.trace('<VPAIDIntegrator Event>', 'AdVideoFirstQuartile');

                player.trigger(DEFAULT$4.EVENT.VPAID_AD_VIDEO_FIRST_QUARTILE);
                tracker.trackFirstQuartile();
            });

            adUnit.on('AdVideoMidpoint', function () {
                playercore.log.trace('<VPAIDIntegrator Event>', 'AdVideoMidpoint');

                player.trigger(DEFAULT$4.EVENT.VPAID_AD_VIDEO_MID_POINT);
                tracker.trackMidpoint();
            });

            adUnit.on('AdVideoThirdQuartile', function () {
                playercore.log.trace('<VPAIDIntegrator Event>', 'AdVideoThirdQuartile');

                player.trigger(DEFAULT$4.EVENT.VPAID_AD_VIDEO_THIRD_QUARTILE);
                tracker.trackThirdQuartile();
            });

            adUnit.on('AdVideoComplete', function () {
                playercore.log.trace('<VPAIDIntegrator Event>', 'AdVideoComplete');

                player.trigger(DEFAULT$4.EVENT.VPAID_AD_VIDEO_COMPLETE);
                tracker.trackComplete();
            });

            adUnit.on('AdClickThru', function (data) {
                playercore.log.trace('<VPAIDIntegrator Event>', 'AdClickThru');

                player.trigger(DEFAULT$4.EVENT.VPAID_AD_CLICK_THRU);
                var url = data.url;
                var playerHandles = data.playerHandles;
                var clickThruUrl = isNotEmptyString(url) ? url : generateClickThroughURL(vastResponse.clickThrough);
                //var clickThruUrl = utilities.isNotEmptyString(url) ? url : null;

                tracker.trackClick();
                if (playerHandles && clickThruUrl) {
                    window.open(clickThruUrl, '_blank');
                }

                function generateClickThroughURL(clickThroughMacro) {
                    var variables = {
                        //ASSETURI: adUnit.options.src,
                        CONTENTPLAYHEAD: 0 //In VPAID there is no method to know the current time from the adUnit
                    };

                    return clickThroughMacro ? VastUtil.parseURLMacro(clickThroughMacro, variables) : null;
                }
            });

            adUnit.on('AdUserAcceptInvitation', function () {
                playercore.log.trace('<VPAIDIntegrator Event>', 'AdUserAcceptInvitation');

                player.trigger(DEFAULT$4.EVENT.VPAID_AD_USER_ACCEPT_INVITATION);
                tracker.trackAcceptInvitation();
                tracker.trackAcceptInvitationLinear();
            });

            adUnit.on('AdUserClose', function () {
                playercore.log.trace('<VPAIDIntegrator Event>', 'AdUserClose');

                player.trigger(DEFAULT$4.EVENT.VPAID_AD_USER_CLOSE);
                tracker.trackClose();
                tracker.trackCloseLinear();
            });

            adUnit.on('AdUserMinimize', function () {
                playercore.log.trace('<VPAIDIntegrator Event>', 'AdUserMinimize');

                player.trigger(DEFAULT$4.EVENT.VPAID_AD_USER_MINIMIZE);
                tracker.trackCollapse();
            });

            adUnit.on('AdError', function () {
                playercore.log.trace('<VPAIDIntegrator Event>', 'AdError');

                player.trigger(DEFAULT$4.EVENT.VPAID_AD_ERROR);
                //NOTE: we track errors code 901, as noted in VAST 3.0
                tracker.trackErrorWithCode(901);
            });

            adUnit.on('AdVolumeChange', function () {
                playercore.log.trace('<VPAIDIntegrator Event>', 'AdVolumeChange');

                player.trigger(DEFAULT$4.EVENT.VPAID_AD_VOLUME_CHANGE);
                adUnit.getAdVolume(function (error$$1, currentVolume) {
                    if (currentVolume === 0) {
                        tracker.trackMute();
                    }

                    if (currentVolume > 0) {
                        tracker.trackUnmute();
                    }
                });
            });

            adUnit.on('AdExpandedChange', function () {
                playercore.log.trace('< VPAIDIntegrator Event > ', 'AdExpandedChange');
                adUnit.getAdExpanded(function (error$$1, expandAd) {
                    if (expandAd) {
                        tracker.trackExpand();
                    } else {
                        tracker.trackCollapse();
                    }
                });
            });

            var updateViewSizeThrottled = throttle(this._resizeAd, 100);
            var autoResize = this.props.autoResize;


            if (autoResize) {
                Dom.addEventListener(window, 'resize', updateViewSizeThrottled);
                Dom.addEventListener(window, 'orientationchange', updateViewSizeThrottled);
            }

            player.on('vast.resize', updateViewSizeThrottled);
            player.on('vpaid.pauseAd', pauseAdUnit);
            player.on('vpaid.resumeAd', resumeAdUnit);
            player.one(DEFAULT$4.EVENT.VPAID_AD_STARTED, updateViewSizeThrottled);
            player.one(DEFAULT$4.EVENT.VPAID_AD_IMPRESSION, updateViewSizeThrottled);

            player.one(DEFAULT$4.EVENT.AD_END, function () {
                player.off('vast.resize', updateViewSizeThrottled);
                player.off('vpaid.pauseAd', pauseAdUnit);
                player.off('vpaid.resumeAd', resumeAdUnit);
                player.off(DEFAULT$4.EVENT.VPAID_AD_STARTED, updateViewSizeThrottled);
                player.off(DEFAULT$4.EVENT.VPAID_AD_IMPRESSION, updateViewSizeThrottled);

                if (autoResize) {
                    Dom.removeEventListener(window, 'resize', updateViewSizeThrottled);
                    Dom.removeEventListener(window, 'orientationchange', updateViewSizeThrottled);
                }
            });

            /*** Local Functions ***/
            function pauseAdUnit() {
                adUnit.pauseAd(noop);
            }

            function resumeAdUnit() {
                adUnit.resumeAd(noop);
            }
        }
    }, {
        key: '_addSkipButton',
        value: function _addSkipButton() {}
    }, {
        key: '_addMuteButton',
        value: function _addMuteButton() {}
    }, {
        key: '_linkPlayerControls',
        value: function _linkPlayerControls() {}
    }, {
        key: '_startAd',
        value: function _startAd() {
            playercore.log.debug('<VPAIDIntegrator._startAd>');
            var player = this.props.player;
            var adUnit = this.state.adUnit;

            this.containerEl.style.display = '';

            return new _Promise(function (resolve, reject) {
                adUnit.startAd(function (error$$1) {
                    if (error$$1) {
                        playercore.log.debug('<VPAIDIntegrator._startAd> error: ', error$$1);
                        reject(error$$1);
                        return;
                    }

                    playercore.log.debug('<VPAIDIntegrator._startAd> success');
                    player.trigger(DEFAULT$4.EVENT.VPAID_AD_START);
                    resolve();
                });
            });
        }
    }, {
        key: '_finishPlaying',
        value: function _finishPlaying() {
            playercore.log.debug('<VPAIDIntegrator._finishPlaying>');

            var self = this;
            var player = this.props.player;
            var adUnit = this.state.adUnit;


            return new _Promise(function (resolve, reject) {

                function adStopped(error$$1) {
                    var ended = self.state.ended;


                    if (ended) {
                        return;
                    }

                    player.off('vpaid-skip-ad-error');

                    adUnit.off('AdStopped');
                    adUnit.off('AdVideoComplete');
                    adUnit.off('AdError');

                    self.setState({
                        ended: true
                    });

                    player.trigger('vpaid:AdEnd');

                    if (error$$1) {
                        return reject(error$$1);
                    }
                    resolve();
                }

                adUnit.on('AdStopped', function () {
                    adStopped();
                });

                adUnit.on('AdVideoComplete', function () {
                    adStopped();
                });

                adUnit.on('AdError', function (error$$1) {
                    adStopped(error.VPAID_INTEGRATOR_ERROR_WHILE_WAITING_FINISH.extendsWithData({
                        error: error$$1
                    }));
                });

                player.one('vpaid-skip-ad-error', function (evt, error$$1) {
                    adStopped(error$$1);
                });
            });
        }
    }, {
        key: '_createVPAIDAdUnitWrapper',
        value: function _createVPAIDAdUnitWrapper(adUnit, src, responseTimeout) {
            var player = this.props.player;

            return new VPAIDAdUnitWrapper({
                player: player,
                adUnit: adUnit,
                src: src,
                responseTimeout: responseTimeout
            });
        }
    }, {
        key: '_createVASTTracker',
        value: function _createVASTTracker() {
            var _state6 = this.state,
                tech = _state6.tech,
                vastResponse = _state6.vastResponse;

            return new VASTTracker(tech.mediaFile.src, vastResponse);
        }
    }, {
        key: '_resizeAd',
        value: function _resizeAd() {
            var player = this.props.player;
            var adUnit = this.state.adUnit;

            var VIEW_MODE = this.VIEW_MODE;

            var tech = player.el().querySelector('.vjs-tech');
            // let videoEl_ = this.videoEl;
            var dimension = Dom.getDimension(tech);

            var MODE = player.isFullscreen() ? VIEW_MODE.FULLSCREEN : VIEW_MODE.NORMAL;
            adUnit.resizeAd(dimension.width, dimension.height, MODE, this._logError);

            playercore.log.info('resizeAd', 'width:', dimension.width, 'height:', dimension.height);
        }
    }, {
        key: '_logError',
        value: function _logError(error$$1) {
            if (error$$1) {
                playercore.log.error('ERROR: ' + error$$1.message, error$$1);
            }
        }
    }, {
        key: 'expandAd',
        value: function expandAd() {
            var player = this.props.player;
            var adUnit = this.state.adUnit;


            if (!player) {
                return;
            }

            adUnit.expandAd(function () {
                //ignore
            });
        }
    }, {
        key: 'collapseAd',
        value: function collapseAd() {
            var player = this.props.player;
            var adUnit = this.state.adUnit;


            if (!player) {
                return;
            }

            adUnit.collapseAd(function () {
                //ignore
            });
        }
    }, {
        key: '_trackError',
        value: function _trackError(error$$1) {
            var vastResponse = this.state.vastResponse;

            VastUtil.track(vastResponse.errorURLMacros, { ERRORCODE: error$$1.code || 901 });
        }
    }]);

    return VPAIDIntegrator;
}(VCPlayerObject$1), _class2$2.defaultProps = {
    responseTimeout: 5000,
    VPAID_VERSION: '2.0',
    autoResize: true
}, _temp$8), (_applyDecoratedDescriptor$2(_class$8.prototype, '_handleAdEnd', [playercore.autobind], _Object$getOwnPropertyDescriptor(_class$8.prototype, '_handleAdEnd'), _class$8.prototype), _applyDecoratedDescriptor$2(_class$8.prototype, '_resizeAd', [playercore.autobind], _Object$getOwnPropertyDescriptor(_class$8.prototype, '_resizeAd'), _class$8.prototype), _applyDecoratedDescriptor$2(_class$8.prototype, '_logError', [playercore.autobind], _Object$getOwnPropertyDescriptor(_class$8.prototype, '_logError'), _class$8.prototype)), _class$8);

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * IMA SDK integration plugin for Video.js. For more information see
 * https://www.github.com/googleads/videojs-ima
 */

/*eslint indent: ["error", 2]*/

/**
  * Implementation of the IMA SDK for the plugin.
  *
  * @param {Object} controller Reference to the parent controller.
  *
  * @constructor
  * @struct
  * @final
  */
var SdkImpl = function SdkImpl(controller) {
  /**
   * Plugin controller.
   */
  this.controller = controller;

  /**
   * IMA SDK AdDisplayContainer.
   */
  this.adDisplayContainer = null;

  /**
   * True if the AdDisplayContainer has been initialized. False otherwise.
   */
  this.adDisplayContainerInitialized = false;

  /**
   * IMA SDK AdsLoader
   */
  this.adsLoader = null;

  /**
   * IMA SDK AdsManager
   */
  this.adsManager = null;

  /**
   * IMA SDK AdsRenderingSettings.
   */
  this.adsRenderingSettings = null;

  /**
   * Ad tag URL. Should return VAST, VMAP, or ad rules.
   */
  this.adTagUrl = null;

  /**
   * VAST, VMAP, or ad rules response. Used in lieu of fetching a response
   * from an ad tag URL.
   */
  this.adsResponse = null;

  /**
   * Current IMA SDK Ad.
   */
  this.currentAd = null;

  /**
   * Timer used to track ad progress.
   */
  this.adTrackingTimer = null;

  /**
   * True if ALL_ADS_COMPLETED has fired, false until then.
   */
  this.allAdsCompleted = false;

  /**
   * True if ads are currently displayed, false otherwise.
   * True regardless of ad pause state if an ad is currently being displayed.
   */
  this.adsActive = false;

  /**
   * True if ad is currently playing, false if ad is paused or ads are not
   * currently displayed.
   */
  this.adPlaying = false;

  /**
   * True if the ad is muted, false otherwise.
   */
  this.adMuted = false;

  /**
   * Listener to be called to trigger manual ad break playback.
   */
  this.adBreakReadyListener = undefined;

  /**
   * Tracks whether or not we have already called adsLoader.contentComplete().
   */
  this.contentCompleteCalled = false;

  /**
   * Stores the dimensions for the ads manager.
   */
  this.adsManagerDimensions = {
    width: 0,
    height: 0
  };

  /**
   * Boolean flag to enable manual ad break playback.
   */
  this.autoPlayAdBreaks = true;
  if (this.controller.getSettings().autoPlayAdBreaks === false) {
    this.autoPlayAdBreaks = false;
  }

  // Set SDK settings from plugin settings.
  if (this.controller.getSettings().locale) {
    /* eslint no-undef: 'error' */
    /* global google */
    google.ima.settings.setLocale(this.controller.getSettings().locale);
  }
  if (this.controller.getSettings().disableFlashAds) {
    google.ima.settings.setDisableFlashAds(this.controller.getSettings().disableFlashAds);
  }
  if (this.controller.getSettings().disableCustomPlaybackForIOS10Plus) {
    google.ima.settings.setDisableCustomPlaybackForIOS10Plus(this.controller.getSettings().disableCustomPlaybackForIOS10Plus);
  }

  this.initAdObjects();

  if (this.controller.getSettings().adTagUrl || this.controller.getSettings().adsResponse) {
    this.requestAds();
  }
};

/**
 * Creates and initializes the IMA SDK objects.
 */
SdkImpl.prototype.initAdObjects = function () {
  this.adDisplayContainer = new google.ima.AdDisplayContainer(this.controller.getAdContainerDiv(), this.controller.getContentPlayer());

  this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer);

  this.adsLoader.getSettings().setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED);
  if (this.controller.getSettings().vpaidAllowed == false) {
    this.adsLoader.getSettings().setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.DISABLED);
  }
  if (this.controller.getSettings().vpaidMode) {
    this.adsLoader.getSettings().setVpaidMode(this.controller.getSettings().vpaidMode);
  }

  if (this.controller.getSettings().locale) {
    this.adsLoader.getSettings().setLocale(this.controller.getSettings().locale);
  }

  if (this.controller.getSettings().numRedirects) {
    this.adsLoader.getSettings().setNumRedirects(this.controller.getSettings().numRedirects);
  }

  this.adsLoader.getSettings().setPlayerType('vcplayer');
  this.adsLoader.getSettings().setPlayerVersion('2.0');
  this.adsLoader.getSettings().setAutoPlayAdBreaks(this.autoPlayAdBreaks);

  this.adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this.onAdsManagerLoaded.bind(this), false);
  this.adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdsLoaderError.bind(this), false);
};

/**
 * Creates the AdsRequest and request ads through the AdsLoader.
 */
SdkImpl.prototype.requestAds = function () {
  var adsRequest = new google.ima.AdsRequest();
  if (this.controller.getSettings().adTagUrl) {
    adsRequest.adTagUrl = this.controller.getSettings().adTagUrl;
  } else {
    adsRequest.adsResponse = this.controller.getSettings().adsResponse;
  }
  if (this.controller.getSettings().forceNonLinearFullSlot) {
    adsRequest.forceNonLinearFullSlot = true;
  }

  adsRequest.linearAdSlotWidth = this.controller.getPlayerWidth();
  adsRequest.linearAdSlotHeight = this.controller.getPlayerHeight();
  adsRequest.nonLinearAdSlotWidth = this.controller.getSettings().nonLinearWidth || this.controller.getPlayerWidth();
  adsRequest.nonLinearAdSlotHeight = this.controller.getSettings().nonLinearHeight || this.controller.getPlayerHeight();
  adsRequest.setAdWillAutoPlay(this.controller.adsWillAutoplay());
  adsRequest.setAdWillPlayMuted(this.controller.adsWillPlayMuted());

  this.adsLoader.requestAds(adsRequest);
};

/**
 * Listener for the ADS_MANAGER_LOADED event. Creates the AdsManager,
 * sets up event listeners, and triggers the 'adsready' event for
 * videojs-ads-contrib.
 *
 * @param {google.ima.AdsManagerLoadedEvent} adsManagerLoadedEvent Fired when
 *     the AdsManager loads.
 */
SdkImpl.prototype.onAdsManagerLoaded = function (adsManagerLoadedEvent) {
  this.createAdsRenderingSettings();

  this.adsManager = adsManagerLoadedEvent.getAdsManager(this.controller.getContentPlayheadTracker(), this.adsRenderingSettings);

  this.adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdError.bind(this));
  this.adsManager.addEventListener(google.ima.AdEvent.Type.AD_BREAK_READY, this.onAdBreakReady.bind(this));
  this.adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, this.onContentPauseRequested.bind(this));
  this.adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, this.onContentResumeRequested.bind(this));
  this.adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, this.onAllAdsCompleted.bind(this));

  this.adsManager.addEventListener(google.ima.AdEvent.Type.LOADED, this.onAdLoaded.bind(this));
  this.adsManager.addEventListener(google.ima.AdEvent.Type.STARTED, this.onAdStarted.bind(this));
  this.adsManager.addEventListener(google.ima.AdEvent.Type.CLICK, this.onAdPaused.bind(this));
  this.adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE, this.onAdComplete.bind(this));
  this.adsManager.addEventListener(google.ima.AdEvent.Type.SKIPPED, this.onAdComplete.bind(this));

  if (this.controller.getIsMobile()) {
    // Show/hide controls on pause and resume (triggered by tap).
    this.adsManager.addEventListener(google.ima.AdEvent.Type.PAUSED, this.onAdPaused.bind(this));
    this.adsManager.addEventListener(google.ima.AdEvent.Type.RESUMED, this.onAdResumed.bind(this));
  }

  if (!this.autoPlayAdBreaks) {
    this.initAdsManager();
  }

  this.controller.onAdsReady();

  if (this.controller.getSettings().adsManagerLoadedCallback) {
    this.controller.getSettings().adsManagerLoadedCallback();
  }
};

/**
 * Listener for errors fired by the AdsLoader.
 * @param {google.ima.AdErrorEvent} event The error event thrown by the
 *     AdsLoader. See
 *     https://developers.google.com/interactive-media-ads/docs/sdks/html5/v3/apis#ima.AdError.Type
 */
SdkImpl.prototype.onAdsLoaderError = function (event) {
  window.console.warn('AdsLoader error: ' + event.getError());
  this.controller.onErrorLoadingAds(event);
  if (this.adsManager) {
    this.adsManager.destroy();
  }
};

/**
 * Initialize the ads manager.
 */
SdkImpl.prototype.initAdsManager = function () {
  try {
    var initWidth = this.controller.getPlayerWidth();
    var initHeight = this.controller.getPlayerHeight();
    this.adsManagerDimensions.width = initWidth;
    this.adsManagerDimensions.height = initHeight;
    this.adsManager.init(initWidth, initHeight, google.ima.ViewMode.NORMAL);
    this.adsManager.setVolume(this.controller.getPlayerVolume());
    if (!this.adDisplayContainerInitialized) {
      this.adDisplayContainer.initialize();
      this.adDisplayContainer.initialized = true;
    }
  } catch (adError) {
    this.onAdError(adError);
  }
};

/**
 * Create AdsRenderingSettings for the IMA SDK.
 */
SdkImpl.prototype.createAdsRenderingSettings = function () {
  this.adsRenderingSettings = new google.ima.AdsRenderingSettings();
  this.adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
  if (this.controller.getSettings().adsRenderingSettings) {
    for (var setting in this.controller.getSettings().adsRenderingSettings) {
      if (setting !== '') {
        this.adsRenderingSettings[setting] = this.controller.getSettings().adsRenderingSettings[setting];
      }
    }
  }
};

/**
 * Listener for errors thrown by the AdsManager.
 * @param {google.ima.AdErrorEvent} adErrorEvent The error event thrown by
 *     the AdsManager.
 */
SdkImpl.prototype.onAdError = function (adErrorEvent) {
  var errorMessage = adErrorEvent.getError !== undefined ? adErrorEvent.getError() : adErrorEvent.stack;
  window.console.warn('Ad error: ' + errorMessage);
  this.adsManager.destroy();
  this.controller.onAdError(adErrorEvent);
};

/**
 * Listener for AD_BREAK_READY. Passes event on to publisher's listener.
 * @param {google.ima.AdEvent} adEvent AdEvent thrown by the AdsManager.
 */
SdkImpl.prototype.onAdBreakReady = function (adEvent) {
  this.adBreakReadyListener(adEvent);
};

/**
 * Pauses the content video and displays the ad container so ads can play.
 * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the AdsManager.
 */
SdkImpl.prototype.onContentPauseRequested = function (adEvent) {
  this.adsActive = true;
  this.adPlaying = true;
  this.controller.onAdBreakStart(adEvent);
};

/**
 * Resumes content video and hides the ad container.
 * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the AdsManager.
 */
SdkImpl.prototype.onContentResumeRequested = function () {
  this.adsActive = false;
  this.adPlaying = false;
  this.controller.onAdBreakEnd();
  // Hide controls in case of future non-linear ads. They'll be unhidden in
  // content_pause_requested.
};

/**
 * Records that ads have completed and calls contentAndAdsEndedListeners
 * if content is also complete.
 * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the AdsManager.
 */
SdkImpl.prototype.onAllAdsCompleted = function () {
  this.allAdsCompleted = true;
  this.controller.onAllAdsCompleted();
};

/**
 * Starts the content video when a non-linear ad is loaded.
 * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the AdsManager.
 */
SdkImpl.prototype.onAdLoaded = function (adEvent) {
  if (!adEvent.getAd().isLinear()) {
    this.controller.onNonLinearAdLoad();
    this.controller.playContent();
  }
};

/**
 * Starts the interval timer to check the current ad time when an ad starts
 * playing.
 * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the AdsManager.
 */
SdkImpl.prototype.onAdStarted = function (adEvent) {
  this.currentAd = adEvent.getAd();
  if (this.currentAd.isLinear()) {
    this.adTrackingTimer = setInterval(this.onAdPlayheadTrackerInterval.bind(this), 250);
    this.controller.onLinearAdStart();
  } else {
    this.controller.onNonLinearAdStart();
  }
};

/**
 * Handles an ad click. Puts the player UI in a paused state.
 */
SdkImpl.prototype.onAdPaused = function () {
  this.controller.onAdsPaused();
};

/**
 * Syncs controls when an ad resumes.
 * @param {google.ima.AdEvent} adEvent The AdEvent thrown by the AdsManager.
 */
SdkImpl.prototype.onAdResumed = function () {
  this.controller.onAdsResumed();
};

/**
 * Clears the interval timer for current ad time when an ad completes.
 */
SdkImpl.prototype.onAdComplete = function () {
  if (this.currentAd.isLinear()) {
    clearInterval(this.adTrackingTimer);
  }
};

/**
 * Gets the current time and duration of the ad and calls the method to
 * update the ad UI.
 */
SdkImpl.prototype.onAdPlayheadTrackerInterval = function () {
  var remainingTime = this.adsManager.getRemainingTime();
  var duration = this.currentAd.getDuration();
  var currentTime = duration - remainingTime;
  currentTime = currentTime > 0 ? currentTime : 0;
  var totalAds = 0;
  var adPosition = void 0;
  if (this.currentAd.getAdPodInfo()) {
    adPosition = this.currentAd.getAdPodInfo().getAdPosition();
    totalAds = this.currentAd.getAdPodInfo().getTotalAds();
  }

  this.controller.onAdPlayheadUpdated(currentTime, remainingTime, duration, adPosition, totalAds);
};

/**
 * Called by the player wrapper when content completes.
 */
SdkImpl.prototype.onContentComplete = function () {
  if (this.adsLoader) {
    this.adsLoader.contentComplete();
    this.contentCompleteCalled = true;
  }

  if (this.adsManager && this.adsManager.getCuePoints() && !this.adsManager.getCuePoints().includes(-1)) {
    this.controller.onNoPostroll();
  }

  if (this.allAdsCompleted) {
    this.controller.onContentAndAdsCompleted();
  }
};

/**
 * Called when the player is disposed.
 */
SdkImpl.prototype.onPlayerDisposed = function () {
  if (this.adTrackingTimer) {
    clearInterval(this.adTrackingTimer);
  }
  if (this.adsManager) {
    this.adsManager.destroy();
    this.adsManager = null;
  }
};

SdkImpl.prototype.onPlayerReadyForPreroll = function () {
  if (this.autoPlayAdBreaks) {
    this.initAdsManager();
    try {
      this.controller.showAdContainer();
      // Sync ad volume with content volume.
      this.adsManager.setVolume(this.controller.getPlayerVolume());
      this.adsManager.start();
    } catch (adError) {
      this.onAdError(adError);
    }
  }
};

SdkImpl.prototype.onPlayerEnterFullscreen = function () {
  if (this.adsManager) {
    this.adsManager.resize(window.screen.width, window.screen.height, google.ima.ViewMode.FULLSCREEN);
  }
};

SdkImpl.prototype.onPlayerExitFullscreen = function () {
  if (this.adsManager) {
    this.adsManager.resize(this.controller.getPlayerWidth(), this.controller.getPlayerHeight(), google.ima.ViewMode.NORMAL);
  }
};

/**
 * Called when the player volume changes.
 *
 * @param {number} volume The new player volume.
 */
SdkImpl.prototype.onPlayerVolumeChanged = function (volume) {
  if (this.adsManager) {
    this.adsManager.setVolume(volume);
  }

  if (volume == 0) {
    this.adMuted = true;
  } else {
    this.adMuted = false;
  }
};

/**
 * Called when the player wrapper detects that the player has been resized.
 *
 * @param {number} width The post-resize width of the player.
 * @param {number} height The post-resize height of the player.
 */
SdkImpl.prototype.onPlayerResize = function (width, height) {
  if (this.adsManager) {
    this.adsManagerDimensions.width = width;
    this.adsManagerDimensions.height = height;
    /* global google */
    /* eslint no-undef: 'error' */
    this.adsManager.resize(width, height, google.ima.ViewMode.NORMAL);
  }
};

/**
 * @return {Object} The current ad.
 */
SdkImpl.prototype.getCurrentAd = function () {
  return this.currentAd;
};

/**
 * Listener JSDoc for ESLint. This listener can be passed to
 * setAdBreakReadyListener.
 * @callback listener
 */

/**
 * Sets the listener to be called to trigger manual ad break playback.
 * @param {listener} listener The listener to be called to trigger manual ad
 *     break playback.
 */
SdkImpl.prototype.setAdBreakReadyListener = function (listener) {
  this.adBreakReadyListener = listener;
};

/**
 * @return {boolean} True if an ad is currently playing. False otherwise.
 */
SdkImpl.prototype.isAdPlaying = function () {
  return this.adPlaying;
};

/**
 * @return {boolean} True if an ad is currently playing. False otherwise.
 */
SdkImpl.prototype.isAdMuted = function () {
  return this.adMuted;
};

/**
 * Pause ads.
 */
SdkImpl.prototype.pauseAds = function () {
  this.adsManager.pause();
  this.adPlaying = false;
};

/**
 * Resume ads.
 */
SdkImpl.prototype.resumeAds = function () {
  this.adsManager.resume();
  this.adPlaying = true;
};

/**
 * Unmute ads.
 */
SdkImpl.prototype.unmute = function () {
  this.adsManager.setVolume(1);
  this.adMuted = false;
};

/**
 * Mute ads.
 */
SdkImpl.prototype.mute = function () {
  this.adsManager.setVolume(0);
  this.adMuted = true;
};

/**
 * Set the volume of the ads. 0-1.
 *
 * @param {number} volume The new volume.
 */
SdkImpl.prototype.setVolume = function (volume) {
  this.adsManager.setVolume(volume);
  if (volume == 0) {
    this.adMuted = true;
  } else {
    this.adMuted = false;
  }
};

/**
 * Initializes the AdDisplayContainer. On mobile, this must be done as a
 * result of user action.
 */
SdkImpl.prototype.initializeAdDisplayContainer = function () {
  this.adDisplayContainerInitialized = true;
  this.adDisplayContainer.initialize();
};

/**
 * Called by publishers in manual ad break playback mode to start an ad
 * break.
 */
SdkImpl.prototype.playAdBreak = function () {
  if (!this.autoPlayAdBreaks) {
    this.controller.showAdContainer();
    // Sync ad volume with content volume.
    this.adsManager.setVolume(this.controller.getPlayerVolume());
    this.adsManager.start();
  }
};

/**
 * Callback JSDoc for ESLint. This callback can be passed to addEventListener.
 * @callback callback
 */

/**
 * Ads an EventListener to the AdsManager. For a list of available events,
 * see
 * https://developers.google.com/interactive-media-ads/docs/sdks/html5/v3/apis#ima.AdEvent.Type
 * @param {google.ima.AdEvent.Type} event The AdEvent.Type for which to
 *     listen.
 * @param {callback} callback The method to call when the event is fired.
 */
SdkImpl.prototype.addEventListener = function (event, callback) {
  if (this.adsManager) {
    this.adsManager.addEventListener(event, callback);
  }
};

SdkImpl.prototype.removeEventListener = function (event, callback) {
  if (this.adsManager) {
    this.adsManager.removeEventListener(event, callback);
  }
};

/**
 * Returns the instance of the AdsManager.
 * @return {google.ima.AdsManager} The AdsManager being used by the plugin.
 */
SdkImpl.prototype.getAdsManager = function () {
  return this.adsManager;
};

/**
 * Reset the SDK implementation.
 */
SdkImpl.prototype.reset = function () {
  this.adsActive = false;
  this.adPlaying = false;
  if (this.adTrackingTimer) {
    // If this is called while an ad is playing, stop trying to get that
    // ad's current time.
    clearInterval(this.adTrackingTimer);
  }
  if (this.adsManager) {
    this.adsManager.destroy();
    this.adsManager = null;
  }
  if (this.adsLoader && !this.contentCompleteCalled) {
    this.adsLoader.contentComplete();
  }
  this.contentCompleteCalled = false;
  this.allAdsCompleted = false;
};

var _class$12;
var _temp$11;

var Controller = (_temp$11 = _class$12 = function (_VCPlayerObject) {
    _inherits(Controller, _VCPlayerObject);

    /**
     * Định nghĩa kiểu của props
     * @type {Object}
     */
    function Controller(props) {
        _classCallCheck(this, Controller);

        var _this = _possibleConstructorReturn(this, (Controller.__proto__ || _Object$getPrototypeOf(Controller)).call(this, props));

        _this.settings = {
            //autoPlayAdBreaks: false,
            locale: null,
            disableFlashAds: true,
            disableCustomPlaybackForIOS10Plus: true,
            adTagUrl: null,
            adsResponse: null,
            vpaidAllowed: true,
            vpaidMode: true,
            numRedirects: 5,
            forceNonLinearFullSlot: false,
            nonLinearWidth: null,
            nonLinearHeight: null,
            adsManagerLoadedCallback: null,
            adsRenderingSettings: null,

            debug: false,
            timeout: 5000,
            prerollTimeout: 1000,
            adLabel: 'Advertisement',
            showControlsForJSAds: true,

            AdContainer: null,
            videoEl: null
        };

        _this.settings = _extends$1({}, _this.settings, _this.props);

        _this.sdkImpl = new SdkImpl(_this);
        return _this;
    }

    _createClass(Controller, [{
        key: 'requestAds',
        value: function requestAds() {
            this.sdkImpl.requestAds();
        }
    }, {
        key: 'onPlayerReadyForPreroll',
        value: function onPlayerReadyForPreroll() {
            this.sdkImpl.onPlayerReadyForPreroll();
        }
    }, {
        key: 'initializeAdDisplayContainer',
        value: function initializeAdDisplayContainer() {
            this.sdkImpl.initializeAdDisplayContainer();
        }
    }, {
        key: 'playAdBreak',
        value: function playAdBreak() {
            this.sdkImpl.playAdBreak();
        }
    }, {
        key: 'addEventListener',
        value: function addEventListener(event, callback) {
            this.sdkImpl.addEventListener(event, callback);
        }
    }, {
        key: 'removeEventListener',
        value: function removeEventListener(event, callback) {
            this.sdkImpl.removeEventListener(event, callback);
        }
    }, {
        key: 'getAdsManager',
        value: function getAdsManager() {
            return this.sdkImpl.getAdsManager();
        }

        ////////////////////////////

    }, {
        key: 'getSettings',
        value: function getSettings() {
            return this.settings;
        }
    }, {
        key: 'getAdContainerDiv',
        value: function getAdContainerDiv() {
            return this.settings.AdContainer;
        }
    }, {
        key: 'getContentPlayer',
        value: function getContentPlayer() {
            return this.settings.videoEl;
        }
    }, {
        key: 'getPlayerWidth',
        value: function getPlayerWidth() {
            var player = this.props.player;

            var tech = player.el().querySelector('.vjs-tech');
            var dimension = Dom.getDimension(tech);
            return dimension.width;
        }
    }, {
        key: 'getPlayerHeight',
        value: function getPlayerHeight() {
            var player = this.props.player;

            var tech = player.el().querySelector('.vjs-tech');
            var dimension = Dom.getDimension(tech);
            return dimension.height;
        }
    }, {
        key: 'adsWillAutoplay',
        value: function adsWillAutoplay() {}
    }, {
        key: 'adsWillPlayMuted',
        value: function adsWillPlayMuted() {}
    }, {
        key: 'getContentPlayheadTracker',
        value: function getContentPlayheadTracker() {
            return {
                currentTime: 0,
                previousTime: 0,
                seeking: false,
                duration: 0
            };
        }
    }, {
        key: 'getIsMobile',
        value: function getIsMobile() {
            return playercore.agent.isMobile;
        }

        /**
         * abstract
         * @return {[type]} [description]
         */

    }, {
        key: 'onAdsReady',
        value: function onAdsReady() {
            playercore.log.debug('<ImaController.onAdsReady>');
        }

        /**
         * abstract
         * @return {[type]} [description]
         */

    }, {
        key: 'onErrorLoadingAds',
        value: function onErrorLoadingAds() {
            playercore.log.debug('<ImaController.onErrorLoadingAds>');
        }
    }, {
        key: 'getPlayerVolume',
        value: function getPlayerVolume() {
            return 1;
        }
    }, {
        key: 'onAdError',
        value: function onAdError(e) {
            playercore.log.debug('<ImaController.onAdError>', e);
        }
    }, {
        key: 'onAdBreakStart',
        value: function onAdBreakStart() {
            playercore.log.debug('<ImaController.onAdBreakStart>');
        }
    }, {
        key: 'onAdBreakEnd',
        value: function onAdBreakEnd() {
            playercore.log.debug('<ImaController.onAdBreakEnd>');
        }
    }, {
        key: 'onAllAdsCompleted',
        value: function onAllAdsCompleted() {
            playercore.log.debug('<ImaController.onAllAdsCompleted>');
        }
    }, {
        key: 'onNonLinearAdLoad',
        value: function onNonLinearAdLoad() {
            playercore.log.debug('<ImaController.onNonLinearAdLoad>');
        }
    }, {
        key: 'onLinearAdStart',
        value: function onLinearAdStart() {
            playercore.log.debug('<ImaController.onLinearAdStart>');
        }
    }, {
        key: 'onNonLinearAdStart',
        value: function onNonLinearAdStart() {
            playercore.log.debug('<ImaController.onNonLinearAdStart>');
        }
    }, {
        key: 'onAdsPaused',
        value: function onAdsPaused() {
            playercore.log.debug('<ImaController.onAdsPaused>');
        }
    }, {
        key: 'onAdsResumed',
        value: function onAdsResumed() {
            playercore.log.debug('<ImaController.onAdsResumed>');
        }
    }, {
        key: 'onAdPlayheadUpdated',
        value: function onAdPlayheadUpdated() {
            playercore.log.debug('<ImaController.onAdPlayheadUpdated>');
        }
    }, {
        key: 'onContentAndAdsCompleted',
        value: function onContentAndAdsCompleted() {
            playercore.log.debug('<ImaController.onContentAndAdsCompleted>');
        }
    }, {
        key: 'onNoPostroll',
        value: function onNoPostroll() {
            playercore.log.debug('<ImaController.onNoPostroll>');
        }
    }, {
        key: 'showAdContainer',
        value: function showAdContainer() {
            playercore.log.debug('<ImaController.showAdContainer>');
        }
    }, {
        key: 'playContent',
        value: function playContent() {
            playercore.log.debug('<ImaController.playContent>');
        }

        /**
         * Pauses the ad.
         */

    }, {
        key: 'pauseAd',
        value: function pauseAd() {
            this.sdkImpl.pauseAds();
        }

        /**
         * Resumes the ad.
         */

    }, {
        key: 'resumeAd',
        value: function resumeAd() {
            this.sdkImpl.resumeAds();
        }
    }]);

    return Controller;
}(VCPlayerObject$1), _class$12.propTypes = {
    player: playercore.PropTypes.object.isRequired
}, _temp$11);

var _class$11;
var _temp$10;

var ImaAdUnit = (_temp$10 = _class$11 = function (_VCPlayerObject) {
    _inherits(ImaAdUnit, _VCPlayerObject);

    function ImaAdUnit(props) {
        _classCallCheck(this, ImaAdUnit);

        return _possibleConstructorReturn(this, (ImaAdUnit.__proto__ || _Object$getPrototypeOf(ImaAdUnit)).call(this, props));
    }
    /**
     * Định nghĩa kiểu của props
     * @type {Object}
     */


    _createClass(ImaAdUnit, [{
        key: 'loadAdUnit',
        value: function loadAdUnit(AdContainer, videoEl, callback) {
            playercore.log.debug('<ImaAdUnit.loadAdUnit>');
            var controller = this.controller = new Controller(_extends$1({}, this.props, { AdContainer: AdContainer, videoEl: videoEl }));
            controller.onAdsReady = function () {
                playercore.log.debug('<ImaAdUnit.loadAdUnit> success');
                callback();
            };

            controller.onErrorLoadingAds = function (e) {
                playercore.log.debug('<ImaAdUnit.loadAdUnit> error', e);
                callback(e);
            };
        }
    }, {
        key: 'startAd',
        value: function startAd() {
            playercore.log.debug('<ImaAdUnit.startAd>');
            this.controller.onPlayerReadyForPreroll();
        }
    }, {
        key: 'pauseAd',
        value: function pauseAd() {
            this.controller.pauseAd();
        }
    }, {
        key: 'resumeAd',
        value: function resumeAd() {
            this.controller.resumeAd();
        }
    }, {
        key: 'onAdError',
        value: function onAdError(callback) {
            this.controller.onAdError = callback;
        }
    }, {
        key: 'on',
        value: function on(evt, handle) {
            this.controller.addEventListener(evt, handle);
        }
    }, {
        key: 'off',
        value: function off(evt, handle) {
            this.controller.removeEventListener(evt, handle);
        }
    }]);

    return ImaAdUnit;
}(VCPlayerObject$1), _class$11.propTypes = {
    player: playercore.PropTypes.object.isRequired
}, _temp$10);

var _class$10;

function _applyDecoratedDescriptor$3(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

var DEFAULT$5 = playercore.playerconfig.DEFAULT;

/* global google */

if (!window.google && !window.___firstLoadGoogle__) {
    window.___firstLoadGoogle__ = true;
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//imasdk.googleapis.com/js/sdkloader/ima3.js';
    head.appendChild(script);
}

var ImaIntegrator = (_class$10 = function (_VCPlayerObject) {
    _inherits(ImaIntegrator, _VCPlayerObject);

    function ImaIntegrator(props) {
        _classCallCheck(this, ImaIntegrator);

        var _this = _possibleConstructorReturn(this, (ImaIntegrator.__proto__ || _Object$getPrototypeOf(ImaIntegrator)).call(this, props));

        var player = _this.props.player;

        _this.containerEl = _this._createImaContainerEl(player);
        player.one(DEFAULT$5.EVENT.AD_END, _this._handleAdEnd);
        return _this;
    }

    _createClass(ImaIntegrator, [{
        key: '_createImaContainerEl',
        value: function _createImaContainerEl() {
            var player = this.props.player;

            var containerEl = document.createElement('div');
            Dom.addClass(containerEl, 'ima-container');

            player.overlay.append(containerEl);
            return containerEl;
        }
    }, {
        key: '_handleAdEnd',
        value: function _handleAdEnd() {
            playercore.log.debug('<VPAIDIntegrator._handleAdEnd>');
            if (this.containerEl) {
                Dom.remove(this.containerEl);
                this.containerEl = null;
            }
        }
    }, {
        key: 'playAd',
        value: function playAd(vastResponse) {
            var self = this;
            this.setState({
                vastResponse: vastResponse
            });

            return _Promise.resolve().then(function () {
                return self._loadAdUnit();
            }).then(function () {
                return self._setupEvents();
            }).then(function () {
                return self._playAdUnit();
            }).then(function () {
                return self._finishPlaying();
            }).catch(function (e) {
                throw e;
            });
        }
    }, {
        key: 'pauseAd',
        value: function pauseAd() {
            var player = this.props.player;
            var adUnit = this.state.adUnit;

            player.pause(true);

            if (!adUnit) {
                return;
            }
            adUnit.pauseAd();
        }
    }, {
        key: 'resumeAd',
        value: function resumeAd() {
            var adUnit = this.state.adUnit;

            if (!adUnit) {
                return;
            }
            adUnit.resumeAd();
        }
    }, {
        key: '_loadAdUnit',
        value: function _loadAdUnit() {
            var _this2 = this;

            var player = this.props.player;
            var vastResponse = this.state.vastResponse;

            var vjsTechEl = player.el().querySelector('.vjs-tech');
            return new _Promise(function (resolve, reject) {
                var adUnit = new ImaAdUnit(_extends$1({ player: player }, vastResponse));
                adUnit.loadAdUnit(_this2.containerEl, vjsTechEl, function (err) {
                    if (err) {
                        return reject(err);
                    }

                    _this2.setState({ adUnit: adUnit });
                    resolve();
                });
            });
        }
    }, {
        key: '_setupEvents',
        value: function _setupEvents() {
            playercore.log.debug('<ImaIntegrator._setupEvents>');
            var adUnit = this.state.adUnit;
            var player = this.props.player;


            adUnit.on(google.ima.AdEvent.Type.STARTED, function () {
                player.trigger(DEFAULT$5.EVENT.IMA_AD_STARTED);
            });
        }
    }, {
        key: '_playAdUnit',
        value: function _playAdUnit() {
            var adUnit = this.state.adUnit;
            var player = this.props.player;

            adUnit.startAd();
            player.trigger(DEFAULT$5.EVENT.IMA_AD_START);
        }
    }, {
        key: '_finishPlaying',
        value: function _finishPlaying() {
            playercore.log.debug('<ImaIntegrator._finishPlaying>');
            var adUnit = this.state.adUnit;


            return new _Promise(function (resolve, reject) {

                function adStopped(error) {
                    //adUnit.off(google.ima.AdEvent.Type.ALL_ADS_COMPLETED);

                    if (error) {
                        return reject(error);
                    }
                    resolve();
                }

                adUnit.on(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, function () {
                    adStopped();
                });

                adUnit.on(google.ima.AdErrorEvent.Type.AD_ERROR, function (err) {
                    adStopped(err);
                });

                adUnit.onAdError(function (err) {
                    adStopped(err);
                });
            });
        }
    }]);

    return ImaIntegrator;
}(VCPlayerObject$1), (_applyDecoratedDescriptor$3(_class$10.prototype, '_handleAdEnd', [playercore.autobind], _Object$getOwnPropertyDescriptor(_class$10.prototype, '_handleAdEnd'), _class$10.prototype)), _class$10);

'use strict';



var _createProperty = function (object, index, value) {
  if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));
  else object[index] = value;
};

'use strict';









_export(_export.S + _export.F * !_iterDetect(function (iter) {  }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = _toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = core_getIteratorMethod(O);
    var length, result, step, iterator;
    if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = _toLength(O.length);
      for (result = new C(length); length > index; index++) {
        _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

var from$2 = _core.Array.from;

var from = createCommonjsModule(function (module) {
module.exports = { "default": from$2, __esModule: true };
});

unwrapExports(from);

var toConsumableArray = createCommonjsModule(function (module, exports) {
"use strict";

exports.__esModule = true;



var _from2 = _interopRequireDefault(from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};
});

var _toConsumableArray = unwrapExports(toConsumableArray);

var promiseXhr = function promiseXhr(options) {
    var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
    var count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    return new _Promise(function (resolve, reject) {
        playercore__default.xhr(options, function (err, resp, body) {
            if (resp.statusCode === 200) {
                resolve(body);
            } else if (limit && count < limit) {
                ++count;
                promiseXhr(options, limit, count).then(function (value) {
                    resolve(value);
                }).catch(function (err) {
                    reject(err);
                });
            } else {
                reject(err);
            }
        });
    });
};

/*var serialize = function(obj, prefix) {
    var str = [], p;
    for(p in obj) {
        if (obj.hasOwnProperty(p)) {
            var k = prefix ? prefix + '[' + p + ']' : p, v = obj[p];
            str.push((v !== null && typeof v === 'object') ?
                serialize(v, k) :
                encodeURIComponent(k) + '=' + encodeURIComponent(v));
        }
    }
    return str.join('&');
};

function track(url, queries) {
    var _qr = serialize(queries);

    var img = new Image();
    img.src = url + _qr;
}*/

/*function trackgammaplatform(params) {
    track('//lg1.logging.admicro.vn/video_track_err?', params);
}*/

var _class$13;
var _temp$12;

//import { haveQuery } from '../../../util/url';


var VASTClient = (_temp$12 = _class$13 = function (_VCPlayerObject) {
    _inherits(VASTClient, _VCPlayerObject);

    function VASTClient(props) {
        _classCallCheck(this, VASTClient);

        var _this = _possibleConstructorReturn(this, (VASTClient.__proto__ || _Object$getPrototypeOf(VASTClient)).call(this, props));

        _this.isPassBack = false;
        _this.errorURLMacros = [];
        return _this;
    }

    _createClass(VASTClient, [{
        key: '_filterAdChain',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(adChains) {
                var results, err, vastResponse;
                return regenerator.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                results = [];
                                err = void 0;

                                while (adChains.length) {
                                    try {
                                        vastResponse = this._buildVASTResponse(adChains.shift());

                                        results.push(vastResponse);
                                    } catch (e) {
                                        err = e;
                                    }
                                }

                                if (!results.length) {
                                    _context.next = 5;
                                    break;
                                }

                                return _context.abrupt('return', results);

                            case 5:
                                throw err;

                            case 6:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function _filterAdChain(_x) {
                return _ref.apply(this, arguments);
            }

            return _filterAdChain;
        }()
    }, {
        key: 'adgetVASTResponse',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(adTagUrl) {
                var _this2 = this;

                var self;
                return regenerator.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                self = this;
                                return _context2.abrupt('return', _Promise.resolve().then(function () {
                                    return _this2._getVASTAd(adTagUrl);
                                }).then(function (adChains) {
                                    return self._filterAdChain(adChains);
                                }).catch(function (e) {
                                    if (e.ima) {
                                        return [e];
                                    }

                                    throw e;
                                }));

                            case 2:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function adgetVASTResponse(_x2) {
                return _ref2.apply(this, arguments);
            }

            return adgetVASTResponse;
        }()
    }, {
        key: 'getVASTResponse',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(adTagUrl) {
                var p_works, adUrl, i;
                return regenerator.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                if (adTagUrl) {
                                    _context3.next = 2;
                                    break;
                                }

                                throw error.VASTClIENT_MISS_AD_TAG_URL;

                            case 2:
                                //let prefix = haveQuery(adTagUrl) ? '&' : '?';

                                p_works = [];
                                //let adUrl = [adTagUrl, adTagUrl + prefix + 'is_backfill=1'];

                                adUrl = [adTagUrl];

                                for (i in adUrl) {
                                    p_works.push(this.adgetVASTResponse(adUrl[i]));
                                }

                                return _context3.abrupt('return', _Promise.all(p_works.map(function (p) {
                                    return p.catch(function () {
                                        return [];
                                    });
                                })).then(function (items) {
                                    var adChains = [];
                                    //let results = [...items[0], ...items[1]];
                                    var results = [].concat(_toConsumableArray(items[0]));
                                    for (var _i in results) {
                                        if (results[_i].ads) {
                                            adChains.push(results[_i]);
                                        } else if (results[_i].ima) {
                                            return results[_i];
                                        }
                                    }

                                    if (adChains.length) {
                                        return adChains;
                                    }

                                    throw results[0];
                                }));

                            case 6:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getVASTResponse(_x3) {
                return _ref3.apply(this, arguments);
            }

            return getVASTResponse;
        }()

        /**
         * Error: 102, 303 ,301
         */

    }, {
        key: 'validateVASTTree',
        value: function validateVASTTree(vastTree) {
            var vastVersion = xml.attr(vastTree, 'version');
            // let vastTreeStr = JSON.stringify(vastTree);

            if (!vastTree.ad) {
                // Lỗi không có ad trong vast tree
                throw error.ERROR_303;
            }

            if (vastVersion && vastVersion != 3 && vastVersion != 2) {
                // Lỗi không support vast version
                throw error.ERROR_102;
            }

            // if (vastTreeStr.indexOf('vASTAdTagURI') !== -1) {
            //     if (vastTree.ad.wrapper.vASTAdTagURI.keyValue.indexOf('http') === -1) {
            //         throw ERROR.ERROR_301;
            //     }
            // }
        }
    }, {
        key: '_buildVASTResponse',
        value: function _buildVASTResponse(adsChain) {
            var response = new VASTResponse();
            addAdsToResponse(response, adsChain);
            validateResponse(response);

            return response;

            //*** Local function ****
            function addAdsToResponse(response, ads) {
                ads.forEach(function (ad) {
                    response.addAd(ad);
                });
            }

            function validateResponse(response) {

                if (!response.hasLinear()) {
                    throw error.VASTClIENT_AD_TYPE_NOT_SUPPORT;
                }

                if (response.duration === undefined) {
                    throw error.VASTClIENT_MISSING_DURATIOn;
                }

                // Không valid offset của progressEvents nữa do có thể null (ở jw null vẫn chấp nhận)
                /*var progressEvents = response.trackingEvents.progress;
                if (progressEvents) {
                    progressEvents.forEach(function (progressEvent) {
                        if (!utilities.isNumber(progressEvent.offset)) {
                            throw ERROR.VASTClIENT_MISSING_OFFSET_TRACKING;
                        }
                    });
                }*/
            }
        }

        /**
         * Error: 100, 102, 301, 303
         */

    }, {
        key: '_getVastTree',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(adTagUrl) {
                var xmlStr, vastTree;
                return regenerator.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                if (!(adTagUrl.indexOf('googleads.g.doubleclick.net') !== -1)) {
                                    _context4.next = 2;
                                    break;
                                }

                                throw { adTagUrl: adTagUrl, adsResponse: null, ima: true };

                            case 2:
                                _context4.next = 4;
                                return this._requestVASTXml(adTagUrl);

                            case 4:
                                xmlStr = _context4.sent;
                                vastTree = void 0;

                                /* if (xmlStr.indexOf('googleads.g.doubleclick.net') !== -1) {
                                    throw { adTagUrl: null, adsResponse: xmlStr, ima: true };
                                }*/

                                _context4.prev = 6;

                                vastTree = xml.toJXONTree(xmlStr);
                                playercore.log.debug('built JXONTree from VAST response:', vastTree);

                                if (isArray$1(vastTree.ad)) {
                                    vastTree.ads = vastTree.ad;
                                } else if (vastTree.ad) {
                                    vastTree.ads = [vastTree.ad];
                                } else {
                                    vastTree.ads = [];
                                }
                                _context4.next = 15;
                                break;

                            case 12:
                                _context4.prev = 12;
                                _context4.t0 = _context4['catch'](6);
                                throw error.ERROR_100;

                            case 15:

                                // error 102, 303
                                this.validateVASTTree(vastTree);
                                return _context4.abrupt('return', vastTree);

                            case 17:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[6, 12]]);
            }));

            function _getVastTree(_x4) {
                return _ref4.apply(this, arguments);
            }

            return _getVastTree;
        }()

        /**
         * Error: 100, 102, 301, 303
         * @param  {[type]} adTagUrl [description]
         * @return {[type]}          [description]
         */

    }, {
        key: '_getVASTAd',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5(adTagUrl) {
                var vastTree, waterfallAds;
                return regenerator.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                // get nội dung của master xml

                                

                                // error: 100, 102, 301, 303
                                vastTree = void 0;
                                _context5.prev = 2;
                                _context5.next = 5;
                                return this._getVastTree(adTagUrl);

                            case 5:
                                vastTree = _context5.sent;
                                _context5.next = 12;
                                break;

                            case 8:
                                _context5.prev = 8;
                                _context5.t0 = _context5['catch'](2);

                                

                                throw _context5.t0;

                            case 12:
                                waterfallAds = vastTree && isArray$1(vastTree.ads) ? vastTree.ads : null;
                                return _context5.abrupt('return', this._waterfallHandler(waterfallAds).catch(function (e) {
                                    if (e.ima) {
                                        // Bị lỗi nếu lấy adsResponse => chèn lại adTagUrl gốc để chạy ima
                                        throw {
                                            adTagUrl: adTagUrl,
                                            ima: true
                                        };
                                    }
                                }));

                            case 14:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this, [[2, 8]]);
            }));

            function _getVASTAd(_x5) {
                return _ref5.apply(this, arguments);
            }

            return _getVASTAd;
        }()
    }, {
        key: '_getAd',
        value: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee6(adTagUrl, adChain) {
                var adJxonTree, vastTree, ad;
                return regenerator.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                if (!(adChain.length >= this.props.WRAPPER_LIMIT)) {
                                    _context6.next = 2;
                                    break;
                                }

                                throw error.VASTClIENT_WRAPPER_LIMIT_REACHED;

                            case 2:
                                adJxonTree = void 0;

                                if (!isString(adTagUrl)) {
                                    _context6.next = 10;
                                    break;
                                }

                                _context6.next = 6;
                                return this._getVastTree(adTagUrl);

                            case 6:
                                vastTree = _context6.sent;

                                adJxonTree = vastTree.ad;
                                _context6.next = 11;
                                break;

                            case 10:
                                adJxonTree = adTagUrl;

                            case 11:
                                ad = this._buildAd(adJxonTree);

                                adChain.push(ad);

                                if (!ad.wrapper) {
                                    _context6.next = 16;
                                    break;
                                }

                                if (!(ad.wrapper.VASTAdTagURI.indexOf('//') === -1)) {
                                    _context6.next = 16;
                                    break;
                                }

                                throw error.ERROR_301;

                            case 16:
                                if (!ad.wrapper) {
                                    _context6.next = 20;
                                    break;
                                }

                                if (!(ad.wrapper.VASTAdTagURI.indexOf('googleads.g.doubleclick.net') !== -1)) {
                                    _context6.next = 19;
                                    break;
                                }

                                throw { adTagUrl: null, adsResponse: adChain, ima: true };

                            case 19:
                                return _context6.abrupt('return', this._getAd(ad.wrapper.VASTAdTagURI, adChain));

                            case 20:
                                return _context6.abrupt('return', adChain);

                            case 21:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function _getAd(_x6, _x7) {
                return _ref6.apply(this, arguments);
            }

            return _getAd;
        }()
    }, {
        key: '_buildAd',
        value: function _buildAd(adJxonTree) {
            var ad = new Ad(adJxonTree);
            this._validateAd(ad);
            return ad;
        }
    }, {
        key: '_validateAd',
        value: function _validateAd(ad) {
            var wrapper = ad.wrapper;
            var inLine = ad.inLine;

            if (inLine && wrapper) {
                throw error.VALID_AD_ERROR_1;
            }

            if (!inLine && !wrapper) {
                throw error.VALID_AD_ERROR_2;
            }

            if (inLine && !inLine.isSupported()) {
                throw error.VALID_AD_ERROR_3;
            }

            if (wrapper && !wrapper.VASTAdTagURI) {
                throw error.VALID_AD_ERROR_4;
            }
        }
    }, {
        key: '_waterfallHandler',
        value: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee7(waterfallAds) {
                var p_works, promise$$1, result, realAd;
                return regenerator.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                /*this.adChain_ = [];
                                try {
                                    let adChain = await this._getAd(waterfallAds.shift(), this.adChain_);
                                    return adChain;
                                } catch (e) {
                                    if (waterfallAds.length > 0) {
                                        return this._waterfallHandler(waterfallAds);
                                    } else {
                                        throw e;
                                    }
                                }*/

                                p_works = [];

                                while (waterfallAds.length) {
                                    promise$$1 = this._getAd(waterfallAds.shift(), []).catch(function (e) {
                                        return { error: e };
                                    });

                                    p_works.push(promise$$1);
                                }

                                _context7.next = 4;
                                return _Promise.all(p_works);

                            case 4:
                                result = _context7.sent;
                                realAd = result.filter(function (ad) {
                                    return !ad.error;
                                });

                                if (!realAd.length) {
                                    _context7.next = 8;
                                    break;
                                }

                                return _context7.abrupt('return', realAd);

                            case 8:
                                throw result[0].error;

                            case 9:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function _waterfallHandler(_x8) {
                return _ref7.apply(this, arguments);
            }

            return _waterfallHandler;
        }()

        /**
         * Error: 301
         */

    }, {
        key: '_requestVASTXml',
        value: function _requestVASTXml(adTagUrl) {
            var withCredentials = false;

            return new _Promise(function (resolve, reject) {
                promiseXhr({
                    uri: adTagUrl,
                    withCredentials: withCredentials,
                    method: 'GET'
                }, 0).then(function (res) {
                    if (!res) {
                        reject(error.ERROR_301);
                        return;
                    }
                    resolve(res);
                }).catch(function () {
                    reject(error.ERROR_301);
                });
            });
        }
    }]);

    return VASTClient;
}(VCPlayerObject$1), _class$13.defaultProps = {
    WRAPPER_LIMIT: 5
}, _temp$12);

var _class$14;
var _class2$3;
var _temp$13;

function _applyDecoratedDescriptor$4(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

var DEFAULT$6 = playercore.playerconfig.DEFAULT;
var RestorePlayer = (_class$14 = (_temp$13 = _class2$3 = function (_VCPlayerObject) {
    _inherits(RestorePlayer, _VCPlayerObject);

    function RestorePlayer(props) {
        _classCallCheck(this, RestorePlayer);

        var _this = _possibleConstructorReturn(this, (RestorePlayer.__proto__ || _Object$getPrototypeOf(RestorePlayer)).call(this, props));

        var player = _this.props.player;

        _this._volumeChangeVpaid = _this._volumeChangeVpaid.bind(_this);
        _this._savePlayerSnapshot();
        playerUtils.once(player, [DEFAULT$6.EVENT.AD_END], _this._handleRestorePlayer);
        return _this;
    }

    /**
     * Định nghĩa kiểu của props
     * @type {Object}
     */


    _createClass(RestorePlayer, [{
        key: '_savePlayerSnapshot',
        value: function _savePlayerSnapshot() {
            var player = this.props.player;

            var self = this;
            // Trên mobile nếu gọi play ngay khi init xong 
            // => ở vị trí preroll player.paused() === true
            // => check thêm ad position để set gia trị playing
            var snapshot = void 0;

            player.on(DEFAULT$6.EVENT.VPAID_AD_VOLUME_CHANGE, this._volumeChangeVpaid);
            player.one('snapshotPlayer', function () {
                var playing = !player.paused() || player.vastAd.adPosition() !== 'postroll';
                snapshot = {
                    playing: playing,
                    ended: player.ended(),
                    duration: player.duration(),
                    src: player.currentSrc(),
                    currentTime: player.currentTime(),
                    type: player.currentType(),
                    volume: player.volume(),
                    muted: player.muted()
                };

                self.setState({
                    snapshot: snapshot
                });
                if (playing) {
                    player.pause();
                }
            });
        }
    }, {
        key: '_volumeChangeVpaid',
        value: function _volumeChangeVpaid() {
            var snapshot = this.state.snapshot;
            var player = this.props.player;

            var vastAd = player.vastAd;

            vastAd.getAdVolume().then(function (volume) {
                if (volume === 0) {
                    snapshot.muted = true;
                } else {
                    snapshot.muted = false;
                }
            });
        }
    }, {
        key: 'snapshot',
        value: function snapshot() {
            return this.state.snapshot;
        }
    }, {
        key: '_handleRestorePlayer',
        value: function _handleRestorePlayer() {
            var snapshot = this.state.snapshot;
            var player = this.props.player;


            player.off(DEFAULT$6.EVENT.VPAID_AD_VOLUME_CHANGE, this._volumeChangeVpaid);

            if (!snapshot) {
                this._resumePlayback(playing);
                return;
            }

            var needRestore = this._needRestoreSrc(snapshot);
            var playing = snapshot.playing;

            player.vastAd = null;

            if (!needRestore) {
                // Không cần restore source thì gọi play và set lại current time
                player.currentTime(snapshot.currentTime);
                this._resumePlayback(playing);
                return;
            }

            // Đối với trường hợp cần restore lại source thì xử lý
            player.one('canplay', this._tryToResume.bind(this, snapshot));
            this._ensureCanplayEvtGetsFired();

            // Trên PC khi đổi luồng thì cần reset lại player
            if (!playercore.agent.isMobile) {
                player.reset();
            }

            // restore lại src và currentTime
            player.src({ src: snapshot.src, type: snapshot.type });
            player.currentTime(snapshot.currentTime);
            player.trigger('waiting');

            // Trên safari cần call load để báo source change
            if (!playercore.agent.isMobile) {
                player.load();
            }

            this._resumePlayback(playing);
        }
    }, {
        key: '_tryToResume',
        value: function _tryToResume(snapshot) {
            var player = this.props.player;

            var self = this;
            try {
                if (player.currentTime() !== snapshot.currentTime) {
                    player.one('seeked', function () {
                        self._resumePlayback(snapshot.playing);
                    });
                    player.currentTime(snapshot.currentTime);
                } else {
                    // if needed and no seek has been performed, restore playing status immediately
                    this._resumePlayback(snapshot.playing);
                }
            } catch (e) {
                playercore.log.warn('Failed to resume the content after an advertisement', e);
            }
        }
    }, {
        key: '_ensureCanplayEvtGetsFired',
        value: function _ensureCanplayEvtGetsFired() {
            var player = this.props.player;

            var timeoutId = setTimeout(function () {
                player.trigger('canplay');
            }, 1000);

            player.one('canplay', function () {
                clearTimeout(timeoutId);
            });
        }

        /**
         * Resume play video chính
         */

    }, {
        key: '_resumePlayback',
        value: function _resumePlayback(playing) {
            var player = this.props.player;
            var snapshot = this.state.snapshot;
            var currentTime = snapshot.currentTime,
                muted = snapshot.muted,
                volume = snapshot.volume;

            if (!this.triggerRestorePlayback_) {
                player.trigger(DEFAULT$6.EVENT.AD_RESTORED_PLAYBACK);
                this.triggerRestorePlayback_ = true;
            }

            if (!playing) {
                return;
            }

            player.currentTime(currentTime);
            player.muted(muted);
            player.volume(volume);

            setTimeout(function () {
                player.play(true);
            }, 0);
        }

        /**
         * Kiểm tra có cần set lại source sau khi chạy quảng cáo hay không
         * @return {Boolean} [description]
         */

    }, {
        key: '_needRestoreSrc',
        value: function _needRestoreSrc(snapshot) {
            var player = this.props.player;


            var src = player.src();

            if (!player.vastAd.adUnit()) {
                return false;
            }

            // Nếu hiện tại không có src thì return true
            var type = player.vastAd.adUnit().type;
            if (!src) {
                return true;
            }

            if (src !== snapshot.src) {
                return true;
            }

            if (playercore.agent.isIOS) {
                return true;
            }

            // Nếu quảng cáo trước đó là Vast thì return false
            if (type === 'VAST' || type === 'VPAID') {
                return false;
            }

            // Nếu src hiện tại dạng mediasource/blob thì không cần restore
            if (/mediasource|blob/.test(src)) {
                return false;
            }

            // Nếu src là link có chứa m3u8 tức chơi native hls thì cần restore lại
            if (/m3u8/gi.test(src)) {
                return true;
            }

            // So sánh src được snapshot và src hiện tại, nếu khác nhau thì cần restore
            return src !== snapshot.src;
        }
    }]);

    return RestorePlayer;
}(VCPlayerObject$1), _class2$3.propTypes = {
    player: playercore.PropTypes.object.isRequired,
    vastAd: playercore.PropTypes.object.isRequired,
    preLoaded: playercore.PropTypes.bool
}, _temp$13), (_applyDecoratedDescriptor$4(_class$14.prototype, '_handleRestorePlayer', [playercore.autobind], _Object$getOwnPropertyDescriptor(_class$14.prototype, '_handleRestorePlayer'), _class$14.prototype), _applyDecoratedDescriptor$4(_class$14.prototype, '_tryToResume', [playercore.autobind], _Object$getOwnPropertyDescriptor(_class$14.prototype, '_tryToResume'), _class$14.prototype)), _class$14);

var _class$2;
var _class2$1;
var _temp$2;

function _applyDecoratedDescriptor$1(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

// import VASTIntegrator from '../ads/vast';
var DEFAULT$1 = playercore.playerconfig.DEFAULT;

var vastClient = new VASTClient();

var AD_STATES = {
    INIT: 'INIT',
    PENDING: 'PENDING',
    WATING: 'WATING',
    DISPOSE: 'DISPOSE'
};

var VastPlugin = (_class$2 = (_temp$2 = _class2$1 = function (_VCPlayerObject) {
    _inherits(VastPlugin, _VCPlayerObject);

    function VastPlugin(props) {
        _classCallCheck(this, VastPlugin);

        var _this = _possibleConstructorReturn(this, (VastPlugin.__proto__ || _Object$getPrototypeOf(VastPlugin)).call(this, props));

        _this.state = {
            adState: AD_STATES.INIT,
            adIntegrator: null,
            paused: false,
            restorePlayer: null
        };
        var player = _this.props.player;

        player.vastAd = _this;
        _this.firstAd = false;

        // override play/pause;
        // this._prepareForAd();
        // setup restore play content when ad ended
        // this._setUpRestorePlayer();
        _this._initAd();
        return _this;
    }

    /**
     * Vị trí chạy ad
     */

    /**
     * Định nghĩa kiểu của props
     * @type {Object}
     */


    _createClass(VastPlugin, [{
        key: 'adPosition',
        value: function adPosition() {
            var type = this.props.type;

            return type;
        }
    }, {
        key: 'skipAd',
        value: function skipAd() {
            var adIntegrator = this.state.adIntegrator;


            if (!adIntegrator) {
                return;
            }

            adIntegrator.skipAd();
        }
    }, {
        key: 'clickThrough',
        value: function clickThrough() {
            var adIntegrator = this.state.adIntegrator;


            if (!adIntegrator) {
                return;
            }

            adIntegrator.clickThrough();
        }
    }, {
        key: 'getAdVolume',
        value: function getAdVolume() {
            var adIntegrator = this.state.adIntegrator;


            if (!adIntegrator) {
                return;
            }

            return adIntegrator.getAdVolume();
        }
    }, {
        key: 'getAdExpanded',
        value: function getAdExpanded() {
            var adIntegrator = this.state.adIntegrator;


            if (!adIntegrator) {
                return;
            }

            return adIntegrator.getAdExpanded();
        }
    }, {
        key: 'setAdVolume',
        value: function setAdVolume(volume) {
            var adIntegrator = this.state.adIntegrator;


            if (!adIntegrator) {
                return;
            }

            adIntegrator.setAdVolume(volume);
        }
    }, {
        key: 'adUnit',
        value: function adUnit() {
            var adIntegrator = this.state.adIntegrator;


            if (!adIntegrator) {
                return;
            }

            return adIntegrator;
        }
    }, {
        key: 'paused',
        value: function paused() {
            return this.state.paused;
        }
    }, {
        key: 'getPlayerAdUnit',
        value: function getPlayerAdUnit() {
            var adIntegrator = this.state.adIntegrator;

            return adIntegrator.getPlayerAdUnit();
        }
    }, {
        key: 'isPaused',
        value: function isPaused() {
            var adIntegrator = this.state.adIntegrator;

            return adIntegrator.isPaused();
        }
    }, {
        key: 'vastResponse',
        value: function vastResponse() {
            var vastResponse = this.state.vastResponse;

            return vastResponse;
        }
    }, {
        key: '_initAd',
        value: function _initAd() {
            var self = this;
            var player = this.props.player;

            // player.trigger(DEFAULT.EVENT.AD_START, this);

            player.on(DEFAULT$1.EVENT.USER_SKIP_AD, this.skipAd);

            _Promise.resolve().then(function () {
                return self._setAdCancelTimeout();
            }).then(function () {
                return self._getVastResponse();
            }).then(function (vastResponse) {
                return self.playAd(vastResponse);
            }).then(function () {
                var _self$state = self.state,
                    restorePlayer = _self$state.restorePlayer,
                    adIntegrator = _self$state.adIntegrator;

                playercore.log.trace('VastPlugin > ad end');
                restorePlayer.snapshot().muted = adIntegrator.getPlayerAdUnit().muted();
                restorePlayer.snapshot().volume = adIntegrator.getPlayerAdUnit().volume();
                player.trigger(DEFAULT$1.EVENT.AD_END);
            }).catch(function (e) {
                playercore.log.trace('VastPlugin > end with error:', e);
                player.trigger(DEFAULT$1.EVENT.AD_END);
            });
        }
    }, {
        key: 'prepareForPlayAd',
        value: function prepareForPlayAd() {
            this._prepareForAd();
            this._setUpRestorePlayer();
        }
    }, {
        key: '_prepareForAd',
        value: function _prepareForAd() {
            var self = this;
            var player = this.props.player;

            var origPlay = this.origPlay = player.play;
            var origPause = this.origPlay = player.pause;
            player.play = function (isOri) {
                var adIntegrator = self.state.adIntegrator;


                if (isOri) {
                    origPlay.apply(this, arguments);
                    return;
                }

                if (!adIntegrator) {
                    return;
                }

                self.setState({
                    paused: false
                });

                adIntegrator.resumeAd();
            };

            player.pause = function (isOri) {
                var adIntegrator = self.state.adIntegrator;


                if (isOri) {
                    origPause.apply(this, arguments);
                    return;
                }

                if (!adIntegrator) {
                    return;
                }

                self.setState({
                    paused: true
                });

                adIntegrator.pauseAd();
            };

            player.one(DEFAULT$1.EVENT.AD_END, function () {
                player.off(DEFAULT$1.EVENT.USER_SKIP_AD, self.skipAd);
                player.play = origPlay;
                player.pause = origPause;
            });
        }
    }, {
        key: 'playAd',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(adChains) {
                var player, adState, adPod, error, result, i, vastResponse;
                return regenerator.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                player = this.props.player;
                                adState = this.state.adState;
                                adPod = player.options().params.adPod;

                                if (!(adState !== AD_STATES.INIT)) {
                                    _context.next = 5;
                                    break;
                                }

                                return _context.abrupt('return');

                            case 5:
                                if (!(adChains && adChains.length)) {
                                    _context.next = 33;
                                    break;
                                }

                                error = void 0;
                                result = void 0;
                                i = 0;

                            case 9:
                                if (!(i < adChains.length)) {
                                    _context.next = 32;
                                    break;
                                }

                                vastResponse = adChains[i];
                                _context.prev = 11;

                                if (!(adPod === true)) {
                                    _context.next = 19;
                                    break;
                                }

                                player.trigger(DEFAULT$1.EVENT.AD_VASTRESPONSE, vastResponse);
                                _context.next = 16;
                                return this._playMutilAd(vastResponse);

                            case 16:
                                result = _context.sent;
                                _context.next = 24;
                                break;

                            case 19:
                                player.trigger(DEFAULT$1.EVENT.AD_VASTRESPONSE, vastResponse);
                                _context.next = 22;
                                return this._playOneAd(vastResponse);

                            case 22:
                                result = _context.sent;
                                return _context.abrupt('return', result);

                            case 24:
                                _context.next = 29;
                                break;

                            case 26:
                                _context.prev = 26;
                                _context.t0 = _context['catch'](11);

                                error = _context.t0;

                            case 29:
                                i++;
                                _context.next = 9;
                                break;

                            case 32:
                                return _context.abrupt('return', error);

                            case 33:
                                return _context.abrupt('return', this._playOneAd(adChains));

                            case 34:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[11, 26]]);
            }));

            function playAd(_x) {
                return _ref.apply(this, arguments);
            }

            return playAd;
        }()
    }, {
        key: '_playMutilAd',
        value: function _playMutilAd(vastResponse) {
            var player = this.props.player;

            this.setState({
                vastResponse: vastResponse,
                adIntegrator: null
            });
            var adIntegrator = void 0;
            if (ImaIntegrator && this._isIMA(vastResponse)) {
                adIntegrator = new ImaIntegrator(this.props);
            } else {
                adIntegrator = this._isVPAID(vastResponse) ? new VPAIDIntegrator(this.props) : new VastTest(this.props);
            }

            this.setState({
                adIntegrator: adIntegrator
            });

            var vpaidStarted = false;
            player.one(DEFAULT$1.EVENT.VPAID_AD_START, function () {
                vpaidStarted = true;
            });

            return adIntegrator.playAd(vastResponse).catch(function (e) {
                if (!vpaidStarted) {
                    throw e;
                }
            });
        }
    }, {
        key: '_playOneAd',
        value: function _playOneAd(vastResponse) {
            var player = this.props.player;

            this.setState({
                vastResponse: vastResponse
            });
            var adIntegrator = void 0;
            if (ImaIntegrator && this._isIMA(vastResponse)) {
                adIntegrator = new ImaIntegrator(this.props);
            } else {
                adIntegrator = this._isVPAID(vastResponse) ? new VPAIDIntegrator(this.props) : new VastTest(this.props);
            }

            this.setState({
                adIntegrator: adIntegrator
            });
            player.trigger(DEFAULT$1.EVENT.AD_PLAY, vastResponse);

            var vpaidStarted = false;
            player.one(DEFAULT$1.EVENT.VPAID_AD_START, function () {
                vpaidStarted = true;
            });

            return adIntegrator.playAd(vastResponse).catch(function (e) {
                if (!vpaidStarted) {
                    throw e;
                }
            });
        }
    }, {
        key: 'snapshot',
        value: function snapshot() {
            return this.state.restorePlayer.snapshot();
        }
    }, {
        key: '_setUpRestorePlayer',
        value: function _setUpRestorePlayer() {
            var _props = this.props,
                player = _props.player,
                preLoaded = _props.preLoaded;

            var restorePlayer = new RestorePlayer({ player: player, vastAd: this, preLoaded: preLoaded });
            this.setState({ restorePlayer: restorePlayer });
        }
    }, {
        key: '_setAdCancelTimeout',
        value: function _setAdCancelTimeout() {}
    }, {
        key: '_getVastResponse',
        value: function _getVastResponse() {
            var _props2 = this.props,
                adTagUrl = _props2.adTagUrl,
                vastResponse = _props2.vastResponse,
                ima = _props2.ima;


            if (ima) {
                return _Promise.resolve({ ima: true, adTagUrl: ima });
            }

            if (vastResponse) {
                return _Promise.resolve(vastResponse);
            }
            return VastPlugin.getVASTResponse(adTagUrl);
        }
    }, {
        key: '_isVPAID',
        value: function _isVPAID(vastResponse) {
            var i, len;
            var mediaFiles = vastResponse.mediaFiles;
            for (i = 0, len = mediaFiles.length; i < len; i++) {
                if (VastUtil.isVPAID(mediaFiles[i]) && mediaFiles[i].isSupported()) {
                    return true;
                }
            }
            return false;
        }
    }, {
        key: '_isIMA',
        value: function _isIMA(vastResponse) {
            return !!vastResponse.ima;
        }
    }], [{
        key: 'getVASTResponse',
        value: function getVASTResponse(url) {
            return vastClient.getVASTResponse(url);
        }
    }]);

    return VastPlugin;
}(VCPlayerObject$1), _class2$1.propTypes = {
    player: playercore.PropTypes.object.isRequired,
    type: playercore.PropTypes.string.isRequired,
    adTagUrl: playercore.PropTypes.string,
    adTagXML: playercore.PropTypes.object,
    ima: playercore.PropTypes.string,
    preLoaded: playercore.PropTypes.bool,
    skipoffset: playercore.PropTypes.number,
    vastResponse: playercore.PropTypes.array
}, _class2$1.defaultProps = {
    timeout: 500,
    autostart: true
}, _temp$2), (_applyDecoratedDescriptor$1(_class$2.prototype, 'skipAd', [playercore.autobind], _Object$getOwnPropertyDescriptor(_class$2.prototype, 'skipAd'), _class$2.prototype), _applyDecoratedDescriptor$1(_class$2.prototype, 'clickThrough', [playercore.autobind], _Object$getOwnPropertyDescriptor(_class$2.prototype, 'clickThrough'), _class$2.prototype)), _class$2);

var _class$1;
var _temp$1;

var DefaultAdPlugin = (_temp$1 = _class$1 = function (_Plugin) {
    _inherits(DefaultAdPlugin, _Plugin);

    _createClass(DefaultAdPlugin, [{
        key: 'getDefaultProps',
        value: function getDefaultProps() {

            var defaultProps = this.constructor.defaultProps;

            var customize_data = {};

            return _extends$1({}, defaultProps, customize_data);
        }
    }]);

    function DefaultAdPlugin(props) {
        _classCallCheck(this, DefaultAdPlugin);

        return _possibleConstructorReturn(this, (DefaultAdPlugin.__proto__ || _Object$getPrototypeOf(DefaultAdPlugin)).call(this, props));
    }

    /**
     * Init ad theo vastUrl
     * @param  {Object}  options
     * @param  {String}  options.vastUrl  Url của vast
     */


    _createClass(DefaultAdPlugin, [{
        key: 'initAd',
        value: function initAd(_ref) {
            var vastUrl = _ref.vastUrl,
                vastResponse = _ref.vastResponse,
                ima = _ref.ima,
                type = _ref.type,
                preLoaded = _ref.preLoaded;

            var self = this;
            var player = this.props.player;

            var callOrigPlay = player.play;
            var firstCallPlay = false;

            player.play = function () {
                if (firstCallPlay) {
                    return;
                }

                firstCallPlay = true;
                player.play = callOrigPlay;
                self._initAd({ vastUrl: vastUrl, vastResponse: vastResponse, ima: ima, type: type, preLoaded: preLoaded });
            };

            player.play();
        }

        /**
         * Init ad  
         * @param  {Object}  options
         * @param  {String}  options.vastUrl
         * @param  {Object}  options.vastResponse
         */

    }, {
        key: '_initAd',
        value: function _initAd(_ref2) {
            var vastUrl = _ref2.vastUrl,
                vastResponse = _ref2.vastResponse,
                ima = _ref2.ima,
                type = _ref2.type,
                preLoaded = _ref2.preLoaded;
            var player = this.props.player;


            if (player.vastAd) {
                return;
            }

            new VastPlugin({
                player: player,
                adTagUrl: vastUrl,
                vastResponse: vastResponse,
                ima: ima,
                type: type,
                preLoaded: preLoaded
            });
        }
    }, {
        key: 'getVastRespone',
        value: function getVastRespone(vastUrl) {
            return VastPlugin.getVASTResponse(vastUrl);
        }
    }]);

    return DefaultAdPlugin;
}(playercore.Plugin), _class$1.defaultProps = {
    adsCancelTimeout: 5000
}, _temp$1);

var _class;
var _class2;
var _temp;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

var AD_TYPE = {
    PREROLL: 'preroll',
    MIDROLL: 'midroll',
    POSTROLL: 'postroll'
};

var Player = playercore__default.getComponent('Player');
var DEFAULT = playercore.playerconfig.DEFAULT;
var AdsPlugin = (_class = (_temp = _class2 = function (_DefaultAdPlugin) {
    _inherits(AdsPlugin, _DefaultAdPlugin);

    _createClass(AdsPlugin, [{
        key: 'getDefaultProps',
        value: function getDefaultProps(props) {
            var player = props.player;

            var _player$options = player.options(),
                params = _player$options.params,
                plugins = _player$options.plugins;

            var ads = params.ads,
                vast = params.vast,
                ima = params.ima;


            var defaultProps = this.constructor.defaultProps;

            var customize_data = {};

            if (!plugins.kinghubAdmicroADSPlugin && Player.prototype.kinghubAdmicroADSPlugin) {
                customize_data.enableAd = false;
            }

            if (vast || ima) {
                customize_data.enableAd = true;
            }

            if (ads === false) {
                customize_data.enableAd = false;
            }

            return _extends$1({}, defaultProps, customize_data);
        }
    }]);

    function AdsPlugin(props) {
        _classCallCheck(this, AdsPlugin);

        var _this = _possibleConstructorReturn(this, (AdsPlugin.__proto__ || _Object$getPrototypeOf(AdsPlugin)).call(this, props));

        var _this$props = _this.props,
            player = _this$props.player,
            enableAd = _this$props.enableAd;

        var _player$options2 = player.options(),
            params = _player$options2.params;

        // Kiểm tra xem có enable ad không


        if (!enableAd) {
            return _possibleConstructorReturn(_this);
        }

        // player.on(DEFAULT.EVENT.AD_ORDER_START_MIDROLL, this.startMidroll);
        // player.on(DEFAULT.EVENT.AD_ORDER_START_POSTROLL, this.startPostroll);
        if (params.adPostLoad && !playercore.agent.isIOS) {
            player.on('preparePostrollVast', _this.preparePostroll);
        } else {
            player.on(DEFAULT.EVENT.AD_ORDER_START_POSTROLL, _this.startPostroll);
        }
        player.on('prepareMidrollVast', _this.handlePrepareMidroll);

        if (params.adPreLoad && !playercore.agent.isIOS) {
            player.one('updateMediaInfo', _this.handleLoadAdPreroll);
        } else {
            player.one('play', _this.preparePreroll);
        }

        return _this;
    }

    /**
     * Bước chuẩn bị để chạy preroll ad 
     * @return {[type]} [description]
     */


    _createClass(AdsPlugin, [{
        key: 'preparePreroll',
        value: function preparePreroll() {
            var self = this;
            var vastResponse = void 0;
            var player = this.props.player;

            var _player$options3 = player.options(),
                params = _player$options3.params;

            if (params.nopre) {
                return;
            }

            var ima = params.ima;

            var vastUrl = self._getVastInAdmicro({ type: AD_TYPE.PREROLL, position: 0 });
            if (!vastUrl) {
                return;
            }

            player.one('timeupdate', function () {
                self.initAd({ vastUrl: vastUrl, vastResponse: vastResponse, ima: ima, type: 'preroll' });
            });
        }
    }, {
        key: 'preparePostroll',
        value: function preparePostroll() {
            var self = this;
            var preLoaded = true;

            var vastUrl = self._getVastInAdmicro({ type: AD_TYPE.POSTROLL, position: 0 });
            if (!vastUrl) {
                return;
            }

            this.getVastRespone(vastUrl).then(function (vast) {
                var vastUrl = void 0,
                    vastResponse = void 0;
                if (typeof vast === 'string') {
                    vastUrl = vast;
                } else if ((typeof vast === 'undefined' ? 'undefined' : _typeof(vast)) === 'object') {
                    vastResponse = vast;
                } else {
                    return;
                }
                self.initAd({ vastUrl: vastUrl, vastResponse: vastResponse, type: AD_TYPE.POSTROLL, preLoaded: preLoaded });
            });
        }

        /**
         *  Load trước media của ads
         */

    }, {
        key: 'handleLoadAdPreroll',
        value: function handleLoadAdPreroll() {
            var self = this;
            var player = this.props.player;

            var preLoaded = true;

            var _player$options4 = player.options(),
                params = _player$options4.params;

            if (params.nopre) {
                return;
            }

            var ima = params.ima;

            var vastUrl = self._getVastInAdmicro({ type: AD_TYPE.PREROLL, position: 0 });
            if (!vastUrl) {
                return;
            }

            this.getVastRespone(vastUrl).then(function (vast) {
                var vastUrl = void 0,
                    vastResponse = void 0;
                if (typeof vast === 'string') {
                    vastUrl = vast;
                } else if ((typeof vast === 'undefined' ? 'undefined' : _typeof(vast)) === 'object') {
                    vastResponse = vast;
                } else {
                    return;
                }
                self.initAd({ vastUrl: vastUrl, vastResponse: vastResponse, ima: ima, type: 'preroll', preLoaded: preLoaded });
            });
        }
    }, {
        key: 'startMidroll',
        value: function startMidroll(evt, vast) {
            var vastUrl = void 0,
                vastResponse = void 0;
            if (typeof vast === 'string') {
                vastUrl = vast;
            } else if ((typeof vast === 'undefined' ? 'undefined' : _typeof(vast)) === 'object') {
                vastResponse = vast;
            } else {
                return;
            }
            this.initAd({ vastUrl: vastUrl, vastResponse: vastResponse, type: 'midroll' });
        }
    }, {
        key: 'handlePrepareMidroll',
        value: function handlePrepareMidroll(event, index) {
            var player = this.props.player;

            var self = this;
            var preLoaded = true;

            var _player$options5 = player.options(),
                params = _player$options5.params;

            var vastUrl = this._getVastInAdmicro({ type: AD_TYPE.MIDROLL, position: index });
            if (!vastUrl) {
                player.trigger(DEFAULT.EVENT.AD_MIDROLL_VASTRESPONSE);
                return;
            }

            this.getVastRespone(vastUrl).then(function (vast) {
                player.trigger(DEFAULT.EVENT.AD_MIDROLL_VASTRESPONSE, vast);
                var vastUrl = void 0,
                    vastResponse = void 0;
                if (typeof vast === 'string') {
                    vastUrl = vast;
                } else if ((typeof vast === 'undefined' ? 'undefined' : _typeof(vast)) === 'object') {
                    vastResponse = vast;
                } else {
                    return;
                }
                if (!params.adMidLoad || playercore.agent.isIOS) {
                    player.one(DEFAULT.EVENT.AD_ORDER_START_MIDROLL, self.startMidroll);
                    return;
                }
                self.initAd({ vastUrl: vastUrl, vastResponse: vastResponse, type: 'midroll', preLoaded: preLoaded });
            }).catch(function () {
                player.trigger(DEFAULT.EVENT.AD_MIDROLL_VASTRESPONSE);
            });
        }
    }, {
        key: 'startPostroll',
        value: function startPostroll() {
            var vastUrl = this._getVastInAdmicro({ type: AD_TYPE.POSTROLL, position: 10 });
            if (vastUrl) {
                this._initAd({ vastUrl: vastUrl, type: 'postroll' });
            }
        }

        /**
         * Lấy vast url từ admicro plugin
         * @return {String|null}
         */

    }, {
        key: '_getVastInAdmicro',
        value: function _getVastInAdmicro() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var player = this.props.player;

            var _player$options6 = player.options(),
                params = _player$options6.params;

            if (Player.prototype.kinghubAdmicroADSPlugin) {
                return Player.prototype.kinghubAdmicroADSPlugin.call(player, options);
            } else if (params.vast) {
                return params.vast;
            }
        }
    }]);

    return AdsPlugin;
}(DefaultAdPlugin), _class2.defaultProps = {
    adsCancelTimeout: 5000,
    enableAd: true
}, _temp), (_applyDecoratedDescriptor(_class.prototype, 'preparePreroll', [playercore.autobind], _Object$getOwnPropertyDescriptor(_class.prototype, 'preparePreroll'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'preparePostroll', [playercore.autobind], _Object$getOwnPropertyDescriptor(_class.prototype, 'preparePostroll'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleLoadAdPreroll', [playercore.autobind], _Object$getOwnPropertyDescriptor(_class.prototype, 'handleLoadAdPreroll'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'startMidroll', [playercore.autobind], _Object$getOwnPropertyDescriptor(_class.prototype, 'startMidroll'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handlePrepareMidroll', [playercore.autobind], _Object$getOwnPropertyDescriptor(_class.prototype, 'handlePrepareMidroll'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'startPostroll', [playercore.autobind], _Object$getOwnPropertyDescriptor(_class.prototype, 'startPostroll'), _class.prototype)), _class);

var _class$16;
var _class2$5;
var _temp2$1;

function _applyDecoratedDescriptor$6(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

var DEFAULT$8 = playercore.playerconfig.DEFAULT;


var playername = "vcplayer";

/**
 * @class SkipToggle
 */
var SkipToggle = (_class$16 = (_temp2$1 = _class2$5 = function (_Component) {
    _inherits(SkipToggle, _Component);

    function SkipToggle() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, SkipToggle);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SkipToggle.__proto__ || _Object$getPrototypeOf(SkipToggle)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            timeLeft: 6,
            started: false,
            skipped: false
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SkipToggle, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            //let {player} = this.props;
            //player.on('timeupdate', this.update);
            this.intervalRemainingTime_ = setInterval(this.update, 200);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            //let {player} = this.props;
            //player.off('timeupdate', this.update);
            clearInterval(this.intervalRemainingTime_);
        }
    }, {
        key: '_getAdDuration',
        value: function _getAdDuration() {
            var player = this.props.player;

            var adUnit = player.vastAd.adUnit();
            var self = this;
            adUnit.getAdDuration().then(function (duration) {
                self.adDuration = duration;
            });

            // start test iab
            var vasResponse = player.vastAd.vastResponse();
            var bid = vasResponse.ads[0].id;

            if (bid === 543706) {
                this.skipOffset = 8;
            }

            // end test iab
        }

        /**
        * Update thời gian còn lại mà client có thể skip ad
        */

    }, {
        key: 'update',
        value: function update() {
            var _props = this.props,
                player = _props.player,
                skipOffset = _props.skipOffset;


            if (!player.vastAd) {
                return;
            }

            var adUnit = player.vastAd.adUnit();
            var self = this;

            if (!this.adDuration) {
                this._getAdDuration();
                return;
            }

            this.skipOffset = adUnit.getSkipOffSet();

            // start test iab
            skipOffset = this.skipOffset || skipOffset;

            // end test iab

            adUnit.getAdRemainingTime().then(function (remainingTime) {
                var timeLeft = Math.ceil(skipOffset + remainingTime - self.adDuration);
                self.setState({
                    timeLeft: timeLeft,
                    started: true
                });
            });
        }
    }, {
        key: '_skipAd',
        value: function _skipAd(evt) {
            evt.preventDefault();
            var _state = this.state,
                timeLeft = _state.timeLeft,
                skipped = _state.skipped;

            if (timeLeft > 0 || skipped) {
                return;
            }

            this.setState({
                skipped: true
            });

            playercore.log.trace('<SkipToggle._skipAd>');
            var player = this.props.player;

            player.trigger(DEFAULT$8.EVENT.USER_SKIP_AD);
        }
    }, {
        key: 'render',
        value: function render() {
            var adCanSkip = void 0;
            var _state2 = this.state,
                timeLeft = _state2.timeLeft,
                skipped = _state2.skipped,
                started = _state2.started;

            var label = timeLeft > 0 ? timeLeft + ' gi\xE2y' : 'Bỏ Qua';
            if (label === 'Bỏ Qua') {
                adCanSkip = 'ad-canskip';
            }

            if (skipped || !started) {
                return null;
            }

            return React__default.createElement(
                'button',
                {
                    className: 'ad-skip ' + adCanSkip + ' ' + playername + '-button',
                    onClick: this._skipAd
                },
                label
            );
        }
    }]);

    return SkipToggle;
}(React.Component), _class2$5.propTypes = {
    player: playercore.PropTypes.object.isRequired,
    skipOffset: playercore.PropTypes.number
}, _class2$5.defaultProps = {
    skipOffset: 6
}, _temp2$1), (_applyDecoratedDescriptor$6(_class$16.prototype, 'update', [playercore.autobind], _Object$getOwnPropertyDescriptor(_class$16.prototype, 'update'), _class$16.prototype), _applyDecoratedDescriptor$6(_class$16.prototype, '_skipAd', [playercore.autobind], _Object$getOwnPropertyDescriptor(_class$16.prototype, '_skipAd'), _class$16.prototype)), _class$16);

var _class$17;
var _class2$6;
var _temp2$2;

function _applyDecoratedDescriptor$7(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

var DEFAULT$9 = playercore.playerconfig.DEFAULT;

/**
 * @class ClickThrough
 */

var ClickThrough = (_class$17 = (_temp2$2 = _class2$6 = function (_Component) {
    _inherits(ClickThrough, _Component);

    function ClickThrough() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ClickThrough);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ClickThrough.__proto__ || _Object$getPrototypeOf(ClickThrough)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            url: null
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ClickThrough, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var player = this.props.player;

            var type = player.vastAd.adUnit().type;
            if (type !== 'VPAID') {
                player.trigger(DEFAULT$9.EVENT.VAST_AD_VIDEO_SHOW);
            }
        }
    }, {
        key: 'updateBlocker',
        value: function updateBlocker(url) {
            this.setState({
                url: url
            });
        }
    }, {
        key: '_clickthrough',
        value: function _clickthrough(evt) {
            var player = this.props.player;

            var adUnit = player.vastAd.adUnit();
            var paused = adUnit.isPaused();
            if (paused) {
                player.play();
                evt.stopPropagation();
                return false;
            }

            adUnit.clickThrough();
        }
    }, {
        key: 'render',
        value: function render() {
            var url = this.state.url;


            if (!url) {
                return null;
            }

            return React__default.createElement('a', {
                className: 'ad-clickthrough-blocker',
                onClick: this._clickthrough,
                href: url,
                target: '_blank',
                rel: 'noopener noreferrer'
            });
        }
    }]);

    return ClickThrough;
}(React.Component), _class2$6.propTypes = {
    player: playercore.PropTypes.object.isRequired
}, _temp2$2), (_applyDecoratedDescriptor$7(_class$17.prototype, 'updateBlocker', [playercore.autobind], _Object$getOwnPropertyDescriptor(_class$17.prototype, 'updateBlocker'), _class$17.prototype), _applyDecoratedDescriptor$7(_class$17.prototype, '_clickthrough', [playercore.autobind], _Object$getOwnPropertyDescriptor(_class$17.prototype, '_clickthrough'), _class$17.prototype)), _class$17);

var _class$19;
var _class2$7;
var _temp2$4;

function _applyDecoratedDescriptor$8(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

var playername$1 = "vcplayer";

var AdBtnMute = (_class$19 = (_temp2$4 = _class2$7 = function (_Component) {
    _inherits(AdBtnMute, _Component);

    function AdBtnMute() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, AdBtnMute);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AdBtnMute.__proto__ || _Object$getPrototypeOf(AdBtnMute)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            muted: true
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(AdBtnMute, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var player = this.props.player;

            var self = this;
            this.type = player.vastAd.adUnit().type;
            var PlayerAdUnit = player.vastAd.getPlayerAdUnit();

            var vastAd = player.vastAd;
            var snapshot = vastAd.snapshot();

            var volume = snapshot.muted ? 0 : snapshot.volume;
            try {
                vastAd.setAdVolume(volume).then(function () {
                    vastAd.getAdVolume().then(function (volume) {
                        self.setState({
                            firstVolume: volume
                        });
                    });
                });
            } catch (e) {
                //ignore
            }
            var isMuted = snapshot.muted;
            this.setState({ muted: isMuted });
            player.setTimeout(function () {
                self.setState({
                    firstVolume: volume
                });
            }, 1000);

            PlayerAdUnit.on('volumechange', this.update);
            this.update();
        }
    }, {
        key: 'update',
        value: function update() {
            var self = this;
            var player = this.props.player;

            var vastAd = player.vastAd;
            var PlayerAdUnit = vastAd.getPlayerAdUnit();

            vastAd.getAdVolume().then(function (volume) {
                var mute = PlayerAdUnit.muted();
                if (volume === 0 || mute) {
                    self.setState({
                        muted: true
                    });
                } else {
                    self.setState({
                        muted: false
                    });
                }
            });
        }
    }, {
        key: 'handleClick',
        value: function handleClick(e) {
            e.preventDefault();
            var player = this.props.player;
            var _state = this.state,
                firstVolume = _state.firstVolume,
                muted = _state.muted;

            var vastAd = player.vastAd;
            var PlayerAdUnit = vastAd.getPlayerAdUnit();

            vastAd.getAdVolume().then(function (volume) {
                var volume_ = firstVolume === 0 ? 0.5 : firstVolume;
                PlayerAdUnit.muted(!muted);
                if (volume === 0 || muted) {
                    vastAd.setAdVolume(volume_);
                } else {
                    vastAd.setAdVolume(0);
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var player = this.props.player;
            var muted = this.state.muted;

            var width = player.el_.clientWidth;
            if (width <= 170 || !player.options().params.adMuteToggle) {
                return null;
            }
            return React__default.createElement(
                'div',
                { className: playername$1 + '-ad-btn-mute', onClick: function onClick(e) {
                        return _this2.handleClick(e);
                    } },
                React__default.createElement(
                    'button',
                    null,
                    React__default.createElement('span', { className: playername$1 + '-ad-qmtwbs-base' }),
                    React__default.createElement('span', { className: playername$1 + '-ad-qmtwbs-level' })
                ),
                muted ? React__default.createElement('span', { className: playername$1 + '-ad-line-mute' }) : null
            );
        }
    }]);

    return AdBtnMute;
}(React.Component), _class2$7.propTypes = {
    player: playercore.PropTypes.object.isRequired
}, _temp2$4), (_applyDecoratedDescriptor$8(_class$19.prototype, 'update', [playercore.autobind], _Object$getOwnPropertyDescriptor(_class$19.prototype, 'update'), _class$19.prototype), _applyDecoratedDescriptor$8(_class$19.prototype, 'handleClick', [playercore.autobind], _Object$getOwnPropertyDescriptor(_class$19.prototype, 'handleClick'), _class$19.prototype)), _class$19);

var _class$18;
var _temp2$3;

// import AdPlayToggle from './AdPlayToggle';
// import AdFullScreenToggle from './AdFullScreenToggle';

var DEFAULT$10 = playercore.playerconfig.DEFAULT;
/**
 * @class AdControlBar
 */

var AdControlBar$1 = (_temp2$3 = _class$18 = function (_Component) {
    _inherits(AdControlBar, _Component);

    function AdControlBar() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, AdControlBar);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AdControlBar.__proto__ || _Object$getPrototypeOf(AdControlBar)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            url: null
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(AdControlBar, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var player = this.props.player;

            var type = player.vastAd.adUnit().type;
            if (type !== 'VPAID') {
                player.trigger(DEFAULT$10.EVENT.VAST_AD_VIDEO_SHOW);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var player = this.props.player;


            return React__default.createElement(
                'div',
                { className: 'Ad-controlBar' },
                React__default.createElement(AdBtnMute, { player: player })
            );
        }
    }]);

    return AdControlBar;
}(React.Component), _class$18.propTypes = {
    player: playercore.PropTypes.object.isRequired
}, _temp2$3);

var _class$15;
var _class2$4;
var _temp2;

function _applyDecoratedDescriptor$5(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

//import AdMuteToggle from './AdMuteToggle.jsx';
var DEFAULT$7 = playercore.playerconfig.DEFAULT;
var Ad$3 = (_class$15 = (_temp2 = _class2$4 = function (_Component) {
    _inherits(Ad, _Component);

    function Ad() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Ad);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Ad.__proto__ || _Object$getPrototypeOf(Ad)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            isShow: false
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Ad, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var player = this.props.player;

            player.on(DEFAULT$7.EVENT.AD_START, this._handleAdStart);
            player.on(DEFAULT$7.EVENT.AD_END, this._handleAdEnd);
            player.on(DEFAULT$7.EVENT.USER_SKIP_AD, this._handleAdSkip);
            player.on(DEFAULT$7.EVENT.VAST_AD_VIDEO_COMPLETE, this._handleAdMediaEnd);
            player.on(DEFAULT$7.EVENT.VPAID_AD_VIDEO_COMPLETE, this._handleAdMediaEnd);

            player.on(DEFAULT$7.EVENT.VAST_AD_VIDEO_START, this._handleVastStart);
            player.on(DEFAULT$7.EVENT.VPAID_AD_START, this._handleVpaidStart);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var player = this.props.player;

            player.off(DEFAULT$7.EVENT.AD_START, this._handleAdStart);
            player.off(DEFAULT$7.EVENT.AD_END, this._handleAdEnd);
            player.off(DEFAULT$7.EVENT.USER_SKIP_AD, this._handleAdSkip);
            player.off(DEFAULT$7.EVENT.VAST_AD_VIDEO_COMPLETE, this._handleAdMediaEnd);
            player.off(DEFAULT$7.EVENT.VPAID_AD_VIDEO_COMPLETE, this._handleAdMediaEnd);

            player.off(DEFAULT$7.EVENT.VAST_AD_VIDEO_START, this._handleVastStart);
            player.off(DEFAULT$7.EVENT.VPAID_AD_START, this._handleVpaidStart);
        }
    }, {
        key: '_handleAdStart',
        value: function _handleAdStart() {}
    }, {
        key: '_handleAdMediaEnd',
        value: function _handleAdMediaEnd() {
            this.setState({
                isShow: false
            });
        }
    }, {
        key: '_handleAdSkip',
        value: function _handleAdSkip() {
            this.setState({
                isShow: false
            });
        }
    }, {
        key: '_handleAdEnd',
        value: function _handleAdEnd() {
            this.setState({
                isShow: false
            });
        }
    }, {
        key: '_handleVastStart',
        value: function _handleVastStart() {
            this.setState({
                isShow: true
            });
        }
    }, {
        key: '_handleVpaidStart',
        value: function _handleVpaidStart() {
            this.setState({
                isShow: true
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var isShow = this.state.isShow;


            if (!isShow) {
                return null;
            }

            return React__default.createElement(
                'div',
                { className: 'ad-container', style: { width: '100%', height: '100%' } },
                React__default.createElement(ClickThrough, { key: 'clickThrough', player: this.props.player, ref: function ref(c) {
                        _this2.clickThrough = c;
                    } }),
                React__default.createElement(SkipToggle, { key: 'skipToggle', player: this.props.player, ref: function ref(c) {
                        _this2.skipToggle = c;
                    } }),
                React__default.createElement(AdControlBar$1, { key: 'adControlBar', player: this.props.player, ref: function ref(c) {
                        _this2.adControlBar = c;
                    } }),
                ','
            );
        }
    }]);

    return Ad;
}(React.Component), _class2$4.propTypes = {
    player: playercore.PropTypes.object.isRequired
}, _temp2), (_applyDecoratedDescriptor$5(_class$15.prototype, '_handleAdStart', [playercore.autobind], _Object$getOwnPropertyDescriptor(_class$15.prototype, '_handleAdStart'), _class$15.prototype), _applyDecoratedDescriptor$5(_class$15.prototype, '_handleAdMediaEnd', [playercore.autobind], _Object$getOwnPropertyDescriptor(_class$15.prototype, '_handleAdMediaEnd'), _class$15.prototype), _applyDecoratedDescriptor$5(_class$15.prototype, '_handleAdSkip', [playercore.autobind], _Object$getOwnPropertyDescriptor(_class$15.prototype, '_handleAdSkip'), _class$15.prototype), _applyDecoratedDescriptor$5(_class$15.prototype, '_handleAdEnd', [playercore.autobind], _Object$getOwnPropertyDescriptor(_class$15.prototype, '_handleAdEnd'), _class$15.prototype), _applyDecoratedDescriptor$5(_class$15.prototype, '_handleVastStart', [playercore.autobind], _Object$getOwnPropertyDescriptor(_class$15.prototype, '_handleVastStart'), _class$15.prototype), _applyDecoratedDescriptor$5(_class$15.prototype, '_handleVpaidStart', [playercore.autobind], _Object$getOwnPropertyDescriptor(_class$15.prototype, '_handleVpaidStart'), _class$15.prototype)), _class$15);

playercore__default.Vast = VastPlugin;

var AdsPlayerPlugin = function AdsPlayerPlugin() {
    var player = this;
    new AdsPlugin({ player: player });

    player.one('ready', function () {
        var _this = this;

        var ele = React__default.createElement(Ad$3, { key: 'ad', player: player, ref: function ref(c) {
                _this.container.ad = c;
            } });
        player.container.addChild(ele);
        var overlayAd = document.createElement('div');
        overlayAd.style.background = 'rgba(0,0,0,0.7)';
        overlayAd.style.transition = 'all 1s ease 0s';
        overlayAd.style.opacity = 0;
        Dom.addClass(overlayAd, 'overlay-ad');
        player.overlay.append(overlayAd);
    });
};

playercore__default.registerPlugin('AdsPlayerPlugin', AdsPlayerPlugin);

})));


 })();