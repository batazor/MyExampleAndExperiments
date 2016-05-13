import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ListItem from './ListItem';

// Parent Component
class GroceryList extends Component {
  render() {
    return (
      <ul>
        <ListItem quantity="1" name="Bread" />
        <ListItem quantity="6" name="Eggs" />
        <ListItem quantity="2" name="Milk" />
      </ul>
    )
  }
}

export default GroceryList;
