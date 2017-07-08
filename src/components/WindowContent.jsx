import React, {Component} from 'react';
import blessed, { box } from 'blessed';

export default class WindowContent extends Component {
  render() {
    return (
      <box
        position={{
          top: 0,
          left: 0,
        }}
        scrollable
        height='100%-2'
        width='100%-2'
      >
        {this.props.children}
      </box>
    );
  }
}
