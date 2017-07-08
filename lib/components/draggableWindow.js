'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = '/home/kane-thornwyrd/projects/cubicle/src/components/draggableWindow.jsx';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var stylesheet = {
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

var DraggableWindow = function (_Component) {
  _inherits(DraggableWindow, _Component);

  function DraggableWindow(props) {
    _classCallCheck(this, DraggableWindow);

    var _this = _possibleConstructorReturn(this, (DraggableWindow.__proto__ || Object.getPrototypeOf(DraggableWindow)).call(this, props));

    _this.state = {
      dragging: false
    };
    _this.mousedown = _this.mousedown.bind(_this);
    return _this;
  }

  _createClass(DraggableWindow, [{
    key: 'mousedown',
    value: function mousedown() {
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
  }, {
    key: 'render',
    value: function render() {
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
  }]);

  return DraggableWindow;
}(_react.Component);

exports.default = DraggableWindow;