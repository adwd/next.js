'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderError = exports.render = exports.ErrorComponent = exports.router = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var render = exports.render = function () {
  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(props) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(props.err && !props.err.ignore)) {
              _context2.next = 4;
              break;
            }

            _context2.next = 3;
            return renderError(props.err);

          case 3:
            return _context2.abrupt('return');

          case 4:
            _context2.prev = 4;
            _context2.next = 7;
            return doRender(props);

          case 7:
            _context2.next = 15;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2['catch'](4);

            if (!_context2.t0.abort) {
              _context2.next = 13;
              break;
            }

            return _context2.abrupt('return');

          case 13:
            _context2.next = 15;
            return renderError(_context2.t0);

          case 15:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[4, 9]]);
  }));

  return function render(_x) {
    return _ref4.apply(this, arguments);
  };
}();

// This method handles all runtime and debug errors.
// 404 and 500 errors are special kind of errors
// and they are still handle via the main render method.


var renderError = exports.renderError = function () {
  var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(error) {
    var prod, errorMessage, initProps, _props;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            prod = process.env.NODE_ENV === 'production';
            // We need to unmount the current app component because it's
            // in the inconsistant state.
            // Otherwise, we need to face issues when the issue is fixed and
            // it's get notified via HMR

            _reactDom2.default.unmountComponentAtNode(appContainer);

            errorMessage = error.message + '\n' + error.stack;

            console.error(errorMessage);

            if (!prod) {
              _context3.next = 12;
              break;
            }

            initProps = { err: error, pathname: pathname, query: query };
            _context3.next = 8;
            return (0, _utils.loadGetInitialProps)(ErrorComponent, initProps);

          case 8:
            _props = _context3.sent;

            _reactDom2.default.render((0, _react.createElement)(ErrorComponent, _props), errorContainer);
            _context3.next = 13;
            break;

          case 12:
            _reactDom2.default.render((0, _react.createElement)(_errorDebug2.default, { error: error }), errorContainer);

          case 13:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function renderError(_x2) {
    return _ref5.apply(this, arguments);
  };
}();

var doRender = function () {
  var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(_ref6) {
    var Component = _ref6.Component,
        props = _ref6.props,
        hash = _ref6.hash,
        err = _ref6.err,
        emitter = _ref6.emitter;

    var _router, _pathname, _query, appProps;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!(!props && Component && Component !== ErrorComponent && lastAppProps.Component === ErrorComponent)) {
              _context4.next = 5;
              break;
            }

            // fetch props if ErrorComponent was replaced with a page component by HMR
            _router = router, _pathname = _router.pathname, _query = _router.query;
            _context4.next = 4;
            return (0, _utils.loadGetInitialProps)(Component, { err: err, pathname: _pathname, query: _query });

          case 4:
            props = _context4.sent;

          case 5:

            if (emitter) {
              emitter.emit('before-reactdom-render', { Component: Component, ErrorComponent: ErrorComponent });
            }

            Component = Component || lastAppProps.Component;
            props = props || lastAppProps.props;

            appProps = { Component: Component, props: props, hash: hash, err: err, router: router, headManager: headManager };
            // lastAppProps has to be set before ReactDom.render to account for ReactDom throwing an error.

            lastAppProps = appProps;

            // We need to clear any existing runtime error messages
            _reactDom2.default.unmountComponentAtNode(errorContainer);
            _reactDom2.default.render((0, _react.createElement)(_app2.default, appProps), appContainer);

            if (emitter) {
              emitter.emit('after-reactdom-render', { Component: Component, ErrorComponent: ErrorComponent });
            }

          case 13:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function doRender(_x3) {
    return _ref7.apply(this, arguments);
  };
}();

var _react = require('react');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _mitt = require('mitt');

var _mitt2 = _interopRequireDefault(_mitt);

var _headManager = require('./head-manager');

var _headManager2 = _interopRequireDefault(_headManager);

var _router2 = require('../lib/router');

var _app = require('../lib/app');

var _app2 = _interopRequireDefault(_app);

var _utils = require('../lib/utils');

var _errorDebug = require('../lib/error-debug');

var _errorDebug2 = _interopRequireDefault(_errorDebug);

var _pageLoader = require('../lib/page-loader');

var _pageLoader2 = _interopRequireDefault(_pageLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Polyfill Promise globally
// This is needed because Webpack2's dynamic loading(common chunks) code
// depends on Promise.
// So, we need to polyfill it.
// See: https://github.com/webpack/webpack/issues/4254
if (!window.Promise) {
  window.Promise = _promise2.default;
}

var _window = window,
    _window$__NEXT_DATA__ = _window.__NEXT_DATA__,
    props = _window$__NEXT_DATA__.props,
    err = _window$__NEXT_DATA__.err,
    pathname = _window$__NEXT_DATA__.pathname,
    query = _window$__NEXT_DATA__.query,
    buildId = _window$__NEXT_DATA__.buildId,
    assetPrefix = _window$__NEXT_DATA__.assetPrefix,
    location = _window.location;


var pageLoader = new _pageLoader2.default(buildId, assetPrefix);
window.__NEXT_LOADED_PAGES__.forEach(function (_ref) {
  var route = _ref.route,
      fn = _ref.fn;

  pageLoader.registerPage(route, fn);
});
delete window.__NEXT_LOADED_PAGES__;

window.__NEXT_REGISTER_PAGE = pageLoader.registerPage.bind(pageLoader);

var headManager = new _headManager2.default();
var appContainer = document.getElementById('__next');
var errorContainer = document.getElementById('__next-error');

var lastAppProps = void 0;
var router = exports.router = void 0;
var ErrorComponent = exports.ErrorComponent = void 0;
var Component = void 0;

exports.default = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
  var emitter, hash;
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return pageLoader.loadPage('/_error');

        case 2:
          exports.ErrorComponent = ErrorComponent = _context.sent;
          _context.prev = 3;
          _context.next = 6;
          return pageLoader.loadPage(pathname);

        case 6:
          Component = _context.sent;
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context['catch'](3);

          console.error(_context.t0.message + '\n' + _context.t0.stack);
          Component = ErrorComponent;

        case 13:

          exports.router = router = (0, _router2.createRouter)(pathname, query, (0, _utils.getURL)(), {
            pageLoader: pageLoader,
            Component: Component,
            ErrorComponent: ErrorComponent,
            err: err
          });

          emitter = (0, _mitt2.default)();


          router.subscribe(function (_ref3) {
            var Component = _ref3.Component,
                props = _ref3.props,
                hash = _ref3.hash,
                err = _ref3.err;

            render({ Component: Component, props: props, err: err, hash: hash, emitter: emitter });
          });

          hash = location.hash.substring(1);

          render({ Component: Component, props: props, hash: hash, err: err, emitter: emitter });

          return _context.abrupt('return', emitter);

        case 19:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined, [[3, 9]]);
}));