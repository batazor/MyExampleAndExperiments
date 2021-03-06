import React, { Component, PropTypes } from 'react' // eslint-disable-line no-unused-vars

import ItemMenu from './ItemMenu'

export default class Menu extends Component {
  render() {

    const items = this.props.items
    const params = this.props.params

    return (
      <div>
        { params ? null : <h4>Menu</h4> }

        {items.map(function(item, index) {
          return <ItemMenu key={index} item={item} />
        })}
      </div>
    )
  }
}

Menu.defaultProps = {
  items: [],
  params: false
}

Menu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired
  }).isRequired).isRequired
}
