'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderScriptError = exports.renderScript = exports.renderError = exports.render = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var render = exports.render = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, pathname, query, opts) {
    var html;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return renderToHTML(req, res, pathname, opts);

          case 2:
            html = _context.sent;

            sendHTML(req, res, html, req.method);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function render(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

var renderError = exports.renderError = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(err, req, res, pathname, query, opts) {
    var html;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return renderErrorToHTML(err, req, res, query, opts);

          case 2:
            html = _context2.sent;

            sendHTML(req, res, html, req.method);

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function renderError(_x6, _x7, _x8, _x9, _x10, _x11) {
    return _ref2.apply(this, arguments);
  };
}();

var doRender = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, pathname, query) {
    var _ref4 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {},
        err = _ref4.err,
        page = _ref4.page,
        buildId = _ref4.buildId,
        buildStats = _ref4.buildStats,
        hotReloader = _ref4.hotReloader,
        assetPrefix = _ref4.assetPrefix,
        _ref4$dir = _ref4.dir,
        dir = _ref4$dir === undefined ? process.cwd() : _ref4$dir,
        _ref4$dev = _ref4.dev,
        dev = _ref4$dev === undefined ? false : _ref4$dev,
        _ref4$staticMarkup = _ref4.staticMarkup,
        staticMarkup = _ref4$staticMarkup === undefined ? false : _ref4$staticMarkup;

    var dist, _ref5, _ref6, Component, Document, ctx, props, renderPage, docProps, doc;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            page = page || pathname;

            _context3.next = 3;
            return ensurePage(page, { dir: dir, hotReloader: hotReloader });

          case 3:
            dist = (0, _config2.default)(dir).distDir;
            _context3.next = 6;
            return _promise2.default.all([(0, _require2.default)((0, _path.join)(dir, dist, 'dist', 'pages', page)), (0, _require2.default)((0, _path.join)(dir, dist, 'dist', 'pages', '_document'))]);

          case 6:
            _ref5 = _context3.sent;
            _ref6 = (0, _slicedToArray3.default)(_ref5, 2);
            Component = _ref6[0];
            Document = _ref6[1];

            Component = Component.default || Component;
            Document = Document.default || Document;
            ctx = { err: err, req: req, res: res, pathname: pathname, query: query };
            _context3.next = 15;
            return (0, _utils.loadGetInitialProps)(Component, ctx);

          case 15:
            props = _context3.sent;

            if (!res.finished) {
              _context3.next = 18;
              break;
            }

            return _context3.abrupt('return');

          case 18:
            renderPage = function renderPage() {
              var app = (0, _react.createElement)(_app2.default, {
                Component: Component,
                props: props,
                router: new _router.Router(pathname, query)
              });

              var render = staticMarkup ? _server.renderToStaticMarkup : _server.renderToString;

              var html = void 0;
              var head = void 0;
              var errorHtml = '';
              try {
                html = render(app);
              } finally {
                head = _head2.default.rewind() || (0, _head.defaultHead)();
              }

              if (err && dev) {
                errorHtml = render((0, _react.createElement)(_errorDebug2.default, { error: err }));
              }

              return { html: html, head: head, errorHtml: errorHtml };
            };

            _context3.next = 21;
            return (0, _utils.loadGetInitialProps)(Document, (0, _extends3.default)({}, ctx, { renderPage: renderPage }));

          case 21:
            docProps = _context3.sent;

            if (!res.finished) {
              _context3.next = 24;
              break;
            }

            return _context3.abrupt('return');

          case 24:
            doc = (0, _react.createElement)(Document, (0, _extends3.default)({
              __NEXT_DATA__: {
                props: props,
                pathname: pathname,
                query: query,
                buildId: buildId,
                buildStats: buildStats,
                assetPrefix: assetPrefix,
                err: err && dev ? errorToJSON(err) : null
              },
              dev: dev,
              staticMarkup: staticMarkup
            }, docProps));
            return _context3.abrupt('return', '<!DOCTYPE html>' + (0, _server.renderToStaticMarkup)(doc));

          case 26:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function doRender(_x14, _x15, _x16, _x17) {
    return _ref3.apply(this, arguments);
  };
}();

