import React, { Component, PropTypes } from 'react' // eslint-disable-line no-unused-vars
import { Link } from 'react-router'

import Menu from '../Menu'
import NavLink from '../NavLink'
import Button from '../Button'

export default class ItemMenu extends Component {
  render() {

    const item = this.props.item

    return (
      <div>
        <Link to={item.href}>
          <Button style='btnTwo'>{item.href}</Button>
        </Link>
        { item.children && item.children.length ? <Menu items={item.children} params={true} /> : null }
      </div>
    )
  }
}

ItemMenu.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string.isRequired
  })
}
