import React, { PropTypes } from 'react' // eslint-disable-line no-unused-vars

const Todo = ({ onClick, competed, text }) => ( // eslint-disable-line no-unused-vars
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
