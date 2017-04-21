'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var writeBuildStats = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(dir) {
    var assetHashMap, buildStatsPath;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _promise4.default)((0, _path.join)(dir, '.next', 'app.js'));

          case 2:
            _context2.t0 = _context2.sent;
            _context2.t1 = {
              hash: _context2.t0
            };
            assetHashMap = {
              'app.js': _context2.t1
            };
            buildStatsPath = (0, _path.join)(dir, '.next', 'build-stats.json');
            _context2.next = 8;
            return _fs2.default.writeFile(buildStatsPath, (0, _stringify2.default)(assetHashMap), 'utf8');

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function writeBuildStats(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var writeBuildId = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(dir) {
    var buildIdPath, buildId;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            buildIdPath = (0, _path.join)(dir, '.next', 'BUILD_ID');
            buildId = _uuid2.default.v4();
            _context3.next = 4;
            return _fs2.default.writeFile(buildIdPath, buildId, 'utf8');

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function writeBuildId(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var _os = require('os');

var _path = require('path');

var _fs = require('mz/fs');

var _fs2 = _interopRequireDefault(_fs);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _webpack = require('./webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _replace = require('./replace');

var _replace2 = _interopRequireDefault(_replace);

var _promise3 = require('md5-file/promise');

var _promise4 = _interopRequireDefault(_promise3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// プロジェクトのパスとtmpディレクトリを引数にしてwebpackコンパイルを実行する
// webpack のchunk からハッシュを得られないので、自分で計算して build-stats.jsonに書いておく
// BUILD_ID ファイルにビルドIDを書いておく
// tmpディレクトリにあるビルドされたファイルをdirに移動する
// tmpディレクトリを削除する

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(dir) {
    var buildDir, compiler;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            buildDir = (0, _path.join)((0, _os.tmpdir)(), _uuid2.default.v4());
            _context.next = 3;
            return (0, _webpack2.default)(dir, { buildDir: buildDir });

          case 3:
            compiler = _context.sent;


            console.log('dir', dir);
            // /Users/foo/work/../next.js/examples/hello-world
            console.log('buildDir', buildDir);
            // /var/folders/yk/0kqj_0yx61j66w6z97twplz9t82_y5/T/13193135-bd3b-4b3f-a3ba-ca3fb9c8bce0
            // console.log('compiler', compiler)

            _context.prev = 6;
            _context.next = 9;
            return runCompiler(compiler);

          case 9:
            _context.next = 11;
            return writeBuildStats(buildDir);

          case 11:
            _context.next = 13;
            return writeBuildId(buildDir);

          case 13:
            _context.next = 19;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context['catch'](6);

            console.error('> Failed to build on ' + buildDir);
            throw _context.t0;

          case 19:
            _context.next = 21;
            return (0, _replace2.default)(dir, buildDir);

          case 21:

            // no need to wait
            (0, _del2.default)(buildDir, { force: true });

          case 22:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[6, 15]]);
  }));

  function build(_x) {
    return _ref.apply(this, arguments);
  }

  return build;
}();

function runCompiler(compiler) {
  return new _promise2.default(function (resolve, reject) {
    compiler.run(function (err, stats) {
      if (err) return reject(err);

      var jsonStats = stats.toJson();

      // console.log('stats', stats)
      // console.log('jsonStats', jsonStats)

      if (jsonStats.errors.length > 0) {
        var error = new Error(jsonStats.errors[0]);
        error.errors = jsonStats.errors;
        error.warnings = jsonStats.warnings;
        return reject(error);
      }

      resolve(jsonStats);
    });
  });
}