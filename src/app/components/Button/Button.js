import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Button.css'

export default class Button extends Component {
  render() {
    return(
      <span className={s.title}>HOVER</span>
    )
  }
}
