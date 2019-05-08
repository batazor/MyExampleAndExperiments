import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import Counter from '../../containers/Counter'
import Header from '../../components/Header'
import Menu from '../../components/Menu'
import Chat from '../../components/Chat'
import menuItem from '../../data/menu.json'

export default class Home extends Component {
  render() {
    return (
      <div className='row'>
        <div className='col-xs'>
          <Header />
          <div className='row'>
            <div className='col-xs'>
              <div className='row'>
                <div className='col-xs-3'>
                  <Menu items={menuItem} />
                </div>
                <div className='col-xs-8'>
                  <Counter />
                </div>
                <div className='col-xs-1'>
                  <Chat />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
