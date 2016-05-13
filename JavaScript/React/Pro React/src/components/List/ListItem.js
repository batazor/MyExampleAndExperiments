import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Child Component
class ListItem extends Component {
  render() {
    return (
      <li>
        { this.props.quantity } × { this.props.name }
      </li>
    )
  }
}

export default ListItem;
