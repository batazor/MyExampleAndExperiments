import React, { Component } from 'react'; // eslint-disable-line no-unused-vars

let divStyle = {
  background: 'orange',
  padding: '15px',
  color: 'white',
  border: '5px solid red'
};

export default class NotFound extends Component {
  render() {
    return (
      <div style={divStyle}>
        Page not Found!!!
      </div>
    );
  }
}
