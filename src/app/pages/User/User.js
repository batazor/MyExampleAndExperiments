import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'

import Header from '../../components/Header'
import Menu from '../../components/Menu'
import Chat from '../../components/Chat'
import menuItem from '../../data/menu.json'

class User extends Component {
  render () {

    const { name, surname } = this.props.user
    const { year, photos } = this.props.photos

    return (
      <div className='row'>
        <div className='col-xs'>
          <Header />
          <div className='row'>
            <div className='col-xs-3'>
              <Menu items={menuItem} />
            </div>
            <div className='col-xs-8'>
              <p>Welcome to LMap, {name} {surname}! </p>
              <p>You have {photos.length} photos for {year} year.</p>
            </div>
            <div className='col-xs-1'>
              <Chat />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.user,
    photos: state.photos
  }
}

export default connect(mapStateToProps)(User)
