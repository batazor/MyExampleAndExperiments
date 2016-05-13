import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ListItem from './ListItem';

// Parent Component
class GroceryList extends Component {
  render() {
    return (
      <ul>
        <ListItem quantity="1">Bread</ListItem>
        <ListItem quantity="6">Eggs</ListItem>
        <ListItem quantity="2">Milk</ListItem>
      </ul>
    )
  }
}

export default GroceryList;
