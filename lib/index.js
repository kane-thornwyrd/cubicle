'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _url = require('url');

var _child_process = require('child_process');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _blessed = require('blessed');

var _blessed2 = _interopRequireDefault(_blessed);

var _reactBlessed = require('react-blessed');

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _enquirer = require('enquirer');

var _enquirer2 = _interopRequireDefault(_enquirer);

var _globby = require('globby');

var _globby2 = _interopRequireDefault(_globby);

var _logging = require('logging');

var _logging2 = _interopRequireDefault(_logging);

var _progress = require('progress');

var _progress2 = _interopRequireDefault(_progress);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _package = require('../package');

var _confManager = require('./confManager');

var _confManager2 = _interopRequireDefault(_confManager);

var _getVersions = require('./getVersions');

var _getVersions2 = _interopRequireDefault(_getVersions);

var _draggableWindow = require('./components/draggableWindow');

var _draggableWindow2 = _interopRequireDefault(_draggableWindow);

var _questions = require('./questions');

var _questions2 = _interopRequireDefault(_questions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const enquirer = new _enquirer2.default();

enquirer.register('list', require('prompt-list'));
enquirer.register('confirm', require('prompt-confirm'));

let CONFIGURATION;

//TODO use promisify
const fsCbPromise = (res, rej) => err => {
  if (err) return rej(err);return res();
};
const writeFile = (filename, datas) => new Promise((res, rej) => _fs2.default.writeFile(filename, datas, undefined, fsCbPromise(res, rej)));

const HEADERS = {
  accept: '*/*',
  "User-Agent": `${_package.name}/${_package.version}`,
  "Upgrade-Insecure-Requests": "1"
};

async function init() {
  const logger = (0, _logging2.default)('main_init');

  const onboarding = () => new Promise((res, rej) => {
    const core = async () => {
      const CONF_FILE = _path2.default.join(process.cwd(), '.cubicle.json');
      if (!_fs2.default.existsSync(CONF_FILE)) {
        logger.info('Fresh install: WELCOME !');
        try {
          const questions = await (0, _questions2.default)((0, _confManager2.default)());
          CONFIGURATION = (0, _confManager2.default)((await enquirer.ask(questions)));
          Promise.all([writeFile('server.properties', (0, _confManager.serverProperties)(CONFIGURATION)), writeFile('.cubicle.json', (0, _confManager.cubicleConf)(CONFIGURATION)), writeFile('eula.txt', (0, _confManager.eulaFile)(CONFIGURATION))]).then(() => res(true)).catch(e => {
            throw new Error(e);
          });
        } catch (e) {
          rej(e);
        }
      } else {
        /* eslint import/no-dynamic-require:0 */
        CONFIGURATION = (0, _confManager2.default)(require(CONF_FILE));
        try {
          Promise.all([writeFile('server.properties', (0, _confManager.serverProperties)(CONFIGURATION)), writeFile('eula.txt', (0, _confManager.eulaFile)(CONFIGURATION))]).then(() => res(true)).catch(e => {
            throw new Error(e);
          });
        } catch (e) {
          rej(e);
        }
      }
    };
    return core();
  });

  const vanillaJarAvailable = () => new Promise((resolve, reject) => {
    const core = async () => {
      const MC_JAR_FILE = `minecraft_server.${CONFIGURATION.MCINTERNAL_version}.jar`;
      if (!(await (0, _globby2.default)([MC_JAR_FILE])).length) {
        logger.info('Minecraft binary missing.');
        const mcVersions = await (0, _getVersions2.default)(CONFIGURATION.JAR_version_url, 'minecraft');
        const versionSpecsUrl = mcVersions.filter(v => v.id === CONFIGURATION.MCINTERNAL_version)[0].url;
        const req = _request2.default.get({
          url: versionSpecsUrl,
          json: true
        }, (err, res, body) => {
          if (err) reject(err);
          const binaryUrl = new _url.URL(body.downloads.server.url);
          const serverBinary = _fs2.default.createWriteStream(MC_JAR_FILE);
          const req = _https2.default.request({
            hostname: binaryUrl.hostname,
            port: 443,
            path: binaryUrl.pathname,
            method: 'GET',
            agent: false,
            headers: HEADERS
          });
          req.on('response', response => {
            response.pipe(serverBinary);
            const len = parseInt(response.headers['content-length'], 10);
            const bar = new _progress2.default(' 🗺   Downloading ⛏ Minecraft server :bar ⏳eta::etas', {
              complete: '█',
              incomplete: '░',
              width: 20,
              total: len
            });

            response.on('data', chunk => bar.tick(chunk.length));
            response.on('aborted', reject);
            response.on('end', () => resolve(true));
          });
          req.on('error', reject);
          req.end();
        });
      } else {
        resolve(true);
      }
    };
    return core();
  });

  const forgeJarAvailable = () => new Promise((resolve, reject) => {
    const core = async () => {
      const MC_FORGE_INSTALL_JAR_FILE = `forge-${CONFIGURATION.MCINTERNAL_version}-${CONFIGURATION.FORGE_version}-installer.jar`;
      const MC_FORGE_URL = `http://files.minecraftforge.net/maven/net/minecraftforge/forge/${CONFIGURATION.MCINTERNAL_version}-${CONFIGURATION.FORGE_version}/forge-${CONFIGURATION.MCINTERNAL_version}-${CONFIGURATION.FORGE_version}-installer.jar`;
      if (CONFIGURATION.FORGE_version && !(await (0, _globby2.default)([MC_FORGE_INSTALL_JAR_FILE])).length) {
        logger.info('Minecraft Forge installer missing.');
        const binaryUrl = new _url.URL(MC_FORGE_URL);
        const serverBinary = _fs2.default.createWriteStream(MC_FORGE_INSTALL_JAR_FILE);
        const req = _https2.default.request({
          hostname: binaryUrl.hostname,
          port: 443,
          path: binaryUrl.pathname,
          method: 'GET',
          agent: false,
          headers: HEADERS
        });
        req.on('response', response => {
          response.pipe(serverBinary);
          const len = parseInt(response.headers['content-length'], 10);
          const bar = new _progress2.default(' 🗺   Downloading ⚒ Minecraft Forge installer :bar ⏳eta::etas', {
            complete: '█',
            incomplete: '░',
            width: 20,
            total: len
          });

          response.on('data', chunk => bar.tick(chunk.length));
          response.on('aborted', reject);
          response.on('end', () => resolve(true));
        });
        req.on('error', reject);
        req.end();
      } else {
        resolve(true);
      }
    };
    return core();
  });

  const forgeInstalled = () => new Promise((resolve, reject) => {
    const core = async () => {
      const MC_FORGE_INSTALL_JAR_FILE = `forge-${CONFIGURATION.MCINTERNAL_version}-${CONFIGURATION.FORGE_version}-installer.jar`;
      const MC_FORGE_JAR_FILE = `forge-${CONFIGURATION.MCINTERNAL_version}-${CONFIGURATION.FORGE_version}-universal.jar`;
      if (CONFIGURATION.FORGE_version && (await (0, _globby2.default)([MC_FORGE_INSTALL_JAR_FILE])).length && !(await (0, _globby2.default)([MC_FORGE_JAR_FILE])).length) {
        const spinner = (0, _ora2.default)('⚒ Installing Minecraft Forge').start();
        const child = (0, _child_process.exec)(`/usr/bin/java -jar ${MC_FORGE_INSTALL_JAR_FILE} --installServer`);
        child.stdout.on('end', () => spinner.succeed('⚒ Minecraft Forge installed !'));
      }
    };
    return core();
  });

  const onBoardingDone = await onboarding();
  const vanillaJarAvailableDone = await vanillaJarAvailable();
  const forgeJarAvailableDone = await forgeJarAvailable();
  const forgeInstalledDone = await forgeInstalled();
}

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

init();