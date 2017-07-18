'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = '/home/kane-thornwyrd/projects/cubicle/src/components/DragHandle.jsx';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _blessed = require('blessed');

var _blessed2 = _interopRequireDefault(_blessed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const stylesheet = {
  dragHandle: {
    hover: {
      bg: 'grey'
    }
  }
};

class DragHandle extends _react.Component {
  render() {
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
}
exports.default = DragHandle;