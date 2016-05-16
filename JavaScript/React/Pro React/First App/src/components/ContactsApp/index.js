import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import 'whatwg-fetch';

import ContactsApp from './ContactsApp';

class ContactsAppContainer extends Component {
  constructor() {
    super();
    this.state = {
      contacts: []
    };
  }

  componentDidMount() {
    fetch('./src/contacts.json')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({ contacts: responseData });
    })
    .catch((error) => {
      console.log('Error fetching and parsing data', error);
    });
  }

  render() {
    return(
      <ContactsApp from  contacts={ this.state.contacts } />
    )
  }
}

export default ContactsAppContainer;
