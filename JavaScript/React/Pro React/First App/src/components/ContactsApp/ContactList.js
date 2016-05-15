import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

import ContactItem from './ContactItem';

// Pure component that receives both contacts and filterText as props
// The component is responsible for actualy filtering the
// contacts before displaying them.
// It's considered a pure component because given the same
// contacts and filterText props the output will always be the same.
class ContactList extends Component {
  render() {
    let filteredContacts = this.props.contacts.filter(
      (contact) => contact.name.indexOf(this.props.filterText) !== -1
    );

    return (
      <ul>
        {filteredContacts.map(
          (contact) => <ContactItem key={ contact.email }
                                    name={ contact.name }
                                    email={ contact.email } />
        )}
      </ul>
    )
  }
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object)
}

export default ContactList;
