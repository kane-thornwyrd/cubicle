import { screen }      from 'blessed';

const sc = screen({
  debug: true,
  smartCSR: true,
  dockBorders: true,
  cursor: {
    artificial: true,
    shape: 'line',
    blink: true,
    color: null // null for default
  },
});

sc.key(['C-c', 'C-q'], (ch, key) => sc.destroy())

export default class Screen{

  static screen = sc;

  set display(value) {
    this.element = value;
    Screen.screen.append(value);
  }

  get display() {
    return this.element;
  }

  static render = function() {
    Screen.screen.render();
  }
}
