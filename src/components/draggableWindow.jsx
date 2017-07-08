import React, {Component} from 'react';
import update from 'immutability-helper';
import blessed, { box } from 'blessed';


import DragHandle from './DragHandle';
import WindowTitle from './WindowTitle';
import WindowContent from './WindowContent';

const stylesheet = {
  bordered: {
    border: {
      type: 'line'
    },
    style: {
      border: {
        fg: 'lightgrey'
      }
    }
  }
};

export default class DraggableWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
    }
    this.mousedown = this.mousedown.bind(this);
  }
  mousedown() {
    this.state = update(this.state, {dragging: {$set: !this.state.dragging}})
    console.log()
    if(this.state.dragging) {
      this.originalHeight = this.refs.container.height;
      this.refs.container.enableDrag();
      this.refs.container.height = 2;
    } else {
      this.refs.container.disableDrag();
      this.refs.container.height = this.originalHeight;
    }
  }
  render() {
    return (
      <box
        class={stylesheet.bordered}
        top="70%"
        width="30%"
        ref="container"
        shadow
        >
        <WindowTitle title="GO GO GO"/>
        <DragHandle mousedown={this.mousedown}/>
        <WindowContent ref="content">
          {this.props.children}
        </WindowContent>
      </box>
    );
  }
}
