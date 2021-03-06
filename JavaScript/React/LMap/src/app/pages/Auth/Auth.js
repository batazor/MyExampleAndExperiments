import React, { Component } from 'react' // eslint-disable-line no-unused-vars

import AuthBtn from '../../containers/Auth'
import Logo from '../../components/Logo'
import s from './Auth.scss'

export default class Auth extends Component {
  render() {
    return (
      <div className='middle-xs center-xs col-xs-6 col-xs-offset-3'>
        <div className={s.container}>
          <Logo />
          <h2>Welcome! Please Login.</h2>

          <AuthBtn />
        </div>
      </div>
    )
  }
}
