import React, { Component } from 'react'
import { Link } from 'react-router'

import Button from '../Button'

export default class Navigation extends Component {
  render() {
    return (
      <div>
        Links:
        {' '}
        <Button />
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
      </div>
    )
  }
}
