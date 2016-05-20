import React, { Component } from 'react';
import { render } from 'react-dom';

class Hello extends Component {
  render() {
    let divStyle = {
      width: 100,
      height: 30,
      padding: 5,
      backgroundColor: '#ee9900'
    };

    return (
      <div style={ divStyle }>Hello World</div>
    );
  }
}

export default Hello;
