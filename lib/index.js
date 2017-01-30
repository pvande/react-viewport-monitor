'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recompute = undefined;
exports.default = Wrapper;

var _events = require('./events.js');

var _events2 = _interopRequireDefault(_events);

var _monitor = require('./monitor.js');

var _monitor2 = _interopRequireDefault(_monitor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IDENTITY = function IDENTITY(x) {
  return x;
};

var recompute = exports.recompute = _events2.default.recompute;
function Wrapper(selector) {
  for (var _len = arguments.length, events = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    events[_key - 1] = arguments[_key];
  }

  events = events.length ? events : ['any'];

  return function (component) {
    var _class, _temp;

    var componentName = component.displayName || component.name;

    return _temp = _class = function (_ViewportMonitor) {
      _inherits(_class, _ViewportMonitor);

      function _class(props) {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props, selector || IDENTITY, events));
      }

      return _class;
    }(_monitor2.default), _class.displayName = 'ViewportMonitor(' + componentName + ')', _class.DecoratedComponent = component, _temp;
  };
};