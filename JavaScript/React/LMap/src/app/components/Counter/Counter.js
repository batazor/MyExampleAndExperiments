import React, { Component } from 'react' // eslint-disable-line no-unused-vars

export default class Counter extends Component {

  increaseBtnClick() {
    this.props.increase()
  }

  decreaseBtnClick() {
    this.props.decrease()
  }

  componentWillMount() {
    this.props.init()
  }

  render() {

    let { number, fetching } = this.props

    return (
      <div>
        {
          fetching ? <p>Loading...</p> : <p>Some state change: { number }</p>
        }

        <button onClick={() => this.increaseBtnClick()}>Increase</button>
        <button onClick={() => this.decreaseBtnClick()}>Decrease</button>
      </div>
    )
  }
}
