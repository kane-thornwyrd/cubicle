'use strict';

require('babel-polyfill');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _blessed = require('blessed');

var _blessed2 = _interopRequireDefault(_blessed);

var _reactBlessed = require('react-blessed');

var _enquirer = require('enquirer');

var _enquirer2 = _interopRequireDefault(_enquirer);

var _logging = require('logging');

var _logging2 = _interopRequireDefault(_logging);

var _mcConfGenerator = require('./mcConfGenerator');

var _mcConfGenerator2 = _interopRequireDefault(_mcConfGenerator);

var _getVersions = require('./getVersions');

var _getVersions2 = _interopRequireDefault(_getVersions);

var _draggableWindow = require('./components/draggableWindow');

var _draggableWindow2 = _interopRequireDefault(_draggableWindow);

var _questions = require('./onboardingProcess/questions');

var _questions2 = _interopRequireDefault(_questions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var enquirer = new _enquirer2.default();

enquirer.register('list', require('prompt-list'));
enquirer.register('confirm', require('prompt-confirm'));

var logger = (0, _logging2.default)('FeatureName');

var CONF_FILE = _path2.default.join(process.cwd(), '.cubicle.json');

if (!_fs2.default.existsSync(CONF_FILE)) {
  _fs2.default.writeFileSync(CONF_FILE, JSON.stringify((0, _mcConfGenerator2.default)({ JAR_folder: _path2.default.join(process.cwd()) }), undefined, 2));
}

/* eslint import/no-dynamic-require:0 */
var conf = require(CONF_FILE);

// var questions = [
//   {
//     type: 'input',
//     name: 'flavor',
//     message: 'Favorite flavor?',
//     default: 'chocolate'
//   },
//   {
//     type: 'input',
//     name: 'other',
//     message: 'Anything else?',
//     when: function() {
//       var first = this.answers.first;
//       if (typeof first === 'string') {
//         this.message = `And your last name, ${first}?`;
//         return true;
//       }
//     },
//     default: 'Woodward'
//   }
// ];


(0, _questions2.default)(conf).then(function (questions) {
  return enquirer.ask(questions).then(function (answers) {
    // console.log(answers)
    _fs2.default.writeFileSync('server.properties', (0, _mcConfGenerator.serverProperties)(answers));
  });
});
// fs.writeFileSync('server.properties', serverProperties(conf));

// getVersions(conf.JAR_forge_version_url, 'forge').then(logger.info);

// // Creating our screen
// const screen = blessed.screen({
//   autoPadding: true,
//   smartCSR: true,
//   title: 'react-blessed hello world',
// });
// // Adding a way to quit the program
// screen.key(['escape', 'q', 'C-c'], () => process.exit(0));

// const App = () =>
//   (<box
//     top="center"
//     left="center"
//     width="50%"
//     height="50%"
//     border={{ type: 'line' }}
//     style={{ border: { fg: 'blue' } }}
//   >
//     <DraggableWindow>
//       <text>HELLO ! </text>
//     </DraggableWindow>
//   </box>);


// // Rendering the React app using our screen
// const component = render(<App />, screen);