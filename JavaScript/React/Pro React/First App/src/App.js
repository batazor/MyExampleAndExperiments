import React from 'react';
import ReactDOM from 'react-dom';

// components
import Hello from './components/Hello';
import List from './components/List';
import CommentForm from './components/CommentForm';
import Search from './components/Search';
import Greeter from './components/Greeter';
import ContactsApp from './components/ContactsApp';
import ShoppingList from './components/ShoppingList'

// data
import contactsData from './components/ContactsApp/email';

ReactDOM.render(<ShoppingList />, document.getElementById('root'));
