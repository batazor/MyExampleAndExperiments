import React, { Component } from 'react' // eslint-disable-line no-unused-vars
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
