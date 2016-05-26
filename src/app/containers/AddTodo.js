import React from 'react'
import { connect } from 'react-redux'
import { addTodo, initTodo } from '../actions/todos'

let AddTodo = ({ dispatch }) => {
  let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()

        if (!input.value.trim()) {
          return
        }

        dispatch(addTodo(input.value))
        dispatch(initTodo(input.value))
        input.value = ''
      }}>
        <input ref={node => {
          input = node
        }} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}

AddTodo = connect()(AddTodo)

export default AddTodo
