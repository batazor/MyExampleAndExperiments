import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

class Greeter extends Component {
  render() {
    return (
      <h1>{ this.props.salutation }</h1>
    )
  }
}

Greeter.propTypes = {
  salutation: PropTypes.string.isRequired
}

Greeter.defaultProps = {
  salutation: "Hello World"
}

export default Greeter;
