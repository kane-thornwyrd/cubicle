import { defaultsDeep, clone } from 'lodash';
import { box }      from 'blessed';
import Screen from './Screen';

export default class Box extends Screen {

  static defaultConf = {};

  constructor(options = {}) {
    super();
    this.options = clone(Box.defaultConf);
    defaultsDeep(this.options, options);
    this.display = box(this.options);
  }
}
