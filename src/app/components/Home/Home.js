import React from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import { increase, decrease } from '../../actions/count'

import Header from '../Header'
import Menu from '../Menu'
import Chat from '../Chat'

function Home({ number, increase, decrease }) {
  return (
    <div className='row'>
      <div className='col-xs'>
        <Header />
        <div className='row'>
          <div className='col-xs'>
            <div className='box'>
              Some state change:
              { number }

              <button onClick={() => increase(1)}>Increase</button>
              <button onClick={() => decrease(1)}>Decrease</button>
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
