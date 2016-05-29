import React, { Component, PropTypes } from 'react' // eslint-disable-line no-unused-vars

import Button from '../Button'

export default class ItemMenu extends Component {
  render() {

    const label = this.props.item.label

    return (
      <div>
        <Button style='btnTwo'>{label}</Button>
      </div>
    )
  }
}

ItemMenu.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string.isRequired
  })
}
