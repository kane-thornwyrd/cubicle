import path from 'path';
import fs from 'fs';
import https from 'https';
import { URL } from 'url';
import { exec } from 'child_process';

import React from 'react';
import blessed from 'blessed';
import { render } from 'react-blessed';

import request from 'request';

import Enquirer from 'enquirer';
const enquirer = new Enquirer();

enquirer.register('list', require('prompt-list'));
enquirer.register('confirm', require('prompt-confirm'));

import globby from 'globby';

import createLogger from 'logging';

import ProgressBar from 'progress';
import ora from 'ora';

import { name, version }from '../package'

import defaultConf, { serverProperties, cubicleConf, eulaFile } from './confManager';
import getVersions from './getVersions';

import DraggableWindow from './components/draggableWindow';

import questionsBuilder from './questions'

let CONFIGURATION;

//TODO use promisify
const fsCbPromise = (res, rej) => err => { if (err) return rej(err); return res(); };
const writeFile = (filename, datas) => new Promise((res, rej) =>
  fs.writeFile(filename, datas, undefined, fsCbPromise(res, rej)));

const HEADERS = {
  accept: '*/*',
  "User-Agent":`${name}/${version}`,
  "Upgrade-Insecure-Requests": "1",
};

async function init(){
  const logger = createLogger('main_init');


  const onboarding = () => new Promise(
    (res, rej) => {
      const core = async () => {
        const CONF_FILE = path.join(process.cwd(), '.cubicle.json');
        if (!fs.existsSync(CONF_FILE)) {
          logger.info('Fresh install: WELCOME !');
          try {
            const questions = await questionsBuilder(defaultConf())
            CONFIGURATION = defaultConf(await enquirer.ask(questions));
            Promise.all([
              writeFile('server.properties', serverProperties(CONFIGURATION)),
              writeFile('.cubicle.json', cubicleConf(CONFIGURATION)),
              writeFile('eula.txt', eulaFile(CONFIGURATION)),
            ])
            .then(() => res(true))
            .catch(e => {throw new Error(e)});
          } catch(e) {
            rej(e);
          }
        } else {
          /* eslint import/no-dynamic-require:0 */
          CONFIGURATION = defaultConf(require(CONF_FILE));
          try {
            Promise.all([
              writeFile('server.properties', serverProperties(CONFIGURATION)),
              writeFile('eula.txt', eulaFile(CONFIGURATION)),
            ])
            .then(() => res(true))
            .catch(e => {throw new Error(e)});
          } catch(e) {
            rej(e);
          }
        }
      }
      return core();
  });



  const vanillaJarAvailable = () => new Promise(
    (resolve, reject) => {
      const core = async () => {
        const MC_JAR_FILE = `minecraft_server.${CONFIGURATION.MCINTERNAL_version}.jar`;
        if (!(await globby([MC_JAR_FILE])).length) {
          logger.info('Minecraft binary missing.');
          const mcVersions = await getVersions(CONFIGURATION.JAR_version_url, 'minecraft');
          const versionSpecsUrl = mcVersions.filter(v => v.id === CONFIGURATION.MCINTERNAL_version)[0].url;
          const req = request.get({
            url: versionSpecsUrl,
            json: true,
          }, (err, res, body) => {
            if (err) reject(err);
            const binaryUrl = new URL(body.downloads.server.url);
            const serverBinary = fs.createWriteStream(MC_JAR_FILE);
            const req = https.request({
              hostname: binaryUrl.hostname,
              port: 443,
              path: binaryUrl.pathname,
              method: 'GET',
              agent: false,
              headers: HEADERS
            });
            req.on( 'response', response => {
              response.pipe(serverBinary);
              const len = parseInt(response.headers['content-length'], 10);
              const bar = new ProgressBar(' 🗺   Downloading ⛏ Minecraft server :bar ⏳eta::etas', {
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
      }
      return core();
  });



  const forgeJarAvailable = () => new Promise(
    (resolve, reject) => {
      const core = async () => {
        const MC_FORGE_INSTALL_JAR_FILE = `forge-${CONFIGURATION.MCINTERNAL_version}-${CONFIGURATION.FORGE_version}-installer.jar`;
        const MC_FORGE_URL = `http://files.minecraftforge.net/maven/net/minecraftforge/forge/${CONFIGURATION.MCINTERNAL_version}-${CONFIGURATION.FORGE_version}/forge-${CONFIGURATION.MCINTERNAL_version}-${CONFIGURATION.FORGE_version}-installer.jar`;
        if ( CONFIGURATION.FORGE_version
          && !(await globby([MC_FORGE_INSTALL_JAR_FILE])).length
        ){
          logger.info('Minecraft Forge installer missing.');
          const binaryUrl = new URL(MC_FORGE_URL);
          const serverBinary = fs.createWriteStream(MC_FORGE_INSTALL_JAR_FILE);
          const req = https.request({
            hostname: binaryUrl.hostname,
            port: 443,
            path: binaryUrl.pathname,
            method: 'GET',
            agent: false,
            headers: HEADERS
          });
          req.on( 'response', response => {
            response.pipe(serverBinary);
            const len = parseInt(response.headers['content-length'], 10);
            const bar = new ProgressBar(' 🗺   Downloading ⚒ Minecraft Forge installer :bar ⏳eta::etas', {
              complete: '█',
              incomplete: '░',
              width: 20,
              total: len,
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
      }
      return core();
  });

  const forgeInstalled = () => new Promise(
    (resolve, reject) => {
      const core = async () => {
        const MC_FORGE_INSTALL_JAR_FILE = `forge-${CONFIGURATION.MCINTERNAL_version}-${CONFIGURATION.FORGE_version}-installer.jar`;
        const MC_FORGE_JAR_FILE = `forge-${CONFIGURATION.MCINTERNAL_version}-${CONFIGURATION.FORGE_version}-universal.jar`;
        if ( CONFIGURATION.FORGE_version
          && (await globby([MC_FORGE_INSTALL_JAR_FILE])).length
          && !(await globby([MC_FORGE_JAR_FILE])).length
        ){
          const spinner = ora('⚒ Installing Minecraft Forge').start();
          const child = exec(`/usr/bin/java -jar ${MC_FORGE_INSTALL_JAR_FILE} --installServer`)
          child.stdout.on('end', () => spinner.succeed('⚒ Minecraft Forge installed !'));
        }
      }
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
