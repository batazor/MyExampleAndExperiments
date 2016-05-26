import React from 'react';  // eslint-disable-line no-unused-vars
import { Link, browserHistory } from 'react-router';

export default function App({ children }) {
  return (
    <div>
      <header>
        Links:
        {' '}
        <Link to="/">Home</Link>
        {' '}
        <Link to="/foo">Foo</Link>
        {' '}
        <Link to="/bar">Bar</Link>
        {' '}
        <Link to="/auth">Auth</Link>
        {' '}
        <Link to="/todo">Todo</Link>
      </header>
      <div>
        <button onClick={() => browserHistory.push('/foo')}>Go to /foo</button>
      </div>
      <div>{ children }</div>
    </div>
  );
}
