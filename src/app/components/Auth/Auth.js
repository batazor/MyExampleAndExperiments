import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import { Link } from 'react-router'

import Logo from '../Logo'
import Button from '../Button'
import s from './Auth.scss'

export default class Auth extends Component {
  render() {
    return (
      <div className='middle-xs center-xs col-xs-6 col-xs-offset-3'>
        <div className={s.container}>
          <Logo />
          <h2>Welcome! Please Login.</h2>

          <Button style="btnThree">GitHub</Button>
          <Button style="btnThree">LinkedIn</Button>
          <Button style="btnThree">Twitter</Button>
        </div>
      </div>
    );
  }
}
