'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _eventemitter = require('eventemitter3');

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _rafThrottle = require('raf-throttle');

var _rafThrottle2 = _interopRequireDefault(_rafThrottle);

var _viewport = require('./viewport');

var _viewport2 = _interopRequireDefault(_viewport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ViewportEvents = new _eventemitter2.default();
exports.default = ViewportEvents;


var currentViewport = (0, _viewport2.default)();

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  ViewportEvents.once('initialize', function () {
    ViewportEvents.initializeEventListeners = function () {};

    var events = ['resize', 'scroll', 'touchstart', 'touchmove', 'touchend', 'pageshow', 'load'];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var event = _step.value;

        window.addEventListener(event, ViewportEvents.recompute);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  });
} else {
  // TODO: Implement React Native support?
}

ViewportEvents.recompute = (0, _rafThrottle2.default)(function () {
  var nextViewport = (0, _viewport2.default)();

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = Object.keys(nextViewport)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var prop = _step2.value;

      if (currentViewport[prop] != nextViewport[prop]) {
        ViewportEvents.emit(prop, nextViewport);
        ViewportEvents.emit('any', nextViewport);
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  currentViewport = nextViewport;
});