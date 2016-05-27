import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Logo extends Component {
  render () {
    return (
      <Link to="/">
        <h2>LMap</h2>
      </Link>
    )
  }
}
