import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

class ContactItem extends Component {
  render() {
    return <li>{ this.props.name } - { this.props.email }</li>
  }
}

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
}

export default ContactItem;
