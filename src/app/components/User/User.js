import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'

import Header from '../Header'
import Menu from '../Menu'
import Chat from '../Chat'

class User extends Component {
  render () {

    const { name, surname } = this.props.user

    return (
      <div className='row'>
        <div className='col-xs'>
          <Header />
          <div className='row'>
            <div className='col-xs'>
              <div className='box'>
                <Menu />

                <p>Welcome to LMap, {name} {surname}! </p>

                <Chat />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(User)
