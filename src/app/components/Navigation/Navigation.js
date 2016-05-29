import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import { Link } from 'react-router'

import s from './Navigation.scss'
import Button from '../Button'

export default class Navigation extends Component {
  render() {
    return (
      <div className={s.container}>
        <Link to='/'>
          <Button style='btnOne'>Home</Button>
        </Link>
        <Link to='/admin'>
          <Button style='btnOne'>Admin</Button>
        </Link>
        <Link to='/maps'>
          <Button style='btnOne'>Maps</Button>
        </Link>
        <Link to='/auth'>
          <Button style='btnOne'>Auth</Button>
        </Link>
        <Link to='/user'>
          <Button style='btnOne'>User</Button>
        </Link>
        <Link to='/todo'>
          <Button style='btnOne'>Todo</Button>
        </Link>
      </div>
    )
  }
}
