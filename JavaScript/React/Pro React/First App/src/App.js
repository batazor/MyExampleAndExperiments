import React from 'react';
import ReactDOM from 'react-dom';

import Hello from './components/Hello';
import List from './components/List';
import CommentForm from './components/CommentForm';
import Search from './components/Search';
import Greeter from './components/Greeter';
import ContactsApp from './components/ContactsApp';

import contactsData from './components/ContactsApp/email';

ReactDOM.render(<ContactsApp contacts={ contactsData } />, document.getElementById('root'));
