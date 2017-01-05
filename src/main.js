import chalk        from 'chalk';
import CLI          from 'clui';
import clc          from 'cli-color';
import { Spinner }  from 'clui';
import inquirer     from 'inquirer';
import fs           from 'fs';

import conf from './configManager';
Object.assign(global, conf);

import { getVersions } from './gameSetup';

// import { launcher } from './gameHandler';
// launcher();

function clear(clear){
  if (clear !== false) process.stdout.write('\x1B[2J');
  process.stdout.write('\x1B[0f');
}

clear();




(async function main(){


  const versions = await getVersions(MC_VERSION_URL);

  const choices = versions.map( o => o.id);

  inquirer.prompt([
    {
      type: 'list',
      name: 'version',
      message: 'Which version ?',
      choices
    },
  ]).then(function (answers) {
    console.log(JSON.stringify(answers, null, '  '));
  });
})();


