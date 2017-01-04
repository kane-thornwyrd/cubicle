import chalk        from 'chalk';
import CLI          from 'clui';
import clc          from 'cli-color';
import { Spinner }  from 'clui';
import inquirer     from 'inquirer';
import {
  reverse,
  forEach,
} from 'lodash';
import fs           from 'fs';

import { getVersions } from './gameSetup';

// import { launcher } from './gameHandler';
// launcher();

function clear(clear){
  if (clear !== false) process.stdout.write('\x1B[2J');
  process.stdout.write('\x1B[0f');
}

clear();

let conf = {
  MCVERSIONURL: 'http://s3.amazonaws.com/Minecraft.Download/versions/versions.json',
  MCEULA: false,
};

forEach(process.env, (v, k) => { if (typeof conf[k] !== 'undefined'){
  if(v === 'true' || v === 'TRUE' || v === '1') v = true;
  if(v === 'false' || v === 'FALSE' || v === '0') v = false;

  conf[k] = v;
}});

Object.assign(global, conf);


(async function main(){


  // const versions = await getVersions(MCVERSIONURL);

  // const choices = versions.map( o => o.id);

  // inquirer.prompt([
  //   {
  //     type: 'list',
  //     name: 'version',
  //     message: 'Which version ?',
  //     choices
  //   },
  // ]).then(function (answers) {
  //   console.log(JSON.stringify(answers, null, '  '));
  // });
})();


