'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = '/home/kane-thornwyrd/projects/cubicle/src/components/DragHandle.jsx';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _blessed = require('blessed');

var _blessed2 = _interopRequireDefault(_blessed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var stylesheet = {
  dragHandle: {
    hover: {
      bg: 'grey'
    }
  }
};

var DragHandle = function (_Component) {
  _inherits(DragHandle, _Component);

  function DragHandle() {
    _classCallCheck(this, DragHandle);

    return _possibleConstructorReturn(this, (DragHandle.__proto__ || Object.getPrototypeOf(DragHandle)).apply(this, arguments));
  }

  _createClass(DragHandle, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'text',
        {
          position: {
            top: -1,
            right: 0
          },
          clickable: true,
          style: stylesheet.dragHandle,
          scrollable: false,
          height: 0.5,
          width: 2,
          onMousedown: this.props.mousedown,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 15
          }
        },
        '\u25AC'
      );
    }
  }]);

  return DragHandle;
}(_react.Component);

exports.default = DragHandle;