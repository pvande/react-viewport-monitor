'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _events = require('./events.js');

var _events2 = _interopRequireDefault(_events);

var _viewport = require('./viewport.js');

var _viewport2 = _interopRequireDefault(_viewport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ViewportMonitor = function (_React$PureComponent) {
  _inherits(ViewportMonitor, _React$PureComponent);

  function ViewportMonitor(props, selector, events) {
    _classCallCheck(this, ViewportMonitor);

    var _this = _possibleConstructorReturn(this, (ViewportMonitor.__proto__ || Object.getPrototypeOf(ViewportMonitor)).call(this, props));

    _this.refresh = function (viewport) {
      if (_this.lastViewport === viewport) return;

      _this.lastViewport = viewport;
      _this.setState(_this.selector(viewport, _this.props));
    };

    _this.selector = selector;
    _this.events = events;
    _this.state = selector((0, _viewport2.default)(), props);
    return _this;
  }

  _createClass(ViewportMonitor, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      _events2.default.emit('initialize');
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var event = _step.value;
          _events2.default.on(event, this.refresh);
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

      this.refresh((0, _viewport2.default)());
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.events[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var event = _step2.value;
          _events2.default.off(event, this.refresh);
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
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props === nextProps) return;
      if (this.selector.length == 1) return;

      this.setState(this.selector(_viewport2.default, nextProps));
    }
  }, {
    key: 'render',
    value: function render() {
      var Component = this.constructor.DecoratedComponent;
      return _react2.default.createElement(Component, _extends({}, this.props, this.state));
    }
  }]);

  return ViewportMonitor;
}(_react2.default.PureComponent);

exports.default = ViewportMonitor;