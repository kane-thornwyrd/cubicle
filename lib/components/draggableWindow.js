'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = '/home/kane-thornwyrd/projects/cubicle/src/components/draggableWindow.jsx';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutabilityHelper = require('immutability-helper');

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

var _blessed = require('blessed');

var _blessed2 = _interopRequireDefault(_blessed);

var _DragHandle = require('./DragHandle');

var _DragHandle2 = _interopRequireDefault(_DragHandle);

var _WindowTitle = require('./WindowTitle');

var _WindowTitle2 = _interopRequireDefault(_WindowTitle);

var _WindowContent = require('./WindowContent');

var _WindowContent2 = _interopRequireDefault(_WindowContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const stylesheet = {
  bordered: {
    border: {
      type: 'line'
    },
    style: {
      border: {
        fg: 'lightgrey'
      }
    }
  }
};

class DraggableWindow extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false
    };
    this.mousedown = this.mousedown.bind(this);
  }
  mousedown() {
    this.state = (0, _immutabilityHelper2.default)(this.state, { dragging: { $set: !this.state.dragging } });
    console.log();
    if (this.state.dragging) {
      this.originalHeight = this.refs.container.height;
      this.refs.container.enableDrag();
      this.refs.container.height = 2;
    } else {
      this.refs.container.disableDrag();
      this.refs.container.height = this.originalHeight;
    }
  }
  render() {
    return _react2.default.createElement(
      'box',
      {
        'class': stylesheet.bordered,
        top: '70%',
        width: '30%',
        ref: 'container',
        shadow: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 45
        }
      },
      _react2.default.createElement(_WindowTitle2.default, { title: 'GO GO GO', __source: {
          fileName: _jsxFileName,
          lineNumber: 52
        }
      }),
      _react2.default.createElement(_DragHandle2.default, { mousedown: this.mousedown, __source: {
          fileName: _jsxFileName,
          lineNumber: 53
        }
      }),
      _react2.default.createElement(
        _WindowContent2.default,
        { ref: 'content', __source: {
            fileName: _jsxFileName,
            lineNumber: 54
          }
        },
        this.props.children
      )
    );
  }
}
exports.default = DraggableWindow;