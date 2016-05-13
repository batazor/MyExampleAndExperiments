import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Hello extends Component {
  render() {
    const place = "World";

    return (
      <h1>Hello { place }</h1>
    );
  }
}

ReactDOM.render(<Hello />, document.getElementById('root'));
