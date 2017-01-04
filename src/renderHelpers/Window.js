import {
  defaultsDeep,
  clone,
  pad,
} from 'lodash';
import {
  box,
  text,
  debug
} from 'blessed';
import Screen
 from './Screen';


export default class Window extends Screen {

  static defaultConf = {
    border: 'line',
    shadow: true,
    style: {
      border: {
        fg: 'lightgrey',
        bg: 'green',
      },
    },
  };

  constructor(options = {}) {
    super();
    this.options = clone(Window.defaultConf);
    defaultsDeep(this.options, options);
    this.content = this.options.content;
    this.options.content = null;
    const container = box(this.options);
    const dragHandle = text({
      position: {
        top: -1,
        right: 0,
      },
      parent: container,
      content: '▀',
      clickable: true,
      style: {
        bg: 'green',
        hover: {
          bg: 'lightgreen',
        },
      },
      scrollable: false,
      height: 1,
      width: 2,
    });

    const title = text({
      left: 0,
      top: -1,
      height: 1,
      parent: container,
      content: this.options.title,
      scrollable: false,
      width: '100%-3',
      style: {
        bg: 'green',
      }
    });

    const content = text({
      left: 0,
      top: 0,
      width: '100%-2',
      height: '100%-2',
      content: this.content,
      scrollable: true,
      clickable: true,
      alwaysScroll: true,
      input: true,
      style: {
        bg: 'grey',
        scrollbar: {
          bg: 'blue',
          fg: 'lightgrey'
        },
      }
    });

    container.append(content);


    let drag = false;
    let originalHeight;
    dragHandle.on('mousedown', (...args) => {
      drag = !drag;
      if(drag) {
        originalHeight = container.height;
        container.enableDrag();
        content.hide();
        container.height = 2;
      } else {
        container.disableDrag();
        content.show();
        container.height = originalHeight;
      }
    });

    content.on('click', () => container.setFront());

    const topBuffer = [];


    this.display = container;
  }
}
