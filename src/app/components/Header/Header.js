import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import Navigation from '../Navigation'

export default class Header extends Component {
  render() {
    return (
      <header className='row'>
        <div className='col-xs'>
          <Navigation className='box' />
        </div>
      </header>
    )
  }
}
