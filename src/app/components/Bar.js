import React, { Component } from 'react'

let divStyle = {
  background: 'green',
  padding: '15px',
  border: '5px solid red'
};

export default class Bar extends Component {
  render() {
    return (
      <div style={divStyle}>
        And I am Bar!
      </div>
    );
  }
}
