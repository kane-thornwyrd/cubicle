import React, {Component} from 'react';
import blessed, { box } from 'blessed';

export default class WindowTitle extends Component {
  render() {
    return (
      <text
        position={{
          top: -1,
          left: 0,
        }}
        clickable
        scrollable={false}
        height={1}
        width={100%-3}
      >
        {this.props.title}
      </text>
    );
  }
}
