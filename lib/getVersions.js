'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _forgeVersionsComparator = require('forge-versions-comparator');

var _forgeVersionsComparator2 = _interopRequireDefault(_forgeVersionsComparator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var cache = [];
var cacheTimestamp = void 0;
var cacheTime = 36000000;

function forgeParser(body) {
  var out = [];
  for (var entry in body.promos) {
    if (entry.split('-')[0].match(/^(\d\.?){2,}$/)) {
      out.push({
        id: body.promos[entry],
        type: entry.split('-')[1],
        dep: entry.split('-')[0]
      });
    }
  }
  return out.sort(function (a, b) {
    return (0, _forgeVersionsComparator2.default)(a.id, b.id);
  }).reverse();
}

function minecraftParser(body) {
  return body.versions.map(function (v) {
    var id = v.id,
        type = v.type,
        releaseTime = v.releaseTime;

    return {
      id: id,
      type: type,
      dep: '',
      releaseTime: releaseTime
    };
  }).sort(function (a, b) {
    var dateA = new Date(a.releaseTime);
    var dateB = new Date(b.releaseTime);
    if (dateA < dateB) {
      return -1;
    }
    if (dateA > dateB) {
      return 1;
    }
    return 0;
  }).reverse();
}

exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(VERSIONURL, parserName) {
    var getVersion, now;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            getVersion = function getVersion() {
              return new Promise(function (resolve, reject) {
                _request2.default.get({
                  url: VERSIONURL,
                  json: true
                }, function (err, res, body) {
                  if (err) return reject(err);
                  switch (parserName) {
                    case 'forge':
                      resolve(forgeParser(body));
                      break;
                    case 'minecraft':
                    default:
                      resolve(minecraftParser(body));
                  }
                  return undefined;
                });
              });
            };

            now = Date.now();

            cache[parserName] = cache[parserName] || {};

            if (!(!cache[parserName].cacheTimestamp || cache[parserName].cacheTimestamp < now)) {
              _context.next = 14;
              break;
            }

            _context.prev = 4;
            _context.next = 7;
            return getVersion();

          case 7:
            cache[parserName].content = _context.sent;
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](4);
            throw _context.t0;

          case 13:
            cache[parserName].cacheTimestamp = now + cacheTime;

          case 14:
            return _context.abrupt('return', cache[parserName].content);

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[4, 10]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();