import React, { Component } from 'react' // eslint-disable-line no-unused-vars

import Header from '../Header'
import Menu from '../Menu'
import Chat from '../Chat'

export default class Foo extends Component {
  render() {
    return (
      <div className='row'>
        <div className='col-xs'>
          <Header />
          <div className='row'>
            <div className='col-xs'>
              <div className='box'>
                And I am Foo!
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
