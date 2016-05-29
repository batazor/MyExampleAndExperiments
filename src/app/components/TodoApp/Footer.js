import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import FilterLink from '../../containers/FilterLink'

const Footer = () => (
  <p>
    Show:
    {" "}
    <FilterLink filter='SHOW_ALL'>
      All
    </FilterLink>
    <FilterLink filter='SHOW_ACTIVE'>
      Active
    </FilterLink>
    <FilterLink filter='SHOW_COMPLETED'>
      Completed
    </FilterLink>
  </p>
)

export default Footer
