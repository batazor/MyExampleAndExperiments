import React from 'react'
import Footer from './Footer'
import AddTodo from '../../containers/AddTodo'
import VisibleTodoList from '../../containers/VisibleTodoList'

import Header from '../Header'
import Menu from '../Menu'
import Chat from '../Chat'

const Todo = () => (
  <div className='row'>
    <div className='col-xs'>
      <Header />
      <div className='row'>
        <div className='col-xs'>
          <AddTodo />
          <VisibleTodoList />
          <Footer />
        </div>
      </div>
    </div>
  </div>
)

export default Todo
