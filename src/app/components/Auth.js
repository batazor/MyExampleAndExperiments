import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';

export default class Auth extends Component {
  render() {
    return (
      <div>
        <h2>Welcome! Please Login.</h2>
        <Link to="/auth/linkedin">LinkedIn</Link>
        {' '}
        <Link to="/auth/github">Github</Link>
        {' '}
        <Link to="/auth/twitter">Twitter</Link>
        {' '}
      </div>
    );
  }
}
