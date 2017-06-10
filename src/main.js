import path from 'path';
import fs from 'fs';
import Vorpal from 'vorpal';
import {
  find,
  flatMap,
  forEach,
} from 'lodash';
import { mcConfGenerator } from './gameSetup';

const CONF_FILE = path.join(process.cwd(), '.cubicle.json');

const stats = fs.existsSync(CONF_FILE);

if (!stats) {
  fs.writeFileSync(CONF_FILE, `{
    "starter" : ${JSON.stringify(mcConfGenerator({
      folder: __dirname,
    }), undefined, 2)}
  }`);
}
/* eslint import/no-dynamic-require:0 */
const conf = require(CONF_FILE);

const instances = [];

let i = 0;

const findInstance = search => o => o.conf.name === search;

forEach(conf, (v, k) => {
  conf[k].id = i;
  conf[k].name = k;

  instances[i] = {
    conf: conf[k],
    vorpal: new Vorpal(),
  };

  instances[i].vorpal
    .delimiter(`cube-${k}~$`)
    .command('switch <instance>', 'Switches prompt to another instance.')
    .autocomplete(flatMap(instances, o => o.conf.name))
    .action(function switchCallback(args, cb) {
      const result = find(instances, findInstance(args.instance));
      if (result) {
        instances[result.conf.id].vorpal.show();
      } else {
        this.log(`${args.instance} does not exist.`);
      }
      cb();
    })
    .cancel(() => instances[0].vorpal.show());
  i += 1;
});
instances[0].vorpal.show();
