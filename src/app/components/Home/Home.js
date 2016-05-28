import React from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import { increase, decrease } from '../../actions/count'

import Header from '../Header'
import Menu from '../Menu'
import Chat from '../Chat'

function Home({ number, increase, decrease }) {

  const step = 1

  return (
    <div className='row'>
      <div className='col-xs'>
        <Header />
        <div className='row'>
          <div className='col-xs'>
            <div className='box'>
              <Menu />

              Some state change:
              { number }

              <button onClick={() => increase(step)}>Increase</button>
              <button onClick={() => decrease(step)}>Decrease</button>

              <Chat />
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
