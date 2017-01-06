import chalk        from 'chalk';
import CLI          from 'clui';
import clc          from 'cli-color';
import { Spinner }  from 'clui';
import fs           from 'fs';

import conf from './configManager';
Object.assign(global, conf);

// import { launcher } from './gameHandler';
// launcher();

function clear(clear){
  if (clear !== false) process.stdout.write('\x1B[2J');
  process.stdout.write('\x1B[0f');
}

// clear();


(async function main(){


})();


