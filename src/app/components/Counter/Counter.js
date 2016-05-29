import React, { Component } from 'react' // eslint-disable-line no-unused-vars

export default class Counter extends Component {

  increaseBtnClick(step) {
    this.props.increase(step)
  }

  decreaseBtnClick(step) {
    this.props.decrease(step)
  }

  render() {

    let { step, number, fetching } = this.props

    return (
      <div>
        Some state change: { number }

        <button onClick={(e) => this.increaseBtnClick(step)}>Increase</button>
        <button onClick={(e) => this.decreaseBtnClick(step)}>Decrease</button>
      </div>
    )
  }
}
