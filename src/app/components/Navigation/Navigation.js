import React, { Component } from 'react'
import { Link } from 'react-router'

import s from './Navigation.scss'
import Button from '../Button'

export default class Navigation extends Component {
  render() {
    return (
      <div className={s.container}>
        <Link to="/">
          <Button style="btnOne">Home</Button>
        </Link>
        <Link to="/foo">
          <Button style="btnOne">Foo</Button>
        </Link>
        <Link to="/bar">
          <Button style="btnOne">Bar</Button>
        </Link>
        <Link to="/auth">
          <Button style="btnOne">Auth</Button>
        </Link>
        <Link to="/todo">
          <Button style="btnOne">Todo</Button>
        </Link>
      </div>
    )
  }
}
