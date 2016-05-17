import React, { PropTypes, Component } from 'react';
import { DropTarget } from 'react-dnd';

// ShoppingCart DND Spec
//    "A plain object implementing the drop target specification"
//
// - DropTarget Methods (All optional)
//   - drop: Called when a compatible item is dropped.
//   - hover: Called when an item is hovered over the component.
//   - canDrop: Use it to specify whether the drop target is able to accept
//              the item.
const ShoppingCartSpec = {
  drop() {
    return { name: 'ShoppingCart' };
  }
}

class ShoppingCart extends Component {
  render() {
    const style = {
      backgroundColor: '#FFF'
    };

    return (
      <div className='shopping-cart' style={ style }>
        Drag here to order!
      </div>
    );
  }
}

export default ShoppingCart;
