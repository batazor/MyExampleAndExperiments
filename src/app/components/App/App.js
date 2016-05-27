import React from 'react'  // eslint-disable-line no-unused-vars
import Header from '../Header'
import Menu from '../Menu'
import Chat from '../Chat'

import './flexboxgrid.css'
import './App.css'

export default function App({ children }) {
  return (
    <div>
      <Header className='row' />
      <div  className='row'>
        <Menu className='col-xs-1' />
        <div className='col-xs-10'>
          { children }
        </div>
        <Chat className='col-xs-1' />
      </div>
    </div>
  );
}
