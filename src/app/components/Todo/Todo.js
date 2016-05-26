import React, { PropTypes } from 'react'

const Todo = ({ onClick, competed, text }) => (
  <li onClick={onClick}>
    {text}
  </li>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo
