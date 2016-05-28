import React, { Component, PropTypes } from 'react'
import 'classnames'
import s from './Button.scss'

export default class Button extends Component {
  render() {

    let buttonStyle = s.btn
    switch (this.props.style) {
    case 'btnOne':
      buttonStyle += ` ${s.btnOne}`
      break
    case 'btnTwo':
      buttonStyle += ` ${s.btnTwo}`
      break
    case 'btnThree':
      buttonStyle += ` ${s.btnThree}`
      break
    case 'btnFour':
      buttonStyle += ` ${s.btnFour}`
      break
    default:
      buttonStyle += ` ${s.btnOne}`
    }

    return(
      <span className={buttonStyle}>{ this.props.children }</span>
    )
  }
}

Button.propTypes = {
  style: PropTypes.string,
  children: PropTypes.string.isRequired
}
