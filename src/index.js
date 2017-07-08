import 'babel-polyfill';
import path from 'path';
import fs from 'fs';

import React from 'react';
import blessed from 'blessed';
import { render } from 'react-blessed';

import Enquirer from 'enquirer';
const enquirer = new Enquirer();

enquirer.register('list', require('prompt-list'));
enquirer.register('confirm', require('prompt-confirm'));

import createLogger from 'logging';

import mcConfGenerator, { serverProperties } from './mcConfGenerator';
import getVersions from './getVersions';

import DraggableWindow from './components/draggableWindow';

import questionsBuilder from './onboardingProcess/questions'

const logger = createLogger('FeatureName');

const CONF_FILE = path.join(process.cwd(), '.cubicle.json');

if (!fs.existsSync(CONF_FILE)) {
  fs.writeFileSync(CONF_FILE,
    JSON.stringify(
      mcConfGenerator({ JAR_folder: path.join(process.cwd()) }),
      undefined,
      2));
}

/* eslint import/no-dynamic-require:0 */
const conf = require(CONF_FILE);

questionsBuilder(conf).then(questions => enquirer.ask(questions)
  .then(function(answers) {
    // console.log(answers)
  fs.writeFileSync('server.properties', serverProperties(answers));
}));
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
