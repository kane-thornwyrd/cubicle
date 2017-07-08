import React, {Component} from 'react';
import blessed, { box } from 'blessed';

const stylesheet = {
  dragHandle :  {
                  hover: {
                    bg: 'grey',
                  },
                }
};

export default class DragHandle extends Component {
  render() {
    return (
      <text
        position={{
          top: -1,
          right: 0,
        }}
        clickable
        style={stylesheet.dragHandle}
        scrollable={false}
        height={0.5}
        width={2}
        onMousedown={this.props.mousedown}
      >
        ▬
      </text>
    );
  }
}
