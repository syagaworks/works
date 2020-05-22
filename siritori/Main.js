(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$element = _Browser_element;
var $author$project$Main$Model = F7(
	function (startWord, goalWord, lastLetter, message, history, editingStr, inputWords) {
		return {editingStr: editingStr, goalWord: goalWord, history: history, inputWords: inputWords, lastLetter: lastLetter, message: message, startWord: startWord};
	});
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $author$project$Main$NewGoal = function (a) {
	return {$: 'NewGoal', a: a};
};
var $elm$random$Random$Generate = function (a) {
	return {$: 'Generate', a: a};
};
var $elm$random$Random$Seed = F2(
	function (a, b) {
		return {$: 'Seed', a: a, b: b};
	});
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm$random$Random$next = function (_v0) {
	var state0 = _v0.a;
	var incr = _v0.b;
	return A2($elm$random$Random$Seed, ((state0 * 1664525) + incr) >>> 0, incr);
};
var $elm$random$Random$initialSeed = function (x) {
	var _v0 = $elm$random$Random$next(
		A2($elm$random$Random$Seed, 0, 1013904223));
	var state1 = _v0.a;
	var incr = _v0.b;
	var state2 = (state1 + x) >>> 0;
	return $elm$random$Random$next(
		A2($elm$random$Random$Seed, state2, incr));
};
var $elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $elm$time$Time$posixToMillis = function (_v0) {
	var millis = _v0.a;
	return millis;
};
var $elm$random$Random$init = A2(
	$elm$core$Task$andThen,
	function (time) {
		return $elm$core$Task$succeed(
			$elm$random$Random$initialSeed(
				$elm$time$Time$posixToMillis(time)));
	},
	$elm$time$Time$now);
var $elm$random$Random$step = F2(
	function (_v0, seed) {
		var generator = _v0.a;
		return generator(seed);
	});
var $elm$random$Random$onEffects = F3(
	function (router, commands, seed) {
		if (!commands.b) {
			return $elm$core$Task$succeed(seed);
		} else {
			var generator = commands.a.a;
			var rest = commands.b;
			var _v1 = A2($elm$random$Random$step, generator, seed);
			var value = _v1.a;
			var newSeed = _v1.b;
			return A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$random$Random$onEffects, router, rest, newSeed);
				},
				A2($elm$core$Platform$sendToApp, router, value));
		}
	});
var $elm$random$Random$onSelfMsg = F3(
	function (_v0, _v1, seed) {
		return $elm$core$Task$succeed(seed);
	});
var $elm$random$Random$Generator = function (a) {
	return {$: 'Generator', a: a};
};
var $elm$random$Random$map = F2(
	function (func, _v0) {
		var genA = _v0.a;
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v1 = genA(seed0);
				var a = _v1.a;
				var seed1 = _v1.b;
				return _Utils_Tuple2(
					func(a),
					seed1);
			});
	});
var $elm$random$Random$cmdMap = F2(
	function (func, _v0) {
		var generator = _v0.a;
		return $elm$random$Random$Generate(
			A2($elm$random$Random$map, func, generator));
	});
_Platform_effectManagers['Random'] = _Platform_createManager($elm$random$Random$init, $elm$random$Random$onEffects, $elm$random$Random$onSelfMsg, $elm$random$Random$cmdMap);
var $elm$random$Random$command = _Platform_leaf('Random');
var $elm$random$Random$generate = F2(
	function (tagger, generator) {
		return $elm$random$Random$command(
			$elm$random$Random$Generate(
				A2($elm$random$Random$map, tagger, generator)));
	});
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$Bitwise$xor = _Bitwise_xor;
var $elm$random$Random$peel = function (_v0) {
	var state = _v0.a;
	var word = (state ^ (state >>> ((state >>> 28) + 4))) * 277803737;
	return ((word >>> 22) ^ word) >>> 0;
};
var $elm$random$Random$int = F2(
	function (a, b) {
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v0 = (_Utils_cmp(a, b) < 0) ? _Utils_Tuple2(a, b) : _Utils_Tuple2(b, a);
				var lo = _v0.a;
				var hi = _v0.b;
				var range = (hi - lo) + 1;
				if (!((range - 1) & range)) {
					return _Utils_Tuple2(
						(((range - 1) & $elm$random$Random$peel(seed0)) >>> 0) + lo,
						$elm$random$Random$next(seed0));
				} else {
					var threshhold = (((-range) >>> 0) % range) >>> 0;
					var accountForBias = function (seed) {
						accountForBias:
						while (true) {
							var x = $elm$random$Random$peel(seed);
							var seedN = $elm$random$Random$next(seed);
							if (_Utils_cmp(x, threshhold) < 0) {
								var $temp$seed = seedN;
								seed = $temp$seed;
								continue accountForBias;
							} else {
								return _Utils_Tuple2((x % range) + lo, seedN);
							}
						}
					};
					return accountForBias(seed0);
				}
			});
	});
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $author$project$Main$words = $elm$core$Dict$fromList(
	_List_fromArray(
		[
			_Utils_Tuple2('じぶつ', '事物'),
			_Utils_Tuple2('ざつじ', '雑事'),
			_Utils_Tuple2('じこう', '事項'),
			_Utils_Tuple2('ひもく', '費目'),
			_Utils_Tuple2('じょう', '条'),
			_Utils_Tuple2('くだり', 'くだり'),
			_Utils_Tuple2('よけん', '与件'),
			_Utils_Tuple2('しょよ', '所与'),
			_Utils_Tuple2('そのぎ', 'その儀'),
			_Utils_Tuple2('よのぎ', '余の儀'),
			_Utils_Tuple2('べつぎ', '別儀'),
			_Utils_Tuple2('べつじ', '別事'),
			_Utils_Tuple2('いちじ', '一事'),
			_Utils_Tuple2('ばんじ', '万事'),
			_Utils_Tuple2('しょじ', '諸事'),
			_Utils_Tuple2('けえす', 'ケース'),
			_Utils_Tuple2('じたい', '事態'),
			_Utils_Tuple2('じけん', '事件'),
			_Utils_Tuple2('ちんじ', '珍事'),
			_Utils_Tuple2('じへん', '事変'),
			_Utils_Tuple2('いへん', '異変'),
			_Utils_Tuple2('へんじ', '変事'),
			_Utils_Tuple2('さんじ', '惨事'),
			_Utils_Tuple2('だいじ', '大事'),
			_Utils_Tuple2('さいじ', '細事'),
			_Utils_Tuple2('きちじ', '吉事'),
			_Utils_Tuple2('かいじ', '快事'),
			_Utils_Tuple2('きせき', '奇跡・奇蹟'),
			_Utils_Tuple2('さわぎ', '騒ぎ'),
			_Utils_Tuple2('のうじ', '能事'),
			_Utils_Tuple2('こうじ', '後事'),
			_Utils_Tuple2('おうじ', '往事'),
			_Utils_Tuple2('こちら', 'こちら'),
			_Utils_Tuple2('これら', 'これら'),
			_Utils_Tuple2('そちら', 'そちら'),
			_Utils_Tuple2('それら', 'それら'),
			_Utils_Tuple2('あちら', 'あちら'),
			_Utils_Tuple2('あれら', 'あれら'),
			_Utils_Tuple2('どっち', 'どっち'),
			_Utils_Tuple2('どちら', 'どちら'),
			_Utils_Tuple2('いずれ', 'いずれ'),
			_Utils_Tuple2('どれか', 'どれか'),
			_Utils_Tuple2('なんら', '何ら'),
			_Utils_Tuple2('なにか', '何か'),
			_Utils_Tuple2('なんか', '何か'),
			_Utils_Tuple2('たしゃ', '他者'),
			_Utils_Tuple2('たほう', '他方'),
			_Utils_Tuple2('そのた', 'その他'),
			_Utils_Tuple2('べっこ', '別個'),
			_Utils_Tuple2('しんぎ', '真偽'),
			_Utils_Tuple2('しんぴ', '真否'),
			_Utils_Tuple2('じっぴ', '実否'),
			_Utils_Tuple2('じっぷ', '実否'),
			_Utils_Tuple2('はいり', '背理'),
			_Utils_Tuple2('しんり', '真理'),
			_Utils_Tuple2('まこと', '誠'),
			_Utils_Tuple2('ほんま', 'ほんま'),
			_Utils_Tuple2('じじつ', '事実'),
			_Utils_Tuple2('じっち', '実地'),
			_Utils_Tuple2('しんか', '真価'),
			_Utils_Tuple2('しじつ', '史実'),
			_Utils_Tuple2('きょぎ', '虚偽'),
			_Utils_Tuple2('かせい', '仮性'),
			_Utils_Tuple2('ためし', '試し'),
			_Utils_Tuple2('ふしぎ', '不思議'),
			_Utils_Tuple2('せいひ', '正否'),
			_Utils_Tuple2('ふせい', '不正'),
			_Utils_Tuple2('かふか', '可不可'),
			_Utils_Tuple2('とうひ', '当否'),
			_Utils_Tuple2('げのげ', '下の下'),
			_Utils_Tuple2('まとも', 'まとも'),
			_Utils_Tuple2('ふへん', '不偏'),
			_Utils_Tuple2('こたい', '個体'),
			_Utils_Tuple2('じしん', '自身'),
			_Utils_Tuple2('じゅう', '従'),
			_Utils_Tuple2('ぶがい', '部外'),
			_Utils_Tuple2('どがい', '度外'),
			_Utils_Tuple2('えたい', '得体'),
			_Utils_Tuple2('きたい', '機体'),
			_Utils_Tuple2('ぎぶつ', '偽物'),
			_Utils_Tuple2('だいり', '代理'),
			_Utils_Tuple2('かわり', 'かわり'),
			_Utils_Tuple2('だみい', 'ダミー'),
			_Utils_Tuple2('ひかえ', '控え'),
			_Utils_Tuple2('こうほ', '候補'),
			_Utils_Tuple2('ほじょ', '補助'),
			_Utils_Tuple2('ほけつ', '補欠'),
			_Utils_Tuple2('みほん', '見本'),
			_Utils_Tuple2('もけい', '模型'),
			_Utils_Tuple2('もしき', '模式'),
			_Utils_Tuple2('でえた', 'データ'),
			_Utils_Tuple2('そざい', '素材'),
			_Utils_Tuple2('めえん', 'メーン'),
			_Utils_Tuple2('たぐい', 'たぐい'),
			_Utils_Tuple2('ぶるい', '部類'),
			_Utils_Tuple2('ぶもん', '部門'),
			_Utils_Tuple2('へいか', '兵科'),
			_Utils_Tuple2('きしゅ', '機種'),
			_Utils_Tuple2('いしゅ', '異種'),
			_Utils_Tuple2('たしゅ', '多種'),
			_Utils_Tuple2('たいぷ', 'タイプ'),
			_Utils_Tuple2('いしき', '違式'),
			_Utils_Tuple2('かたい', '歌体'),
			_Utils_Tuple2('しけい', '詩形・詩型'),
			_Utils_Tuple2('りゅう', '流'),
			_Utils_Tuple2('いこん', 'イコン'),
			_Utils_Tuple2('もはん', '模範'),
			_Utils_Tuple2('きかん', '亀鑑'),
			_Utils_Tuple2('かがみ', 'かがみ'),
			_Utils_Tuple2('てほん', '手本'),
			_Utils_Tuple2('もでる', 'モデル'),
			_Utils_Tuple2('じれい', '事例'),
			_Utils_Tuple2('くらい', '位'),
			_Utils_Tuple2('きゅう', '級'),
			_Utils_Tuple2('くらす', 'クラス'),
			_Utils_Tuple2('らんく', 'ランク'),
			_Utils_Tuple2('そうい', '層位'),
			_Utils_Tuple2('かんい', '冠位'),
			_Utils_Tuple2('いかい', '位階'),
			_Utils_Tuple2('だんい', '段位'),
			_Utils_Tuple2('ちゅう', '中'),
			_Utils_Tuple2('かとう', '下等'),
			_Utils_Tuple2('かそう', '下層'),
			_Utils_Tuple2('とっぷ', 'トップ'),
			_Utils_Tuple2('のるま', 'ノルマ'),
			_Utils_Tuple2('れべる', 'レベル'),
			_Utils_Tuple2('らいん', 'ライン'),
			_Utils_Tuple2('めやす', '目安'),
			_Utils_Tuple2('ふみえ', '踏み絵'),
			_Utils_Tuple2('ほんい', '本位'),
			_Utils_Tuple2('どうい', '同位'),
			_Utils_Tuple2('こうい', '高位'),
			_Utils_Tuple2('ていい', '低位'),
			_Utils_Tuple2('すじめ', '筋目'),
			_Utils_Tuple2('ちすじ', '血筋'),
			_Utils_Tuple2('けなみ', '毛並み'),
			_Utils_Tuple2('かけい', '家系'),
			_Utils_Tuple2('ふけい', '父系'),
			_Utils_Tuple2('ぼけい', '母系'),
			_Utils_Tuple2('わかれ', '分かれ'),
			_Utils_Tuple2('けいふ', '系譜'),
			_Utils_Tuple2('けいず', '系図'),
			_Utils_Tuple2('りんく', 'リンク'),
			_Utils_Tuple2('かんよ', '関与・干与'),
			_Utils_Tuple2('あいだ', '間'),
			_Utils_Tuple2('ふかま', '深間'),
			_Utils_Tuple2('ふなか', '不仲'),
			_Utils_Tuple2('えにし', 'えにし'),
			_Utils_Tuple2('きえん', '機縁'),
			_Utils_Tuple2('うえん', '有縁'),
			_Utils_Tuple2('むえん', '無縁'),
			_Utils_Tuple2('ふえん', '不縁'),
			_Utils_Tuple2('ちなみ', 'ちなみ'),
			_Utils_Tuple2('えんこ', '縁故'),
			_Utils_Tuple2('きずな', 'きずな'),
			_Utils_Tuple2('てづる', '手づる'),
			_Utils_Tuple2('ちえん', '地縁'),
			_Utils_Tuple2('ちょく', '直'),
			_Utils_Tuple2('いきょ', '依拠'),
			_Utils_Tuple2('いそん', '依存'),
			_Utils_Tuple2('いぞん', '依存'),
			_Utils_Tuple2('きほん', '基本'),
			_Utils_Tuple2('もとい', '基'),
			_Utils_Tuple2('きてい', '基底'),
			_Utils_Tuple2('きばん', '基盤'),
			_Utils_Tuple2('したじ', '下地'),
			_Utils_Tuple2('こっし', '骨子'),
			_Utils_Tuple2('ぼたい', '母胎'),
			_Utils_Tuple2('べえす', 'ベース'),
			_Utils_Tuple2('ねもと', '根元'),
			_Utils_Tuple2('おこり', '起こり'),
			_Utils_Tuple2('きげん', '起源'),
			_Utils_Tuple2('るうつ', 'ルーツ'),
			_Utils_Tuple2('ごげん', '語源・語原'),
			_Utils_Tuple2('じげん', '字源'),
			_Utils_Tuple2('ゆもと', '湯元・湯本'),
			_Utils_Tuple2('そおす', 'ソース'),
			_Utils_Tuple2('かこん', '禍根'),
			_Utils_Tuple2('ゆらい', '由来'),
			_Utils_Tuple2('えんぎ', '縁起'),
			_Utils_Tuple2('ゆかり', 'ゆかり'),
			_Utils_Tuple2('ゆえん', '由縁'),
			_Utils_Tuple2('いんが', '因果'),
			_Utils_Tuple2('すくせ', '宿世'),
			_Utils_Tuple2('いんゆ', '因由'),
			_Utils_Tuple2('いんし', '因子'),
			_Utils_Tuple2('きいん', '起因・基因'),
			_Utils_Tuple2('そいん', '素因'),
			_Utils_Tuple2('しいん', '死因'),
			_Utils_Tuple2('よすが', 'よすが'),
			_Utils_Tuple2('どうき', '動機'),
			_Utils_Tuple2('けっか', '結果'),
			_Utils_Tuple2('きけつ', '帰結'),
			_Utils_Tuple2('きすう', '帰趨'),
			_Utils_Tuple2('せいか', '成果'),
			_Utils_Tuple2('せんか', '戦果'),
			_Utils_Tuple2('こうか', '効果'),
			_Utils_Tuple2('ひっし', '必至'),
			_Utils_Tuple2('まぐれ', 'まぐれ'),
			_Utils_Tuple2('ききめ', '効き目'),
			_Utils_Tuple2('さよう', '作用'),
			_Utils_Tuple2('むこう', '無効'),
			_Utils_Tuple2('いこう', '偉効'),
			_Utils_Tuple2('きこう', '奇効'),
			_Utils_Tuple2('しるし', 'しるし'),
			_Utils_Tuple2('おかげ', 'お陰'),
			_Utils_Tuple2('むくい', '報い'),
			_Utils_Tuple2('かほう', '果報'),
			_Utils_Tuple2('よとく', '余徳'),
			_Utils_Tuple2('よけい', '余慶'),
			_Utils_Tuple2('よおう', '余殃'),
			_Utils_Tuple2('あおり', 'あおり'),
			_Utils_Tuple2('りゆう', '理由'),
			_Utils_Tuple2('じゆう', '事由'),
			_Utils_Tuple2('むじつ', '無実'),
			_Utils_Tuple2('むこん', '無根'),
			_Utils_Tuple2('かくう', '架空'),
			_Utils_Tuple2('いわれ', 'いわれ'),
			_Utils_Tuple2('ねなし', '根なし'),
			_Utils_Tuple2('めあて', '目当て'),
			_Utils_Tuple2('もくと', '目途'),
			_Utils_Tuple2('ようと', '用途'),
			_Utils_Tuple2('てだて', '手だて'),
			_Utils_Tuple2('げんち', '言質'),
			_Utils_Tuple2('あかし', 'あかし'),
			_Utils_Tuple2('きめて', '決め手'),
			_Utils_Tuple2('そうご', '相互'),
			_Utils_Tuple2('こうご', '交互'),
			_Utils_Tuple2('たがい', '互い'),
			_Utils_Tuple2('こおう', '呼応'),
			_Utils_Tuple2('たいひ', '対比'),
			_Utils_Tuple2('たいち', '対置'),
			_Utils_Tuple2('ひかく', '比較'),
			_Utils_Tuple2('ぎゃく', '逆'),
			_Utils_Tuple2('はいち', '背馳'),
			_Utils_Tuple2('かいり', '乖離'),
			_Utils_Tuple2('いどう', '異同'),
			_Utils_Tuple2('ひとつ', '一つ'),
			_Utils_Tuple2('そろい', 'そろい'),
			_Utils_Tuple2('まんま', 'まんま'),
			_Utils_Tuple2('るいじ', '類似'),
			_Utils_Tuple2('そうじ', '相似'),
			_Utils_Tuple2('きんじ', '近似'),
			_Utils_Tuple2('こくじ', '酷似'),
			_Utils_Tuple2('そらに', '空似'),
			_Utils_Tuple2('まがい', 'まがい'),
			_Utils_Tuple2('もどき', 'もどき'),
			_Utils_Tuple2('まぎれ', '紛れ'),
			_Utils_Tuple2('いしつ', '異質'),
			_Utils_Tuple2('いせい', '異姓'),
			_Utils_Tuple2('とうか', '等価'),
			_Utils_Tuple2('とうち', '等値'),
			_Utils_Tuple2('とうさ', '等差'),
			_Utils_Tuple2('ふとう', '不等'),
			_Utils_Tuple2('いっち', '一致'),
			_Utils_Tuple2('がっち', '合致'),
			_Utils_Tuple2('まっち', 'マッチ'),
			_Utils_Tuple2('ふごう', '符合'),
			_Utils_Tuple2('ちがい', '違い'),
			_Utils_Tuple2('さとう', '差等'),
			_Utils_Tuple2('ふどう', '不同'),
			_Utils_Tuple2('せいさ', '性差'),
			_Utils_Tuple2('くべつ', '区別'),
			_Utils_Tuple2('さべつ', '差別'),
			_Utils_Tuple2('かばあ', 'カバー'),
			_Utils_Tuple2('れんさ', '連鎖'),
			_Utils_Tuple2('れんざ', '連座'),
			_Utils_Tuple2('つなぎ', 'つなぎ'),
			_Utils_Tuple2('ふぞく', '付属・附属'),
			_Utils_Tuple2('きぞく', '帰属'),
			_Utils_Tuple2('ふたい', '付帯・附帯'),
			_Utils_Tuple2('ふずい', '付随・附随'),
			_Utils_Tuple2('えいり', '絵入り'),
			_Utils_Tuple2('かいむ', '皆無'),
			_Utils_Tuple2('ぜつむ', '絶無'),
			_Utils_Tuple2('そんぴ', '存否'),
			_Utils_Tuple2('ふめつ', '不滅'),
			_Utils_Tuple2('きそん', '既存'),
			_Utils_Tuple2('きぞん', '既存'),
			_Utils_Tuple2('たいき', '待機'),
			_Utils_Tuple2('ざいこ', '在庫'),
			_Utils_Tuple2('ざいい', '在位'),
			_Utils_Tuple2('ざいや', '在野'),
			_Utils_Tuple2('ざいふ', '在府'),
			_Utils_Tuple2('ふざい', '不在'),
			_Utils_Tuple2('むじん', '無人'),
			_Utils_Tuple2('くうそ', '空疎'),
			_Utils_Tuple2('きせい', '既製'),
			_Utils_Tuple2('けんび', '兼備'),
			_Utils_Tuple2('かんび', '完備'),
			_Utils_Tuple2('ぐそく', '具足'),
			_Utils_Tuple2('こゆう', '固有'),
			_Utils_Tuple2('ぐげん', '具現'),
			_Utils_Tuple2('ていき', '提起'),
			_Utils_Tuple2('ていじ', '呈示'),
			_Utils_Tuple2('ばくろ', '暴露'),
			_Utils_Tuple2('ろけん', '露見・露顕'),
			_Utils_Tuple2('ろこう', '露光'),
			_Utils_Tuple2('いだし', '鋳出し'),
			_Utils_Tuple2('ろてい', '露呈'),
			_Utils_Tuple2('むがい', '無蓋'),
			_Utils_Tuple2('ろあく', '露悪'),
			_Utils_Tuple2('はつろ', '発露'),
			_Utils_Tuple2('はっき', '発揮'),
			_Utils_Tuple2('ひとく', '秘匿'),
			_Utils_Tuple2('しゅひ', '守秘'),
			_Utils_Tuple2('しのび', '忍び'),
			_Utils_Tuple2('ひみつ', '秘密'),
			_Utils_Tuple2('あんぶ', '暗部'),
			_Utils_Tuple2('みつじ', '密事'),
			_Utils_Tuple2('きみつ', '機密'),
			_Utils_Tuple2('ごくひ', '極秘'),
			_Utils_Tuple2('げんぴ', '厳秘'),
			_Utils_Tuple2('まるひ', 'マル秘'),
			_Utils_Tuple2('すうき', '枢機'),
			_Utils_Tuple2('ぐんき', '軍機'),
			_Utils_Tuple2('てんき', '天機'),
			_Utils_Tuple2('きざし', '兆し'),
			_Utils_Tuple2('ちょう', '兆'),
			_Utils_Tuple2('きずい', '奇瑞'),
			_Utils_Tuple2('ほうが', '萌芽'),
			_Utils_Tuple2('めばえ', '芽生え'),
			_Utils_Tuple2('うまれ', '生まれ'),
			_Utils_Tuple2('せいき', '生起'),
			_Utils_Tuple2('ほっき', '発起'),
			_Utils_Tuple2('ほうき', '蜂起'),
			_Utils_Tuple2('けいき', '継起'),
			_Utils_Tuple2('はせい', '派生'),
			_Utils_Tuple2('じはつ', '自発'),
			_Utils_Tuple2('ふはつ', '不発'),
			_Utils_Tuple2('たはつ', '多発'),
			_Utils_Tuple2('こうき', '興起'),
			_Utils_Tuple2('ふっこ', '復古'),
			_Utils_Tuple2('さいき', '再起'),
			_Utils_Tuple2('しあげ', '仕上げ'),
			_Utils_Tuple2('みかん', '未完'),
			_Utils_Tuple2('みせい', '未成'),
			_Utils_Tuple2('しかけ', '仕かけ'),
			_Utils_Tuple2('みのり', '実り'),
			_Utils_Tuple2('しくみ', '仕組み'),
			_Utils_Tuple2('そしき', '組織'),
			_Utils_Tuple2('こうず', '構図'),
			_Utils_Tuple2('そせい', '組成'),
			_Utils_Tuple2('じりつ', '自立'),
			_Utils_Tuple2('こりつ', '孤立'),
			_Utils_Tuple2('ゆうり', '遊離'),
			_Utils_Tuple2('そうぶ', '創部'),
			_Utils_Tuple2('そかく', '組閣'),
			_Utils_Tuple2('そんち', '存置'),
			_Utils_Tuple2('せっち', '設置'),
			_Utils_Tuple2('もうけ', '設け'),
			_Utils_Tuple2('きせつ', '既設'),
			_Utils_Tuple2('みせつ', '未設'),
			_Utils_Tuple2('しせつ', '私設'),
			_Utils_Tuple2('かせつ', '仮設'),
			_Utils_Tuple2('だいち', '代置'),
			_Utils_Tuple2('へいち', '併置'),
			_Utils_Tuple2('ふせつ', '付設・附設'),
			_Utils_Tuple2('とりつ', '都立'),
			_Utils_Tuple2('ふりつ', '府立'),
			_Utils_Tuple2('くりつ', '区立'),
			_Utils_Tuple2('しりつ', '市立'),
			_Utils_Tuple2('ほぞん', '保存'),
			_Utils_Tuple2('きいぷ', 'キープ'),
			_Utils_Tuple2('けんじ', '堅持'),
			_Utils_Tuple2('こしゅ', '固守'),
			_Utils_Tuple2('ほぜん', '保全'),
			_Utils_Tuple2('ほしゅ', '保守'),
			_Utils_Tuple2('ほおん', '保温'),
			_Utils_Tuple2('ほしつ', '保湿'),
			_Utils_Tuple2('せえぶ', 'セーブ'),
			_Utils_Tuple2('ひもち', '日持ち'),
			_Utils_Tuple2('ざんち', '残置'),
			_Utils_Tuple2('ほうち', '放置'),
			_Utils_Tuple2('のこり', '残り'),
			_Utils_Tuple2('なごり', '名残'),
			_Utils_Tuple2('きょむ', '虚無'),
			_Utils_Tuple2('むさん', '霧散'),
			_Utils_Tuple2('じめつ', '自滅'),
			_Utils_Tuple2('しめつ', '死滅'),
			_Utils_Tuple2('はめつ', '破滅'),
			_Utils_Tuple2('ぜっけ', '絶家'),
			_Utils_Tuple2('こかつ', '枯渇'),
			_Utils_Tuple2('かじょ', '加除'),
			_Utils_Tuple2('はいし', '廃止'),
			_Utils_Tuple2('はいぶ', '廃部'),
			_Utils_Tuple2('くじょ', '駆除'),
			_Utils_Tuple2('だっし', '脱脂'),
			_Utils_Tuple2('とうた', '淘汰'),
			_Utils_Tuple2('くりあ', 'クリア'),
			_Utils_Tuple2('きけん', '棄権'),
			_Utils_Tuple2('ほうか', '放下'),
			_Utils_Tuple2('ほうげ', '放下'),
			_Utils_Tuple2('はいき', '廃棄'),
			_Utils_Tuple2('とうき', '投棄'),
			_Utils_Tuple2('かっと', 'カット'),
			_Utils_Tuple2('りゃく', '略'),
			_Utils_Tuple2('まびき', '間引き'),
			_Utils_Tuple2('いそう', '位相'),
			_Utils_Tuple2('じそう', '事相'),
			_Utils_Tuple2('せそう', '世相'),
			_Utils_Tuple2('ねうち', '値打ち'),
			_Utils_Tuple2('もよう', '模様'),
			_Utils_Tuple2('ようす', '様子'),
			_Utils_Tuple2('しだい', '次第'),
			_Utils_Tuple2('いかん', 'いかん'),
			_Utils_Tuple2('りめん', '裏面'),
			_Utils_Tuple2('せたい', '世態'),
			_Utils_Tuple2('きらい', '嫌い'),
			_Utils_Tuple2('じせい', '時勢'),
			_Utils_Tuple2('あんき', '安危'),
			_Utils_Tuple2('あんぴ', '安否'),
			_Utils_Tuple2('けはい', '気配'),
			_Utils_Tuple2('けしき', '気色'),
			_Utils_Tuple2('ひとけ', '人気'),
			_Utils_Tuple2('きぶん', '気分'),
			_Utils_Tuple2('くうき', '空気'),
			_Utils_Tuple2('おおら', 'オーラ'),
			_Utils_Tuple2('れいき', '霊気'),
			_Utils_Tuple2('さっき', '殺気'),
			_Utils_Tuple2('ようき', '妖気'),
			_Utils_Tuple2('がしゅ', '雅趣'),
			_Utils_Tuple2('いんち', '韻致'),
			_Utils_Tuple2('むうど', 'ムード'),
			_Utils_Tuple2('ししゅ', '詩趣'),
			_Utils_Tuple2('はいみ', '俳味'),
			_Utils_Tuple2('ぜんみ', '禅味'),
			_Utils_Tuple2('やしゅ', '野趣'),
			_Utils_Tuple2('かるみ', '軽み'),
			_Utils_Tuple2('こあじ', '小味'),
			_Utils_Tuple2('ふうち', '風致'),
			_Utils_Tuple2('ふぜい', '風情'),
			_Utils_Tuple2('ひっち', '筆致'),
			_Utils_Tuple2('ぐあい', '具合'),
			_Utils_Tuple2('つごう', '都合'),
			_Utils_Tuple2('かって', '勝手'),
			_Utils_Tuple2('ふしん', '不振'),
			_Utils_Tuple2('かげん', '加減'),
			_Utils_Tuple2('ふでき', '不出来'),
			_Utils_Tuple2('みばえ', '見栄え'),
			_Utils_Tuple2('きばえ', '着栄え'),
			_Utils_Tuple2('きふう', '気風'),
			_Utils_Tuple2('しふう', '詩風'),
			_Utils_Tuple2('かふう', '歌風'),
			_Utils_Tuple2('がふう', '画風'),
			_Utils_Tuple2('くふう', '句風'),
			_Utils_Tuple2('わふう', '話風'),
			_Utils_Tuple2('そとめ', '外目'),
			_Utils_Tuple2('ひそう', '皮相'),
			_Utils_Tuple2('みかけ', '見掛け'),
			_Utils_Tuple2('みつき', '見付き'),
			_Utils_Tuple2('みため', '見た目'),
			_Utils_Tuple2('びかん', '美観'),
			_Utils_Tuple2('てそう', '手相'),
			_Utils_Tuple2('ちそう', '地相'),
			_Utils_Tuple2('しそう', '死相'),
			_Utils_Tuple2('みぶり', '身振り'),
			_Utils_Tuple2('てぶり', '手振り'),
			_Utils_Tuple2('てつき', '手付き'),
			_Utils_Tuple2('めつき', '目付き'),
			_Utils_Tuple2('めいろ', '目色'),
			_Utils_Tuple2('めがお', '目顔'),
			_Utils_Tuple2('みなり', '身なり'),
			_Utils_Tuple2('ねぞう', '寝相'),
			_Utils_Tuple2('すがた', '姿'),
			_Utils_Tuple2('ようし', '容姿'),
			_Utils_Tuple2('ふうし', '風姿'),
			_Utils_Tuple2('いろか', '色香'),
			_Utils_Tuple2('ゆうし', '勇姿'),
			_Utils_Tuple2('えいし', '英姿'),
			_Utils_Tuple2('いよう', '威容・偉容'),
			_Utils_Tuple2('いふう', '威風'),
			_Utils_Tuple2('なかみ', '中身・中味'),
			_Utils_Tuple2('ようそ', '要素'),
			_Utils_Tuple2('しさい', '子細'),
			_Utils_Tuple2('つくり', 'つくり'),
			_Utils_Tuple2('づくり', '－づくり'),
			_Utils_Tuple2('まどり', '間取り'),
			_Utils_Tuple2('かまえ', '構え'),
			_Utils_Tuple2('ひんい', '品位'),
			_Utils_Tuple2('しょう', '性'),
			_Utils_Tuple2('そしつ', '素質'),
			_Utils_Tuple2('ししつ', '資質'),
			_Utils_Tuple2('びしつ', '美質'),
			_Utils_Tuple2('きしつ', '気質'),
			_Utils_Tuple2('がしつ', '画質'),
			_Utils_Tuple2('じがね', '地金'),
			_Utils_Tuple2('どしつ', '土質'),
			_Utils_Tuple2('じしつ', '地質'),
			_Utils_Tuple2('きぐち', '木口'),
			_Utils_Tuple2('ひしつ', '皮質'),
			_Utils_Tuple2('こせい', '個性'),
			_Utils_Tuple2('てんぷ', '天賦'),
			_Utils_Tuple2('しせい', '資性'),
			_Utils_Tuple2('ぼせい', '母性'),
			_Utils_Tuple2('てんし', '天資'),
			_Utils_Tuple2('やせい', '野性'),
			_Utils_Tuple2('ちせい', '知性'),
			_Utils_Tuple2('りせい', '理性'),
			_Utils_Tuple2('たいか', '耐火'),
			_Utils_Tuple2('だせい', '惰性'),
			_Utils_Tuple2('からあ', 'カラー'),
			_Utils_Tuple2('いさい', '異彩'),
			_Utils_Tuple2('いたい', '異体'),
			_Utils_Tuple2('とりえ', '取り柄'),
			_Utils_Tuple2('りてん', '利点'),
			_Utils_Tuple2('びてん', '美点'),
			_Utils_Tuple2('おてん', '汚点'),
			_Utils_Tuple2('にがて', '苦手'),
			_Utils_Tuple2('ひけめ', '引け目'),
			_Utils_Tuple2('つよみ', '強み'),
			_Utils_Tuple2('よわみ', '弱み'),
			_Utils_Tuple2('かきん', '瑕瑾'),
			_Utils_Tuple2('ふつう', '普通'),
			_Utils_Tuple2('ひぼん', '非凡'),
			_Utils_Tuple2('みぞう', '未曾有'),
			_Utils_Tuple2('ぜつご', '絶後'),
			_Utils_Tuple2('いれい', '異例'),
			_Utils_Tuple2('みょう', '妙'),
			_Utils_Tuple2('えきす', 'エキス'),
			_Utils_Tuple2('りょう', '良'),
			_Utils_Tuple2('べすと', 'ベスト'),
			_Utils_Tuple2('じぜん', '次善'),
			_Utils_Tuple2('てきひ', '適否'),
			_Utils_Tuple2('だとう', '妥当'),
			_Utils_Tuple2('てきど', '適度'),
			_Utils_Tuple2('ぶなん', '無難'),
			_Utils_Tuple2('こうこ', '好個'),
			_Utils_Tuple2('ふむき', '不向き'),
			_Utils_Tuple2('にあい', '似合い'),
			_Utils_Tuple2('かぶん', '過分'),
			_Utils_Tuple2('はんぱ', '半端'),
			_Utils_Tuple2('せつど', '節度'),
			_Utils_Tuple2('はかく', '破格'),
			_Utils_Tuple2('くるい', '狂い'),
			_Utils_Tuple2('はたん', '破綻'),
			_Utils_Tuple2('かいい', '怪異'),
			_Utils_Tuple2('みだれ', '乱れ'),
			_Utils_Tuple2('かおす', 'カオス'),
			_Utils_Tuple2('めちゃ', 'めちゃ'),
			_Utils_Tuple2('はらん', '波瀾・波乱'),
			_Utils_Tuple2('ほつれ', 'ほつれ'),
			_Utils_Tuple2('ぶざつ', '蕪雑'),
			_Utils_Tuple2('もつれ', 'もつれ'),
			_Utils_Tuple2('こじれ', 'こじれ'),
			_Utils_Tuple2('かんわ', '緩和'),
			_Utils_Tuple2('しかん', '弛緩'),
			_Utils_Tuple2('しまり', '締まり'),
			_Utils_Tuple2('ゆるみ', '緩み'),
			_Utils_Tuple2('たるみ', 'たるみ'),
			_Utils_Tuple2('そみつ', '粗密・疎密'),
			_Utils_Tuple2('せいそ', '精粗'),
			_Utils_Tuple2('かみつ', '過密'),
			_Utils_Tuple2('こうち', '巧緻'),
			_Utils_Tuple2('はんさ', '煩瑣'),
			_Utils_Tuple2('はんた', '煩多'),
			_Utils_Tuple2('かんそ', '簡素'),
			_Utils_Tuple2('せいり', '整理'),
			_Utils_Tuple2('せいび', '整備'),
			_Utils_Tuple2('もうら', '網羅'),
			_Utils_Tuple2('しまつ', '始末'),
			_Utils_Tuple2('さわり', '障り'),
			_Utils_Tuple2('そんじ', '損じ'),
			_Utils_Tuple2('はそん', '破損'),
			_Utils_Tuple2('はかい', '破壊'),
			_Utils_Tuple2('おそん', '汚損'),
			_Utils_Tuple2('けがれ', '汚れ'),
			_Utils_Tuple2('すたり', '廃り'),
			_Utils_Tuple2('こうぶ', '荒蕪'),
			_Utils_Tuple2('ぜんび', '善美'),
			_Utils_Tuple2('しゅう', '醜'),
			_Utils_Tuple2('ゆうび', '優美'),
			_Utils_Tuple2('ぜつび', '絶美'),
			_Utils_Tuple2('そうび', '壮美'),
			_Utils_Tuple2('ようび', '妖美'),
			_Utils_Tuple2('びれい', '美麗'),
			_Utils_Tuple2('ゆうが', '優雅'),
			_Utils_Tuple2('まじり', 'まじり'),
			_Utils_Tuple2('ふけつ', '不潔'),
			_Utils_Tuple2('なんい', '難易'),
			_Utils_Tuple2('かのう', '可能'),
			_Utils_Tuple2('ふのう', '不能'),
			_Utils_Tuple2('かさん', '可算'),
			_Utils_Tuple2('ふかし', '不可視'),
			_Utils_Tuple2('かどく', '可読'),
			_Utils_Tuple2('かねん', '可燃'),
			_Utils_Tuple2('かよう', '可溶'),
			_Utils_Tuple2('かどう', '可動'),
			_Utils_Tuple2('かはん', '可搬'),
			_Utils_Tuple2('なんぎ', '難儀'),
			_Utils_Tuple2('へいい', '平易'),
			_Utils_Tuple2('べんり', '便利'),
			_Utils_Tuple2('べんぎ', '便宜'),
			_Utils_Tuple2('りべん', '利便'),
			_Utils_Tuple2('ふべん', '不便'),
			_Utils_Tuple2('むじこ', '無事故'),
			_Utils_Tuple2('りすく', 'リスク'),
			_Utils_Tuple2('ちから', '力'),
			_Utils_Tuple2('りょく', '力'),
			_Utils_Tuple2('ばりき', '馬力'),
			_Utils_Tuple2('ぱわあ', 'パワー'),
			_Utils_Tuple2('きょう', '強'),
			_Utils_Tuple2('ぱんち', 'パンチ'),
			_Utils_Tuple2('むてき', '無敵'),
			_Utils_Tuple2('じりき', '自力'),
			_Utils_Tuple2('たりき', '他力'),
			_Utils_Tuple2('ひりき', '非力'),
			_Utils_Tuple2('じゃく', '弱'),
			_Utils_Tuple2('しれつ', '熾烈'),
			_Utils_Tuple2('まさつ', '摩擦'),
			_Utils_Tuple2('ゆあつ', '油圧'),
			_Utils_Tuple2('きあつ', '気圧'),
			_Utils_Tuple2('ひとで', '人手'),
			_Utils_Tuple2('せいい', '勢威'),
			_Utils_Tuple2('ぼうい', '暴威'),
			_Utils_Tuple2('もうい', '猛威'),
			_Utils_Tuple2('よせい', '余勢'),
			_Utils_Tuple2('ごせい', '語勢'),
			_Utils_Tuple2('きのう', '機能'),
			_Utils_Tuple2('かごう', '化合'),
			_Utils_Tuple2('へんか', '変化'),
			_Utils_Tuple2('かへん', '可変'),
			_Utils_Tuple2('へんい', '変異'),
			_Utils_Tuple2('ふえき', '不易'),
			_Utils_Tuple2('ふてい', '不定'),
			_Utils_Tuple2('うごき', '動き'),
			_Utils_Tuple2('るてん', '流転'),
			_Utils_Tuple2('てんい', '転移'),
			_Utils_Tuple2('てんか', '転化'),
			_Utils_Tuple2('せんい', '遷移'),
			_Utils_Tuple2('すいい', '推移'),
			_Utils_Tuple2('とっか', '特化'),
			_Utils_Tuple2('どうか', '同化'),
			_Utils_Tuple2('ふうか', '風化'),
			_Utils_Tuple2('えきか', '液化'),
			_Utils_Tuple2('たんか', '炭化'),
			_Utils_Tuple2('せっか', '石化'),
			_Utils_Tuple2('あっか', '悪化'),
			_Utils_Tuple2('れっか', '劣化'),
			_Utils_Tuple2('げきか', '激化・劇化'),
			_Utils_Tuple2('どんか', '鈍化'),
			_Utils_Tuple2('ぞっか', '俗化'),
			_Utils_Tuple2('おうか', '欧化'),
			_Utils_Tuple2('としか', '都市化'),
			_Utils_Tuple2('いしん', '維新'),
			_Utils_Tuple2('かいそ', '改組'),
			_Utils_Tuple2('ぜせい', '是正'),
			_Utils_Tuple2('なおし', '直し'),
			_Utils_Tuple2('しふと', 'シフト'),
			_Utils_Tuple2('だかん', '兌換'),
			_Utils_Tuple2('ごかん', '互換'),
			_Utils_Tuple2('ちかん', '置換'),
			_Utils_Tuple2('かいし', '開始'),
			_Utils_Tuple2('はじめ', '始め'),
			_Utils_Tuple2('みそめ', '見初め'),
			_Utils_Tuple2('そうし', '創始'),
			_Utils_Tuple2('かいき', '開基'),
			_Utils_Tuple2('びらき', '－開き'),
			_Utils_Tuple2('でぞめ', '出初め'),
			_Utils_Tuple2('おわり', '終わり'),
			_Utils_Tuple2('しまい', 'しまい'),
			_Utils_Tuple2('へいし', '閉止'),
			_Utils_Tuple2('へいさ', '閉鎖'),
			_Utils_Tuple2('あがり', '上がり'),
			_Utils_Tuple2('とどめ', 'とどめ'),
			_Utils_Tuple2('たいむ', 'タイム'),
			_Utils_Tuple2('たんま', 'たんま'),
			_Utils_Tuple2('ぽおず', 'ポーズ'),
			_Utils_Tuple2('こやみ', '小やみ'),
			_Utils_Tuple2('おやみ', '小やみ'),
			_Utils_Tuple2('とぎれ', 'とぎれ'),
			_Utils_Tuple2('とぜつ', '途絶・杜絶'),
			_Utils_Tuple2('ていし', '停止'),
			_Utils_Tuple2('せいし', '静止'),
			_Utils_Tuple2('ざせつ', '挫折'),
			_Utils_Tuple2('とんざ', '頓挫'),
			_Utils_Tuple2('はどめ', '歯止め'),
			_Utils_Tuple2('かはく', '仮泊'),
			_Utils_Tuple2('つづき', '続き'),
			_Utils_Tuple2('じぞく', '持続'),
			_Utils_Tuple2('どおし', '－通し'),
			_Utils_Tuple2('ぱなし', '－放し'),
			_Utils_Tuple2('りれえ', 'リレー'),
			_Utils_Tuple2('よつぎ', '世継ぎ'),
			_Utils_Tuple2('しどう', '始動'),
			_Utils_Tuple2('きどう', '起動'),
			_Utils_Tuple2('さどう', '作動'),
			_Utils_Tuple2('じどう', '自動'),
			_Utils_Tuple2('たどう', '他動'),
			_Utils_Tuple2('くどう', '駆動'),
			_Utils_Tuple2('ふるえ', '震え'),
			_Utils_Tuple2('こどう', '鼓動'),
			_Utils_Tuple2('はどう', '波動'),
			_Utils_Tuple2('びどう', '微動'),
			_Utils_Tuple2('はずみ', '弾み'),
			_Utils_Tuple2('はじき', 'はじき'),
			_Utils_Tuple2('てぶれ', '手振れ'),
			_Utils_Tuple2('じてん', '自転'),
			_Utils_Tuple2('すぴん', 'スピン'),
			_Utils_Tuple2('らんぶ', '乱舞'),
			_Utils_Tuple2('こてい', '固定'),
			_Utils_Tuple2('ていち', '定置'),
			_Utils_Tuple2('あんち', '安置'),
			_Utils_Tuple2('ちんざ', '鎮座'),
			_Utils_Tuple2('しずめ', '鎮め'),
			_Utils_Tuple2('もやい', 'もやい'),
			_Utils_Tuple2('さけい', '左傾'),
			_Utils_Tuple2('うけい', '右傾'),
			_Utils_Tuple2('かえり', '返り'),
			_Utils_Tuple2('かえし', '返し'),
			_Utils_Tuple2('すわり', '据わり'),
			_Utils_Tuple2('べっち', '別置'),
			_Utils_Tuple2('けいじ', '掲示'),
			_Utils_Tuple2('ささえ', '支え'),
			_Utils_Tuple2('つるし', 'つるし'),
			_Utils_Tuple2('すいか', '垂下'),
			_Utils_Tuple2('もたせ', '持たせ'),
			_Utils_Tuple2('びこう', '微行'),
			_Utils_Tuple2('やこう', '夜行'),
			_Utils_Tuple2('ほこう', '歩行'),
			_Utils_Tuple2('ひこう', '飛行'),
			_Utils_Tuple2('とこう', '渡航'),
			_Utils_Tuple2('うかい', '迂回'),
			_Utils_Tuple2('だこう', '蛇行'),
			_Utils_Tuple2('はこう', '跛行'),
			_Utils_Tuple2('うせつ', '右折'),
			_Utils_Tuple2('させつ', '左折'),
			_Utils_Tuple2('かあぶ', 'カーブ'),
			_Utils_Tuple2('るろう', '流浪'),
			_Utils_Tuple2('かてい', '過程'),
			_Utils_Tuple2('けいか', '経過'),
			_Utils_Tuple2('けいい', '経緯'),
			_Utils_Tuple2('あゆみ', '歩み'),
			_Utils_Tuple2('けいゆ', '経由'),
			_Utils_Tuple2('けいろ', '経路・径路'),
			_Utils_Tuple2('いちろ', '一路'),
			_Utils_Tuple2('いっと', '一途'),
			_Utils_Tuple2('こおす', 'コース'),
			_Utils_Tuple2('るうと', 'ルート'),
			_Utils_Tuple2('かいろ', '回路'),
			_Utils_Tuple2('えんろ', '遠路'),
			_Utils_Tuple2('べっと', '別途'),
			_Utils_Tuple2('かつろ', '活路'),
			_Utils_Tuple2('しんろ', '進路'),
			_Utils_Tuple2('せいと', '征途'),
			_Utils_Tuple2('たいろ', '退路'),
			_Utils_Tuple2('けつろ', '血路'),
			_Utils_Tuple2('こうろ', '行路'),
			_Utils_Tuple2('たびじ', '旅路'),
			_Utils_Tuple2('いえじ', '家路'),
			_Utils_Tuple2('よみじ', '黄泉路'),
			_Utils_Tuple2('りくろ', '陸路'),
			_Utils_Tuple2('すいろ', '水路'),
			_Utils_Tuple2('なみじ', '波路'),
			_Utils_Tuple2('しおじ', '潮路'),
			_Utils_Tuple2('ふなじ', '船路'),
			_Utils_Tuple2('くうろ', '空路'),
			_Utils_Tuple2('やまじ', '山路'),
			_Utils_Tuple2('よみち', '夜道'),
			_Utils_Tuple2('やみじ', 'やみ路'),
			_Utils_Tuple2('おうろ', '往路'),
			_Utils_Tuple2('ふくろ', '復路'),
			_Utils_Tuple2('つまり', '詰まり'),
			_Utils_Tuple2('うつり', '移り'),
			_Utils_Tuple2('いてん', '移転'),
			_Utils_Tuple2('てんち', '転地'),
			_Utils_Tuple2('せんと', '遷都'),
			_Utils_Tuple2('わたり', '渡り'),
			_Utils_Tuple2('とよう', '渡洋'),
			_Utils_Tuple2('とかい', '渡海'),
			_Utils_Tuple2('とべい', '渡米'),
			_Utils_Tuple2('とふつ', '渡仏'),
			_Utils_Tuple2('とおう', '渡欧'),
			_Utils_Tuple2('でかけ', '出掛け'),
			_Utils_Tuple2('はつば', '発馬'),
			_Utils_Tuple2('おたち', 'お立ち'),
			_Utils_Tuple2('かどで', '門出'),
			_Utils_Tuple2('よだち', '夜立ち'),
			_Utils_Tuple2('ちはつ', '遅発'),
			_Utils_Tuple2('そうと', '壮途'),
			_Utils_Tuple2('ゆうと', '雄途'),
			_Utils_Tuple2('すだち', '巣立ち'),
			_Utils_Tuple2('りりく', '離陸'),
			_Utils_Tuple2('ふなで', '船出'),
			_Utils_Tuple2('でふね', '出船'),
			_Utils_Tuple2('でぶね', '出船'),
			_Utils_Tuple2('しはつ', '始発'),
			_Utils_Tuple2('ちゃく', '着'),
			_Utils_Tuple2('おつき', 'お着き'),
			_Utils_Tuple2('みとう', '未到'),
			_Utils_Tuple2('あるき', '歩き'),
			_Utils_Tuple2('いっぽ', '一歩'),
			_Utils_Tuple2('そくほ', '速歩'),
			_Utils_Tuple2('かっぽ', '闊歩'),
			_Utils_Tuple2('はしり', '走り'),
			_Utils_Tuple2('しっく', '疾駆'),
			_Utils_Tuple2('ほっぷ', 'ホップ'),
			_Utils_Tuple2('ひやく', '飛躍'),
			_Utils_Tuple2('ながれ', '流れ'),
			_Utils_Tuple2('ながし', '流し'),
			_Utils_Tuple2('ふゆう', '浮遊'),
			_Utils_Tuple2('すべり', '滑り'),
			_Utils_Tuple2('なだれ', '雪崩'),
			_Utils_Tuple2('めぐり', '巡り'),
			_Utils_Tuple2('まわし', '回し'),
			_Utils_Tuple2('じゅん', '巡'),
			_Utils_Tuple2('そつう', '疎通'),
			_Utils_Tuple2('とおり', '通り'),
			_Utils_Tuple2('つうか', '通過'),
			_Utils_Tuple2('そうは', '走破'),
			_Utils_Tuple2('とうは', '踏破'),
			_Utils_Tuple2('いっか', '一過'),
			_Utils_Tuple2('くぐり', 'くぐり'),
			_Utils_Tuple2('とおし', '通し'),
			_Utils_Tuple2('つうき', '通気'),
			_Utils_Tuple2('でんぱ', '伝播'),
			_Utils_Tuple2('るでん', '流伝'),
			_Utils_Tuple2('こうふ', '弘布'),
			_Utils_Tuple2('るずう', '流通'),
			_Utils_Tuple2('ふうび', '風靡'),
			_Utils_Tuple2('ひっと', 'ヒット'),
			_Utils_Tuple2('ぐほう', '弘法'),
			_Utils_Tuple2('びまん', '瀰漫'),
			_Utils_Tuple2('ばっこ', '跋扈'),
			_Utils_Tuple2('どっぽ', '独歩'),
			_Utils_Tuple2('りいど', 'リード'),
			_Utils_Tuple2('せんく', '先駆'),
			_Utils_Tuple2('ぜんく', '前駆'),
			_Utils_Tuple2('ゆうち', '誘致'),
			_Utils_Tuple2('おとも', 'お供'),
			_Utils_Tuple2('らくご', '落伍・落後'),
			_Utils_Tuple2('ついび', '追尾'),
			_Utils_Tuple2('おくり', '送り'),
			_Utils_Tuple2('よにげ', '夜逃げ'),
			_Utils_Tuple2('とっぱ', '突破'),
			_Utils_Tuple2('かくざ', '擱坐'),
			_Utils_Tuple2('さてつ', '蹉跌'),
			_Utils_Tuple2('たあん', 'ターン'),
			_Utils_Tuple2('ばっく', 'バック'),
			_Utils_Tuple2('たいげ', '退下'),
			_Utils_Tuple2('じきょ', '辞去'),
			_Utils_Tuple2('そこう', '遡行'),
			_Utils_Tuple2('さいか', '西下'),
			_Utils_Tuple2('ゆきき', '行き来'),
			_Utils_Tuple2('いきき', '行き来'),
			_Utils_Tuple2('かよい', '通い'),
			_Utils_Tuple2('げこう', '下校'),
			_Utils_Tuple2('じさん', '持参'),
			_Utils_Tuple2('とらい', '渡来'),
			_Utils_Tuple2('ひらい', '飛来'),
			_Utils_Tuple2('らいが', '来駕'),
			_Utils_Tuple2('らいじ', '来示'),
			_Utils_Tuple2('おいで', 'おいで'),
			_Utils_Tuple2('おなり', 'お成り'),
			_Utils_Tuple2('とぎょ', '渡御'),
			_Utils_Tuple2('みゆき', 'みゆき'),
			_Utils_Tuple2('ごこう', '御幸'),
			_Utils_Tuple2('ふにん', '赴任'),
			_Utils_Tuple2('のぼり', '上り'),
			_Utils_Tuple2('くだし', '下し'),
			_Utils_Tuple2('もどり', '戻り'),
			_Utils_Tuple2('ふっき', '復帰'),
			_Utils_Tuple2('きさん', '帰参'),
			_Utils_Tuple2('げはん', '下阪'),
			_Utils_Tuple2('きらく', '帰洛'),
			_Utils_Tuple2('きはん', '帰阪'),
			_Utils_Tuple2('きとう', '帰島'),
			_Utils_Tuple2('きそう', '帰巣'),
			_Utils_Tuple2('きたく', '帰宅'),
			_Utils_Tuple2('きしゃ', '帰社'),
			_Utils_Tuple2('きこく', '帰国'),
			_Utils_Tuple2('きにん', '帰任'),
			_Utils_Tuple2('でいり', '出入り'),
			_Utils_Tuple2('こだし', '小出し'),
			_Utils_Tuple2('たこう', '他行'),
			_Utils_Tuple2('ばっし', '抜糸'),
			_Utils_Tuple2('おさめ', 'おさめ'),
			_Utils_Tuple2('おくら', 'お蔵'),
			_Utils_Tuple2('いこみ', '鋳込み'),
			_Utils_Tuple2('つつみ', '包み'),
			_Utils_Tuple2('ぱっく', 'パック'),
			_Utils_Tuple2('たとう', 'たとう'),
			_Utils_Tuple2('おおい', '覆い'),
			_Utils_Tuple2('ひふく', '被覆'),
			_Utils_Tuple2('ひまく', '被膜'),
			_Utils_Tuple2('ゆまく', '油膜'),
			_Utils_Tuple2('ほうい', '包囲'),
			_Utils_Tuple2('かこみ', '囲み'),
			_Utils_Tuple2('かこい', '囲い'),
			_Utils_Tuple2('さがり', '下がり'),
			_Utils_Tuple2('おろし', 'おろし'),
			_Utils_Tuple2('あっぷ', 'アップ'),
			_Utils_Tuple2('だうん', 'ダウン'),
			_Utils_Tuple2('かこう', '下降'),
			_Utils_Tuple2('ていか', '低下'),
			_Utils_Tuple2('とざん', '登山'),
			_Utils_Tuple2('とはん', '登坂'),
			_Utils_Tuple2('げざん', '下山'),
			_Utils_Tuple2('ひよう', '飛揚'),
			_Utils_Tuple2('ふよう', '浮揚'),
			_Utils_Tuple2('かすい', '下垂'),
			_Utils_Tuple2('らっか', '落下'),
			_Utils_Tuple2('らくば', '落馬'),
			_Utils_Tuple2('てきか', '滴下'),
			_Utils_Tuple2('げしゃ', '下車'),
			_Utils_Tuple2('げせん', '下船'),
			_Utils_Tuple2('にづみ', '荷積み'),
			_Utils_Tuple2('のづみ', '野積み'),
			_Utils_Tuple2('ふちん', '浮沈'),
			_Utils_Tuple2('しずみ', '沈み'),
			_Utils_Tuple2('ちんか', '沈下'),
			_Utils_Tuple2('じちん', '自沈'),
			_Utils_Tuple2('もぐり', '潜り'),
			_Utils_Tuple2('りごう', '離合'),
			_Utils_Tuple2('きいつ', '帰一'),
			_Utils_Tuple2('ゆごう', '癒合'),
			_Utils_Tuple2('こんわ', '混和'),
			_Utils_Tuple2('であい', '出会い'),
			_Utils_Tuple2('まとめ', 'まとめ'),
			_Utils_Tuple2('くくり', 'くくり'),
			_Utils_Tuple2('つがい', 'つがい'),
			_Utils_Tuple2('からみ', '絡み'),
			_Utils_Tuple2('がらみ', '－がらみ'),
			_Utils_Tuple2('ぐるみ', '－ぐるみ'),
			_Utils_Tuple2('むすび', '結び'),
			_Utils_Tuple2('しばり', '縛り'),
			_Utils_Tuple2('にぶん', '二分'),
			_Utils_Tuple2('ひわれ', '干割れ'),
			_Utils_Tuple2('ぶんき', '分岐'),
			_Utils_Tuple2('ぶんか', '分化'),
			_Utils_Tuple2('さんさ', '三叉'),
			_Utils_Tuple2('ぶんち', '分地'),
			_Utils_Tuple2('りさん', '離散'),
			_Utils_Tuple2('そかい', '疎開'),
			_Utils_Tuple2('しさん', '四散'),
			_Utils_Tuple2('ひさん', '飛散'),
			_Utils_Tuple2('さんぷ', '散布'),
			_Utils_Tuple2('さっぷ', '撒布'),
			_Utils_Tuple2('ひらき', '開き'),
			_Utils_Tuple2('さこう', '鎖港'),
			_Utils_Tuple2('かいか', '開架'),
			_Utils_Tuple2('かいひ', '開扉'),
			_Utils_Tuple2('へいひ', '閉扉'),
			_Utils_Tuple2('さこく', '鎖国'),
			_Utils_Tuple2('ふうじ', '封じ'),
			_Utils_Tuple2('ふうさ', '封鎖'),
			_Utils_Tuple2('てづめ', '手詰め'),
			_Utils_Tuple2('たっち', 'タッチ'),
			_Utils_Tuple2('はずれ', '外れ'),
			_Utils_Tuple2('はなれ', '離れ'),
			_Utils_Tuple2('りそん', '離村'),
			_Utils_Tuple2('りとう', '離島'),
			_Utils_Tuple2('りにち', '離日'),
			_Utils_Tuple2('りにん', '離任'),
			_Utils_Tuple2('りせき', '離席'),
			_Utils_Tuple2('りすい', '離水'),
			_Utils_Tuple2('りがん', '離岸'),
			_Utils_Tuple2('りだつ', '離脱'),
			_Utils_Tuple2('へだて', '隔て'),
			_Utils_Tuple2('かくり', '隔離'),
			_Utils_Tuple2('ぶんり', '分離'),
			_Utils_Tuple2('たんり', '単離'),
			_Utils_Tuple2('はくり', '剥離'),
			_Utils_Tuple2('あたり', '当たり'),
			_Utils_Tuple2('あてみ', '当て身'),
			_Utils_Tuple2('たたき', 'たたき'),
			_Utils_Tuple2('だぼく', '打撲'),
			_Utils_Tuple2('おうだ', '殴打'),
			_Utils_Tuple2('びんた', 'びんた'),
			_Utils_Tuple2('だげき', '打撃'),
			_Utils_Tuple2('つうだ', '痛打'),
			_Utils_Tuple2('らんだ', '乱打'),
			_Utils_Tuple2('れんだ', '連打'),
			_Utils_Tuple2('けいだ', '軽打'),
			_Utils_Tuple2('こうだ', '巧打'),
			_Utils_Tuple2('おさえ', '押さえ'),
			_Utils_Tuple2('ぷれす', 'プレス'),
			_Utils_Tuple2('ねおし', '寝押し'),
			_Utils_Tuple2('てずれ', '手擦れ'),
			_Utils_Tuple2('さっか', '擦過'),
			_Utils_Tuple2('まめつ', '摩滅'),
			_Utils_Tuple2('まそん', '摩損'),
			_Utils_Tuple2('まもう', '磨耗'),
			_Utils_Tuple2('げんま', '減摩'),
			_Utils_Tuple2('どんま', '鈍磨'),
			_Utils_Tuple2('ふせぎ', '防ぎ'),
			_Utils_Tuple2('ぼうし', '防止'),
			_Utils_Tuple2('よくし', '抑止'),
			_Utils_Tuple2('どどめ', '土止め'),
			_Utils_Tuple2('わどめ', '輪留め'),
			_Utils_Tuple2('よぼう', '予防'),
			_Utils_Tuple2('ぼうふ', '防腐'),
			_Utils_Tuple2('ぼうう', '防雨'),
			_Utils_Tuple2('ぼうか', '防火'),
			_Utils_Tuple2('ひよけ', '火よけ'),
			_Utils_Tuple2('ひけし', '火消し'),
			_Utils_Tuple2('ぼうさ', '防砂'),
			_Utils_Tuple2('ぼうお', '防汚'),
			_Utils_Tuple2('ねっく', 'ネック'),
			_Utils_Tuple2('そがい', '阻害'),
			_Utils_Tuple2('じゃま', '邪魔'),
			_Utils_Tuple2('ひなん', '避難'),
			_Utils_Tuple2('ひたい', '避退'),
			_Utils_Tuple2('しのぎ', '－しのぎ'),
			_Utils_Tuple2('ひずみ', 'ひずみ'),
			_Utils_Tuple2('ゆがみ', 'ゆがみ'),
			_Utils_Tuple2('まるめ', '丸め'),
			_Utils_Tuple2('きふく', '起伏'),
			_Utils_Tuple2('でばり', '出張り'),
			_Utils_Tuple2('とっき', '突起'),
			_Utils_Tuple2('へこみ', 'へこみ'),
			_Utils_Tuple2('くぼみ', 'くぼみ'),
			_Utils_Tuple2('ちぢれ', '縮れ'),
			_Utils_Tuple2('じのし', '地のし'),
			_Utils_Tuple2('まがり', '曲がり'),
			_Utils_Tuple2('ねじれ', 'ねじれ'),
			_Utils_Tuple2('よじれ', 'よじれ'),
			_Utils_Tuple2('ひぞり', '干反り'),
			_Utils_Tuple2('たわみ', 'たわみ'),
			_Utils_Tuple2('たたみ', '畳み'),
			_Utils_Tuple2('まくれ', 'まくれ'),
			_Utils_Tuple2('めくれ', 'めくれ'),
			_Utils_Tuple2('めくり', 'めくり'),
			_Utils_Tuple2('しぼり', '絞り'),
			_Utils_Tuple2('きざみ', '刻み'),
			_Utils_Tuple2('もこく', '模刻'),
			_Utils_Tuple2('すかし', '透かし'),
			_Utils_Tuple2('きぼり', '木彫り'),
			_Utils_Tuple2('しょく', '蝕'),
			_Utils_Tuple2('わぎり', '輪切り'),
			_Utils_Tuple2('きれつ', '亀裂'),
			_Utils_Tuple2('やぶれ', '破れ'),
			_Utils_Tuple2('たいは', '大破'),
			_Utils_Tuple2('つぶれ', 'つぶれ'),
			_Utils_Tuple2('つぶし', 'つぶし'),
			_Utils_Tuple2('はさい', '破砕'),
			_Utils_Tuple2('ばくは', '爆破'),
			_Utils_Tuple2('はっぱ', '発破'),
			_Utils_Tuple2('はれつ', '破裂'),
			_Utils_Tuple2('ぱんく', 'パンク'),
			_Utils_Tuple2('じばく', '自爆'),
			_Utils_Tuple2('がかい', '瓦解'),
			_Utils_Tuple2('くずれ', '崩れ'),
			_Utils_Tuple2('なんぱ', '難破'),
			_Utils_Tuple2('いたみ', 'いたみ'),
			_Utils_Tuple2('そおと', 'ソート'),
			_Utils_Tuple2('られつ', '羅列'),
			_Utils_Tuple2('とれつ', '堵列'),
			_Utils_Tuple2('しっぴ', '櫛比'),
			_Utils_Tuple2('そうか', '層化'),
			_Utils_Tuple2('ぞうか', '増加'),
			_Utils_Tuple2('ぷらす', 'プラス'),
			_Utils_Tuple2('ついか', '追加'),
			_Utils_Tuple2('だぶり', 'ダブり'),
			_Utils_Tuple2('ばいか', '倍加'),
			_Utils_Tuple2('るいか', '累加'),
			_Utils_Tuple2('びぞう', '微増'),
			_Utils_Tuple2('ぞうし', '増資'),
			_Utils_Tuple2('かねつ', '加熱'),
			_Utils_Tuple2('かしつ', '加湿'),
			_Utils_Tuple2('かそく', '加速'),
			_Utils_Tuple2('かあつ', '加圧'),
			_Utils_Tuple2('よあつ', '与圧'),
			_Utils_Tuple2('かぞう', '加増'),
			_Utils_Tuple2('かれい', '加齢'),
			_Utils_Tuple2('めべり', '目減り'),
			_Utils_Tuple2('げんし', '減資'),
			_Utils_Tuple2('おまけ', 'おまけ'),
			_Utils_Tuple2('ほそく', '補足'),
			_Utils_Tuple2('ついほ', '追補'),
			_Utils_Tuple2('ぞうほ', '増補'),
			_Utils_Tuple2('ほてん', '補填'),
			_Utils_Tuple2('てんぽ', '填補'),
			_Utils_Tuple2('ほてい', '補綴'),
			_Utils_Tuple2('ほてつ', '補綴'),
			_Utils_Tuple2('ほせい', '補整'),
			_Utils_Tuple2('そうほ', '相補'),
			_Utils_Tuple2('ほかん', '補完'),
			_Utils_Tuple2('じそく', '自足'),
			_Utils_Tuple2('ほうわ', '飽和'),
			_Utils_Tuple2('せのび', '背伸び'),
			_Utils_Tuple2('ちぢみ', '縮み'),
			_Utils_Tuple2('せばめ', '狭め'),
			_Utils_Tuple2('のうか', '濃化'),
			_Utils_Tuple2('さしゆ', '差し湯'),
			_Utils_Tuple2('えいこ', '栄枯'),
			_Utils_Tuple2('しんぽ', '進歩'),
			_Utils_Tuple2('すいび', '衰微'),
			_Utils_Tuple2('おちめ', '落ち目'),
			_Utils_Tuple2('たいほ', '退歩'),
			_Utils_Tuple2('ろうか', '老化'),
			_Utils_Tuple2('かぎり', '限り'),
			_Utils_Tuple2('むそう', '無双'),
			_Utils_Tuple2('むるい', '無類'),
			_Utils_Tuple2('くっし', '屈指'),
			_Utils_Tuple2('ひけん', '比肩'),
			_Utils_Tuple2('ひるい', '比類'),
			_Utils_Tuple2('まさり', '勝り'),
			_Utils_Tuple2('はだし', '－はだし'),
			_Utils_Tuple2('おとり', '劣り'),
			_Utils_Tuple2('うわて', '上手'),
			_Utils_Tuple2('のうひ', '能否'),
			_Utils_Tuple2('じかん', '時間'),
			_Utils_Tuple2('あわあ', 'アワー'),
			_Utils_Tuple2('どうじ', '同時'),
			_Utils_Tuple2('まのび', '間延び'),
			_Utils_Tuple2('つきひ', '月日'),
			_Utils_Tuple2('ひあし', '日足・日脚'),
			_Utils_Tuple2('あいま', '合間'),
			_Utils_Tuple2('まあい', '間合い'),
			_Utils_Tuple2('たえま', '絶え間'),
			_Utils_Tuple2('なみま', '波間'),
			_Utils_Tuple2('あまま', '雨間'),
			_Utils_Tuple2('あめま', '雨間'),
			_Utils_Tuple2('ゆきま', '雪間'),
			_Utils_Tuple2('いとま', 'いとま'),
			_Utils_Tuple2('すんか', '寸暇'),
			_Utils_Tuple2('たねん', '多年'),
			_Utils_Tuple2('せつな', '刹那'),
			_Utils_Tuple2('すんじ', '寸時'),
			_Utils_Tuple2('しゅゆ', '須臾'),
			_Utils_Tuple2('しばし', 'しばし'),
			_Utils_Tuple2('ひごろ', '日ごろ'),
			_Utils_Tuple2('ふだん', '普段'),
			_Utils_Tuple2('へいそ', '平素'),
			_Utils_Tuple2('いつか', 'いつか'),
			_Utils_Tuple2('そのひ', 'その日'),
			_Utils_Tuple2('あるひ', 'ある日'),
			_Utils_Tuple2('きかい', '機会'),
			_Utils_Tuple2('つぎほ', '継ぎ穂'),
			_Utils_Tuple2('つぎは', '継ぎ端'),
			_Utils_Tuple2('みごろ', '見ごろ'),
			_Utils_Tuple2('てきじ', '適時'),
			_Utils_Tuple2('きうん', '機運'),
			_Utils_Tuple2('せんき', '戦機'),
			_Utils_Tuple2('ぴんち', 'ピンチ'),
			_Utils_Tuple2('ここう', '虎口'),
			_Utils_Tuple2('そつじ', '卒爾'),
			_Utils_Tuple2('りんき', '臨機'),
			_Utils_Tuple2('おうせ', '逢瀬'),
			_Utils_Tuple2('でばん', '出番'),
			_Utils_Tuple2('きじつ', '期日'),
			_Utils_Tuple2('ひどり', '日取り'),
			_Utils_Tuple2('のうき', '納期'),
			_Utils_Tuple2('こんき', '婚期'),
			_Utils_Tuple2('じこく', '時刻'),
			_Utils_Tuple2('じぶん', '時分'),
			_Utils_Tuple2('き・ご', '期'),
			_Utils_Tuple2('ふしめ', '節目'),
			_Utils_Tuple2('みぎり', 'みぎり'),
			_Utils_Tuple2('りんじ', '臨時'),
			_Utils_Tuple2('やさき', '矢先'),
			_Utils_Tuple2('まぎわ', '間際'),
			_Utils_Tuple2('しにめ', '死に目'),
			_Utils_Tuple2('いまわ', 'いまわ'),
			_Utils_Tuple2('とたん', '途端'),
			_Utils_Tuple2('ついで', 'ついで'),
			_Utils_Tuple2('でがけ', '出掛け'),
			_Utils_Tuple2('でしな', '出しな'),
			_Utils_Tuple2('でぎわ', '出際'),
			_Utils_Tuple2('ねぎわ', '寝際'),
			_Utils_Tuple2('ねしな', '寝しな'),
			_Utils_Tuple2('ひづけ', '日付'),
			_Utils_Tuple2('にちじ', '日時'),
			_Utils_Tuple2('がっぴ', '月日'),
			_Utils_Tuple2('たんび', '度'),
			_Utils_Tuple2('まいど', '毎度'),
			_Utils_Tuple2('まいじ', '毎次'),
			_Utils_Tuple2('なんど', '何度'),
			_Utils_Tuple2('いくど', '幾度'),
			_Utils_Tuple2('いちど', '一度'),
			_Utils_Tuple2('にちや', '日夜'),
			_Utils_Tuple2('ひごと', '日ごと'),
			_Utils_Tuple2('ひまし', '日増し'),
			_Utils_Tuple2('まいよ', '毎夜'),
			_Utils_Tuple2('よごと', '夜ごと'),
			_Utils_Tuple2('れんや', '連夜'),
			_Utils_Tuple2('ずいじ', '随時'),
			_Utils_Tuple2('ゆうき', '有期'),
			_Utils_Tuple2('たんき', '短期'),
			_Utils_Tuple2('ぜんき', '全期'),
			_Utils_Tuple2('はんき', '半期'),
			_Utils_Tuple2('そうき', '早期'),
			_Utils_Tuple2('しょき', '初期'),
			_Utils_Tuple2('ばんき', '晩期'),
			_Utils_Tuple2('まっき', '末期'),
			_Utils_Tuple2('かみき', '上期'),
			_Utils_Tuple2('しもき', '下期'),
			_Utils_Tuple2('らいき', '来期'),
			_Utils_Tuple2('ねんき', '年季'),
			_Utils_Tuple2('にんき', '任期'),
			_Utils_Tuple2('きまつ', '期末'),
			_Utils_Tuple2('しゅん', '旬'),
			_Utils_Tuple2('じせつ', '時節'),
			_Utils_Tuple2('がっき', '学期'),
			_Utils_Tuple2('ぎょき', '漁期'),
			_Utils_Tuple2('さかり', '盛り'),
			_Utils_Tuple2('かっき', '画期'),
			_Utils_Tuple2('てっき', '適期'),
			_Utils_Tuple2('かとき', '過渡期'),
			_Utils_Tuple2('ときわ', 'ときわ'),
			_Utils_Tuple2('ちとせ', 'ちとせ'),
			_Utils_Tuple2('せんこ', '千古'),
			_Utils_Tuple2('ばんこ', '万古'),
			_Utils_Tuple2('くおん', '久遠'),
			_Utils_Tuple2('ひとよ', '一世'),
			_Utils_Tuple2('らいふ', 'ライフ'),
			_Utils_Tuple2('いちご', '一期'),
			_Utils_Tuple2('ぜんせ', '前世'),
			_Utils_Tuple2('らいせ', '来世'),
			_Utils_Tuple2('こんせ', '今世'),
			_Utils_Tuple2('みどる', 'ミドル'),
			_Utils_Tuple2('しがく', '志学'),
			_Utils_Tuple2('ふわく', '不惑'),
			_Utils_Tuple2('ちめい', '知命'),
			_Utils_Tuple2('きじゅ', '喜寿'),
			_Utils_Tuple2('きのじ', '喜の字'),
			_Utils_Tuple2('はたち', '二十・二十歳'),
			_Utils_Tuple2('みそじ', '三十路'),
			_Utils_Tuple2('よそじ', '四十路'),
			_Utils_Tuple2('いそじ', '五十路'),
			_Utils_Tuple2('やそじ', '八十路'),
			_Utils_Tuple2('ようじ', '幼時'),
			_Utils_Tuple2('まつろ', '末路'),
			_Utils_Tuple2('じだい', '時代'),
			_Utils_Tuple2('せだい', '世代'),
			_Utils_Tuple2('いっせ', '一世'),
			_Utils_Tuple2('げんせ', '現世'),
			_Utils_Tuple2('まっせ', '末世'),
			_Utils_Tuple2('だくせ', '濁世'),
			_Utils_Tuple2('へいじ', '平時'),
			_Utils_Tuple2('せんじ', '戦時'),
			_Utils_Tuple2('せいじ', '盛時'),
			_Utils_Tuple2('たいこ', '太古'),
			_Utils_Tuple2('かみよ', '神代'),
			_Utils_Tuple2('せんし', '先史'),
			_Utils_Tuple2('こだい', '古代'),
			_Utils_Tuple2('きんこ', '近古'),
			_Utils_Tuple2('せんご', '戦後'),
			_Utils_Tuple2('めいじ', '明治'),
			_Utils_Tuple2('けんむ', '建武'),
			_Utils_Tuple2('かんき', '乾季'),
			_Utils_Tuple2('さまあ', 'サマー'),
			_Utils_Tuple2('なつば', '夏場'),
			_Utils_Tuple2('しょか', '初夏'),
			_Utils_Tuple2('えんか', '炎夏'),
			_Utils_Tuple2('まなつ', '真夏'),
			_Utils_Tuple2('ばんか', '晩夏'),
			_Utils_Tuple2('れいか', '冷夏'),
			_Utils_Tuple2('ふゆば', '冬場'),
			_Utils_Tuple2('まふゆ', '真冬'),
			_Utils_Tuple2('こはる', '小春'),
			_Utils_Tuple2('ひなが', '日長・日永'),
			_Utils_Tuple2('よなが', '夜長'),
			_Utils_Tuple2('ちじつ', '遅日'),
			_Utils_Tuple2('なつび', '夏日'),
			_Utils_Tuple2('ふゆび', '冬日'),
			_Utils_Tuple2('りっか', '立夏'),
			_Utils_Tuple2('いやあ', 'イヤー'),
			_Utils_Tuple2('きねん', '紀年'),
			_Utils_Tuple2('ねんじ', '年時'),
			_Utils_Tuple2('ねんど', '年度'),
			_Utils_Tuple2('ぼしん', '戊辰'),
			_Utils_Tuple2('むつき', '睦月'),
			_Utils_Tuple2('やよい', '弥生'),
			_Utils_Tuple2('うづき', '卯月'),
			_Utils_Tuple2('さつき', '五月'),
			_Utils_Tuple2('はづき', '葉月'),
			_Utils_Tuple2('しわす', '師走'),
			_Utils_Tuple2('どよう', '土曜'),
			_Utils_Tuple2('どにち', '土日'),
			_Utils_Tuple2('はつか', '二十日'),
			_Utils_Tuple2('みそか', 'みそか'),
			_Utils_Tuple2('よじつ', '余日'),
			_Utils_Tuple2('やすみ', '休み'),
			_Utils_Tuple2('ひがら', '日柄'),
			_Utils_Tuple2('ひなみ', '日並み'),
			_Utils_Tuple2('かじつ', '佳日'),
			_Utils_Tuple2('かしん', '佳辰'),
			_Utils_Tuple2('やくび', '厄日'),
			_Utils_Tuple2('あくび', '悪日'),
			_Utils_Tuple2('せんぶ', '先負'),
			_Utils_Tuple2('きにち', '忌日'),
			_Utils_Tuple2('たいや', '逮夜'),
			_Utils_Tuple2('えんき', '遠忌'),
			_Utils_Tuple2('なかび', '中日'),
			_Utils_Tuple2('らくび', '楽日'),
			_Utils_Tuple2('ものび', '物日'),
			_Utils_Tuple2('もんび', '紋日'),
			_Utils_Tuple2('せっく', '節句・節供'),
			_Utils_Tuple2('はたび', '旗日'),
			_Utils_Tuple2('ねんし', '年始'),
			_Utils_Tuple2('ひがん', '彼岸'),
			_Utils_Tuple2('たんご', '端午'),
			_Utils_Tuple2('のえる', 'ノエル'),
			_Utils_Tuple2('せいぼ', '歳暮'),
			_Utils_Tuple2('じょや', '除夜'),
			_Utils_Tuple2('せっき', '節季'),
			_Utils_Tuple2('とうじ', '冬至'),
			_Utils_Tuple2('うすい', '雨水'),
			_Utils_Tuple2('こくう', '穀雨'),
			_Utils_Tuple2('はくろ', '白露'),
			_Utils_Tuple2('かんろ', '寒露'),
			_Utils_Tuple2('ごぜん', '午前'),
			_Utils_Tuple2('れいじ', '零時'),
			_Utils_Tuple2('みめい', '未明'),
			_Utils_Tuple2('ひので', '日の出'),
			_Utils_Tuple2('よあけ', '夜明け'),
			_Utils_Tuple2('あした', 'あした'),
			_Utils_Tuple2('あさま', '朝間'),
			_Utils_Tuple2('ひるま', '昼間'),
			_Utils_Tuple2('ひなか', '日中'),
			_Utils_Tuple2('おひる', 'お昼'),
			_Utils_Tuple2('まひる', '真昼'),
			_Utils_Tuple2('ひぐれ', '日暮れ'),
			_Utils_Tuple2('ゆうべ', '夕べ'),
			_Utils_Tuple2('ゆうま', '夕間'),
			_Utils_Tuple2('はくぼ', '薄暮'),
			_Utils_Tuple2('ないと', 'ナイト'),
			_Utils_Tuple2('やぶん', '夜分'),
			_Utils_Tuple2('やかん', '夜間'),
			_Utils_Tuple2('よなか', '夜中'),
			_Utils_Tuple2('やはん', '夜半'),
			_Utils_Tuple2('よふけ', '夜更け'),
			_Utils_Tuple2('しんや', '深夜'),
			_Utils_Tuple2('つきよ', '月夜'),
			_Utils_Tuple2('やみよ', 'やみ夜'),
			_Utils_Tuple2('あんや', '暗夜'),
			_Utils_Tuple2('はくや', '白夜'),
			_Utils_Tuple2('あまよ', '雨夜'),
			_Utils_Tuple2('しもよ', '霜夜'),
			_Utils_Tuple2('さむよ', '寒夜'),
			_Utils_Tuple2('とうや', '凍夜'),
			_Utils_Tuple2('いちや', '一夜'),
			_Utils_Tuple2('ながよ', '長夜'),
			_Utils_Tuple2('しょや', '初夜'),
			_Utils_Tuple2('はんや', '半夜'),
			_Utils_Tuple2('ここん', '古今'),
			_Utils_Tuple2('もっか', '目下'),
			_Utils_Tuple2('げんじ', '現時'),
			_Utils_Tuple2('げんか', '現下'),
			_Utils_Tuple2('ことし', '今年'),
			_Utils_Tuple2('こんじ', '今茲'),
			_Utils_Tuple2('こよい', 'こよい'),
			_Utils_Tuple2('こんや', '今夜'),
			_Utils_Tuple2('こんど', '今度'),
			_Utils_Tuple2('とうざ', '当座'),
			_Utils_Tuple2('きおう', '既往'),
			_Utils_Tuple2('むかし', '昔'),
			_Utils_Tuple2('せきじ', '昔時'),
			_Utils_Tuple2('おうこ', '往古'),
			_Utils_Tuple2('せんど', '先度'),
			_Utils_Tuple2('さくや', '昨夜'),
			_Utils_Tuple2('やぜん', '夜前'),
			_Utils_Tuple2('せんや', '先夜'),
			_Utils_Tuple2('やらい', '夜来'),
			_Utils_Tuple2('こらい', '古来'),
			_Utils_Tuple2('いぜん', '以前'),
			_Utils_Tuple2('とっく', 'とっく'),
			_Utils_Tuple2('みらい', '未来'),
			_Utils_Tuple2('みぜん', '未然'),
			_Utils_Tuple2('こんご', '今後'),
			_Utils_Tuple2('ぜんと', '前途'),
			_Utils_Tuple2('ゆくえ', '行方'),
			_Utils_Tuple2('ごこく', '後刻'),
			_Utils_Tuple2('ごじつ', '後日'),
			_Utils_Tuple2('たじつ', '他日'),
			_Utils_Tuple2('やがて', 'やがて'),
			_Utils_Tuple2('まぢか', '間近'),
			_Utils_Tuple2('じかい', '次回'),
			_Utils_Tuple2('てはず', '手はず'),
			_Utils_Tuple2('ぜんご', '前後'),
			_Utils_Tuple2('せんて', '先手'),
			_Utils_Tuple2('きせん', '機先'),
			_Utils_Tuple2('まさき', '真先'),
			_Utils_Tuple2('こうし', '嚆矢'),
			_Utils_Tuple2('いちい', '一位'),
			_Utils_Tuple2('らすと', 'ラスト'),
			_Utils_Tuple2('おはつ', 'お初'),
			_Utils_Tuple2('しょど', '初度'),
			_Utils_Tuple2('はつね', '初音'),
			_Utils_Tuple2('ひのべ', '日延べ'),
			_Utils_Tuple2('ちたい', '遅滞'),
			_Utils_Tuple2('しゅび', '首尾'),
			_Utils_Tuple2('きあけ', '忌明け'),
			_Utils_Tuple2('まんき', '満期'),
			_Utils_Tuple2('さいご', '最後'),
			_Utils_Tuple2('しょて', '初手'),
			_Utils_Tuple2('のっけ', 'のっけ'),
			_Utils_Tuple2('しょほ', '初歩'),
			_Utils_Tuple2('いろは', 'いろは'),
			_Utils_Tuple2('ではな', '出はな'),
			_Utils_Tuple2('でばな', '出ばな'),
			_Utils_Tuple2('でだし', '出出し'),
			_Utils_Tuple2('であし', '出足'),
			_Utils_Tuple2('まつび', '末尾'),
			_Utils_Tuple2('しっぽ', 'しっぽ'),
			_Utils_Tuple2('えんど', 'エンド'),
			_Utils_Tuple2('とうび', '掉尾'),
			_Utils_Tuple2('まつご', '末期'),
			_Utils_Tuple2('はてし', '果てし'),
			_Utils_Tuple2('きょく', '極'),
			_Utils_Tuple2('あげく', '挙げ句・揚げ句'),
			_Utils_Tuple2('とめど', '止めど'),
			_Utils_Tuple2('どまり', '－止まり'),
			_Utils_Tuple2('すいよ', '酔余'),
			_Utils_Tuple2('なかば', '半ば'),
			_Utils_Tuple2('はんと', '半途'),
			_Utils_Tuple2('さなか', 'さなか'),
			_Utils_Tuple2('やまば', '山場'),
			_Utils_Tuple2('とうげ', '峠'),
			_Utils_Tuple2('しんき', '新規'),
			_Utils_Tuple2('しんみ', '新味'),
			_Utils_Tuple2('きだい', '希代'),
			_Utils_Tuple2('ちそく', '遅速'),
			_Utils_Tuple2('そくど', '速度'),
			_Utils_Tuple2('はやさ', 'はやさ'),
			_Utils_Tuple2('はやめ', 'はやめ'),
			_Utils_Tuple2('おくれ', '後れ'),
			_Utils_Tuple2('ちこく', '遅刻'),
			_Utils_Tuple2('ちさん', '遅参'),
			_Utils_Tuple2('さいこ', '最古'),
			_Utils_Tuple2('いそぎ', '急ぎ'),
			_Utils_Tuple2('ばかり', 'ばかり'),
			_Utils_Tuple2('かねて', 'かねて'),
			_Utils_Tuple2('いおう', '以往'),
			_Utils_Tuple2('そのご', 'その後'),
			_Utils_Tuple2('いらい', '以来'),
			_Utils_Tuple2('じらい', '爾来'),
			_Utils_Tuple2('よくご', '浴後'),
			_Utils_Tuple2('どくご', '読後'),
			_Utils_Tuple2('さんご', '産後'),
			_Utils_Tuple2('せいご', '生後'),
			_Utils_Tuple2('ろうご', '老後'),
			_Utils_Tuple2('ぼつご', '没後'),
			_Utils_Tuple2('ぜんや', '前夜'),
			_Utils_Tuple2('そくじ', '即時'),
			_Utils_Tuple2('そくざ', '即座'),
			_Utils_Tuple2('とっさ', 'とっさ'),
			_Utils_Tuple2('いっき', '一気'),
			_Utils_Tuple2('でたて', '出たて'),
			_Utils_Tuple2('にっか', '日課'),
			_Utils_Tuple2('ばあい', '場合'),
			_Utils_Tuple2('ところ', '所'),
			_Utils_Tuple2('にげん', '二元'),
			_Utils_Tuple2('たげん', '多元'),
			_Utils_Tuple2('はこび', '運び'),
			_Utils_Tuple2('ばめん', '場面'),
			_Utils_Tuple2('ぶたい', '舞台'),
			_Utils_Tuple2('みせば', '見せ場'),
			_Utils_Tuple2('ぬれば', 'ぬれ場'),
			_Utils_Tuple2('たちば', '立場'),
			_Utils_Tuple2('たつせ', '立つ瀬'),
			_Utils_Tuple2('りっち', '立地'),
			_Utils_Tuple2('けんち', '見地'),
			_Utils_Tuple2('みそら', '身空'),
			_Utils_Tuple2('えいい', '栄位'),
			_Utils_Tuple2('ゆうい', '優位'),
			_Utils_Tuple2('おうい', '王位'),
			_Utils_Tuple2('おうざ', '王座'),
			_Utils_Tuple2('しゅい', '首位'),
			_Utils_Tuple2('かみざ', '上座'),
			_Utils_Tuple2('しもざ', '下座'),
			_Utils_Tuple2('ぶしょ', '部署'),
			_Utils_Tuple2('ぽすと', 'ポスト'),
			_Utils_Tuple2('しいと', 'シート'),
			_Utils_Tuple2('じくう', '時空'),
			_Utils_Tuple2('ぶんぷ', '分布'),
			_Utils_Tuple2('ここら', 'ここら'),
			_Utils_Tuple2('こっち', 'こっち'),
			_Utils_Tuple2('そこら', 'そこら'),
			_Utils_Tuple2('どうち', '同地'),
			_Utils_Tuple2('そっち', 'そっち'),
			_Utils_Tuple2('おんち', '御地'),
			_Utils_Tuple2('きんち', '錦地'),
			_Utils_Tuple2('あそこ', 'あそこ'),
			_Utils_Tuple2('あすこ', 'あすこ'),
			_Utils_Tuple2('かしこ', 'かしこ'),
			_Utils_Tuple2('あっち', 'あっち'),
			_Utils_Tuple2('どこら', 'どこら'),
			_Utils_Tuple2('いずこ', 'いずこ'),
			_Utils_Tuple2('なへん', '那辺'),
			_Utils_Tuple2('どこか', 'どこか'),
			_Utils_Tuple2('ぼうち', '某地'),
			_Utils_Tuple2('かくち', '各地'),
			_Utils_Tuple2('しほう', '四方'),
			_Utils_Tuple2('たしょ', '他所'),
			_Utils_Tuple2('んとこ', '－んとこ'),
			_Utils_Tuple2('ばしょ', '場所'),
			_Utils_Tuple2('かしょ', '箇所'),
			_Utils_Tuple2('ちてん', '地点'),
			_Utils_Tuple2('ようち', '要地'),
			_Utils_Tuple2('ねじろ', '根城'),
			_Utils_Tuple2('あいろ', '隘路'),
			_Utils_Tuple2('そのば', 'その場'),
			_Utils_Tuple2('げんば', '現場'),
			_Utils_Tuple2('せんち', '戦地'),
			_Utils_Tuple2('ありか', 'ありか'),
			_Utils_Tuple2('ほうこ', '宝庫'),
			_Utils_Tuple2('さいと', 'サイト'),
			_Utils_Tuple2('あきち', '空き地・明き地'),
			_Utils_Tuple2('せいち', '生地'),
			_Utils_Tuple2('ゆきば', '行き場'),
			_Utils_Tuple2('いきば', '行き場'),
			_Utils_Tuple2('でさき', '出先'),
			_Utils_Tuple2('にんち', '任地'),
			_Utils_Tuple2('ひもと', '火元'),
			_Utils_Tuple2('はくち', '泊地'),
			_Utils_Tuple2('ふみば', '踏み場'),
			_Utils_Tuple2('やりば', 'やり場'),
			_Utils_Tuple2('おきば', '置き場'),
			_Utils_Tuple2('でぽお', 'デポー'),
			_Utils_Tuple2('のりば', '乗り場'),
			_Utils_Tuple2('にげば', '逃げ場'),
			_Utils_Tuple2('うりば', '売り場'),
			_Utils_Tuple2('ちるい', '地類'),
			_Utils_Tuple2('だんち', '団地'),
			_Utils_Tuple2('かどち', '角地'),
			_Utils_Tuple2('じしょ', '地所'),
			_Utils_Tuple2('れいち', '霊地'),
			_Utils_Tuple2('おくち', '奥地'),
			_Utils_Tuple2('へきち', '僻地'),
			_Utils_Tuple2('さんち', '産地'),
			_Utils_Tuple2('ほんば', '本場'),
			_Utils_Tuple2('めぬき', '目抜き'),
			_Utils_Tuple2('ちょん', 'ちょん'),
			_Utils_Tuple2('ちょぼ', 'ちょぼ'),
			_Utils_Tuple2('ぽっち', 'ぽっち'),
			_Utils_Tuple2('ぴんと', 'ピント'),
			_Utils_Tuple2('してん', '支点'),
			_Utils_Tuple2('きてん', '基点'),
			_Utils_Tuple2('ごおる', 'ゴール'),
			_Utils_Tuple2('ろてん', '露点'),
			_Utils_Tuple2('つぎめ', '継ぎ目'),
			_Utils_Tuple2('ぬいめ', '縫い目'),
			_Utils_Tuple2('とじめ', 'とじ目'),
			_Utils_Tuple2('わけめ', '分け目'),
			_Utils_Tuple2('たちめ', '裁ち目'),
			_Utils_Tuple2('きれめ', '切れ目'),
			_Utils_Tuple2('きりめ', '切り目'),
			_Utils_Tuple2('めもと', '目もと'),
			_Utils_Tuple2('てもと', '手もと'),
			_Utils_Tuple2('そっか', '足下'),
			_Utils_Tuple2('ねかた', '根方'),
			_Utils_Tuple2('つけね', '付け根'),
			_Utils_Tuple2('あしば', '足場'),
			_Utils_Tuple2('よるべ', '寄る辺'),
			_Utils_Tuple2('かせん', '下線'),
			_Utils_Tuple2('はせん', '破線'),
			_Utils_Tuple2('させん', '鎖線'),
			_Utils_Tuple2('いせん', '緯線'),
			_Utils_Tuple2('ちへい', '地平'),
			_Utils_Tuple2('くもで', 'くも手'),
			_Utils_Tuple2('はんい', '範囲'),
			_Utils_Tuple2('のうり', '脳裏'),
			_Utils_Tuple2('くかく', '区画'),
			_Utils_Tuple2('くかん', '区間'),
			_Utils_Tuple2('ちいき', '地域'),
			_Utils_Tuple2('くいき', '区域'),
			_Utils_Tuple2('ちほう', '地方'),
			_Utils_Tuple2('えりあ', 'エリア'),
			_Utils_Tuple2('ぞおん', 'ゾーン'),
			_Utils_Tuple2('ういき', '雨域'),
			_Utils_Tuple2('じいき', '磁域'),
			_Utils_Tuple2('でんば', '電場'),
			_Utils_Tuple2('ぶんや', '分野'),
			_Utils_Tuple2('はたけ', '畑'),
			_Utils_Tuple2('ないや', '内野'),
			_Utils_Tuple2('がいや', '外野'),
			_Utils_Tuple2('しかい', '視界'),
			_Utils_Tuple2('しかく', '死角'),
			_Utils_Tuple2('さらち', '更地'),
			_Utils_Tuple2('じばん', '地盤'),
			_Utils_Tuple2('ほおむ', 'ホーム'),
			_Utils_Tuple2('にるい', '二塁'),
			_Utils_Tuple2('さあど', 'サード'),
			_Utils_Tuple2('ぎょざ', '御座'),
			_Utils_Tuple2('じせき', '自席'),
			_Utils_Tuple2('ざせき', '座席'),
			_Utils_Tuple2('さじき', '桟敷'),
			_Utils_Tuple2('ばせき', '場席'),
			_Utils_Tuple2('よせき', '余席'),
			_Utils_Tuple2('くうい', '空位'),
			_Utils_Tuple2('たまり', 'たまり'),
			_Utils_Tuple2('ぎせき', '議席'),
			_Utils_Tuple2('まつざ', '末座'),
			_Utils_Tuple2('しゅざ', '首座'),
			_Utils_Tuple2('こうざ', '講座'),
			_Utils_Tuple2('だせき', '打席'),
			_Utils_Tuple2('はがた', '歯形'),
			_Utils_Tuple2('わだち', 'わだち'),
			_Utils_Tuple2('しせき', '史跡'),
			_Utils_Tuple2('こせき', '古跡'),
			_Utils_Tuple2('いせき', '遺跡'),
			_Utils_Tuple2('さかい', '境'),
			_Utils_Tuple2('しきり', '仕切り'),
			_Utils_Tuple2('くぎり', '区切り・句切り'),
			_Utils_Tuple2('しおめ', '潮目'),
			_Utils_Tuple2('しせん', '死線'),
			_Utils_Tuple2('げんど', '限度'),
			_Utils_Tuple2('このま', '木の間'),
			_Utils_Tuple2('こなた', 'こなた'),
			_Utils_Tuple2('そなた', 'そなた'),
			_Utils_Tuple2('あなた', 'あなた'),
			_Utils_Tuple2('かなた', 'かなた'),
			_Utils_Tuple2('てまえ', '手前'),
			_Utils_Tuple2('こうさ', '交差'),
			_Utils_Tuple2('くろす', 'クロス'),
			_Utils_Tuple2('むかい', '向かい'),
			_Utils_Tuple2('そっぽ', 'そっぽ'),
			_Utils_Tuple2('たいじ', '対峙'),
			_Utils_Tuple2('ゆくて', '行く手'),
			_Utils_Tuple2('なあて', '名あて'),
			_Utils_Tuple2('あてど', '当てど'),
			_Utils_Tuple2('とほう', '途方'),
			_Utils_Tuple2('やまて', '山手'),
			_Utils_Tuple2('うみて', '海手'),
			_Utils_Tuple2('はまて', '浜手'),
			_Utils_Tuple2('ふうい', '風位'),
			_Utils_Tuple2('えほう', '恵方・吉方'),
			_Utils_Tuple2('きもん', '鬼門'),
			_Utils_Tuple2('ひがし', '東'),
			_Utils_Tuple2('みなみ', '南'),
			_Utils_Tuple2('まにし', '真西'),
			_Utils_Tuple2('まきた', '真北'),
			_Utils_Tuple2('たつみ', 'たつみ'),
			_Utils_Tuple2('いぬい', 'いぬい'),
			_Utils_Tuple2('とうぶ', '東部'),
			_Utils_Tuple2('せいぶ', '西部'),
			_Utils_Tuple2('なんぶ', '南部'),
			_Utils_Tuple2('ほくぶ', '北部'),
			_Utils_Tuple2('いとう', '以東'),
			_Utils_Tuple2('いなん', '以南'),
			_Utils_Tuple2('いほく', '以北'),
			_Utils_Tuple2('さゆう', '左右'),
			_Utils_Tuple2('ひだり', '左'),
			_Utils_Tuple2('さそく', '左側'),
			_Utils_Tuple2('うそく', '右側'),
			_Utils_Tuple2('さがん', '左岸'),
			_Utils_Tuple2('うがん', '右岸'),
			_Utils_Tuple2('さよく', '左翼'),
			_Utils_Tuple2('うよく', '右翼'),
			_Utils_Tuple2('ゆんで', '弓手'),
			_Utils_Tuple2('みぎて', '右手'),
			_Utils_Tuple2('さほう', '左方'),
			_Utils_Tuple2('うほう', '右方'),
			_Utils_Tuple2('さげん', '左舷'),
			_Utils_Tuple2('うげん', '右舷'),
			_Utils_Tuple2('らいと', 'ライト'),
			_Utils_Tuple2('れふと', 'レフト'),
			_Utils_Tuple2('うしろ', '後ろ'),
			_Utils_Tuple2('はいご', '背後'),
			_Utils_Tuple2('ぜんぶ', '前部'),
			_Utils_Tuple2('へさき', 'へ先'),
			_Utils_Tuple2('みよし', 'みよし'),
			_Utils_Tuple2('じんご', '人後'),
			_Utils_Tuple2('ぼぜん', '墓前'),
			_Utils_Tuple2('まよこ', '真横'),
			_Utils_Tuple2('ざゆう', '座右'),
			_Utils_Tuple2('よこて', '横手'),
			_Utils_Tuple2('ななめ', '斜め'),
			_Utils_Tuple2('さかさ', '逆さ'),
			_Utils_Tuple2('か・げ', '下'),
			_Utils_Tuple2('まうえ', '真上'),
			_Utils_Tuple2('ました', '真下'),
			_Utils_Tuple2('かみて', '上手'),
			_Utils_Tuple2('しもて', '下手'),
			_Utils_Tuple2('したて', '下手'),
			_Utils_Tuple2('げだん', '下段'),
			_Utils_Tuple2('かだん', '下段'),
			_Utils_Tuple2('じゅか', '樹下'),
			_Utils_Tuple2('げっか', '月下'),
			_Utils_Tuple2('がんか', '眼下'),
			_Utils_Tuple2('ちかく', '地核'),
			_Utils_Tuple2('ろしん', '炉芯'),
			_Utils_Tuple2('きじく', '機軸'),
			_Utils_Tuple2('としん', '都心'),
			_Utils_Tuple2('こしん', '湖心'),
			_Utils_Tuple2('のずえ', '野末'),
			_Utils_Tuple2('よすみ', '四隅'),
			_Utils_Tuple2('ろとう', '路頭'),
			_Utils_Tuple2('さたん', '左端'),
			_Utils_Tuple2('うたん', '右端'),
			_Utils_Tuple2('かたん', '下端'),
			_Utils_Tuple2('のきば', '軒端'),
			_Utils_Tuple2('はずえ', '葉末'),
			_Utils_Tuple2('こずえ', 'こずえ'),
			_Utils_Tuple2('ほさき', '穂先'),
			_Utils_Tuple2('ぶめん', '部面'),
			_Utils_Tuple2('しめん', '四面'),
			_Utils_Tuple2('ためん', '多面'),
			_Utils_Tuple2('かめん', '下面'),
			_Utils_Tuple2('じめん', '地面'),
			_Utils_Tuple2('ろめん', '路面'),
			_Utils_Tuple2('こめん', '湖面'),
			_Utils_Tuple2('みなも', 'みなも'),
			_Utils_Tuple2('みのも', 'みのも'),
			_Utils_Tuple2('のづら', '野面'),
			_Utils_Tuple2('たのも', '田のも'),
			_Utils_Tuple2('かわも', '川面'),
			_Utils_Tuple2('ぺえじ', 'ページ'),
			_Utils_Tuple2('がめん', '画面'),
			_Utils_Tuple2('こぐち', '木口'),
			_Utils_Tuple2('おもて', '表'),
			_Utils_Tuple2('うわべ', '上辺'),
			_Utils_Tuple2('しはい', '紙背'),
			_Utils_Tuple2('さいど', 'サイド'),
			_Utils_Tuple2('うらて', '裏手'),
			_Utils_Tuple2('ないぶ', '内部'),
			_Utils_Tuple2('がいぶ', '外部'),
			_Utils_Tuple2('とのも', '外の面'),
			_Utils_Tuple2('おんも', 'おんも'),
			_Utils_Tuple2('やがい', '野外'),
			_Utils_Tuple2('じない', '寺内'),
			_Utils_Tuple2('かない', '家内'),
			_Utils_Tuple2('こがい', '戸外'),
			_Utils_Tuple2('きない', '機内'),
			_Utils_Tuple2('とない', '都内'),
			_Utils_Tuple2('しない', '市内'),
			_Utils_Tuple2('しがい', '市外'),
			_Utils_Tuple2('ぶない', '部内'),
			_Utils_Tuple2('しんぶ', '深部'),
			_Utils_Tuple2('ていぶ', '底部'),
			_Utils_Tuple2('ちてい', '地底'),
			_Utils_Tuple2('ひかげ', '日陰'),
			_Utils_Tuple2('こかげ', '小陰'),
			_Utils_Tuple2('はかげ', '葉陰'),
			_Utils_Tuple2('ふかみ', '深み'),
			_Utils_Tuple2('ほとり', 'ほとり'),
			_Utils_Tuple2('みぎわ', 'みぎわ'),
			_Utils_Tuple2('ろばた', '炉端'),
			_Utils_Tuple2('ろぼう', '路傍'),
			_Utils_Tuple2('ろへん', '路辺'),
			_Utils_Tuple2('きへん', '机辺'),
			_Utils_Tuple2('まどべ', '窓辺'),
			_Utils_Tuple2('しっか', '膝下'),
			_Utils_Tuple2('やまべ', '山辺'),
			_Utils_Tuple2('うみべ', '海辺'),
			_Utils_Tuple2('かわべ', '川辺'),
			_Utils_Tuple2('みずべ', '水辺'),
			_Utils_Tuple2('こはん', '湖畔'),
			_Utils_Tuple2('ちはん', '池畔'),
			_Utils_Tuple2('となり', '隣'),
			_Utils_Tuple2('しりん', '四隣'),
			_Utils_Tuple2('ふきん', '付近・附近'),
			_Utils_Tuple2('りんか', '隣家'),
			_Utils_Tuple2('りんし', '隣市'),
			_Utils_Tuple2('とおく', '遠く'),
			_Utils_Tuple2('ちかま', '近間'),
			_Utils_Tuple2('ちかば', '近場'),
			_Utils_Tuple2('みぢか', '身近'),
			_Utils_Tuple2('いえん', '以遠'),
			_Utils_Tuple2('まわり', '回り'),
			_Utils_Tuple2('ぐるり', 'ぐるり'),
			_Utils_Tuple2('しへん', '四辺'),
			_Utils_Tuple2('りんち', '臨池'),
			_Utils_Tuple2('づたい', '－伝い'),
			_Utils_Tuple2('むけい', '無形'),
			_Utils_Tuple2('かたち', '形'),
			_Utils_Tuple2('びけい', '美形'),
			_Utils_Tuple2('ずけい', '図形'),
			_Utils_Tuple2('はけい', '波形'),
			_Utils_Tuple2('やかた', '屋形'),
			_Utils_Tuple2('だえん', '楕円'),
			_Utils_Tuple2('くけい', '矩形'),
			_Utils_Tuple2('いびつ', 'いびつ'),
			_Utils_Tuple2('むきず', '無傷'),
			_Utils_Tuple2('さいず', 'サイズ'),
			_Utils_Tuple2('こがた', '小形・小型'),
			_Utils_Tuple2('こばん', '小判'),
			_Utils_Tuple2('じけい', '字形'),
			_Utils_Tuple2('じかく', '字画'),
			_Utils_Tuple2('ごけい', '語形'),
			_Utils_Tuple2('こえい', '孤影'),
			_Utils_Tuple2('ほかげ', '帆影'),
			_Utils_Tuple2('しよう', '姿容'),
			_Utils_Tuple2('ぜんし', '全姿'),
			_Utils_Tuple2('れいし', '麗姿'),
			_Utils_Tuple2('したい', '姿態'),
			_Utils_Tuple2('びぼう', '美貌'),
			_Utils_Tuple2('はんみ', '半身'),
			_Utils_Tuple2('たいい', '体位'),
			_Utils_Tuple2('しだれ', 'しだれ'),
			_Utils_Tuple2('ねぐせ', '寝癖'),
			_Utils_Tuple2('とがり', 'とがり'),
			_Utils_Tuple2('よかく', '余角'),
			_Utils_Tuple2('ほかく', '補角'),
			_Utils_Tuple2('ふかく', '俯角'),
			_Utils_Tuple2('たかく', '多角'),
			_Utils_Tuple2('きりこ', '切り子'),
			_Utils_Tuple2('こけい', '固形'),
			_Utils_Tuple2('こつぶ', '小粒'),
			_Utils_Tuple2('しずく', '滴'),
			_Utils_Tuple2('けだま', '毛だま'),
			_Utils_Tuple2('はもん', '波紋'),
			_Utils_Tuple2('えくぼ', 'えくぼ'),
			_Utils_Tuple2('ろおる', 'ロール'),
			_Utils_Tuple2('らせん', '螺旋'),
			_Utils_Tuple2('とぐろ', 'とぐろ'),
			_Utils_Tuple2('わなり', '輪なり'),
			_Utils_Tuple2('るうぷ', 'ループ'),
			_Utils_Tuple2('まるみ', 'まるみ'),
			_Utils_Tuple2('そりみ', '反り身'),
			_Utils_Tuple2('だあつ', 'ダーツ'),
			_Utils_Tuple2('たっく', 'タック'),
			_Utils_Tuple2('ふりる', 'フリル'),
			_Utils_Tuple2('ふれあ', 'フレア'),
			_Utils_Tuple2('ぼけつ', '墓穴'),
			_Utils_Tuple2('でぐち', '出口'),
			_Utils_Tuple2('まぐち', '間口'),
			_Utils_Tuple2('とぐち', '戸口'),
			_Utils_Tuple2('はっち', 'ハッチ'),
			_Utils_Tuple2('ひぐち', '火口'),
			_Utils_Tuple2('ゆぐち', '湯口'),
			_Utils_Tuple2('すきま', 'すき間'),
			_Utils_Tuple2('あきま', '空き間'),
			_Utils_Tuple2('われめ', '割れ目'),
			_Utils_Tuple2('せあき', '背明き'),
			_Utils_Tuple2('べんつ', 'ベンツ'),
			_Utils_Tuple2('あやめ', 'あや目'),
			_Utils_Tuple2('ずがら', '図柄'),
			_Utils_Tuple2('こがら', '小柄'),
			_Utils_Tuple2('えがら', '絵柄'),
			_Utils_Tuple2('しはん', '紫斑'),
			_Utils_Tuple2('まだら', 'まだら'),
			_Utils_Tuple2('かのこ', 'かのこ'),
			_Utils_Tuple2('ともえ', 'ともえ'),
			_Utils_Tuple2('かもん', '渦紋'),
			_Utils_Tuple2('こもん', '小紋'),
			_Utils_Tuple2('じもん', '地紋'),
			_Utils_Tuple2('ますめ', '升目'),
			_Utils_Tuple2('もくめ', '木目'),
			_Utils_Tuple2('もくり', '木理'),
			_Utils_Tuple2('せつり', '節理'),
			_Utils_Tuple2('いため', '板目'),
			_Utils_Tuple2('まさめ', '正目'),
			_Utils_Tuple2('さかめ', '逆目'),
			_Utils_Tuple2('くぎめ', 'くぎ目'),
			_Utils_Tuple2('ぬのめ', '布目'),
			_Utils_Tuple2('うらめ', '裏目'),
			_Utils_Tuple2('いとめ', '糸目'),
			_Utils_Tuple2('はりめ', '針目'),
			_Utils_Tuple2('あみめ', '編み目'),
			_Utils_Tuple2('おりめ', '織り目'),
			_Utils_Tuple2('なわめ', '縄目'),
			_Utils_Tuple2('かごめ', 'かご目'),
			_Utils_Tuple2('おれめ', '折れ目'),
			_Utils_Tuple2('やれめ', '破れ目'),
			_Utils_Tuple2('さけめ', '裂け目'),
			_Utils_Tuple2('くしめ', 'くし目'),
			_Utils_Tuple2('しまめ', 'しま目'),
			_Utils_Tuple2('めもり', '目盛り'),
			_Utils_Tuple2('ぶうけ', 'ブーケ'),
			_Utils_Tuple2('たばね', '束ね'),
			_Utils_Tuple2('はへん', '破片'),
			_Utils_Tuple2('かけら', 'かけら'),
			_Utils_Tuple2('みじん', '微塵'),
			_Utils_Tuple2('はもの', '端物'),
			_Utils_Tuple2('ならび', '並び'),
			_Utils_Tuple2('たいご', '隊伍'),
			_Utils_Tuple2('やなみ', '家並み'),
			_Utils_Tuple2('はなみ', '歯並み'),
			_Utils_Tuple2('くいで', '食いで'),
			_Utils_Tuple2('のみで', '飲みで'),
			_Utils_Tuple2('よみで', '読みで'),
			_Utils_Tuple2('のりで', '乗りで'),
			_Utils_Tuple2('でんか', '電荷'),
			_Utils_Tuple2('あたい', '値'),
			_Utils_Tuple2('ねだん', '値段'),
			_Utils_Tuple2('はんか', '頒価'),
			_Utils_Tuple2('たてね', '建値'),
			_Utils_Tuple2('かぶか', '株価'),
			_Utils_Tuple2('かがく', '価額'),
			_Utils_Tuple2('さがく', '差額'),
			_Utils_Tuple2('はがく', '端額'),
			_Utils_Tuple2('すこあ', 'スコア'),
			_Utils_Tuple2('だてん', '打点'),
			_Utils_Tuple2('きろく', '記録'),
			_Utils_Tuple2('かぞえ', '数え'),
			_Utils_Tuple2('よわい', 'よわい'),
			_Utils_Tuple2('としは', '年端・年歯'),
			_Utils_Tuple2('ばれい', '馬齢'),
			_Utils_Tuple2('すうち', '数値'),
			_Utils_Tuple2('もおど', 'モード'),
			_Utils_Tuple2('しすう', '指数'),
			_Utils_Tuple2('どすう', '度数'),
			_Utils_Tuple2('ひんど', '頻度'),
			_Utils_Tuple2('ひかず', '日数'),
			_Utils_Tuple2('ひにち', '日にち'),
			_Utils_Tuple2('にっし', '日子'),
			_Utils_Tuple2('こすう', '個数'),
			_Utils_Tuple2('にんず', '人数'),
			_Utils_Tuple2('ばかず', '場数'),
			_Utils_Tuple2('やかず', '家数'),
			_Utils_Tuple2('まかず', '間数'),
			_Utils_Tuple2('ぶすう', '部数'),
			_Utils_Tuple2('じすう', '字数'),
			_Utils_Tuple2('ほすう', '歩数'),
			_Utils_Tuple2('だすう', '打数'),
			_Utils_Tuple2('りすう', '里数'),
			_Utils_Tuple2('へるつ', 'ヘルツ'),
			_Utils_Tuple2('ばんて', '番手'),
			_Utils_Tuple2('ちばん', '地番'),
			_Utils_Tuple2('ばんち', '番地'),
			_Utils_Tuple2('そすう', '素数'),
			_Utils_Tuple2('ふすう', '負数'),
			_Utils_Tuple2('せいふ', '正負'),
			_Utils_Tuple2('ぶんぼ', '分母'),
			_Utils_Tuple2('ぶんし', '分子'),
			_Utils_Tuple2('むすう', '無数'),
			_Utils_Tuple2('むへん', '無辺'),
			_Utils_Tuple2('いくた', '幾多'),
			_Utils_Tuple2('おおく', '多く'),
			_Utils_Tuple2('すうた', '数多'),
			_Utils_Tuple2('さいた', '最多'),
			_Utils_Tuple2('おおめ', '多め'),
			_Utils_Tuple2('うちわ', '内輪'),
			_Utils_Tuple2('たすう', '多数'),
			_Utils_Tuple2('たぜい', '多勢'),
			_Utils_Tuple2('ぶぜい', '無勢'),
			_Utils_Tuple2('こぜい', '小勢'),
			_Utils_Tuple2('ふいり', '不入り'),
			_Utils_Tuple2('たなん', '多難'),
			_Utils_Tuple2('たよう', '多用'),
			_Utils_Tuple2('たぼう', '多忙'),
			_Utils_Tuple2('たたん', '多端'),
			_Utils_Tuple2('ただん', '多段'),
			_Utils_Tuple2('たべん', '多弁'),
			_Utils_Tuple2('たしき', '多識'),
			_Utils_Tuple2('たのう', '多能'),
			_Utils_Tuple2('たさく', '多作'),
			_Utils_Tuple2('たこく', '多国'),
			_Utils_Tuple2('たにく', '多肉'),
			_Utils_Tuple2('たぶん', '多分'),
			_Utils_Tuple2('いちる', '一縷'),
			_Utils_Tuple2('うのけ', 'うの毛'),
			_Utils_Tuple2('てうす', '手薄'),
			_Utils_Tuple2('かさく', '寡作'),
			_Utils_Tuple2('たがく', '多額'),
			_Utils_Tuple2('たいぶ', '大部'),
			_Utils_Tuple2('おおて', '大手'),
			_Utils_Tuple2('はんね', '半値'),
			_Utils_Tuple2('ながさ', '長さ'),
			_Utils_Tuple2('ながめ', '長め'),
			_Utils_Tuple2('ろんぐ', 'ロング'),
			_Utils_Tuple2('げえじ', 'ゲージ'),
			_Utils_Tuple2('みたけ', '身丈'),
			_Utils_Tuple2('きたけ', '着丈'),
			_Utils_Tuple2('みはば', '身幅'),
			_Utils_Tuple2('こはば', '小幅'),
			_Utils_Tuple2('しふく', '紙幅'),
			_Utils_Tuple2('ほはば', '歩幅'),
			_Utils_Tuple2('こまた', '小また'),
			_Utils_Tuple2('りいち', 'リーチ'),
			_Utils_Tuple2('ばすと', 'バスト'),
			_Utils_Tuple2('ひっぷ', 'ヒップ'),
			_Utils_Tuple2('こうげ', '高下'),
			_Utils_Tuple2('たかさ', '高さ'),
			_Utils_Tuple2('ひくさ', '低さ'),
			_Utils_Tuple2('たかめ', '高め'),
			_Utils_Tuple2('ひくめ', '低め'),
			_Utils_Tuple2('こうど', '高度'),
			_Utils_Tuple2('ざこう', '座高'),
			_Utils_Tuple2('せたけ', '背丈'),
			_Utils_Tuple2('たっぱ', 'たっぱ'),
			_Utils_Tuple2('ふかさ', '深さ'),
			_Utils_Tuple2('ふかめ', '深め'),
			_Utils_Tuple2('しんど', '深度'),
			_Utils_Tuple2('あさめ', '浅め'),
			_Utils_Tuple2('あつみ', '厚み'),
			_Utils_Tuple2('あつさ', '厚さ'),
			_Utils_Tuple2('あつめ', '厚め'),
			_Utils_Tuple2('あつで', '厚手'),
			_Utils_Tuple2('うすで', '薄手'),
			_Utils_Tuple2('うすめ', '薄め'),
			_Utils_Tuple2('とおさ', '遠さ'),
			_Utils_Tuple2('きょり', '距離'),
			_Utils_Tuple2('ばんり', '万里'),
			_Utils_Tuple2('しきん', '至近'),
			_Utils_Tuple2('もより', '最寄り'),
			_Utils_Tuple2('てぢか', '手近'),
			_Utils_Tuple2('りてい', '里程'),
			_Utils_Tuple2('ひろさ', '広さ'),
			_Utils_Tuple2('てぜま', '手狭'),
			_Utils_Tuple2('ちせき', '地積'),
			_Utils_Tuple2('じつぼ', '地坪'),
			_Utils_Tuple2('ごくび', '極微'),
			_Utils_Tuple2('ふとさ', '太さ'),
			_Utils_Tuple2('ふとめ', '太め'),
			_Utils_Tuple2('ほそさ', '細さ'),
			_Utils_Tuple2('まっは', 'マッハ'),
			_Utils_Tuple2('すすみ', '進み'),
			_Utils_Tuple2('ぺえす', 'ペース'),
			_Utils_Tuple2('ぴっち', 'ピッチ'),
			_Utils_Tuple2('すろお', 'スロー'),
			_Utils_Tuple2('らるご', 'ラルゴ'),
			_Utils_Tuple2('りずむ', 'リズム'),
			_Utils_Tuple2('びいと', 'ビート'),
			_Utils_Tuple2('おもさ', '重さ'),
			_Utils_Tuple2('おもみ', '重み'),
			_Utils_Tuple2('みがる', '身軽'),
			_Utils_Tuple2('めかた', '目方'),
			_Utils_Tuple2('かけめ', '掛け目'),
			_Utils_Tuple2('きんめ', '斤目'),
			_Utils_Tuple2('におも', '荷重'),
			_Utils_Tuple2('おんど', '温度'),
			_Utils_Tuple2('せっし', '摂氏'),
			_Utils_Tuple2('れっし', '列氏'),
			_Utils_Tuple2('きおん', '気温'),
			_Utils_Tuple2('ちおん', '地温'),
			_Utils_Tuple2('びおん', '微温'),
			_Utils_Tuple2('ちるど', 'チルド'),
			_Utils_Tuple2('ねつど', '熱度'),
			_Utils_Tuple2('ひねつ', '比熱'),
			_Utils_Tuple2('かくど', '角度'),
			_Utils_Tuple2('けいど', '経度'),
			_Utils_Tuple2('ほくい', '北緯'),
			_Utils_Tuple2('でんい', '電位'),
			_Utils_Tuple2('つよさ', '強さ'),
			_Utils_Tuple2('しつど', '湿度'),
			_Utils_Tuple2('めいど', '明度'),
			_Utils_Tuple2('かたさ', '硬さ'),
			_Utils_Tuple2('みつど', '密度'),
			_Utils_Tuple2('のうど', '濃度'),
			_Utils_Tuple2('かんど', '感度'),
			_Utils_Tuple2('さんど', '酸度'),
			_Utils_Tuple2('とうど', '糖度'),
			_Utils_Tuple2('ていど', '程度'),
			_Utils_Tuple2('どあい', '度合い'),
			_Utils_Tuple2('みんど', '民度'),
			_Utils_Tuple2('れんど', '練度'),
			_Utils_Tuple2('いない', '以内'),
			_Utils_Tuple2('いがい', '以外'),
			_Utils_Tuple2('しこう', '至高'),
			_Utils_Tuple2('いたり', '至り'),
			_Utils_Tuple2('きわみ', '極み'),
			_Utils_Tuple2('ぴいく', 'ピーク'),
			_Utils_Tuple2('むげん', '無限'),
			_Utils_Tuple2('ふぜん', '不全'),
			_Utils_Tuple2('そうわ', '総和'),
			_Utils_Tuple2('たいさ', '大差'),
			_Utils_Tuple2('きんさ', '僅差'),
			_Utils_Tuple2('かくさ', '格差'),
			_Utils_Tuple2('らくさ', '落差'),
			_Utils_Tuple2('だんさ', '段差'),
			_Utils_Tuple2('てんさ', '点差'),
			_Utils_Tuple2('へんさ', '偏差'),
			_Utils_Tuple2('ならし', 'ならし'),
			_Utils_Tuple2('ひわり', '日割り'),
			_Utils_Tuple2('ひれい', '比例'),
			_Utils_Tuple2('こうひ', '公比'),
			_Utils_Tuple2('さいん', 'サイン'),
			_Utils_Tuple2('よげん', '余弦'),
			_Utils_Tuple2('よせつ', '余接'),
			_Utils_Tuple2('よかつ', '余割'),
			_Utils_Tuple2('ひりつ', '比率'),
			_Utils_Tuple2('ぶあい', '歩合'),
			_Utils_Tuple2('れえと', 'レート'),
			_Utils_Tuple2('せいど', '精度'),
			_Utils_Tuple2('ねんぴ', '燃費'),
			_Utils_Tuple2('りりつ', '利率'),
			_Utils_Tuple2('だりつ', '打率'),
			_Utils_Tuple2('しぇあ', 'シェア'),
			_Utils_Tuple2('よぶん', '余分'),
			_Utils_Tuple2('あまり', '余り'),
			_Utils_Tuple2('こぼれ', 'こぼれ'),
			_Utils_Tuple2('ゆうよ', '有余'),
			_Utils_Tuple2('うるう', 'うるう'),
			_Utils_Tuple2('げつよ', '月余'),
			_Utils_Tuple2('ねんよ', '年余'),
			_Utils_Tuple2('ですぎ', '出過ぎ'),
			_Utils_Tuple2('ざんよ', '残余'),
			_Utils_Tuple2('ざんぶ', '残部'),
			_Utils_Tuple2('よじん', '余燼'),
			_Utils_Tuple2('よいん', '余韻'),
			_Utils_Tuple2('よしん', '余震'),
			_Utils_Tuple2('よはく', '余白'),
			_Utils_Tuple2('よゆう', '余裕'),
			_Utils_Tuple2('ゆとり', 'ゆとり'),
			_Utils_Tuple2('ようん', '余蘊'),
			_Utils_Tuple2('あそび', '遊び'),
			_Utils_Tuple2('だそく', '蛇足'),
			_Utils_Tuple2('はんで', 'ハンデ'),
			_Utils_Tuple2('はした', 'はした'),
			_Utils_Tuple2('はすう', '端数'),
			_Utils_Tuple2('みまん', '未満'),
			_Utils_Tuple2('たらず', '－足らず'),
			_Utils_Tuple2('ふそく', '不足'),
			_Utils_Tuple2('めぎれ', '目切れ'),
			_Utils_Tuple2('いろう', '遺漏'),
			_Utils_Tuple2('ごだつ', '誤脱'),
			_Utils_Tuple2('すべて', 'すべて'),
			_Utils_Tuple2('みんな', 'みんな'),
			_Utils_Tuple2('そうで', '総出'),
			_Utils_Tuple2('ぜんど', '全土'),
			_Utils_Tuple2('づくし', '－尽くし'),
			_Utils_Tuple2('まんざ', '満座'),
			_Utils_Tuple2('まんち', '満地'),
			_Utils_Tuple2('まんと', '満都'),
			_Utils_Tuple2('ぶぶん', '部分'),
			_Utils_Tuple2('ぱあと', 'パート'),
			_Utils_Tuple2('さいぶ', '細部'),
			_Utils_Tuple2('かくぶ', '各部'),
			_Utils_Tuple2('ふくぶ', '腹部'),
			_Utils_Tuple2('でんぶ', '臀部'),
			_Utils_Tuple2('かんぶ', '患部'),
			_Utils_Tuple2('およそ', 'およそ'),
			_Utils_Tuple2('いちぶ', '一部'),
			_Utils_Tuple2('はあふ', 'ハーフ'),
			_Utils_Tuple2('かっこ', '各個'),
			_Utils_Tuple2('こべつ', '個別'),
			_Utils_Tuple2('こごと', '戸ごと'),
			_Utils_Tuple2('だぶる', 'ダブル'),
			_Utils_Tuple2('ゆいつ', '唯一'),
			_Utils_Tuple2('こどく', '孤独'),
			_Utils_Tuple2('たんい', '単位'),
			_Utils_Tuple2('がかり', '－掛かり'),
			_Utils_Tuple2('せっと', 'セット'),
			_Utils_Tuple2('ついん', 'ツイン'),
			_Utils_Tuple2('こんび', 'コンビ'),
			_Utils_Tuple2('ここの', 'ここの'),
			_Utils_Tuple2('ふたつ', '二つ'),
			_Utils_Tuple2('みっつ', '三つ'),
			_Utils_Tuple2('よっつ', '四つ'),
			_Utils_Tuple2('いつつ', '五つ'),
			_Utils_Tuple2('むっつ', '六つ'),
			_Utils_Tuple2('ななつ', '七つ'),
			_Utils_Tuple2('やっつ', '八つ'),
			_Utils_Tuple2('ななそ', 'ななそ'),
			_Utils_Tuple2('むそじ', '六十路'),
			_Utils_Tuple2('ひゃく', '百'),
			_Utils_Tuple2('にせん', '二千'),
			_Utils_Tuple2('ごせん', '五千'),
			_Utils_Tuple2('くせん', '九千'),
			_Utils_Tuple2('にまん', '二万'),
			_Utils_Tuple2('しまん', '四万'),
			_Utils_Tuple2('ごまん', '五万'),
			_Utils_Tuple2('くまん', '九万'),
			_Utils_Tuple2('よろず', 'よろず'),
			_Utils_Tuple2('ももち', 'ももち'),
			_Utils_Tuple2('いちに', '一二'),
			_Utils_Tuple2('にさん', '二三'),
			_Utils_Tuple2('さんし', '三四'),
			_Utils_Tuple2('ごろく', '五六'),
			_Utils_Tuple2('はっく', '八九'),
			_Utils_Tuple2('すりい', 'スリー'),
			_Utils_Tuple2('ふぉあ', 'フォア'),
			_Utils_Tuple2('せぶん', 'セブン'),
			_Utils_Tuple2('えいと', 'エイト'),
			_Utils_Tuple2('ないん', 'ナイン'),
			_Utils_Tuple2('ひとり', 'ひとり'),
			_Utils_Tuple2('ふたり', 'ふたり'),
			_Utils_Tuple2('みたり', 'みたり'),
			_Utils_Tuple2('よたり', 'よたり'),
			_Utils_Tuple2('ひとひ', '一日'),
			_Utils_Tuple2('ふつか', '二日'),
			_Utils_Tuple2('みっか', '三日'),
			_Utils_Tuple2('よっか', '四日'),
			_Utils_Tuple2('むいか', '六日'),
			_Utils_Tuple2('なぬか', '七日'),
			_Utils_Tuple2('なのか', '七日'),
			_Utils_Tuple2('ようか', '八日'),
			_Utils_Tuple2('とおか', '十日'),
			_Utils_Tuple2('よつき', 'よつき'),
			_Utils_Tuple2('やつき', 'やつき'),
			_Utils_Tuple2('とつき', 'とつき'),
			_Utils_Tuple2('みとせ', 'みとせ'),
			_Utils_Tuple2('ととせ', 'ととせ'),
			_Utils_Tuple2('ひとえ', '一重'),
			_Utils_Tuple2('ふたえ', '二重'),
			_Utils_Tuple2('ななえ', '七重'),
			_Utils_Tuple2('いくえ', '幾重'),
			_Utils_Tuple2('いくつ', 'いくつ'),
			_Utils_Tuple2('なんこ', '何個'),
			_Utils_Tuple2('いくら', 'いくら'),
			_Utils_Tuple2('なんぼ', 'なんぼ'),
			_Utils_Tuple2('いっぴ', '一日'),
			_Utils_Tuple2('にがつ', '二月'),
			_Utils_Tuple2('しがつ', '四月'),
			_Utils_Tuple2('ごがつ', '五月'),
			_Utils_Tuple2('くがつ', '九月'),
			_Utils_Tuple2('にねん', '二年'),
			_Utils_Tuple2('よねん', '四年'),
			_Utils_Tuple2('くねん', '九年'),
			_Utils_Tuple2('ねどし', 'ねどし'),
			_Utils_Tuple2('うどし', 'うどし'),
			_Utils_Tuple2('みどし', 'みどし'),
			_Utils_Tuple2('いどし', 'いどし'),
			_Utils_Tuple2('きのえ', '甲'),
			_Utils_Tuple2('きのと', '乙'),
			_Utils_Tuple2('ひのえ', '丙'),
			_Utils_Tuple2('ひのと', '丁'),
			_Utils_Tuple2('かのえ', '庚'),
			_Utils_Tuple2('かのと', '辛'),
			_Utils_Tuple2('ひつじ', '未'),
			_Utils_Tuple2('かんし', '干支'),
			_Utils_Tuple2('かっし', '甲子'),
			_Utils_Tuple2('きがい', '癸亥'),
			_Utils_Tuple2('でぃい', 'Ｄ'),
			_Utils_Tuple2('べえた', 'β'),
			_Utils_Tuple2('がんま', 'γ'),
			_Utils_Tuple2('びっと', 'ビット'),
			_Utils_Tuple2('ばいと', 'バイト'),
			_Utils_Tuple2('だあす', 'ダース'),
			_Utils_Tuple2('ぐろす', 'グロス'),
			_Utils_Tuple2('へくと', 'ヘクト'),
			_Utils_Tuple2('みくろ', 'ミクロ'),
			_Utils_Tuple2('ぶんめ', '－分目'),
			_Utils_Tuple2('ばんめ', '－番目'),
			_Utils_Tuple2('かげつ', '－か月・箇月'),
			_Utils_Tuple2('かにち', '－か日・箇日'),
			_Utils_Tuple2('びょう', '秒'),
			_Utils_Tuple2('しゃく', '尺'),
			_Utils_Tuple2('まいる', 'マイル'),
			_Utils_Tuple2('やあど', 'ヤード'),
			_Utils_Tuple2('やある', 'ヤール'),
			_Utils_Tuple2('ばしん', '馬身'),
			_Utils_Tuple2('のっと', 'ノット'),
			_Utils_Tuple2('あある', 'アール'),
			_Utils_Tuple2('たんぶ', '反歩'),
			_Utils_Tuple2('がろん', 'ガロン'),
			_Utils_Tuple2('ばれる', 'バレル'),
			_Utils_Tuple2('ぐらむ', 'グラム'),
			_Utils_Tuple2('かんめ', '貫目'),
			_Utils_Tuple2('もんめ', '匁'),
			_Utils_Tuple2('ぽんど', 'ポンド'),
			_Utils_Tuple2('おんす', 'オンス'),
			_Utils_Tuple2('ばある', 'バール'),
			_Utils_Tuple2('わっと', 'ワット'),
			_Utils_Tuple2('ぼると', 'ボルト'),
			_Utils_Tuple2('おおむ', 'オーム'),
			_Utils_Tuple2('てすら', 'テスラ'),
			_Utils_Tuple2('がうす', 'ガウス'),
			_Utils_Tuple2('るくす', 'ルクス'),
			_Utils_Tuple2('だいん', 'ダイン'),
			_Utils_Tuple2('えるぐ', 'エルグ'),
			_Utils_Tuple2('きろじ', 'キロ時'),
			_Utils_Tuple2('ぼおる', 'ボール'),
			_Utils_Tuple2('ぎょう', '行'),
			_Utils_Tuple2('かさね', '重ね'),
			_Utils_Tuple2('つうわ', '通話'),
			_Utils_Tuple2('もおら', 'モーラ'),
			_Utils_Tuple2('ほ・ぽ', '歩'),
			_Utils_Tuple2('かかえ', '抱え'),
			_Utils_Tuple2('ひょう', '票'),
			_Utils_Tuple2('こ・か', '－個・箇'),
			_Utils_Tuple2('はしら', '柱'),
			_Utils_Tuple2('かこく', '－か国・箇国'),
			_Utils_Tuple2('れえん', 'レーン'),
			_Utils_Tuple2('きゃく', '脚'),
			_Utils_Tuple2('かしら', '頭'),
			_Utils_Tuple2('かっぷ', 'カップ'),
			_Utils_Tuple2('だらあ', 'ダラー'),
			_Utils_Tuple2('ぺんす', 'ペンス'),
			_Utils_Tuple2('ぺにい', 'ペニー'),
			_Utils_Tuple2('ふらん', 'フラン'),
			_Utils_Tuple2('まるく', 'マルク'),
			_Utils_Tuple2('るぴい', 'ルピー'),
			_Utils_Tuple2('ゆうろ', 'ユーロ'),
			_Utils_Tuple2('うぉん', 'ウォン'),
			_Utils_Tuple2('ばあつ', 'バーツ'),
			_Utils_Tuple2('ごじん', '御仁'),
			_Utils_Tuple2('やつめ', 'やつめ'),
			_Utils_Tuple2('こじん', '古人'),
			_Utils_Tuple2('じじん', '時人'),
			_Utils_Tuple2('じんば', '人馬'),
			_Utils_Tuple2('てあい', '手合い'),
			_Utils_Tuple2('やから', '輩'),
			_Utils_Tuple2('やつら', 'やつら'),
			_Utils_Tuple2('ちゃま', '－ちゃま'),
			_Utils_Tuple2('ちゃん', '－ちゃん'),
			_Utils_Tuple2('みこと', '－みこと'),
			_Utils_Tuple2('かっか', '－閣下'),
			_Utils_Tuple2('げいか', '－猊下'),
			_Utils_Tuple2('みせす', 'ミセス'),
			_Utils_Tuple2('まだむ', 'マダム'),
			_Utils_Tuple2('だいし', '大姉'),
			_Utils_Tuple2('しんじ', '信士'),
			_Utils_Tuple2('われら', '我ら'),
			_Utils_Tuple2('わたし', '私'),
			_Utils_Tuple2('あたし', 'あたし'),
			_Utils_Tuple2('わちき', 'わちき'),
			_Utils_Tuple2('あっし', 'あっし'),
			_Utils_Tuple2('わっし', 'わっし'),
			_Utils_Tuple2('わっち', 'わっち'),
			_Utils_Tuple2('わらわ', 'わらわ'),
			_Utils_Tuple2('ぼくら', '僕ら'),
			_Utils_Tuple2('おいら', 'おいら'),
			_Utils_Tuple2('よはい', '余輩'),
			_Utils_Tuple2('ぐせい', '愚生'),
			_Utils_Tuple2('ぐろう', '愚老'),
			_Utils_Tuple2('ぐそう', '愚僧'),
			_Utils_Tuple2('ぐとく', '愚禿'),
			_Utils_Tuple2('なんじ', '汝'),
			_Utils_Tuple2('あんた', 'あんた'),
			_Utils_Tuple2('きくん', '貴君'),
			_Utils_Tuple2('きけい', '貴兄'),
			_Utils_Tuple2('きでん', '貴殿'),
			_Utils_Tuple2('きじょ', '貴女'),
			_Utils_Tuple2('おまえ', 'お前'),
			_Utils_Tuple2('おんみ', '御身'),
			_Utils_Tuple2('おもと', 'おもと'),
			_Utils_Tuple2('きさま', '貴様'),
			_Utils_Tuple2('おのれ', '己'),
			_Utils_Tuple2('おぬし', 'おぬし'),
			_Utils_Tuple2('てめえ', 'てめえ'),
			_Utils_Tuple2('しょし', '諸姉'),
			_Utils_Tuple2('そんか', '尊家'),
			_Utils_Tuple2('おたく', 'お宅'),
			_Utils_Tuple2('かれら', '彼ら'),
			_Utils_Tuple2('こいつ', 'こいつ'),
			_Utils_Tuple2('そいつ', 'そいつ'),
			_Utils_Tuple2('あいつ', 'あいつ'),
			_Utils_Tuple2('こやつ', 'こやつ'),
			_Utils_Tuple2('そやつ', 'そやつ'),
			_Utils_Tuple2('かやつ', 'かやつ'),
			_Utils_Tuple2('きゃつ', 'きゃつ'),
			_Utils_Tuple2('どうし', '同氏'),
			_Utils_Tuple2('どなた', 'どなた'),
			_Utils_Tuple2('どいつ', 'どいつ'),
			_Utils_Tuple2('だれか', 'だれか'),
			_Utils_Tuple2('だれも', 'だれも'),
			_Utils_Tuple2('せるふ', 'セルフ'),
			_Utils_Tuple2('たにん', '他人'),
			_Utils_Tuple2('かくじ', '各自'),
			_Utils_Tuple2('かくい', '各位'),
			_Utils_Tuple2('わがみ', '我が身'),
			_Utils_Tuple2('じんぎ', '神祇'),
			_Utils_Tuple2('おがみ', '男神'),
			_Utils_Tuple2('めがみ', '女神'),
			_Utils_Tuple2('ぶしん', '武神'),
			_Utils_Tuple2('びしん', '美神'),
			_Utils_Tuple2('ししん', '詩神'),
			_Utils_Tuple2('きしん', '鬼神'),
			_Utils_Tuple2('ほとけ', '仏'),
			_Utils_Tuple2('ぶつだ', '仏陀'),
			_Utils_Tuple2('せそん', '世尊'),
			_Utils_Tuple2('しゃか', '釈迦'),
			_Utils_Tuple2('あみだ', 'あみだ'),
			_Utils_Tuple2('やくし', '薬師'),
			_Utils_Tuple2('ぼさつ', '菩薩'),
			_Utils_Tuple2('じぞう', '地蔵'),
			_Utils_Tuple2('みろく', '弥勒'),
			_Utils_Tuple2('ふげん', '普賢'),
			_Utils_Tuple2('らかん', '羅漢'),
			_Utils_Tuple2('でうす', 'デウス'),
			_Utils_Tuple2('えほば', 'エホバ'),
			_Utils_Tuple2('あらあ', 'アラー'),
			_Utils_Tuple2('めしあ', 'メシア'),
			_Utils_Tuple2('さんみ', '三位'),
			_Utils_Tuple2('ぜうす', 'ゼウス'),
			_Utils_Tuple2('えんま', 'えんま'),
			_Utils_Tuple2('におう', '仁王・二王'),
			_Utils_Tuple2('えびす', 'えびす'),
			_Utils_Tuple2('えろす', 'エロス'),
			_Utils_Tuple2('さんた', 'サンタ'),
			_Utils_Tuple2('けしん', '化身'),
			_Utils_Tuple2('ごんげ', '権化'),
			_Utils_Tuple2('みたま', 'み霊'),
			_Utils_Tuple2('ちれい', '地霊'),
			_Utils_Tuple2('こだま', '木霊'),
			_Utils_Tuple2('すだま', 'すだま'),
			_Utils_Tuple2('にんふ', 'ニンフ'),
			_Utils_Tuple2('まじん', '魔神'),
			_Utils_Tuple2('あくま', '悪魔'),
			_Utils_Tuple2('でびる', 'デビル'),
			_Utils_Tuple2('まもの', '魔物'),
			_Utils_Tuple2('まおう', '魔王'),
			_Utils_Tuple2('まじょ', '魔女'),
			_Utils_Tuple2('ようま', '妖魔'),
			_Utils_Tuple2('あっき', '悪鬼'),
			_Utils_Tuple2('きちく', '鬼畜'),
			_Utils_Tuple2('てんま', '天魔'),
			_Utils_Tuple2('やしゃ', '夜叉'),
			_Utils_Tuple2('しゅら', '修羅'),
			_Utils_Tuple2('らせつ', '羅刹'),
			_Utils_Tuple2('おばけ', 'お化け'),
			_Utils_Tuple2('へんげ', '変化'),
			_Utils_Tuple2('てんぐ', '天狗'),
			_Utils_Tuple2('いるい', '異類'),
			_Utils_Tuple2('おとこ', '男'),
			_Utils_Tuple2('だんし', '男子'),
			_Utils_Tuple2('おのこ', 'おのこ'),
			_Utils_Tuple2('やろう', '野郎'),
			_Utils_Tuple2('とのご', '殿御'),
			_Utils_Tuple2('しんし', '紳士'),
			_Utils_Tuple2('おんな', '女'),
			_Utils_Tuple2('じょし', '女子'),
			_Utils_Tuple2('めのこ', '女の子'),
			_Utils_Tuple2('おなご', 'おなご'),
			_Utils_Tuple2('ふじん', '婦人'),
			_Utils_Tuple2('ふじょ', '婦女'),
			_Utils_Tuple2('にんぷ', '妊婦'),
			_Utils_Tuple2('びじん', '美人'),
			_Utils_Tuple2('かじん', '佳人'),
			_Utils_Tuple2('めいか', '名花'),
			_Utils_Tuple2('こまち', '－小町'),
			_Utils_Tuple2('びなん', '美男'),
			_Utils_Tuple2('びじょ', '美女'),
			_Utils_Tuple2('しゃん', 'シャン'),
			_Utils_Tuple2('ようふ', '妖婦'),
			_Utils_Tuple2('どくふ', '毒婦'),
			_Utils_Tuple2('ばんぷ', 'バンプ'),
			_Utils_Tuple2('しこめ', 'しこめ'),
			_Utils_Tuple2('おかめ', 'おかめ'),
			_Utils_Tuple2('らじょ', '裸女'),
			_Utils_Tuple2('だんじ', '男児'),
			_Utils_Tuple2('じょじ', '女児'),
			_Utils_Tuple2('みずこ', '水子'),
			_Utils_Tuple2('みずご', '水子'),
			_Utils_Tuple2('あかご', '赤子'),
			_Utils_Tuple2('べびい', 'ベビー'),
			_Utils_Tuple2('えいじ', '嬰児'),
			_Utils_Tuple2('ぼおい', 'ボーイ'),
			_Utils_Tuple2('がある', 'ガール'),
			_Utils_Tuple2('こども', '子供'),
			_Utils_Tuple2('きっず', 'キッズ'),
			_Utils_Tuple2('わらべ', '童'),
			_Utils_Tuple2('わっぱ', 'わっぱ'),
			_Utils_Tuple2('ぼうや', '坊や'),
			_Utils_Tuple2('ぼうず', '坊主'),
			_Utils_Tuple2('いいこ', 'いい子'),
			_Utils_Tuple2('しにあ', 'シニア'),
			_Utils_Tuple2('やんぐ', 'ヤング'),
			_Utils_Tuple2('わかて', '若手'),
			_Utils_Tuple2('あにい', 'あにい'),
			_Utils_Tuple2('おとめ', '乙女'),
			_Utils_Tuple2('むすめ', '娘'),
			_Utils_Tuple2('ぎゃる', 'ギャル'),
			_Utils_Tuple2('おぼこ', 'おぼこ'),
			_Utils_Tuple2('おとな', '大人'),
			_Utils_Tuple2('としま', '年増'),
			_Utils_Tuple2('おじん', 'おじん'),
			_Utils_Tuple2('おばん', 'おばん'),
			_Utils_Tuple2('ろうや', '老爺'),
			_Utils_Tuple2('ろうば', '老婆'),
			_Utils_Tuple2('おきな', 'おきな'),
			_Utils_Tuple2('おうな', 'おうな'),
			_Utils_Tuple2('じじい', 'じじい'),
			_Utils_Tuple2('ばばあ', 'ばばあ'),
			_Utils_Tuple2('ころう', '古老・故老'),
			_Utils_Tuple2('ししゃ', '死者'),
			_Utils_Tuple2('かぞく', '家族'),
			_Utils_Tuple2('いぞく', '遺族'),
			_Utils_Tuple2('おやこ', '親子'),
			_Utils_Tuple2('しじょ', '子女'),
			_Utils_Tuple2('してい', '子弟'),
			_Utils_Tuple2('さいし', '妻子'),
			_Utils_Tuple2('つまこ', '妻子'),
			_Utils_Tuple2('ひぞく', '卑属'),
			_Utils_Tuple2('しぞく', '氏族'),
			_Utils_Tuple2('おうけ', '王家'),
			_Utils_Tuple2('みやけ', '宮家'),
			_Utils_Tuple2('へいけ', '平家'),
			_Utils_Tuple2('ふうふ', '夫婦'),
			_Utils_Tuple2('ふさい', '夫妻'),
			_Utils_Tuple2('めおと', 'めおと'),
			_Utils_Tuple2('いもせ', '妹背'),
			_Utils_Tuple2('おっと', '夫'),
			_Utils_Tuple2('ふくん', '夫君'),
			_Utils_Tuple2('あるじ', 'あるじ'),
			_Utils_Tuple2('せんぷ', '先夫'),
			_Utils_Tuple2('ぜんぷ', '前夫'),
			_Utils_Tuple2('わいふ', 'ワイフ'),
			_Utils_Tuple2('きさき', 'きさき'),
			_Utils_Tuple2('おうひ', '王妃'),
			_Utils_Tuple2('ないぎ', '内儀'),
			_Utils_Tuple2('かかあ', 'かかあ'),
			_Utils_Tuple2('ごさい', '後妻'),
			_Utils_Tuple2('ぐさい', '愚妻'),
			_Utils_Tuple2('ていふ', '貞婦'),
			_Utils_Tuple2('せっぷ', '節婦'),
			_Utils_Tuple2('やもめ', 'やもめ'),
			_Utils_Tuple2('こづれ', '子連れ'),
			_Utils_Tuple2('よめご', '嫁御'),
			_Utils_Tuple2('しんぷ', '新婦'),
			_Utils_Tuple2('おやご', '親御'),
			_Utils_Tuple2('こもち', '子持ち'),
			_Utils_Tuple2('おやじ', 'おやじ'),
			_Utils_Tuple2('げんぷ', '厳父'),
			_Utils_Tuple2('そんぷ', '尊父'),
			_Utils_Tuple2('ぼどう', '母堂'),
			_Utils_Tuple2('ちちご', '父御'),
			_Utils_Tuple2('ははご', '母御'),
			_Utils_Tuple2('ろうふ', '老父'),
			_Utils_Tuple2('ろうぼ', '老母'),
			_Utils_Tuple2('けんぼ', '賢母'),
			_Utils_Tuple2('せんぴ', '先妣'),
			_Utils_Tuple2('ぼうぼ', '亡母'),
			_Utils_Tuple2('けいぼ', '継母'),
			_Utils_Tuple2('しょぼ', '庶母'),
			_Utils_Tuple2('ようぼ', '養母'),
			_Utils_Tuple2('がくふ', '岳父'),
			_Utils_Tuple2('めのと', 'めのと'),
			_Utils_Tuple2('そふぼ', '祖父母'),
			_Utils_Tuple2('せんぞ', '先祖'),
			_Utils_Tuple2('そせん', '祖先'),
			_Utils_Tuple2('そそう', '祖宗'),
			_Utils_Tuple2('がんそ', '元祖'),
			_Utils_Tuple2('えんそ', '遠祖'),
			_Utils_Tuple2('こうそ', '皇祖'),
			_Utils_Tuple2('あいじ', '愛児'),
			_Utils_Tuple2('こだね', '子種'),
			_Utils_Tuple2('にせい', '二世'),
			_Utils_Tuple2('いっし', '一子'),
			_Utils_Tuple2('じじょ', '児女'),
			_Utils_Tuple2('ういご', '初子'),
			_Utils_Tuple2('ふたご', '双子'),
			_Utils_Tuple2('みつご', '三つ子'),
			_Utils_Tuple2('としご', '年子'),
			_Utils_Tuple2('むすこ', '息子'),
			_Utils_Tuple2('せがれ', 'せがれ'),
			_Utils_Tuple2('しそく', '子息'),
			_Utils_Tuple2('まなご', 'まなご'),
			_Utils_Tuple2('とんじ', '豚児'),
			_Utils_Tuple2('たいし', '太子'),
			_Utils_Tuple2('けいし', '継嗣'),
			_Utils_Tuple2('じなん', '次男・二男'),
			_Utils_Tuple2('すえこ', '末子'),
			_Utils_Tuple2('まっし', '末子'),
			_Utils_Tuple2('じっし', '実子'),
			_Utils_Tuple2('つれこ', '連れ子'),
			_Utils_Tuple2('さとご', '里子'),
			_Utils_Tuple2('すてご', '捨て子'),
			_Utils_Tuple2('ぼうじ', '亡児'),
			_Utils_Tuple2('しそん', '子孫'),
			_Utils_Tuple2('ひまご', 'ひ孫'),
			_Utils_Tuple2('まごこ', '孫子'),
			_Utils_Tuple2('ぐけい', '愚兄'),
			_Utils_Tuple2('あにき', '兄貴'),
			_Utils_Tuple2('あねご', '姉御'),
			_Utils_Tuple2('あねき', '姉貴'),
			_Utils_Tuple2('じてい', '次弟'),
			_Utils_Tuple2('ぐてい', '愚弟'),
			_Utils_Tuple2('ぐまい', '愚妹'),
			_Utils_Tuple2('ぎけい', '義兄'),
			_Utils_Tuple2('ぎてい', '義弟'),
			_Utils_Tuple2('ぎまい', '義妹'),
			_Utils_Tuple2('みうち', '身内'),
			_Utils_Tuple2('みより', '身寄り'),
			_Utils_Tuple2('はくふ', '伯父'),
			_Utils_Tuple2('おいご', 'おい御'),
			_Utils_Tuple2('めいご', 'めい御'),
			_Utils_Tuple2('いとこ', 'いとこ'),
			_Utils_Tuple2('はとこ', 'はとこ'),
			_Utils_Tuple2('あいて', '相手'),
			_Utils_Tuple2('みかた', '味方・身方'),
			_Utils_Tuple2('かたき', '敵'),
			_Utils_Tuple2('なかま', '仲間'),
			_Utils_Tuple2('めえと', 'メート'),
			_Utils_Tuple2('とはい', '徒輩'),
			_Utils_Tuple2('くるう', 'クルー'),
			_Utils_Tuple2('しゆう', '師友'),
			_Utils_Tuple2('ちゆう', '知友'),
			_Utils_Tuple2('なじみ', 'なじみ'),
			_Utils_Tuple2('いゆう', '畏友'),
			_Utils_Tuple2('ちじん', '知人'),
			_Utils_Tuple2('ちいん', '知音'),
			_Utils_Tuple2('しるべ', '知る辺'),
			_Utils_Tuple2('りんぽ', '隣保'),
			_Utils_Tuple2('たより', '頼り'),
			_Utils_Tuple2('はにい', 'ハニー'),
			_Utils_Tuple2('かれし', '彼氏'),
			_Utils_Tuple2('りいべ', 'リーベ'),
			_Utils_Tuple2('じごろ', 'ジゴロ'),
			_Utils_Tuple2('そばめ', 'そばめ'),
			_Utils_Tuple2('しゅふ', '主婦'),
			_Utils_Tuple2('おかみ', 'おかみ'),
			_Utils_Tuple2('ほすと', 'ホスト'),
			_Utils_Tuple2('げすと', 'ゲスト'),
			_Utils_Tuple2('がかく', '賀客'),
			_Utils_Tuple2('きひん', '貴賓'),
			_Utils_Tuple2('こかく', '顧客'),
			_Utils_Tuple2('とくい', '得意'),
			_Utils_Tuple2('ぶぞく', '部族'),
			_Utils_Tuple2('とうい', '東夷'),
			_Utils_Tuple2('わじん', '和人'),
			_Utils_Tuple2('はやと', 'はやと'),
			_Utils_Tuple2('えみし', 'えみし'),
			_Utils_Tuple2('あいぬ', 'アイヌ'),
			_Utils_Tuple2('はっか', '客家'),
			_Utils_Tuple2('あらぶ', 'アラブ'),
			_Utils_Tuple2('らてん', 'ラテン'),
			_Utils_Tuple2('すらぶ', 'スラブ'),
			_Utils_Tuple2('いじん', '異人'),
			_Utils_Tuple2('とみん', '都民'),
			_Utils_Tuple2('ふみん', '府民'),
			_Utils_Tuple2('しみん', '市民'),
			_Utils_Tuple2('どみん', '土民'),
			_Utils_Tuple2('いみん', '移民'),
			_Utils_Tuple2('るみん', '流民'),
			_Utils_Tuple2('せじん', '世人'),
			_Utils_Tuple2('ぐみん', '愚民'),
			_Utils_Tuple2('みかど', '帝'),
			_Utils_Tuple2('はおう', '覇王'),
			_Utils_Tuple2('きんぐ', 'キング'),
			_Utils_Tuple2('つぁあ', 'ツァー'),
			_Utils_Tuple2('どこう', '土侯'),
			_Utils_Tuple2('ばろん', 'バロン'),
			_Utils_Tuple2('ふだい', '譜代・譜第'),
			_Utils_Tuple2('とざま', '外様'),
			_Utils_Tuple2('きじん', '貴人'),
			_Utils_Tuple2('げにん', '下人'),
			_Utils_Tuple2('はんし', '藩士'),
			_Utils_Tuple2('ごうし', '郷士'),
			_Utils_Tuple2('しぶん', '士分'),
			_Utils_Tuple2('どれい', '奴隷'),
			_Utils_Tuple2('ちしゃ', '治者'),
			_Utils_Tuple2('せれぶ', 'セレブ'),
			_Utils_Tuple2('ろうし', '浪士'),
			_Utils_Tuple2('ふしゃ', '富者'),
			_Utils_Tuple2('どごう', '土豪'),
			_Utils_Tuple2('じんし', '人士'),
			_Utils_Tuple2('めいし', '名士'),
			_Utils_Tuple2('けっし', '傑士'),
			_Utils_Tuple2('こくし', '国士'),
			_Utils_Tuple2('しじん', '士人'),
			_Utils_Tuple2('はくび', '白眉'),
			_Utils_Tuple2('はしゃ', '覇者'),
			_Utils_Tuple2('びっぷ', 'ＶＩＰ'),
			_Utils_Tuple2('いざい', '偉材・異材'),
			_Utils_Tuple2('きさい', '奇才'),
			_Utils_Tuple2('ひじり', 'ひじり'),
			_Utils_Tuple2('あせい', '亜聖'),
			_Utils_Tuple2('くんし', '君子'),
			_Utils_Tuple2('ぼんぷ', '凡夫'),
			_Utils_Tuple2('こもの', '小物'),
			_Utils_Tuple2('たいと', '泰斗'),
			_Utils_Tuple2('けんい', '権威'),
			_Utils_Tuple2('がせん', '画仙'),
			_Utils_Tuple2('はかせ', '博士'),
			_Utils_Tuple2('はくし', '博士'),
			_Utils_Tuple2('てきき', '手利き'),
			_Utils_Tuple2('てだれ', '手だれ'),
			_Utils_Tuple2('めきき', '目利き'),
			_Utils_Tuple2('ぐるめ', 'グルメ'),
			_Utils_Tuple2('じむか', '事務家'),
			_Utils_Tuple2('ざいけ', '在家'),
			_Utils_Tuple2('ぐしゃ', '愚者'),
			_Utils_Tuple2('ぐじん', '愚人'),
			_Utils_Tuple2('ぐぶつ', '愚物'),
			_Utils_Tuple2('あほう', 'あほう'),
			_Utils_Tuple2('やじん', '野人'),
			_Utils_Tuple2('とじん', '都人'),
			_Utils_Tuple2('ぎじん', '義人'),
			_Utils_Tuple2('ぎみん', '義民'),
			_Utils_Tuple2('れっぷ', '烈婦'),
			_Utils_Tuple2('きらあ', 'キラー'),
			_Utils_Tuple2('さぎし', '詐欺師'),
			_Utils_Tuple2('ぼうと', '暴徒'),
			_Utils_Tuple2('やくざ', 'やくざ'),
			_Utils_Tuple2('ばくと', '博徒'),
			_Utils_Tuple2('しきま', '色魔'),
			_Utils_Tuple2('なとり', '名取'),
			_Utils_Tuple2('まにあ', 'マニア'),
			_Utils_Tuple2('こりや', '凝り屋'),
			_Utils_Tuple2('めもま', 'メモ魔'),
			_Utils_Tuple2('ふるて', '古手'),
			_Utils_Tuple2('あらて', '新手'),
			_Utils_Tuple2('さくし', '策士'),
			_Utils_Tuple2('やりて', 'やり手'),
			_Utils_Tuple2('とうし', '闘士'),
			_Utils_Tuple2('わざし', '業師'),
			_Utils_Tuple2('やまし', '山師'),
			_Utils_Tuple2('べんし', '弁士'),
			_Utils_Tuple2('らがあ', 'ラガー'),
			_Utils_Tuple2('すたあ', 'スター'),
			_Utils_Tuple2('ほおぷ', 'ホープ'),
			_Utils_Tuple2('こごう', '古豪'),
			_Utils_Tuple2('けんし', '剣士'),
			_Utils_Tuple2('てれや', '照れ屋'),
			_Utils_Tuple2('ねぼう', '寝坊'),
			_Utils_Tuple2('のみて', '飲み手'),
			_Utils_Tuple2('しゅか', '酒家'),
			_Utils_Tuple2('うとう', '右党'),
			_Utils_Tuple2('おませ', 'おませ'),
			_Utils_Tuple2('かかく', '過客'),
			_Utils_Tuple2('へんろ', '遍路'),
			_Utils_Tuple2('るにん', '流人'),
			_Utils_Tuple2('ほりょ', '捕虜'),
			_Utils_Tuple2('ふりょ', '俘虜'),
			_Utils_Tuple2('とりこ', 'とりこ'),
			_Utils_Tuple2('まいご', '迷子'),
			_Utils_Tuple2('めしい', 'めしい'),
			_Utils_Tuple2('あしゃ', '唖者'),
			_Utils_Tuple2('しにん', '死人'),
			_Utils_Tuple2('しびと', '死人'),
			_Utils_Tuple2('ぞくと', '賊徒'),
			_Utils_Tuple2('ばぞく', '馬賊'),
			_Utils_Tuple2('ぎぞく', '義賊'),
			_Utils_Tuple2('あきす', '空き巣'),
			_Utils_Tuple2('よとう', '夜盗'),
			_Utils_Tuple2('やとう', '夜盗'),
			_Utils_Tuple2('わこう', '倭寇・和寇'),
			_Utils_Tuple2('はこし', '箱師'),
			_Utils_Tuple2('よたか', '夜たか'),
			_Utils_Tuple2('すずき', '鈴木'),
			_Utils_Tuple2('たなか', '田中'),
			_Utils_Tuple2('やまだ', '山田'),
			_Utils_Tuple2('すみす', 'スミス'),
			_Utils_Tuple2('たろう', '太郎'),
			_Utils_Tuple2('はなこ', '花子'),
			_Utils_Tuple2('じょん', 'ジョン'),
			_Utils_Tuple2('ひみこ', '卑弥呼'),
			_Utils_Tuple2('はりす', 'ハリス'),
			_Utils_Tuple2('ねるう', 'ネルー'),
			_Utils_Tuple2('もうし', '孟子'),
			_Utils_Tuple2('るそお', 'ルソー'),
			_Utils_Tuple2('ぱうろ', 'パウロ'),
			_Utils_Tuple2('ぺてろ', 'ペテロ'),
			_Utils_Tuple2('よはね', 'ヨハネ'),
			_Utils_Tuple2('もおぜ', 'モーゼ'),
			_Utils_Tuple2('るたあ', 'ルター'),
			_Utils_Tuple2('げえて', 'ゲーテ'),
			_Utils_Tuple2('でゅま', 'デュマ'),
			_Utils_Tuple2('かみゅ', 'カミュ'),
			_Utils_Tuple2('りはく', '李白'),
			_Utils_Tuple2('だんて', 'ダンテ'),
			_Utils_Tuple2('りるけ', 'リルケ'),
			_Utils_Tuple2('しらあ', 'シラー'),
			_Utils_Tuple2('はいね', 'ハイネ'),
			_Utils_Tuple2('そうぎ', '宗祇'),
			_Utils_Tuple2('ぶそん', '蕪村'),
			_Utils_Tuple2('いっさ', '一茶'),
			_Utils_Tuple2('ごっほ', 'ゴッホ'),
			_Utils_Tuple2('ぴかそ', 'ピカソ'),
			_Utils_Tuple2('ろだん', 'ロダン'),
			_Utils_Tuple2('ばっは', 'バッハ'),
			_Utils_Tuple2('ぜあみ', '世阿弥'),
			_Utils_Tuple2('かんと', 'カント'),
			_Utils_Tuple2('しゅし', '朱子'),
			_Utils_Tuple2('ぼおあ', 'ボーア'),
			_Utils_Tuple2('りんね', 'リンネ'),
			_Utils_Tuple2('こっほ', 'コッホ'),
			_Utils_Tuple2('ろみお', 'ロミオ'),
			_Utils_Tuple2('ぶいん', '部員'),
			_Utils_Tuple2('ざいん', '座員'),
			_Utils_Tuple2('ぎいん', '議員'),
			_Utils_Tuple2('どうぎ', '道議'),
			_Utils_Tuple2('けんぎ', '県議'),
			_Utils_Tuple2('そんぎ', '村議'),
			_Utils_Tuple2('いいん', '委員'),
			_Utils_Tuple2('ぎしゅ', '技手'),
			_Utils_Tuple2('ぎかん', '技官'),
			_Utils_Tuple2('ぎこう', '技工'),
			_Utils_Tuple2('こおち', 'コーチ'),
			_Utils_Tuple2('いしゃ', '医者'),
			_Utils_Tuple2('めいい', '名医'),
			_Utils_Tuple2('ぐんい', '軍医'),
			_Utils_Tuple2('げかい', '外科医'),
			_Utils_Tuple2('じゅい', '樹医'),
			_Utils_Tuple2('はりい', '針医'),
			_Utils_Tuple2('つうじ', '通事'),
			_Utils_Tuple2('がくし', '楽師'),
			_Utils_Tuple2('かしゅ', '歌手'),
			_Utils_Tuple2('てなあ', 'テナー'),
			_Utils_Tuple2('えかき', '絵かき'),
			_Utils_Tuple2('がはく', '画伯'),
			_Utils_Tuple2('がじん', '画人'),
			_Utils_Tuple2('ざつき', '座付き'),
			_Utils_Tuple2('おやま', 'おやま'),
			_Utils_Tuple2('こかた', '子方'),
			_Utils_Tuple2('くろこ', '黒子'),
			_Utils_Tuple2('じかた', '地方'),
			_Utils_Tuple2('たてし', 'たてし'),
			_Utils_Tuple2('たゆう', '大夫'),
			_Utils_Tuple2('まいこ', '舞子'),
			_Utils_Tuple2('どうけ', '道化'),
			_Utils_Tuple2('ぴえろ', 'ピエロ'),
			_Utils_Tuple2('りきし', '力士'),
			_Utils_Tuple2('すぱい', 'スパイ'),
			_Utils_Tuple2('しゃけ', '社家'),
			_Utils_Tuple2('ぐうじ', '宮司'),
			_Utils_Tuple2('しゃし', '社司'),
			_Utils_Tuple2('ぜんに', '禅尼'),
			_Utils_Tuple2('そうに', '僧尼'),
			_Utils_Tuple2('びくに', '比丘尼'),
			_Utils_Tuple2('にそう', '尼僧'),
			_Utils_Tuple2('にこう', '尼公'),
			_Utils_Tuple2('ろうに', '老尼'),
			_Utils_Tuple2('ほうし', '法師'),
			_Utils_Tuple2('ぜんじ', '禅師'),
			_Utils_Tuple2('ぜんけ', '禅家'),
			_Utils_Tuple2('そうず', '僧都'),
			_Utils_Tuple2('まいす', '売僧'),
			_Utils_Tuple2('ぼくし', '牧師'),
			_Utils_Tuple2('いちこ', '市子'),
			_Utils_Tuple2('いたこ', 'いたこ'),
			_Utils_Tuple2('ざとう', '座頭'),
			_Utils_Tuple2('つかさ', 'つかさ'),
			_Utils_Tuple2('かんり', '官吏'),
			_Utils_Tuple2('りいん', '吏員'),
			_Utils_Tuple2('こうり', '公吏'),
			_Utils_Tuple2('ぞくり', '俗吏'),
			_Utils_Tuple2('こくり', '酷吏'),
			_Utils_Tuple2('やとい', '雇い'),
			_Utils_Tuple2('こいん', '雇員'),
			_Utils_Tuple2('ぶかん', '武官'),
			_Utils_Tuple2('ぜいり', '税吏'),
			_Utils_Tuple2('ごくり', '獄吏'),
			_Utils_Tuple2('ないし', '内侍'),
			_Utils_Tuple2('つぼね', 'つぼね'),
			_Utils_Tuple2('さかん', 'さかん'),
			_Utils_Tuple2('はんじ', '判事'),
			_Utils_Tuple2('ほごし', '保護司'),
			_Utils_Tuple2('しゅご', '守護'),
			_Utils_Tuple2('じとう', '地頭'),
			_Utils_Tuple2('かろう', '家老'),
			_Utils_Tuple2('しつじ', '執事'),
			_Utils_Tuple2('なぬし', '名主'),
			_Utils_Tuple2('せんむ', '専務'),
			_Utils_Tuple2('よびや', '呼び屋'),
			_Utils_Tuple2('ひしょ', '秘書'),
			_Utils_Tuple2('ししょ', '司書'),
			_Utils_Tuple2('かぶや', '株屋'),
			_Utils_Tuple2('とんや', '問屋'),
			_Utils_Tuple2('てきや', '的屋'),
			_Utils_Tuple2('やみや', 'やみ屋'),
			_Utils_Tuple2('だふや', 'だふ屋'),
			_Utils_Tuple2('くずや', 'くず屋'),
			_Utils_Tuple2('ばたや', 'ばた屋'),
			_Utils_Tuple2('うりこ', '売り子'),
			_Utils_Tuple2('こぞう', '小僧'),
			_Utils_Tuple2('でっち', 'でっち'),
			_Utils_Tuple2('つりし', '釣り師'),
			_Utils_Tuple2('きこり', '木こり'),
			_Utils_Tuple2('こびき', '木びき'),
			_Utils_Tuple2('ぼくふ', '牧父'),
			_Utils_Tuple2('すいふ', '水夫'),
			_Utils_Tuple2('ふなこ', '船子'),
			_Utils_Tuple2('なかし', '仲仕'),
			_Utils_Tuple2('しゃふ', '車夫'),
			_Utils_Tuple2('たくみ', 'たくみ'),
			_Utils_Tuple2('だいく', '大工'),
			_Utils_Tuple2('いしや', '石屋'),
			_Utils_Tuple2('いしく', '石工'),
			_Utils_Tuple2('かじや', 'かじ屋'),
			_Utils_Tuple2('とぎし', '研師'),
			_Utils_Tuple2('がこう', '画工'),
			_Utils_Tuple2('こうや', '紺屋'),
			_Utils_Tuple2('ぶっし', '仏師'),
			_Utils_Tuple2('こっく', 'コック'),
			_Utils_Tuple2('いたば', '板場'),
			_Utils_Tuple2('にわし', '庭師'),
			_Utils_Tuple2('どかた', '土方'),
			_Utils_Tuple2('ぽりす', 'ポリス'),
			_Utils_Tuple2('けいぶ', '警部'),
			_Utils_Tuple2('よりき', '与力'),
			_Utils_Tuple2('とりて', '捕り手'),
			_Utils_Tuple2('かじゃ', '冠者'),
			_Utils_Tuple2('やっこ', 'やっこ'),
			_Utils_Tuple2('しもべ', '僕'),
			_Utils_Tuple2('げぼく', '下僕'),
			_Utils_Tuple2('じいや', 'じいや'),
			_Utils_Tuple2('げろう', '下郎'),
			_Utils_Tuple2('ていり', '廷吏'),
			_Utils_Tuple2('めえど', 'メード'),
			_Utils_Tuple2('なかい', '仲居'),
			_Utils_Tuple2('ねえや', '姉や'),
			_Utils_Tuple2('ばあや', 'ばあや'),
			_Utils_Tuple2('ろうひ', '老婢'),
			_Utils_Tuple2('こもり', '子守'),
			_Utils_Tuple2('おんば', 'おんば'),
			_Utils_Tuple2('がいど', 'ガイド'),
			_Utils_Tuple2('でまえ', '出前'),
			_Utils_Tuple2('げいぎ', '芸妓'),
			_Utils_Tuple2('めいぎ', '名妓'),
			_Utils_Tuple2('げいこ', '芸子'),
			_Utils_Tuple2('がくと', '学徒'),
			_Utils_Tuple2('えんじ', '園児'),
			_Utils_Tuple2('ぶじん', '武人'),
			_Utils_Tuple2('ぶべん', '武弁'),
			_Utils_Tuple2('しそつ', '士卒'),
			_Utils_Tuple2('しへい', '私兵'),
			_Utils_Tuple2('むしゃ', '武者'),
			_Utils_Tuple2('のぶし', '野武士'),
			_Utils_Tuple2('しれい', '司令'),
			_Utils_Tuple2('りくさ', '陸佐'),
			_Utils_Tuple2('かいさ', '海佐'),
			_Utils_Tuple2('くうさ', '空佐'),
			_Utils_Tuple2('りくし', '陸士'),
			_Utils_Tuple2('ほへい', '歩兵'),
			_Utils_Tuple2('きへい', '騎兵'),
			_Utils_Tuple2('へっど', 'ヘッド'),
			_Utils_Tuple2('ちいふ', 'チーフ'),
			_Utils_Tuple2('ですく', 'デスク'),
			_Utils_Tuple2('しぇふ', 'シェフ'),
			_Utils_Tuple2('しゅさ', '主査'),
			_Utils_Tuple2('しゅじ', '主事'),
			_Utils_Tuple2('そうむ', '総務'),
			_Utils_Tuple2('ほっす', '法主'),
			_Utils_Tuple2('おんし', '恩師'),
			_Utils_Tuple2('もんか', '門下'),
			_Utils_Tuple2('うじこ', '氏子'),
			_Utils_Tuple2('だんか', '檀家'),
			_Utils_Tuple2('だんと', '檀徒'),
			_Utils_Tuple2('もんと', '門徒'),
			_Utils_Tuple2('しんと', '信徒'),
			_Utils_Tuple2('だんな', '檀那・旦那'),
			_Utils_Tuple2('おそば', 'お側'),
			_Utils_Tuple2('じしゃ', '侍者'),
			_Utils_Tuple2('てあし', '手足'),
			_Utils_Tuple2('けらい', '家来'),
			_Utils_Tuple2('てした', '手下'),
			_Utils_Tuple2('はいか', '配下'),
			_Utils_Tuple2('てさき', '手先'),
			_Utils_Tuple2('てごま', '手ごま'),
			_Utils_Tuple2('てだい', '手代'),
			_Utils_Tuple2('とてい', '徒弟'),
			_Utils_Tuple2('こぶん', '子分'),
			_Utils_Tuple2('めうえ', '目上'),
			_Utils_Tuple2('めした', '目下'),
			_Utils_Tuple2('こさん', '古参'),
			_Utils_Tuple2('やぬし', '家主'),
			_Utils_Tuple2('おおや', '大家'),
			_Utils_Tuple2('たなこ', 'たなこ'),
			_Utils_Tuple2('じぬし', '地主'),
			_Utils_Tuple2('もしゅ', '喪主'),
			_Utils_Tuple2('かかり', '係'),
			_Utils_Tuple2('ひばん', '非番'),
			_Utils_Tuple2('かばん', '下番'),
			_Utils_Tuple2('かんじ', '幹事'),
			_Utils_Tuple2('さんよ', '参与'),
			_Utils_Tuple2('なりて', 'なり手'),
			_Utils_Tuple2('うけて', '受け手'),
			_Utils_Tuple2('かきて', '書き手'),
			_Utils_Tuple2('よみて', '読み手'),
			_Utils_Tuple2('わしゃ', '話者'),
			_Utils_Tuple2('ききて', '聞き手'),
			_Utils_Tuple2('うりて', '売り手'),
			_Utils_Tuple2('かいて', '買い手'),
			_Utils_Tuple2('かして', '貸し手'),
			_Utils_Tuple2('かりて', '借り手'),
			_Utils_Tuple2('くれて', 'くれ手'),
			_Utils_Tuple2('ひきて', '弾き手'),
			_Utils_Tuple2('のりて', '乗り手'),
			_Utils_Tuple2('だしゅ', '舵手'),
			_Utils_Tuple2('つりて', '釣り手'),
			_Utils_Tuple2('だじん', '打陣'),
			_Utils_Tuple2('だせん', '打線'),
			_Utils_Tuple2('だしゃ', '打者'),
			_Utils_Tuple2('だいだ', '代打'),
			_Utils_Tuple2('はやく', '端役'),
			_Utils_Tuple2('こやく', '子役'),
			_Utils_Tuple2('ぜんざ', '前座'),
			_Utils_Tuple2('ふぁん', 'ファン'),
			_Utils_Tuple2('そにん', '訴人'),
			_Utils_Tuple2('ひこく', '被告'),
			_Utils_Tuple2('しんぱ', 'シンパ'),
			_Utils_Tuple2('おるぐ', 'オルグ'),
			_Utils_Tuple2('めつけ', '目付'),
			_Utils_Tuple2('つかい', 'つかい'),
			_Utils_Tuple2('ふくし', '副使'),
			_Utils_Tuple2('とくし', '特使'),
			_Utils_Tuple2('みっし', '密使'),
			_Utils_Tuple2('ぐんし', '軍使'),
			_Utils_Tuple2('にぬし', '荷主'),
			_Utils_Tuple2('せしゅ', '施主'),
			_Utils_Tuple2('ばしゅ', '馬主'),
			_Utils_Tuple2('いっこ', '一己'),
			_Utils_Tuple2('ぜんこ', '全戸'),
			_Utils_Tuple2('おいえ', 'お家'),
			_Utils_Tuple2('かんか', '患家'),
			_Utils_Tuple2('わがや', '我が家'),
			_Utils_Tuple2('とうけ', '当家'),
			_Utils_Tuple2('じっか', '実家'),
			_Utils_Tuple2('おさと', 'お里'),
			_Utils_Tuple2('こんか', '婚家'),
			_Utils_Tuple2('ほんけ', '本家'),
			_Utils_Tuple2('そうけ', '宗家'),
			_Utils_Tuple2('ぶんけ', '分家'),
			_Utils_Tuple2('べっけ', '別家'),
			_Utils_Tuple2('しんけ', '新家'),
			_Utils_Tuple2('ごうか', '豪家'),
			_Utils_Tuple2('こざん', '故山'),
			_Utils_Tuple2('いなか', '田舎'),
			_Utils_Tuple2('おくに', 'お国'),
			_Utils_Tuple2('じもと', '地もと'),
			_Utils_Tuple2('こっか', '国家'),
			_Utils_Tuple2('みくに', 'み国'),
			_Utils_Tuple2('そこく', '祖国'),
			_Utils_Tuple2('ぼこく', '母国'),
			_Utils_Tuple2('ここく', '故国'),
			_Utils_Tuple2('いこく', '異国'),
			_Utils_Tuple2('いほう', '異邦'),
			_Utils_Tuple2('いいき', '異域'),
			_Utils_Tuple2('ないち', '内地'),
			_Utils_Tuple2('がいち', '外地'),
			_Utils_Tuple2('ほんど', '本土'),
			_Utils_Tuple2('とゆう', '都邑'),
			_Utils_Tuple2('たうん', 'タウン'),
			_Utils_Tuple2('さんと', '三都'),
			_Utils_Tuple2('こえど', '小江戸'),
			_Utils_Tuple2('としぶ', '都市部'),
			_Utils_Tuple2('ぐんぶ', '郡部'),
			_Utils_Tuple2('ざいち', '在地'),
			_Utils_Tuple2('へんち', '辺地'),
			_Utils_Tuple2('みやこ', '都'),
			_Utils_Tuple2('とうと', '東都'),
			_Utils_Tuple2('ていと', '帝都'),
			_Utils_Tuple2('こうと', '皇都'),
			_Utils_Tuple2('しゅと', '首都'),
			_Utils_Tuple2('こくと', '国都'),
			_Utils_Tuple2('けんと', '県都'),
			_Utils_Tuple2('すいと', '水都'),
			_Utils_Tuple2('こたん', 'コタン'),
			_Utils_Tuple2('ばすえ', '場末'),
			_Utils_Tuple2('すらむ', 'スラム'),
			_Utils_Tuple2('かがい', '花街'),
			_Utils_Tuple2('くるわ', 'くるわ'),
			_Utils_Tuple2('しゅく', '宿'),
			_Utils_Tuple2('しっち', '失地'),
			_Utils_Tuple2('とびち', '飛び地'),
			_Utils_Tuple2('しきち', '敷地'),
			_Utils_Tuple2('ふけん', '府県'),
			_Utils_Tuple2('こあざ', '小字'),
			_Utils_Tuple2('かんく', '管区'),
			_Utils_Tuple2('がっく', '学区'),
			_Utils_Tuple2('こうく', '校区'),
			_Utils_Tuple2('ぎょく', '漁区'),
			_Utils_Tuple2('けんか', '県下'),
			_Utils_Tuple2('にほん', '日本'),
			_Utils_Tuple2('やまと', '大和・倭'),
			_Utils_Tuple2('わこく', '倭国'),
			_Utils_Tuple2('あずま', 'あずま'),
			_Utils_Tuple2('おうう', '奥羽'),
			_Utils_Tuple2('きんき', '近畿'),
			_Utils_Tuple2('しこく', '四国'),
			_Utils_Tuple2('つくし', '筑紫'),
			_Utils_Tuple2('わかん', '和漢'),
			_Utils_Tuple2('わよう', '和洋'),
			_Utils_Tuple2('あじあ', 'アジア'),
			_Utils_Tuple2('くだら', '百済'),
			_Utils_Tuple2('しらぎ', '新羅'),
			_Utils_Tuple2('ほくぎ', '北魏'),
			_Utils_Tuple2('ごだい', '五代'),
			_Utils_Tuple2('もうこ', '蒙古'),
			_Utils_Tuple2('しゃむ', 'シャム'),
			_Utils_Tuple2('びるま', 'ビルマ'),
			_Utils_Tuple2('いんど', 'インド'),
			_Utils_Tuple2('いらん', 'イラン'),
			_Utils_Tuple2('いらく', 'イラク'),
			_Utils_Tuple2('とるこ', 'トルコ'),
			_Utils_Tuple2('ろしあ', 'ロシア'),
			_Utils_Tuple2('それん', 'ソ連'),
			_Utils_Tuple2('ちぇこ', 'チェコ'),
			_Utils_Tuple2('すいす', 'スイス'),
			_Utils_Tuple2('かなだ', 'カナダ'),
			_Utils_Tuple2('ぱなま', 'パナマ'),
			_Utils_Tuple2('ぺるう', 'ペルー'),
			_Utils_Tuple2('なにわ', '難波'),
			_Utils_Tuple2('めっか', 'メッカ'),
			_Utils_Tuple2('ろおま', 'ローマ'),
			_Utils_Tuple2('ぷらは', 'プラハ'),
			_Utils_Tuple2('ぺきん', '北京'),
			_Utils_Tuple2('そうる', 'ソウル'),
			_Utils_Tuple2('ちしま', '千島'),
			_Utils_Tuple2('はわい', 'ハワイ'),
			_Utils_Tuple2('ぎんざ', '銀座'),
			_Utils_Tuple2('せけん', '世間'),
			_Utils_Tuple2('はいそ', 'ハイソ'),
			_Utils_Tuple2('せかい', '世界'),
			_Utils_Tuple2('うだい', '宇内'),
			_Utils_Tuple2('このよ', 'この世'),
			_Utils_Tuple2('あのよ', 'あの世'),
			_Utils_Tuple2('しがん', '此岸'),
			_Utils_Tuple2('うきよ', '浮き世'),
			_Utils_Tuple2('ぞくせ', '俗世'),
			_Utils_Tuple2('せぞく', '世俗'),
			_Utils_Tuple2('しゃば', '娑婆'),
			_Utils_Tuple2('かたく', '火宅'),
			_Utils_Tuple2('ちかい', '地界'),
			_Utils_Tuple2('ちまた', 'ちまた'),
			_Utils_Tuple2('とこよ', '常世'),
			_Utils_Tuple2('じごく', '地獄'),
			_Utils_Tuple2('ならく', '奈落'),
			_Utils_Tuple2('らくど', '楽土'),
			_Utils_Tuple2('まかい', '魔界'),
			_Utils_Tuple2('りえん', '梨園'),
			_Utils_Tuple2('ようろ', '要路'),
			_Utils_Tuple2('がだん', '画壇'),
			_Utils_Tuple2('しだん', '詩壇'),
			_Utils_Tuple2('もちば', '持ち場'),
			_Utils_Tuple2('あなば', '穴場'),
			_Utils_Tuple2('はんろ', '販路'),
			_Utils_Tuple2('ふろあ', 'フロア'),
			_Utils_Tuple2('かじば', '火事場'),
			_Utils_Tuple2('はんば', '飯場'),
			_Utils_Tuple2('かりば', '狩り場'),
			_Utils_Tuple2('としょ', '屠所'),
			_Utils_Tuple2('やきば', '焼き場'),
			_Utils_Tuple2('てきち', '敵地'),
			_Utils_Tuple2('じんち', '陣地'),
			_Utils_Tuple2('はやば', '早場'),
			_Utils_Tuple2('ぎょば', '漁場'),
			_Utils_Tuple2('しゃじ', '社寺'),
			_Utils_Tuple2('げくう', '外宮'),
			_Utils_Tuple2('やしろ', '社'),
			_Utils_Tuple2('ほこら', 'ほこら'),
			_Utils_Tuple2('たまや', '霊屋'),
			_Utils_Tuple2('いなり', 'いなり'),
			_Utils_Tuple2('じいん', '寺院'),
			_Utils_Tuple2('ぶつじ', '仏寺'),
			_Utils_Tuple2('がらん', '伽藍'),
			_Utils_Tuple2('のでら', '野寺'),
			_Utils_Tuple2('ほんじ', '本寺'),
			_Utils_Tuple2('まつじ', '末寺'),
			_Utils_Tuple2('こさつ', '古刹'),
			_Utils_Tuple2('はいじ', '廃寺'),
			_Utils_Tuple2('もすく', 'モスク'),
			_Utils_Tuple2('じゅく', '塾'),
			_Utils_Tuple2('やがく', '夜学'),
			_Utils_Tuple2('いだい', '医大'),
			_Utils_Tuple2('びだい', '美大'),
			_Utils_Tuple2('がくぶ', '学部'),
			_Utils_Tuple2('ぼこう', '母校'),
			_Utils_Tuple2('のうし', '農試'),
			_Utils_Tuple2('こんす', '公司'),
			_Utils_Tuple2('せぎん', '世銀'),
			_Utils_Tuple2('とぎん', '都銀'),
			_Utils_Tuple2('しぎん', '市銀'),
			_Utils_Tuple2('ちぎん', '地銀'),
			_Utils_Tuple2('しちや', '質屋'),
			_Utils_Tuple2('こうば', '工場'),
			_Utils_Tuple2('いちば', '市場'),
			_Utils_Tuple2('ばざあ', 'バザー'),
			_Utils_Tuple2('ふりま', 'フリマ'),
			_Utils_Tuple2('みなと', '港'),
			_Utils_Tuple2('はとば', '波止場'),
			_Utils_Tuple2('ぷうる', 'プール'),
			_Utils_Tuple2('きぶつ', 'キブツ'),
			_Utils_Tuple2('みせや', '店屋'),
			_Utils_Tuple2('しにせ', 'しにせ'),
			_Utils_Tuple2('ほんぽ', '本舗'),
			_Utils_Tuple2('たてん', '他店'),
			_Utils_Tuple2('でみせ', '出店'),
			_Utils_Tuple2('すとあ', 'ストア'),
			_Utils_Tuple2('よみせ', '夜店'),
			_Utils_Tuple2('めしや', '飯屋'),
			_Utils_Tuple2('そばや', 'そば屋'),
			_Utils_Tuple2('すしや', 'すし屋'),
			_Utils_Tuple2('ぐりる', 'グリル'),
			_Utils_Tuple2('ちゃや', '茶屋'),
			_Utils_Tuple2('さぼう', '茶房'),
			_Utils_Tuple2('かふぇ', 'カフェ'),
			_Utils_Tuple2('さてん', '茶店'),
			_Utils_Tuple2('のみや', '飲み屋'),
			_Utils_Tuple2('さかば', '酒場'),
			_Utils_Tuple2('おきや', '置屋'),
			_Utils_Tuple2('あげや', '揚げ屋'),
			_Utils_Tuple2('ぎろう', '妓楼'),
			_Utils_Tuple2('こめや', '米屋'),
			_Utils_Tuple2('もちや', 'もち屋'),
			_Utils_Tuple2('やおや', '八百屋'),
			_Utils_Tuple2('にくや', '肉屋'),
			_Utils_Tuple2('さかや', '酒屋'),
			_Utils_Tuple2('ちゃほ', '茶舗'),
			_Utils_Tuple2('かしや', '菓子屋'),
			_Utils_Tuple2('ぱんや', 'パン屋'),
			_Utils_Tuple2('やくほ', '薬舗'),
			_Utils_Tuple2('すみや', '炭屋'),
			_Utils_Tuple2('げたや', '下駄屋'),
			_Utils_Tuple2('くつや', '靴屋'),
			_Utils_Tuple2('かさや', '傘屋'),
			_Utils_Tuple2('かぐや', '家具屋'),
			_Utils_Tuple2('はなや', '花屋'),
			_Utils_Tuple2('かみや', '紙屋'),
			_Utils_Tuple2('ほんや', '本屋'),
			_Utils_Tuple2('たけや', '竹屋'),
			_Utils_Tuple2('やねや', '屋根屋'),
			_Utils_Tuple2('がすや', 'ガス屋'),
			_Utils_Tuple2('やどや', '宿屋'),
			_Utils_Tuple2('はたご', 'はたご'),
			_Utils_Tuple2('ほてる', 'ホテル'),
			_Utils_Tuple2('とこや', '床屋'),
			_Utils_Tuple2('ふろや', 'ふろ屋'),
			_Utils_Tuple2('がろう', '画廊'),
			_Utils_Tuple2('くらぶ', 'クラブ'),
			_Utils_Tuple2('かじの', 'カジノ'),
			_Utils_Tuple2('さろん', 'サロン'),
			_Utils_Tuple2('ほおる', 'ホール'),
			_Utils_Tuple2('しらす', '白州'),
			_Utils_Tuple2('やえい', '野営'),
			_Utils_Tuple2('じんや', '陣屋'),
			_Utils_Tuple2('ほんぶ', '本部'),
			_Utils_Tuple2('こくふ', '国府'),
			_Utils_Tuple2('ばくふ', '幕府'),
			_Utils_Tuple2('こうぎ', '公儀'),
			_Utils_Tuple2('かんが', '官衙'),
			_Utils_Tuple2('やくば', '役場'),
			_Utils_Tuple2('こっこ', '国庫'),
			_Utils_Tuple2('ちさい', '地裁'),
			_Utils_Tuple2('かさい', '家裁'),
			_Utils_Tuple2('ちけん', '地検'),
			_Utils_Tuple2('してつ', '私鉄'),
			_Utils_Tuple2('ぎかい', '議会'),
			_Utils_Tuple2('にいん', '二院'),
			_Utils_Tuple2('かいん', '下院'),
			_Utils_Tuple2('へいば', '兵馬'),
			_Utils_Tuple2('てぜい', '手勢'),
			_Utils_Tuple2('じぐん', '自軍'),
			_Utils_Tuple2('こぐん', '孤軍'),
			_Utils_Tuple2('かへい', '寡兵'),
			_Utils_Tuple2('うって', '討手'),
			_Utils_Tuple2('おって', '追っ手'),
			_Utils_Tuple2('よせて', '寄せ手'),
			_Utils_Tuple2('ごづめ', '後詰め'),
			_Utils_Tuple2('こうび', '後備'),
			_Utils_Tuple2('くたい', '区隊'),
			_Utils_Tuple2('なとお', 'ＮＡＴＯ'),
			_Utils_Tuple2('りいぐ', 'リーグ'),
			_Utils_Tuple2('ききん', '基金'),
			_Utils_Tuple2('たんそ', '単組'),
			_Utils_Tuple2('ろうそ', '労組'),
			_Utils_Tuple2('ぎるど', 'ギルド'),
			_Utils_Tuple2('みやざ', '宮座'),
			_Utils_Tuple2('かると', 'カルト'),
			_Utils_Tuple2('いっぱ', '一派'),
			_Utils_Tuple2('べっぱ', '別派'),
			_Utils_Tuple2('ぶんぱ', '分派'),
			_Utils_Tuple2('しょは', '諸派'),
			_Utils_Tuple2('かくは', '各派'),
			_Utils_Tuple2('せくと', 'セクト'),
			_Utils_Tuple2('はとは', 'はと派'),
			_Utils_Tuple2('たかは', 'たか派'),
			_Utils_Tuple2('こうは', '硬派'),
			_Utils_Tuple2('がくは', '学派'),
			_Utils_Tuple2('りんぱ', '琳派'),
			_Utils_Tuple2('ぶっか', '仏家'),
			_Utils_Tuple2('しとう', '私党'),
			_Utils_Tuple2('じみん', '自民'),
			_Utils_Tuple2('なちす', 'ナチス'),
			_Utils_Tuple2('ばんど', 'バンド'),
			_Utils_Tuple2('いちざ', '一座'),
			_Utils_Tuple2('にぐん', '二軍'),
			_Utils_Tuple2('いちみ', '一味'),
			_Utils_Tuple2('ととう', '徒党'),
			_Utils_Tuple2('ちいむ', 'チーム'),
			_Utils_Tuple2('とりお', 'トリオ'),
			_Utils_Tuple2('はばつ', '派閥'),
			_Utils_Tuple2('こころ', '心'),
			_Utils_Tuple2('しゅが', '主我'),
			_Utils_Tuple2('たいが', '大我'),
			_Utils_Tuple2('ぼつが', '没我'),
			_Utils_Tuple2('めっし', '滅私'),
			_Utils_Tuple2('むしん', '無心'),
			_Utils_Tuple2('むねん', '無念'),
			_Utils_Tuple2('げんき', '元気'),
			_Utils_Tuple2('けっき', '血気'),
			_Utils_Tuple2('ちのけ', '血の気'),
			_Utils_Tuple2('えいき', '英気'),
			_Utils_Tuple2('きあい', '気合い'),
			_Utils_Tuple2('きつけ', '気付け'),
			_Utils_Tuple2('いくじ', '意気地'),
			_Utils_Tuple2('きおい', '気負い'),
			_Utils_Tuple2('きはく', '気迫'),
			_Utils_Tuple2('やまけ', '山気'),
			_Utils_Tuple2('やまき', '山気'),
			_Utils_Tuple2('つよき', '強気'),
			_Utils_Tuple2('よわき', '弱気'),
			_Utils_Tuple2('ぎゆう', '義勇'),
			_Utils_Tuple2('ゆうぶ', '勇武'),
			_Utils_Tuple2('ぶゆう', '武勇'),
			_Utils_Tuple2('きのり', '気乗り'),
			_Utils_Tuple2('のりき', '乗り気'),
			_Utils_Tuple2('きこん', '気根'),
			_Utils_Tuple2('どぎも', '度肝'),
			_Utils_Tuple2('がっつ', 'ガッツ'),
			_Utils_Tuple2('きこつ', '気骨'),
			_Utils_Tuple2('わかげ', '若気'),
			_Utils_Tuple2('ゆだん', '油断'),
			_Utils_Tuple2('きぬけ', '気抜け'),
			_Utils_Tuple2('きおれ', '気折れ'),
			_Utils_Tuple2('せんす', 'センス'),
			_Utils_Tuple2('はため', 'はた目'),
			_Utils_Tuple2('むかん', '無感'),
			_Utils_Tuple2('みかく', '味覚'),
			_Utils_Tuple2('きもち', '気持ち'),
			_Utils_Tuple2('よかん', '予感'),
			_Utils_Tuple2('しげき', '刺激'),
			_Utils_Tuple2('いたさ', '痛さ'),
			_Utils_Tuple2('かゆみ', 'かゆみ'),
			_Utils_Tuple2('かゆさ', 'かゆさ'),
			_Utils_Tuple2('むつう', '無痛'),
			_Utils_Tuple2('きぜつ', '気絶'),
			_Utils_Tuple2('のぼせ', 'のぼせ'),
			_Utils_Tuple2('めまい', 'めまい'),
			_Utils_Tuple2('あっけ', 'あっけ'),
			_Utils_Tuple2('かつえ', 'かつえ'),
			_Utils_Tuple2('ひぼし', '干ぼし'),
			_Utils_Tuple2('きかつ', '飢渇'),
			_Utils_Tuple2('かわき', '渇き'),
			_Utils_Tuple2('べんい', '便意'),
			_Utils_Tuple2('びくん', '微醺'),
			_Utils_Tuple2('びすい', '微酔'),
			_Utils_Tuple2('ますい', '麻酔'),
			_Utils_Tuple2('くいけ', '食い気'),
			_Utils_Tuple2('はきけ', '吐き気'),
			_Utils_Tuple2('おしん', '悪心'),
			_Utils_Tuple2('つかれ', '疲れ'),
			_Utils_Tuple2('ひろう', '疲労'),
			_Utils_Tuple2('ひはい', '疲憊'),
			_Utils_Tuple2('ひへい', '疲弊'),
			_Utils_Tuple2('ねむけ', '眠気'),
			_Utils_Tuple2('すいま', '睡魔'),
			_Utils_Tuple2('ねむり', '眠り'),
			_Utils_Tuple2('ねんね', 'ねんね'),
			_Utils_Tuple2('かりね', '仮寝'),
			_Utils_Tuple2('かみん', '仮眠'),
			_Utils_Tuple2('ごすい', '午睡'),
			_Utils_Tuple2('ひるね', '昼寝'),
			_Utils_Tuple2('にどね', '二度寝'),
			_Utils_Tuple2('ねだめ', '寝だめ'),
			_Utils_Tuple2('うきね', '浮き寝'),
			_Utils_Tuple2('だみん', '惰眠'),
			_Utils_Tuple2('ねつき', '寝付き'),
			_Utils_Tuple2('ねこみ', '寝込み'),
			_Utils_Tuple2('めざめ', '目覚め'),
			_Utils_Tuple2('ねざめ', '寝覚め'),
			_Utils_Tuple2('ねおき', '寝起き'),
			_Utils_Tuple2('ねぼけ', '寝ぼけ'),
			_Utils_Tuple2('うつつ', 'うつつ'),
			_Utils_Tuple2('ゆめじ', '夢路'),
			_Utils_Tuple2('ゆめみ', '夢見'),
			_Utils_Tuple2('きちむ', '吉夢'),
			_Utils_Tuple2('れいむ', '霊夢'),
			_Utils_Tuple2('あくむ', '悪夢'),
			_Utils_Tuple2('めいむ', '迷夢'),
			_Utils_Tuple2('ざんむ', '残夢'),
			_Utils_Tuple2('たたり', 'たたり'),
			_Utils_Tuple2('いろけ', '色気'),
			_Utils_Tuple2('ここち', '心地'),
			_Utils_Tuple2('ゆかい', '愉快'),
			_Utils_Tuple2('きえつ', '喜悦'),
			_Utils_Tuple2('ずいき', '随喜'),
			_Utils_Tuple2('ゆえつ', '愉悦'),
			_Utils_Tuple2('ゆらく', '愉楽'),
			_Utils_Tuple2('しらけ', '白け'),
			_Utils_Tuple2('ふかい', '不快'),
			_Utils_Tuple2('おそれ', '恐れ'),
			_Utils_Tuple2('おじけ', 'おじけ'),
			_Utils_Tuple2('すりる', 'スリル'),
			_Utils_Tuple2('ばうて', '場打て'),
			_Utils_Tuple2('いかり', '怒り'),
			_Utils_Tuple2('げきど', '激怒'),
			_Utils_Tuple2('ふんど', '憤怒'),
			_Utils_Tuple2('ふんぬ', '憤怒'),
			_Utils_Tuple2('しふん', '私憤'),
			_Utils_Tuple2('ひふん', '悲憤'),
			_Utils_Tuple2('ぎふん', '義憤'),
			_Utils_Tuple2('よふん', '余憤'),
			_Utils_Tuple2('はがみ', '歯がみ'),
			_Utils_Tuple2('みれん', '未練'),
			_Utils_Tuple2('あんど', '安堵'),
			_Utils_Tuple2('へいき', '平気'),
			_Utils_Tuple2('きぼね', '気骨'),
			_Utils_Tuple2('ふあん', '不安'),
			_Utils_Tuple2('うれい', '憂い'),
			_Utils_Tuple2('うれえ', '憂え'),
			_Utils_Tuple2('けねん', '懸念'),
			_Utils_Tuple2('きゆう', '杞憂'),
			_Utils_Tuple2('あせり', '焦り'),
			_Utils_Tuple2('あがき', 'あがき'),
			_Utils_Tuple2('ふまん', '不満'),
			_Utils_Tuple2('ふふく', '不服'),
			_Utils_Tuple2('ふへい', '不平'),
			_Utils_Tuple2('しこり', 'しこり'),
			_Utils_Tuple2('くらく', '苦楽'),
			_Utils_Tuple2('くなん', '苦難'),
			_Utils_Tuple2('くつう', '苦痛'),
			_Utils_Tuple2('くのう', '苦悩'),
			_Utils_Tuple2('ゆうく', '憂苦'),
			_Utils_Tuple2('ろうく', '労苦'),
			_Utils_Tuple2('くろう', '苦労'),
			_Utils_Tuple2('つうく', '痛苦'),
			_Utils_Tuple2('しんく', '辛苦'),
			_Utils_Tuple2('さんく', '惨苦'),
			_Utils_Tuple2('ごうく', '業苦'),
			_Utils_Tuple2('せめく', '責め苦'),
			_Utils_Tuple2('こんく', '困苦'),
			_Utils_Tuple2('くもん', '苦悶'),
			_Utils_Tuple2('なやみ', '悩み'),
			_Utils_Tuple2('もだえ', 'もだえ'),
			_Utils_Tuple2('あわれ', '哀れ'),
			_Utils_Tuple2('ひあい', '悲哀'),
			_Utils_Tuple2('ひかん', '悲観'),
			_Utils_Tuple2('なげき', '嘆き'),
			_Utils_Tuple2('ひたん', '悲嘆'),
			_Utils_Tuple2('いたで', '痛手'),
			_Utils_Tuple2('がんみ', '玩味'),
			_Utils_Tuple2('こうお', '好悪'),
			_Utils_Tuple2('このみ', '好み'),
			_Utils_Tuple2('ごのみ', '－好み'),
			_Utils_Tuple2('けんお', '嫌悪'),
			_Utils_Tuple2('えんお', '厭悪'),
			_Utils_Tuple2('けんき', '嫌忌'),
			_Utils_Tuple2('いやけ', '嫌気'),
			_Utils_Tuple2('ごめん', '御免'),
			_Utils_Tuple2('しんそ', '親疎'),
			_Utils_Tuple2('よしみ', 'よしみ'),
			_Utils_Tuple2('こんい', '懇意'),
			_Utils_Tuple2('あまえ', '甘え'),
			_Utils_Tuple2('ぜんい', '善意'),
			_Utils_Tuple2('じつい', '実意'),
			_Utils_Tuple2('あくい', '悪意'),
			_Utils_Tuple2('わるぎ', '悪気'),
			_Utils_Tuple2('どくけ', '毒気'),
			_Utils_Tuple2('にくさ', '憎さ'),
			_Utils_Tuple2('ぞうお', '憎悪'),
			_Utils_Tuple2('てきい', '敵意'),
			_Utils_Tuple2('てきし', '敵視'),
			_Utils_Tuple2('じんじ', '仁慈'),
			_Utils_Tuple2('ゆうぎ', '友誼'),
			_Utils_Tuple2('じあい', '自愛'),
			_Utils_Tuple2('たあい', '他愛'),
			_Utils_Tuple2('いあい', '遺愛'),
			_Utils_Tuple2('あいこ', '愛顧'),
			_Utils_Tuple2('あいご', '愛護'),
			_Utils_Tuple2('ひれん', '悲恋'),
			_Utils_Tuple2('こいじ', '恋路'),
			_Utils_Tuple2('あいぼ', '愛慕'),
			_Utils_Tuple2('れんぼ', '恋慕'),
			_Utils_Tuple2('けそう', '懸想'),
			_Utils_Tuple2('ほのじ', 'ほの字'),
			_Utils_Tuple2('かいこ', '懐古'),
			_Utils_Tuple2('ついぼ', '追慕'),
			_Utils_Tuple2('なさけ', '情け'),
			_Utils_Tuple2('こんし', '懇志'),
			_Utils_Tuple2('いあん', '慰安'),
			_Utils_Tuple2('むじひ', '無慈悲'),
			_Utils_Tuple2('しっと', '嫉妬'),
			_Utils_Tuple2('しっし', '嫉視'),
			_Utils_Tuple2('そねみ', 'そねみ'),
			_Utils_Tuple2('ねたみ', 'ねたみ'),
			_Utils_Tuple2('ひがみ', 'ひがみ'),
			_Utils_Tuple2('うらみ', '恨み'),
			_Utils_Tuple2('しえん', '私怨'),
			_Utils_Tuple2('しこん', '私恨'),
			_Utils_Tuple2('えんさ', '怨嗟'),
			_Utils_Tuple2('いけい', '畏敬'),
			_Utils_Tuple2('いふく', '畏服'),
			_Utils_Tuple2('きんぼ', '欣慕'),
			_Utils_Tuple2('かぶれ', 'かぶれ'),
			_Utils_Tuple2('さんび', '賛美'),
			_Utils_Tuple2('しゃい', '謝意'),
			_Utils_Tuple2('おれい', 'お礼'),
			_Utils_Tuple2('ぎわく', '疑惑'),
			_Utils_Tuple2('えこう', '回向'),
			_Utils_Tuple2('ふこう', '不孝'),
			_Utils_Tuple2('おんぎ', '恩義'),
			_Utils_Tuple2('ぎしん', '義心'),
			_Utils_Tuple2('おもわ', '面輪'),
			_Utils_Tuple2('すごみ', 'すごみ'),
			_Utils_Tuple2('いろめ', '色目'),
			_Utils_Tuple2('たいど', '態度'),
			_Utils_Tuple2('あいそ', '愛想'),
			_Utils_Tuple2('びたい', '媚態'),
			_Utils_Tuple2('きどり', '気取り'),
			_Utils_Tuple2('じがん', '慈顔'),
			_Utils_Tuple2('まがお', '真顔'),
			_Utils_Tuple2('すめん', '素面'),
			_Utils_Tuple2('しらふ', 'しらふ'),
			_Utils_Tuple2('すまし', '澄まし'),
			_Utils_Tuple2('えがお', '笑顔'),
			_Utils_Tuple2('ひそみ', 'ひそみ'),
			_Utils_Tuple2('よなき', '夜泣き'),
			_Utils_Tuple2('おえつ', '嗚咽'),
			_Utils_Tuple2('わらい', '笑い'),
			_Utils_Tuple2('こいき', '小息'),
			_Utils_Tuple2('といき', '吐息'),
			_Utils_Tuple2('こわね', '声音'),
			_Utils_Tuple2('ぼいす', 'ボイス'),
			_Utils_Tuple2('おんと', '音吐'),
			_Utils_Tuple2('むせい', '無声'),
			_Utils_Tuple2('こごえ', '小声'),
			_Utils_Tuple2('びせい', '美声'),
			_Utils_Tuple2('じごえ', '地声'),
			_Utils_Tuple2('かんこ', '歓呼'),
			_Utils_Tuple2('ばせい', '罵声'),
			_Utils_Tuple2('どせい', '怒声'),
			_Utils_Tuple2('げいは', '鯨波'),
			_Utils_Tuple2('がいか', '凱歌'),
			_Utils_Tuple2('さけび', '叫び'),
			_Utils_Tuple2('うめき', 'うめき'),
			_Utils_Tuple2('ひめい', '悲鳴'),
			_Utils_Tuple2('よわね', '弱音'),
			_Utils_Tuple2('じなき', '地鳴き'),
			_Utils_Tuple2('すてみ', '捨て身'),
			_Utils_Tuple2('しにみ', '死に身'),
			_Utils_Tuple2('いこじ', 'いこじ'),
			_Utils_Tuple2('はげみ', '励み'),
			_Utils_Tuple2('ふんき', '奮起'),
			_Utils_Tuple2('へびい', 'ヘビー'),
			_Utils_Tuple2('くしん', '苦心'),
			_Utils_Tuple2('くりょ', '苦慮'),
			_Utils_Tuple2('きんく', '勤苦'),
			_Utils_Tuple2('にんく', '忍苦'),
			_Utils_Tuple2('くせつ', '苦節'),
			_Utils_Tuple2('がまん', '我慢'),
			_Utils_Tuple2('たいだ', '怠惰'),
			_Utils_Tuple2('てぬき', '手抜き'),
			_Utils_Tuple2('なまけ', '怠け'),
			_Utils_Tuple2('ゆうだ', '遊惰'),
			_Utils_Tuple2('じしゅ', '自主'),
			_Utils_Tuple2('じそん', '自尊'),
			_Utils_Tuple2('じにん', '自任'),
			_Utils_Tuple2('じまん', '自慢'),
			_Utils_Tuple2('おごり', 'おごり'),
			_Utils_Tuple2('じとく', '自得'),
			_Utils_Tuple2('ふそん', '不遜'),
			_Utils_Tuple2('めいり', '名利'),
			_Utils_Tuple2('ほまれ', '誉れ'),
			_Utils_Tuple2('ほこり', '誇り'),
			_Utils_Tuple2('めいよ', '名誉'),
			_Utils_Tuple2('えいよ', '栄誉'),
			_Utils_Tuple2('よえい', '余栄'),
			_Utils_Tuple2('めんつ', 'メンツ'),
			_Utils_Tuple2('こけん', '沽券'),
			_Utils_Tuple2('めんぴ', '面皮'),
			_Utils_Tuple2('ざんき', '慚愧'),
			_Utils_Tuple2('ざんし', '慙死'),
			_Utils_Tuple2('なおれ', '名折れ'),
			_Utils_Tuple2('れんち', '廉恥'),
			_Utils_Tuple2('ざんげ', '懺悔'),
			_Utils_Tuple2('かいご', '改悟'),
			_Utils_Tuple2('こっき', '克己'),
			_Utils_Tuple2('きりつ', '規律・紀律'),
			_Utils_Tuple2('しよく', '私欲'),
			_Utils_Tuple2('がよく', '我欲'),
			_Utils_Tuple2('むよく', '無欲'),
			_Utils_Tuple2('よくけ', '欲気'),
			_Utils_Tuple2('ぞくけ', '俗気'),
			_Utils_Tuple2('りよく', '利欲'),
			_Utils_Tuple2('のぞみ', '望み'),
			_Utils_Tuple2('きぼう', '希望'),
			_Utils_Tuple2('ひぼう', '非望'),
			_Utils_Tuple2('やぼう', '野望'),
			_Utils_Tuple2('やしん', '野心'),
			_Utils_Tuple2('ねがい', '願い'),
			_Utils_Tuple2('きがん', '祈願'),
			_Utils_Tuple2('ごんぐ', '欣求'),
			_Utils_Tuple2('ぐどう', '求道'),
			_Utils_Tuple2('いよく', '意欲'),
			_Utils_Tuple2('しぼう', '志望'),
			_Utils_Tuple2('りっし', '立志'),
			_Utils_Tuple2('はつい', '発意'),
			_Utils_Tuple2('みゃく', '脈'),
			_Utils_Tuple2('にいず', 'ニーズ'),
			_Utils_Tuple2('こしつ', '固執'),
			_Utils_Tuple2('しつい', '失意'),
			_Utils_Tuple2('きおち', '気落ち'),
			_Utils_Tuple2('ねつい', '熱意'),
			_Utils_Tuple2('ないい', '内意'),
			_Utils_Tuple2('しんい', '真意'),
			_Utils_Tuple2('そこい', '底意'),
			_Utils_Tuple2('ほんね', '本音'),
			_Utils_Tuple2('さくい', '作意'),
			_Utils_Tuple2('つもり', '積もり'),
			_Utils_Tuple2('らいい', '来意'),
			_Utils_Tuple2('ひつい', '筆意'),
			_Utils_Tuple2('さんい', '賛意'),
			_Utils_Tuple2('だくい', '諾意'),
			_Utils_Tuple2('うりき', '売り気'),
			_Utils_Tuple2('やるき', 'やる気'),
			_Utils_Tuple2('さつい', '殺意'),
			_Utils_Tuple2('にんい', '任意'),
			_Utils_Tuple2('ずいい', '随意'),
			_Utils_Tuple2('ほうふ', '抱負'),
			_Utils_Tuple2('すんし', '寸志'),
			_Utils_Tuple2('がんい', '願意'),
			_Utils_Tuple2('みんい', '民意'),
			_Utils_Tuple2('きまま', '気まま'),
			_Utils_Tuple2('じまま', '自まま'),
			_Utils_Tuple2('むらき', 'むら気'),
			_Utils_Tuple2('うわき', '浮気'),
			_Utils_Tuple2('まかせ', '－任せ'),
			_Utils_Tuple2('ちとく', '知徳'),
			_Utils_Tuple2('とくぎ', '徳義'),
			_Utils_Tuple2('しとく', '私徳'),
			_Utils_Tuple2('びとく', '美徳'),
			_Utils_Tuple2('いとく', '遺徳'),
			_Utils_Tuple2('ふとく', '婦徳'),
			_Utils_Tuple2('りんり', '倫理'),
			_Utils_Tuple2('ごりん', '五倫'),
			_Utils_Tuple2('もらる', 'モラル'),
			_Utils_Tuple2('しぜん', '至善'),
			_Utils_Tuple2('しあく', '至悪'),
			_Utils_Tuple2('ぎぜん', '偽善'),
			_Utils_Tuple2('ぎあく', '偽悪'),
			_Utils_Tuple2('せどう', '世道'),
			_Utils_Tuple2('りどう', '吏道'),
			_Utils_Tuple2('むどう', '無道'),
			_Utils_Tuple2('ざいか', '罪科'),
			_Utils_Tuple2('はりん', '破倫'),
			_Utils_Tuple2('ふりん', '不倫'),
			_Utils_Tuple2('せいぎ', '正義'),
			_Utils_Tuple2('たいぎ', '大義'),
			_Utils_Tuple2('しめい', '使命'),
			_Utils_Tuple2('みさお', '操'),
			_Utils_Tuple2('せつぎ', '節義'),
			_Utils_Tuple2('しおん', '師恩'),
			_Utils_Tuple2('めぐみ', '恵み'),
			_Utils_Tuple2('りやく', '利益'),
			_Utils_Tuple2('おんい', '恩威'),
			_Utils_Tuple2('いのり', '祈り'),
			_Utils_Tuple2('じゅそ', '呪詛'),
			_Utils_Tuple2('のろい', 'のろい'),
			_Utils_Tuple2('まほう', '魔法'),
			_Utils_Tuple2('げどう', '外道'),
			_Utils_Tuple2('かばら', 'カバラ'),
			_Utils_Tuple2('さとり', '悟り'),
			_Utils_Tuple2('げだつ', '解脱'),
			_Utils_Tuple2('ごどう', '悟道'),
			_Utils_Tuple2('ごとく', '悟得'),
			_Utils_Tuple2('とんご', '頓悟'),
			_Utils_Tuple2('ぼだい', '菩提'),
			_Utils_Tuple2('ねはん', '涅槃'),
			_Utils_Tuple2('しれん', '試練'),
			_Utils_Tuple2('れんま', '練磨・錬磨'),
			_Utils_Tuple2('しごき', 'しごき'),
			_Utils_Tuple2('けいこ', '稽古'),
			_Utils_Tuple2('どりる', 'ドリル'),
			_Utils_Tuple2('もほう', '模倣'),
			_Utils_Tuple2('もしゃ', '模写'),
			_Utils_Tuple2('てまね', '手まね'),
			_Utils_Tuple2('みまね', '見まね'),
			_Utils_Tuple2('ぎおん', '擬音'),
			_Utils_Tuple2('ぎたい', '擬態'),
			_Utils_Tuple2('まなび', '学び'),
			_Utils_Tuple2('くがく', '苦学'),
			_Utils_Tuple2('じがく', '自学'),
			_Utils_Tuple2('さらい', 'さらい'),
			_Utils_Tuple2('さらえ', 'さらえ'),
			_Utils_Tuple2('えとく', '会得'),
			_Utils_Tuple2('ばなれ', '場慣れ'),
			_Utils_Tuple2('ならい', '習い'),
			_Utils_Tuple2('ふなれ', '不慣れ'),
			_Utils_Tuple2('てくせ', '手癖'),
			_Utils_Tuple2('でぐせ', '出癖'),
			_Utils_Tuple2('きへき', '奇癖'),
			_Utils_Tuple2('きおく', '記憶'),
			_Utils_Tuple2('おぼえ', '覚え'),
			_Utils_Tuple2('めいき', '銘記'),
			_Utils_Tuple2('きめい', '記銘'),
			_Utils_Tuple2('ろうき', '牢記'),
			_Utils_Tuple2('あんぷ', '暗譜'),
			_Utils_Tuple2('わすれ', '忘れ'),
			_Utils_Tuple2('ぼうが', '忘我'),
			_Utils_Tuple2('ちこう', '知行'),
			_Utils_Tuple2('えいち', '英知'),
			_Utils_Tuple2('しんち', '神智'),
			_Utils_Tuple2('ぜんち', '全知'),
			_Utils_Tuple2('ちりょ', '知慮'),
			_Utils_Tuple2('じゃち', '邪知'),
			_Utils_Tuple2('かんち', '奸知'),
			_Utils_Tuple2('とんち', '頓智'),
			_Utils_Tuple2('さいち', '才知'),
			_Utils_Tuple2('ちしき', '知識'),
			_Utils_Tuple2('おもい', '思い'),
			_Utils_Tuple2('ぞんじ', '存じ'),
			_Utils_Tuple2('ぎょい', '御意'),
			_Utils_Tuple2('ぐこう', '愚考'),
			_Utils_Tuple2('しりょ', '思慮'),
			_Utils_Tuple2('こりょ', '顧慮'),
			_Utils_Tuple2('しさく', '思索'),
			_Utils_Tuple2('しあん', '思案'),
			_Utils_Tuple2('しねん', '思念'),
			_Utils_Tuple2('しべん', '思弁'),
			_Utils_Tuple2('ちんし', '沈思'),
			_Utils_Tuple2('きあん', '起案'),
			_Utils_Tuple2('くめん', '工面'),
			_Utils_Tuple2('いけん', '意見'),
			_Utils_Tuple2('しけん', '私見'),
			_Utils_Tuple2('ぐけん', '愚見'),
			_Utils_Tuple2('めがね', '眼鏡'),
			_Utils_Tuple2('ごしん', '誤信'),
			_Utils_Tuple2('かいぎ', '懐疑'),
			_Utils_Tuple2('ぎもん', '疑問'),
			_Utils_Tuple2('ぎねん', '疑念'),
			_Utils_Tuple2('ぎてん', '疑点'),
			_Utils_Tuple2('ぎだん', '疑団'),
			_Utils_Tuple2('さいぎ', '猜疑'),
			_Utils_Tuple2('ようぎ', '容疑'),
			_Utils_Tuple2('ようい', '用意'),
			_Utils_Tuple2('きづき', '気付き'),
			_Utils_Tuple2('おるす', 'お留守'),
			_Utils_Tuple2('ぬかり', '抜かり'),
			_Utils_Tuple2('そろう', '疎漏'),
			_Utils_Tuple2('ぬけめ', '抜け目'),
			_Utils_Tuple2('とぼけ', 'とぼけ'),
			_Utils_Tuple2('さっち', '察知'),
			_Utils_Tuple2('たんち', '探知'),
			_Utils_Tuple2('ぞんち', '存知'),
			_Utils_Tuple2('ちしつ', '知悉'),
			_Utils_Tuple2('みしり', '見知り'),
			_Utils_Tuple2('すいち', '推知'),
			_Utils_Tuple2('みけん', '未見'),
			_Utils_Tuple2('ふめい', '不明'),
			_Utils_Tuple2('ごにん', '誤認'),
			_Utils_Tuple2('はあく', '把握'),
			_Utils_Tuple2('わかり', '分かり'),
			_Utils_Tuple2('りかい', '理解'),
			_Utils_Tuple2('がてん', '合点'),
			_Utils_Tuple2('うのみ', 'うのみ'),
			_Utils_Tuple2('ちにち', '知日'),
			_Utils_Tuple2('ちべい', '知米'),
			_Utils_Tuple2('ごかい', '誤解'),
			_Utils_Tuple2('くらべ', '比べ'),
			_Utils_Tuple2('るいひ', '類比'),
			_Utils_Tuple2('しわけ', '仕分け'),
			_Utils_Tuple2('わかち', '分かち'),
			_Utils_Tuple2('こわけ', '小分け'),
			_Utils_Tuple2('くぶん', '区分'),
			_Utils_Tuple2('くわけ', '区分け'),
			_Utils_Tuple2('みわけ', '見分け'),
			_Utils_Tuple2('けじめ', 'けじめ'),
			_Utils_Tuple2('しんび', '審美'),
			_Utils_Tuple2('よせん', '予選'),
			_Utils_Tuple2('じせん', '自選'),
			_Utils_Tuple2('さいひ', '採否'),
			_Utils_Tuple2('はかり', 'はかり'),
			_Utils_Tuple2('よそく', '予測'),
			_Utils_Tuple2('そくち', '測地'),
			_Utils_Tuple2('ださん', '打算'),
			_Utils_Tuple2('いさん', '違算'),
			_Utils_Tuple2('はさん', '破算'),
			_Utils_Tuple2('にばい', '二倍'),
			_Utils_Tuple2('びぶん', '微分'),
			_Utils_Tuple2('せぶみ', '瀬踏み'),
			_Utils_Tuple2('どくみ', '毒見・毒味'),
			_Utils_Tuple2('あじみ', '味見'),
			_Utils_Tuple2('ぎんみ', '吟味'),
			_Utils_Tuple2('てすと', 'テスト'),
			_Utils_Tuple2('ついし', '追試'),
			_Utils_Tuple2('そうさ', '捜査'),
			_Utils_Tuple2('さぐり', '探り'),
			_Utils_Tuple2('ていれ', '手入れ'),
			_Utils_Tuple2('たんさ', '探査'),
			_Utils_Tuple2('もさく', '模索'),
			_Utils_Tuple2('じびき', '字引'),
			_Utils_Tuple2('しらべ', '調べ'),
			_Utils_Tuple2('しんさ', '審査'),
			_Utils_Tuple2('かんさ', '鑑査'),
			_Utils_Tuple2('せんぎ', '詮議'),
			_Utils_Tuple2('けんさ', '検査'),
			_Utils_Tuple2('ささつ', '査察'),
			_Utils_Tuple2('さえつ', '査閲'),
			_Utils_Tuple2('したみ', '下見'),
			_Utils_Tuple2('よだん', '予断'),
			_Utils_Tuple2('ごだん', '誤断'),
			_Utils_Tuple2('さてい', '査定'),
			_Utils_Tuple2('みなし', '見なし'),
			_Utils_Tuple2('みたて', '見立て'),
			_Utils_Tuple2('すいり', '推理'),
			_Utils_Tuple2('さっし', '察し'),
			_Utils_Tuple2('ぐさつ', '愚察'),
			_Utils_Tuple2('よそう', '予想'),
			_Utils_Tuple2('みこみ', '見込み'),
			_Utils_Tuple2('かんぱ', '看破'),
			_Utils_Tuple2('めさき', '目先'),
			_Utils_Tuple2('つけめ', '付け目'),
			_Utils_Tuple2('ねらい', 'ねらい'),
			_Utils_Tuple2('めぼし', '目星'),
			_Utils_Tuple2('ごさん', '誤算'),
			_Utils_Tuple2('がべい', '画餅'),
			_Utils_Tuple2('はっけ', '八卦'),
			_Utils_Tuple2('ねぶみ', '値踏み'),
			_Utils_Tuple2('ひがめ', 'ひが目'),
			_Utils_Tuple2('よくめ', '欲目'),
			_Utils_Tuple2('けつい', '決意'),
			_Utils_Tuple2('かくご', '覚悟'),
			_Utils_Tuple2('だかい', '打開'),
			_Utils_Tuple2('みてい', '未定'),
			_Utils_Tuple2('よてい', '予定'),
			_Utils_Tuple2('ぎけつ', '議決'),
			_Utils_Tuple2('かけつ', '可決'),
			_Utils_Tuple2('ひけつ', '否決'),
			_Utils_Tuple2('さだめ', '定め'),
			_Utils_Tuple2('きまり', '決まり'),
			_Utils_Tuple2('みけつ', '未決'),
			_Utils_Tuple2('まよい', '迷い'),
			_Utils_Tuple2('まどい', '惑い'),
			_Utils_Tuple2('みきり', '見切り'),
			_Utils_Tuple2('ふくみ', '含み'),
			_Utils_Tuple2('ぐうい', '寓意'),
			_Utils_Tuple2('いわく', 'いわく'),
			_Utils_Tuple2('げんぎ', '原義'),
			_Utils_Tuple2('げんい', '原意'),
			_Utils_Tuple2('ほんぎ', '本義'),
			_Utils_Tuple2('てんぎ', '転義'),
			_Utils_Tuple2('いちぎ', '一義'),
			_Utils_Tuple2('るいぎ', '類義'),
			_Utils_Tuple2('ていぎ', '定義'),
			_Utils_Tuple2('だいい', '題意'),
			_Utils_Tuple2('ぶんい', '文意'),
			_Utils_Tuple2('てえま', 'テーマ'),
			_Utils_Tuple2('わだい', '話題'),
			_Utils_Tuple2('わとう', '話頭'),
			_Utils_Tuple2('わへい', '話柄'),
			_Utils_Tuple2('がざい', '画材'),
			_Utils_Tuple2('わざい', '話材'),
			_Utils_Tuple2('かだい', '課題'),
			_Utils_Tuple2('おうぎ', '奥義'),
			_Utils_Tuple2('おくぎ', '奥義'),
			_Utils_Tuple2('いはつ', '衣鉢'),
			_Utils_Tuple2('ひでん', '秘伝'),
			_Utils_Tuple2('ひおう', '秘奥'),
			_Utils_Tuple2('ごくい', '極意'),
			_Utils_Tuple2('ほんし', '本旨'),
			_Utils_Tuple2('ろんし', '論旨'),
			_Utils_Tuple2('かなめ', 'かなめ'),
			_Utils_Tuple2('ずぼし', '図星'),
			_Utils_Tuple2('こさい', '巨細'),
			_Utils_Tuple2('ぎあん', '議案'),
			_Utils_Tuple2('ぎだい', '議題'),
			_Utils_Tuple2('ぶつが', '物我'),
			_Utils_Tuple2('りねん', '理念'),
			_Utils_Tuple2('いでえ', 'イデー'),
			_Utils_Tuple2('いちり', '一理'),
			_Utils_Tuple2('りくつ', '理屈'),
			_Utils_Tuple2('どうり', '道理'),
			_Utils_Tuple2('てんり', '天理'),
			_Utils_Tuple2('りほう', '理法'),
			_Utils_Tuple2('じつり', '実理'),
			_Utils_Tuple2('りろん', '理論'),
			_Utils_Tuple2('りづめ', '理詰め'),
			_Utils_Tuple2('ごうり', '合理'),
			_Utils_Tuple2('ろんり', '論理'),
			_Utils_Tuple2('くうり', '空理'),
			_Utils_Tuple2('てつり', '哲理'),
			_Utils_Tuple2('がくり', '学理'),
			_Utils_Tuple2('すうり', '数理'),
			_Utils_Tuple2('てえぜ', 'テーゼ'),
			_Utils_Tuple2('ぎげん', '偽言'),
			_Utils_Tuple2('きべん', '詭弁'),
			_Utils_Tuple2('ふじつ', '不実'),
			_Utils_Tuple2('さくご', '錯誤'),
			_Utils_Tuple2('ちがえ', '－違え'),
			_Utils_Tuple2('ごぶん', '誤聞'),
			_Utils_Tuple2('ひせい', '批正'),
			_Utils_Tuple2('ぶんぶ', '文武'),
			_Utils_Tuple2('いがく', '異学'),
			_Utils_Tuple2('かもく', '課目'),
			_Utils_Tuple2('ぜんか', '全科'),
			_Utils_Tuple2('がっか', '学課'),
			_Utils_Tuple2('ほんか', '本科'),
			_Utils_Tuple2('わがく', '和学'),
			_Utils_Tuple2('びがく', '美学'),
			_Utils_Tuple2('ごがく', '語学'),
			_Utils_Tuple2('もじし', '文字史'),
			_Utils_Tuple2('ごいし', '語彙史'),
			_Utils_Tuple2('りがく', '理学'),
			_Utils_Tuple2('わさん', '和算'),
			_Utils_Tuple2('ぶつり', '物理'),
			_Utils_Tuple2('ちがく', '地学'),
			_Utils_Tuple2('りけい', '理系'),
			_Utils_Tuple2('ずこう', '図工'),
			_Utils_Tuple2('いせつ', '異説'),
			_Utils_Tuple2('こせつ', '古説'),
			_Utils_Tuple2('ぐせつ', '愚説'),
			_Utils_Tuple2('いたん', '異端'),
			_Utils_Tuple2('どぐま', 'ドグマ'),
			_Utils_Tuple2('しろん', '試論'),
			_Utils_Tuple2('じろん', '持論'),
			_Utils_Tuple2('ぐろん', '愚論'),
			_Utils_Tuple2('けろん', '戯論'),
			_Utils_Tuple2('せろん', '世論'),
			_Utils_Tuple2('よろん', '輿論'),
			_Utils_Tuple2('しゅぎ', '主義'),
			_Utils_Tuple2('いずむ', 'イズム'),
			_Utils_Tuple2('りそう', '理想'),
			_Utils_Tuple2('いであ', 'イデア'),
			_Utils_Tuple2('ろせん', '路線'),
			_Utils_Tuple2('さばく', '佐幕'),
			_Utils_Tuple2('げんり', '原理'),
			_Utils_Tuple2('るうる', 'ルール'),
			_Utils_Tuple2('おきて', 'おきて'),
			_Utils_Tuple2('はっと', '法度'),
			_Utils_Tuple2('かけん', '家憲'),
			_Utils_Tuple2('あんぽ', '安保'),
			_Utils_Tuple2('きそく', '規則'),
			_Utils_Tuple2('こおど', 'コード'),
			_Utils_Tuple2('きやく', '規約'),
			_Utils_Tuple2('ないき', '内規'),
			_Utils_Tuple2('きかく', '規格'),
			_Utils_Tuple2('いって', '一手'),
			_Utils_Tuple2('たずき', 'たずき'),
			_Utils_Tuple2('そのて', 'その手'),
			_Utils_Tuple2('うつて', '打つ手'),
			_Utils_Tuple2('ひほう', '秘方'),
			_Utils_Tuple2('じゅつ', '術'),
			_Utils_Tuple2('おうて', '王手'),
			_Utils_Tuple2('しかた', '仕方'),
			_Utils_Tuple2('でかた', '出方'),
			_Utils_Tuple2('みよう', '見よう'),
			_Utils_Tuple2('ほうと', '方途'),
			_Utils_Tuple2('ぎほう', '技法'),
			_Utils_Tuple2('わほう', '話法'),
			_Utils_Tuple2('がほう', '画法'),
			_Utils_Tuple2('だほう', '打法'),
			_Utils_Tuple2('こしき', '古式'),
			_Utils_Tuple2('わしき', '和式'),
			_Utils_Tuple2('これい', '古例'),
			_Utils_Tuple2('まなあ', 'マナー'),
			_Utils_Tuple2('ぷらん', 'プラン'),
			_Utils_Tuple2('ひけい', '秘計'),
			_Utils_Tuple2('ちぼう', '知謀'),
			_Utils_Tuple2('ひさく', '秘策'),
			_Utils_Tuple2('きさく', '奇策'),
			_Utils_Tuple2('ぐさく', '愚策'),
			_Utils_Tuple2('げさく', '下策'),
			_Utils_Tuple2('こくぜ', '国是'),
			_Utils_Tuple2('そあん', '素案'),
			_Utils_Tuple2('ぐあん', '愚案'),
			_Utils_Tuple2('したく', '支度・仕度'),
			_Utils_Tuple2('そなえ', '備え'),
			_Utils_Tuple2('はいび', '配備'),
			_Utils_Tuple2('てはい', '手配'),
			_Utils_Tuple2('ふせき', '布石'),
			_Utils_Tuple2('みきき', '見聞き'),
			_Utils_Tuple2('じもく', '耳目'),
			_Utils_Tuple2('たけん', '他見'),
			_Utils_Tuple2('ごらん', '御覧'),
			_Utils_Tuple2('きらん', '貴覧'),
			_Utils_Tuple2('たちみ', '立ち見'),
			_Utils_Tuple2('まくみ', '幕見'),
			_Utils_Tuple2('みもの', '見物'),
			_Utils_Tuple2('とおみ', '遠見'),
			_Utils_Tuple2('ふかん', '俯瞰'),
			_Utils_Tuple2('まくろ', 'マクロ'),
			_Utils_Tuple2('もくし', '黙視'),
			_Utils_Tuple2('しさつ', '視察'),
			_Utils_Tuple2('けいら', '警邏'),
			_Utils_Tuple2('みはり', '見張り'),
			_Utils_Tuple2('ものみ', '物見'),
			_Utils_Tuple2('よばん', '夜番'),
			_Utils_Tuple2('やけい', '夜警'),
			_Utils_Tuple2('るすい', '留守居'),
			_Utils_Tuple2('みとり', '見取り'),
			_Utils_Tuple2('めせん', '目線'),
			_Utils_Tuple2('よそみ', 'よそ見'),
			_Utils_Tuple2('わきみ', 'わき見'),
			_Utils_Tuple2('すきみ', '透き見'),
			_Utils_Tuple2('ほそめ', '細目'),
			_Utils_Tuple2('よこめ', '横目'),
			_Utils_Tuple2('ちかめ', '近目'),
			_Utils_Tuple2('とおめ', '遠目'),
			_Utils_Tuple2('よそめ', 'よそ目'),
			_Utils_Tuple2('わきめ', 'わき目'),
			_Utils_Tuple2('みむき', '見向き'),
			_Utils_Tuple2('しりめ', 'しり目'),
			_Utils_Tuple2('ひとめ', '一目'),
			_Utils_Tuple2('しめし', '示し'),
			_Utils_Tuple2('ないじ', '内示'),
			_Utils_Tuple2('してき', '指摘'),
			_Utils_Tuple2('あんじ', '暗示'),
			_Utils_Tuple2('ひんと', 'ヒント'),
			_Utils_Tuple2('てんじ', '展示'),
			_Utils_Tuple2('うんい', '云為'),
			_Utils_Tuple2('しゅわ', '手話'),
			_Utils_Tuple2('こうわ', '口話'),
			_Utils_Tuple2('ことば', '言葉'),
			_Utils_Tuple2('はつわ', '発話'),
			_Utils_Tuple2('おおせ', '仰せ'),
			_Utils_Tuple2('はつご', '発語'),
			_Utils_Tuple2('けつご', '結語'),
			_Utils_Tuple2('たごん', '他言'),
			_Utils_Tuple2('にごん', '二言'),
			_Utils_Tuple2('なんご', '喃語'),
			_Utils_Tuple2('ねごと', '寝言'),
			_Utils_Tuple2('げいご', '囈語'),
			_Utils_Tuple2('かごん', '過言'),
			_Utils_Tuple2('むごん', '無言'),
			_Utils_Tuple2('もくひ', '黙秘'),
			_Utils_Tuple2('ひれき', '披瀝'),
			_Utils_Tuple2('ごうご', '豪語'),
			_Utils_Tuple2('げきご', '激語'),
			_Utils_Tuple2('しった', '叱咤'),
			_Utils_Tuple2('おせじ', 'お世辞'),
			_Utils_Tuple2('だべり', 'だべり'),
			_Utils_Tuple2('ごたく', '御託'),
			_Utils_Tuple2('もうご', '妄語'),
			_Utils_Tuple2('だぼら', '駄ぼら'),
			_Utils_Tuple2('ぎゃぐ', 'ギャグ'),
			_Utils_Tuple2('そしり', 'そしり'),
			_Utils_Tuple2('あくば', '悪罵'),
			_Utils_Tuple2('つうば', '痛罵'),
			_Utils_Tuple2('めんば', '面罵'),
			_Utils_Tuple2('れいば', '冷罵'),
			_Utils_Tuple2('ばとう', '罵倒'),
			_Utils_Tuple2('まんば', '漫罵'),
			_Utils_Tuple2('びぎん', '微吟'),
			_Utils_Tuple2('せりふ', 'せりふ'),
			_Utils_Tuple2('げんご', '言語'),
			_Utils_Tuple2('ぶんじ', '文辞'),
			_Utils_Tuple2('がいだ', '咳唾'),
			_Utils_Tuple2('ろごす', 'ロゴス'),
			_Utils_Tuple2('ぶんご', '文語'),
			_Utils_Tuple2('はくわ', '白話'),
			_Utils_Tuple2('こくご', '国語'),
			_Utils_Tuple2('ほうご', '邦語'),
			_Utils_Tuple2('がいご', '外語'),
			_Utils_Tuple2('ごぞく', '語族'),
			_Utils_Tuple2('にちご', '日語'),
			_Utils_Tuple2('かんご', '漢語'),
			_Utils_Tuple2('ぼんご', '梵語'),
			_Utils_Tuple2('えいご', '英語'),
			_Utils_Tuple2('べいご', '米語'),
			_Utils_Tuple2('ふつご', '仏語'),
			_Utils_Tuple2('らんご', '蘭語'),
			_Utils_Tuple2('えどご', '江戸語'),
			_Utils_Tuple2('えいわ', '英和'),
			_Utils_Tuple2('わえい', '和英'),
			_Utils_Tuple2('なづけ', '名付け'),
			_Utils_Tuple2('ぞうご', '造語'),
			_Utils_Tuple2('なまえ', '名前'),
			_Utils_Tuple2('よびな', '呼び名'),
			_Utils_Tuple2('なのり', '名のり'),
			_Utils_Tuple2('ねえむ', 'ネーム'),
			_Utils_Tuple2('ななし', '名なし'),
			_Utils_Tuple2('かめい', '下名'),
			_Utils_Tuple2('かばね', 'かばね'),
			_Utils_Tuple2('わめい', '和名'),
			_Utils_Tuple2('いめい', '異名'),
			_Utils_Tuple2('たせい', '他姓'),
			_Utils_Tuple2('ぎめい', '偽名'),
			_Utils_Tuple2('いみな', '忌み名'),
			_Utils_Tuple2('しごう', '諡号'),
			_Utils_Tuple2('あざな', 'あざな'),
			_Utils_Tuple2('あだな', 'あだ名'),
			_Utils_Tuple2('しこな', 'しこ名'),
			_Utils_Tuple2('がごう', '雅号'),
			_Utils_Tuple2('やごう', '屋号'),
			_Utils_Tuple2('じごう', '寺号'),
			_Utils_Tuple2('ちもく', '地目'),
			_Utils_Tuple2('あてな', 'あて名'),
			_Utils_Tuple2('みだし', '見出し'),
			_Utils_Tuple2('げだい', '外題'),
			_Utils_Tuple2('なだい', '名題'),
			_Utils_Tuple2('むだい', '無題'),
			_Utils_Tuple2('がだい', '画題'),
			_Utils_Tuple2('どうは', '道破'),
			_Utils_Tuple2('かっぱ', '喝破'),
			_Utils_Tuple2('ごへい', '語弊'),
			_Utils_Tuple2('ぎせい', '擬声'),
			_Utils_Tuple2('ついく', '対句'),
			_Utils_Tuple2('たとえ', 'たとえ'),
			_Utils_Tuple2('めいゆ', '明喩'),
			_Utils_Tuple2('あんゆ', '暗喩'),
			_Utils_Tuple2('ふうゆ', '風喩・諷喩'),
			_Utils_Tuple2('かんゆ', '換喩'),
			_Utils_Tuple2('ぎがか', '戯画化'),
			_Utils_Tuple2('はんご', '反語'),
			_Utils_Tuple2('もんく', '文句'),
			_Utils_Tuple2('げんく', '言句'),
			_Utils_Tuple2('めいく', '名句'),
			_Utils_Tuple2('しげん', '至言'),
			_Utils_Tuple2('だらに', '陀羅尼'),
			_Utils_Tuple2('せいく', '成句'),
			_Utils_Tuple2('りげん', '俚諺'),
			_Utils_Tuple2('けいく', '警句'),
			_Utils_Tuple2('しゃれ', 'しゃれ'),
			_Utils_Tuple2('じぐち', '地口'),
			_Utils_Tuple2('ちゃり', 'ちゃり'),
			_Utils_Tuple2('もじり', 'もじり'),
			_Utils_Tuple2('いやく', '意訳'),
			_Utils_Tuple2('じやく', '字訳'),
			_Utils_Tuple2('ごやく', '誤訳'),
			_Utils_Tuple2('わやく', '和訳'),
			_Utils_Tuple2('ひんし', '品詞'),
			_Utils_Tuple2('しじご', '指示語'),
			_Utils_Tuple2('すうし', '数詞'),
			_Utils_Tuple2('きれじ', '切れ字'),
			_Utils_Tuple2('ごこん', '語根'),
			_Utils_Tuple2('せつじ', '接辞'),
			_Utils_Tuple2('れんご', '連語'),
			_Utils_Tuple2('ようご', '用語'),
			_Utils_Tuple2('えんご', '縁語'),
			_Utils_Tuple2('きそご', '基礎語'),
			_Utils_Tuple2('たぎご', '多義語'),
			_Utils_Tuple2('どうご', '同語'),
			_Utils_Tuple2('るいご', '類語'),
			_Utils_Tuple2('ついご', '対語'),
			_Utils_Tuple2('ごしゅ', '語種'),
			_Utils_Tuple2('やくご', '訳語'),
			_Utils_Tuple2('ぶつご', '仏語'),
			_Utils_Tuple2('けいご', '敬語'),
			_Utils_Tuple2('ぞくご', '俗語'),
			_Utils_Tuple2('しんご', '新語'),
			_Utils_Tuple2('いんご', '隠語'),
			_Utils_Tuple2('ごほう', '語法'),
			_Utils_Tuple2('とうご', '統語'),
			_Utils_Tuple2('ごとう', '語頭'),
			_Utils_Tuple2('ごまつ', '語末'),
			_Utils_Tuple2('くとう', '句読'),
			_Utils_Tuple2('しゅぶ', '主部'),
			_Utils_Tuple2('くぎれ', '句切れ'),
			_Utils_Tuple2('てんす', 'テンス'),
			_Utils_Tuple2('うけみ', '受け身'),
			_Utils_Tuple2('しえき', '使役'),
			_Utils_Tuple2('らへん', 'ラ変'),
			_Utils_Tuple2('さへん', 'サ変'),
			_Utils_Tuple2('ごおん', '語音'),
			_Utils_Tuple2('いおん', '異音'),
			_Utils_Tuple2('おんか', '音価'),
			_Utils_Tuple2('おんそ', '音素'),
			_Utils_Tuple2('ぼいん', '母音'),
			_Utils_Tuple2('ぼおん', '母音'),
			_Utils_Tuple2('ろれつ', '呂律'),
			_Utils_Tuple2('なまり', 'なまり'),
			_Utils_Tuple2('かおん', '訛音'),
			_Utils_Tuple2('とおん', 'トーン'),
			_Utils_Tuple2('てんこ', '転呼'),
			_Utils_Tuple2('ごごん', '五言'),
			_Utils_Tuple2('もんじ', '文字'),
			_Utils_Tuple2('おんじ', '音字'),
			_Utils_Tuple2('えもじ', '絵文字'),
			_Utils_Tuple2('ほうじ', '邦字'),
			_Utils_Tuple2('がいじ', '外字'),
			_Utils_Tuple2('ぼんじ', '梵字'),
			_Utils_Tuple2('すうじ', '数字'),
			_Utils_Tuple2('じづら', '字面'),
			_Utils_Tuple2('ぞくじ', '俗字'),
			_Utils_Tuple2('うそじ', 'うそ字'),
			_Utils_Tuple2('あてじ', '当て字'),
			_Utils_Tuple2('ぶしゅ', '部首'),
			_Utils_Tuple2('てへん', '手偏'),
			_Utils_Tuple2('るまた', 'るまた'),
			_Utils_Tuple2('れんが', '連火'),
			_Utils_Tuple2('にょう', '繞'),
			_Utils_Tuple2('まだれ', '麻垂れ'),
			_Utils_Tuple2('はらい', '払い'),
			_Utils_Tuple2('かしゃ', '仮借'),
			_Utils_Tuple2('こまじ', '細字'),
			_Utils_Tuple2('ほそじ', '細字'),
			_Utils_Tuple2('ふとじ', '太字'),
			_Utils_Tuple2('くろじ', '黒字'),
			_Utils_Tuple2('あかじ', '赤字'),
			_Utils_Tuple2('こもじ', '小文字'),
			_Utils_Tuple2('ごうじ', '合字'),
			_Utils_Tuple2('だきじ', '抱き字'),
			_Utils_Tuple2('せもじ', '背文字'),
			_Utils_Tuple2('すみじ', '墨字'),
			_Utils_Tuple2('つづり', 'つづり'),
			_Utils_Tuple2('すぺる', 'スペル'),
			_Utils_Tuple2('くせじ', '癖字'),
			_Utils_Tuple2('けつじ', '欠字'),
			_Utils_Tuple2('だつじ', '脱字'),
			_Utils_Tuple2('ふせじ', '伏せ字'),
			_Utils_Tuple2('じおん', '字音'),
			_Utils_Tuple2('じくん', '字訓'),
			_Utils_Tuple2('わくん', '和訓'),
			_Utils_Tuple2('ぎくん', '義訓'),
			_Utils_Tuple2('まあく', 'マーク'),
			_Utils_Tuple2('まんじ', '卍'),
			_Utils_Tuple2('けるん', 'ケルン'),
			_Utils_Tuple2('きごう', '記号'),
			_Utils_Tuple2('おんぷ', '音符'),
			_Utils_Tuple2('にごり', '濁り'),
			_Utils_Tuple2('とれま', 'トレマ'),
			_Utils_Tuple2('くてん', '句点'),
			_Utils_Tuple2('こんま', 'コンマ'),
			_Utils_Tuple2('ころん', 'コロン'),
			_Utils_Tuple2('だがあ', 'ダガー'),
			_Utils_Tuple2('りすと', 'リスト'),
			_Utils_Tuple2('だいや', 'ダイヤ'),
			_Utils_Tuple2('げんず', '原図'),
			_Utils_Tuple2('したず', '下図'),
			_Utils_Tuple2('ほんず', '本図'),
			_Utils_Tuple2('ずめん', '図面'),
			_Utils_Tuple2('ずしき', '図式'),
			_Utils_Tuple2('ずはん', '図版'),
			_Utils_Tuple2('ようず', '要図'),
			_Utils_Tuple2('ぜんず', '全図'),
			_Utils_Tuple2('おんず', '音図'),
			_Utils_Tuple2('まっぷ', 'マップ'),
			_Utils_Tuple2('こちず', '古地図'),
			_Utils_Tuple2('かいず', '海図'),
			_Utils_Tuple2('せいず', '星図'),
			_Utils_Tuple2('かけず', '掛け図'),
			_Utils_Tuple2('ぐらふ', 'グラフ'),
			_Utils_Tuple2('そうふ', '総譜'),
			_Utils_Tuple2('ほんぷ', '本譜'),
			_Utils_Tuple2('あいず', '合図'),
			_Utils_Tuple2('めまぜ', '目交ぜ'),
			_Utils_Tuple2('のっく', 'ノック'),
			_Utils_Tuple2('のろし', 'のろし'),
			_Utils_Tuple2('じほう', '時報'),
			_Utils_Tuple2('よれい', '予鈴'),
			_Utils_Tuple2('きてき', '汽笛'),
			_Utils_Tuple2('やすめ', '休め'),
			_Utils_Tuple2('こおる', 'コール'),
			_Utils_Tuple2('れんこ', '連呼'),
			_Utils_Tuple2('おじぎ', 'お辞儀'),
			_Utils_Tuple2('ええる', 'エール'),
			_Utils_Tuple2('ぶさた', 'ぶさた'),
			_Utils_Tuple2('てがみ', '手紙'),
			_Utils_Tuple2('はがき', 'はがき'),
			_Utils_Tuple2('れたあ', 'レター'),
			_Utils_Tuple2('やぶみ', '矢文'),
			_Utils_Tuple2('きしょ', '貴書'),
			_Utils_Tuple2('きさつ', '貴札'),
			_Utils_Tuple2('むせん', '無線'),
			_Utils_Tuple2('むでん', '無電'),
			_Utils_Tuple2('だでん', '打電'),
			_Utils_Tuple2('でんわ', '電話'),
			_Utils_Tuple2('めえる', 'メール'),
			_Utils_Tuple2('つたえ', '伝え'),
			_Utils_Tuple2('くでん', '口伝'),
			_Utils_Tuple2('くじゅ', '口授'),
			_Utils_Tuple2('ごでん', '誤伝'),
			_Utils_Tuple2('かでん', '訛伝'),
			_Utils_Tuple2('うわさ', 'うわさ'),
			_Utils_Tuple2('こくち', '告知'),
			_Utils_Tuple2('よこく', '予告'),
			_Utils_Tuple2('いごん', '遺言'),
			_Utils_Tuple2('つうち', '通知'),
			_Utils_Tuple2('たっし', '達し'),
			_Utils_Tuple2('きたつ', '既達'),
			_Utils_Tuple2('りいく', 'リーク'),
			_Utils_Tuple2('しらせ', '知らせ'),
			_Utils_Tuple2('ひろめ', '広め'),
			_Utils_Tuple2('ふほう', '訃報'),
			_Utils_Tuple2('ふいん', '訃音'),
			_Utils_Tuple2('よほう', '予報'),
			_Utils_Tuple2('きほう', '既報'),
			_Utils_Tuple2('こすい', '鼓吹'),
			_Utils_Tuple2('はなし', '話'),
			_Utils_Tuple2('だんわ', '談話'),
			_Utils_Tuple2('かいわ', '会話'),
			_Utils_Tuple2('たいわ', '対話'),
			_Utils_Tuple2('きんわ', '謹話'),
			_Utils_Tuple2('じきわ', '直話'),
			_Utils_Tuple2('すんわ', '寸話'),
			_Utils_Tuple2('じつわ', '実話'),
			_Utils_Tuple2('いつわ', '逸話'),
			_Utils_Tuple2('ぐうわ', '寓話'),
			_Utils_Tuple2('れいわ', '例話'),
			_Utils_Tuple2('あいわ', '哀話'),
			_Utils_Tuple2('きだん', '奇談'),
			_Utils_Tuple2('いぶん', '異聞'),
			_Utils_Tuple2('びだん', '美談'),
			_Utils_Tuple2('ちゃわ', '茶話'),
			_Utils_Tuple2('げせわ', '下世話'),
			_Utils_Tuple2('ざつわ', '雑話'),
			_Utils_Tuple2('だべん', '駄弁'),
			_Utils_Tuple2('のろけ', 'のろけ'),
			_Utils_Tuple2('くんわ', '訓話'),
			_Utils_Tuple2('かたり', '語り'),
			_Utils_Tuple2('どくわ', '独話'),
			_Utils_Tuple2('ししく', '獅子吼'),
			_Utils_Tuple2('だんぎ', '談義'),
			_Utils_Tuple2('どうわ', '道話'),
			_Utils_Tuple2('しきじ', '式辞'),
			_Utils_Tuple2('くんじ', '訓辞'),
			_Utils_Tuple2('しつぎ', '質疑'),
			_Utils_Tuple2('しもん', '諮問'),
			_Utils_Tuple2('さもん', '査問'),
			_Utils_Tuple2('ふもん', '不問'),
			_Utils_Tuple2('たすく', 'タスク'),
			_Utils_Tuple2('ぐもん', '愚問'),
			_Utils_Tuple2('くいず', 'クイズ'),
			_Utils_Tuple2('こたえ', '答え'),
			_Utils_Tuple2('ぐとう', '愚答'),
			_Utils_Tuple2('ごうぎ', '合議'),
			_Utils_Tuple2('みつぎ', '密議'),
			_Utils_Tuple2('ぼうぎ', '謀議'),
			_Utils_Tuple2('ざだん', '座談'),
			_Utils_Tuple2('かくぎ', '閣議'),
			_Utils_Tuple2('いんぎ', '院議'),
			_Utils_Tuple2('ばくぎ', '幕議'),
			_Utils_Tuple2('とうぎ', '党議'),
			_Utils_Tuple2('けつぎ', '決議'),
			_Utils_Tuple2('だいぎ', '代議'),
			_Utils_Tuple2('さんぎ', '参議'),
			_Utils_Tuple2('ほつぎ', '発議'),
			_Utils_Tuple2('はつぎ', '発議'),
			_Utils_Tuple2('ろんぎ', '論議'),
			_Utils_Tuple2('ぎろん', '議論'),
			_Utils_Tuple2('ふんぎ', '紛議'),
			_Utils_Tuple2('ぶつぎ', '物議'),
			_Utils_Tuple2('くぜつ', '口舌・口説'),
			_Utils_Tuple2('ろんぱ', '論破'),
			_Utils_Tuple2('りぜめ', '理責め'),
			_Utils_Tuple2('いろん', '異論'),
			_Utils_Tuple2('ひはん', '批判'),
			_Utils_Tuple2('とがめ', 'とがめ'),
			_Utils_Tuple2('くげん', '苦言'),
			_Utils_Tuple2('ひにく', '皮肉'),
			_Utils_Tuple2('いやみ', '嫌み'),
			_Utils_Tuple2('べんご', '弁護'),
			_Utils_Tuple2('のおと', 'ノート'),
			_Utils_Tuple2('ずかい', '図解'),
			_Utils_Tuple2('えとき', '絵解き'),
			_Utils_Tuple2('くんこ', '訓詁'),
			_Utils_Tuple2('るせつ', '縷説'),
			_Utils_Tuple2('ずせつ', '図説'),
			_Utils_Tuple2('ほせつ', '補説'),
			_Utils_Tuple2('ゆこく', '諭告'),
			_Utils_Tuple2('こくゆ', '告諭'),
			_Utils_Tuple2('おつげ', 'お告げ'),
			_Utils_Tuple2('ふこく', '布告'),
			_Utils_Tuple2('はっぷ', '発布'),
			_Utils_Tuple2('かたつ', '下達'),
			_Utils_Tuple2('じたつ', '示達'),
			_Utils_Tuple2('とどけ', '届け'),
			_Utils_Tuple2('ぐしん', '具申'),
			_Utils_Tuple2('ぶこく', '誣告'),
			_Utils_Tuple2('じはく', '自白'),
			_Utils_Tuple2('とうく', '投句'),
			_Utils_Tuple2('きこえ', '聞こえ'),
			_Utils_Tuple2('きうけ', '気受け'),
			_Utils_Tuple2('はぶり', '羽振り'),
			_Utils_Tuple2('なうて', '名うて'),
			_Utils_Tuple2('ぶめい', '武名'),
			_Utils_Tuple2('びめい', '美名'),
			_Utils_Tuple2('むめい', '無名'),
			_Utils_Tuple2('うきな', '浮き名'),
			_Utils_Tuple2('おめい', '汚名'),
			_Utils_Tuple2('どくじ', '読字'),
			_Utils_Tuple2('どくは', '読破'),
			_Utils_Tuple2('ごどく', '誤読'),
			_Utils_Tuple2('みどく', '味読'),
			_Utils_Tuple2('すよみ', '素読み'),
			_Utils_Tuple2('しどく', '試読'),
			_Utils_Tuple2('たどく', '多読'),
			_Utils_Tuple2('じどく', '自読'),
			_Utils_Tuple2('そどく', '素読'),
			_Utils_Tuple2('うつし', '写し'),
			_Utils_Tuple2('りんも', '臨模'),
			_Utils_Tuple2('りんが', '臨画'),
			_Utils_Tuple2('こぴい', 'コピー'),
			_Utils_Tuple2('ごしゃ', '誤写'),
			_Utils_Tuple2('きひつ', '起筆'),
			_Utils_Tuple2('かひつ', '加筆'),
			_Utils_Tuple2('ほひつ', '補筆'),
			_Utils_Tuple2('ひっき', '筆記'),
			_Utils_Tuple2('そっき', '速記'),
			_Utils_Tuple2('もじか', '文字化'),
			_Utils_Tuple2('さいふ', '採譜'),
			_Utils_Tuple2('べっき', '別記'),
			_Utils_Tuple2('ちひつ', '遅筆'),
			_Utils_Tuple2('てがき', '手書き'),
			_Utils_Tuple2('しひつ', '試筆'),
			_Utils_Tuple2('じひつ', '自筆'),
			_Utils_Tuple2('たひつ', '他筆'),
			_Utils_Tuple2('ぎひつ', '偽筆'),
			_Utils_Tuple2('ついき', '追記'),
			_Utils_Tuple2('じまく', '字幕'),
			_Utils_Tuple2('じさげ', '字下げ'),
			_Utils_Tuple2('じづめ', '字詰め'),
			_Utils_Tuple2('かおう', '花押'),
			_Utils_Tuple2('れんき', '連記'),
			_Utils_Tuple2('れっき', '列記'),
			_Utils_Tuple2('てがた', '手形'),
			_Utils_Tuple2('ふろく', '付録・附録'),
			_Utils_Tuple2('にしん', '二伸'),
			_Utils_Tuple2('とがき', 'ト書き'),
			_Utils_Tuple2('よろく', '余録'),
			_Utils_Tuple2('いひつ', '遺筆'),
			_Utils_Tuple2('ふぶん', '不文'),
			_Utils_Tuple2('だぶん', '駄文'),
			_Utils_Tuple2('がさん', '画賛'),
			_Utils_Tuple2('ぎぶん', '戯文'),
			_Utils_Tuple2('わぶん', '和文'),
			_Utils_Tuple2('がぶん', '雅文'),
			_Utils_Tuple2('こらむ', 'コラム'),
			_Utils_Tuple2('ひぶん', '碑文'),
			_Utils_Tuple2('だたい', 'だ体'),
			_Utils_Tuple2('かるて', 'カルテ'),
			_Utils_Tuple2('しゅき', '手記'),
			_Utils_Tuple2('いしょ', '遺書'),
			_Utils_Tuple2('よこう', '予稿'),
			_Utils_Tuple2('ぶっく', 'ブック'),
			_Utils_Tuple2('こしょ', '古書'),
			_Utils_Tuple2('はほん', '端本'),
			_Utils_Tuple2('いほん', '異本'),
			_Utils_Tuple2('じちょ', '自著'),
			_Utils_Tuple2('いちょ', '遺著'),
			_Utils_Tuple2('きちょ', '貴著'),
			_Utils_Tuple2('ひほん', '秘本'),
			_Utils_Tuple2('だほん', '駄本'),
			_Utils_Tuple2('ぎしょ', '偽書'),
			_Utils_Tuple2('こてん', '古典'),
			_Utils_Tuple2('わしょ', '和書'),
			_Utils_Tuple2('わほん', '和本'),
			_Utils_Tuple2('ろんご', '論語'),
			_Utils_Tuple2('がいし', '外史'),
			_Utils_Tuple2('こじき', '古事記'),
			_Utils_Tuple2('えほん', '絵本'),
			_Utils_Tuple2('ぽるの', 'ポルノ'),
			_Utils_Tuple2('きよう', '紀要'),
			_Utils_Tuple2('ざっし', '雑誌'),
			_Utils_Tuple2('むっく', 'ムック'),
			_Utils_Tuple2('ずかん', '図鑑'),
			_Utils_Tuple2('ずろく', '図録'),
			_Utils_Tuple2('いんぷ', '印譜'),
			_Utils_Tuple2('はやみ', '早見'),
			_Utils_Tuple2('とびら', '扉'),
			_Utils_Tuple2('もくじ', '目次'),
			_Utils_Tuple2('めいぼ', '名簿'),
			_Utils_Tuple2('ねんぷ', '年譜'),
			_Utils_Tuple2('こよみ', '暦'),
			_Utils_Tuple2('われき', '和暦'),
			_Utils_Tuple2('じさく', '自作'),
			_Utils_Tuple2('ぎさく', '偽作'),
			_Utils_Tuple2('そうこ', '操觚'),
			_Utils_Tuple2('いさく', '遺作'),
			_Utils_Tuple2('ださく', '駄作'),
			_Utils_Tuple2('くさく', '句作'),
			_Utils_Tuple2('くぎん', '苦吟'),
			_Utils_Tuple2('ふうが', '風雅'),
			_Utils_Tuple2('しいか', '詩歌'),
			_Utils_Tuple2('ぽえむ', 'ポエム'),
			_Utils_Tuple2('げきし', '劇詩'),
			_Utils_Tuple2('ぜっく', '絶句'),
			_Utils_Tuple2('れんか', '恋歌'),
			_Utils_Tuple2('あいし', '哀詩'),
			_Utils_Tuple2('たんし', '譚詩'),
			_Utils_Tuple2('ぼっか', '牧歌'),
			_Utils_Tuple2('はいく', '俳句'),
			_Utils_Tuple2('ほっく', '発句'),
			_Utils_Tuple2('れんく', '連句'),
			_Utils_Tuple2('いえい', '遺詠'),
			_Utils_Tuple2('のりと', '祝詞'),
			_Utils_Tuple2('せつわ', '説話'),
			_Utils_Tuple2('しんわ', '神話'),
			_Utils_Tuple2('みんわ', '民話'),
			_Utils_Tuple2('のべる', 'ノベル'),
			_Utils_Tuple2('こんと', 'コント'),
			_Utils_Tuple2('ろまん', 'ロマン'),
			_Utils_Tuple2('でんき', '伝奇'),
			_Utils_Tuple2('おとぎ', 'おとぎ'),
			_Utils_Tuple2('まくら', 'まくら'),
			_Utils_Tuple2('わげい', '話芸'),
			_Utils_Tuple2('じっき', '実記'),
			_Utils_Tuple2('ふどき', '風土記'),
			_Utils_Tuple2('じでん', '自伝'),
			_Utils_Tuple2('しでん', '史伝'),
			_Utils_Tuple2('にっき', '日記'),
			_Utils_Tuple2('ざっき', '雑記'),
			_Utils_Tuple2('かろん', '歌論'),
			_Utils_Tuple2('ああと', 'アート'),
			_Utils_Tuple2('しょが', '書画'),
			_Utils_Tuple2('がどう', '画道'),
			_Utils_Tuple2('かいが', '絵画'),
			_Utils_Tuple2('ずあん', '図案'),
			_Utils_Tuple2('がぞう', '画像'),
			_Utils_Tuple2('めいが', '名画'),
			_Utils_Tuple2('したえ', '下絵'),
			_Utils_Tuple2('げんが', '原画'),
			_Utils_Tuple2('みつが', '密画'),
			_Utils_Tuple2('せんが', '線画'),
			_Utils_Tuple2('からえ', '唐絵'),
			_Utils_Tuple2('なんが', '南画'),
			_Utils_Tuple2('ほくが', '北画'),
			_Utils_Tuple2('ようが', '洋画'),
			_Utils_Tuple2('とばえ', '鳥羽絵'),
			_Utils_Tuple2('どうが', '童画'),
			_Utils_Tuple2('はいが', '俳画'),
			_Utils_Tuple2('ぜんが', '禅画'),
			_Utils_Tuple2('せいが', '聖画'),
			_Utils_Tuple2('にがお', '似顔'),
			_Utils_Tuple2('まんが', '漫画'),
			_Utils_Tuple2('げきが', '劇画'),
			_Utils_Tuple2('みずえ', '水絵'),
			_Utils_Tuple2('ゆさい', '油彩'),
			_Utils_Tuple2('すみえ', '墨絵'),
			_Utils_Tuple2('ぼくが', '墨画'),
			_Utils_Tuple2('ぺんが', 'ペン画'),
			_Utils_Tuple2('いろえ', '色絵'),
			_Utils_Tuple2('やきえ', '焼き絵'),
			_Utils_Tuple2('とうが', '陶画'),
			_Utils_Tuple2('はんが', '版画'),
			_Utils_Tuple2('ぬりえ', '塗り絵'),
			_Utils_Tuple2('おしえ', '押し絵'),
			_Utils_Tuple2('きりえ', '切り絵'),
			_Utils_Tuple2('かげえ', '影絵'),
			_Utils_Tuple2('うわえ', '上絵'),
			_Utils_Tuple2('さしえ', '挿し絵'),
			_Utils_Tuple2('くちえ', '口絵'),
			_Utils_Tuple2('せるが', 'セル画'),
			_Utils_Tuple2('へきが', '壁画'),
			_Utils_Tuple2('ふぉと', 'フォト'),
			_Utils_Tuple2('いぼく', '遺墨'),
			_Utils_Tuple2('まきえ', 'まき絵'),
			_Utils_Tuple2('よせぎ', '寄せ木'),
			_Utils_Tuple2('らでん', '螺鈿'),
			_Utils_Tuple2('さいく', '細工'),
			_Utils_Tuple2('さくず', '作図'),
			_Utils_Tuple2('ががく', '雅楽'),
			_Utils_Tuple2('きがく', '器楽'),
			_Utils_Tuple2('すらあ', 'スラー'),
			_Utils_Tuple2('とりる', 'トリル'),
			_Utils_Tuple2('はやし', 'はやし'),
			_Utils_Tuple2('こぶし', '小節'),
			_Utils_Tuple2('こおだ', 'コーダ'),
			_Utils_Tuple2('りいと', 'リート'),
			_Utils_Tuple2('まあち', 'マーチ'),
			_Utils_Tuple2('かのん', 'カノン'),
			_Utils_Tuple2('わるつ', 'ワルツ'),
			_Utils_Tuple2('ろんど', 'ロンド'),
			_Utils_Tuple2('ぽるか', 'ポルカ'),
			_Utils_Tuple2('ありあ', 'アリア'),
			_Utils_Tuple2('まんぼ', 'マンボ'),
			_Utils_Tuple2('るんば', 'ルンバ'),
			_Utils_Tuple2('れげえ', 'レゲエ'),
			_Utils_Tuple2('さるさ', 'サルサ'),
			_Utils_Tuple2('さんば', 'サンバ'),
			_Utils_Tuple2('じゃず', 'ジャズ'),
			_Utils_Tuple2('てくの', 'テクノ'),
			_Utils_Tuple2('そんぐ', 'ソング'),
			_Utils_Tuple2('さんか', '賛歌'),
			_Utils_Tuple2('あいか', '哀歌'),
			_Utils_Tuple2('ぐんか', '軍歌'),
			_Utils_Tuple2('りよう', '里謡'),
			_Utils_Tuple2('ふぁど', 'ファド'),
			_Utils_Tuple2('うたい', '謡'),
			_Utils_Tuple2('きやり', '木やり'),
			_Utils_Tuple2('じんく', '甚句'),
			_Utils_Tuple2('こよう', '古謡'),
			_Utils_Tuple2('はうた', '端唄'),
			_Utils_Tuple2('こうた', '小唄'),
			_Utils_Tuple2('どらま', 'ドラマ'),
			_Utils_Tuple2('しばい', '芝居'),
			_Utils_Tuple2('ひげき', '悲劇'),
			_Utils_Tuple2('きげき', '喜劇'),
			_Utils_Tuple2('かげき', '歌劇'),
			_Utils_Tuple2('おぺら', 'オペラ'),
			_Utils_Tuple2('かぐら', '神楽'),
			_Utils_Tuple2('ぎがく', '伎楽'),
			_Utils_Tuple2('にわか', 'にわか'),
			_Utils_Tuple2('かぶき', '歌舞伎'),
			_Utils_Tuple2('えいが', '映画'),
			_Utils_Tuple2('きねま', 'キネマ'),
			_Utils_Tuple2('しねま', 'シネマ'),
			_Utils_Tuple2('がいが', '外画'),
			_Utils_Tuple2('あにめ', 'アニメ'),
			_Utils_Tuple2('みかい', '未開'),
			_Utils_Tuple2('やばん', '野蛮'),
			_Utils_Tuple2('みこん', '未墾'),
			_Utils_Tuple2('ろここ', 'ロココ'),
			_Utils_Tuple2('あぷれ', 'アプレ'),
			_Utils_Tuple2('こふう', '古風'),
			_Utils_Tuple2('れとろ', 'レトロ'),
			_Utils_Tuple2('れきし', '歴史'),
			_Utils_Tuple2('つうし', '通史'),
			_Utils_Tuple2('そんし', '村史'),
			_Utils_Tuple2('らいゆ', '来由'),
			_Utils_Tuple2('こじつ', '故実'),
			_Utils_Tuple2('どぞく', '土俗'),
			_Utils_Tuple2('りぞく', '里俗'),
			_Utils_Tuple2('ふうど', '風土'),
			_Utils_Tuple2('ぶすい', '無粋・不粋'),
			_Utils_Tuple2('がぞく', '雅俗'),
			_Utils_Tuple2('びふう', '美風'),
			_Utils_Tuple2('びぞく', '美俗'),
			_Utils_Tuple2('ふうき', '風紀'),
			_Utils_Tuple2('ふうぎ', '風儀'),
			_Utils_Tuple2('よへい', '余弊'),
			_Utils_Tuple2('はやり', 'はやり'),
			_Utils_Tuple2('ぶうむ', 'ブーム'),
			_Utils_Tuple2('だらく', '堕落'),
			_Utils_Tuple2('ふはい', '腐敗'),
			_Utils_Tuple2('うんき', '運気'),
			_Utils_Tuple2('じうん', '時運'),
			_Utils_Tuple2('かうん', '家運'),
			_Utils_Tuple2('ぶうん', '武運'),
			_Utils_Tuple2('りうん', '利運'),
			_Utils_Tuple2('ふうん', '不運'),
			_Utils_Tuple2('ひうん', '非運'),
			_Utils_Tuple2('うきめ', '憂き目'),
			_Utils_Tuple2('ふきつ', '不吉'),
			_Utils_Tuple2('かふく', '禍福'),
			_Utils_Tuple2('ふくり', '福利'),
			_Utils_Tuple2('ふぐう', '不遇'),
			_Utils_Tuple2('きなん', '危難'),
			_Utils_Tuple2('ごなん', '御難'),
			_Utils_Tuple2('ゆうじ', '有事'),
			_Utils_Tuple2('ぜっか', '舌禍'),
			_Utils_Tuple2('ひっか', '筆禍'),
			_Utils_Tuple2('やっか', '薬禍'),
			_Utils_Tuple2('かなん', '火難'),
			_Utils_Tuple2('ひがい', '被害'),
			_Utils_Tuple2('りさい', '罹災'),
			_Utils_Tuple2('ひさい', '被災'),
			_Utils_Tuple2('ひばく', '被曝'),
			_Utils_Tuple2('ふさく', '不作'),
			_Utils_Tuple2('よすぎ', '世過ぎ'),
			_Utils_Tuple2('ほしん', '保身'),
			_Utils_Tuple2('りたつ', '利達'),
			_Utils_Tuple2('ゆうひ', '雄飛'),
			_Utils_Tuple2('うはつ', '有髪'),
			_Utils_Tuple2('とくど', '得度'),
			_Utils_Tuple2('おうぼ', '応募'),
			_Utils_Tuple2('りのう', '離農'),
			_Utils_Tuple2('つとめ', '勤め'),
			_Utils_Tuple2('きんむ', '勤務'),
			_Utils_Tuple2('しごと', '仕事'),
			_Utils_Tuple2('わあく', 'ワーク'),
			_Utils_Tuple2('ろうむ', '労務'),
			_Utils_Tuple2('えきむ', '役務'),
			_Utils_Tuple2('ざつむ', '雑務'),
			_Utils_Tuple2('てすう', '手数'),
			_Utils_Tuple2('てかず', '手数'),
			_Utils_Tuple2('ぞうさ', '造作・雑作'),
			_Utils_Tuple2('やきん', '夜勤'),
			_Utils_Tuple2('よなべ', '夜なべ'),
			_Utils_Tuple2('はやで', '早出'),
			_Utils_Tuple2('おそで', '遅出'),
			_Utils_Tuple2('きんし', '勤仕'),
			_Utils_Tuple2('しつむ', '執務'),
			_Utils_Tuple2('ふくむ', '服務'),
			_Utils_Tuple2('きんだ', '勤惰'),
			_Utils_Tuple2('いこい', '憩い'),
			_Utils_Tuple2('きびき', '忌引き'),
			_Utils_Tuple2('てすき', '手すき'),
			_Utils_Tuple2('がくじ', '学事'),
			_Utils_Tuple2('ごうひ', '合否'),
			_Utils_Tuple2('くらし', '暮らし'),
			_Utils_Tuple2('とせい', '渡世'),
			_Utils_Tuple2('じてき', '自適'),
			_Utils_Tuple2('がぜん', '瓦全'),
			_Utils_Tuple2('じかつ', '自活'),
			_Utils_Tuple2('じすい', '自炊'),
			_Utils_Tuple2('いぐい', '居食い'),
			_Utils_Tuple2('ききょ', '起居'),
			_Utils_Tuple2('あさね', '朝寝'),
			_Utils_Tuple2('よいね', '宵寝'),
			_Utils_Tuple2('はやね', '早寝'),
			_Utils_Tuple2('ふてね', 'ふて寝'),
			_Utils_Tuple2('そらね', '空寝'),
			_Utils_Tuple2('らくね', '楽寝'),
			_Utils_Tuple2('あんが', '安臥'),
			_Utils_Tuple2('わびね', 'わび寝'),
			_Utils_Tuple2('そいね', '添い寝'),
			_Utils_Tuple2('ざこね', '雑魚寝'),
			_Utils_Tuple2('ともね', '共寝'),
			_Utils_Tuple2('おそね', '遅寝'),
			_Utils_Tuple2('てつや', '徹夜'),
			_Utils_Tuple2('ごはん', '御飯'),
			_Utils_Tuple2('にじき', '二食'),
			_Utils_Tuple2('そさん', '粗餐'),
			_Utils_Tuple2('あさげ', '朝げ'),
			_Utils_Tuple2('あさけ', '朝け'),
			_Utils_Tuple2('ひるげ', '昼げ'),
			_Utils_Tuple2('ひるけ', '昼け'),
			_Utils_Tuple2('らんち', 'ランチ'),
			_Utils_Tuple2('ゆうげ', '夕げ'),
			_Utils_Tuple2('ゆうけ', '夕け'),
			_Utils_Tuple2('こひる', '小昼'),
			_Utils_Tuple2('こびる', '小昼'),
			_Utils_Tuple2('おやつ', 'おやつ'),
			_Utils_Tuple2('そえぢ', '添え乳'),
			_Utils_Tuple2('ねざけ', '寝酒'),
			_Utils_Tuple2('きっさ', '喫茶'),
			_Utils_Tuple2('だつい', '脱衣'),
			_Utils_Tuple2('はだか', '裸'),
			_Utils_Tuple2('ぬうど', 'ヌード'),
			_Utils_Tuple2('むぼう', '無帽'),
			_Utils_Tuple2('きがえ', '着替え'),
			_Utils_Tuple2('びそう', '美装'),
			_Utils_Tuple2('めかし', 'めかし'),
			_Utils_Tuple2('あつぎ', '厚着'),
			_Utils_Tuple2('うすぎ', '薄着'),
			_Utils_Tuple2('わそう', '和装'),
			_Utils_Tuple2('ぎそう', '偽装・擬装'),
			_Utils_Tuple2('すまい', '住まい'),
			_Utils_Tuple2('かきょ', '家居'),
			_Utils_Tuple2('やどり', '宿り'),
			_Utils_Tuple2('かぐう', '仮寓'),
			_Utils_Tuple2('いえで', '家出'),
			_Utils_Tuple2('きぐう', '寄寓'),
			_Utils_Tuple2('いるす', '居留守'),
			_Utils_Tuple2('とまり', '泊まり'),
			_Utils_Tuple2('たびね', '旅寝'),
			_Utils_Tuple2('ろえい', '露営'),
			_Utils_Tuple2('ふろう', '浮浪'),
			_Utils_Tuple2('ほけん', '保健'),
			_Utils_Tuple2('やくじ', '薬餌'),
			_Utils_Tuple2('ほよう', '保養'),
			_Utils_Tuple2('びよう', '美容'),
			_Utils_Tuple2('りはつ', '理髪'),
			_Utils_Tuple2('ぱあま', 'パーマ'),
			_Utils_Tuple2('かある', 'カール'),
			_Utils_Tuple2('けぞめ', '毛染め'),
			_Utils_Tuple2('びがん', '美顔'),
			_Utils_Tuple2('びはだ', '美肌'),
			_Utils_Tuple2('びはく', '美白'),
			_Utils_Tuple2('めえく', 'メーク'),
			_Utils_Tuple2('めばり', '目張り'),
			_Utils_Tuple2('ゆあみ', '湯あみ'),
			_Utils_Tuple2('ながゆ', '長湯'),
			_Utils_Tuple2('こしゆ', '腰湯'),
			_Utils_Tuple2('ざよく', '座浴'),
			_Utils_Tuple2('あしゆ', '足湯'),
			_Utils_Tuple2('はつゆ', '初湯'),
			_Utils_Tuple2('うぶゆ', '産湯'),
			_Utils_Tuple2('あさゆ', '朝湯'),
			_Utils_Tuple2('ゆずゆ', 'ゆず湯'),
			_Utils_Tuple2('りんす', 'リンス'),
			_Utils_Tuple2('うがい', 'うがい'),
			_Utils_Tuple2('あんま', 'あんま'),
			_Utils_Tuple2('ちぎり', '契り'),
			_Utils_Tuple2('ゆうふ', '有夫'),
			_Utils_Tuple2('はこん', '破婚'),
			_Utils_Tuple2('はだん', '破談'),
			_Utils_Tuple2('りこん', '離婚'),
			_Utils_Tuple2('りべつ', '離別'),
			_Utils_Tuple2('ぎれい', '儀礼'),
			_Utils_Tuple2('ついな', 'ついな'),
			_Utils_Tuple2('まつり', '祭り'),
			_Utils_Tuple2('よみや', '夜宮'),
			_Utils_Tuple2('おぼん', 'お盆'),
			_Utils_Tuple2('せがき', '施餓鬼'),
			_Utils_Tuple2('せいや', '聖夜'),
			_Utils_Tuple2('ほうえ', '法会'),
			_Utils_Tuple2('えしき', '会式'),
			_Utils_Tuple2('おつや', 'お通夜'),
			_Utils_Tuple2('ふくも', '服喪'),
			_Utils_Tuple2('きぶく', '忌服'),
			_Utils_Tuple2('ゆかん', '湯灌'),
			_Utils_Tuple2('どそう', '土葬'),
			_Utils_Tuple2('たむけ', '手向け'),
			_Utils_Tuple2('くよう', '供養'),
			_Utils_Tuple2('ぎしき', '儀式'),
			_Utils_Tuple2('こんぎ', '婚儀'),
			_Utils_Tuple2('いわい', '祝い'),
			_Utils_Tuple2('ねんが', '年賀'),
			_Utils_Tuple2('けいが', '慶賀'),
			_Utils_Tuple2('きんが', '謹賀'),
			_Utils_Tuple2('がじゅ', '賀寿'),
			_Utils_Tuple2('さんが', '参賀'),
			_Utils_Tuple2('さんげ', '散華'),
			_Utils_Tuple2('みそぎ', 'みそぎ'),
			_Utils_Tuple2('まよけ', '魔よけ'),
			_Utils_Tuple2('まいり', '参り'),
			_Utils_Tuple2('ぼさん', '墓参'),
			_Utils_Tuple2('てんぼ', '展墓'),
			_Utils_Tuple2('ごらく', '娯楽'),
			_Utils_Tuple2('すさび', 'すさび'),
			_Utils_Tuple2('しゅみ', '趣味'),
			_Utils_Tuple2('むげい', '無芸'),
			_Utils_Tuple2('たげい', '多芸'),
			_Utils_Tuple2('ちゃじ', '茶事'),
			_Utils_Tuple2('おちゃ', 'お茶'),
			_Utils_Tuple2('のだて', '野立て'),
			_Utils_Tuple2('おはな', 'お花'),
			_Utils_Tuple2('ていけ', '手生け'),
			_Utils_Tuple2('ぎげい', '伎芸'),
			_Utils_Tuple2('ぶよう', '舞踊'),
			_Utils_Tuple2('ようぶ', '洋舞'),
			_Utils_Tuple2('にちぶ', '日舞'),
			_Utils_Tuple2('ほうぶ', '邦舞'),
			_Utils_Tuple2('ぶとう', '舞踏'),
			_Utils_Tuple2('りんぶ', '輪舞'),
			_Utils_Tuple2('えんぶ', '円舞'),
			_Utils_Tuple2('どくぶ', '独舞'),
			_Utils_Tuple2('ぶがく', '舞楽'),
			_Utils_Tuple2('おどり', '踊り'),
			_Utils_Tuple2('おけさ', 'おけさ'),
			_Utils_Tuple2('けんぶ', '剣舞'),
			_Utils_Tuple2('だんす', 'ダンス'),
			_Utils_Tuple2('ばれえ', 'バレエ'),
			_Utils_Tuple2('てじな', '手品'),
			_Utils_Tuple2('おいた', 'おいた'),
			_Utils_Tuple2('ぱずる', 'パズル'),
			_Utils_Tuple2('ごっこ', 'ごっこ'),
			_Utils_Tuple2('ざるご', 'ざる碁'),
			_Utils_Tuple2('おきご', '置き碁'),
			_Utils_Tuple2('ごもく', '五目'),
			_Utils_Tuple2('ちぇす', 'チェス'),
			_Utils_Tuple2('おせろ', 'オセロ'),
			_Utils_Tuple2('かるた', 'カルタ'),
			_Utils_Tuple2('きりょ', '羇旅・羈旅'),
			_Utils_Tuple2('つああ', 'ツアー'),
			_Utils_Tuple2('ゆさん', '遊山'),
			_Utils_Tuple2('うめみ', '梅見'),
			_Utils_Tuple2('つきみ', '月見'),
			_Utils_Tuple2('ゆきみ', '雪見'),
			_Utils_Tuple2('さんぽ', '散歩'),
			_Utils_Tuple2('まんぽ', '漫歩'),
			_Utils_Tuple2('ゆうほ', '遊歩'),
			_Utils_Tuple2('とおで', '遠出'),
			_Utils_Tuple2('すずみ', '涼み'),
			_Utils_Tuple2('よづり', '夜釣り'),
			_Utils_Tuple2('のづり', '野釣り'),
			_Utils_Tuple2('こくぎ', '国技'),
			_Utils_Tuple2('しあい', '試合'),
			_Utils_Tuple2('げえむ', 'ゲーム'),
			_Utils_Tuple2('れえす', 'レース'),
			_Utils_Tuple2('ぷれえ', 'プレー'),
			_Utils_Tuple2('あんば', 'あん馬'),
			_Utils_Tuple2('つりわ', 'つり輪'),
			_Utils_Tuple2('すもう', '相撲'),
			_Utils_Tuple2('やわら', '柔ら'),
			_Utils_Tuple2('からて', '空手'),
			_Utils_Tuple2('ねわざ', '寝技'),
			_Utils_Tuple2('はりて', '張り手'),
			_Utils_Tuple2('のどわ', 'のど輪'),
			_Utils_Tuple2('さして', '差し手'),
			_Utils_Tuple2('じゃぶ', 'ジャブ'),
			_Utils_Tuple2('ふっく', 'フック'),
			_Utils_Tuple2('わなげ', '輪投げ'),
			_Utils_Tuple2('けまり', 'けまり'),
			_Utils_Tuple2('てにす', 'テニス'),
			_Utils_Tuple2('さあぶ', 'サーブ'),
			_Utils_Tuple2('ええす', 'エース'),
			_Utils_Tuple2('らりい', 'ラリー'),
			_Utils_Tuple2('あうと', 'アウト'),
			_Utils_Tuple2('らっく', 'ラック'),
			_Utils_Tuple2('もおる', 'モール'),
			_Utils_Tuple2('きっく', 'キック'),
			_Utils_Tuple2('ぼれえ', 'ボレー'),
			_Utils_Tuple2('ぼおく', 'ボーク'),
			_Utils_Tuple2('みいと', 'ミート'),
			_Utils_Tuple2('たんだ', '単打'),
			_Utils_Tuple2('あんだ', '安打'),
			_Utils_Tuple2('ふぇあ', 'フェア'),
			_Utils_Tuple2('すぶり', '素振り'),
			_Utils_Tuple2('かいだ', '快打'),
			_Utils_Tuple2('もうだ', '猛打'),
			_Utils_Tuple2('ひんだ', '貧打'),
			_Utils_Tuple2('ぼんだ', '凡打'),
			_Utils_Tuple2('ああち', 'アーチ'),
			_Utils_Tuple2('ばんと', 'バント'),
			_Utils_Tuple2('ふらい', 'フライ'),
			_Utils_Tuple2('せえふ', 'セーフ'),
			_Utils_Tuple2('やせん', '野選'),
			_Utils_Tuple2('およぎ', '泳ぎ'),
			_Utils_Tuple2('ぬきて', '抜き手'),
			_Utils_Tuple2('うきみ', '浮き身'),
			_Utils_Tuple2('たっぷ', 'タップ'),
			_Utils_Tuple2('ごるふ', 'ゴルフ'),
			_Utils_Tuple2('ぼぎい', 'ボギー'),
			_Utils_Tuple2('ぱっと', 'パット'),
			_Utils_Tuple2('すきい', 'スキー'),
			_Utils_Tuple2('けいば', '競馬'),
			_Utils_Tuple2('ろでお', 'ロデオ'),
			_Utils_Tuple2('ぶどう', '武道'),
			_Utils_Tuple2('ぶげい', '武芸'),
			_Utils_Tuple2('こだち', '小太刀'),
			_Utils_Tuple2('むちゃ', 'むちゃ'),
			_Utils_Tuple2('ふざけ', 'ふざけ'),
			_Utils_Tuple2('あらし', '荒し'),
			_Utils_Tuple2('けぶり', '気振'),
			_Utils_Tuple2('しぐさ', '仕草'),
			_Utils_Tuple2('どうさ', '動作'),
			_Utils_Tuple2('こなし', 'こなし'),
			_Utils_Tuple2('てぶら', '手ぶら'),
			_Utils_Tuple2('きっす', 'キッス'),
			_Utils_Tuple2('べえぜ', 'ベーゼ'),
			_Utils_Tuple2('たちい', '立ち居'),
			_Utils_Tuple2('ぼっき', '勃起'),
			_Utils_Tuple2('ねこぜ', '猫背'),
			_Utils_Tuple2('おうが', '横臥'),
			_Utils_Tuple2('ふくが', '伏臥'),
			_Utils_Tuple2('そくが', '側臥'),
			_Utils_Tuple2('ごろね', 'ごろ寝'),
			_Utils_Tuple2('だきね', '抱き寝'),
			_Utils_Tuple2('せいざ', '静座'),
			_Utils_Tuple2('ざぜん', '座禅'),
			_Utils_Tuple2('たんざ', '端座'),
			_Utils_Tuple2('あんざ', '安座'),
			_Utils_Tuple2('あぐら', 'あぐら'),
			_Utils_Tuple2('たいら', '平ら'),
			_Utils_Tuple2('ぐうざ', '偶座'),
			_Utils_Tuple2('たいざ', '対座'),
			_Utils_Tuple2('どくざ', '独座'),
			_Utils_Tuple2('どうざ', '同座'),
			_Utils_Tuple2('えんざ', '円座'),
			_Utils_Tuple2('まとい', 'まとい'),
			_Utils_Tuple2('どげざ', '土下座'),
			_Utils_Tuple2('ながい', '長居'),
			_Utils_Tuple2('ながざ', '長座'),
			_Utils_Tuple2('てもち', '手持ち'),
			_Utils_Tuple2('としゅ', '徒手'),
			_Utils_Tuple2('ひらて', '平手'),
			_Utils_Tuple2('さかて', '逆手'),
			_Utils_Tuple2('てうち', '手打ち'),
			_Utils_Tuple2('てじめ', '手締め'),
			_Utils_Tuple2('よこで', '横手'),
			_Utils_Tuple2('もみで', 'もみ手'),
			_Utils_Tuple2('さすて', '差す手'),
			_Utils_Tuple2('ひくて', '引く手'),
			_Utils_Tuple2('にぎり', '握り'),
			_Utils_Tuple2('つかみ', 'つかみ'),
			_Utils_Tuple2('すくい', 'すくい'),
			_Utils_Tuple2('ひろい', '拾い'),
			_Utils_Tuple2('ひねり', 'ひねり'),
			_Utils_Tuple2('あいぶ', '愛撫'),
			_Utils_Tuple2('かつぎ', '担ぎ'),
			_Utils_Tuple2('おんぶ', 'おんぶ'),
			_Utils_Tuple2('だっこ', '抱っこ'),
			_Utils_Tuple2('ほふく', '匍匐'),
			_Utils_Tuple2('あしげ', '足げ'),
			_Utils_Tuple2('えんげ', '嚥下'),
			_Utils_Tuple2('かぶり', 'かぶり'),
			_Utils_Tuple2('はぎれ', '歯切れ'),
			_Utils_Tuple2('おうと', '嘔吐'),
			_Utils_Tuple2('うわめ', '上目'),
			_Utils_Tuple2('しため', '下目'),
			_Utils_Tuple2('にんむ', '任務'),
			_Utils_Tuple2('ほんむ', '本務'),
			_Utils_Tuple2('しゅむ', '主務'),
			_Utils_Tuple2('とくむ', '特務'),
			_Utils_Tuple2('こうむ', '公務'),
			_Utils_Tuple2('ようむ', '要務'),
			_Utils_Tuple2('ふたん', '負担'),
			_Utils_Tuple2('やくぎ', '役儀'),
			_Utils_Tuple2('にもつ', '荷物'),
			_Utils_Tuple2('せきむ', '責務'),
			_Utils_Tuple2('かやく', '課役'),
			_Utils_Tuple2('くえき', '苦役'),
			_Utils_Tuple2('やくめ', '役目'),
			_Utils_Tuple2('てわけ', '手分け'),
			_Utils_Tuple2('けんり', '権利'),
			_Utils_Tuple2('りけん', '利権'),
			_Utils_Tuple2('ぼけん', '母権'),
			_Utils_Tuple2('はけん', '覇権'),
			_Utils_Tuple2('かとく', '家督'),
			_Utils_Tuple2('あとめ', '跡目'),
			_Utils_Tuple2('みもと', '身もと'),
			_Utils_Tuple2('もんち', '門地'),
			_Utils_Tuple2('そだち', '育ち'),
			_Utils_Tuple2('どうぼ', '同母'),
			_Utils_Tuple2('みがら', '身柄'),
			_Utils_Tuple2('みぶん', '身分'),
			_Utils_Tuple2('がくい', '学位'),
			_Utils_Tuple2('りれき', '履歴'),
			_Utils_Tuple2('けいよ', '刑余'),
			_Utils_Tuple2('びせん', '微賤'),
			_Utils_Tuple2('ひせん', '卑賤'),
			_Utils_Tuple2('きんど', '襟度'),
			_Utils_Tuple2('かたぎ', 'かたぎ'),
			_Utils_Tuple2('きだて', '気立て'),
			_Utils_Tuple2('きまえ', '気前'),
			_Utils_Tuple2('きっぷ', '気っぷ'),
			_Utils_Tuple2('ぞっき', '俗気'),
			_Utils_Tuple2('ちゃき', '茶気'),
			_Utils_Tuple2('じゃき', '邪気'),
			_Utils_Tuple2('ふぬけ', '腑抜け'),
			_Utils_Tuple2('きよわ', '気弱'),
			_Utils_Tuple2('ちのう', '知能'),
			_Utils_Tuple2('けんぐ', '賢愚'),
			_Utils_Tuple2('むのう', '無能'),
			_Utils_Tuple2('あたま', '頭'),
			_Utils_Tuple2('そよう', '素養'),
			_Utils_Tuple2('むしき', '無識'),
			_Utils_Tuple2('むがく', '無学'),
			_Utils_Tuple2('むひつ', '無筆'),
			_Utils_Tuple2('はくが', '博雅'),
			_Utils_Tuple2('たさい', '多才'),
			_Utils_Tuple2('むさい', '無才'),
			_Utils_Tuple2('がさい', '画才'),
			_Utils_Tuple2('せさい', '世才'),
			_Utils_Tuple2('ぎのう', '技能'),
			_Utils_Tuple2('てすじ', '手筋'),
			_Utils_Tuple2('しげい', '至芸'),
			_Utils_Tuple2('こわざ', '小技'),
			_Utils_Tuple2('じつぎ', '実技'),
			_Utils_Tuple2('てなみ', '手並み'),
			_Utils_Tuple2('おはこ', 'おはこ'),
			_Utils_Tuple2('おかぶ', 'お株'),
			_Utils_Tuple2('けれん', 'けれん'),
			_Utils_Tuple2('むさく', '無策'),
			_Utils_Tuple2('ちせつ', '稚拙'),
			_Utils_Tuple2('ふえて', '不得手'),
			_Utils_Tuple2('たわけ', 'たわけ'),
			_Utils_Tuple2('たいぐ', '大愚'),
			_Utils_Tuple2('あんぐ', '暗愚'),
			_Utils_Tuple2('のろま', 'のろま'),
			_Utils_Tuple2('いげん', '威厳'),
			_Utils_Tuple2('みいつ', 'みいつ'),
			_Utils_Tuple2('こくい', '国威'),
			_Utils_Tuple2('みもち', '身持ち'),
			_Utils_Tuple2('ぎよう', '儀容'),
			_Utils_Tuple2('れいぎ', '礼儀'),
			_Utils_Tuple2('しょさ', '所作'),
			_Utils_Tuple2('そぶり', '素振り'),
			_Utils_Tuple2('きょし', '挙止'),
			_Utils_Tuple2('きょそ', '挙措'),
			_Utils_Tuple2('わるさ', '悪さ'),
			_Utils_Tuple2('おどけ', 'おどけ'),
			_Utils_Tuple2('おはね', 'お跳ね'),
			_Utils_Tuple2('ちゃめ', 'ちゃめ'),
			_Utils_Tuple2('ぶらい', '無頼'),
			_Utils_Tuple2('ふぎり', '不義理'),
			_Utils_Tuple2('ひどう', '非道'),
			_Utils_Tuple2('むほう', '無法'),
			_Utils_Tuple2('ふらち', '不埒'),
			_Utils_Tuple2('ぐきょ', '愚挙'),
			_Utils_Tuple2('しょい', '所為'),
			_Utils_Tuple2('しわざ', '仕業'),
			_Utils_Tuple2('くどく', '功徳'),
			_Utils_Tuple2('びきょ', '美挙'),
			_Utils_Tuple2('ぎきょ', '義挙'),
			_Utils_Tuple2('あくじ', '悪事'),
			_Utils_Tuple2('ぜんぴ', '前非'),
			_Utils_Tuple2('てぎわ', '手際'),
			_Utils_Tuple2('てぐち', '手口'),
			_Utils_Tuple2('てくだ', '手管'),
			_Utils_Tuple2('やらせ', 'やらせ'),
			_Utils_Tuple2('じんい', '人為'),
			_Utils_Tuple2('りこう', '履行'),
			_Utils_Tuple2('てだし', '手出し'),
			_Utils_Tuple2('とろう', '徒労'),
			_Utils_Tuple2('ぶかつ', '部活'),
			_Utils_Tuple2('じはん', '事犯'),
			_Utils_Tuple2('いはん', '違反'),
			_Utils_Tuple2('ぐはん', '虞犯'),
			_Utils_Tuple2('びざい', '微罪'),
			_Utils_Tuple2('よざい', '余罪'),
			_Utils_Tuple2('むざい', '無罪'),
			_Utils_Tuple2('ぬすみ', '盗み'),
			_Utils_Tuple2('にぬき', '荷抜き'),
			_Utils_Tuple2('いじめ', 'いじめ'),
			_Utils_Tuple2('ひつけ', '火付け'),
			_Utils_Tuple2('つけび', '付け火'),
			_Utils_Tuple2('ぺてん', 'ぺてん'),
			_Utils_Tuple2('ごよう', '御用'),
			_Utils_Tuple2('じよう', '自用'),
			_Utils_Tuple2('ぞくむ', '俗務'),
			_Utils_Tuple2('てがら', '手柄'),
			_Utils_Tuple2('きすい', '既遂'),
			_Utils_Tuple2('みすい', '未遂'),
			_Utils_Tuple2('えらあ', 'エラー'),
			_Utils_Tuple2('そこつ', '粗忽'),
			_Utils_Tuple2('ておち', '手落ち'),
			_Utils_Tuple2('おちど', '落ち度'),
			_Utils_Tuple2('くはい', '苦杯'),
			_Utils_Tuple2('いさお', 'いさお'),
			_Utils_Tuple2('いくん', '偉勲'),
			_Utils_Tuple2('ぶこう', '武功'),
			_Utils_Tuple2('ぶくん', '武勲'),
			_Utils_Tuple2('きょほ', '巨歩'),
			_Utils_Tuple2('よなれ', '世慣れ'),
			_Utils_Tuple2('ゆうわ', '融和'),
			_Utils_Tuple2('わごう', '和合'),
			_Utils_Tuple2('しつう', '私通'),
			_Utils_Tuple2('わしん', '和親'),
			_Utils_Tuple2('わせん', '和戦'),
			_Utils_Tuple2('ぎぜつ', '義絶'),
			_Utils_Tuple2('てぎれ', '手切れ'),
			_Utils_Tuple2('りはん', '離反'),
			_Utils_Tuple2('りかん', '離間'),
			_Utils_Tuple2('はいた', '排他'),
			_Utils_Tuple2('わかい', '和解'),
			_Utils_Tuple2('わぼく', '和睦'),
			_Utils_Tuple2('つどい', '集い'),
			_Utils_Tuple2('ぶかい', '部会'),
			_Utils_Tuple2('うたげ', 'うたげ'),
			_Utils_Tuple2('そえん', '粗宴'),
			_Utils_Tuple2('こんぱ', 'コンパ'),
			_Utils_Tuple2('やかい', '夜会'),
			_Utils_Tuple2('そわれ', 'ソワレ'),
			_Utils_Tuple2('かかい', '歌会'),
			_Utils_Tuple2('くかい', '句会'),
			_Utils_Tuple2('うんざ', '運座'),
			_Utils_Tuple2('ふさん', '不参'),
			_Utils_Tuple2('れつざ', '列座'),
			_Utils_Tuple2('みあい', '見合い'),
			_Utils_Tuple2('めみえ', '目見え'),
			_Utils_Tuple2('でえと', 'デート'),
			_Utils_Tuple2('みまい', '見舞い'),
			_Utils_Tuple2('いもん', '慰問'),
			_Utils_Tuple2('くやみ', '悔やみ'),
			_Utils_Tuple2('てびき', '手引き'),
			_Utils_Tuple2('まねき', '招き'),
			_Utils_Tuple2('さそい', '誘い'),
			_Utils_Tuple2('むかえ', '迎え'),
			_Utils_Tuple2('べつり', '別離'),
			_Utils_Tuple2('しべつ', '死別'),
			_Utils_Tuple2('ざもち', '座持ち'),
			_Utils_Tuple2('よやく', '予約'),
			_Utils_Tuple2('かため', '固め'),
			_Utils_Tuple2('いはい', '違背'),
			_Utils_Tuple2('りんぎ', '稟議'),
			_Utils_Tuple2('だけつ', '妥結'),
			_Utils_Tuple2('じだん', '示談'),
			_Utils_Tuple2('さんぴ', '賛否'),
			_Utils_Tuple2('だくひ', '諾否'),
			_Utils_Tuple2('ごうい', '合意'),
			_Utils_Tuple2('きょひ', '許否'),
			_Utils_Tuple2('ゆるし', '許し'),
			_Utils_Tuple2('きょか', '許可'),
			_Utils_Tuple2('にんか', '認可'),
			_Utils_Tuple2('にんぴ', '認否'),
			_Utils_Tuple2('ぜにん', '是認'),
			_Utils_Tuple2('ひにん', '否認'),
			_Utils_Tuple2('ひてい', '否定'),
			_Utils_Tuple2('いえす', 'イエス'),
			_Utils_Tuple2('むだん', '無断'),
			_Utils_Tuple2('ごじょ', '互助'),
			_Utils_Tuple2('はちぶ', '八分'),
			_Utils_Tuple2('こんぺ', 'コンペ'),
			_Utils_Tuple2('しいど', 'シード'),
			_Utils_Tuple2('ちらん', '治乱'),
			_Utils_Tuple2('へいわ', '平和'),
			_Utils_Tuple2('ふせん', '不戦'),
			_Utils_Tuple2('むけつ', '無血'),
			_Utils_Tuple2('てろる', 'テロル'),
			_Utils_Tuple2('むほん', '謀反'),
			_Utils_Tuple2('いくさ', '戦'),
			_Utils_Tuple2('ぎせん', '義戦'),
			_Utils_Tuple2('ばとる', 'バトル'),
			_Utils_Tuple2('げりら', 'ゲリラ'),
			_Utils_Tuple2('ごばく', '誤爆'),
			_Utils_Tuple2('ひぜめ', '火攻め'),
			_Utils_Tuple2('げきは', '撃破'),
			_Utils_Tuple2('ひだん', '被弾'),
			_Utils_Tuple2('ぼうご', '防護'),
			_Utils_Tuple2('じえい', '自衛'),
			_Utils_Tuple2('まもり', '守り'),
			_Utils_Tuple2('ごえい', '護衛'),
			_Utils_Tuple2('このえ', '近衛'),
			_Utils_Tuple2('ちんご', '鎮護'),
			_Utils_Tuple2('けいび', '警備'),
			_Utils_Tuple2('があど', 'ガード'),
			_Utils_Tuple2('ごけん', '護憲'),
			_Utils_Tuple2('かちめ', '勝ち目'),
			_Utils_Tuple2('かちみ', '勝ち味'),
			_Utils_Tuple2('むはい', '無敗'),
			_Utils_Tuple2('れんぱ', '連破'),
			_Utils_Tuple2('せいは', '制覇'),
			_Utils_Tuple2('どろお', 'ドロー'),
			_Utils_Tuple2('ぐんじ', '軍事'),
			_Utils_Tuple2('ぐんび', '軍備'),
			_Utils_Tuple2('せんび', '戦備'),
			_Utils_Tuple2('ぶそう', '武装'),
			_Utils_Tuple2('へいび', '兵備'),
			_Utils_Tuple2('ぼうび', '防備'),
			_Utils_Tuple2('はへい', '派兵'),
			_Utils_Tuple2('ちんぶ', '鎮撫'),
			_Utils_Tuple2('くちく', '駆逐'),
			_Utils_Tuple2('かいふ', '開府'),
			_Utils_Tuple2('くせい', '区政'),
			_Utils_Tuple2('ぶだん', '武断'),
			_Utils_Tuple2('こくむ', '国務'),
			_Utils_Tuple2('せいむ', '政務'),
			_Utils_Tuple2('ないむ', '内務'),
			_Utils_Tuple2('がいむ', '外務'),
			_Utils_Tuple2('ほうむ', '法務'),
			_Utils_Tuple2('ざいむ', '財務'),
			_Utils_Tuple2('ぜいむ', '税務'),
			_Utils_Tuple2('もんぶ', '文部'),
			_Utils_Tuple2('ほあん', '保安'),
			_Utils_Tuple2('ちあん', '治安'),
			_Utils_Tuple2('けいむ', '刑務'),
			_Utils_Tuple2('さばき', '裁き'),
			_Utils_Tuple2('ぎごく', '疑獄'),
			_Utils_Tuple2('みんじ', '民事'),
			_Utils_Tuple2('てっか', '鉄火'),
			_Utils_Tuple2('こくそ', '告訴'),
			_Utils_Tuple2('じきそ', '直訴'),
			_Utils_Tuple2('おっそ', '越訴'),
			_Utils_Tuple2('ごうそ', '強訴'),
			_Utils_Tuple2('ざんそ', '讒訴'),
			_Utils_Tuple2('ていそ', '提訴'),
			_Utils_Tuple2('そつい', '訴追'),
			_Utils_Tuple2('ついそ', '追訴'),
			_Utils_Tuple2('おうそ', '応訴'),
			_Utils_Tuple2('はんそ', '反訴'),
			_Utils_Tuple2('ふきそ', '不起訴'),
			_Utils_Tuple2('めんそ', '免訴'),
			_Utils_Tuple2('しおき', '仕置き'),
			_Utils_Tuple2('とけい', '徒刑'),
			_Utils_Tuple2('るけい', '流刑'),
			_Utils_Tuple2('るざい', '流罪'),
			_Utils_Tuple2('はいる', '配流'),
			_Utils_Tuple2('るたく', '流謫'),
			_Utils_Tuple2('ぱあじ', 'パージ'),
			_Utils_Tuple2('しざい', '死罪'),
			_Utils_Tuple2('てどり', '手捕り'),
			_Utils_Tuple2('ほばく', '捕縛'),
			_Utils_Tuple2('しえい', '私営'),
			_Utils_Tuple2('とえい', '都営'),
			_Utils_Tuple2('ふえい', '府営'),
			_Utils_Tuple2('くえい', '区営'),
			_Utils_Tuple2('さはい', '差配'),
			_Utils_Tuple2('そうり', '総理'),
			_Utils_Tuple2('そくい', '即位'),
			_Utils_Tuple2('せんそ', '践祚'),
			_Utils_Tuple2('はいい', '廃位'),
			_Utils_Tuple2('じょい', '叙位'),
			_Utils_Tuple2('ぞうい', '贈位'),
			_Utils_Tuple2('ほにん', '補任'),
			_Utils_Tuple2('ぶにん', '補任'),
			_Utils_Tuple2('なざし', '名指し'),
			_Utils_Tuple2('ひめん', '罷免'),
			_Utils_Tuple2('とくは', '特派'),
			_Utils_Tuple2('ぞうは', '増派'),
			_Utils_Tuple2('さけん', '差遣'),
			_Utils_Tuple2('いにん', '委任'),
			_Utils_Tuple2('いたく', '委託'),
			_Utils_Tuple2('ぼへい', '募兵'),
			_Utils_Tuple2('たせん', '他薦'),
			_Utils_Tuple2('ほせん', '補選'),
			_Utils_Tuple2('ちいく', '知育'),
			_Utils_Tuple2('すすめ', '勧め'),
			_Utils_Tuple2('ほどう', '補導'),
			_Utils_Tuple2('しなん', '指南'),
			_Utils_Tuple2('しつけ', 'しつけ'),
			_Utils_Tuple2('しこみ', '仕込み'),
			_Utils_Tuple2('かくん', '家訓'),
			_Utils_Tuple2('そほう', '祖法'),
			_Utils_Tuple2('くんゆ', '訓諭'),
			_Utils_Tuple2('せつゆ', '説諭'),
			_Utils_Tuple2('さとし', '諭し'),
			_Utils_Tuple2('いさめ', 'いさめ'),
			_Utils_Tuple2('ふいく', '扶育'),
			_Utils_Tuple2('ほいく', '保育'),
			_Utils_Tuple2('てしお', '手塩'),
			_Utils_Tuple2('かほご', '過保護'),
			_Utils_Tuple2('よたく', '余沢'),
			_Utils_Tuple2('おんこ', '恩顧'),
			_Utils_Tuple2('みうけ', '身請け'),
			_Utils_Tuple2('よとぎ', '夜とぎ'),
			_Utils_Tuple2('たすけ', '助け'),
			_Utils_Tuple2('もとめ', '求め'),
			_Utils_Tuple2('そがん', '訴願'),
			_Utils_Tuple2('たのみ', '頼み'),
			_Utils_Tuple2('ゆすり', 'ゆすり'),
			_Utils_Tuple2('ねだり', 'ねだり'),
			_Utils_Tuple2('こうぼ', '公募'),
			_Utils_Tuple2('ぼきん', '募金'),
			_Utils_Tuple2('ぼさい', '募債'),
			_Utils_Tuple2('かぜい', '課税'),
			_Utils_Tuple2('さしず', '指図'),
			_Utils_Tuple2('たぶう', 'タブー'),
			_Utils_Tuple2('きんゆ', '禁輸'),
			_Utils_Tuple2('たりつ', '他律'),
			_Utils_Tuple2('ほだし', 'ほだし'),
			_Utils_Tuple2('てかせ', '手かせ'),
			_Utils_Tuple2('いあつ', '威圧'),
			_Utils_Tuple2('ふたく', '付託'),
			_Utils_Tuple2('たくじ', '託児'),
			_Utils_Tuple2('げごく', '下獄'),
			_Utils_Tuple2('しむけ', '仕向け'),
			_Utils_Tuple2('ちぐう', '知遇'),
			_Utils_Tuple2('ひいき', 'ひいき'),
			_Utils_Tuple2('へんぱ', '偏頗'),
			_Utils_Tuple2('したで', '下手'),
			_Utils_Tuple2('きたん', '忌憚'),
			_Utils_Tuple2('きがね', '気兼ね'),
			_Utils_Tuple2('べっし', '蔑視'),
			_Utils_Tuple2('しうち', '仕打ち'),
			_Utils_Tuple2('てごめ', '手込め'),
			_Utils_Tuple2('いびり', 'いびり'),
			_Utils_Tuple2('ぶれい', '無礼'),
			_Utils_Tuple2('ほうび', '褒美'),
			_Utils_Tuple2('いつび', '溢美'),
			_Utils_Tuple2('おだて', 'おだて'),
			_Utils_Tuple2('しかり', 'しかり'),
			_Utils_Tuple2('おどし', '脅し'),
			_Utils_Tuple2('いかく', '威嚇'),
			_Utils_Tuple2('にらみ', 'にらみ'),
			_Utils_Tuple2('ぎまん', '欺瞞'),
			_Utils_Tuple2('だまし', 'だまし'),
			_Utils_Tuple2('みわく', '魅惑'),
			_Utils_Tuple2('こわく', '蠱惑'),
			_Utils_Tuple2('ぶべつ', '侮蔑'),
			_Utils_Tuple2('げっと', 'ゲット'),
			_Utils_Tuple2('きとく', '既得'),
			_Utils_Tuple2('じどり', '地取り'),
			_Utils_Tuple2('ろかく', '鹵獲'),
			_Utils_Tuple2('さしゅ', '詐取'),
			_Utils_Tuple2('ぐゆう', '具有'),
			_Utils_Tuple2('ほゆう', '保有'),
			_Utils_Tuple2('かくほ', '確保'),
			_Utils_Tuple2('しぞう', '私蔵'),
			_Utils_Tuple2('ひぞう', '秘蔵'),
			_Utils_Tuple2('びちく', '備蓄'),
			_Utils_Tuple2('よきん', '預金'),
			_Utils_Tuple2('りざい', '理財'),
			_Utils_Tuple2('でふれ', 'デフレ'),
			_Utils_Tuple2('しゃほ', '社保'),
			_Utils_Tuple2('けんぽ', '健保'),
			_Utils_Tuple2('けいり', '経理'),
			_Utils_Tuple2('よさん', '予算'),
			_Utils_Tuple2('みすぎ', '身過ぎ'),
			_Utils_Tuple2('みいり', '実入り'),
			_Utils_Tuple2('ひぜに', '日銭'),
			_Utils_Tuple2('かせぎ', '稼ぎ'),
			_Utils_Tuple2('ほまち', 'ほまち'),
			_Utils_Tuple2('かんぷ', '還付'),
			_Utils_Tuple2('かわせ', '為替'),
			_Utils_Tuple2('みさい', '未済'),
			_Utils_Tuple2('じべん', '自弁'),
			_Utils_Tuple2('じばら', '自腹'),
			_Utils_Tuple2('みぜに', '身銭'),
			_Utils_Tuple2('じまえ', '自前'),
			_Utils_Tuple2('げっぷ', '月賦'),
			_Utils_Tuple2('とばく', '賭博'),
			_Utils_Tuple2('ばくち', 'ばくち'),
			_Utils_Tuple2('らんぴ', '乱費・濫費'),
			_Utils_Tuple2('くうひ', '空費'),
			_Utils_Tuple2('しっそ', '質素'),
			_Utils_Tuple2('ひっす', '必須'),
			_Utils_Tuple2('ひつび', '必備'),
			_Utils_Tuple2('むよう', '無用'),
			_Utils_Tuple2('むえき', '無益'),
			_Utils_Tuple2('そぜい', '租税'),
			_Utils_Tuple2('ねんぐ', '年貢'),
			_Utils_Tuple2('のうふ', '納付'),
			_Utils_Tuple2('みのう', '未納'),
			_Utils_Tuple2('しほん', '資本'),
			_Utils_Tuple2('もとで', '元手'),
			_Utils_Tuple2('かざい', '貨財'),
			_Utils_Tuple2('きょふ', '巨富'),
			_Utils_Tuple2('おかね', 'お金'),
			_Utils_Tuple2('おあし', 'おあし'),
			_Utils_Tuple2('きんす', '金子'),
			_Utils_Tuple2('どるか', 'ドル貨'),
			_Utils_Tuple2('こがね', '小金'),
			_Utils_Tuple2('こぜに', '小銭'),
			_Utils_Tuple2('おつり', 'お釣り'),
			_Utils_Tuple2('ぎきん', '義金'),
			_Utils_Tuple2('うちぶ', '打ち歩'),
			_Utils_Tuple2('てきん', '手金'),
			_Utils_Tuple2('てつけ', '手付け'),
			_Utils_Tuple2('ひがけ', '日掛け'),
			_Utils_Tuple2('こかぶ', '子株'),
			_Utils_Tuple2('はかぶ', '端株'),
			_Utils_Tuple2('ぼんど', 'ボンド'),
			_Utils_Tuple2('いいね', '言い値'),
			_Utils_Tuple2('さしね', '指し値'),
			_Utils_Tuple2('ひけね', '引け値'),
			_Utils_Tuple2('できね', '出来値'),
			_Utils_Tuple2('よりね', '寄り値'),
			_Utils_Tuple2('よびね', '呼び値'),
			_Utils_Tuple2('こすと', 'コスト'),
			_Utils_Tuple2('だいか', '代価'),
			_Utils_Tuple2('べいか', '米価'),
			_Utils_Tuple2('もとね', '元値'),
			_Utils_Tuple2('うりね', '売値'),
			_Utils_Tuple2('かいね', '買値'),
			_Utils_Tuple2('かけね', '掛け値'),
			_Utils_Tuple2('すてね', '捨て値'),
			_Utils_Tuple2('ばかね', 'ばか値'),
			_Utils_Tuple2('そうば', '相場'),
			_Utils_Tuple2('やみね', 'やみ値'),
			_Utils_Tuple2('かねめ', '金目'),
			_Utils_Tuple2('あんか', '安価'),
			_Utils_Tuple2('やすで', '安手'),
			_Utils_Tuple2('ねごろ', '値ごろ'),
			_Utils_Tuple2('たかね', '高値'),
			_Utils_Tuple2('やすね', '安値'),
			_Utils_Tuple2('そこね', '底値'),
			_Utils_Tuple2('うわね', '上値'),
			_Utils_Tuple2('したね', '下値'),
			_Utils_Tuple2('なかね', '中値'),
			_Utils_Tuple2('ねはば', '値幅'),
			_Utils_Tuple2('げらく', '下落'),
			_Utils_Tuple2('ねあげ', '値上げ'),
			_Utils_Tuple2('ねさげ', '値下げ'),
			_Utils_Tuple2('ねびき', '値引き'),
			_Utils_Tuple2('でのみ', 'デノミ'),
			_Utils_Tuple2('ぶびき', '分引き'),
			_Utils_Tuple2('りあげ', '利上げ'),
			_Utils_Tuple2('りさげ', '利下げ'),
			_Utils_Tuple2('ついえ', '費え'),
			_Utils_Tuple2('いりめ', '入り目'),
			_Utils_Tuple2('でせん', '出銭'),
			_Utils_Tuple2('けいひ', '経費'),
			_Utils_Tuple2('がくひ', '学費'),
			_Utils_Tuple2('りょひ', '旅費'),
			_Utils_Tuple2('ろぎん', '路銀'),
			_Utils_Tuple2('ろよう', '路用'),
			_Utils_Tuple2('ぐんぴ', '軍費'),
			_Utils_Tuple2('ざっぴ', '雑費'),
			_Utils_Tuple2('よびひ', '予備費'),
			_Utils_Tuple2('こくひ', '国費'),
			_Utils_Tuple2('かんぴ', '官費'),
			_Utils_Tuple2('しゃひ', '社費'),
			_Utils_Tuple2('てあて', '手当'),
			_Utils_Tuple2('びろく', '美禄'),
			_Utils_Tuple2('ちっぷ', 'チップ'),
			_Utils_Tuple2('むちん', '無賃'),
			_Utils_Tuple2('むぜい', '無税'),
			_Utils_Tuple2('だちん', '駄賃'),
			_Utils_Tuple2('ぎゃら', 'ギャラ'),
			_Utils_Tuple2('やちん', '家賃'),
			_Utils_Tuple2('まだい', '間代'),
			_Utils_Tuple2('ばだい', '場代'),
			_Utils_Tuple2('ゆせん', '湯銭'),
			_Utils_Tuple2('たんぽ', '担保'),
			_Utils_Tuple2('きんり', '金利'),
			_Utils_Tuple2('がんり', '元利'),
			_Utils_Tuple2('りそく', '利息'),
			_Utils_Tuple2('ねんり', '年利'),
			_Utils_Tuple2('げつり', '月利'),
			_Utils_Tuple2('むりし', '無利子'),
			_Utils_Tuple2('りざや', '利ざや'),
			_Utils_Tuple2('といち', '十一'),
			_Utils_Tuple2('りがい', '利害'),
			_Utils_Tuple2('ふため', '不ため'),
			_Utils_Tuple2('りえき', '利益'),
			_Utils_Tuple2('りとく', '利得'),
			_Utils_Tuple2('りはば', '利幅'),
			_Utils_Tuple2('ひえき', '稗益'),
			_Utils_Tuple2('りぐい', '利食い'),
			_Utils_Tuple2('あらり', '粗利'),
			_Utils_Tuple2('たいり', '大利'),
			_Utils_Tuple2('ぼうり', '暴利'),
			_Utils_Tuple2('ちのり', '地の利'),
			_Utils_Tuple2('さえき', '差益'),
			_Utils_Tuple2('ぬけに', '抜け荷'),
			_Utils_Tuple2('みつゆ', '密輸'),
			_Utils_Tuple2('いぬき', '居抜き'),
			_Utils_Tuple2('せえる', 'セール'),
			_Utils_Tuple2('たばい', '多売'),
			_Utils_Tuple2('みうり', '身売り'),
			_Utils_Tuple2('しいれ', '仕入れ'),
			_Utils_Tuple2('ふばい', '不買'),
			_Utils_Tuple2('こばい', '故買'),
			_Utils_Tuple2('いぞう', '遺贈'),
			_Utils_Tuple2('じゅよ', '授与'),
			_Utils_Tuple2('ぶんよ', '分与'),
			_Utils_Tuple2('てんよ', '天与'),
			_Utils_Tuple2('ぞうよ', '贈与'),
			_Utils_Tuple2('きぞう', '寄贈'),
			_Utils_Tuple2('ぎふと', 'ギフト'),
			_Utils_Tuple2('はつほ', '初穂'),
			_Utils_Tuple2('ぎえん', '義援'),
			_Utils_Tuple2('わいろ', '賄賂'),
			_Utils_Tuple2('じゅり', '受理'),
			_Utils_Tuple2('にうけ', '荷受け'),
			_Utils_Tuple2('もらい', 'もらい'),
			_Utils_Tuple2('かはい', '加配'),
			_Utils_Tuple2('ちはい', '遅配'),
			_Utils_Tuple2('しきせ', '仕着せ'),
			_Utils_Tuple2('はいふ', '配布'),
			_Utils_Tuple2('はんぷ', '頒布'),
			_Utils_Tuple2('くばり', '配り'),
			_Utils_Tuple2('りいす', 'リース'),
			_Utils_Tuple2('たいよ', '貸与'),
			_Utils_Tuple2('かしま', '貸間'),
			_Utils_Tuple2('まがし', '間貸し'),
			_Utils_Tuple2('ろおん', 'ローン'),
			_Utils_Tuple2('おいめ', '負い目'),
			_Utils_Tuple2('さいむ', '債務'),
			_Utils_Tuple2('あずけ', '預け'),
			_Utils_Tuple2('へんぷ', '返付'),
			_Utils_Tuple2('ひなし', '日なし'),
			_Utils_Tuple2('ひんぷ', '貧富'),
			_Utils_Tuple2('ひんく', '貧苦'),
			_Utils_Tuple2('おけら', 'おけら'),
			_Utils_Tuple2('さかえ', '栄え'),
			_Utils_Tuple2('じつむ', '実務'),
			_Utils_Tuple2('しょむ', '庶務'),
			_Utils_Tuple2('ようど', '用度'),
			_Utils_Tuple2('がくむ', '学務'),
			_Utils_Tuple2('ぐんむ', '軍務'),
			_Utils_Tuple2('げきむ', '激務・劇務'),
			_Utils_Tuple2('じたん', '時短'),
			_Utils_Tuple2('こさく', '小作'),
			_Utils_Tuple2('はしゅ', '播種'),
			_Utils_Tuple2('さっぱ', '撒播'),
			_Utils_Tuple2('たうえ', '田植え'),
			_Utils_Tuple2('ねわけ', '根分け'),
			_Utils_Tuple2('てきが', '摘芽'),
			_Utils_Tuple2('うえき', '植木'),
			_Utils_Tuple2('てうえ', '手植え'),
			_Utils_Tuple2('つぎき', '接ぎ木'),
			_Utils_Tuple2('さしき', '挿し木'),
			_Utils_Tuple2('めつぎ', '芽接ぎ'),
			_Utils_Tuple2('ねつぎ', '根接ぎ'),
			_Utils_Tuple2('いつぎ', '居接ぎ'),
			_Utils_Tuple2('しいく', '飼育'),
			_Utils_Tuple2('てがい', '手飼い'),
			_Utils_Tuple2('えづけ', 'え付け'),
			_Utils_Tuple2('さくゆ', '搾油'),
			_Utils_Tuple2('ひいく', '肥育'),
			_Utils_Tuple2('ようり', '養鯉'),
			_Utils_Tuple2('ほげい', '捕鯨'),
			_Utils_Tuple2('いさり', 'いさり'),
			_Utils_Tuple2('とさつ', '屠殺'),
			_Utils_Tuple2('しくつ', '試掘'),
			_Utils_Tuple2('せいゆ', '製油'),
			_Utils_Tuple2('てぐり', '手繰り'),
			_Utils_Tuple2('つむぎ', '紡ぎ'),
			_Utils_Tuple2('ており', '手織り'),
			_Utils_Tuple2('すやき', '素焼き'),
			_Utils_Tuple2('ひいれ', '火入れ'),
			_Utils_Tuple2('いかけ', '鋳掛け'),
			_Utils_Tuple2('めっき', 'めっき'),
			_Utils_Tuple2('ときん', '鍍金'),
			_Utils_Tuple2('ぞうき', '造機'),
			_Utils_Tuple2('はんぎ', '版木・板木'),
			_Utils_Tuple2('いんじ', '印字'),
			_Utils_Tuple2('てずり', '手刷り'),
			_Utils_Tuple2('わとじ', '和とじ'),
			_Utils_Tuple2('ちくろ', '築炉'),
			_Utils_Tuple2('どぼく', '土木'),
			_Utils_Tuple2('どけん', '土建'),
			_Utils_Tuple2('せこう', '施工'),
			_Utils_Tuple2('すぼり', '素掘り'),
			_Utils_Tuple2('ちすい', '治水'),
			_Utils_Tuple2('どもり', '土盛り'),
			_Utils_Tuple2('じつき', '地つき'),
			_Utils_Tuple2('のやき', '野焼き'),
			_Utils_Tuple2('ほそう', '舗装'),
			_Utils_Tuple2('ごがん', '護岸'),
			_Utils_Tuple2('ぼうは', '防波'),
			_Utils_Tuple2('いちく', '移築'),
			_Utils_Tuple2('とそう', '塗装'),
			_Utils_Tuple2('うんゆ', '運輸'),
			_Utils_Tuple2('とせん', '渡船'),
			_Utils_Tuple2('ゆそう', '輸送'),
			_Utils_Tuple2('くうゆ', '空輸'),
			_Utils_Tuple2('ごそう', '護送'),
			_Utils_Tuple2('そうゆ', '送油'),
			_Utils_Tuple2('にだし', '荷出し'),
			_Utils_Tuple2('にやく', '荷役'),
			_Utils_Tuple2('にあげ', '荷揚げ'),
			_Utils_Tuple2('ないか', '内科'),
			_Utils_Tuple2('ひふか', '皮膚科'),
			_Utils_Tuple2('じびか', '耳鼻科'),
			_Utils_Tuple2('だしん', '打診'),
			_Utils_Tuple2('いやし', 'いやし'),
			_Utils_Tuple2('ふわけ', '腑分け'),
			_Utils_Tuple2('しけつ', '止血'),
			_Utils_Tuple2('ちどめ', '血止め'),
			_Utils_Tuple2('ゆけつ', '輸血'),
			_Utils_Tuple2('ゆえき', '輸液'),
			_Utils_Tuple2('とうよ', '投与'),
			_Utils_Tuple2('げねつ', '解熱'),
			_Utils_Tuple2('しっぷ', '湿布'),
			_Utils_Tuple2('やいと', 'やいと'),
			_Utils_Tuple2('しあつ', '指圧'),
			_Utils_Tuple2('はつだ', '発兌'),
			_Utils_Tuple2('らいぶ', 'ライブ'),
			_Utils_Tuple2('しょお', 'ショー'),
			_Utils_Tuple2('じえん', '自演'),
			_Utils_Tuple2('まちね', 'マチネ'),
			_Utils_Tuple2('わごと', '和事'),
			_Utils_Tuple2('おはり', 'お針'),
			_Utils_Tuple2('わさい', '和裁'),
			_Utils_Tuple2('せぬき', '背抜き'),
			_Utils_Tuple2('てぬい', '手縫い'),
			_Utils_Tuple2('じぬい', '地縫い'),
			_Utils_Tuple2('せぬい', '背縫い'),
			_Utils_Tuple2('てあみ', '手編み'),
			_Utils_Tuple2('ぜんめ', '全目'),
			_Utils_Tuple2('ちぞめ', '血染め'),
			_Utils_Tuple2('あらい', '洗い'),
			_Utils_Tuple2('すすぎ', 'すすぎ'),
			_Utils_Tuple2('きよめ', '清め'),
			_Utils_Tuple2('ゆのし', '湯のし'),
			_Utils_Tuple2('すいじ', '炊事'),
			_Utils_Tuple2('にたき', '煮炊き'),
			_Utils_Tuple2('にやき', '煮焼き'),
			_Utils_Tuple2('ちぬき', '血抜き'),
			_Utils_Tuple2('ゆむき', '湯むき'),
			_Utils_Tuple2('そてえ', 'ソテー'),
			_Utils_Tuple2('ゆびき', '湯引き'),
			_Utils_Tuple2('ぼいる', 'ボイル'),
			_Utils_Tuple2('したに', '下煮'),
			_Utils_Tuple2('にこみ', '煮込み'),
			_Utils_Tuple2('みずに', '水煮'),
			_Utils_Tuple2('てもり', '手盛り'),
			_Utils_Tuple2('そふと', 'ソフト'),
			_Utils_Tuple2('せつび', '設備'),
			_Utils_Tuple2('かざり', '飾り'),
			_Utils_Tuple2('むとう', '無灯'),
			_Utils_Tuple2('しょり', '処理'),
			_Utils_Tuple2('しょち', '処置'),
			_Utils_Tuple2('めたて', '目立て'),
			_Utils_Tuple2('みがき', '磨き'),
			_Utils_Tuple2('けんま', '研磨'),
			_Utils_Tuple2('とまつ', '塗抹'),
			_Utils_Tuple2('にぬり', '丹塗り'),
			_Utils_Tuple2('そげき', '狙撃'),
			_Utils_Tuple2('ろくが', '録画'),
			_Utils_Tuple2('わいぷ', 'ワイプ'),
			_Utils_Tuple2('そうだ', '操舵'),
			_Utils_Tuple2('てせい', '手製'),
			_Utils_Tuple2('もぞう', '模造'),
			_Utils_Tuple2('ぎぞう', '偽造'),
			_Utils_Tuple2('わせい', '和製'),
			_Utils_Tuple2('いぶつ', '異物'),
			_Utils_Tuple2('たひん', '他品'),
			_Utils_Tuple2('すぺあ', 'スペア'),
			_Utils_Tuple2('ぶひん', '部品'),
			_Utils_Tuple2('ぱあつ', 'パーツ'),
			_Utils_Tuple2('おふる', 'お古'),
			_Utils_Tuple2('こぶつ', '古物'),
			_Utils_Tuple2('びひん', '備品'),
			_Utils_Tuple2('かひん', '佳品'),
			_Utils_Tuple2('だもの', '駄物'),
			_Utils_Tuple2('そしな', '粗品'),
			_Utils_Tuple2('そひん', '粗品'),
			_Utils_Tuple2('しぶつ', '死物'),
			_Utils_Tuple2('いひん', '遺品'),
			_Utils_Tuple2('えもの', '獲物'),
			_Utils_Tuple2('つりか', '釣り果'),
			_Utils_Tuple2('でもの', '出物'),
			_Utils_Tuple2('みやげ', '土産'),
			_Utils_Tuple2('かたみ', '形見'),
			_Utils_Tuple2('くもつ', '供物'),
			_Utils_Tuple2('ざっか', '雑貨'),
			_Utils_Tuple2('かもつ', '貨物'),
			_Utils_Tuple2('つみに', '積み荷'),
			_Utils_Tuple2('ふなに', '船荷'),
			_Utils_Tuple2('おもに', '重荷'),
			_Utils_Tuple2('はつに', '初荷'),
			_Utils_Tuple2('まねえ', 'マネー'),
			_Utils_Tuple2('きんか', '金貨'),
			_Utils_Tuple2('ぎんか', '銀貨'),
			_Utils_Tuple2('こせん', '古銭'),
			_Utils_Tuple2('おさつ', 'お札'),
			_Utils_Tuple2('てれか', 'テレカ'),
			_Utils_Tuple2('ばけん', '馬券'),
			_Utils_Tuple2('やくて', '約手'),
			_Utils_Tuple2('きって', '切手'),
			_Utils_Tuple2('きざい', '器材'),
			_Utils_Tuple2('きくず', '木くず'),
			_Utils_Tuple2('がれき', '瓦礫'),
			_Utils_Tuple2('こっぱ', '木っ端'),
			_Utils_Tuple2('もくず', '藻くず'),
			_Utils_Tuple2('みくず', '水くず'),
			_Utils_Tuple2('あくた', 'あくた'),
			_Utils_Tuple2('ざんど', '残土'),
			_Utils_Tuple2('ぱるぷ', 'パルプ'),
			_Utils_Tuple2('きがみ', '生紙'),
			_Utils_Tuple2('ちりし', 'ちり紙'),
			_Utils_Tuple2('じがみ', '地紙'),
			_Utils_Tuple2('しきし', '色紙'),
			_Utils_Tuple2('しいる', 'シール'),
			_Utils_Tuple2('らっぷ', 'ラップ'),
			_Utils_Tuple2('こるく', 'コルク'),
			_Utils_Tuple2('あらき', '荒木・粗木'),
			_Utils_Tuple2('しらき', '白木'),
			_Utils_Tuple2('あかぎ', '赤木'),
			_Utils_Tuple2('くろき', '黒木'),
			_Utils_Tuple2('まるた', '丸太'),
			_Utils_Tuple2('まるき', '丸木'),
			_Utils_Tuple2('よこぎ', '横木'),
			_Utils_Tuple2('うでぎ', '腕木'),
			_Utils_Tuple2('たるき', '垂る木'),
			_Utils_Tuple2('むなぎ', '棟木'),
			_Utils_Tuple2('とばん', '塗板'),
			_Utils_Tuple2('めいた', '目板'),
			_Utils_Tuple2('ぱねる', 'パネル'),
			_Utils_Tuple2('といた', '戸板'),
			_Utils_Tuple2('べとん', 'ベトン'),
			_Utils_Tuple2('がらす', 'ガラス'),
			_Utils_Tuple2('そせき', '礎石'),
			_Utils_Tuple2('ばらす', 'バラス'),
			_Utils_Tuple2('ぼせき', '墓石'),
			_Utils_Tuple2('ひせき', '碑石'),
			_Utils_Tuple2('からつ', '唐津'),
			_Utils_Tuple2('かわら', 'かわら'),
			_Utils_Tuple2('たいる', 'タイル'),
			_Utils_Tuple2('はがね', '鋼'),
			_Utils_Tuple2('ほいる', 'ホイル'),
			_Utils_Tuple2('ぶりき', 'ブリキ'),
			_Utils_Tuple2('とのこ', '砥の粉'),
			_Utils_Tuple2('たきぎ', '薪'),
			_Utils_Tuple2('つけぎ', '付け木'),
			_Utils_Tuple2('ひなわ', '火縄'),
			_Utils_Tuple2('ほくち', 'ほくち'),
			_Utils_Tuple2('もぐさ', 'もぐさ'),
			_Utils_Tuple2('たどん', 'たどん'),
			_Utils_Tuple2('あたん', '亜炭'),
			_Utils_Tuple2('せきゆ', '石油'),
			_Utils_Tuple2('なふさ', 'ナフサ'),
			_Utils_Tuple2('こやし', '肥やし'),
			_Utils_Tuple2('ねごえ', '根肥'),
			_Utils_Tuple2('ぎょひ', '魚肥'),
			_Utils_Tuple2('えきひ', '液肥'),
			_Utils_Tuple2('きんぴ', '金肥'),
			_Utils_Tuple2('ばいち', '培地'),
			_Utils_Tuple2('にかわ', 'にかわ'),
			_Utils_Tuple2('ふのり', 'ふのり'),
			_Utils_Tuple2('はんだ', 'はんだ'),
			_Utils_Tuple2('あぶら', '油'),
			_Utils_Tuple2('おいる', 'オイル'),
			_Utils_Tuple2('じゅし', '樹脂'),
			_Utils_Tuple2('ぎょゆ', '魚油'),
			_Utils_Tuple2('げいゆ', '鯨油'),
			_Utils_Tuple2('とうゆ', '灯油'),
			_Utils_Tuple2('わにす', 'ワニス'),
			_Utils_Tuple2('たある', 'タール'),
			_Utils_Tuple2('わっか', '輪っか'),
			_Utils_Tuple2('りんぐ', 'リング'),
			_Utils_Tuple2('ゆびわ', '指輪'),
			_Utils_Tuple2('みみわ', '耳輪'),
			_Utils_Tuple2('はなわ', '鼻輪'),
			_Utils_Tuple2('うでわ', '腕輪'),
			_Utils_Tuple2('わごむ', '輪ゴム'),
			_Utils_Tuple2('ごむわ', 'ゴム輪'),
			_Utils_Tuple2('くるま', '車'),
			_Utils_Tuple2('りいる', 'リール'),
			_Utils_Tuple2('ろくろ', 'ろくろ'),
			_Utils_Tuple2('じくぎ', '軸木'),
			_Utils_Tuple2('ぽおる', 'ポール'),
			_Utils_Tuple2('じって', '十手'),
			_Utils_Tuple2('ろっど', 'ロッド'),
			_Utils_Tuple2('ぱいぷ', 'パイプ'),
			_Utils_Tuple2('のずる', 'ノズル'),
			_Utils_Tuple2('ほおす', 'ホース'),
			_Utils_Tuple2('どかん', '土管'),
			_Utils_Tuple2('だくと', 'ダクト'),
			_Utils_Tuple2('かけひ', 'かけひ'),
			_Utils_Tuple2('きくぎ', '木くぎ'),
			_Utils_Tuple2('めくぎ', '目くぎ'),
			_Utils_Tuple2('なっと', 'ナット'),
			_Utils_Tuple2('つぎて', '継ぎ手'),
			_Utils_Tuple2('めねじ', '雌ねじ'),
			_Utils_Tuple2('おねじ', '雄ねじ'),
			_Utils_Tuple2('てかぎ', '手かぎ'),
			_Utils_Tuple2('ぼたん', 'ボタン'),
			_Utils_Tuple2('こはぜ', 'こはぜ'),
			_Utils_Tuple2('とめぐ', '留め具'),
			_Utils_Tuple2('はとめ', 'はと目'),
			_Utils_Tuple2('ぱいる', 'パイル'),
			_Utils_Tuple2('くさび', 'くさび'),
			_Utils_Tuple2('ながえ', '長柄'),
			_Utils_Tuple2('とって', '取っ手'),
			_Utils_Tuple2('ればあ', 'レバー'),
			_Utils_Tuple2('ああむ', 'アーム'),
			_Utils_Tuple2('つまみ', 'つまみ'),
			_Utils_Tuple2('ぺだる', 'ペダル'),
			_Utils_Tuple2('そえぎ', '添え木'),
			_Utils_Tuple2('ふりこ', '振り子'),
			_Utils_Tuple2('からん', 'カラン'),
			_Utils_Tuple2('ばるぶ', 'バルブ'),
			_Utils_Tuple2('おもり', '重り'),
			_Utils_Tuple2('おもし', '重し'),
			_Utils_Tuple2('そけい', '祖型'),
			_Utils_Tuple2('いがた', '鋳型'),
			_Utils_Tuple2('きがた', '木型'),
			_Utils_Tuple2('わいや', 'ワイヤ'),
			_Utils_Tuple2('こいる', 'コイル'),
			_Utils_Tuple2('ざいる', 'ザイル'),
			_Utils_Tuple2('ろおぷ', 'ロープ'),
			_Utils_Tuple2('つなぐ', '綱具'),
			_Utils_Tuple2('たづな', '手綱'),
			_Utils_Tuple2('てぐす', 'てぐす'),
			_Utils_Tuple2('こより', 'こより'),
			_Utils_Tuple2('はなお', '鼻緒'),
			_Utils_Tuple2('べると', 'ベルト'),
			_Utils_Tuple2('てえぷ', 'テープ'),
			_Utils_Tuple2('くさり', '鎖'),
			_Utils_Tuple2('てっさ', '鉄鎖'),
			_Utils_Tuple2('ねっと', 'ネット'),
			_Utils_Tuple2('とあみ', '投網'),
			_Utils_Tuple2('ぎぼし', '擬宝珠'),
			_Utils_Tuple2('もめん', '木綿'),
			_Utils_Tuple2('まわた', '真綿'),
			_Utils_Tuple2('ほわた', '穂綿'),
			_Utils_Tuple2('ううる', 'ウール'),
			_Utils_Tuple2('けがわ', '毛皮'),
			_Utils_Tuple2('ふぁあ', 'ファー'),
			_Utils_Tuple2('むとん', 'ムトン'),
			_Utils_Tuple2('きっど', 'キッド'),
			_Utils_Tuple2('かあふ', 'カーフ'),
			_Utils_Tuple2('れざあ', 'レザー'),
			_Utils_Tuple2('きいと', '生糸'),
			_Utils_Tuple2('めんし', '綿糸'),
			_Utils_Tuple2('けいと', '毛糸'),
			_Utils_Tuple2('がっと', 'ガット'),
			_Utils_Tuple2('ぎんし', '銀糸'),
			_Utils_Tuple2('そもう', '梳毛'),
			_Utils_Tuple2('やあん', 'ヤーン'),
			_Utils_Tuple2('じいと', '地糸'),
			_Utils_Tuple2('きぬの', '生布'),
			_Utils_Tuple2('こぎれ', '小切れ'),
			_Utils_Tuple2('ぬのじ', '布地'),
			_Utils_Tuple2('きなり', '生成り'),
			_Utils_Tuple2('ともじ', '共地'),
			_Utils_Tuple2('きぬじ', '絹地'),
			_Utils_Tuple2('おりじ', '織り地'),
			_Utils_Tuple2('あやじ', 'あや地'),
			_Utils_Tuple2('たてじ', '縦地'),
			_Utils_Tuple2('よこじ', '横地'),
			_Utils_Tuple2('ふくじ', '服地'),
			_Utils_Tuple2('おびじ', '帯地'),
			_Utils_Tuple2('があぜ', 'ガーゼ'),
			_Utils_Tuple2('うらじ', '裏地'),
			_Utils_Tuple2('そめじ', '染地'),
			_Utils_Tuple2('しろじ', '白地'),
			_Utils_Tuple2('うすじ', '薄地'),
			_Utils_Tuple2('あつじ', '厚地'),
			_Utils_Tuple2('ごふく', '呉服'),
			_Utils_Tuple2('ふはく', '布帛'),
			_Utils_Tuple2('けおり', '毛織り'),
			_Utils_Tuple2('にっと', 'ニット'),
			_Utils_Tuple2('つづれ', 'つづれ'),
			_Utils_Tuple2('らんる', '襤褸'),
			_Utils_Tuple2('めんぷ', '綿布'),
			_Utils_Tuple2('さらし', 'さらし'),
			_Utils_Tuple2('でにむ', 'デニム'),
			_Utils_Tuple2('けんぷ', '絹布'),
			_Utils_Tuple2('しるく', 'シルク'),
			_Utils_Tuple2('おめし', 'お召し'),
			_Utils_Tuple2('でしん', 'デシン'),
			_Utils_Tuple2('りんず', '綸子'),
			_Utils_Tuple2('どんす', '緞子'),
			_Utils_Tuple2('しゅす', '繻子'),
			_Utils_Tuple2('ほぬの', '帆布'),
			_Utils_Tuple2('ずっく', 'ズック'),
			_Utils_Tuple2('らしゃ', 'ラシャ'),
			_Utils_Tuple2('もへあ', 'モヘア'),
			_Utils_Tuple2('めりの', 'メリノ'),
			_Utils_Tuple2('さあじ', 'サージ'),
			_Utils_Tuple2('ふらの', 'フラノ'),
			_Utils_Tuple2('べろあ', 'ベロア'),
			_Utils_Tuple2('たふた', 'タフタ'),
			_Utils_Tuple2('ぽおら', 'ポーラ'),
			_Utils_Tuple2('さしこ', '刺し子'),
			_Utils_Tuple2('にしき', 'にしき'),
			_Utils_Tuple2('かすり', 'かすり'),
			_Utils_Tuple2('さらさ', 'サラサ'),
			_Utils_Tuple2('ころも', '衣'),
			_Utils_Tuple2('きるい', '着類'),
			_Utils_Tuple2('かみこ', '紙子'),
			_Utils_Tuple2('きんい', '金衣'),
			_Utils_Tuple2('わふく', '和服'),
			_Utils_Tuple2('きもの', '着物'),
			_Utils_Tuple2('どれす', 'ドレス'),
			_Utils_Tuple2('あわせ', 'あわせ'),
			_Utils_Tuple2('ぼとむ', 'ボトム'),
			_Utils_Tuple2('かりぎ', '借り着'),
			_Utils_Tuple2('じふく', '時服'),
			_Utils_Tuple2('はるぎ', '春着'),
			_Utils_Tuple2('なつぎ', '夏着'),
			_Utils_Tuple2('ふゆぎ', '冬着'),
			_Utils_Tuple2('あいぎ', '合着'),
			_Utils_Tuple2('ふるぎ', '古着'),
			_Utils_Tuple2('かえぎ', '替え着'),
			_Utils_Tuple2('めんず', 'メンズ'),
			_Utils_Tuple2('うぶぎ', '産着'),
			_Utils_Tuple2('へやぎ', '部屋着'),
			_Utils_Tuple2('ゆかた', '浴衣'),
			_Utils_Tuple2('まちぎ', '街着'),
			_Utils_Tuple2('はれぎ', '晴れ着'),
			_Utils_Tuple2('もふく', '喪服'),
			_Utils_Tuple2('みずぎ', '水着'),
			_Utils_Tuple2('びきに', 'ビキニ'),
			_Utils_Tuple2('さむえ', '作務衣'),
			_Utils_Tuple2('のらぎ', '野良着'),
			_Utils_Tuple2('はくい', '白衣'),
			_Utils_Tuple2('こくえ', '黒衣'),
			_Utils_Tuple2('おんぞ', '御衣'),
			_Utils_Tuple2('うわぎ', '上着'),
			_Utils_Tuple2('すうつ', 'スーツ'),
			_Utils_Tuple2('せびろ', '背広'),
			_Utils_Tuple2('ろおぶ', 'ローブ'),
			_Utils_Tuple2('こそで', '小そで'),
			_Utils_Tuple2('ながぎ', '長着'),
			_Utils_Tuple2('はおり', '羽織'),
			_Utils_Tuple2('はっぴ', '法被'),
			_Utils_Tuple2('あろは', 'アロハ'),
			_Utils_Tuple2('ぼれろ', 'ボレロ'),
			_Utils_Tuple2('ぬのこ', '布子'),
			_Utils_Tuple2('どてら', 'どてら'),
			_Utils_Tuple2('よつみ', '四つ身'),
			_Utils_Tuple2('こおと', 'コート'),
			_Utils_Tuple2('あまぎ', '雨着'),
			_Utils_Tuple2('がうん', 'ガウン'),
			_Utils_Tuple2('けえぷ', 'ケープ'),
			_Utils_Tuple2('ぱあか', 'パーカ'),
			_Utils_Tuple2('はかま', 'はかま'),
			_Utils_Tuple2('ずぼん', 'ズボン'),
			_Utils_Tuple2('ぱんつ', 'パンツ'),
			_Utils_Tuple2('たいつ', 'タイツ'),
			_Utils_Tuple2('もんぺ', 'もんぺ'),
			_Utils_Tuple2('したぎ', '下着'),
			_Utils_Tuple2('はだぎ', '肌着'),
			_Utils_Tuple2('しゃつ', 'シャツ'),
			_Utils_Tuple2('ぱっち', 'パッチ'),
			_Utils_Tuple2('ゆもじ', '湯文字'),
			_Utils_Tuple2('おこし', 'お腰'),
			_Utils_Tuple2('ゆまき', '湯巻き'),
			_Utils_Tuple2('けだし', 'けだし'),
			_Utils_Tuple2('ねまき', '寝巻き'),
			_Utils_Tuple2('たもと', 'たもと'),
			_Utils_Tuple2('もすそ', 'もすそ'),
			_Utils_Tuple2('かふす', 'カフス'),
			_Utils_Tuple2('おくみ', 'おくみ'),
			_Utils_Tuple2('よおく', 'ヨーク'),
			_Utils_Tuple2('ぽっけ', 'ポッケ'),
			_Utils_Tuple2('ぽっぽ', 'ぽっぽ'),
			_Utils_Tuple2('ぱっど', 'パッド'),
			_Utils_Tuple2('べれえ', 'ベレー'),
			_Utils_Tuple2('えぼし', 'えぼし'),
			_Utils_Tuple2('ずきん', '頭巾'),
			_Utils_Tuple2('かぶと', 'かぶと'),
			_Utils_Tuple2('かつら', 'かつら'),
			_Utils_Tuple2('べえる', 'ベール'),
			_Utils_Tuple2('ますく', 'マスク'),
			_Utils_Tuple2('くつわ', 'くつわ'),
			_Utils_Tuple2('くびわ', '首輪'),
			_Utils_Tuple2('たすき', 'たすき'),
			_Utils_Tuple2('おしめ', 'おしめ'),
			_Utils_Tuple2('おむつ', 'おむつ'),
			_Utils_Tuple2('ぐんて', '軍手'),
			_Utils_Tuple2('ぐらぶ', 'グラブ'),
			_Utils_Tuple2('みっと', 'ミット'),
			_Utils_Tuple2('みとん', 'ミトン'),
			_Utils_Tuple2('よろい', 'よろい'),
			_Utils_Tuple2('ぼうぐ', '防具'),
			_Utils_Tuple2('けいぐ', '刑具'),
			_Utils_Tuple2('げそく', '下足'),
			_Utils_Tuple2('へいり', '弊履'),
			_Utils_Tuple2('きぐつ', '木靴'),
			_Utils_Tuple2('ぶうつ', 'ブーツ'),
			_Utils_Tuple2('ひいる', 'ヒール'),
			_Utils_Tuple2('かかと', 'かかと'),
			_Utils_Tuple2('えっじ', 'エッジ'),
			_Utils_Tuple2('あしだ', '足駄'),
			_Utils_Tuple2('ほおば', 'ほお歯'),
			_Utils_Tuple2('ぞうり', '草履'),
			_Utils_Tuple2('せった', '雪駄'),
			_Utils_Tuple2('わらじ', 'わらじ'),
			_Utils_Tuple2('あまぐ', '雨具'),
			_Utils_Tuple2('ひがさ', '日傘'),
			_Utils_Tuple2('ひおい', '日おい'),
			_Utils_Tuple2('しんぐ', '寝具'),
			_Utils_Tuple2('ふすま', 'ふすま'),
			_Utils_Tuple2('ねどこ', '寝床'),
			_Utils_Tuple2('べっど', 'ベッド'),
			_Utils_Tuple2('ふとん', '布団'),
			_Utils_Tuple2('もうふ', '毛布'),
			_Utils_Tuple2('けっと', 'ケット'),
			_Utils_Tuple2('しきふ', '敷布'),
			_Utils_Tuple2('しいつ', 'シーツ'),
			_Utils_Tuple2('そうぐ', '装具'),
			_Utils_Tuple2('ねつけ', '根付け'),
			_Utils_Tuple2('すきげ', 'すき毛'),
			_Utils_Tuple2('つけげ', '付け毛'),
			_Utils_Tuple2('ぴあす', 'ピアス'),
			_Utils_Tuple2('たまき', '環'),
			_Utils_Tuple2('ぱある', 'パール'),
			_Utils_Tuple2('こはく', '琥珀'),
			_Utils_Tuple2('かめお', 'カメオ'),
			_Utils_Tuple2('りぼん', 'リボン'),
			_Utils_Tuple2('じゅず', '数珠'),
			_Utils_Tuple2('にょい', '如意'),
			_Utils_Tuple2('とっこ', '独鈷'),
			_Utils_Tuple2('どっこ', '独鈷'),
			_Utils_Tuple2('さかな', 'さかな'),
			_Utils_Tuple2('そはん', '粗飯'),
			_Utils_Tuple2('まぐさ', 'まぐさ'),
			_Utils_Tuple2('かいば', '飼い葉'),
			_Utils_Tuple2('いきえ', '生きえ'),
			_Utils_Tuple2('すりえ', 'すりえ'),
			_Utils_Tuple2('ねりえ', '練りえ'),
			_Utils_Tuple2('つりえ', '釣りえ'),
			_Utils_Tuple2('えじき', 'えじき'),
			_Utils_Tuple2('おさい', 'お菜'),
			_Utils_Tuple2('おかず', 'おかず'),
			_Utils_Tuple2('にもの', '煮物'),
			_Utils_Tuple2('ひもの', '干物'),
			_Utils_Tuple2('ひたし', '浸し'),
			_Utils_Tuple2('しんこ', '新香'),
			_Utils_Tuple2('やくみ', '薬味'),
			_Utils_Tuple2('おめざ', 'おめざ'),
			_Utils_Tuple2('おせち', 'お節'),
			_Utils_Tuple2('しだし', '仕出し'),
			_Utils_Tuple2('らいす', 'ライス'),
			_Utils_Tuple2('おこわ', 'おこわ'),
			_Utils_Tuple2('おもゆ', '重湯'),
			_Utils_Tuple2('おじや', 'おじや'),
			_Utils_Tuple2('くっぱ', 'クッパ'),
			_Utils_Tuple2('ゆづけ', '湯漬け'),
			_Utils_Tuple2('ぴらふ', 'ピラフ'),
			_Utils_Tuple2('すもじ', 'すもじ'),
			_Utils_Tuple2('きそば', '生そば'),
			_Utils_Tuple2('うどん', 'うどん'),
			_Utils_Tuple2('ぱすた', 'パスタ'),
			_Utils_Tuple2('ふぉお', 'フォー'),
			_Utils_Tuple2('こっぺ', 'コッペ'),
			_Utils_Tuple2('おつゆ', 'おつゆ'),
			_Utils_Tuple2('すうぷ', 'スープ'),
			_Utils_Tuple2('おつけ', 'おつけ'),
			_Utils_Tuple2('ぞうに', '雑煮'),
			_Utils_Tuple2('しるこ', '汁粉'),
			_Utils_Tuple2('くずゆ', 'くず湯'),
			_Utils_Tuple2('そばゆ', 'そば湯'),
			_Utils_Tuple2('につけ', '煮付け'),
			_Utils_Tuple2('しらに', '白煮'),
			_Utils_Tuple2('うまに', 'うま煮'),
			_Utils_Tuple2('あまに', '甘煮'),
			_Utils_Tuple2('にしめ', '煮しめ'),
			_Utils_Tuple2('にまめ', '煮豆'),
			_Utils_Tuple2('あらに', '粗煮'),
			_Utils_Tuple2('あめに', 'あめ煮'),
			_Utils_Tuple2('じぶに', 'じぶ煮'),
			_Utils_Tuple2('みそに', 'みそ煮'),
			_Utils_Tuple2('おでん', 'おでん'),
			_Utils_Tuple2('ねぎま', 'ねぎま'),
			_Utils_Tuple2('どりあ', 'ドリア'),
			_Utils_Tuple2('すぶた', '酢豚'),
			_Utils_Tuple2('さしみ', '刺身'),
			_Utils_Tuple2('ばさし', '馬刺し'),
			_Utils_Tuple2('さらだ', 'サラダ'),
			_Utils_Tuple2('なます', 'なます'),
			_Utils_Tuple2('すだこ', '酢だこ'),
			_Utils_Tuple2('すがき', '酢がき'),
			_Utils_Tuple2('あんこ', 'あんこ'),
			_Utils_Tuple2('うるち', 'うるち'),
			_Utils_Tuple2('じまい', '地米'),
			_Utils_Tuple2('こまい', '古米'),
			_Utils_Tuple2('こごめ', '小米・粉米'),
			_Utils_Tuple2('てごな', '手粉'),
			_Utils_Tuple2('きなこ', '黄な粉'),
			_Utils_Tuple2('くずこ', 'くず粉'),
			_Utils_Tuple2('そばこ', 'そば粉'),
			_Utils_Tuple2('むぎこ', '麦粉'),
			_Utils_Tuple2('じごな', '地粉'),
			_Utils_Tuple2('ぱんこ', 'パン粉'),
			_Utils_Tuple2('ほしい', '干し飯'),
			_Utils_Tuple2('やさい', '野菜'),
			_Utils_Tuple2('あおこ', '青粉'),
			_Utils_Tuple2('こんぶ', '昆布'),
			_Utils_Tuple2('めんま', 'メンマ'),
			_Utils_Tuple2('にぼし', '煮干し'),
			_Utils_Tuple2('じゃこ', 'じゃこ'),
			_Utils_Tuple2('いりこ', 'いりこ'),
			_Utils_Tuple2('ほしこ', 'ほしこ'),
			_Utils_Tuple2('するめ', 'するめ'),
			_Utils_Tuple2('つけな', '漬け菜'),
			_Utils_Tuple2('きむち', 'キムチ'),
			_Utils_Tuple2('こぷら', 'コプラ'),
			_Utils_Tuple2('とうふ', '豆腐'),
			_Utils_Tuple2('おから', 'おから'),
			_Utils_Tuple2('まろん', 'マロン'),
			_Utils_Tuple2('なまふ', '生麩'),
			_Utils_Tuple2('やきふ', '焼き麩'),
			_Utils_Tuple2('とろろ', 'とろろ'),
			_Utils_Tuple2('ひうお', 'ひ魚'),
			_Utils_Tuple2('めざし', '目刺し'),
			_Utils_Tuple2('ごまめ', 'ごまめ'),
			_Utils_Tuple2('きりみ', '切り身'),
			_Utils_Tuple2('るいべ', 'ルイベ'),
			_Utils_Tuple2('すじこ', '筋子'),
			_Utils_Tuple2('たらこ', 'たらこ'),
			_Utils_Tuple2('ちくわ', '竹輪'),
			_Utils_Tuple2('つみれ', 'つみれ'),
			_Utils_Tuple2('すりみ', 'すり身'),
			_Utils_Tuple2('ちきん', 'チキン'),
			_Utils_Tuple2('かしわ', 'かしわ'),
			_Utils_Tuple2('びいふ', 'ビーフ'),
			_Utils_Tuple2('ぎゅう', '牛'),
			_Utils_Tuple2('ぽおく', 'ポーク'),
			_Utils_Tuple2('まとん', 'マトン'),
			_Utils_Tuple2('ばにく', '馬肉'),
			_Utils_Tuple2('あかみ', '赤身'),
			_Utils_Tuple2('ちあい', '血合い'),
			_Utils_Tuple2('しろみ', '白身'),
			_Utils_Tuple2('とろみ', 'とろ身'),
			_Utils_Tuple2('ささみ', 'ささ身'),
			_Utils_Tuple2('ろおす', 'ロース'),
			_Utils_Tuple2('めんち', 'メンチ'),
			_Utils_Tuple2('みんち', 'ミンチ'),
			_Utils_Tuple2('さらみ', 'サラミ'),
			_Utils_Tuple2('かるび', 'カルビ'),
			_Utils_Tuple2('そぼろ', 'そぼろ'),
			_Utils_Tuple2('おぼろ', 'おぼろ'),
			_Utils_Tuple2('そとう', '粗糖'),
			_Utils_Tuple2('ざらめ', 'ざら目'),
			_Utils_Tuple2('もしお', '藻塩'),
			_Utils_Tuple2('よねず', '米酢'),
			_Utils_Tuple2('こめず', '米酢'),
			_Utils_Tuple2('くろず', '黒酢'),
			_Utils_Tuple2('うめず', '梅酢'),
			_Utils_Tuple2('あまず', '甘酢'),
			_Utils_Tuple2('とさず', '土佐酢'),
			_Utils_Tuple2('きみず', '黄身酢'),
			_Utils_Tuple2('すみそ', '酢みそ'),
			_Utils_Tuple2('もろみ', 'もろみ'),
			_Utils_Tuple2('ぽんず', 'ポン酢'),
			_Utils_Tuple2('らあゆ', 'ラーユ'),
			_Utils_Tuple2('ばたあ', 'バター'),
			_Utils_Tuple2('ちいず', 'チーズ'),
			_Utils_Tuple2('らあど', 'ラード'),
			_Utils_Tuple2('へっと', 'ヘット'),
			_Utils_Tuple2('じゃむ', 'ジャム'),
			_Utils_Tuple2('からし', 'からし'),
			_Utils_Tuple2('わさび', 'わさび'),
			_Utils_Tuple2('かれえ', 'カレー'),
			_Utils_Tuple2('しちみ', '七味'),
			_Utils_Tuple2('せえじ', 'セージ'),
			_Utils_Tuple2('ばじる', 'バジル'),
			_Utils_Tuple2('ちゃか', '茶菓'),
			_Utils_Tuple2('おかし', 'お菓子'),
			_Utils_Tuple2('わがし', '和菓子'),
			_Utils_Tuple2('けえき', 'ケーキ'),
			_Utils_Tuple2('すふれ', 'スフレ'),
			_Utils_Tuple2('だがし', '駄菓子'),
			_Utils_Tuple2('かんみ', '甘味'),
			_Utils_Tuple2('ぬがあ', 'ヌガー'),
			_Utils_Tuple2('おかき', 'おかき'),
			_Utils_Tuple2('あられ', 'あられ'),
			_Utils_Tuple2('らすく', 'ラスク'),
			_Utils_Tuple2('ぼおろ', 'ボーロ'),
			_Utils_Tuple2('たると', 'タルト'),
			_Utils_Tuple2('ちまき', 'ちまき'),
			_Utils_Tuple2('おはぎ', 'おはぎ'),
			_Utils_Tuple2('ゆべし', 'ゆべし'),
			_Utils_Tuple2('だんご', '団子'),
			_Utils_Tuple2('もなか', 'もなか'),
			_Utils_Tuple2('あいす', 'アイス'),
			_Utils_Tuple2('ぱふぇ', 'パフェ'),
			_Utils_Tuple2('ぜりい', 'ゼリー'),
			_Utils_Tuple2('むうす', 'ムース'),
			_Utils_Tuple2('ぷりん', 'プリン'),
			_Utils_Tuple2('ゆちゃ', '湯茶'),
			_Utils_Tuple2('おひや', 'お冷や'),
			_Utils_Tuple2('てぃい', 'ティー'),
			_Utils_Tuple2('こちゃ', '古茶'),
			_Utils_Tuple2('そちゃ', '粗茶'),
			_Utils_Tuple2('はちゃ', '葉茶'),
			_Utils_Tuple2('むぎゆ', '麦湯'),
			_Utils_Tuple2('ここあ', 'ココア'),
			_Utils_Tuple2('らむね', 'ラムネ'),
			_Utils_Tuple2('こおら', 'コーラ'),
			_Utils_Tuple2('ええど', 'エード'),
			_Utils_Tuple2('みるく', 'ミルク'),
			_Utils_Tuple2('じざけ', '地酒'),
			_Utils_Tuple2('びしゅ', '美酒'),
			_Utils_Tuple2('みりん', 'みりん'),
			_Utils_Tuple2('りかあ', 'リカー'),
			_Utils_Tuple2('わいん', 'ワイン'),
			_Utils_Tuple2('もると', 'モルト'),
			_Utils_Tuple2('びいる', 'ビール'),
			_Utils_Tuple2('さわあ', 'サワー'),
			_Utils_Tuple2('ぽんち', 'ポンチ'),
			_Utils_Tuple2('おとそ', 'お屠蘇'),
			_Utils_Tuple2('おみき', 'お神酒'),
			_Utils_Tuple2('たばこ', 'たばこ'),
			_Utils_Tuple2('はまき', '葉巻'),
			_Utils_Tuple2('しがあ', 'シガー'),
			_Utils_Tuple2('ひだま', '火玉'),
			_Utils_Tuple2('くすり', '薬'),
			_Utils_Tuple2('ぎやく', '偽薬'),
			_Utils_Tuple2('ざやく', '座薬'),
			_Utils_Tuple2('ぱっぷ', 'パップ'),
			_Utils_Tuple2('ゆざい', '油剤'),
			_Utils_Tuple2('まやく', '麻薬'),
			_Utils_Tuple2('げざい', '下剤'),
			_Utils_Tuple2('とざい', '吐剤'),
			_Utils_Tuple2('びやく', '媚薬'),
			_Utils_Tuple2('あへん', 'あへん'),
			_Utils_Tuple2('たいま', '大麻'),
			_Utils_Tuple2('ちんき', 'チンキ'),
			_Utils_Tuple2('かやり', '蚊やり'),
			_Utils_Tuple2('そめこ', '染め粉'),
			_Utils_Tuple2('かるき', 'カルキ'),
			_Utils_Tuple2('しやく', '試薬'),
			_Utils_Tuple2('さりん', 'サリン'),
			_Utils_Tuple2('ちっく', 'チック'),
			_Utils_Tuple2('みすと', 'ミスト'),
			_Utils_Tuple2('じぇる', 'ジェル'),
			_Utils_Tuple2('きゃら', '伽羅'),
			_Utils_Tuple2('こうゆ', '香油'),
			_Utils_Tuple2('すみか', '住みか'),
			_Utils_Tuple2('はうす', 'ハウス'),
			_Utils_Tuple2('こだて', '戸建て'),
			_Utils_Tuple2('じたく', '自宅'),
			_Utils_Tuple2('あじと', 'アジト'),
			_Utils_Tuple2('はいつ', 'ハイツ'),
			_Utils_Tuple2('こおぽ', 'コーポ'),
			_Utils_Tuple2('うりや', '売り家'),
			_Utils_Tuple2('あきや', '空き家'),
			_Utils_Tuple2('やしき', '屋敷'),
			_Utils_Tuple2('ごしょ', '御所'),
			_Utils_Tuple2('くもい', '雲居'),
			_Utils_Tuple2('はれむ', 'ハレム'),
			_Utils_Tuple2('でじろ', '出城'),
			_Utils_Tuple2('でまる', '出丸'),
			_Utils_Tuple2('ねぐら', 'ねぐら'),
			_Utils_Tuple2('すあな', '巣穴'),
			_Utils_Tuple2('ふるす', '古巣'),
			_Utils_Tuple2('まくつ', '魔窟'),
			_Utils_Tuple2('こけつ', '虎穴'),
			_Utils_Tuple2('かおく', '家屋'),
			_Utils_Tuple2('じんか', '人家'),
			_Utils_Tuple2('みんか', '民家'),
			_Utils_Tuple2('やまが', '山家'),
			_Utils_Tuple2('うてな', 'うてな'),
			_Utils_Tuple2('ながや', '長屋'),
			_Utils_Tuple2('ひらや', '平屋'),
			_Utils_Tuple2('うわや', '上屋・上家'),
			_Utils_Tuple2('とまや', 'とま屋'),
			_Utils_Tuple2('くさや', '草屋'),
			_Utils_Tuple2('わらや', 'わら屋'),
			_Utils_Tuple2('ぼろや', 'ぼろ家'),
			_Utils_Tuple2('すきや', '数寄屋'),
			_Utils_Tuple2('いおり', 'いおり'),
			_Utils_Tuple2('ごてん', '御殿'),
			_Utils_Tuple2('ぱれす', 'パレス'),
			_Utils_Tuple2('なでん', '南殿'),
			_Utils_Tuple2('どうう', '堂宇'),
			_Utils_Tuple2('みどう', 'み堂'),
			_Utils_Tuple2('おもや', '母屋・母家'),
			_Utils_Tuple2('かりや', '仮屋'),
			_Utils_Tuple2('ろっじ', 'ロッジ'),
			_Utils_Tuple2('ばんや', '番屋'),
			_Utils_Tuple2('うまや', '馬屋'),
			_Utils_Tuple2('どぞう', '土蔵'),
			_Utils_Tuple2('さいろ', 'サイロ'),
			_Utils_Tuple2('しょこ', '書庫'),
			_Utils_Tuple2('ぶんこ', '文庫'),
			_Utils_Tuple2('しゃこ', '車庫'),
			_Utils_Tuple2('ていこ', '艇庫'),
			_Utils_Tuple2('ひむろ', '氷室'),
			_Utils_Tuple2('いわや', '岩屋'),
			_Utils_Tuple2('やぐら', 'やぐら'),
			_Utils_Tuple2('ひのみ', '火の見'),
			_Utils_Tuple2('たわあ', 'タワー'),
			_Utils_Tuple2('ぱごだ', 'パゴダ'),
			_Utils_Tuple2('そとば', '卒塔婆'),
			_Utils_Tuple2('てんと', 'テント'),
			_Utils_Tuple2('もんこ', '門戸'),
			_Utils_Tuple2('げえと', 'ゲート'),
			_Utils_Tuple2('とりい', '鳥居'),
			_Utils_Tuple2('いげた', '井げた'),
			_Utils_Tuple2('いづつ', '井筒'),
			_Utils_Tuple2('どべい', '土塀'),
			_Utils_Tuple2('ついじ', '築地'),
			_Utils_Tuple2('かきね', '垣根'),
			_Utils_Tuple2('まがき', 'まがき'),
			_Utils_Tuple2('るうむ', 'ルーム'),
			_Utils_Tuple2('こべや', '小部屋'),
			_Utils_Tuple2('たしつ', '他室'),
			_Utils_Tuple2('ひろま', '広間'),
			_Utils_Tuple2('ざしき', '座敷'),
			_Utils_Tuple2('わしつ', '和室'),
			_Utils_Tuple2('ぶつま', '仏間'),
			_Utils_Tuple2('うぶや', '産屋'),
			_Utils_Tuple2('ぶしつ', '部室'),
			_Utils_Tuple2('がくや', '楽屋'),
			_Utils_Tuple2('ろびい', 'ロビー'),
			_Utils_Tuple2('ぽおち', 'ポーチ'),
			_Utils_Tuple2('くりや', 'くりや'),
			_Utils_Tuple2('みずや', '水屋'),
			_Utils_Tuple2('ゆどの', '湯殿'),
			_Utils_Tuple2('ふろば', 'ふろ場'),
			_Utils_Tuple2('おふろ', 'おふろ'),
			_Utils_Tuple2('うちゆ', '内湯'),
			_Utils_Tuple2('そとゆ', '外湯'),
			_Utils_Tuple2('さうな', 'サウナ'),
			_Utils_Tuple2('といれ', 'トイレ'),
			_Utils_Tuple2('かわや', 'かわや'),
			_Utils_Tuple2('ほろう', '歩廊'),
			_Utils_Tuple2('がんぎ', 'がん木'),
			_Utils_Tuple2('てらす', 'テラス'),
			_Utils_Tuple2('ろだい', '露台'),
			_Utils_Tuple2('ろふと', 'ロフト'),
			_Utils_Tuple2('にかい', '二階'),
			_Utils_Tuple2('いたや', '板屋'),
			_Utils_Tuple2('いらか', 'いらか'),
			_Utils_Tuple2('ひさし', 'ひさし'),
			_Utils_Tuple2('うだつ', 'うだつ'),
			_Utils_Tuple2('うだち', 'うだち'),
			_Utils_Tuple2('びいむ', 'ビーム'),
			_Utils_Tuple2('きいる', 'キール'),
			_Utils_Tuple2('かもい', 'かもい'),
			_Utils_Tuple2('なげし', '長押'),
			_Utils_Tuple2('らんま', '欄間'),
			_Utils_Tuple2('しきい', '敷居'),
			_Utils_Tuple2('かまち', 'かまち'),
			_Utils_Tuple2('はくあ', '白亜'),
			_Utils_Tuple2('でまど', '出窓'),
			_Utils_Tuple2('どおむ', 'ドーム'),
			_Utils_Tuple2('どだい', '土台'),
			_Utils_Tuple2('どだん', '土壇'),
			_Utils_Tuple2('てすり', '手すり'),
			_Utils_Tuple2('とだな', '戸棚'),
			_Utils_Tuple2('にだい', '荷台'),
			_Utils_Tuple2('ねだい', '寝台'),
			_Utils_Tuple2('やたい', '屋台'),
			_Utils_Tuple2('だいざ', '台座'),
			_Utils_Tuple2('たてぐ', '建具'),
			_Utils_Tuple2('もんぴ', '門扉'),
			_Utils_Tuple2('ひきど', '引き戸'),
			_Utils_Tuple2('くりど', '繰り戸'),
			_Utils_Tuple2('やりど', 'やり戸'),
			_Utils_Tuple2('おおど', '大戸'),
			_Utils_Tuple2('つまど', '妻戸'),
			_Utils_Tuple2('きりど', '切り戸'),
			_Utils_Tuple2('てっぴ', '鉄扉'),
			_Utils_Tuple2('あみど', '網戸'),
			_Utils_Tuple2('あまど', '雨戸'),
			_Utils_Tuple2('しとみ', 'しとみ'),
			_Utils_Tuple2('れんじ', '連子'),
			_Utils_Tuple2('すだれ', 'すだれ'),
			_Utils_Tuple2('よしず', 'よしず'),
			_Utils_Tuple2('とばり', 'とばり'),
			_Utils_Tuple2('のれん', 'のれん'),
			_Utils_Tuple2('しとね', 'しとね'),
			_Utils_Tuple2('むしろ', 'むしろ'),
			_Utils_Tuple2('まっと', 'マット'),
			_Utils_Tuple2('すのこ', 'すのこ'),
			_Utils_Tuple2('つくえ', '机'),
			_Utils_Tuple2('ねいす', '寝椅子'),
			_Utils_Tuple2('ざいす', '座椅子'),
			_Utils_Tuple2('ちぇあ', 'チェア'),
			_Utils_Tuple2('べんち', 'ベンチ'),
			_Utils_Tuple2('さどる', 'サドル'),
			_Utils_Tuple2('べんざ', '便座'),
			_Utils_Tuple2('たんす', 'たんす'),
			_Utils_Tuple2('つづら', 'つづら'),
			_Utils_Tuple2('わごん', 'ワゴン'),
			_Utils_Tuple2('どがま', '土窯'),
			_Utils_Tuple2('かまど', 'かまど'),
			_Utils_Tuple2('こんろ', 'こんろ'),
			_Utils_Tuple2('てんぴ', '天火'),
			_Utils_Tuple2('ひばち', '火鉢'),
			_Utils_Tuple2('こたつ', 'こたつ'),
			_Utils_Tuple2('おこた', 'おこた'),
			_Utils_Tuple2('いろり', 'いろり'),
			_Utils_Tuple2('だんろ', '暖炉'),
			_Utils_Tuple2('ぺちか', 'ペチカ'),
			_Utils_Tuple2('ゆぶね', '湯船'),
			_Utils_Tuple2('はしご', 'はしご'),
			_Utils_Tuple2('どうぐ', '道具'),
			_Utils_Tuple2('ようぐ', '用具'),
			_Utils_Tuple2('さいぐ', '祭具'),
			_Utils_Tuple2('ぶつぐ', '仏具'),
			_Utils_Tuple2('こうぐ', '校具'),
			_Utils_Tuple2('みんぐ', '民具'),
			_Utils_Tuple2('つりぐ', '釣り具'),
			_Utils_Tuple2('ふなぐ', '船具'),
			_Utils_Tuple2('たから', '宝'),
			_Utils_Tuple2('うつわ', '器'),
			_Utils_Tuple2('はくじ', '白磁'),
			_Utils_Tuple2('しっき', '漆器'),
			_Utils_Tuple2('かなぐ', '金具'),
			_Utils_Tuple2('いもの', '鋳物'),
			_Utils_Tuple2('ぎんき', '銀器'),
			_Utils_Tuple2('ぼとる', 'ボトル'),
			_Utils_Tuple2('じゃあ', 'ジャー'),
			_Utils_Tuple2('ぽっと', 'ポット'),
			_Utils_Tuple2('つるべ', 'つるべ'),
			_Utils_Tuple2('とくり', 'とくり'),
			_Utils_Tuple2('ひさご', 'ひさご'),
			_Utils_Tuple2('ぼんべ', 'ボンベ'),
			_Utils_Tuple2('こぼし', 'こぼし'),
			_Utils_Tuple2('るつぼ', 'るつぼ'),
			_Utils_Tuple2('かびん', '花瓶'),
			_Utils_Tuple2('ぼうる', 'ボウル'),
			_Utils_Tuple2('とれえ', 'トレー'),
			_Utils_Tuple2('おひつ', 'おひつ'),
			_Utils_Tuple2('おはち', 'お鉢'),
			_Utils_Tuple2('ておけ', '手おけ'),
			_Utils_Tuple2('ゆとう', '湯桶'),
			_Utils_Tuple2('ゆつぼ', '湯つぼ'),
			_Utils_Tuple2('ばけつ', 'バケツ'),
			_Utils_Tuple2('たらい', 'たらい'),
			_Utils_Tuple2('こばこ', '小箱'),
			_Utils_Tuple2('きばこ', '木箱'),
			_Utils_Tuple2('わりご', 'わりご'),
			_Utils_Tuple2('いれこ', '入れ子'),
			_Utils_Tuple2('かけご', '懸子'),
			_Utils_Tuple2('なかご', '中子'),
			_Utils_Tuple2('ふばこ', '文箱'),
			_Utils_Tuple2('てばこ', '手箱'),
			_Utils_Tuple2('すばこ', '巣箱'),
			_Utils_Tuple2('ねかん', '寝棺'),
			_Utils_Tuple2('ひつぎ', 'ひつぎ'),
			_Utils_Tuple2('うきわ', '浮き輪'),
			_Utils_Tuple2('どのう', '土嚢'),
			_Utils_Tuple2('さのう', '砂嚢'),
			_Utils_Tuple2('かます', 'かます'),
			_Utils_Tuple2('ばっぐ', 'バッグ'),
			_Utils_Tuple2('てさげ', '手提げ'),
			_Utils_Tuple2('ずのう', '図嚢'),
			_Utils_Tuple2('ふくさ', '袱紗'),
			_Utils_Tuple2('ざっく', 'ザック'),
			_Utils_Tuple2('あじか', 'あじか'),
			_Utils_Tuple2('あけに', '明け荷'),
			_Utils_Tuple2('てかご', '手かご'),
			_Utils_Tuple2('かわご', '皮ご'),
			_Utils_Tuple2('にかご', '荷かご'),
			_Utils_Tuple2('めかご', '目かご'),
			_Utils_Tuple2('たわら', '俵'),
			_Utils_Tuple2('もっこ', 'もっこ'),
			_Utils_Tuple2('こざら', '小皿'),
			_Utils_Tuple2('こばち', '小鉢'),
			_Utils_Tuple2('おわん', 'おわん'),
			_Utils_Tuple2('おひら', 'おひら'),
			_Utils_Tuple2('こっぷ', 'コップ'),
			_Utils_Tuple2('ゆのみ', '湯飲み'),
			_Utils_Tuple2('ぐらす', 'グラス'),
			_Utils_Tuple2('ちょこ', 'ちょこ'),
			_Utils_Tuple2('かんす', '鑵子'),
			_Utils_Tuple2('けとる', 'ケトル'),
			_Utils_Tuple2('どびん', '土瓶'),
			_Utils_Tuple2('どうこ', '銅壺'),
			_Utils_Tuple2('ちろり', 'ちろり'),
			_Utils_Tuple2('どなべ', '土なべ'),
			_Utils_Tuple2('てなべ', '手なべ'),
			_Utils_Tuple2('かなえ', 'かなえ'),
			_Utils_Tuple2('せいろ', 'せいろ'),
			_Utils_Tuple2('ひばし', '火ばし'),
			_Utils_Tuple2('とんぐ', 'トング'),
			_Utils_Tuple2('ないふ', 'ナイフ'),
			_Utils_Tuple2('こさじ', '小さじ'),
			_Utils_Tuple2('おたま', 'お玉'),
			_Utils_Tuple2('ぶんぐ', '文具'),
			_Utils_Tuple2('えふで', '絵筆'),
			_Utils_Tuple2('がひつ', '画筆'),
			_Utils_Tuple2('やたて', '矢立て'),
			_Utils_Tuple2('いんく', 'インク'),
			_Utils_Tuple2('すずり', 'すずり'),
			_Utils_Tuple2('えのぐ', '絵の具'),
			_Utils_Tuple2('ごふん', '胡粉'),
			_Utils_Tuple2('ちゃこ', 'チャコ'),
			_Utils_Tuple2('こんて', 'コンテ'),
			_Utils_Tuple2('じけし', '字消し'),
			_Utils_Tuple2('ぼおど', 'ボード'),
			_Utils_Tuple2('がばん', '画板'),
			_Utils_Tuple2('はんこ', '判子'),
			_Utils_Tuple2('みとめ', '認め'),
			_Utils_Tuple2('ぎょじ', '御璽'),
			_Utils_Tuple2('かつじ', '活字'),
			_Utils_Tuple2('ばれん', '馬楝'),
			_Utils_Tuple2('のうぐ', '農具'),
			_Utils_Tuple2('ぎょぐ', '漁具'),
			_Utils_Tuple2('えんぴ', '円匙'),
			_Utils_Tuple2('くまで', 'くま手'),
			_Utils_Tuple2('まぐわ', 'まぐわ'),
			_Utils_Tuple2('れえき', 'レーキ'),
			_Utils_Tuple2('すぱな', 'スパナ'),
			_Utils_Tuple2('ぺんち', 'ペンチ'),
			_Utils_Tuple2('こづち', '小づち'),
			_Utils_Tuple2('きづち', '木づち'),
			_Utils_Tuple2('かけや', '掛け矢'),
			_Utils_Tuple2('れんぎ', '連木'),
			_Utils_Tuple2('とうみ', 'とうみ'),
			_Utils_Tuple2('といし', 'といし'),
			_Utils_Tuple2('あらと', 'あらと'),
			_Utils_Tuple2('かわど', 'かわど'),
			_Utils_Tuple2('やすり', 'やすり'),
			_Utils_Tuple2('ふいご', 'ふいご'),
			_Utils_Tuple2('たたら', 'たたら'),
			_Utils_Tuple2('あぶみ', 'あぶみ'),
			_Utils_Tuple2('くびき', 'くびき'),
			_Utils_Tuple2('あじろ', 'あじろ'),
			_Utils_Tuple2('かかし', 'かかし'),
			_Utils_Tuple2('なるこ', '鳴子'),
			_Utils_Tuple2('しらほ', '白帆'),
			_Utils_Tuple2('かたほ', '片帆'),
			_Utils_Tuple2('ますと', 'マスト'),
			_Utils_Tuple2('おおる', 'オール'),
			_Utils_Tuple2('ろっく', 'ロック'),
			_Utils_Tuple2('きせる', 'キセル'),
			_Utils_Tuple2('るああ', 'ルアー'),
			_Utils_Tuple2('けぬき', '毛抜き'),
			_Utils_Tuple2('はたき', 'はたき'),
			_Utils_Tuple2('ぶらし', 'ブラシ'),
			_Utils_Tuple2('ささら', 'ささら'),
			_Utils_Tuple2('たわし', 'たわし'),
			_Utils_Tuple2('もっぷ', 'モップ'),
			_Utils_Tuple2('たおる', 'タオル'),
			_Utils_Tuple2('ぎぷす', 'ギプス'),
			_Utils_Tuple2('すきん', 'スキン'),
			_Utils_Tuple2('さっく', 'サック'),
			_Utils_Tuple2('そおぷ', 'ソープ'),
			_Utils_Tuple2('うるし', 'うるし'),
			_Utils_Tuple2('ぺんき', 'ペンキ'),
			_Utils_Tuple2('べんき', '便器'),
			_Utils_Tuple2('おかわ', 'おかわ'),
			_Utils_Tuple2('おまる', 'おまる'),
			_Utils_Tuple2('しびん', 'し瓶'),
			_Utils_Tuple2('ふるい', 'ふるい'),
			_Utils_Tuple2('ろうと', '漏斗'),
			_Utils_Tuple2('ひのし', '火のし'),
			_Utils_Tuple2('きぬた', 'きぬた'),
			_Utils_Tuple2('どんき', '鈍器'),
			_Utils_Tuple2('ふえつ', '斧鉞'),
			_Utils_Tuple2('ねたば', 'ねた刃'),
			_Utils_Tuple2('やいば', 'やいば'),
			_Utils_Tuple2('そりば', 'そり刃'),
			_Utils_Tuple2('うすば', '薄刃'),
			_Utils_Tuple2('かたは', '片刃'),
			_Utils_Tuple2('もろは', 'もろ刃'),
			_Utils_Tuple2('かえば', '替え刃'),
			_Utils_Tuple2('ぬきみ', '抜き身'),
			_Utils_Tuple2('かたな', '刀'),
			_Utils_Tuple2('ことう', '古刀'),
			_Utils_Tuple2('つるぎ', '剣'),
			_Utils_Tuple2('ひしゅ', '匕首'),
			_Utils_Tuple2('こづか', '小づか'),
			_Utils_Tuple2('せっぱ', '切羽'),
			_Utils_Tuple2('ておの', '手おの'),
			_Utils_Tuple2('せきふ', '石斧'),
			_Utils_Tuple2('とがま', 'とがま'),
			_Utils_Tuple2('かんな', 'かんな'),
			_Utils_Tuple2('はさみ', 'はさみ'),
			_Utils_Tuple2('たがね', 'たがね'),
			_Utils_Tuple2('やだま', '矢弾'),
			_Utils_Tuple2('ゆみや', '弓矢'),
			_Utils_Tuple2('どくや', '毒矢'),
			_Utils_Tuple2('ふきや', '吹き矢'),
			_Utils_Tuple2('はまや', '破魔矢'),
			_Utils_Tuple2('やじり', 'やじり'),
			_Utils_Tuple2('やはず', 'やはず'),
			_Utils_Tuple2('こると', 'コルト'),
			_Utils_Tuple2('やほう', '野砲'),
			_Utils_Tuple2('ひぶた', '火ぶた'),
			_Utils_Tuple2('つぶて', 'つぶて'),
			_Utils_Tuple2('だんう', '弾雨'),
			_Utils_Tuple2('ぶらす', 'ブラス'),
			_Utils_Tuple2('こてき', '鼓笛'),
			_Utils_Tuple2('おんさ', '音叉'),
			_Utils_Tuple2('つづみ', '鼓'),
			_Utils_Tuple2('どらむ', 'ドラム'),
			_Utils_Tuple2('わぎん', '和琴'),
			_Utils_Tuple2('はあぷ', 'ハープ'),
			_Utils_Tuple2('ちたあ', 'チター'),
			_Utils_Tuple2('ぎたあ', 'ギター'),
			_Utils_Tuple2('びいな', 'ビーナ'),
			_Utils_Tuple2('ぶずき', 'ブズキ'),
			_Utils_Tuple2('びおら', 'ビオラ'),
			_Utils_Tuple2('ちぇろ', 'チェロ'),
			_Utils_Tuple2('ぴあの', 'ピアノ'),
			_Utils_Tuple2('まてき', '魔笛'),
			_Utils_Tuple2('らっぱ', 'らっぱ'),
			_Utils_Tuple2('ほるん', 'ホルン'),
			_Utils_Tuple2('よびこ', '呼び子'),
			_Utils_Tuple2('よぶこ', '呼ぶ子'),
			_Utils_Tuple2('がんぐ', '玩具'),
			_Utils_Tuple2('ゆうぐ', '遊具'),
			_Utils_Tuple2('くぐつ', 'くぐつ'),
			_Utils_Tuple2('ひいな', 'ひいな'),
			_Utils_Tuple2('おびな', '男びな'),
			_Utils_Tuple2('めびな', '女びな'),
			_Utils_Tuple2('だるま', 'だるま'),
			_Utils_Tuple2('こけし', 'こけし'),
			_Utils_Tuple2('きめん', '鬼面'),
			_Utils_Tuple2('かずら', 'かずら'),
			_Utils_Tuple2('てまり', '手まり'),
			_Utils_Tuple2('てだま', '手玉'),
			_Utils_Tuple2('えだこ', '絵だこ'),
			_Utils_Tuple2('びいず', 'ビーズ'),
			_Utils_Tuple2('つみき', '積み木'),
			_Utils_Tuple2('はなび', '花火'),
			_Utils_Tuple2('はあと', 'ハート'),
			_Utils_Tuple2('どみの', 'ドミノ'),
			_Utils_Tuple2('ごばん', '碁盤'),
			_Utils_Tuple2('ひしゃ', '飛車'),
			_Utils_Tuple2('けいま', '桂馬'),
			_Utils_Tuple2('だいす', 'ダイス'),
			_Utils_Tuple2('めんこ', 'めんこ'),
			_Utils_Tuple2('だあと', 'ダート'),
			_Utils_Tuple2('ちくば', '竹馬'),
			_Utils_Tuple2('もくば', '木馬'),
			_Utils_Tuple2('ばっと', 'バット'),
			_Utils_Tuple2('ぱたあ', 'パター'),
			_Utils_Tuple2('あれい', '亜鈴'),
			_Utils_Tuple2('ざぞう', '座像'),
			_Utils_Tuple2('らぞう', '裸像'),
			_Utils_Tuple2('はりこ', '張り子'),
			_Utils_Tuple2('そぞう', '塑像'),
			_Utils_Tuple2('どぐう', '土偶'),
			_Utils_Tuple2('はにわ', 'はにわ'),
			_Utils_Tuple2('ひぶつ', '秘仏'),
			_Utils_Tuple2('ろぶつ', '露仏'),
			_Utils_Tuple2('ばっじ', 'バッジ'),
			_Utils_Tuple2('めだる', 'メダル'),
			_Utils_Tuple2('せきひ', '石碑'),
			_Utils_Tuple2('だんぴ', '断碑'),
			_Utils_Tuple2('もあい', 'モアイ'),
			_Utils_Tuple2('れいい', '霊位'),
			_Utils_Tuple2('なふだ', '名札'),
			_Utils_Tuple2('おふだ', 'お札'),
			_Utils_Tuple2('ごふう', '御符'),
			_Utils_Tuple2('じゅふ', '呪符'),
			_Utils_Tuple2('しゃき', '社旗'),
			_Utils_Tuple2('てばた', '手旗'),
			_Utils_Tuple2('たくと', 'タクト'),
			_Utils_Tuple2('ばとん', 'バトン'),
			_Utils_Tuple2('てふだ', '手札'),
			_Utils_Tuple2('かあど', 'カード'),
			_Utils_Tuple2('にふだ', '荷札'),
			_Utils_Tuple2('えふだ', '絵札'),
			_Utils_Tuple2('ねふだ', '値札'),
			_Utils_Tuple2('りふだ', '利札'),
			_Utils_Tuple2('らべる', 'ラベル'),
			_Utils_Tuple2('わりふ', '割り符'),
			_Utils_Tuple2('あいふ', '合い符'),
			_Utils_Tuple2('ちっき', 'チッキ'),
			_Utils_Tuple2('ちらし', '散らし'),
			_Utils_Tuple2('しおり', 'しおり'),
			_Utils_Tuple2('げんぼ', '原簿'),
			_Utils_Tuple2('えまき', '絵巻'),
			_Utils_Tuple2('あかり', '明かり'),
			_Utils_Tuple2('らんぷ', 'ランプ'),
			_Utils_Tuple2('ねおん', 'ネオン'),
			_Utils_Tuple2('ぎょか', '漁火'),
			_Utils_Tuple2('かがり', 'かがり'),
			_Utils_Tuple2('とおち', 'トーチ'),
			_Utils_Tuple2('びとう', '尾灯'),
			_Utils_Tuple2('みらあ', 'ミラー'),
			_Utils_Tuple2('れんず', 'レンズ'),
			_Utils_Tuple2('どつき', '度付き'),
			_Utils_Tuple2('るうぺ', 'ルーペ'),
			_Utils_Tuple2('かめら', 'カメラ'),
			_Utils_Tuple2('らじお', 'ラジオ'),
			_Utils_Tuple2('てれび', 'テレビ'),
			_Utils_Tuple2('こんぽ', 'コンポ'),
			_Utils_Tuple2('びでお', 'ビデオ'),
			_Utils_Tuple2('おやき', '親機'),
			_Utils_Tuple2('まいく', 'マイク'),
			_Utils_Tuple2('ぶざあ', 'ブザー'),
			_Utils_Tuple2('でんち', '電池'),
			_Utils_Tuple2('たんに', '単二'),
			_Utils_Tuple2('ぷらぐ', 'プラグ'),
			_Utils_Tuple2('ああす', 'アース'),
			_Utils_Tuple2('そうち', '装置'),
			_Utils_Tuple2('みしん', 'ミシン'),
			_Utils_Tuple2('あみき', '編み機'),
			_Utils_Tuple2('たあぼ', 'ターボ'),
			_Utils_Tuple2('ぽんぷ', 'ポンプ'),
			_Utils_Tuple2('ぞんで', 'ゾンデ'),
			_Utils_Tuple2('くじら', '鯨'),
			_Utils_Tuple2('のぎす', 'ノギス'),
			_Utils_Tuple2('かざみ', '風見'),
			_Utils_Tuple2('そなあ', 'ｓｏｎａｒ'),
			_Utils_Tuple2('みこし', 'みこし'),
			_Utils_Tuple2('ばそり', '馬そり'),
			_Utils_Tuple2('ばしゃ', '馬車'),
			_Utils_Tuple2('ばいく', 'バイク'),
			_Utils_Tuple2('よんく', '四駆'),
			_Utils_Tuple2('せだん', 'セダン'),
			_Utils_Tuple2('くうぺ', 'クーペ'),
			_Utils_Tuple2('じいぷ', 'ジープ'),
			_Utils_Tuple2('だんぷ', 'ダンプ'),
			_Utils_Tuple2('しばす', '市バス'),
			_Utils_Tuple2('たんく', 'タンク'),
			_Utils_Tuple2('とでん', '都電'),
			_Utils_Tuple2('めとろ', 'メトロ'),
			_Utils_Tuple2('りふと', 'リフト'),
			_Utils_Tuple2('こぶね', '小舟'),
			_Utils_Tuple2('おぶね', '小舟'),
			_Utils_Tuple2('ぼおと', 'ボート'),
			_Utils_Tuple2('すかる', 'スカル'),
			_Utils_Tuple2('かぬう', 'カヌー'),
			_Utils_Tuple2('はしけ', 'はしけ'),
			_Utils_Tuple2('いかだ', 'いかだ'),
			_Utils_Tuple2('ほぶね', '帆船'),
			_Utils_Tuple2('よっと', 'ヨット'),
			_Utils_Tuple2('うぶね', 'う舟'),
			_Utils_Tuple2('ぼせん', '母船'),
			_Utils_Tuple2('ぼかん', '母艦'),
			_Utils_Tuple2('くうぼ', '空母'),
			_Utils_Tuple2('でっき', 'デッキ'),
			_Utils_Tuple2('あいき', '愛機'),
			_Utils_Tuple2('つばさ', '翼'),
			_Utils_Tuple2('びよく', '尾翼'),
			_Utils_Tuple2('すんど', '寸土'),
			_Utils_Tuple2('じわり', '地割り'),
			_Utils_Tuple2('かりち', '借り地'),
			_Utils_Tuple2('かしち', '貸し地'),
			_Utils_Tuple2('うりち', '売り地'),
			_Utils_Tuple2('かえち', '替え地'),
			_Utils_Tuple2('たくち', '宅地'),
			_Utils_Tuple2('のうち', '農地'),
			_Utils_Tuple2('たはた', '田畑'),
			_Utils_Tuple2('あれち', '荒れ地'),
			_Utils_Tuple2('たんぼ', 'たんぼ'),
			_Utils_Tuple2('あおた', '青田'),
			_Utils_Tuple2('みずた', '水田'),
			_Utils_Tuple2('どろた', '泥田'),
			_Utils_Tuple2('たなだ', '棚田'),
			_Utils_Tuple2('いなだ', '稲田'),
			_Utils_Tuple2('びでん', '美田'),
			_Utils_Tuple2('げでん', '下田'),
			_Utils_Tuple2('まきば', '牧場'),
			_Utils_Tuple2('ひろば', '広場'),
			_Utils_Tuple2('ぷらざ', 'プラザ'),
			_Utils_Tuple2('しばふ', '芝生'),
			_Utils_Tuple2('すなば', '砂場'),
			_Utils_Tuple2('ぱあく', 'パーク'),
			_Utils_Tuple2('らんど', 'ランド'),
			_Utils_Tuple2('たあふ', 'ターフ'),
			_Utils_Tuple2('ぼえん', '墓園・墓苑'),
			_Utils_Tuple2('はかば', '墓場'),
			_Utils_Tuple2('ぼしょ', '墓所'),
			_Utils_Tuple2('むしょ', '墓所'),
			_Utils_Tuple2('ふんぼ', '墳墓'),
			_Utils_Tuple2('こふん', '古墳'),
			_Utils_Tuple2('どうろ', '道路'),
			_Utils_Tuple2('ろおど', 'ロード'),
			_Utils_Tuple2('とどう', '都道'),
			_Utils_Tuple2('えきろ', '駅路'),
			_Utils_Tuple2('なわて', '縄手'),
			_Utils_Tuple2('のみち', '野道'),
			_Utils_Tuple2('こみち', '小道'),
			_Utils_Tuple2('しゃろ', '斜路'),
			_Utils_Tuple2('とうろ', '登路'),
			_Utils_Tuple2('がいろ', '街路'),
			_Utils_Tuple2('おおじ', '大路'),
			_Utils_Tuple2('つうろ', '通路'),
			_Utils_Tuple2('ろかた', '路肩'),
			_Utils_Tuple2('そうろ', '走路'),
			_Utils_Tuple2('あくろ', '悪路'),
			_Utils_Tuple2('なんろ', '難路'),
			_Utils_Tuple2('けんろ', '険路'),
			_Utils_Tuple2('ごさろ', '五叉路'),
			_Utils_Tuple2('せんろ', '線路'),
			_Utils_Tuple2('てつろ', '鉄路'),
			_Utils_Tuple2('どばし', '土橋'),
			_Utils_Tuple2('そすい', '疏水'),
			_Utils_Tuple2('うんが', '運河'),
			_Utils_Tuple2('げすい', '下水'),
			_Utils_Tuple2('いけす', '生けす'),
			_Utils_Tuple2('どるい', '土塁'),
			_Utils_Tuple2('こるい', '孤塁'),
			_Utils_Tuple2('とりで', 'とりで'),
			_Utils_Tuple2('どっく', 'ドック'),
			_Utils_Tuple2('ゆせい', '油井'),
			_Utils_Tuple2('てんろ', '転炉'),
			_Utils_Tuple2('おんぱ', '音波'),
			_Utils_Tuple2('たんぱ', '短波'),
			_Utils_Tuple2('みりは', 'ミリ波'),
			_Utils_Tuple2('えれき', 'エレキ'),
			_Utils_Tuple2('でんじ', '電磁'),
			_Utils_Tuple2('ちじき', '地磁気'),
			_Utils_Tuple2('でんり', '電離'),
			_Utils_Tuple2('ひかり', '光'),
			_Utils_Tuple2('ひざし', '日差し'),
			_Utils_Tuple2('うすび', '薄日'),
			_Utils_Tuple2('ころな', 'コロナ'),
			_Utils_Tuple2('くらさ', '暗さ'),
			_Utils_Tuple2('だあく', 'ダーク'),
			_Utils_Tuple2('やいん', '夜陰'),
			_Utils_Tuple2('ひなた', 'ひなた'),
			_Utils_Tuple2('かげり', '陰り'),
			_Utils_Tuple2('ぼかし', 'ぼかし'),
			_Utils_Tuple2('くもり', '曇り'),
			_Utils_Tuple2('ごしき', '五色'),
			_Utils_Tuple2('むらご', '村濃'),
			_Utils_Tuple2('すそご', 'すそご'),
			_Utils_Tuple2('じいろ', '地色'),
			_Utils_Tuple2('あおじ', '青地'),
			_Utils_Tuple2('くろさ', '黒さ'),
			_Utils_Tuple2('ましろ', '真白'),
			_Utils_Tuple2('れっど', 'レッド'),
			_Utils_Tuple2('あかさ', '赤さ'),
			_Utils_Tuple2('ぐれん', '紅蓮'),
			_Utils_Tuple2('ぴんく', 'ピンク'),
			_Utils_Tuple2('すおう', 'すおう'),
			_Utils_Tuple2('せぴあ', 'セピア'),
			_Utils_Tuple2('うこん', 'うこん'),
			_Utils_Tuple2('きいろ', '黄色'),
			_Utils_Tuple2('あさぎ', '浅黄'),
			_Utils_Tuple2('みどり', '緑'),
			_Utils_Tuple2('あおみ', '青み'),
			_Utils_Tuple2('あおさ', '青さ'),
			_Utils_Tuple2('ぶるう', 'ブルー'),
			_Utils_Tuple2('ぐれえ', 'グレー'),
			_Utils_Tuple2('ひいろ', '火色'),
			_Utils_Tuple2('はいろ', '葉色'),
			_Utils_Tuple2('ひやけ', '日焼け'),
			_Utils_Tuple2('わおん', '和音'),
			_Utils_Tuple2('ひびき', '響き'),
			_Utils_Tuple2('うなり', 'うなり'),
			_Utils_Tuple2('どよみ', 'どよみ'),
			_Utils_Tuple2('じなり', '地鳴り'),
			_Utils_Tuple2('えこお', 'エコー'),
			_Utils_Tuple2('そよぎ', 'そよぎ'),
			_Utils_Tuple2('きしり', 'きしり'),
			_Utils_Tuple2('きしみ', 'きしみ'),
			_Utils_Tuple2('さやぎ', 'さやぎ'),
			_Utils_Tuple2('のいず', 'ノイズ'),
			_Utils_Tuple2('はおと', '羽音'),
			_Utils_Tuple2('しじま', 'しじま'),
			_Utils_Tuple2('むおん', '無音'),
			_Utils_Tuple2('ねいろ', '音色'),
			_Utils_Tuple2('あると', 'アルト'),
			_Utils_Tuple2('におい', 'におい'),
			_Utils_Tuple2('かおり', 'かおり'),
			_Utils_Tuple2('くささ', '臭さ'),
			_Utils_Tuple2('くさみ', '臭み'),
			_Utils_Tuple2('わきが', 'わきが'),
			_Utils_Tuple2('うまみ', 'うまみ'),
			_Utils_Tuple2('うまさ', 'うまさ'),
			_Utils_Tuple2('ふうみ', '風味'),
			_Utils_Tuple2('こうみ', '好味'),
			_Utils_Tuple2('ちんみ', '珍味'),
			_Utils_Tuple2('あまみ', '甘み'),
			_Utils_Tuple2('にがみ', '苦み'),
			_Utils_Tuple2('しぶさ', '渋さ'),
			_Utils_Tuple2('しぶみ', '渋み'),
			_Utils_Tuple2('えぐみ', 'えぐみ'),
			_Utils_Tuple2('しおけ', '塩気'),
			_Utils_Tuple2('かなけ', '金気'),
			_Utils_Tuple2('さかけ', '酒気'),
			_Utils_Tuple2('ふねん', '不燃'),
			_Utils_Tuple2('よどみ', 'よどみ'),
			_Utils_Tuple2('おだく', '汚濁'),
			_Utils_Tuple2('おせん', '汚染'),
			_Utils_Tuple2('こいめ', '濃いめ'),
			_Utils_Tuple2('ねばり', '粘り'),
			_Utils_Tuple2('ぬめり', 'ぬめり'),
			_Utils_Tuple2('しるけ', '汁気'),
			_Utils_Tuple2('もろさ', 'もろさ'),
			_Utils_Tuple2('にゅう', '乳'),
			_Utils_Tuple2('にじる', '煮汁'),
			_Utils_Tuple2('あとむ', 'アトム'),
			_Utils_Tuple2('でんし', '電子'),
			_Utils_Tuple2('げんそ', '元素'),
			_Utils_Tuple2('けいそ', '珪素'),
			_Utils_Tuple2('すいそ', '水素'),
			_Utils_Tuple2('さんそ', '酸素'),
			_Utils_Tuple2('ちっそ', '窒素'),
			_Utils_Tuple2('よおど', 'ヨード'),
			_Utils_Tuple2('ふっそ', 'フッ素'),
			_Utils_Tuple2('めたる', 'メタル'),
			_Utils_Tuple2('ひてつ', '非鉄'),
			_Utils_Tuple2('さきん', '砂金'),
			_Utils_Tuple2('あえん', '亜鉛'),
			_Utils_Tuple2('あるみ', 'アルミ'),
			_Utils_Tuple2('ちたん', 'チタン'),
			_Utils_Tuple2('うらん', 'ウラン'),
			_Utils_Tuple2('ゆおう', '硫黄'),
			_Utils_Tuple2('らどん', 'ラドン'),
			_Utils_Tuple2('おぞん', 'オゾン'),
			_Utils_Tuple2('めたん', 'メタン'),
			_Utils_Tuple2('ぶたん', 'ブタン'),
			_Utils_Tuple2('ふろん', 'フロン'),
			_Utils_Tuple2('そおだ', 'ソーダ'),
			_Utils_Tuple2('げんゆ', '原油'),
			_Utils_Tuple2('いわね', '岩根'),
			_Utils_Tuple2('いわお', 'いわお'),
			_Utils_Tuple2('こいし', '小石'),
			_Utils_Tuple2('されき', '砂礫'),
			_Utils_Tuple2('じゃり', '砂利'),
			_Utils_Tuple2('まさご', '真砂'),
			_Utils_Tuple2('いさご', 'いさご'),
			_Utils_Tuple2('ねっさ', '熱砂'),
			_Utils_Tuple2('けいさ', '硅砂'),
			_Utils_Tuple2('すなご', '砂子'),
			_Utils_Tuple2('どせき', '土石'),
			_Utils_Tuple2('かせき', '化石'),
			_Utils_Tuple2('るびい', 'ルビー'),
			_Utils_Tuple2('ひすい', '翡翠'),
			_Utils_Tuple2('めのう', 'めのう'),
			_Utils_Tuple2('うんも', '雲母'),
			_Utils_Tuple2('きらら', 'きらら'),
			_Utils_Tuple2('しゃど', '赭土'),
			_Utils_Tuple2('こくど', '黒土'),
			_Utils_Tuple2('おうど', '黄土'),
			_Utils_Tuple2('ろおむ', 'ローム'),
			_Utils_Tuple2('どしゃ', '土砂'),
			_Utils_Tuple2('でいさ', '泥砂'),
			_Utils_Tuple2('れきど', '礫土'),
			_Utils_Tuple2('どかい', '土塊'),
			_Utils_Tuple2('おでい', '汚泥'),
			_Utils_Tuple2('でいど', '泥土'),
			_Utils_Tuple2('へどろ', 'へどろ'),
			_Utils_Tuple2('ゆあか', '湯あか'),
			_Utils_Tuple2('にがり', 'にがり'),
			_Utils_Tuple2('さじん', '砂塵'),
			_Utils_Tuple2('けむり', '煙'),
			_Utils_Tuple2('きばい', '木灰'),
			_Utils_Tuple2('よごれ', '汚れ'),
			_Utils_Tuple2('おぶつ', '汚物'),
			_Utils_Tuple2('おわい', 'おわい'),
			_Utils_Tuple2('ざんさ', '残渣'),
			_Utils_Tuple2('がいき', '外気'),
			_Utils_Tuple2('さんき', '山気'),
			_Utils_Tuple2('ねっき', '熱気'),
			_Utils_Tuple2('だんき', '暖気'),
			_Utils_Tuple2('みずけ', '水気'),
			_Utils_Tuple2('ゆみず', '湯水'),
			_Utils_Tuple2('しらゆ', '白湯'),
			_Utils_Tuple2('にえゆ', '煮え湯'),
			_Utils_Tuple2('ぬるゆ', 'ぬる湯'),
			_Utils_Tuple2('さらゆ', 'さら湯'),
			_Utils_Tuple2('あらゆ', '新湯'),
			_Utils_Tuple2('おかゆ', 'おか湯'),
			_Utils_Tuple2('とめゆ', '留め湯'),
			_Utils_Tuple2('まみず', '真水'),
			_Utils_Tuple2('しみず', '清水'),
			_Utils_Tuple2('しすい', '止水'),
			_Utils_Tuple2('おすい', '汚水'),
			_Utils_Tuple2('こおり', '氷'),
			_Utils_Tuple2('つらら', 'つらら'),
			_Utils_Tuple2('うてき', '雨滴'),
			_Utils_Tuple2('よてき', '余滴'),
			_Utils_Tuple2('ゆだま', '湯玉'),
			_Utils_Tuple2('よつゆ', '夜露'),
			_Utils_Tuple2('ばぶる', 'バブル'),
			_Utils_Tuple2('あぶく', 'あぶく'),
			_Utils_Tuple2('しぶき', 'しぶき'),
			_Utils_Tuple2('ひまつ', '飛沫'),
			_Utils_Tuple2('しめり', '湿り'),
			_Utils_Tuple2('しっけ', '湿気'),
			_Utils_Tuple2('どらい', 'ドライ'),
			_Utils_Tuple2('すぼし', '素干し'),
			_Utils_Tuple2('ちへん', '地変'),
			_Utils_Tuple2('じわれ', '地割れ'),
			_Utils_Tuple2('ふんさ', '噴砂'),
			_Utils_Tuple2('はくま', '白魔'),
			_Utils_Tuple2('ふんか', '噴火'),
			_Utils_Tuple2('つなみ', '津波'),
			_Utils_Tuple2('でみず', '出水'),
			_Utils_Tuple2('いきれ', 'いきれ'),
			_Utils_Tuple2('さむさ', '寒さ'),
			_Utils_Tuple2('よさむ', '夜寒'),
			_Utils_Tuple2('ねっぱ', '熱波'),
			_Utils_Tuple2('ふうう', '風雨'),
			_Utils_Tuple2('むふう', '無風'),
			_Utils_Tuple2('はやて', 'はやて'),
			_Utils_Tuple2('のわき', '野分'),
			_Utils_Tuple2('ぐふう', '颶風'),
			_Utils_Tuple2('おいて', '追いて'),
			_Utils_Tuple2('やませ', '山背'),
			_Utils_Tuple2('よかぜ', '夜風'),
			_Utils_Tuple2('うんう', '雲雨'),
			_Utils_Tuple2('うんか', '雲霞'),
			_Utils_Tuple2('うんむ', '雲霧'),
			_Utils_Tuple2('しうん', '紫雲'),
			_Utils_Tuple2('のうむ', '濃霧'),
			_Utils_Tuple2('さぎり', 'さぎり'),
			_Utils_Tuple2('よぎり', '夜霧'),
			_Utils_Tuple2('さんむ', '山霧'),
			_Utils_Tuple2('えんむ', '煙霧'),
			_Utils_Tuple2('かすみ', 'かすみ'),
			_Utils_Tuple2('こうう', '降雨'),
			_Utils_Tuple2('こぶり', '小降り'),
			_Utils_Tuple2('たいう', '大雨'),
			_Utils_Tuple2('こさめ', '小雨'),
			_Utils_Tuple2('さいう', '細雨'),
			_Utils_Tuple2('えんう', '煙雨'),
			_Utils_Tuple2('らいう', '雷雨'),
			_Utils_Tuple2('けいう', '恵雨'),
			_Utils_Tuple2('さんう', '山雨'),
			_Utils_Tuple2('ごうう', '豪雨'),
			_Utils_Tuple2('もうう', '猛雨'),
			_Utils_Tuple2('そばえ', 'そばえ'),
			_Utils_Tuple2('はくう', '白雨'),
			_Utils_Tuple2('しぐれ', '時雨'),
			_Utils_Tuple2('ひさめ', '氷雨'),
			_Utils_Tuple2('れいう', '冷雨'),
			_Utils_Tuple2('じあめ', '地雨'),
			_Utils_Tuple2('いんう', '陰雨'),
			_Utils_Tuple2('りんう', '霖雨'),
			_Utils_Tuple2('ばいう', '梅雨'),
			_Utils_Tuple2('みぞれ', 'みぞれ'),
			_Utils_Tuple2('たせつ', '多雪'),
			_Utils_Tuple2('こゆき', '小雪'),
			_Utils_Tuple2('ねゆき', '根雪'),
			_Utils_Tuple2('ふぶき', '吹雪'),
			_Utils_Tuple2('せいう', '晴雨'),
			_Utils_Tuple2('ひより', '日和'),
			_Utils_Tuple2('ふうは', '風波'),
			_Utils_Tuple2('はれま', '晴れ間'),
			_Utils_Tuple2('くもま', '雲間'),
			_Utils_Tuple2('ひでり', '日照り'),
			_Utils_Tuple2('うてん', '雨天'),
			_Utils_Tuple2('あまけ', '雨気'),
			_Utils_Tuple2('はろう', '波浪'),
			_Utils_Tuple2('はとう', '波濤'),
			_Utils_Tuple2('うねり', 'うねり'),
			_Utils_Tuple2('こなみ', '小波'),
			_Utils_Tuple2('どとう', '怒濤'),
			_Utils_Tuple2('おなみ', '男波'),
			_Utils_Tuple2('めなみ', '女波'),
			_Utils_Tuple2('うしお', 'うしお'),
			_Utils_Tuple2('みちひ', '満ち干'),
			_Utils_Tuple2('でしお', '出潮'),
			_Utils_Tuple2('しおひ', '潮干'),
			_Utils_Tuple2('こしお', '小潮'),
			_Utils_Tuple2('げどく', '解毒'),
			_Utils_Tuple2('ゆきげ', '雪げ'),
			_Utils_Tuple2('きはつ', '揮発'),
			_Utils_Tuple2('こごり', 'こごり'),
			_Utils_Tuple2('ひのけ', '火の気'),
			_Utils_Tuple2('ひつき', '火付き'),
			_Utils_Tuple2('ひのこ', '火の粉'),
			_Utils_Tuple2('ひばな', '火花'),
			_Utils_Tuple2('ほのお', '炎'),
			_Utils_Tuple2('かえん', '火炎'),
			_Utils_Tuple2('ひのて', '火の手'),
			_Utils_Tuple2('もうか', '猛火'),
			_Utils_Tuple2('あつび', '熱火'),
			_Utils_Tuple2('つよび', '強火'),
			_Utils_Tuple2('とろび', 'とろ火'),
			_Utils_Tuple2('ぬるび', 'ぬる火'),
			_Utils_Tuple2('よわび', '弱火'),
			_Utils_Tuple2('うわび', '上火'),
			_Utils_Tuple2('したび', '下火'),
			_Utils_Tuple2('じかび', '直火'),
			_Utils_Tuple2('とおび', '遠火'),
			_Utils_Tuple2('ちかび', '近火'),
			_Utils_Tuple2('すみび', '炭火'),
			_Utils_Tuple2('くちび', '口火'),
			_Utils_Tuple2('ひだね', '火種'),
			_Utils_Tuple2('たねび', '種火'),
			_Utils_Tuple2('おにび', '鬼火'),
			_Utils_Tuple2('たきび', 'たき火'),
			_Utils_Tuple2('いんか', '引火'),
			_Utils_Tuple2('ひうち', '火打ち'),
			_Utils_Tuple2('らいか', '雷火'),
			_Utils_Tuple2('とびひ', '飛び火'),
			_Utils_Tuple2('ぬるさ', 'ぬるさ'),
			_Utils_Tuple2('ちねつ', '地熱'),
			_Utils_Tuple2('じねつ', '地熱'),
			_Utils_Tuple2('よねつ', '余熱'),
			_Utils_Tuple2('びねつ', '微熱'),
			_Utils_Tuple2('にすぎ', '煮過ぎ'),
			_Utils_Tuple2('よぞら', '夜空'),
			_Utils_Tuple2('はつひ', '初日'),
			_Utils_Tuple2('あさひ', '朝日'),
			_Utils_Tuple2('にしび', '西日'),
			_Utils_Tuple2('いりひ', '入り日'),
			_Utils_Tuple2('ぎんが', '銀河'),
			_Utils_Tuple2('すぴか', 'スピカ'),
			_Utils_Tuple2('でねぶ', 'デネブ'),
			_Utils_Tuple2('ししざ', '獅子座'),
			_Utils_Tuple2('わしざ', 'わし座'),
			_Utils_Tuple2('ことざ', '琴座'),
			_Utils_Tuple2('すばる', 'すばる'),
			_Utils_Tuple2('りくち', '陸地'),
			_Utils_Tuple2('まぐま', 'マグマ'),
			_Utils_Tuple2('ちじく', '地軸'),
			_Utils_Tuple2('じべた', '地べた'),
			_Utils_Tuple2('じはだ', '地肌'),
			_Utils_Tuple2('ちけい', '地形'),
			_Utils_Tuple2('ちもん', '地文'),
			_Utils_Tuple2('ひよく', '肥沃'),
			_Utils_Tuple2('よくど', '沃土'),
			_Utils_Tuple2('よくち', '沃地'),
			_Utils_Tuple2('やせち', 'やせ地'),
			_Utils_Tuple2('ふもう', '不毛'),
			_Utils_Tuple2('のやま', '野山'),
			_Utils_Tuple2('さんや', '山野'),
			_Utils_Tuple2('みやま', 'みやま'),
			_Utils_Tuple2('はやま', '端山'),
			_Utils_Tuple2('とやま', '外山'),
			_Utils_Tuple2('おのえ', '尾の上'),
			_Utils_Tuple2('ふもと', 'ふもと'),
			_Utils_Tuple2('かざん', '火山'),
			_Utils_Tuple2('おかま', 'おかま'),
			_Utils_Tuple2('こやま', '小山'),
			_Utils_Tuple2('たかみ', '高み'),
			_Utils_Tuple2('けんそ', '険阻'),
			_Utils_Tuple2('なんば', '難場'),
			_Utils_Tuple2('だいら', '－平'),
			_Utils_Tuple2('へいや', '平野'),
			_Utils_Tuple2('すその', 'すそ野'),
			_Utils_Tuple2('のはら', '野原'),
			_Utils_Tuple2('ひろの', '広野'),
			_Utils_Tuple2('はなの', '花野'),
			_Utils_Tuple2('くさち', '草地'),
			_Utils_Tuple2('すなち', '砂地'),
			_Utils_Tuple2('げんや', '原野'),
			_Utils_Tuple2('あれの', '荒れ野'),
			_Utils_Tuple2('よくや', '沃野'),
			_Utils_Tuple2('こえち', '肥え地'),
			_Utils_Tuple2('ぼくや', '牧野'),
			_Utils_Tuple2('かれの', '枯れ野'),
			_Utils_Tuple2('やけの', '焼け野'),
			_Utils_Tuple2('ぼんち', '盆地'),
			_Utils_Tuple2('くぼち', 'くぼ地'),
			_Utils_Tuple2('どりね', 'ドリネ'),
			_Utils_Tuple2('たにま', '谷間'),
			_Utils_Tuple2('はざま', 'はざま'),
			_Utils_Tuple2('いわば', '岩場'),
			_Utils_Tuple2('おがわ', '小川'),
			_Utils_Tuple2('けんが', '懸河'),
			_Utils_Tuple2('おだき', '雄滝'),
			_Utils_Tuple2('めだき', '雌滝・女滝'),
			_Utils_Tuple2('はやせ', '早瀬'),
			_Utils_Tuple2('あさせ', '浅瀬'),
			_Utils_Tuple2('ぬまち', '沼地'),
			_Utils_Tuple2('だむこ', 'ダム湖'),
			_Utils_Tuple2('せきこ', '潟湖'),
			_Utils_Tuple2('こじり', '湖じり'),
			_Utils_Tuple2('いずみ', '泉'),
			_Utils_Tuple2('いでゆ', 'いで湯'),
			_Utils_Tuple2('ひとう', '秘湯'),
			_Utils_Tuple2('とらふ', 'トラフ'),
			_Utils_Tuple2('みさき', '岬'),
			_Utils_Tuple2('いりえ', '入り江'),
			_Utils_Tuple2('こがん', '湖岸'),
			_Utils_Tuple2('きしべ', '岸辺'),
			_Utils_Tuple2('なぎさ', 'なぎさ'),
			_Utils_Tuple2('はまべ', '浜辺'),
			_Utils_Tuple2('すはま', '州浜'),
			_Utils_Tuple2('あしべ', 'あしべ'),
			_Utils_Tuple2('びいち', 'ビーチ'),
			_Utils_Tuple2('いそべ', 'いそ辺'),
			_Utils_Tuple2('ありそ', 'ありそ'),
			_Utils_Tuple2('ひがた', '干潟'),
			_Utils_Tuple2('なかす', '中州'),
			_Utils_Tuple2('でるた', 'デルタ'),
			_Utils_Tuple2('ほうど', '邦土'),
			_Utils_Tuple2('けんど', '県土'),
			_Utils_Tuple2('でんや', '田野'),
			_Utils_Tuple2('りんや', '林野'),
			_Utils_Tuple2('びりん', '美林'),
			_Utils_Tuple2('そりん', '疎林'),
			_Utils_Tuple2('しげみ', '茂み'),
			_Utils_Tuple2('なみき', '並木'),
			_Utils_Tuple2('のてん', '野天'),
			_Utils_Tuple2('みずば', '水場'),
			_Utils_Tuple2('ゆでん', '油田'),
			_Utils_Tuple2('めいび', '明媚'),
			_Utils_Tuple2('あしゅ', '亜種'),
			_Utils_Tuple2('きめら', 'キメラ'),
			_Utils_Tuple2('げのむ', 'ゲノム'),
			_Utils_Tuple2('しきそ', '色素'),
			_Utils_Tuple2('きちん', 'キチン'),
			_Utils_Tuple2('むどく', '無毒'),
			_Utils_Tuple2('むきん', '無菌'),
			_Utils_Tuple2('くさき', '草木'),
			_Utils_Tuple2('はなき', '花木'),
			_Utils_Tuple2('たちき', '立ち木'),
			_Utils_Tuple2('あおき', 'あおき'),
			_Utils_Tuple2('なまき', '生木'),
			_Utils_Tuple2('わかき', '若木'),
			_Utils_Tuple2('わかぎ', '若木'),
			_Utils_Tuple2('なえぎ', '苗木'),
			_Utils_Tuple2('こぼく', '古木'),
			_Utils_Tuple2('おいき', '老い木'),
			_Utils_Tuple2('かれき', '枯れ木'),
			_Utils_Tuple2('くちき', '朽ち木'),
			_Utils_Tuple2('かじゅ', '果樹'),
			_Utils_Tuple2('かぼく', '花木'),
			_Utils_Tuple2('にわき', '庭木'),
			_Utils_Tuple2('ちぐさ', '千草'),
			_Utils_Tuple2('はあぶ', 'ハーブ'),
			_Utils_Tuple2('やそう', '野草'),
			_Utils_Tuple2('あおな', '青菜'),
			_Utils_Tuple2('なっぱ', '菜っ葉'),
			_Utils_Tuple2('おおば', '大葉'),
			_Utils_Tuple2('そさい', '蔬菜'),
			_Utils_Tuple2('わかな', '若菜'),
			_Utils_Tuple2('おしば', '押し葉'),
			_Utils_Tuple2('やなぎ', '柳'),
			_Utils_Tuple2('ぽぷら', 'ポプラ'),
			_Utils_Tuple2('くるみ', 'くるみ'),
			_Utils_Tuple2('くぬぎ', 'くぬぎ'),
			_Utils_Tuple2('えるむ', 'エルム'),
			_Utils_Tuple2('えのき', 'えのき'),
			_Utils_Tuple2('けやき', 'けやき'),
			_Utils_Tuple2('こうぞ', 'こうぞ'),
			_Utils_Tuple2('あけび', 'あけび'),
			_Utils_Tuple2('しきみ', 'しきみ'),
			_Utils_Tuple2('しきび', 'しきび'),
			_Utils_Tuple2('すぐり', 'すぐり'),
			_Utils_Tuple2('うつぎ', 'うつぎ'),
			_Utils_Tuple2('とべら', 'とべら'),
			_Utils_Tuple2('すもも', 'すもも'),
			_Utils_Tuple2('さくら', '桜'),
			_Utils_Tuple2('あんず', 'あんず'),
			_Utils_Tuple2('りんご', 'りんご'),
			_Utils_Tuple2('かりん', 'かりん'),
			_Utils_Tuple2('ろおず', 'ローズ'),
			_Utils_Tuple2('いばら', 'いばら'),
			_Utils_Tuple2('のばら', '野ばら'),
			_Utils_Tuple2('したん', '紫檀'),
			_Utils_Tuple2('でいこ', 'でいこ'),
			_Utils_Tuple2('かぼす', 'かぼす'),
			_Utils_Tuple2('れもん', 'レモン'),
			_Utils_Tuple2('らいむ', 'ライム'),
			_Utils_Tuple2('ざぼん', 'ざぼん'),
			_Utils_Tuple2('ぬるで', 'ぬるで'),
			_Utils_Tuple2('まゆみ', 'まゆみ'),
			_Utils_Tuple2('かえで', 'かえで'),
			_Utils_Tuple2('もみじ', 'もみじ'),
			_Utils_Tuple2('やつで', 'やつで'),
			_Utils_Tuple2('なつめ', 'なつめ'),
			_Utils_Tuple2('むくげ', 'むくげ'),
			_Utils_Tuple2('おうま', '黄麻'),
			_Utils_Tuple2('こうま', '黄麻'),
			_Utils_Tuple2('つなそ', 'つなそ'),
			_Utils_Tuple2('かかお', 'カカオ'),
			_Utils_Tuple2('つばき', 'つばき'),
			_Utils_Tuple2('さかき', 'さかき'),
			_Utils_Tuple2('がんぴ', 'がんぴ'),
			_Utils_Tuple2('ざくろ', 'ざくろ'),
			_Utils_Tuple2('みずき', 'みずき'),
			_Utils_Tuple2('らわん', 'ラワン'),
			_Utils_Tuple2('つつじ', 'つつじ'),
			_Utils_Tuple2('あせび', 'あせび'),
			_Utils_Tuple2('あしび', 'あしび'),
			_Utils_Tuple2('いぼた', 'いぼた'),
			_Utils_Tuple2('まだけ', '真竹'),
			_Utils_Tuple2('はちく', 'はちく'),
			_Utils_Tuple2('ねだけ', '根竹'),
			_Utils_Tuple2('やだけ', '矢竹'),
			_Utils_Tuple2('みすず', 'みすず'),
			_Utils_Tuple2('ねざさ', '根ざさ'),
			_Utils_Tuple2('しゅろ', 'しゅろ'),
			_Utils_Tuple2('びろう', 'びろう'),
			_Utils_Tuple2('ぱあむ', 'パーム'),
			_Utils_Tuple2('ぱいん', 'パイン'),
			_Utils_Tuple2('そてつ', 'そてつ'),
			_Utils_Tuple2('こまつ', '小松'),
			_Utils_Tuple2('ひのき', 'ひのき'),
			_Utils_Tuple2('さわら', 'さわら'),
			_Utils_Tuple2('あすひ', 'あすひ'),
			_Utils_Tuple2('いぶき', 'いぶき'),
			_Utils_Tuple2('すいば', 'すいば'),
			_Utils_Tuple2('あかざ', 'あかざ'),
			_Utils_Tuple2('つるな', 'つる菜'),
			_Utils_Tuple2('はこべ', 'はこべ'),
			_Utils_Tuple2('はちす', 'はちす'),
			_Utils_Tuple2('れんげ', 'れんげ'),
			_Utils_Tuple2('ぽぴい', 'ポピー'),
			_Utils_Tuple2('けまん', 'けまん'),
			_Utils_Tuple2('なたね', '菜種'),
			_Utils_Tuple2('なずな', 'なずな'),
			_Utils_Tuple2('だいこ', 'だいこ'),
			_Utils_Tuple2('すずな', 'すずな'),
			_Utils_Tuple2('かぶら', 'かぶら'),
			_Utils_Tuple2('たかな', '高菜'),
			_Utils_Tuple2('だいず', '大豆'),
			_Utils_Tuple2('あずき', '小豆'),
			_Utils_Tuple2('ささげ', 'ささげ'),
			_Utils_Tuple2('げんげ', 'げんげ'),
			_Utils_Tuple2('みもざ', 'ミモザ'),
			_Utils_Tuple2('あおい', 'あおい'),
			_Utils_Tuple2('すみれ', 'すみれ'),
			_Utils_Tuple2('ふさも', 'ふさも'),
			_Utils_Tuple2('みつば', '三つ葉'),
			_Utils_Tuple2('せろり', 'セロリ'),
			_Utils_Tuple2('ぱせり', 'パセリ'),
			_Utils_Tuple2('なすび', 'なすび'),
			_Utils_Tuple2('ほろし', 'ほろし'),
			_Utils_Tuple2('とまと', 'トマト'),
			_Utils_Tuple2('あかね', 'あかね'),
			_Utils_Tuple2('めろん', 'メロン'),
			_Utils_Tuple2('へちま', 'へちま'),
			_Utils_Tuple2('のぎく', '野菊'),
			_Utils_Tuple2('きぎく', '黄菊'),
			_Utils_Tuple2('だりあ', 'ダリア'),
			_Utils_Tuple2('よもぎ', 'よもぎ'),
			_Utils_Tuple2('よめな', '嫁菜'),
			_Utils_Tuple2('あざみ', 'あざみ'),
			_Utils_Tuple2('れたす', 'レタス'),
			_Utils_Tuple2('ごぼう', 'ごぼう'),
			_Utils_Tuple2('みくり', 'みくり'),
			_Utils_Tuple2('くわい', 'くわい'),
			_Utils_Tuple2('おかぼ', 'おかぼ'),
			_Utils_Tuple2('こむぎ', '小麦'),
			_Utils_Tuple2('こおん', 'コーン'),
			_Utils_Tuple2('すすき', 'すすき'),
			_Utils_Tuple2('おばな', '尾花'),
			_Utils_Tuple2('ちがや', 'ちがや'),
			_Utils_Tuple2('つばな', 'つばな'),
			_Utils_Tuple2('まこも', 'まこも'),
			_Utils_Tuple2('かいう', 'かいう'),
			_Utils_Tuple2('いぐさ', 'いぐさ'),
			_Utils_Tuple2('さゆり', 'さゆり'),
			_Utils_Tuple2('わけぎ', 'わけぎ'),
			_Utils_Tuple2('のびる', 'のびる'),
			_Utils_Tuple2('りいき', 'リーキ'),
			_Utils_Tuple2('あろえ', 'アロエ'),
			_Utils_Tuple2('しおで', 'しおで'),
			_Utils_Tuple2('ゆっか', 'ユッカ'),
			_Utils_Tuple2('しゃが', 'しゃが'),
			_Utils_Tuple2('ばなな', 'バナナ'),
			_Utils_Tuple2('しらん', 'しらん'),
			_Utils_Tuple2('えびね', 'えび根'),
			_Utils_Tuple2('ばにら', 'バニラ'),
			_Utils_Tuple2('わらび', 'わらび'),
			_Utils_Tuple2('しのぶ', 'しのぶ'),
			_Utils_Tuple2('とくさ', 'とくさ'),
			_Utils_Tuple2('すぎな', 'すぎな'),
			_Utils_Tuple2('きのこ', 'きのこ'),
			_Utils_Tuple2('しめじ', 'しめじ'),
			_Utils_Tuple2('なめこ', 'なめこ'),
			_Utils_Tuple2('もずく', 'もずく'),
			_Utils_Tuple2('まりも', 'まりも'),
			_Utils_Tuple2('わかめ', 'わかめ'),
			_Utils_Tuple2('あらめ', 'あらめ'),
			_Utils_Tuple2('まつも', 'まつも'),
			_Utils_Tuple2('ひじき', 'ひじき'),
			_Utils_Tuple2('ふたば', 'ふた葉'),
			_Utils_Tuple2('しんめ', '新芽'),
			_Utils_Tuple2('えきが', '腋芽'),
			_Utils_Tuple2('むかご', 'むかご'),
			_Utils_Tuple2('にくが', '肉芽'),
			_Utils_Tuple2('もやし', 'もやし'),
			_Utils_Tuple2('ばくが', '麦芽'),
			_Utils_Tuple2('きのめ', '木の芽'),
			_Utils_Tuple2('さなえ', '早苗'),
			_Utils_Tuple2('ねっこ', '根っ子'),
			_Utils_Tuple2('ひげね', 'ひげ根'),
			_Utils_Tuple2('ゆりね', 'ゆり根'),
			_Utils_Tuple2('もくぶ', '木部'),
			_Utils_Tuple2('こぬれ', 'こぬれ'),
			_Utils_Tuple2('えだは', '枝葉'),
			_Utils_Tuple2('こえだ', '小枝'),
			_Utils_Tuple2('さえだ', '小枝'),
			_Utils_Tuple2('いちだ', '一朶'),
			_Utils_Tuple2('ばんだ', '万朶'),
			_Utils_Tuple2('このは', '木の葉'),
			_Utils_Tuple2('きのは', '木の葉'),
			_Utils_Tuple2('まつば', '松葉'),
			_Utils_Tuple2('くさば', '草葉'),
			_Utils_Tuple2('わかば', '若葉'),
			_Utils_Tuple2('あおば', '青葉'),
			_Utils_Tuple2('おちば', '落ち葉'),
			_Utils_Tuple2('くちば', '朽ち葉'),
			_Utils_Tuple2('かれは', '枯れ葉'),
			_Utils_Tuple2('ちゃば', '茶葉'),
			_Utils_Tuple2('つぼみ', 'つぼみ'),
			_Utils_Tuple2('かかん', '花冠'),
			_Utils_Tuple2('かべん', '花弁'),
			_Utils_Tuple2('おしべ', '雄しべ'),
			_Utils_Tuple2('めしべ', '雌しべ'),
			_Utils_Tuple2('かふん', '花粉'),
			_Utils_Tuple2('めばな', '雌花'),
			_Utils_Tuple2('めんか', '綿花'),
			_Utils_Tuple2('きっか', '菊花'),
			_Utils_Tuple2('きのみ', '木の実'),
			_Utils_Tuple2('なっつ', 'ナッツ'),
			_Utils_Tuple2('いなほ', '稲穂'),
			_Utils_Tuple2('ほなみ', '穂並み'),
			_Utils_Tuple2('おちぼ', '落ち穂'),
			_Utils_Tuple2('かにく', '果肉'),
			_Utils_Tuple2('じゅひ', '樹皮'),
			_Utils_Tuple2('きはだ', '木肌'),
			_Utils_Tuple2('ろじん', 'ロジン'),
			_Utils_Tuple2('ぺっと', 'ペット'),
			_Utils_Tuple2('だかつ', '蛇蝎'),
			_Utils_Tuple2('けもの', '獣'),
			_Utils_Tuple2('かちく', '家畜'),
			_Utils_Tuple2('こあら', 'コアラ'),
			_Utils_Tuple2('もぐら', 'もぐら'),
			_Utils_Tuple2('やえん', '野猿'),
			_Utils_Tuple2('ごりら', 'ゴリラ'),
			_Utils_Tuple2('こいぬ', '小犬・子犬'),
			_Utils_Tuple2('てりあ', 'テリア'),
			_Utils_Tuple2('こりい', 'コリー'),
			_Utils_Tuple2('わけん', '和犬'),
			_Utils_Tuple2('そうく', '走狗'),
			_Utils_Tuple2('やけん', '野犬'),
			_Utils_Tuple2('だけん', '駄犬'),
			_Utils_Tuple2('たぬき', 'たぬき'),
			_Utils_Tuple2('むじな', 'むじな'),
			_Utils_Tuple2('きつね', 'きつね'),
			_Utils_Tuple2('いたち', 'いたち'),
			_Utils_Tuple2('みんく', 'ミンク'),
			_Utils_Tuple2('らっこ', 'らっこ'),
			_Utils_Tuple2('こぐま', '小ぐま・子ぐま'),
			_Utils_Tuple2('ひぐま', 'ひぐま'),
			_Utils_Tuple2('ぱんだ', 'パンダ'),
			_Utils_Tuple2('こねこ', '小猫・子猫'),
			_Utils_Tuple2('うさぎ', 'うさぎ'),
			_Utils_Tuple2('だっと', '脱兎'),
			_Utils_Tuple2('ねずみ', 'ねずみ'),
			_Utils_Tuple2('まうす', 'マウス'),
			_Utils_Tuple2('やまね', 'やまね'),
			_Utils_Tuple2('あしか', 'あしか'),
			_Utils_Tuple2('いるか', 'いるか'),
			_Utils_Tuple2('しゃち', 'しゃち'),
			_Utils_Tuple2('ばひつ', '馬匹'),
			_Utils_Tuple2('ぐんば', '軍馬'),
			_Utils_Tuple2('ばんば', '輓馬'),
			_Utils_Tuple2('えきば', '役馬'),
			_Utils_Tuple2('めいば', '名馬'),
			_Utils_Tuple2('かんば', '駻馬'),
			_Utils_Tuple2('きりん', 'きりん'),
			_Utils_Tuple2('あいば', '愛馬'),
			_Utils_Tuple2('はくば', '白馬'),
			_Utils_Tuple2('ぜぶら', 'ゼブラ'),
			_Utils_Tuple2('いのこ', 'いのこ'),
			_Utils_Tuple2('こぶた', '子豚'),
			_Utils_Tuple2('らくだ', 'らくだ'),
			_Utils_Tuple2('じらふ', 'ジラフ'),
			_Utils_Tuple2('おうし', '雄牛'),
			_Utils_Tuple2('めうし', '雌牛'),
			_Utils_Tuple2('こやぎ', '子やぎ'),
			_Utils_Tuple2('ことり', '小鳥'),
			_Utils_Tuple2('ひよこ', 'ひよこ'),
			_Utils_Tuple2('かわう', '河う'),
			_Utils_Tuple2('うみう', '海う'),
			_Utils_Tuple2('まがん', '真雁'),
			_Utils_Tuple2('のがん', '野雁'),
			_Utils_Tuple2('まがも', '真がも'),
			_Utils_Tuple2('あいさ', 'あいさ'),
			_Utils_Tuple2('あひる', 'あひる'),
			_Utils_Tuple2('さしば', 'さしば'),
			_Utils_Tuple2('のすり', 'のすり'),
			_Utils_Tuple2('とんび', 'とんび'),
			_Utils_Tuple2('みさご', 'みさご'),
			_Utils_Tuple2('うずら', 'うずら'),
			_Utils_Tuple2('ちゃぼ', 'ちゃぼ'),
			_Utils_Tuple2('しゃも', 'しゃも'),
			_Utils_Tuple2('やかく', '野鶴'),
			_Utils_Tuple2('くいな', 'くいな'),
			_Utils_Tuple2('ちどり', '千鳥'),
			_Utils_Tuple2('たしぎ', 'たしぎ'),
			_Utils_Tuple2('かもめ', 'かもめ'),
			_Utils_Tuple2('どばと', '土ばと'),
			_Utils_Tuple2('とけん', '杜鵑'),
			_Utils_Tuple2('おうむ', 'おうむ'),
			_Utils_Tuple2('いんこ', 'いんこ'),
			_Utils_Tuple2('ひばり', 'ひばり'),
			_Utils_Tuple2('つばめ', 'つばめ'),
			_Utils_Tuple2('ひえん', '飛燕'),
			_Utils_Tuple2('つぐみ', 'つぐみ'),
			_Utils_Tuple2('ひたき', 'ひたき'),
			_Utils_Tuple2('めじろ', 'めじろ'),
			_Utils_Tuple2('あとり', 'あとり'),
			_Utils_Tuple2('いすか', 'いすか'),
			_Utils_Tuple2('いかる', 'いかる'),
			_Utils_Tuple2('すずめ', 'すずめ'),
			_Utils_Tuple2('かけす', 'かけす'),
			_Utils_Tuple2('おなが', 'おなが'),
			_Utils_Tuple2('からす', 'からす'),
			_Utils_Tuple2('とかげ', 'とかげ'),
			_Utils_Tuple2('やもり', 'やもり'),
			_Utils_Tuple2('おろち', 'おろち'),
			_Utils_Tuple2('まむし', 'まむし'),
			_Utils_Tuple2('こぶら', 'コブラ'),
			_Utils_Tuple2('いもり', 'いもり'),
			_Utils_Tuple2('かえる', 'かえる'),
			_Utils_Tuple2('かわず', 'かわず'),
			_Utils_Tuple2('かじか', 'かじか'),
			_Utils_Tuple2('ちぎょ', '稚魚'),
			_Utils_Tuple2('まんた', 'まんた'),
			_Utils_Tuple2('いわし', 'いわし'),
			_Utils_Tuple2('うなぎ', 'うなぎ'),
			_Utils_Tuple2('あなご', 'あなご'),
			_Utils_Tuple2('うつぼ', 'うつぼ'),
			_Utils_Tuple2('やまめ', 'やまめ'),
			_Utils_Tuple2('いわな', 'いわな'),
			_Utils_Tuple2('ちあゆ', '稚あゆ'),
			_Utils_Tuple2('まごい', 'まごい'),
			_Utils_Tuple2('ひごい', 'ひごい'),
			_Utils_Tuple2('うぐい', 'うぐい'),
			_Utils_Tuple2('たなご', 'たなご'),
			_Utils_Tuple2('もろこ', 'もろこ'),
			_Utils_Tuple2('なまず', 'なまず'),
			_Utils_Tuple2('さんま', 'さんま'),
			_Utils_Tuple2('さより', 'さより'),
			_Utils_Tuple2('めだか', 'めだか'),
			_Utils_Tuple2('やがら', 'やがら'),
			_Utils_Tuple2('いとよ', 'いとよ'),
			_Utils_Tuple2('とみよ', 'とみよ'),
			_Utils_Tuple2('めなだ', 'めなだ'),
			_Utils_Tuple2('まあじ', 'まあじ'),
			_Utils_Tuple2('はまち', 'はまち'),
			_Utils_Tuple2('しいら', 'しいら'),
			_Utils_Tuple2('いさき', 'いさき'),
			_Utils_Tuple2('ぶだい', 'ぶだい'),
			_Utils_Tuple2('ちだい', 'ちだい'),
			_Utils_Tuple2('かじき', 'かじき'),
			_Utils_Tuple2('まぐろ', 'まぐろ'),
			_Utils_Tuple2('かつお', 'かつお'),
			_Utils_Tuple2('まはぜ', 'まはぜ'),
			_Utils_Tuple2('まごち', 'まごち'),
			_Utils_Tuple2('ほっけ', 'ほっけ'),
			_Utils_Tuple2('かさご', 'かさご'),
			_Utils_Tuple2('めばる', 'めばる'),
			_Utils_Tuple2('ひらめ', 'ひらめ'),
			_Utils_Tuple2('まふぐ', 'まふぐ'),
			_Utils_Tuple2('けむし', '毛虫'),
			_Utils_Tuple2('さなぎ', 'さなぎ'),
			_Utils_Tuple2('とんぼ', 'とんぼ'),
			_Utils_Tuple2('はあり', '羽あり'),
			_Utils_Tuple2('ばった', 'ばった'),
			_Utils_Tuple2('いなご', 'いなご'),
			_Utils_Tuple2('たがめ', 'たがめ'),
			_Utils_Tuple2('あげは', 'あげは'),
			_Utils_Tuple2('たては', 'たては'),
			_Utils_Tuple2('どくが', '毒蛾'),
			_Utils_Tuple2('いとど', 'いとど'),
			_Utils_Tuple2('はむし', '羽虫'),
			_Utils_Tuple2('がむし', '牙虫'),
			_Utils_Tuple2('ほたる', '蛍'),
			_Utils_Tuple2('やぶか', 'やぶか'),
			_Utils_Tuple2('しらみ', 'しらみ'),
			_Utils_Tuple2('むかで', 'むかで'),
			_Utils_Tuple2('じぐも', '地ぐも'),
			_Utils_Tuple2('さそり', 'さそり'),
			_Utils_Tuple2('けがに', '毛がに'),
			_Utils_Tuple2('がざみ', 'がざみ'),
			_Utils_Tuple2('こえび', '小えび'),
			_Utils_Tuple2('みみず', 'みみず'),
			_Utils_Tuple2('あさり', 'あさり'),
			_Utils_Tuple2('しじみ', 'しじみ'),
			_Utils_Tuple2('さざえ', 'さざえ'),
			_Utils_Tuple2('あわび', 'あわび'),
			_Utils_Tuple2('たにし', 'たにし'),
			_Utils_Tuple2('きさご', 'きさご'),
			_Utils_Tuple2('まだこ', 'まだこ'),
			_Utils_Tuple2('なまこ', 'なまこ'),
			_Utils_Tuple2('くらげ', 'くらげ'),
			_Utils_Tuple2('ひどら', 'ヒドラ'),
			_Utils_Tuple2('てんば', '天馬'),
			_Utils_Tuple2('なまみ', '生身'),
			_Utils_Tuple2('いきみ', '生き身'),
			_Utils_Tuple2('からだ', '体'),
			_Utils_Tuple2('たいく', '体躯'),
			_Utils_Tuple2('はだみ', '肌身'),
			_Utils_Tuple2('ほねみ', '骨身'),
			_Utils_Tuple2('ごたい', '五体'),
			_Utils_Tuple2('そうみ', '総身'),
			_Utils_Tuple2('むくろ', 'むくろ'),
			_Utils_Tuple2('みいら', 'ミイラ'),
			_Utils_Tuple2('しろう', '屍蝋'),
			_Utils_Tuple2('ひまん', '肥満'),
			_Utils_Tuple2('ひだい', '肥大'),
			_Utils_Tuple2('ほそみ', '細身'),
			_Utils_Tuple2('きやせ', '着やせ'),
			_Utils_Tuple2('のっぽ', 'のっぽ'),
			_Utils_Tuple2('てなが', '手長'),
			_Utils_Tuple2('ぜんら', '全裸'),
			_Utils_Tuple2('はんら', '半裸'),
			_Utils_Tuple2('らしん', '裸身'),
			_Utils_Tuple2('らたい', '裸体'),
			_Utils_Tuple2('すはだ', '素肌'),
			_Utils_Tuple2('すあし', '素足'),
			_Utils_Tuple2('さんり', '三里'),
			_Utils_Tuple2('こうべ', 'こうべ'),
			_Utils_Tuple2('おつむ', 'おつむ'),
			_Utils_Tuple2('つむり', 'つむり'),
			_Utils_Tuple2('ずがい', '頭蓋'),
			_Utils_Tuple2('つむじ', 'つむじ'),
			_Utils_Tuple2('いくび', 'いくび'),
			_Utils_Tuple2('あぎと', 'あぎと'),
			_Utils_Tuple2('ほっぺ', 'ほっぺ'),
			_Utils_Tuple2('うなじ', 'うなじ'),
			_Utils_Tuple2('めんぶ', '面部'),
			_Utils_Tuple2('おでこ', 'おでこ'),
			_Utils_Tuple2('めはな', '目鼻'),
			_Utils_Tuple2('まなこ', '眼'),
			_Utils_Tuple2('たれめ', '垂れ目'),
			_Utils_Tuple2('つりめ', 'つり目'),
			_Utils_Tuple2('めじり', '目じり'),
			_Utils_Tuple2('まぶち', '目縁'),
			_Utils_Tuple2('めかど', '目角'),
			_Utils_Tuple2('めだま', '目玉'),
			_Utils_Tuple2('くろめ', '黒目'),
			_Utils_Tuple2('しろめ', '白目'),
			_Utils_Tuple2('ぎがん', '義眼'),
			_Utils_Tuple2('ひとみ', 'ひとみ'),
			_Utils_Tuple2('らがん', '裸眼'),
			_Utils_Tuple2('まぶた', 'まぶた'),
			_Utils_Tuple2('こばな', '小鼻'),
			_Utils_Tuple2('こまく', '鼓膜'),
			_Utils_Tuple2('こみみ', '小耳'),
			_Utils_Tuple2('こくび', '小首'),
			_Utils_Tuple2('じがお', '地顔'),
			_Utils_Tuple2('すがお', '素顔'),
			_Utils_Tuple2('びもく', '眉目'),
			_Utils_Tuple2('ねがお', '寝顔'),
			_Utils_Tuple2('せなか', '背中'),
			_Utils_Tuple2('せすじ', '背筋'),
			_Utils_Tuple2('じがた', '地肩'),
			_Utils_Tuple2('ちぶさ', '乳房'),
			_Utils_Tuple2('ちくび', '乳首'),
			_Utils_Tuple2('こわき', '小わき'),
			_Utils_Tuple2('おなか', 'おなか'),
			_Utils_Tuple2('ひばら', '脾腹'),
			_Utils_Tuple2('でべそ', '出べそ'),
			_Utils_Tuple2('こごし', '小腰'),
			_Utils_Tuple2('おいど', 'おいど'),
			_Utils_Tuple2('おっぽ', '尾っぽ'),
			_Utils_Tuple2('いんぶ', '陰部'),
			_Utils_Tuple2('えいん', '会陰'),
			_Utils_Tuple2('ぺにす', 'ペニス'),
			_Utils_Tuple2('おてて', 'お手手'),
			_Utils_Tuple2('もろて', 'もろ手'),
			_Utils_Tuple2('おおで', '大手'),
			_Utils_Tuple2('ましゅ', '魔手'),
			_Utils_Tuple2('かいな', 'かいな'),
			_Utils_Tuple2('さわん', '左腕'),
			_Utils_Tuple2('てくび', '手首'),
			_Utils_Tuple2('げんこ', 'げんこ'),
			_Utils_Tuple2('あんよ', 'あんよ'),
			_Utils_Tuple2('ぎそく', '義足'),
			_Utils_Tuple2('どそく', '土足'),
			_Utils_Tuple2('こかん', '股間'),
			_Utils_Tuple2('きびす', 'きびす'),
			_Utils_Tuple2('くびす', 'くびす'),
			_Utils_Tuple2('こひざ', '小ひざ'),
			_Utils_Tuple2('こゆび', '小指'),
			_Utils_Tuple2('おひれ', '尾ひれ'),
			_Utils_Tuple2('ぞうふ', '臓腑'),
			_Utils_Tuple2('ごぞう', '五臓'),
			_Utils_Tuple2('ろっぷ', '六腑'),
			_Utils_Tuple2('いのふ', '胃の腑'),
			_Utils_Tuple2('いへき', '胃壁'),
			_Utils_Tuple2('わぎな', 'ワギナ'),
			_Utils_Tuple2('ちぎも', '血肝'),
			_Utils_Tuple2('はだえ', '肌'),
			_Utils_Tuple2('ほくろ', 'ほくろ'),
			_Utils_Tuple2('こじわ', '小じわ'),
			_Utils_Tuple2('こうら', '甲羅'),
			_Utils_Tuple2('うろこ', 'うろこ'),
			_Utils_Tuple2('こけら', 'こけら'),
			_Utils_Tuple2('おぐし', 'おぐし'),
			_Utils_Tuple2('しらが', '白髪'),
			_Utils_Tuple2('きれげ', '切れ毛'),
			_Utils_Tuple2('えだげ', '枝毛'),
			_Utils_Tuple2('たもう', '多毛'),
			_Utils_Tuple2('むもう', '無毛'),
			_Utils_Tuple2('かもじ', 'かもじ'),
			_Utils_Tuple2('たぶさ', 'たぶさ'),
			_Utils_Tuple2('こびん', '小鬢'),
			_Utils_Tuple2('しまだ', '島田'),
			_Utils_Tuple2('おさげ', 'お下げ'),
			_Utils_Tuple2('あふろ', 'アフロ'),
			_Utils_Tuple2('まゆげ', 'まゆ毛'),
			_Utils_Tuple2('まつげ', 'まつげ'),
			_Utils_Tuple2('びぜん', '美髯'),
			_Utils_Tuple2('みのけ', '身の毛'),
			_Utils_Tuple2('むだげ', '無駄毛'),
			_Utils_Tuple2('けすじ', '毛筋'),
			_Utils_Tuple2('けあな', '毛穴'),
			_Utils_Tuple2('うぶげ', '産毛'),
			_Utils_Tuple2('まきげ', '巻き毛'),
			_Utils_Tuple2('くせげ', '癖毛'),
			_Utils_Tuple2('あかげ', '赤毛'),
			_Utils_Tuple2('はなげ', '鼻毛'),
			_Utils_Tuple2('むなげ', '胸毛'),
			_Utils_Tuple2('わきげ', 'わき毛'),
			_Utils_Tuple2('ちもう', '恥毛'),
			_Utils_Tuple2('くりげ', 'くり毛'),
			_Utils_Tuple2('つきげ', '月毛'),
			_Utils_Tuple2('あおげ', '青毛'),
			_Utils_Tuple2('とらげ', 'とら毛'),
			_Utils_Tuple2('にこげ', 'にこ毛'),
			_Utils_Tuple2('うもう', '羽毛'),
			_Utils_Tuple2('わたげ', '綿毛'),
			_Utils_Tuple2('しらは', '白羽'),
			_Utils_Tuple2('やばね', '矢羽'),
			_Utils_Tuple2('こぼね', '小骨'),
			_Utils_Tuple2('いこつ', '遺骨'),
			_Utils_Tuple2('しゃり', '舎利'),
			_Utils_Tuple2('どくろ', 'どくろ'),
			_Utils_Tuple2('あばら', 'あばら'),
			_Utils_Tuple2('せぼね', '背骨'),
			_Utils_Tuple2('びこつ', '尾骨'),
			_Utils_Tuple2('ざこつ', '座骨'),
			_Utils_Tuple2('さこつ', '鎖骨'),
			_Utils_Tuple2('まえば', '前歯'),
			_Utils_Tuple2('おくば', '奥歯'),
			_Utils_Tuple2('もんし', '門歯'),
			_Utils_Tuple2('ちえば', '知恵歯'),
			_Utils_Tuple2('やえば', '八重歯'),
			_Utils_Tuple2('おにば', '鬼歯'),
			_Utils_Tuple2('はぬけ', '歯抜け'),
			_Utils_Tuple2('きんば', '金歯'),
			_Utils_Tuple2('いれば', '入れ歯'),
			_Utils_Tuple2('つぎば', '継ぎ歯'),
			_Utils_Tuple2('ぞうげ', '象牙'),
			_Utils_Tuple2('そうが', '爪牙'),
			_Utils_Tuple2('はぐき', '歯茎'),
			_Utils_Tuple2('はにく', '歯肉'),
			_Utils_Tuple2('しずい', '歯髄'),
			_Utils_Tuple2('こづめ', '小づめ'),
			_Utils_Tuple2('ひづめ', 'ひづめ'),
			_Utils_Tuple2('ばてい', '馬蹄'),
			_Utils_Tuple2('けづめ', 'けづめ'),
			_Utils_Tuple2('とさか', 'とさか'),
			_Utils_Tuple2('ちしお', '血潮'),
			_Utils_Tuple2('はなぢ', '鼻血'),
			_Utils_Tuple2('なまち', '生血'),
			_Utils_Tuple2('いきち', '生き血'),
			_Utils_Tuple2('あくち', '悪血'),
			_Utils_Tuple2('くろち', '黒血'),
			_Utils_Tuple2('どくち', '毒血'),
			_Utils_Tuple2('ふるち', '古血'),
			_Utils_Tuple2('いえき', '胃液'),
			_Utils_Tuple2('むしず', 'むしず'),
			_Utils_Tuple2('なみだ', '涙'),
			_Utils_Tuple2('だえき', '唾液'),
			_Utils_Tuple2('かたず', '固唾'),
			_Utils_Tuple2('よだれ', 'よだれ'),
			_Utils_Tuple2('ねあせ', '寝汗'),
			_Utils_Tuple2('うんち', 'うんち'),
			_Utils_Tuple2('うんこ', 'うんこ'),
			_Utils_Tuple2('ばふん', '馬糞'),
			_Utils_Tuple2('まぐそ', '馬糞'),
			_Utils_Tuple2('こしけ', 'こしけ'),
			_Utils_Tuple2('おなら', 'おなら'),
			_Utils_Tuple2('としゃ', '吐瀉'),
			_Utils_Tuple2('ちへど', '血へど'),
			_Utils_Tuple2('てあか', '手あか'),
			_Utils_Tuple2('めやに', '目やに'),
			_Utils_Tuple2('めくそ', '目くそ'),
			_Utils_Tuple2('はくそ', '歯くそ'),
			_Utils_Tuple2('ちうみ', '血うみ'),
			_Utils_Tuple2('どくそ', '毒素'),
			_Utils_Tuple2('たまご', '卵'),
			_Utils_Tuple2('しらこ', '白子'),
			_Utils_Tuple2('らんし', '卵子'),
			_Utils_Tuple2('いのち', '命'),
			_Utils_Tuple2('ろめい', '露命'),
			_Utils_Tuple2('よめい', '余命'),
			_Utils_Tuple2('しかつ', '死活'),
			_Utils_Tuple2('おさん', 'お産'),
			_Utils_Tuple2('たさん', '多産'),
			_Utils_Tuple2('しざん', '死産'),
			_Utils_Tuple2('ひだち', '肥立ち'),
			_Utils_Tuple2('だっぴ', '脱皮'),
			_Utils_Tuple2('もぬけ', 'もぬけ'),
			_Utils_Tuple2('やつれ', 'やつれ'),
			_Utils_Tuple2('はつが', '発芽'),
			_Utils_Tuple2('なかて', 'なかて'),
			_Utils_Tuple2('おくて', 'おくて'),
			_Utils_Tuple2('はんも', '繁茂'),
			_Utils_Tuple2('しきょ', '死去'),
			_Utils_Tuple2('ばんし', '万死'),
			_Utils_Tuple2('しぼつ', '死没'),
			_Utils_Tuple2('たかい', '他界'),
			_Utils_Tuple2('ぶっこ', '物故'),
			_Utils_Tuple2('せんげ', '遷化'),
			_Utils_Tuple2('そくし', '即死'),
			_Utils_Tuple2('とんし', '頓死'),
			_Utils_Tuple2('かくし', '客死'),
			_Utils_Tuple2('じこし', '事故死'),
			_Utils_Tuple2('へんし', '変死'),
			_Utils_Tuple2('ばくし', '爆死'),
			_Utils_Tuple2('すいし', '水死'),
			_Utils_Tuple2('できし', '溺死'),
			_Utils_Tuple2('どくし', '毒死'),
			_Utils_Tuple2('ごくし', '獄死'),
			_Utils_Tuple2('ふんし', '憤死'),
			_Utils_Tuple2('じさつ', '自殺'),
			_Utils_Tuple2('じけつ', '自決'),
			_Utils_Tuple2('じがい', '自害'),
			_Utils_Tuple2('じふん', '自刎'),
			_Utils_Tuple2('みなげ', '身投げ'),
			_Utils_Tuple2('ころし', '殺し'),
			_Utils_Tuple2('たさつ', '他殺'),
			_Utils_Tuple2('ほさつ', '捕殺'),
			_Utils_Tuple2('のうは', '脳波'),
			_Utils_Tuple2('ふじみ', '不死身'),
			_Utils_Tuple2('あうん', 'あうん'),
			_Utils_Tuple2('ねいき', '寝息'),
			_Utils_Tuple2('あえぎ', 'あえぎ'),
			_Utils_Tuple2('いびき', 'いびき'),
			_Utils_Tuple2('くさめ', 'くさめ'),
			_Utils_Tuple2('こなれ', 'こなれ'),
			_Utils_Tuple2('つかえ', 'つかえ'),
			_Utils_Tuple2('もたれ', 'もたれ'),
			_Utils_Tuple2('おくび', 'おくび'),
			_Utils_Tuple2('のぐそ', '野ぐそ'),
			_Utils_Tuple2('ほうひ', '放屁'),
			_Utils_Tuple2('ぶんぴ', '分泌'),
			_Utils_Tuple2('ぱるす', 'パルス'),
			_Utils_Tuple2('たけつ', '多血'),
			_Utils_Tuple2('めんす', 'メンス'),
			_Utils_Tuple2('はすい', '破水'),
			_Utils_Tuple2('みおも', '身重'),
			_Utils_Tuple2('つわり', 'つわり'),
			_Utils_Tuple2('いでん', '遺伝'),
			_Utils_Tuple2('てきず', '手傷'),
			_Utils_Tuple2('ておい', '手負い'),
			_Utils_Tuple2('ふかで', '深手'),
			_Utils_Tuple2('あさで', '浅手'),
			_Utils_Tuple2('やけど', 'やけど'),
			_Utils_Tuple2('うちみ', '打ち身'),
			_Utils_Tuple2('ねんざ', '捻挫'),
			_Utils_Tuple2('くじき', 'くじき'),
			_Utils_Tuple2('ちまめ', '血豆'),
			_Utils_Tuple2('あばた', 'あばた'),
			_Utils_Tuple2('もうあ', '盲唖'),
			_Utils_Tuple2('えんし', '遠視'),
			_Utils_Tuple2('へるす', 'ヘルス'),
			_Utils_Tuple2('やまい', '病'),
			_Utils_Tuple2('ごのう', '御悩'),
			_Utils_Tuple2('ふれい', '不例'),
			_Utils_Tuple2('ほっさ', '発作'),
			_Utils_Tuple2('さむけ', '寒気'),
			_Utils_Tuple2('おかん', '悪寒'),
			_Utils_Tuple2('ゆざめ', '湯冷め'),
			_Utils_Tuple2('ねびえ', '寝冷え'),
			_Utils_Tuple2('ぜんゆ', '全癒'),
			_Utils_Tuple2('へいゆ', '平癒'),
			_Utils_Tuple2('かいゆ', '快癒'),
			_Utils_Tuple2('きうつ', '気鬱'),
			_Utils_Tuple2('ぽりお', 'ポリオ'),
			_Utils_Tuple2('とけつ', '吐血'),
			_Utils_Tuple2('げけつ', '下血'),
			_Utils_Tuple2('とりめ', '鳥目'),
			_Utils_Tuple2('ほしめ', '星目'),
			_Utils_Tuple2('あかめ', '赤目'),
			_Utils_Tuple2('そこひ', 'そこひ'),
			_Utils_Tuple2('つきめ', '突き目'),
			_Utils_Tuple2('じろう', '耳漏'),
			_Utils_Tuple2('びえん', '鼻炎'),
			_Utils_Tuple2('むしば', '虫歯'),
			_Utils_Tuple2('ぬけげ', '抜け毛'),
			_Utils_Tuple2('かざけ', '風邪気'),
			_Utils_Tuple2('かぜけ', '風邪気'),
			_Utils_Tuple2('はしか', 'はしか'),
			_Utils_Tuple2('かたる', 'カタル'),
			_Utils_Tuple2('いんい', '陰萎'),
			_Utils_Tuple2('あなじ', '穴痔'),
			_Utils_Tuple2('いぼじ', 'いぼ痔'),
			_Utils_Tuple2('さけじ', '裂け痔'),
			_Utils_Tuple2('べんぴ', '便秘'),
			_Utils_Tuple2('えきり', '疫痢'),
			_Utils_Tuple2('せきり', '赤痢'),
			_Utils_Tuple2('ちふす', 'チフス'),
			_Utils_Tuple2('ひぜん', '皮癬'),
			_Utils_Tuple2('たむし', '田虫'),
			_Utils_Tuple2('あせも', 'あせも'),
			_Utils_Tuple2('えいず', 'エイズ'),
			_Utils_Tuple2('いがん', '胃癌'),
			_Utils_Tuple2('ただれ', 'ただれ'),
			_Utils_Tuple2('びらん', '糜爛'),
			_Utils_Tuple2('おでき', 'おでき'),
			_Utils_Tuple2('にきび', 'にきび'),
			_Utils_Tuple2('だっそ', '脱疽'),
			_Utils_Tuple2('ふしゅ', '浮腫'),
			_Utils_Tuple2('むくみ', 'むくみ'),
			_Utils_Tuple2('じばれ', '地ばれ'),
			_Utils_Tuple2('ねばれ', '寝ばれ'),
			_Utils_Tuple2('かっけ', '脚気'),
			_Utils_Tuple2('うずき', 'うずき'),
			_Utils_Tuple2('ずつう', '頭痛'),
			_Utils_Tuple2('しびれ', 'しびれ'),
			_Utils_Tuple2('むしけ', '虫気'),
			_Utils_Tuple2('ぺすと', 'ペスト'),
			_Utils_Tuple2('かかる', '係る'),
			_Utils_Tuple2('かねる', '兼ねる'),
			_Utils_Tuple2('られる', '－られる'),
			_Utils_Tuple2('させる', '－させる'),
			_Utils_Tuple2('しめる', '－しめる'),
			_Utils_Tuple2('かける', '－掛ける'),
			_Utils_Tuple2('ちなむ', 'ちなむ'),
			_Utils_Tuple2('つれる', '連れる'),
			_Utils_Tuple2('おこる', 'おこる'),
			_Utils_Tuple2('きする', '帰する'),
			_Utils_Tuple2('ている', '…ている'),
			_Utils_Tuple2('きかす', '利かす'),
			_Utils_Tuple2('すます', '済ます'),
			_Utils_Tuple2('いかす', '生かす'),
			_Utils_Tuple2('いきる', '生きる'),
			_Utils_Tuple2('ひびく', '響く'),
			_Utils_Tuple2('あたる', '当たる'),
			_Utils_Tuple2('そむく', '背く'),
			_Utils_Tuple2('もとる', 'もとる'),
			_Utils_Tuple2('ずれる', 'ずれる'),
			_Utils_Tuple2('にせる', '似せる'),
			_Utils_Tuple2('につく', '似つく'),
			_Utils_Tuple2('まがう', 'まがう'),
			_Utils_Tuple2('まごう', 'まごう'),
			_Utils_Tuple2('そぐう', 'そぐう'),
			_Utils_Tuple2('ちがう', '違う'),
			_Utils_Tuple2('たがう', 'たがう'),
			_Utils_Tuple2('かわる', 'かわる'),
			_Utils_Tuple2('いれる', '入れる'),
			_Utils_Tuple2('はらむ', 'はらむ'),
			_Utils_Tuple2('やどす', '宿す'),
			_Utils_Tuple2('あてる', '充てる'),
			_Utils_Tuple2('である', '…である'),
			_Utils_Tuple2('てある', '…てある'),
			_Utils_Tuple2('ござる', 'ござる'),
			_Utils_Tuple2('ひそむ', '潜む'),
			_Utils_Tuple2('こもる', 'こもる'),
			_Utils_Tuple2('やどる', '宿る'),
			_Utils_Tuple2('ねざす', '根差す'),
			_Utils_Tuple2('ねづく', '根付く'),
			_Utils_Tuple2('ておる', '…ておる'),
			_Utils_Tuple2('います', 'います'),
			_Utils_Tuple2('おわす', 'おわす'),
			_Utils_Tuple2('はべる', 'はべる'),
			_Utils_Tuple2('あける', 'あける'),
			_Utils_Tuple2('うかぶ', '浮かぶ'),
			_Utils_Tuple2('できる', '出切る'),
			_Utils_Tuple2('のぞく', 'のぞく'),
			_Utils_Tuple2('あかす', '明かす'),
			_Utils_Tuple2('しめす', '示す'),
			_Utils_Tuple2('さらす', 'さらす'),
			_Utils_Tuple2('あばく', '暴く'),
			_Utils_Tuple2('かくす', '隠す'),
			_Utils_Tuple2('ひめる', '秘める'),
			_Utils_Tuple2('ひする', '秘する'),
			_Utils_Tuple2('ふせる', '伏せる'),
			_Utils_Tuple2('ころす', '殺す'),
			_Utils_Tuple2('きざす', '兆す'),
			_Utils_Tuple2('つける', '付ける'),
			_Utils_Tuple2('たてる', '立てる'),
			_Utils_Tuple2('いだす', 'いだす'),
			_Utils_Tuple2('おきる', '起きる'),
			_Utils_Tuple2('おこす', 'おこす'),
			_Utils_Tuple2('もどる', '戻る'),
			_Utils_Tuple2('みのる', '実る'),
			_Utils_Tuple2('かなう', 'かなう'),
			_Utils_Tuple2('しくむ', '仕組む'),
			_Utils_Tuple2('つくる', 'つくる'),
			_Utils_Tuple2('むすぶ', '結ぶ'),
			_Utils_Tuple2('でかす', 'でかす'),
			_Utils_Tuple2('きずく', '築く'),
			_Utils_Tuple2('たもつ', '保つ'),
			_Utils_Tuple2('ておく', '…ておく'),
			_Utils_Tuple2('ねかす', '寝かす'),
			_Utils_Tuple2('のこる', '残る'),
			_Utils_Tuple2('のこす', '残す'),
			_Utils_Tuple2('なくす', 'なくす'),
			_Utils_Tuple2('うせる', 'うせる'),
			_Utils_Tuple2('おとす', '落とす'),
			_Utils_Tuple2('つぶす', 'つぶす'),
			_Utils_Tuple2('きえる', '消える'),
			_Utils_Tuple2('つきる', '尽きる'),
			_Utils_Tuple2('つかす', '尽かす'),
			_Utils_Tuple2('つくす', '－尽くす'),
			_Utils_Tuple2('はたす', '－果たす'),
			_Utils_Tuple2('はてる', '－果てる'),
			_Utils_Tuple2('きらす', '切らす'),
			_Utils_Tuple2('はたく', 'はたく'),
			_Utils_Tuple2('たえる', '絶える'),
			_Utils_Tuple2('たやす', '絶やす'),
			_Utils_Tuple2('ほろぶ', '滅ぶ'),
			_Utils_Tuple2('たおす', '倒す'),
			_Utils_Tuple2('おちる', '落ちる'),
			_Utils_Tuple2('のける', 'のける'),
			_Utils_Tuple2('はねる', 'はねる'),
			_Utils_Tuple2('はずす', '外す'),
			_Utils_Tuple2('すてる', '捨てる'),
			_Utils_Tuple2('けずる', '削る'),
			_Utils_Tuple2('ぬける', '抜ける'),
			_Utils_Tuple2('ぬかす', '抜かす'),
			_Utils_Tuple2('とばす', '飛ばす'),
			_Utils_Tuple2('まびく', '間引く'),
			_Utils_Tuple2('はらう', '払う'),
			_Utils_Tuple2('はぶく', '省く'),
			_Utils_Tuple2('さびる', 'さびる'),
			_Utils_Tuple2('じみる', '－染みる'),
			_Utils_Tuple2('おびる', '帯びる'),
			_Utils_Tuple2('めかす', '－めかす'),
			_Utils_Tuple2('がかる', '－がかる'),
			_Utils_Tuple2('にあう', '似合う'),
			_Utils_Tuple2('なじむ', 'なじむ'),
			_Utils_Tuple2('みだす', '乱す'),
			_Utils_Tuple2('やぶる', '破る'),
			_Utils_Tuple2('くずす', '崩す'),
			_Utils_Tuple2('ちらす', '散らす'),
			_Utils_Tuple2('ゆるむ', '緩む'),
			_Utils_Tuple2('たるむ', 'たるむ'),
			_Utils_Tuple2('しまる', 'しまる'),
			_Utils_Tuple2('きばる', '気張る'),
			_Utils_Tuple2('つめる', '詰める'),
			_Utils_Tuple2('つまる', '詰まる'),
			_Utils_Tuple2('わする', '和する'),
			_Utils_Tuple2('さわる', '障る'),
			_Utils_Tuple2('よごす', '汚す'),
			_Utils_Tuple2('けがす', '汚す'),
			_Utils_Tuple2('こわす', '壊す'),
			_Utils_Tuple2('すたる', '廃る'),
			_Utils_Tuple2('あれる', '荒れる'),
			_Utils_Tuple2('あらす', '荒らす'),
			_Utils_Tuple2('すさぶ', 'すさぶ'),
			_Utils_Tuple2('すさむ', 'すさむ'),
			_Utils_Tuple2('ゆける', '行ける'),
			_Utils_Tuple2('あおる', 'あおる'),
			_Utils_Tuple2('うごく', '動く'),
			_Utils_Tuple2('ていく', '…ていく'),
			_Utils_Tuple2('てくる', '…てくる'),
			_Utils_Tuple2('ばける', '化ける'),
			_Utils_Tuple2('かする', '－化する'),
			_Utils_Tuple2('ただす', '正す'),
			_Utils_Tuple2('なおる', '直る'),
			_Utils_Tuple2('なおす', '直す'),
			_Utils_Tuple2('かわす', '交わす'),
			_Utils_Tuple2('ずらす', 'ずらす'),
			_Utils_Tuple2('そめる', '－初める'),
			_Utils_Tuple2('おろす', 'おろす'),
			_Utils_Tuple2('ひらく', '開く'),
			_Utils_Tuple2('おわる', '終わる'),
			_Utils_Tuple2('おえる', '終える'),
			_Utils_Tuple2('しまう', 'しまう'),
			_Utils_Tuple2('とじる', '閉じる'),
			_Utils_Tuple2('ひける', '引ける'),
			_Utils_Tuple2('あがる', '上がる'),
			_Utils_Tuple2('あげる', '上げる'),
			_Utils_Tuple2('やめる', 'やめる'),
			_Utils_Tuple2('しさす', 'しさす'),
			_Utils_Tuple2('やすむ', '休む'),
			_Utils_Tuple2('とまる', '止まる'),
			_Utils_Tuple2('つづく', '続く'),
			_Utils_Tuple2('とおす', '－通す'),
			_Utils_Tuple2('うける', '受ける'),
			_Utils_Tuple2('おどる', '躍る'),
			_Utils_Tuple2('ふるう', '震う'),
			_Utils_Tuple2('そよぐ', 'そよぐ'),
			_Utils_Tuple2('はずむ', '弾む'),
			_Utils_Tuple2('はじく', 'はじく'),
			_Utils_Tuple2('ゆれる', '揺れる'),
			_Utils_Tuple2('ゆらす', '揺らす'),
			_Utils_Tuple2('ゆらぐ', '揺らぐ'),
			_Utils_Tuple2('ゆるぐ', '揺るぐ'),
			_Utils_Tuple2('ゆする', '揺する'),
			_Utils_Tuple2('ぶれる', 'ぶれる'),
			_Utils_Tuple2('ふれる', '振れる'),
			_Utils_Tuple2('まわる', '回る'),
			_Utils_Tuple2('まわす', '回す'),
			_Utils_Tuple2('もやう', 'もやう'),
			_Utils_Tuple2('かしぐ', 'かしぐ'),
			_Utils_Tuple2('まろぶ', 'まろぶ'),
			_Utils_Tuple2('こける', 'こける'),
			_Utils_Tuple2('こかす', 'こかす'),
			_Utils_Tuple2('かえす', '返す'),
			_Utils_Tuple2('すえる', '据える'),
			_Utils_Tuple2('すわる', '据わる'),
			_Utils_Tuple2('つるす', 'つるす'),
			_Utils_Tuple2('さげる', '提げる'),
			_Utils_Tuple2('たれる', '垂れる'),
			_Utils_Tuple2('たらす', '垂らす'),
			_Utils_Tuple2('わたす', '渡す'),
			_Utils_Tuple2('なびく', 'なびく'),
			_Utils_Tuple2('すすむ', '進む'),
			_Utils_Tuple2('うねる', 'うねる'),
			_Utils_Tuple2('まがる', '曲がる'),
			_Utils_Tuple2('おれる', '折れる'),
			_Utils_Tuple2('それる', 'それる'),
			_Utils_Tuple2('そらす', 'そらす'),
			_Utils_Tuple2('まよう', '迷う'),
			_Utils_Tuple2('つたう', '伝う'),
			_Utils_Tuple2('たどる', 'たどる'),
			_Utils_Tuple2('よぎる', 'よぎる'),
			_Utils_Tuple2('うつる', '移る'),
			_Utils_Tuple2('うつす', '移す'),
			_Utils_Tuple2('どける', 'どける'),
			_Utils_Tuple2('どかす', 'どかす'),
			_Utils_Tuple2('よこす', 'よこす'),
			_Utils_Tuple2('わたる', '渡る'),
			_Utils_Tuple2('こえる', '越える'),
			_Utils_Tuple2('すだつ', '巣立つ'),
			_Utils_Tuple2('いたる', '至る'),
			_Utils_Tuple2('とどく', '届く'),
			_Utils_Tuple2('およぶ', '及ぶ'),
			_Utils_Tuple2('のぼる', '上る'),
			_Utils_Tuple2('くだる', '下る'),
			_Utils_Tuple2('あるく', '歩く'),
			_Utils_Tuple2('あゆむ', '歩む'),
			_Utils_Tuple2('はしる', '走る'),
			_Utils_Tuple2('はせる', 'はせる'),
			_Utils_Tuple2('ながす', '流す'),
			_Utils_Tuple2('すべる', '滑る'),
			_Utils_Tuple2('めぐる', '巡る'),
			_Utils_Tuple2('すぎる', '過ぎる'),
			_Utils_Tuple2('とおる', '通る'),
			_Utils_Tuple2('すける', '透ける'),
			_Utils_Tuple2('はやる', 'はやる'),
			_Utils_Tuple2('さそう', '誘う'),
			_Utils_Tuple2('さらう', 'さらう'),
			_Utils_Tuple2('そえる', '添える'),
			_Utils_Tuple2('にげる', '逃げる'),
			_Utils_Tuple2('にがす', '逃がす'),
			_Utils_Tuple2('のがす', '逃す'),
			_Utils_Tuple2('はこぶ', '運ぶ'),
			_Utils_Tuple2('はける', 'はける'),
			_Utils_Tuple2('よどむ', 'よどむ'),
			_Utils_Tuple2('もどす', '戻す'),
			_Utils_Tuple2('しさる', 'しさる'),
			_Utils_Tuple2('すさる', 'すさる'),
			_Utils_Tuple2('さがる', '下がる'),
			_Utils_Tuple2('まかる', 'まかる'),
			_Utils_Tuple2('きたる', '来る'),
			_Utils_Tuple2('きたす', '来す'),
			_Utils_Tuple2('でむく', '出向く'),
			_Utils_Tuple2('みまう', '見舞う'),
			_Utils_Tuple2('でばる', '出張る'),
			_Utils_Tuple2('けだす', 'け出す'),
			_Utils_Tuple2('もぐる', '潜る'),
			_Utils_Tuple2('くぐる', 'くぐる'),
			_Utils_Tuple2('ひたる', '浸る'),
			_Utils_Tuple2('ひたす', '浸す'),
			_Utils_Tuple2('つかる', 'つかる'),
			_Utils_Tuple2('けこむ', 'け込む'),
			_Utils_Tuple2('いこむ', '鋳込む'),
			_Utils_Tuple2('こめる', '込める'),
			_Utils_Tuple2('はめる', 'はめる'),
			_Utils_Tuple2('はまる', 'はまる'),
			_Utils_Tuple2('はさむ', '挟む'),
			_Utils_Tuple2('ささる', '刺さる'),
			_Utils_Tuple2('もれる', '漏れる'),
			_Utils_Tuple2('もらす', '漏らす'),
			_Utils_Tuple2('しみる', '染みる'),
			_Utils_Tuple2('にじむ', 'にじむ'),
			_Utils_Tuple2('そそぐ', '注ぐ'),
			_Utils_Tuple2('すくう', 'すくう'),
			_Utils_Tuple2('つつむ', '包む'),
			_Utils_Tuple2('くるむ', 'くるむ'),
			_Utils_Tuple2('おおう', '覆う'),
			_Utils_Tuple2('かぶる', 'かぶる'),
			_Utils_Tuple2('かぶす', 'かぶす'),
			_Utils_Tuple2('かばう', 'かばう'),
			_Utils_Tuple2('かこむ', '囲む'),
			_Utils_Tuple2('いだく', '抱く'),
			_Utils_Tuple2('まぶす', 'まぶす'),
			_Utils_Tuple2('あびる', '浴びる'),
			_Utils_Tuple2('のぼす', '上す'),
			_Utils_Tuple2('おりる', 'おりる'),
			_Utils_Tuple2('くだす', '下す'),
			_Utils_Tuple2('だする', '堕する'),
			_Utils_Tuple2('こぼす', 'こぼす'),
			_Utils_Tuple2('ふらす', '降らす'),
			_Utils_Tuple2('のせる', '乗せる'),
			_Utils_Tuple2('つもる', '積もる'),
			_Utils_Tuple2('うかす', '浮かす'),
			_Utils_Tuple2('しずむ', '沈む'),
			_Utils_Tuple2('うめる', '埋める'),
			_Utils_Tuple2('うまる', '埋まる'),
			_Utils_Tuple2('いける', 'いける'),
			_Utils_Tuple2('あわす', '合わす'),
			_Utils_Tuple2('まじる', 'まじる'),
			_Utils_Tuple2('まざる', 'まざる'),
			_Utils_Tuple2('まぜる', 'まぜる'),
			_Utils_Tuple2('であう', '出会う'),
			_Utils_Tuple2('つどう', '集う'),
			_Utils_Tuple2('よせる', '寄せる'),
			_Utils_Tuple2('むれる', '群れる'),
			_Utils_Tuple2('たかる', 'たかる'),
			_Utils_Tuple2('つのる', '募る'),
			_Utils_Tuple2('くくる', 'くくる'),
			_Utils_Tuple2('つがう', 'つがう'),
			_Utils_Tuple2('からむ', '絡む'),
			_Utils_Tuple2('こぞる', 'こぞる'),
			_Utils_Tuple2('しばる', '縛る'),
			_Utils_Tuple2('わける', '分ける'),
			_Utils_Tuple2('わかつ', '分かつ'),
			_Utils_Tuple2('われる', '割れる'),
			_Utils_Tuple2('さける', 'さける'),
			_Utils_Tuple2('とける', '解ける'),
			_Utils_Tuple2('とかす', '解かす'),
			_Utils_Tuple2('ほどく', 'ほどく'),
			_Utils_Tuple2('ほぐす', 'ほぐす'),
			_Utils_Tuple2('ほごす', 'ほごす'),
			_Utils_Tuple2('はなす', 'はなす'),
			_Utils_Tuple2('はなつ', '放つ'),
			_Utils_Tuple2('とざす', '閉ざす'),
			_Utils_Tuple2('ふさぐ', 'ふさぐ'),
			_Utils_Tuple2('せまる', '迫る'),
			_Utils_Tuple2('となる', '隣る'),
			_Utils_Tuple2('とめる', '留める'),
			_Utils_Tuple2('すがる', 'すがる'),
			_Utils_Tuple2('よじる', 'よじる'),
			_Utils_Tuple2('すかす', '透かす'),
			_Utils_Tuple2('へがす', 'へがす'),
			_Utils_Tuple2('はげる', 'はげる'),
			_Utils_Tuple2('はがす', 'はがす'),
			_Utils_Tuple2('むける', 'むける'),
			_Utils_Tuple2('たたく', 'たたく'),
			_Utils_Tuple2('なぐる', '殴る'),
			_Utils_Tuple2('くわす', '食わす'),
			_Utils_Tuple2('つつく', 'つつく'),
			_Utils_Tuple2('せせる', 'せせる'),
			_Utils_Tuple2('こづく', '小突く'),
			_Utils_Tuple2('ひかす', '引かす'),
			_Utils_Tuple2('すれる', '擦れる'),
			_Utils_Tuple2('さする', 'さする'),
			_Utils_Tuple2('こする', 'こする'),
			_Utils_Tuple2('なする', 'なする'),
			_Utils_Tuple2('まする', '摩する'),
			_Utils_Tuple2('ふせぐ', '防ぐ'),
			_Utils_Tuple2('はばむ', '阻む'),
			_Utils_Tuple2('よける', 'よける'),
			_Utils_Tuple2('いなす', 'いなす'),
			_Utils_Tuple2('しのぐ', 'しのぐ'),
			_Utils_Tuple2('もする', '模する'),
			_Utils_Tuple2('ひずむ', 'ひずむ'),
			_Utils_Tuple2('ゆがむ', 'ゆがむ'),
			_Utils_Tuple2('とがる', 'とがる'),
			_Utils_Tuple2('へこむ', 'へこむ'),
			_Utils_Tuple2('くぼむ', 'くぼむ'),
			_Utils_Tuple2('しわむ', 'しわむ'),
			_Utils_Tuple2('のばす', 'のばす'),
			_Utils_Tuple2('ならす', 'ならす'),
			_Utils_Tuple2('まげる', '曲げる'),
			_Utils_Tuple2('くねる', 'くねる'),
			_Utils_Tuple2('かがむ', 'かがむ'),
			_Utils_Tuple2('ねじる', 'ねじる'),
			_Utils_Tuple2('ひねる', 'ひねる'),
			_Utils_Tuple2('よれる', 'よれる'),
			_Utils_Tuple2('もじる', 'もじる'),
			_Utils_Tuple2('すじる', 'すじる'),
			_Utils_Tuple2('ひぞる', '干反る'),
			_Utils_Tuple2('しなう', 'しなう'),
			_Utils_Tuple2('たわむ', 'たわむ'),
			_Utils_Tuple2('まける', '巻ける'),
			_Utils_Tuple2('たたむ', '畳む'),
			_Utils_Tuple2('まくる', 'まくる'),
			_Utils_Tuple2('めくる', 'めくる'),
			_Utils_Tuple2('はぐる', 'はぐる'),
			_Utils_Tuple2('たくる', 'たくる'),
			_Utils_Tuple2('しぼる', '絞る'),
			_Utils_Tuple2('きざむ', '刻む'),
			_Utils_Tuple2('えぐる', 'えぐる'),
			_Utils_Tuple2('こじる', 'こじる'),
			_Utils_Tuple2('ほじる', 'ほじる'),
			_Utils_Tuple2('くじる', 'くじる'),
			_Utils_Tuple2('うがつ', 'うがつ'),
			_Utils_Tuple2('はつる', 'はつる'),
			_Utils_Tuple2('そげる', 'そげる'),
			_Utils_Tuple2('きれる', '切れる'),
			_Utils_Tuple2('ちぎる', 'ちぎる'),
			_Utils_Tuple2('もぎる', 'もぎる'),
			_Utils_Tuple2('もげる', 'もげる'),
			_Utils_Tuple2('とれる', '取れる'),
			_Utils_Tuple2('ひしぐ', 'ひしぐ'),
			_Utils_Tuple2('しだく', 'しだく'),
			_Utils_Tuple2('くだく', '砕く'),
			_Utils_Tuple2('いたむ', 'いたむ'),
			_Utils_Tuple2('やぶく', '破く'),
			_Utils_Tuple2('ならぶ', '並ぶ'),
			_Utils_Tuple2('ごする', '伍する'),
			_Utils_Tuple2('ふえる', 'ふえる'),
			_Utils_Tuple2('ふやす', 'ふやす'),
			_Utils_Tuple2('まさる', '増さる'),
			_Utils_Tuple2('ふする', 'ふする'),
			_Utils_Tuple2('へらす', '減らす'),
			_Utils_Tuple2('へずる', 'へずる'),
			_Utils_Tuple2('へつる', 'へつる'),
			_Utils_Tuple2('ためる', 'ためる'),
			_Utils_Tuple2('たまる', 'たまる'),
			_Utils_Tuple2('みちる', '満ちる'),
			_Utils_Tuple2('みたす', '満たす'),
			_Utils_Tuple2('ちぢむ', '縮む'),
			_Utils_Tuple2('ちびる', 'ちびる'),
			_Utils_Tuple2('ふとる', '太る'),
			_Utils_Tuple2('ほそる', '細る'),
			_Utils_Tuple2('やせる', 'やせる'),
			_Utils_Tuple2('かさむ', 'かさむ'),
			_Utils_Tuple2('すぼむ', 'すぼむ'),
			_Utils_Tuple2('つぼむ', 'つぼむ'),
			_Utils_Tuple2('すくむ', 'すくむ'),
			_Utils_Tuple2('さかる', '盛る'),
			_Utils_Tuple2('よわる', '弱る'),
			_Utils_Tuple2('くちる', '朽ちる'),
			_Utils_Tuple2('にぶる', '鈍る'),
			_Utils_Tuple2('なまる', 'なまる'),
			_Utils_Tuple2('かぎる', '限る'),
			_Utils_Tuple2('しかず', 'しかず'),
			_Utils_Tuple2('たける', 'たける'),
			_Utils_Tuple2('めだつ', '目立つ'),
			_Utils_Tuple2('おとる', '劣る'),
			_Utils_Tuple2('おくる', '送る'),
			_Utils_Tuple2('すごす', '過ごす'),
			_Utils_Tuple2('のぞむ', '臨む'),
			_Utils_Tuple2('ふける', '老ける'),
			_Utils_Tuple2('くれる', '暮れる'),
			_Utils_Tuple2('いそぐ', '急ぐ'),
			_Utils_Tuple2('せかす', 'せかす'),
			_Utils_Tuple2('しぶる', '渋る'),
			_Utils_Tuple2('しきる', '仕切る'),
			_Utils_Tuple2('くぎる', '区切る・句切る'),
			_Utils_Tuple2('むかう', '向かう'),
			_Utils_Tuple2('あまる', '余る'),
			_Utils_Tuple2('あます', '余す'),
			_Utils_Tuple2('たりる', '足りる'),
			_Utils_Tuple2('かかす', '欠かす'),
			_Utils_Tuple2('りきむ', '力む'),
			_Utils_Tuple2('いきむ', '息む'),
			_Utils_Tuple2('たゆむ', 'たゆむ'),
			_Utils_Tuple2('だれる', 'だれる'),
			_Utils_Tuple2('ぼける', 'ぼける'),
			_Utils_Tuple2('きづく', '気付く'),
			_Utils_Tuple2('わかる', '分かる'),
			_Utils_Tuple2('うずく', 'うずく'),
			_Utils_Tuple2('わかす', '沸かす'),
			_Utils_Tuple2('うえる', '飢える'),
			_Utils_Tuple2('かわく', '渇く'),
			_Utils_Tuple2('さめる', '覚める'),
			_Utils_Tuple2('さえる', 'さえる'),
			_Utils_Tuple2('あきる', '飽きる'),
			_Utils_Tuple2('へばる', 'へばる'),
			_Utils_Tuple2('ばてる', 'ばてる'),
			_Utils_Tuple2('ねむる', '眠る'),
			_Utils_Tuple2('ねつく', '寝付く'),
			_Utils_Tuple2('ねいる', '寝入る'),
			_Utils_Tuple2('ねこむ', '寝込む'),
			_Utils_Tuple2('さます', '覚ます'),
			_Utils_Tuple2('たたる', 'たたる'),
			_Utils_Tuple2('はれる', '晴れる'),
			_Utils_Tuple2('おじる', 'おじる'),
			_Utils_Tuple2('びびる', 'びびる'),
			_Utils_Tuple2('ごねる', 'ごねる'),
			_Utils_Tuple2('いする', '慰する'),
			_Utils_Tuple2('めいる', 'めいる'),
			_Utils_Tuple2('くさる', '腐る'),
			_Utils_Tuple2('あせる', '焦る'),
			_Utils_Tuple2('じれる', '焦れる'),
			_Utils_Tuple2('じらす', '焦らす'),
			_Utils_Tuple2('あえぐ', 'あえぐ'),
			_Utils_Tuple2('こまる', '困る'),
			_Utils_Tuple2('あぐむ', 'あぐむ'),
			_Utils_Tuple2('なやむ', '悩む'),
			_Utils_Tuple2('もがく', 'もがく'),
			_Utils_Tuple2('あがく', 'あがく'),
			_Utils_Tuple2('わびる', 'わびる'),
			_Utils_Tuple2('なげく', '嘆く'),
			_Utils_Tuple2('このむ', '好む'),
			_Utils_Tuple2('めでる', 'めでる'),
			_Utils_Tuple2('きらう', '嫌う'),
			_Utils_Tuple2('うとむ', '疎む'),
			_Utils_Tuple2('むつむ', 'むつむ'),
			_Utils_Tuple2('なつく', '懐く'),
			_Utils_Tuple2('にくむ', '憎む'),
			_Utils_Tuple2('したう', '慕う'),
			_Utils_Tuple2('ほれる', 'ほれる'),
			_Utils_Tuple2('ねたむ', 'ねたむ'),
			_Utils_Tuple2('そねむ', 'そねむ'),
			_Utils_Tuple2('ひがむ', 'ひがむ'),
			_Utils_Tuple2('やける', 'やける'),
			_Utils_Tuple2('うらむ', '恨む'),
			_Utils_Tuple2('あおぐ', '仰ぐ'),
			_Utils_Tuple2('たのむ', '頼む'),
			_Utils_Tuple2('おしむ', '惜しむ'),
			_Utils_Tuple2('ませる', 'ませる'),
			_Utils_Tuple2('きどる', '気取る'),
			_Utils_Tuple2('てらう', 'てらう'),
			_Utils_Tuple2('いばる', '威張る'),
			_Utils_Tuple2('てれる', '照れる'),
			_Utils_Tuple2('にがる', '苦る'),
			_Utils_Tuple2('すごむ', 'すごむ'),
			_Utils_Tuple2('ぐずる', 'ぐずる'),
			_Utils_Tuple2('すねる', 'すねる'),
			_Utils_Tuple2('わらう', '笑う'),
			_Utils_Tuple2('わめく', 'わめく'),
			_Utils_Tuple2('さけぶ', '叫ぶ'),
			_Utils_Tuple2('うめく', 'うめく'),
			_Utils_Tuple2('うたう', '歌う'),
			_Utils_Tuple2('すだく', 'すだく'),
			_Utils_Tuple2('ほえる', 'ほえる'),
			_Utils_Tuple2('うなる', 'うなる'),
			_Utils_Tuple2('こらす', '凝らす'),
			_Utils_Tuple2('はげむ', '励む'),
			_Utils_Tuple2('いさむ', '勇む'),
			_Utils_Tuple2('ねばる', '粘る'),
			_Utils_Tuple2('ほこる', '誇る'),
			_Utils_Tuple2('おごる', 'おごる'),
			_Utils_Tuple2('はじる', '恥じる'),
			_Utils_Tuple2('くいる', '悔いる'),
			_Utils_Tuple2('くやむ', '悔やむ'),
			_Utils_Tuple2('こりる', '懲りる'),
			_Utils_Tuple2('たがる', '－たがる'),
			_Utils_Tuple2('ねがう', '願う'),
			_Utils_Tuple2('いのる', '祈る'),
			_Utils_Tuple2('めざす', '目指す・目差す'),
			_Utils_Tuple2('なずむ', 'なずむ'),
			_Utils_Tuple2('かまう', '構う'),
			_Utils_Tuple2('けちる', 'けちる'),
			_Utils_Tuple2('くじく', 'くじく'),
			_Utils_Tuple2('めげる', 'めげる'),
			_Utils_Tuple2('のろう', 'のろう'),
			_Utils_Tuple2('さとる', '悟る'),
			_Utils_Tuple2('ならう', '習う'),
			_Utils_Tuple2('しごく', 'しごく'),
			_Utils_Tuple2('みがく', '磨く'),
			_Utils_Tuple2('まねる', 'まねる'),
			_Utils_Tuple2('まなぶ', '学ぶ'),
			_Utils_Tuple2('かじる', 'かじる'),
			_Utils_Tuple2('かれる', '枯れる'),
			_Utils_Tuple2('こなす', 'こなす'),
			_Utils_Tuple2('なれる', '慣れる'),
			_Utils_Tuple2('おもう', '思う'),
			_Utils_Tuple2('おぼす', 'おぼす'),
			_Utils_Tuple2('ぬかる', '抜かる'),
			_Utils_Tuple2('しれる', '知れる'),
			_Utils_Tuple2('みしる', '見知る'),
			_Utils_Tuple2('けどる', '気取る'),
			_Utils_Tuple2('みえる', '見える'),
			_Utils_Tuple2('げせる', '解せる'),
			_Utils_Tuple2('えらぶ', '選ぶ'),
			_Utils_Tuple2('すぐる', 'すぐる'),
			_Utils_Tuple2('はかる', 'はかる'),
			_Utils_Tuple2('ためす', '試す'),
			_Utils_Tuple2('てみる', '…てみる'),
			_Utils_Tuple2('さがす', 'さがす'),
			_Utils_Tuple2('さぐる', '探る'),
			_Utils_Tuple2('あさる', 'あさる'),
			_Utils_Tuple2('ぎする', '擬する'),
			_Utils_Tuple2('みなす', '見なす'),
			_Utils_Tuple2('よめる', '読める'),
			_Utils_Tuple2('みこす', '見越す'),
			_Utils_Tuple2('みこむ', '見込む'),
			_Utils_Tuple2('みぬく', '見抜く'),
			_Utils_Tuple2('ねらう', 'ねらう'),
			_Utils_Tuple2('にらむ', 'にらむ'),
			_Utils_Tuple2('きまる', '決まる'),
			_Utils_Tuple2('きめる', '決める'),
			_Utils_Tuple2('まどう', '惑う'),
			_Utils_Tuple2('ひるむ', 'ひるむ'),
			_Utils_Tuple2('みきる', '見切る'),
			_Utils_Tuple2('なげる', '投げる'),
			_Utils_Tuple2('たくむ', '巧む'),
			_Utils_Tuple2('おがむ', '拝む'),
			_Utils_Tuple2('みむく', '見向く'),
			_Utils_Tuple2('みやる', '見やる'),
			_Utils_Tuple2('みはる', '見張る'),
			_Utils_Tuple2('みとる', '見取る'),
			_Utils_Tuple2('みいる', '見入る'),
			_Utils_Tuple2('みあう', '見合う'),
			_Utils_Tuple2('みせる', '見せる'),
			_Utils_Tuple2('なめる', 'なめる'),
			_Utils_Tuple2('もうす', '申す'),
			_Utils_Tuple2('ほざく', 'ほざく'),
			_Utils_Tuple2('だべる', 'だべる'),
			_Utils_Tuple2('だまる', '黙る'),
			_Utils_Tuple2('もくす', '黙す'),
			_Utils_Tuple2('もだす', 'もだす'),
			_Utils_Tuple2('どなる', '怒鳴る'),
			_Utils_Tuple2('がなる', 'がなる'),
			_Utils_Tuple2('かこつ', 'かこつ'),
			_Utils_Tuple2('ぼやく', 'ぼやく'),
			_Utils_Tuple2('ぐちる', '愚痴る'),
			_Utils_Tuple2('こねる', 'こねる'),
			_Utils_Tuple2('そしる', 'そしる'),
			_Utils_Tuple2('なのる', '名のる'),
			_Utils_Tuple2('やくす', '訳す'),
			_Utils_Tuple2('にごる', '濁る'),
			_Utils_Tuple2('つづる', 'つづる'),
			_Utils_Tuple2('つげる', '告げる'),
			_Utils_Tuple2('なじる', 'なじる'),
			_Utils_Tuple2('けなす', 'けなす'),
			_Utils_Tuple2('くさす', 'くさす'),
			_Utils_Tuple2('せめる', '責める'),
			_Utils_Tuple2('やじる', 'やじる'),
			_Utils_Tuple2('もてる', 'もてる'),
			_Utils_Tuple2('なぞる', 'なぞる'),
			_Utils_Tuple2('しるす', '記す'),
			_Utils_Tuple2('めもる', 'メモる'),
			_Utils_Tuple2('えがく', '描く'),
			_Utils_Tuple2('はもる', 'ハモる'),
			_Utils_Tuple2('げびる', '下卑る'),
			_Utils_Tuple2('あそぶ', '遊ぶ'),
			_Utils_Tuple2('ぐれる', 'ぐれる'),
			_Utils_Tuple2('じする', '辞する'),
			_Utils_Tuple2('かせぐ', '稼ぐ'),
			_Utils_Tuple2('さぼる', 'サボる'),
			_Utils_Tuple2('うかる', '受かる'),
			_Utils_Tuple2('たべる', '食べる'),
			_Utils_Tuple2('ふかす', '更かす'),
			_Utils_Tuple2('くらう', '食らう'),
			_Utils_Tuple2('のます', '飲ます'),
			_Utils_Tuple2('すする', 'すする'),
			_Utils_Tuple2('まとう', 'まとう'),
			_Utils_Tuple2('はおる', '羽織る'),
			_Utils_Tuple2('かずく', 'かずく'),
			_Utils_Tuple2('ぬげる', '脱げる'),
			_Utils_Tuple2('ぬがす', '脱がす'),
			_Utils_Tuple2('きなす', '着成す'),
			_Utils_Tuple2('やつす', 'やつす'),
			_Utils_Tuple2('きこむ', '着込む'),
			_Utils_Tuple2('すまう', '住まう'),
			_Utils_Tuple2('いつく', '居着く'),
			_Utils_Tuple2('すずむ', '涼む'),
			_Utils_Tuple2('ゆすぐ', 'ゆすぐ'),
			_Utils_Tuple2('すすぐ', 'すすぐ'),
			_Utils_Tuple2('めとる', 'めとる'),
			_Utils_Tuple2('とつぐ', '嫁ぐ'),
			_Utils_Tuple2('まつる', '祭る'),
			_Utils_Tuple2('いわう', '祝う'),
			_Utils_Tuple2('がする', '賀する'),
			_Utils_Tuple2('およぐ', '泳ぐ'),
			_Utils_Tuple2('ざれる', 'ざれる'),
			_Utils_Tuple2('さわぐ', '騒ぐ'),
			_Utils_Tuple2('ぞめく', 'ぞめく'),
			_Utils_Tuple2('つるむ', 'つるむ'),
			_Utils_Tuple2('のめる', 'のめる'),
			_Utils_Tuple2('ころぶ', '転ぶ'),
			_Utils_Tuple2('ざする', '座する'),
			_Utils_Tuple2('まねく', '招く'),
			_Utils_Tuple2('にぎる', '握る'),
			_Utils_Tuple2('つかむ', 'つかむ'),
			_Utils_Tuple2('つまむ', 'つまむ'),
			_Utils_Tuple2('むしる', 'むしる'),
			_Utils_Tuple2('つねる', 'つねる'),
			_Utils_Tuple2('ぶする', '撫する'),
			_Utils_Tuple2('なでる', 'なでる'),
			_Utils_Tuple2('なぜる', 'なぜる'),
			_Utils_Tuple2('いじる', 'いじる'),
			_Utils_Tuple2('たぐる', '手繰る'),
			_Utils_Tuple2('ほうる', 'ほうる'),
			_Utils_Tuple2('かざす', 'かざす'),
			_Utils_Tuple2('かつぐ', '担ぐ'),
			_Utils_Tuple2('せおう', '背負う'),
			_Utils_Tuple2('おぶう', '負ぶう'),
			_Utils_Tuple2('になう', '担う'),
			_Utils_Tuple2('いざる', 'いざる'),
			_Utils_Tuple2('またぐ', 'またぐ'),
			_Utils_Tuple2('ねぶる', 'ねぶる'),
			_Utils_Tuple2('つぐむ', 'つぐむ'),
			_Utils_Tuple2('むせる', 'むせる'),
			_Utils_Tuple2('むせぶ', 'むせぶ'),
			_Utils_Tuple2('えずく', 'えずく'),
			_Utils_Tuple2('つぶる', 'つぶる'),
			_Utils_Tuple2('つむる', 'つむる'),
			_Utils_Tuple2('やれる', 'やれる'),
			_Utils_Tuple2('あたう', 'あたう'),
			_Utils_Tuple2('かざる', '飾る'),
			_Utils_Tuple2('される', 'される'),
			_Utils_Tuple2('しだす', 'し出す'),
			_Utils_Tuple2('なさる', 'なさる'),
			_Utils_Tuple2('いたす', '致す'),
			_Utils_Tuple2('おかす', 'おかす'),
			_Utils_Tuple2('ぬすむ', '盗む'),
			_Utils_Tuple2('おおす', '－おおす'),
			_Utils_Tuple2('とげる', '遂げる'),
			_Utils_Tuple2('みする', 'ミスる'),
			_Utils_Tuple2('とちる', 'とちる'),
			_Utils_Tuple2('なごむ', '和む'),
			_Utils_Tuple2('またす', '待たす'),
			_Utils_Tuple2('ちかう', '誓う'),
			_Utils_Tuple2('まもる', '守る'),
			_Utils_Tuple2('ゆずる', '譲る'),
			_Utils_Tuple2('ゆるす', '許す'),
			_Utils_Tuple2('いなむ', '否む'),
			_Utils_Tuple2('こばむ', '拒む'),
			_Utils_Tuple2('てやる', '…てやる'),
			_Utils_Tuple2('もめる', 'もめる'),
			_Utils_Tuple2('いどむ', '挑む'),
			_Utils_Tuple2('でもる', 'デモる'),
			_Utils_Tuple2('おそう', '襲う'),
			_Utils_Tuple2('まかす', '負かす'),
			_Utils_Tuple2('ちする', '治する'),
			_Utils_Tuple2('ほする', '補する'),
			_Utils_Tuple2('なざす', '名指す'),
			_Utils_Tuple2('はする', '派する'),
			_Utils_Tuple2('つかう', 'つかう'),
			_Utils_Tuple2('しこむ', '仕込む'),
			_Utils_Tuple2('さとす', '諭す'),
			_Utils_Tuple2('しかる', 'しかる'),
			_Utils_Tuple2('めぐむ', '恵む'),
			_Utils_Tuple2('たよる', '頼る'),
			_Utils_Tuple2('ねだる', 'ねだる'),
			_Utils_Tuple2('せびる', 'せびる'),
			_Utils_Tuple2('せがむ', 'せがむ'),
			_Utils_Tuple2('なかれ', '…なかれ'),
			_Utils_Tuple2('なさい', '－なさい'),
			_Utils_Tuple2('あじる', 'アジる'),
			_Utils_Tuple2('そそる', 'そそる'),
			_Utils_Tuple2('たくす', '託す'),
			_Utils_Tuple2('あやす', 'あやす'),
			_Utils_Tuple2('いびる', 'いびる'),
			_Utils_Tuple2('ほめる', '褒める'),
			_Utils_Tuple2('おどす', '脅す'),
			_Utils_Tuple2('だます', 'だます'),
			_Utils_Tuple2('ばかす', '化かす'),
			_Utils_Tuple2('なぶる', 'なぶる'),
			_Utils_Tuple2('はやす', 'はやす'),
			_Utils_Tuple2('やがる', '－やがる'),
			_Utils_Tuple2('ねとる', '寝取る'),
			_Utils_Tuple2('うばう', '奪う'),
			_Utils_Tuple2('もたす', '持たす'),
			_Utils_Tuple2('とする', '賭する'),
			_Utils_Tuple2('ねぎる', '値切る'),
			_Utils_Tuple2('りする', '利する'),
			_Utils_Tuple2('しする', '資する'),
			_Utils_Tuple2('ひさぐ', 'ひさぐ'),
			_Utils_Tuple2('うれる', '売れる'),
			_Utils_Tuple2('たまう', 'たまう'),
			_Utils_Tuple2('みつぐ', '貢ぐ'),
			_Utils_Tuple2('もらう', 'もらう'),
			_Utils_Tuple2('くばる', '配る'),
			_Utils_Tuple2('かりる', '借りる'),
			_Utils_Tuple2('とます', '富ます'),
			_Utils_Tuple2('うわる', '植わる'),
			_Utils_Tuple2('いさる', 'いさる'),
			_Utils_Tuple2('かもす', '醸す'),
			_Utils_Tuple2('つむぐ', '紡ぐ'),
			_Utils_Tuple2('いやす', 'いやす'),
			_Utils_Tuple2('かがる', 'かがる'),
			_Utils_Tuple2('くける', 'くける'),
			_Utils_Tuple2('いせる', 'いせる'),
			_Utils_Tuple2('そまる', '染まる'),
			_Utils_Tuple2('あらう', '洗う'),
			_Utils_Tuple2('あえる', 'あえる'),
			_Utils_Tuple2('あぶる', 'あぶる'),
			_Utils_Tuple2('ひやす', '冷やす'),
			_Utils_Tuple2('むらす', '蒸らす'),
			_Utils_Tuple2('ゆでる', 'ゆでる'),
			_Utils_Tuple2('ゆだる', 'ゆだる'),
			_Utils_Tuple2('うでる', 'うでる'),
			_Utils_Tuple2('うだる', 'うだる'),
			_Utils_Tuple2('ゆびく', '湯引く'),
			_Utils_Tuple2('ゆがく', '湯がく'),
			_Utils_Tuple2('にえる', '煮える'),
			_Utils_Tuple2('にこむ', '煮込む'),
			_Utils_Tuple2('にだす', '煮出す'),
			_Utils_Tuple2('にたつ', '煮立つ'),
			_Utils_Tuple2('よそる', 'よそる'),
			_Utils_Tuple2('ぬぐう', 'ぬぐう'),
			_Utils_Tuple2('ともす', 'ともす'),
			_Utils_Tuple2('かたす', 'かたす'),
			_Utils_Tuple2('ねれる', '練れる'),
			_Utils_Tuple2('なめす', 'なめす'),
			_Utils_Tuple2('すげる', 'すげる'),
			_Utils_Tuple2('いぬく', '射抜く'),
			_Utils_Tuple2('ひかる', '光る'),
			_Utils_Tuple2('はえる', '映える'),
			_Utils_Tuple2('ぼかす', 'ぼかす'),
			_Utils_Tuple2('かすむ', 'かすむ'),
			_Utils_Tuple2('くもる', '曇る'),
			_Utils_Tuple2('かげる', '陰る'),
			_Utils_Tuple2('くすむ', 'くすむ'),
			_Utils_Tuple2('しらむ', '白む'),
			_Utils_Tuple2('くろむ', '黒む'),
			_Utils_Tuple2('あおむ', '青む'),
			_Utils_Tuple2('きばむ', '黄ばむ'),
			_Utils_Tuple2('きしむ', 'きしむ'),
			_Utils_Tuple2('きしる', 'きしる'),
			_Utils_Tuple2('さやぐ', 'さやぐ'),
			_Utils_Tuple2('どよむ', 'どよむ'),
			_Utils_Tuple2('かおる', 'かおる'),
			_Utils_Tuple2('にごす', '濁す'),
			_Utils_Tuple2('ぬめる', 'ぬめる'),
			_Utils_Tuple2('ぬれる', 'ぬれる'),
			_Utils_Tuple2('ぬらす', 'ぬらす'),
			_Utils_Tuple2('しとる', 'しとる'),
			_Utils_Tuple2('うるむ', '潤む'),
			_Utils_Tuple2('ひえる', '冷える'),
			_Utils_Tuple2('けむる', '煙る'),
			_Utils_Tuple2('けぶる', 'けぶる'),
			_Utils_Tuple2('もやる', 'もやる'),
			_Utils_Tuple2('しぶく', 'しぶく'),
			_Utils_Tuple2('はらす', '晴らす'),
			_Utils_Tuple2('しける', 'しける'),
			_Utils_Tuple2('はぜる', 'はぜる'),
			_Utils_Tuple2('いてる', 'いてる'),
			_Utils_Tuple2('こごる', 'こごる'),
			_Utils_Tuple2('ともる', 'ともる'),
			_Utils_Tuple2('くべる', 'くべる'),
			_Utils_Tuple2('もやす', '燃やす'),
			_Utils_Tuple2('もえる', '燃える'),
			_Utils_Tuple2('こげる', '焦げる'),
			_Utils_Tuple2('こがす', '焦がす'),
			_Utils_Tuple2('いぶる', 'いぶる'),
			_Utils_Tuple2('いぶす', 'いぶす'),
			_Utils_Tuple2('ぬるむ', 'ぬるむ'),
			_Utils_Tuple2('ほめく', 'ほめく'),
			_Utils_Tuple2('たぎる', 'たぎる'),
			_Utils_Tuple2('こやす', '肥やす'),
			_Utils_Tuple2('そだつ', '育つ'),
			_Utils_Tuple2('ひだつ', '肥立つ'),
			_Utils_Tuple2('めぶく', '芽吹く'),
			_Utils_Tuple2('かびる', 'かびる'),
			_Utils_Tuple2('しげる', '茂る'),
			_Utils_Tuple2('しなす', '死なす'),
			_Utils_Tuple2('ほふる', 'ほふる'),
			_Utils_Tuple2('くびる', 'くびる'),
			_Utils_Tuple2('なえる', 'なえる'),
			_Utils_Tuple2('しぼむ', 'しぼむ'),
			_Utils_Tuple2('いえる', 'いえる'),
			_Utils_Tuple2('くらむ', 'くらむ'),
			_Utils_Tuple2('しこる', 'しこる'),
			_Utils_Tuple2('むくむ', 'むくむ'),
			_Utils_Tuple2('こんな', 'こんな'),
			_Utils_Tuple2('そんな', 'そんな'),
			_Utils_Tuple2('さこそ', 'さこそ'),
			_Utils_Tuple2('みぎの', '右の'),
			_Utils_Tuple2('あんな', 'あんな'),
			_Utils_Tuple2('どんな', 'どんな'),
			_Utils_Tuple2('いかな', 'いかな'),
			_Utils_Tuple2('いかが', 'いかが'),
			_Utils_Tuple2('なんて', '何て'),
			_Utils_Tuple2('なんの', '何の'),
			_Utils_Tuple2('ほかに', '外に'),
			_Utils_Tuple2('べつに', '別に'),
			_Utils_Tuple2('ほんと', 'ほんと'),
			_Utils_Tuple2('じつは', '実は'),
			_Utils_Tuple2('まさに', 'まさに'),
			_Utils_Tuple2('ずばり', 'ずばり'),
			_Utils_Tuple2('まっか', '真っ赤'),
			_Utils_Tuple2('しんに', '真に'),
			_Utils_Tuple2('じつの', '実の'),
			_Utils_Tuple2('りある', 'リアル'),
			_Utils_Tuple2('れいの', '例の'),
			_Utils_Tuple2('おもな', '主な'),
			_Utils_Tuple2('じかに', '直に'),
			_Utils_Tuple2('もろに', 'もろに'),
			_Utils_Tuple2('とおい', '遠い'),
			_Utils_Tuple2('うとい', '疎い'),
			_Utils_Tuple2('なのみ', '名のみ'),
			_Utils_Tuple2('ごかく', '互角'),
			_Utils_Tuple2('ぶ・む', '無－'),
			_Utils_Tuple2('ふ・ぶ', '不－'),
			_Utils_Tuple2('おなじ', '同じ'),
			_Utils_Tuple2('ともに', '共に'),
			_Utils_Tuple2('により', '似寄り'),
			_Utils_Tuple2('ぴたり', 'ぴたり'),
			_Utils_Tuple2('ごとし', '－ごとし'),
			_Utils_Tuple2('まるで', 'まるで'),
			_Utils_Tuple2('らしい', '－らしい'),
			_Utils_Tuple2('っぽい', '－っぽい'),
			_Utils_Tuple2('っこい', '－っこい'),
			_Utils_Tuple2('ありげ', 'ありげ'),
			_Utils_Tuple2('うつろ', 'うつろ'),
			_Utils_Tuple2('にひる', 'ニヒル'),
			_Utils_Tuple2('かけた', '欠けた'),
			_Utils_Tuple2('つきぬ', '尽きぬ'),
			_Utils_Tuple2('あらわ', 'あらわ'),
			_Utils_Tuple2('ぬっと', 'ぬっと'),
			_Utils_Tuple2('ろこつ', '露骨'),
			_Utils_Tuple2('ひそか', 'ひそか'),
			_Utils_Tuple2('そっと', 'そっと'),
			_Utils_Tuple2('いんに', '陰に'),
			_Utils_Tuple2('あんに', '暗に'),
			_Utils_Tuple2('ふかひ', '不可避'),
			_Utils_Tuple2('あえて', 'あえて'),
			_Utils_Tuple2('まずい', 'まずい'),
			_Utils_Tuple2('とんだ', 'とんだ'),
			_Utils_Tuple2('みごと', '見事'),
			_Utils_Tuple2('ないす', 'ナイス'),
			_Utils_Tuple2('りっぱ', '立派'),
			_Utils_Tuple2('すてき', 'すてき'),
			_Utils_Tuple2('さまつ', '瑣末・些末'),
			_Utils_Tuple2('ろくな', 'ろくな'),
			_Utils_Tuple2('ひきん', '卑近'),
			_Utils_Tuple2('しがち', 'しがち'),
			_Utils_Tuple2('いすう', '異数'),
			_Utils_Tuple2('とくに', '特に'),
			_Utils_Tuple2('ことに', '殊に'),
			_Utils_Tuple2('わけて', 'わけて'),
			_Utils_Tuple2('きばつ', '奇抜'),
			_Utils_Tuple2('とっぴ', 'とっぴ'),
			_Utils_Tuple2('よろし', 'よろし'),
			_Utils_Tuple2('ぐっど', 'グッド'),
			_Utils_Tuple2('わるい', '悪い'),
			_Utils_Tuple2('そあく', '粗悪'),
			_Utils_Tuple2('てきぎ', '適宜'),
			_Utils_Tuple2('ふてき', '不適'),
			_Utils_Tuple2('うまい', 'うまい'),
			_Utils_Tuple2('てごろ', '手ごろ'),
			_Utils_Tuple2('すぎた', '過ぎた'),
			_Utils_Tuple2('なまじ', 'なまじ'),
			_Utils_Tuple2('きれい', 'きれい'),
			_Utils_Tuple2('ごった', 'ごった'),
			_Utils_Tuple2('ゆるい', '緩い'),
			_Utils_Tuple2('あまい', '甘い'),
			_Utils_Tuple2('るうず', 'ルーズ'),
			_Utils_Tuple2('ゆるり', 'ゆるり'),
			_Utils_Tuple2('だらり', 'だらり'),
			_Utils_Tuple2('きつい', 'きつい'),
			_Utils_Tuple2('まばら', 'まばら'),
			_Utils_Tuple2('しげく', 'しげく'),
			_Utils_Tuple2('そまつ', '粗末'),
			_Utils_Tuple2('そざつ', '粗雑'),
			_Utils_Tuple2('ちみつ', '緻密'),
			_Utils_Tuple2('こまか', '細か'),
			_Utils_Tuple2('ざった', '雑多'),
			_Utils_Tuple2('ちぢに', '千千に'),
			_Utils_Tuple2('ただに', 'ただに'),
			_Utils_Tuple2('ぴゅあ', 'ピュア'),
			_Utils_Tuple2('びてき', '美的'),
			_Utils_Tuple2('きよい', '清い'),
			_Utils_Tuple2('みよい', '見よい'),
			_Utils_Tuple2('にくい', '－にくい'),
			_Utils_Tuple2('がたい', '－難い'),
			_Utils_Tuple2('づらい', '－づらい'),
			_Utils_Tuple2('やっと', 'やっと'),
			_Utils_Tuple2('やすい', 'やすい'),
			_Utils_Tuple2('てがる', '手軽'),
			_Utils_Tuple2('あんい', '安易'),
			_Utils_Tuple2('まどか', 'まどか'),
			_Utils_Tuple2('はあど', 'ハード'),
			_Utils_Tuple2('ふおん', '不穏'),
			_Utils_Tuple2('やばい', 'やばい'),
			_Utils_Tuple2('つよい', '強い'),
			_Utils_Tuple2('ろうこ', '牢乎・牢固'),
			_Utils_Tuple2('けんご', '堅固'),
			_Utils_Tuple2('こわい', '怖い'),
			_Utils_Tuple2('ひよわ', 'ひ弱'),
			_Utils_Tuple2('やわい', '柔い'),
			_Utils_Tuple2('かれつ', '苛烈'),
			_Utils_Tuple2('すごい', 'すごい'),
			_Utils_Tuple2('ひどい', 'ひどい'),
			_Utils_Tuple2('しかと', 'しかと'),
			_Utils_Tuple2('じっと', 'じっと'),
			_Utils_Tuple2('まどお', '間遠'),
			_Utils_Tuple2('ぐいと', 'ぐいと'),
			_Utils_Tuple2('ぐんと', 'ぐんと'),
			_Utils_Tuple2('ぐっと', 'ぐっと'),
			_Utils_Tuple2('さっと', 'さっと'),
			_Utils_Tuple2('すっと', 'すっと'),
			_Utils_Tuple2('どっと', 'どっと'),
			_Utils_Tuple2('ぼつり', 'ぼつり'),
			_Utils_Tuple2('ぽんと', 'ぽんと'),
			_Utils_Tuple2('どんと', 'どんと'),
			_Utils_Tuple2('ふっと', 'ふっと'),
			_Utils_Tuple2('つっと', 'つっと'),
			_Utils_Tuple2('ついと', 'ついと'),
			_Utils_Tuple2('ぷいと', 'ぷいと'),
			_Utils_Tuple2('ぴょん', 'ぴょん'),
			_Utils_Tuple2('ぴくり', 'ぴくり'),
			_Utils_Tuple2('ふらり', 'ふらり'),
			_Utils_Tuple2('ざくり', 'ざくり'),
			_Utils_Tuple2('ゆらり', 'ゆらり'),
			_Utils_Tuple2('ひらり', 'ひらり'),
			_Utils_Tuple2('ぐらり', 'ぐらり'),
			_Utils_Tuple2('くるり', 'くるり'),
			_Utils_Tuple2('ころり', 'ころり'),
			_Utils_Tuple2('ごろり', 'ごろり'),
			_Utils_Tuple2('ばたり', 'ばたり'),
			_Utils_Tuple2('ぱたり', 'ぱたり'),
			_Utils_Tuple2('はたと', 'はたと'),
			_Utils_Tuple2('どうと', 'どうと'),
			_Utils_Tuple2('すてん', 'すてん'),
			_Utils_Tuple2('ずしり', 'ずしり'),
			_Utils_Tuple2('でんと', 'でんと'),
			_Utils_Tuple2('ぶらり', 'ぶらり'),
			_Utils_Tuple2('するり', 'するり'),
			_Utils_Tuple2('ずるり', 'ずるり'),
			_Utils_Tuple2('ずぶり', 'ずぶり'),
			_Utils_Tuple2('まみれ', '－まみれ'),
			_Utils_Tuple2('みどろ', '－みどろ'),
			_Utils_Tuple2('だらけ', '－だらけ'),
			_Utils_Tuple2('ふわり', 'ふわり'),
			_Utils_Tuple2('しめて', '締めて'),
			_Utils_Tuple2('ちらり', 'ちらり'),
			_Utils_Tuple2('ほろり', 'ほろり'),
			_Utils_Tuple2('ぽろり', 'ぽろり'),
			_Utils_Tuple2('ぱらり', 'ぱらり'),
			_Utils_Tuple2('ばらり', 'ばらり'),
			_Utils_Tuple2('とじた', '閉じた'),
			_Utils_Tuple2('ばたん', 'ばたん'),
			_Utils_Tuple2('べたり', 'べたり'),
			_Utils_Tuple2('ぺたり', 'ぺたり'),
			_Utils_Tuple2('ひたと', 'ひたと'),
			_Utils_Tuple2('ひしと', 'ひしと'),
			_Utils_Tuple2('すぱり', 'すぱり'),
			_Utils_Tuple2('ぷつり', 'ぷつり'),
			_Utils_Tuple2('ざんじ', '暫時'),
			_Utils_Tuple2('ずっと', 'ずっと'),
			_Utils_Tuple2('やはり', 'やはり'),
			_Utils_Tuple2('ながの', '永の'),
			_Utils_Tuple2('いつも', 'いつも'),
			_Utils_Tuple2('つねに', '常に'),
			_Utils_Tuple2('たえず', '絶えず'),
			_Utils_Tuple2('のべつ', 'のべつ'),
			_Utils_Tuple2('ふいと', 'ふいと'),
			_Utils_Tuple2('とみに', 'とみに'),
			_Utils_Tuple2('まずは', 'まずは'),
			_Utils_Tuple2('かりに', '仮に'),
			_Utils_Tuple2('さらに', '更に'),
			_Utils_Tuple2('にどと', '二度と'),
			_Utils_Tuple2('さんざ', 'さんざ'),
			_Utils_Tuple2('ときに', '時に'),
			_Utils_Tuple2('たまに', 'たまに'),
			_Utils_Tuple2('いまや', '今や'),
			_Utils_Tuple2('げんに', '現に'),
			_Utils_Tuple2('かつて', 'かつて'),
			_Utils_Tuple2('とうに', 'とうに'),
			_Utils_Tuple2('つとに', 'つとに'),
			_Utils_Tuple2('すでに', '既に'),
			_Utils_Tuple2('いまに', '今に'),
			_Utils_Tuple2('ちくじ', '逐次'),
			_Utils_Tuple2('あらた', '新た'),
			_Utils_Tuple2('なうい', 'ナウい'),
			_Utils_Tuple2('ほっと', 'ホット'),
			_Utils_Tuple2('もだん', 'モダン'),
			_Utils_Tuple2('ちんぷ', '陳腐'),
			_Utils_Tuple2('よにも', '世にも'),
			_Utils_Tuple2('はやい', 'はやい'),
			_Utils_Tuple2('おそい', '遅い'),
			_Utils_Tuple2('いまだ', 'いまだ'),
			_Utils_Tuple2('ついぞ', 'ついぞ'),
			_Utils_Tuple2('もはや', 'もはや'),
			_Utils_Tuple2('ついに', 'ついに'),
			_Utils_Tuple2('けっく', '結句'),
			_Utils_Tuple2('はては', '果ては'),
			_Utils_Tuple2('あわや', 'あわや'),
			_Utils_Tuple2('あくる', '明くる'),
			_Utils_Tuple2('じきに', '直に'),
			_Utils_Tuple2('ながら', '－ながら'),
			_Utils_Tuple2('すがら', '－すがら'),
			_Utils_Tuple2('がてら', '－がてら'),
			_Utils_Tuple2('へんぴ', '辺鄙'),
			_Utils_Tuple2('ごつい', 'ごつい'),
			_Utils_Tuple2('とれた', '取れた'),
			_Utils_Tuple2('もげた', 'もげた'),
			_Utils_Tuple2('きれた', '切れた'),
			_Utils_Tuple2('そった', '反った'),
			_Utils_Tuple2('にぶい', '鈍い'),
			_Utils_Tuple2('まるい', 'まるい'),
			_Utils_Tuple2('つぶら', 'つぶら'),
			_Utils_Tuple2('ぽこん', 'ぽこん'),
			_Utils_Tuple2('ぺこん', 'ぺこん'),
			_Utils_Tuple2('あまた', 'あまた'),
			_Utils_Tuple2('うんと', 'うんと'),
			_Utils_Tuple2('たんと', 'たんと'),
			_Utils_Tuple2('たわわ', 'たわわ'),
			_Utils_Tuple2('ずらり', 'ずらり'),
			_Utils_Tuple2('ぞろり', 'ぞろり'),
			_Utils_Tuple2('ただい', '多大'),
			_Utils_Tuple2('まるち', 'マルチ'),
			_Utils_Tuple2('ゆたか', '豊か'),
			_Utils_Tuple2('みちた', '満ちた'),
			_Utils_Tuple2('すこし', '少し'),
			_Utils_Tuple2('ささい', '些細'),
			_Utils_Tuple2('わずか', 'わずか'),
			_Utils_Tuple2('ほんの', 'ほんの'),
			_Utils_Tuple2('ちっと', 'ちっと'),
			_Utils_Tuple2('ちびり', 'ちびり'),
			_Utils_Tuple2('うすら', '薄ら－'),
			_Utils_Tuple2('のびた', '伸びた'),
			_Utils_Tuple2('ひくい', '低い'),
			_Utils_Tuple2('まぶか', '目深'),
			_Utils_Tuple2('あさい', '浅い'),
			_Utils_Tuple2('あつい', '厚い'),
			_Utils_Tuple2('はるか', 'はるか'),
			_Utils_Tuple2('わいど', 'ワイド'),
			_Utils_Tuple2('せまい', '狭い'),
			_Utils_Tuple2('ふとい', '太い'),
			_Utils_Tuple2('ほそい', '細い'),
			_Utils_Tuple2('すりむ', 'スリム'),
			_Utils_Tuple2('だいの', '大の'),
			_Utils_Tuple2('でかい', 'でかい'),
			_Utils_Tuple2('びっぐ', 'ビッグ'),
			_Utils_Tuple2('びさい', '微細'),
			_Utils_Tuple2('かすか', 'かすか'),
			_Utils_Tuple2('ほのか', 'ほのか'),
			_Utils_Tuple2('さいび', '細微'),
			_Utils_Tuple2('てばや', '手早'),
			_Utils_Tuple2('きびん', '機敏'),
			_Utils_Tuple2('やおら', 'やおら'),
			_Utils_Tuple2('そろり', 'そろり'),
			_Utils_Tuple2('ちどん', '遅鈍'),
			_Utils_Tuple2('かるい', '軽い'),
			_Utils_Tuple2('おもげ', '重げ'),
			_Utils_Tuple2('かるげ', '軽げ'),
			_Utils_Tuple2('おんわ', '温和'),
			_Utils_Tuple2('ぬるい', 'ぬるい'),
			_Utils_Tuple2('ぬくい', 'ぬくい'),
			_Utils_Tuple2('くうる', 'クール'),
			_Utils_Tuple2('ひえた', '冷えた'),
			_Utils_Tuple2('さむい', '寒い'),
			_Utils_Tuple2('ぐらい', '－ぐらい'),
			_Utils_Tuple2('さほど', 'さほど'),
			_Utils_Tuple2('かほど', 'かほど'),
			_Utils_Tuple2('いかに', 'いかに'),
			_Utils_Tuple2('さまで', 'さまで'),
			_Utils_Tuple2('さしも', 'さしも'),
			_Utils_Tuple2('むりょ', '無慮'),
			_Utils_Tuple2('ざっと', 'ざっと'),
			_Utils_Tuple2('ものの', 'ものの'),
			_Utils_Tuple2('たかが', '高が'),
			_Utils_Tuple2('ゆうに', '優に'),
			_Utils_Tuple2('せめて', 'せめて'),
			_Utils_Tuple2('たった', 'たった'),
			_Utils_Tuple2('もっと', 'もっと'),
			_Utils_Tuple2('おろか', 'おろか'),
			_Utils_Tuple2('わりに', '割に'),
			_Utils_Tuple2('わりと', '割と'),
			_Utils_Tuple2('よほど', 'よほど'),
			_Utils_Tuple2('だいぶ', '大分'),
			_Utils_Tuple2('かなり', 'かなり'),
			_Utils_Tuple2('ずんと', 'ずんと'),
			_Utils_Tuple2('じつに', '実に'),
			_Utils_Tuple2('ほんに', '本に'),
			_Utils_Tuple2('ばかに', 'ばかに'),
			_Utils_Tuple2('いやに', 'いやに'),
			_Utils_Tuple2('やけに', 'やけに'),
			_Utils_Tuple2('むやみ', 'むやみ'),
			_Utils_Tuple2('やたら', 'やたら'),
			_Utils_Tuple2('とても', 'とても'),
			_Utils_Tuple2('ひどく', 'ひどく'),
			_Utils_Tuple2('えらく', 'えらく'),
			_Utils_Tuple2('えらい', 'えらい'),
			_Utils_Tuple2('てんで', 'てんで'),
			_Utils_Tuple2('ごうも', '毫も'),
			_Utils_Tuple2('ずぶの', 'ずぶの'),
			_Utils_Tuple2('ろくに', 'ろくに'),
			_Utils_Tuple2('なにも', '何も'),
			_Utils_Tuple2('とんと', 'とんと'),
			_Utils_Tuple2('たえて', '絶えて'),
			_Utils_Tuple2('なべて', 'なべて'),
			_Utils_Tuple2('ずくめ', '－ずくめ'),
			_Utils_Tuple2('どれも', 'どれも'),
			_Utils_Tuple2('あげて', '挙げて'),
			_Utils_Tuple2('さとい', 'さとい'),
			_Utils_Tuple2('たかん', '多感'),
			_Utils_Tuple2('うかつ', 'うかつ'),
			_Utils_Tuple2('そぞろ', 'そぞろ'),
			_Utils_Tuple2('すずろ', 'すずろ'),
			_Utils_Tuple2('うたた', 'うたた'),
			_Utils_Tuple2('ぞっと', 'ぞっと'),
			_Utils_Tuple2('けむい', '煙い'),
			_Utils_Tuple2('かゆい', 'かゆい'),
			_Utils_Tuple2('じんと', 'じんと'),
			_Utils_Tuple2('ちくり', 'ちくり'),
			_Utils_Tuple2('びくり', 'びくり'),
			_Utils_Tuple2('どきん', 'どきん'),
			_Utils_Tuple2('がつん', 'がつん'),
			_Utils_Tuple2('あぜん', '唖然'),
			_Utils_Tuple2('くちい', 'くちい'),
			_Utils_Tuple2('だるい', 'だるい'),
			_Utils_Tuple2('とぜん', '徒然'),
			_Utils_Tuple2('ねむい', '眠い'),
			_Utils_Tuple2('おねむ', 'おねむ'),
			_Utils_Tuple2('しぶい', '渋い'),
			_Utils_Tuple2('ぶきみ', '不気味'),
			_Utils_Tuple2('みじめ', '惨め'),
			_Utils_Tuple2('むざん', '無残・無惨'),
			_Utils_Tuple2('おしい', '惜しい'),
			_Utils_Tuple2('きがる', '気軽'),
			_Utils_Tuple2('のんき', 'のんき'),
			_Utils_Tuple2('のどか', 'のどか'),
			_Utils_Tuple2('にがい', '苦い'),
			_Utils_Tuple2('きおも', '気重'),
			_Utils_Tuple2('つらい', 'つらい'),
			_Utils_Tuple2('ひつう', '悲痛'),
			_Utils_Tuple2('あかず', '飽かず'),
			_Utils_Tuple2('でずき', '出好き'),
			_Utils_Tuple2('ぎらい', '－嫌い'),
			_Utils_Tuple2('かれん', '可憐'),
			_Utils_Tuple2('ふびん', '不憫・不愍'),
			_Utils_Tuple2('あたら', 'あたら'),
			_Utils_Tuple2('いんき', '陰気'),
			_Utils_Tuple2('ぶぜん', '憮然'),
			_Utils_Tuple2('むっと', 'むっと'),
			_Utils_Tuple2('きっと', 'きっと'),
			_Utils_Tuple2('つんと', 'つんと'),
			_Utils_Tuple2('よよと', 'よよと'),
			_Utils_Tuple2('ぼうだ', '滂沱'),
			_Utils_Tuple2('にこり', 'にこり'),
			_Utils_Tuple2('にたり', 'にたり'),
			_Utils_Tuple2('にやり', 'にやり'),
			_Utils_Tuple2('ほんき', '本気'),
			_Utils_Tuple2('いちず', 'いちず'),
			_Utils_Tuple2('しいて', '強いて'),
			_Utils_Tuple2('たって', 'たって'),
			_Utils_Tuple2('まげて', 'まげて'),
			_Utils_Tuple2('おして', '押して'),
			_Utils_Tuple2('やっき', '躍起'),
			_Utils_Tuple2('じみち', '地道'),
			_Utils_Tuple2('とくと', 'とくと'),
			_Utils_Tuple2('けなげ', 'けなげ'),
			_Utils_Tuple2('こまめ', 'こまめ'),
			_Utils_Tuple2('てまめ', '手まめ'),
			_Utils_Tuple2('ずぼら', 'ずぼら'),
			_Utils_Tuple2('せつに', '切に'),
			_Utils_Tuple2('ひらに', '平に'),
			_Utils_Tuple2('かよく', '寡欲'),
			_Utils_Tuple2('あこぎ', 'あこぎ'),
			_Utils_Tuple2('どけち', 'どけち'),
			_Utils_Tuple2('しわい', 'しわい'),
			_Utils_Tuple2('うかぬ', '浮かぬ'),
			_Utils_Tuple2('いつに', '一に'),
			_Utils_Tuple2('きぜん', '毅然'),
			_Utils_Tuple2('だんこ', '断固'),
			_Utils_Tuple2('わざと', 'わざと'),
			_Utils_Tuple2('じざい', '自在'),
			_Utils_Tuple2('むげに', '無下に'),
			_Utils_Tuple2('そほん', '粗笨'),
			_Utils_Tuple2('そだい', '粗大'),
			_Utils_Tuple2('ずさん', '杜撰'),
			_Utils_Tuple2('とある', 'とある'),
			_Utils_Tuple2('あらぬ', 'あらぬ'),
			_Utils_Tuple2('さらぬ', 'さらぬ'),
			_Utils_Tuple2('たしか', '確か'),
			_Utils_Tuple2('じめい', '自明'),
			_Utils_Tuple2('しれた', '知れた'),
			_Utils_Tuple2('ふかち', '不可知'),
			_Utils_Tuple2('うさん', 'うさん'),
			_Utils_Tuple2('くさい', '臭い'),
			_Utils_Tuple2('うろん', 'うろん'),
			_Utils_Tuple2('けげん', 'けげん'),
			_Utils_Tuple2('くしき', 'くしき'),
			_Utils_Tuple2('むいぎ', '無意義'),
			_Utils_Tuple2('むいみ', '無意味'),
			_Utils_Tuple2('むかち', '無価値'),
			_Utils_Tuple2('じろり', 'じろり'),
			_Utils_Tuple2('むくち', '無口'),
			_Utils_Tuple2('ぐれつ', '愚劣'),
			_Utils_Tuple2('けちな', 'けちな'),
			_Utils_Tuple2('ちんけ', 'ちんけ'),
			_Utils_Tuple2('げれつ', '下劣'),
			_Utils_Tuple2('げびた', '下卑た'),
			_Utils_Tuple2('ひわい', '卑猥'),
			_Utils_Tuple2('いんび', '淫靡'),
			_Utils_Tuple2('えっち', 'エッチ'),
			_Utils_Tuple2('さびた', 'さびた'),
			_Utils_Tuple2('みやび', 'みやび'),
			_Utils_Tuple2('てんが', '典雅'),
			_Utils_Tuple2('こうが', '高雅'),
			_Utils_Tuple2('おんが', '温雅'),
			_Utils_Tuple2('こった', '凝った'),
			_Utils_Tuple2('あじな', '味な'),
			_Utils_Tuple2('ぶこつ', '無骨'),
			_Utils_Tuple2('ぶざま', 'ぶざま'),
			_Utils_Tuple2('そぼく', '素朴'),
			_Utils_Tuple2('けばい', 'けばい'),
			_Utils_Tuple2('ねずの', '寝ずの'),
			_Utils_Tuple2('ずいと', 'ずいと'),
			_Utils_Tuple2('がばと', 'がばと'),
			_Utils_Tuple2('むずと', 'むずと'),
			_Utils_Tuple2('のそり', 'のそり'),
			_Utils_Tuple2('ああん', 'ああん'),
			_Utils_Tuple2('ぱくり', 'ぱくり'),
			_Utils_Tuple2('ぺろり', 'ぺろり'),
			_Utils_Tuple2('ぱちり', 'ぱちり'),
			_Utils_Tuple2('すなお', '素直'),
			_Utils_Tuple2('まじめ', 'まじめ'),
			_Utils_Tuple2('りちぎ', '律儀・律義'),
			_Utils_Tuple2('ごうき', '剛毅'),
			_Utils_Tuple2('ふくつ', '不屈'),
			_Utils_Tuple2('がんこ', '頑固'),
			_Utils_Tuple2('えこじ', 'えこじ'),
			_Utils_Tuple2('きばや', '気早'),
			_Utils_Tuple2('きなが', '気長'),
			_Utils_Tuple2('いなせ', 'いなせ'),
			_Utils_Tuple2('かちき', '勝ち気'),
			_Utils_Tuple2('きえい', '気鋭'),
			_Utils_Tuple2('うちき', '内気'),
			_Utils_Tuple2('ひくつ', '卑屈'),
			_Utils_Tuple2('ちてき', '知的'),
			_Utils_Tuple2('れいり', '怜悧'),
			_Utils_Tuple2('さいり', '犀利'),
			_Utils_Tuple2('ませた', 'ませた'),
			_Utils_Tuple2('ぼんぐ', '凡愚'),
			_Utils_Tuple2('ぐどん', '愚鈍'),
			_Utils_Tuple2('ろどん', '魯鈍'),
			_Utils_Tuple2('とろい', 'とろい'),
			_Utils_Tuple2('まぬけ', '間抜け'),
			_Utils_Tuple2('とんま', 'とんま'),
			_Utils_Tuple2('ぐがん', '具眼'),
			_Utils_Tuple2('できた', 'できた'),
			_Utils_Tuple2('げひん', '下品'),
			_Utils_Tuple2('がさつ', 'がさつ'),
			_Utils_Tuple2('そぼう', '粗暴'),
			_Utils_Tuple2('ずるい', 'ずるい'),
			_Utils_Tuple2('ひれつ', '卑劣'),
			_Utils_Tuple2('みだら', 'みだら'),
			_Utils_Tuple2('ういた', '浮いた'),
			_Utils_Tuple2('たいん', '多淫'),
			_Utils_Tuple2('りんこ', '凛乎'),
			_Utils_Tuple2('りんと', '凛と'),
			_Utils_Tuple2('てあら', '手荒'),
			_Utils_Tuple2('こそく', '姑息'),
			_Utils_Tuple2('はれて', '晴れて'),
			_Utils_Tuple2('しびあ', 'シビア'),
			_Utils_Tuple2('ふりい', 'フリー'),
			_Utils_Tuple2('からい', '辛い'),
			_Utils_Tuple2('むごい', 'むごい'),
			_Utils_Tuple2('いらぬ', '要らぬ'),
			_Utils_Tuple2('ぼろい', 'ぼろい'),
			_Utils_Tuple2('ちゃち', 'ちゃち'),
			_Utils_Tuple2('しけた', 'しけた'),
			_Utils_Tuple2('さだか', '定か'),
			_Utils_Tuple2('さやか', 'さやか'),
			_Utils_Tuple2('あわい', '淡い'),
			_Utils_Tuple2('しろい', '白い'),
			_Utils_Tuple2('くろい', '黒い'),
			_Utils_Tuple2('あかい', '赤い'),
			_Utils_Tuple2('ぼけた', 'ぼけた'),
			_Utils_Tuple2('しずか', '静か'),
			_Utils_Tuple2('さえた', 'さえた'),
			_Utils_Tuple2('がたん', 'がたん'),
			_Utils_Tuple2('ごとり', 'ごとり'),
			_Utils_Tuple2('ことん', 'ことん'),
			_Utils_Tuple2('ごとん', 'ごとん'),
			_Utils_Tuple2('かちり', 'かちり'),
			_Utils_Tuple2('がちり', 'がちり'),
			_Utils_Tuple2('かちん', 'かちん'),
			_Utils_Tuple2('がちん', 'がちん'),
			_Utils_Tuple2('こつり', 'こつり'),
			_Utils_Tuple2('ごつり', 'ごつり'),
			_Utils_Tuple2('こつん', 'こつん'),
			_Utils_Tuple2('ごつん', 'ごつん'),
			_Utils_Tuple2('ぽかり', 'ぽかり'),
			_Utils_Tuple2('かあん', 'かあん'),
			_Utils_Tuple2('があん', 'があん'),
			_Utils_Tuple2('ずしん', 'ずしん'),
			_Utils_Tuple2('すとん', 'すとん'),
			_Utils_Tuple2('ずどん', 'ずどん'),
			_Utils_Tuple2('どさり', 'どさり'),
			_Utils_Tuple2('どしり', 'どしり'),
			_Utils_Tuple2('どしん', 'どしん'),
			_Utils_Tuple2('だあん', 'だあん'),
			_Utils_Tuple2('ぱちん', 'ぱちん'),
			_Utils_Tuple2('ぽきり', 'ぽきり'),
			_Utils_Tuple2('ぽきん', 'ぽきん'),
			_Utils_Tuple2('ぱたん', 'ぱたん'),
			_Utils_Tuple2('こそり', 'こそり'),
			_Utils_Tuple2('ごそり', 'ごそり'),
			_Utils_Tuple2('ばさり', 'ばさり'),
			_Utils_Tuple2('ざらり', 'ざらり'),
			_Utils_Tuple2('ごほん', 'ごほん'),
			_Utils_Tuple2('ざぶり', 'ざぶり'),
			_Utils_Tuple2('ざぶん', 'ざぶん'),
			_Utils_Tuple2('どぶん', 'どぶん'),
			_Utils_Tuple2('ぷんと', 'ぷんと'),
			_Utils_Tuple2('えぐい', 'えぐい'),
			_Utils_Tuple2('えごい', 'えごい'),
			_Utils_Tuple2('くどい', 'くどい'),
			_Utils_Tuple2('すんだ', '澄んだ'),
			_Utils_Tuple2('ねばい', '粘い'),
			_Utils_Tuple2('とろり', 'とろり'),
			_Utils_Tuple2('とろん', 'とろん'),
			_Utils_Tuple2('どろり', 'どろり'),
			_Utils_Tuple2('どろん', 'どろん'),
			_Utils_Tuple2('ぬるり', 'ぬるり'),
			_Utils_Tuple2('もろい', 'もろい'),
			_Utils_Tuple2('しとど', 'しとど'),
			_Utils_Tuple2('たらり', 'たらり'),
			_Utils_Tuple2('ぽたり', 'ぽたり'),
			_Utils_Tuple2('とけた', '溶けた'),
			_Utils_Tuple2('うらら', 'うらら'),
			_Utils_Tuple2('はれた', '晴れた'),
			_Utils_Tuple2('あれた', '荒れた'),
			_Utils_Tuple2('こえた', '肥えた'),
			_Utils_Tuple2('やせた', 'やせた'),
			_Utils_Tuple2('はげた', 'はげた'),
			_Utils_Tuple2('すらり', 'すらり'),
			_Utils_Tuple2('こけた', 'こけた'),
			_Utils_Tuple2('ふけた', '老けた'),
			_Utils_Tuple2('かれた', '枯れた'),
			_Utils_Tuple2('および', '及び'),
			_Utils_Tuple2('そして', 'そして'),
			_Utils_Tuple2('もって', 'もって'),
			_Utils_Tuple2('それに', 'それに'),
			_Utils_Tuple2('しかも', 'しかも'),
			_Utils_Tuple2('かつは', '且つは'),
			_Utils_Tuple2('まして', 'まして'),
			_Utils_Tuple2('もので', 'もので'),
			_Utils_Tuple2('だから', 'だから'),
			_Utils_Tuple2('されば', 'されば'),
			_Utils_Tuple2('そこで', 'そこで'),
			_Utils_Tuple2('それで', 'それで'),
			_Utils_Tuple2('ゆえに', '故に'),
			_Utils_Tuple2('ために', 'ために'),
			_Utils_Tuple2('よって', 'よって'),
			_Utils_Tuple2('かくて', 'かくて'),
			_Utils_Tuple2('すると', 'すると'),
			_Utils_Tuple2('ならば', 'ならば'),
			_Utils_Tuple2('つぎに', '次に'),
			_Utils_Tuple2('しかし', 'しかし'),
			_Utils_Tuple2('けれど', 'けれど'),
			_Utils_Tuple2('たけど', 'だけど'),
			_Utils_Tuple2('されど', 'されど'),
			_Utils_Tuple2('くせに', 'くせに'),
			_Utils_Tuple2('なのに', 'なのに'),
			_Utils_Tuple2('または', 'または'),
			_Utils_Tuple2('ただし', 'ただし'),
			_Utils_Tuple2('さても', 'さても'),
			_Utils_Tuple2('ここに', 'ここに'),
			_Utils_Tuple2('なんで', 'なんで'),
			_Utils_Tuple2('なんぞ', 'なんぞ'),
			_Utils_Tuple2('だって', 'だって'),
			_Utils_Tuple2('やんや', 'やんや'),
			_Utils_Tuple2('ははは', 'ははは'),
			_Utils_Tuple2('ふふふ', 'ふふふ'),
			_Utils_Tuple2('へへへ', 'へへへ'),
			_Utils_Tuple2('ほほほ', 'ほほほ'),
			_Utils_Tuple2('あはは', 'あはは'),
			_Utils_Tuple2('わはは', 'わはは'),
			_Utils_Tuple2('うふふ', 'うふふ'),
			_Utils_Tuple2('おほほ', 'おほほ'),
			_Utils_Tuple2('きゃあ', 'きゃあ'),
			_Utils_Tuple2('ぎゃあ', 'ぎゃあ'),
			_Utils_Tuple2('きゃっ', 'きゃっ'),
			_Utils_Tuple2('ぎゃっ', 'ぎゃっ'),
			_Utils_Tuple2('ちぇっ', 'ちぇっ'),
			_Utils_Tuple2('えへん', 'えへん'),
			_Utils_Tuple2('あれえ', 'あれえ'),
			_Utils_Tuple2('あれれ', 'あれれ'),
			_Utils_Tuple2('これは', 'これは'),
			_Utils_Tuple2('へへん', 'へへん'),
			_Utils_Tuple2('へへえ', 'へへえ'),
			_Utils_Tuple2('うわあ', 'うわあ'),
			_Utils_Tuple2('ははあ', 'ははあ'),
			_Utils_Tuple2('ふふん', 'ふふん'),
			_Utils_Tuple2('はてな', 'はてな'),
			_Utils_Tuple2('まてよ', '待てよ'),
			_Utils_Tuple2('とほほ', 'とほほ'),
			_Utils_Tuple2('なあに', 'なあに'),
			_Utils_Tuple2('しめた', 'しめた'),
			_Utils_Tuple2('あのう', 'あのう'),
			_Utils_Tuple2('ええと', 'ええと'),
			_Utils_Tuple2('えいっ', 'えいっ'),
			_Utils_Tuple2('えいや', 'えいや'),
			_Utils_Tuple2('せえの', 'せえの'),
			_Utils_Tuple2('わっせ', 'わっせ'),
			_Utils_Tuple2('ふれえ', 'フレー'),
			_Utils_Tuple2('いいぞ', 'いいぞ'),
			_Utils_Tuple2('むろん', '無論'),
			_Utils_Tuple2('まさか', 'まさか'),
			_Utils_Tuple2('よもや', 'よもや'),
			_Utils_Tuple2('もしや', 'もしや'),
			_Utils_Tuple2('さぞや', 'さぞや'),
			_Utils_Tuple2('そりゃ', 'そりゃ'),
			_Utils_Tuple2('とかく', 'とかく'),
			_Utils_Tuple2('どうも', 'どうも'),
			_Utils_Tuple2('なにせ', '何せ'),
			_Utils_Tuple2('なんせ', '何せ'),
			_Utils_Tuple2('どうせ', 'どうせ'),
			_Utils_Tuple2('いっそ', 'いっそ'),
			_Utils_Tuple2('かぜん', '果然'),
			_Utils_Tuple2('さては', 'さては'),
			_Utils_Tuple2('なんだ', 'なんだ'),
			_Utils_Tuple2('さすが', 'さすが'),
			_Utils_Tuple2('なんと', 'なんと'),
			_Utils_Tuple2('どうぞ', 'どうぞ'),
			_Utils_Tuple2('ふして', '伏して'),
			_Utils_Tuple2('もしも', 'もしも'),
			_Utils_Tuple2('もしか', 'もしか'),
			_Utils_Tuple2('たとい', 'たとい'),
			_Utils_Tuple2('よしや', 'よしや'),
			_Utils_Tuple2('よくも', 'よくも'),
			_Utils_Tuple2('よくぞ', 'よくぞ'),
			_Utils_Tuple2('それは', 'それは'),
			_Utils_Tuple2('あのね', 'あのね'),
			_Utils_Tuple2('こりゃ', 'こりゃ'),
			_Utils_Tuple2('やあい', 'やあい'),
			_Utils_Tuple2('わあい', 'わあい'),
			_Utils_Tuple2('まった', '待った'),
			_Utils_Tuple2('ははっ', 'ははっ'),
			_Utils_Tuple2('まあね', 'まあね'),
			_Utils_Tuple2('いいえ', 'いいえ'),
			_Utils_Tuple2('ううん', 'ううん'),
			_Utils_Tuple2('いいや', 'いいや'),
			_Utils_Tuple2('なにを', 'なにを'),
			_Utils_Tuple2('あかん', 'あかん'),
			_Utils_Tuple2('したり', 'したり'),
			_Utils_Tuple2('さらば', 'さらば'),
			_Utils_Tuple2('あばよ', 'あばよ'),
			_Utils_Tuple2('ちゃお', 'チャオ'),
			_Utils_Tuple2('ふいつ', '不一・不乙'),
			_Utils_Tuple2('きづけ', '気付'),
			_Utils_Tuple2('すめら', '皇－')
		]));
var $author$project$Main$findGoal = A2(
	$elm$random$Random$generate,
	$author$project$Main$NewGoal,
	A2(
		$elm$random$Random$int,
		0,
		$elm$core$List$length(
			$elm$core$Dict$keys($author$project$Main$words)) - 1));
var $author$project$Main$NewStart = function (a) {
	return {$: 'NewStart', a: a};
};
var $author$project$Main$findStart = A2(
	$elm$random$Random$generate,
	$author$project$Main$NewStart,
	A2(
		$elm$random$Random$int,
		0,
		$elm$core$List$length(
			$elm$core$Dict$keys($author$project$Main$words)) - 1));
var $author$project$Main$init = function (_v0) {
	return _Utils_Tuple2(
		A7($author$project$Main$Model, '', '', '', '', '', '', 0),
		$elm$core$Platform$Cmd$batch(
			_List_fromArray(
				[$author$project$Main$findStart, $author$project$Main$findGoal])));
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $author$project$Main$subscriptions = function (model) {
	return $elm$core$Platform$Sub$none;
};
var $elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
			var jsArray = _v0.a;
			var remainingItems = _v0.b;
			if (_Utils_cmp(
				$elm$core$Elm$JsArray$length(jsArray),
				$elm$core$Array$branchFactor) < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					true,
					{nodeList: nodeList, nodeListSize: nodeListSize, tail: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					$elm$core$List$cons,
					$elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return A3($elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Basics$ge = _Utils_ge;
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (_v0.$ === 'SubTree') {
				var subTree = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _v0.a;
				return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
			}
		}
	});
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$get = F2(
	function (index, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
			A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
			A3($elm$core$Array$getHelp, startShift, index, tree)));
	});
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (_v0.$ === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Main$procStr = function (key) {
	return A2(
		$elm$core$Maybe$withDefault,
		'',
		A2($elm$core$Dict$get, key, $author$project$Main$words)) + ('(' + (key + ')'));
};
var $elm$core$String$right = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(
			$elm$core$String$slice,
			-n,
			$elm$core$String$length(string),
			string);
	});
var $author$project$Main$toBigLetter = function (letter) {
	switch (letter) {
		case 'ゃ':
			return 'や';
		case 'ゅ':
			return 'ゆ';
		case 'ょ':
			return 'よ';
		case 'ぁ':
			return 'あ';
		case 'ぃ':
			return 'い';
		case 'ぅ':
			return 'う';
		case 'ぇ':
			return 'え';
		case 'ぉ':
			return 'お';
		default:
			return letter;
	}
};
var $author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'Roll':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{inputWords: 0, message: ''}),
					$elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[$author$project$Main$findStart, $author$project$Main$findGoal])));
			case 'NewStart':
				var newStart = msg.a;
				var ret = A2(
					$elm$core$Maybe$withDefault,
					'',
					A2(
						$elm$core$Array$get,
						newStart,
						$elm$core$Array$fromList(
							$elm$core$Dict$keys($author$project$Main$words))));
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							history: $author$project$Main$procStr(ret),
							lastLetter: A2($elm$core$String$right, 1, ret),
							startWord: ret
						}),
					$elm$core$Platform$Cmd$none);
			case 'NewGoal':
				var newGoal = msg.a;
				var ret = A2(
					$elm$core$Maybe$withDefault,
					'',
					A2(
						$elm$core$Array$get,
						newGoal,
						$elm$core$Array$fromList(
							$elm$core$Dict$keys($author$project$Main$words))));
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{goalWord: ret}),
					$elm$core$Platform$Cmd$none);
			default:
				var change = msg.a;
				return ($elm$core$String$length(change) === 3) ? (A2($elm$core$Dict$member, change, $author$project$Main$words) ? (_Utils_eq(
					model.lastLetter,
					A2($elm$core$String$left, 1, change)) ? ((A2($elm$core$String$right, 1, change) !== 'ん') ? (_Utils_eq(change, model.goalWord) ? _Utils_Tuple2(
					_Utils_update(
						model,
						{
							editingStr: change,
							message: 'クリア！手数は' + ($elm$core$String$fromInt(model.inputWords + 1) + 'でした')
						}),
					$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
					_Utils_update(
						model,
						{
							editingStr: '',
							history: $author$project$Main$procStr(change) + ('<-' + model.history),
							inputWords: model.inputWords + 1,
							lastLetter: $author$project$Main$toBigLetter(
								A2($elm$core$String$right, 1, change)),
							message: 'OK'
						}),
					$elm$core$Platform$Cmd$none)) : _Utils_Tuple2(
					_Utils_update(
						model,
						{editingStr: change, message: 'んで終わる単語です'}),
					$elm$core$Platform$Cmd$none)) : _Utils_Tuple2(
					_Utils_update(
						model,
						{editingStr: change, message: '前の単語の最後の文字で始めてください'}),
					$elm$core$Platform$Cmd$none)) : _Utils_Tuple2(
					_Utils_update(
						model,
						{editingStr: change, message: '辞書にない単語ですm(_)m'}),
					$elm$core$Platform$Cmd$none)) : _Utils_Tuple2(
					_Utils_update(
						model,
						{editingStr: change, message: '三文字の単語を入力してください'}),
					$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Main$Change = function (a) {
	return {$: 'Change', a: a};
};
var $author$project$Main$Roll = {$: 'Roll'};
var $elm$html$Html$a = _VirtualDom_node('a');
var $elm$html$Html$br = _VirtualDom_node('br');
var $elm$html$Html$button = _VirtualDom_node('button');
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$html$Html$h1 = _VirtualDom_node('h1');
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $elm$html$Html$input = _VirtualDom_node('input');
var $elm$html$Html$li = _VirtualDom_node('li');
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$json$Json$Decode$string = _Json_decodeString;
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm$html$Html$p = _VirtualDom_node('p');
var $elm$html$Html$Attributes$placeholder = $elm$html$Html$Attributes$stringProperty('placeholder');
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $elm$html$Html$ul = _VirtualDom_node('ul');
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $author$project$Main$view = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h1,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('三文字しりとりゲーム')
					])),
				A2(
				$elm$html$Html$p,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(
						'「' + ($author$project$Main$procStr(model.startWord) + ('」から「' + ($author$project$Main$procStr(model.goalWord) + '」につなげてください'))))
					])),
				A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Events$onClick($author$project$Main$Roll)
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('新しいお題')
					])),
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$input,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$placeholder('文字を入力'),
								$elm$html$Html$Attributes$value(model.editingStr),
								$elm$html$Html$Events$onInput($author$project$Main$Change)
							]),
						_List_Nil)
					])),
				A2(
				$elm$html$Html$p,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(model.message)
					])),
				A2(
				$elm$html$Html$p,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(model.history)
					])),
				A2($elm$html$Html$br, _List_Nil, _List_Nil),
				A2(
				$elm$html$Html$ul,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('ルール')
					])),
				A2(
				$elm$html$Html$li,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('三文字の単語でしりとり')
					])),
				A2(
				$elm$html$Html$li,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('濁音・半濁音は清音と区別する')
					])),
				A2(
				$elm$html$Html$li,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('地名は使えない')
					])),
				A2(
				$elm$html$Html$li,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('カタカナ語の収録数は少なめ')
					])),
				A2(
				$elm$html$Html$p,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('辞書の出典：'),
						A2(
						$elm$html$Html$a,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$href('https://github.com/masayu-a/WLSP')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('『分類語彙表増補改訂版データベース』（ver.1.0.1）')
							]))
					]))
			]));
};
var $author$project$Main$main = $elm$browser$Browser$element(
	{init: $author$project$Main$init, subscriptions: $author$project$Main$subscriptions, update: $author$project$Main$update, view: $author$project$Main$view});
_Platform_export({'Main':{'init':$author$project$Main$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));