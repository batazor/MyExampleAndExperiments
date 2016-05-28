import React from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import { increase, decrease } from '../../actions/count'

import Header from '../../components/Header'
import Menu from '../../components/Menu'
import Chat from '../../components/Chat'
import menuItem from '../../data/menu.json'

function Home({ number, increase, decrease }) {

  const step = 1

  return (
    <div className='row'>
      <div className='col-xs'>
        <Header />
        <div className='row'>
          <div className='col-xs'>
            <div className='box'>
              <div className='row'>
                <div className='col-xs-3'>
                  <Menu items={menuItem} />
                </div>
                <div className='col-xs-8'>
                  Some state change:
                  { number }

                  <button onClick={() => increase(step)}>Increase</button>
                  <button onClick={() => decrease(step)}>Decrease</button>
                </div>
                <div className='col-xs-1'>
                  <Chat />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(
  state => ({ number: state.count.number }),
  { increase, decrease }
)(Home)
