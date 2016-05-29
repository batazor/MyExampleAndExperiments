import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { increase, decrease } from '../actions/counter'
import CounterCtrl from '../components/Counter'

class Counter extends Component {
  render() {

    const { counter } = this.props
    const increase = this.props.increaseActions
    const decrease = this.props.decreaseActions

    return (
      <CounterCtrl increase={increase} decrease={decrease} {...counter} />
    )
  }
}

function mapStateToProps (state) {
  return {
    counter: state.counter
  }
}

function mapDispatchToProps(dispatch) {
  return {
    increaseActions: bindActionCreators(increase, dispatch),
    decreaseActions: bindActionCreators(decrease, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
