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
        {
          fetching ? <p>Loading...</p> : <p>Some state change: { number }</p>
        }

        <button onClick={() => this.increaseBtnClick(step)}>Increase</button>
        <button onClick={() => this.decreaseBtnClick(step)}>Decrease</button>
      </div>
    )
  }
}
