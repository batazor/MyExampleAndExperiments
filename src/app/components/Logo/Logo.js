import React, { Component } from 'react' // eslint-disable-line no-unused-vars
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
