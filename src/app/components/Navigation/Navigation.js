import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import { Link } from 'react-router'
import s from './Navigation.scss'
import Button from '../Button'
import NavLink from '../NavLink'

export default class Navigation extends Component {
  render() {
    return (
      <div className={s.container}>
        <Link to='/'>
          <Button style='btnOne'>Home</Button>
        </Link>
        <NavLink to='/admin' title='Admin' />
        <NavLink to='/maps' title='Maps' />
        <NavLink to='/auth' title='Auth' />
        <NavLink to='/user' title='User' />
        <NavLink to='/todo' title='Todo' />
      </div>
    )
  }
}
