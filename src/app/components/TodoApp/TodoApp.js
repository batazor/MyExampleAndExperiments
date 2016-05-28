import React from 'react' // eslint-disable-line no-unused-vars

import Footer from './Footer'
import AddTodo from '../../containers/AddTodo'
import VisibleTodoList from '../../containers/VisibleTodoList'

const Todo = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default Todo
