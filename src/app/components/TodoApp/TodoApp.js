import React from 'react' // eslint-disable-line no-unused-vars
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
          <Menu />
          <AddTodo />
          <VisibleTodoList />
          <Footer />
          <Chat />
        </div>
      </div>
    </div>
  </div>
)

export default Todo
