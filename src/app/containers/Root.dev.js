import React, { Component, PropTypes } from 'react' // eslint-disable-line no-unused-vars
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import routes from '../routes'

export default class Root extends Component {
  render() {
    const { store, history } = this.props

    return (
      <Provider store={store}>
        <Router history={history} routes={routes}/>
      </Provider>
    )
  }
}

Root.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}
