import React from 'react'  // eslint-disable-line no-unused-vars

import './flexboxgrid.css'
import s from './App.scss'

export default function App({ children }) {
  return (
    <div className='row'>
      { children }
    </div>
  )
}
