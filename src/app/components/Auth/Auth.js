import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';

export default class Auth extends Component {
  render() {
    return (
      <div>
        <h2>Welcome! Please Login.</h2>
        <Link to="/auth/linkedin">LinkedIn</Link>
        {' '}
        <a href="http://localhost:4000/auth/github">Github</a>
        {' '}
        <Link to="/auth/twitter">Twitter</Link>
        {' '}
      </div>
    );
  }
}