var renderScript = exports.renderScript = function () {
  var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res, page, opts) {
    var path, realPath;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log('renderScript', page, opts);
            /*
             / { dev: true,
             staticMarkup: false,
             dir: '/Users/foo/../next.js/examples/hello-world',
             hotReloader:
             HotReloader {
               dir: '/Users/foo/../next.js/examples/hello-world',
               quiet: false,
               middlewares: [ [Object], [Object], [Function] ],
               webpackDevMiddleware:
                 { [Function: webpackDevMiddleware]
                 getFilenameFromUrl: [Function: bound getFilenameFromUrl],
                 waitUntilValid: [Function: waitUntilValid],
                 invalidate: [Function: invalidate],
                 close: [Function: close],
                 fileSystem: [Object] },
                 webpackHotMiddleware: { [Function: middleware] publish: [Function: publish] },
               initialized: true,
               stats:
                 Stats {
                   compilation: [Object],
                   hash: 'd3040fec7a971d92c64f',
                   startTime: 1492577423414,
                   endTime: 1492577425767 },
               compilationErrors: Map { _c: Map {} },
               prevAssets:
                 { 'dist/pages/_document.js': [Object],
                 'dist/pages/_error.js': [Object],
                 'dist/pages/index.js': [Object],
                 'commons.js': [Object],
                 'main.js': [Object],
                 'bundles/pages/_error.js': [Object],
                 'bundles/pages/_document.js': [Object],
                 'manifest.js': [Object],
                 'bundles/pages/index.js': [Object],
                 '0.7599f3af8a0b24a6d8d6.hot-update.js': [Object],
                 '7599f3af8a0b24a6d8d6.hot-update.json': [Object] },
               prevChunkNames: Set { _c: [Object] },
               prevFailedChunkNames: Set { _c: Set {} },
               prevChunkHashes: Map { _c: [Object] },
               config:
                 { webpack: null,
                 poweredByHeader: true,
                 distDir: 'build',
                 assetPrefix: '' },
               onDemandEntries:
                 { ensurePage: [Function: ensurePage],
                 middleware: [Function: middleware] } },
                 buildStats: null,
                 buildId: '-',
                 assetPrefix: '' }
             */
            _context4.prev = 1;
            path = (0, _path.join)(opts.dir, '.next', 'bundles', 'pages', page);
            _context4.next = 5;
            return (0, _resolve2.default)(path);

          case 5:
            realPath = _context4.sent;
            _context4.next = 8;
            return serveStatic(req, res, realPath);

          case 8:
            _context4.next = 16;
            break;

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4['catch'](1);

            if (!(_context4.t0.code === 'ENOENT')) {
              _context4.next = 15;
              break;
            }

            renderScriptError(req, res, page, _context4.t0, {}, opts);
            return _context4.abrupt('return');

          case 15:
            throw _context4.t0;

          case 16:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this, [[1, 10]]);
  }));

  return function renderScript(_x18, _x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();

var renderScriptError = exports.renderScriptError = function () {
  var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(req, res, page, error, customFields, opts) {
    var errorJson;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!(error.code === 'ENOENT')) {
              _context5.next = 4;
              break;
            }

            res.setHeader('Content-Type', 'text/javascript');
            res.end('\n      window.__NEXT_REGISTER_PAGE(\'' + page + '\', function() {\n        var error = new Error(\'Page does not exist: ' + page + '\')\n        error.statusCode = 404\n\n        return { error: error }\n      })\n    ');
            return _context5.abrupt('return');

          case 4:

            res.setHeader('Content-Type', 'text/javascript');
            errorJson = (0, _extends3.default)({}, errorToJSON(error), customFields);


            res.end('\n    window.__NEXT_REGISTER_PAGE(\'' + page + '\', function() {\n      var error = ' + (0, _stringify2.default)(errorJson) + '\n      return { error: error }\n    })\n  ');

          case 7:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function renderScriptError(_x22, _x23, _x24, _x25, _x26, _x27) {
    return _ref8.apply(this, arguments);
  };
}();

var ensurePage = function () {
  var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(page, _ref9) {
    var dir = _ref9.dir,
        hotReloader = _ref9.hotReloader;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (hotReloader) {
              _context6.next = 2;
              break;
            }

            return _context6.abrupt('return');

          case 2:
            if (!(page === '_error' || page === '_document')) {
              _context6.next = 4;
              break;
            }

            return _context6.abrupt('return');

          case 4:
            _context6.next = 6;
            return hotReloader.ensurePage(page);

          case 6:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function ensurePage(_x28, _x29) {
    return _ref10.apply(this, arguments);
  };
}();

exports.renderToHTML = renderToHTML;
exports.renderErrorToHTML = renderErrorToHTML;
exports.sendHTML = sendHTML;
exports.sendJSON = sendJSON;
exports.serveStatic = serveStatic;

var _path = require('path');

var _react = require('react');

var _server = require('react-dom/server');

var _send = require('send');

var _send2 = _interopRequireDefault(_send);

var _etag = require('etag');

var _etag2 = _interopRequireDefault(_etag);

var _fresh = require('fresh');

var _fresh2 = _interopRequireDefault(_fresh);

var _require = require('./require');

var _require2 = _interopRequireDefault(_require);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _resolve = require('./resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var _router = require('../lib/router');

var _utils = require('../lib/utils');

var _head = require('../lib/head');

var _head2 = _interopRequireDefault(_head);

var _app = require('../lib/app');

var _app2 = _interopRequireDefault(_app);

var _errorDebug = require('../lib/error-debug');

var _errorDebug2 = _interopRequireDefault(_errorDebug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderToHTML(req, res, pathname, query, opts) {
  return doRender(req, res, pathname, query, opts);
}

function renderErrorToHTML(err, req, res, pathname, query) {
  var opts = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

  return doRender(req, res, pathname, query, (0, _extends3.default)({}, opts, { err: err, page: '_error' }));
}

function sendHTML(req, res, html, method) {
  if (res.finished) return;
  var etag = (0, _etag2.default)(html);

  if ((0, _fresh2.default)(req.headers, { etag: etag })) {
    res.statusCode = 304;
    res.end();
    return;
  }

  res.setHeader('ETag', etag);
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(html));
  res.end(method === 'HEAD' ? null : html);
}

function sendJSON(res, obj, method) {
  if (res.finished) return;

  var json = (0, _stringify2.default)(obj);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Length', Buffer.byteLength(json));
  res.end(method === 'HEAD' ? null : json);
}

function errorToJSON(err) {
  var name = err.name,
      message = err.message,
      stack = err.stack;

  var json = { name: name, message: message, stack: stack };

  if (err.module) {
    // rawRequest contains the filename of the module which has the error.
    var rawRequest = err.module.rawRequest;

    json.module = { rawRequest: rawRequest };
  }

  return json;
}

function serveStatic(req, res, path) {
  return new _promise2.default(function (resolve, reject) {
    console.log('serveStatic', path);
    // /Users/foo/../next.js/examples/hello-world/static/images/rebuild.png
    (0, _send2.default)(req, path).on('directory', function () {
      // We don't allow directories to be read.
      var err = new Error('No directory access');
      err.code = 'ENOENT';
      reject(err);
    }).on('error', reject).pipe(res).on('finish', resolve);
  });
}