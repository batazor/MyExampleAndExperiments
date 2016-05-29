import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import { Link } from 'react-router'

import s from './NavLink.scss'
import Button from '../Button'

export default class NavLink extends Component {
  render() {
    return (
      <Link {...this.props} activeClassName={s.active}>
        <Button style='btnOne'>{this.props.title}</Button>
      </Link>
    )
  }
}
