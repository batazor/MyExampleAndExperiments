import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { init, increase, decrease } from '../actions/counter'
import CounterCtrl from '../components/Counter'

class Counter extends Component {
  render() {

    const { counter } = this.props
    const increase = this.props.increaseActions
    const decrease = this.props.decreaseActions
    const init = this.props.initActions

    return (
      <CounterCtrl increase={increase} decrease={decrease} init={init} {...counter} />
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
    initActions: bindActionCreators(init, dispatch),
    increaseActions: bindActionCreators(increase, dispatch),
    decreaseActions: bindActionCreators(decrease, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
