'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = '/home/kane-thornwyrd/projects/cubicle/src/components/WindowTitle.jsx';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _blessed = require('blessed');

var _blessed2 = _interopRequireDefault(_blessed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class WindowTitle extends _react.Component {
  render() {
    return _react2.default.createElement(
      'text',
      {
        position: {
          top: -1,
          left: 0
        },
        clickable: true,
        scrollable: false,
        height: 1,
        width: 100 % -3,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 7
        }
      },
      this.props.title
    );
  }
}
exports.default = WindowTitle;