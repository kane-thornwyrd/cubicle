'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = '/home/kane-thornwyrd/projects/cubicle/src/components/WindowContent.jsx';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _blessed = require('blessed');

var _blessed2 = _interopRequireDefault(_blessed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class WindowContent extends _react.Component {
  render() {
    return _react2.default.createElement(
      'box',
      {
        position: {
          top: 0,
          left: 0
        },
        scrollable: true,
        height: '100%-2',
        width: '100%-2',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 7
        }
      },
      this.props.children
    );
  }
}
exports.default = WindowContent;